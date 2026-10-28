import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {translate} from '@docusaurus/Translate';
import {AI_SEARCH_LOCALES} from './config';
import {openAssistant} from './assistant';
import {useMergedSearch} from './useMergedSearch';
import {breadcrumbText, hitLink} from './resultUtils';
import {AiStarIcon, ArrowRightIcon, DocIcon} from './Icons';
import type {PageHit} from './types';
import './aiSearch.css';

const MAX_ARTICLES = 5;

const QUESTION_START =
  /^(how|what|why|when|where|who|which|can|could|do|does|did|is|are|should|will|would)\b/i;

/** "how do I…" or "…?": the reader wants an answer rather than a page. */
export function looksLikeQuestion(query: string): boolean {
  const text = query.trim();
  return text.endsWith('?') || (QUESTION_START.test(text) && text.split(/\s+/).length > 1);
}

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

type AskRowProps = {
  query: string;
  active: boolean;
  onHover: () => void;
  onSelect: () => void;
};

/** One-line "Ask AI" row that hands the query to the assistant drawer. */
function AskRow({query, active, onHover, onSelect}: AskRowProps) {
  return (
    <button
      type="button"
      className={`ais-ask ${active ? 'is-active' : ''}`}
      onPointerEnter={onHover}
      // Keep focus in the search input so typing and arrow keys keep working.
      onMouseDown={(event) => event.preventDefault()}
      onClick={onSelect}
      role="option"
      aria-selected={active}>
      <span className="ais-ask__icon">
        <AiStarIcon size={13} />
      </span>
      <span className="ais-ask__body">
        <span className="ais-ask__label">{translate({id: 'aiSearch.badge', message: 'Ask AI'})}</span>
        {query && <span className="ais-ask__query">“{query}”</span>}
      </span>
      {active && (
        <kbd className="ais-ask__kbd" aria-hidden="true">
          ↵
        </kbd>
      )}
    </button>
  );
}

/**
 * Dropdown under the header search bar: top articles, an "Ask AI" row, "View all". The
 * Ask AI row moves to the top when the bar is empty, the query reads like a question, or
 * no article matches.
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

  const noArticles = hasQuery && settled && ready && pages.length === 0;
  const askFirst = aiEnabled && (!hasQuery || looksLikeQuestion(trimmed) || noArticles);

  useEffect(() => {
    setActiveIndex(0);
  }, [pages, askFirst]);

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

  // Display order for ↑/↓ and Enter; Enter runs whichever item is first.
  const actions: Action[] = useMemo(() => {
    const list: Action[] = [];
    const askAction = {key: 'ask', run: () => ask(trimmed)};
    if (askFirst) list.push(askAction);
    listed.forEach((hit) => list.push({key: hit.url, run: () => openHit(hit)}));
    if (aiEnabled && !askFirst) list.push(askAction);
    if (showViewAll) list.push({key: 'view-all', run: () => go(searchPageUrl(baseUrl, trimmed))});
    return list;
  }, [aiEnabled, askFirst, listed, showViewAll, ask, trimmed, openHit, go, baseUrl]);

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
  const askRow = (
    <AskRow
      query={trimmed}
      active={activeKey === 'ask'}
      onHover={() => setActiveIndex(indexOf('ask'))}
      onSelect={() => ask(trimmed)}
    />
  );

  return (
    <div className="ais-menu" id="ais-menu" ref={menuRef} role="listbox">
      {askFirst && askRow}

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

      {aiEnabled && !askFirst && askRow}

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
