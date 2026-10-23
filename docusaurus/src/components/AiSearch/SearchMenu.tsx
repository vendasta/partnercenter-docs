import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {translate} from '@docusaurus/Translate';
import {AI_SEARCH_LOCALES} from './config';
import {openAssistant} from './assistant';
import {useMergedSearch} from './useMergedSearch';
import {breadcrumbText, hitLink} from './resultUtils';
import {ArrowRightIcon, DocIcon, SparklesIcon} from './Icons';
import type {PageHit} from './types';
import './aiSearch.css';

const MAX_ARTICLES = 5;

type Props = {
  query: string;
  /** The header search input; the menu listens to it for ↑/↓/Enter. */
  inputRef: React.RefObject<HTMLInputElement | null>;
  onClose: () => void;
  /** Close and clear the bar (used after handing the question to the assistant). */
  onReset: () => void;
};

/** A keyboard-reachable item in the menu, in visual order. */
type Action = {key: string; run: () => void};

export function searchPageUrl(baseUrl: string, query: string): string {
  const params = new URLSearchParams();
  params.set('q', query);
  return `${baseUrl}search?${params.toString()}`;
}

type ArticleRowProps = {
  hit: PageHit;
  active: boolean;
  onHover: () => void;
  onSelect: () => void;
};

/** "Top articles" row: doc icon, page title, section path. */
function ArticleRow({hit, active, onHover, onSelect}: ArticleRowProps) {
  const path = hit.breadcrumb.filter((crumb, i, all) => !(i === all.length - 1 && crumb === hit.title));
  const crumbs = [...path, ...(hit.heading ? [hit.heading] : [])];
  return (
    <Link
      className={`ais-article ${active ? 'is-active' : ''}`}
      to={hitLink(hit)}
      {...(hit.external ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
      // Docusaurus Link replaces onMouseEnter on internal links with its prefetch handler.
      onPointerEnter={onHover}
      onClick={onSelect}
      role="option"
      aria-selected={active}
      data-source={hit.source}>
      <DocIcon size={18} className="ais-article__icon" />
      <span className="ais-article__body">
        <span className="ais-article__title">
          {hit.title}
          {hit.external && (
            <span className="ais-article__ext" aria-label="opens in a new tab">
              ↗
            </span>
          )}
        </span>
        {crumbs.length > 0 && <span className="ais-article__path">{breadcrumbText(crumbs)}</span>}
      </span>
    </Link>
  );
}

/**
 * Dropdown under the header search bar: AI answer card, top articles, "View all".
 * Mounted only while the search bar is open, so the search index loads on first use.
 */
export default function SearchMenu({query, inputRef, onClose, onReset}: Props) {
  const history = useHistory();
  const {
    siteConfig: {baseUrl},
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const aiEnabled = AI_SEARCH_LOCALES.includes(currentLocale);
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const {pages, settled, ready} = useMergedSearch(query, {keywordLimit: 60, semanticLimit: 10, debounceMs: 200});
  const trimmed = query.trim();
  const hasQuery = trimmed.length > 0;
  const isProd = process.env.NODE_ENV === 'production';

  useEffect(() => {
    setActiveIndex(0);
  }, [pages]);

  const go = useCallback(
    (url: string) => {
      onClose();
      history.push(url);
    },
    [history, onClose],
  );

  const ask = useCallback(
    (question: string) => {
      onReset();
      openAssistant(question, 'search_menu');
    },
    [onReset],
  );

  const suggestions: PageHit[] = useMemo(
    () => [
      {
        url: `${baseUrl}getting-started`,
        title: translate({id: 'aiSearch.menu.suggestGettingStarted', message: 'Getting started with Vendasta'}),
        breadcrumb: [translate({id: 'aiSearch.menu.suggestGettingStartedPath', message: 'Getting Started'})],
        snippet: '',
        tokens: [],
        source: 'keyword',
      },
      {
        url: `${baseUrl}learn`,
        title: translate({id: 'aiSearch.menu.suggestLearn', message: 'Browse guided learning paths'}),
        breadcrumb: [translate({id: 'aiSearch.menu.suggestLearnPath', message: 'Learn'})],
        snippet: '',
        tokens: [],
        source: 'keyword',
      },
    ],
    [baseUrl],
  );

  const listed = hasQuery ? pages.slice(0, MAX_ARTICLES) : suggestions;
  const showViewAll = hasQuery && pages.length > 0;

  const openHit = useCallback(
    (hit: PageHit) => {
      if (hit.external) {
        onClose();
        window.open(hit.url, '_blank', 'noopener');
      } else {
        go(hitLink(hit));
      }
    },
    [go, onClose],
  );

  // Display order for ↑/↓ and Enter. The AI card comes first, so Enter asks.
  const actions: Action[] = useMemo(() => {
    const list: Action[] = [];
    if (aiEnabled) list.push({key: 'ask', run: () => ask(trimmed)});
    listed.forEach((hit) => list.push({key: hit.url, run: () => openHit(hit)}));
    if (showViewAll) list.push({key: 'view-all', run: () => go(searchPageUrl(baseUrl, trimmed))});
    return list;
  }, [aiEnabled, listed, showViewAll, ask, trimmed, openHit, go, baseUrl]);

  // Keyboard navigation comes from the header input, which keeps focus while the menu is open.
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, actions.length - 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (event.key === 'Enter') {
        event.preventDefault();
        const action = actions[activeIndex];
        if (action) action.run();
        else if (hasQuery) go(searchPageUrl(baseUrl, trimmed));
      }
    };
    input.addEventListener('keydown', onKeyDown);
    return () => input.removeEventListener('keydown', onKeyDown);
  }, [inputRef, actions, activeIndex, hasQuery, go, baseUrl, trimmed]);

  useEffect(() => {
    menuRef.current?.querySelector<HTMLElement>('.is-active')?.scrollIntoView({block: 'nearest'});
  }, [activeIndex]);

  const indexOf = (key: string) => actions.findIndex((a) => a.key === key);
  const activeKey = actions[activeIndex]?.key;

  return (
    <div className="ais-menu" id="ais-menu" ref={menuRef} role="listbox">
      {aiEnabled && (
        <button
          type="button"
          className={`ais-aicard ${activeKey === 'ask' ? 'is-active' : ''}`}
          onPointerEnter={() => setActiveIndex(indexOf('ask'))}
          // Keep focus in the search input so typing and arrow keys keep working.
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => ask(trimmed)}>
          <span className="ais-badge">
            <SparklesIcon size={13} /> {translate({id: 'aiSearch.badge', message: 'AI answer'})}
          </span>
          <span className="ais-aicard__text">
            {hasQuery
              ? translate(
                  {
                    id: 'aiSearch.menu.askWithQuery',
                    message: 'Get an answer to “{query}” from the documentation, with links to the pages it comes from.',
                  },
                  {query: trimmed},
                )
              : translate({
                  id: 'aiSearch.menu.askEmpty',
                  message: 'Ask a question in plain language. Answers come from the documentation, with links to the pages they are based on.',
                })}
          </span>
          <span className="ais-link">
            {hasQuery
              ? translate({id: 'aiSearch.menu.askLink', message: 'See full answer & sources'})
              : translate({id: 'aiSearch.menu.askOpen', message: 'Ask the AI assistant'})}
            <ArrowRightIcon size={14} />
          </span>
        </button>
      )}

      <p className="ais-section-label">
        {hasQuery
          ? translate({id: 'aiSearch.menu.topArticles', message: 'Top articles'})
          : translate({id: 'aiSearch.menu.suggested', message: 'Suggested'})}
      </p>

      {listed.length > 0 ? (
        <div className="ais-articles">
          {listed.map((hit) => (
            <ArticleRow
              key={hit.url}
              hit={hit}
              active={activeKey === hit.url}
              onHover={() => setActiveIndex(indexOf(hit.url))}
              onSelect={onClose}
            />
          ))}
        </div>
      ) : (
        <p className="ais-empty">
          {!isProd
            ? 'Keyword results only appear in production builds (npm run build && npm run serve).'
            : !settled || !ready
              ? translate({id: 'aiSearch.menu.loading', message: 'Searching…'})
              : translate({id: 'aiSearch.menu.noResults', message: 'No matching articles. Try other words, or ask the AI assistant.'})}
        </p>
      )}

      {showViewAll ? (
        <div className="ais-menu__footer">
          <button
            type="button"
            className={`ais-viewall ${activeKey === 'view-all' ? 'is-active' : ''}`}
            onPointerEnter={() => setActiveIndex(indexOf('view-all'))}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => go(searchPageUrl(baseUrl, trimmed))}>
            {translate({id: 'aiSearch.menu.viewAll', message: 'View all {count} results'}, {count: pages.length})}
            <ArrowRightIcon size={14} />
          </button>
        </div>
      ) : (
        <div className="ais-menu__spacer" />
      )}
    </div>
  );
}
