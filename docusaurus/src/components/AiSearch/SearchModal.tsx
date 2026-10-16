import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {useHistory, useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {translate} from '@docusaurus/Translate';
import {AI_SEARCH_LOCALES} from './config';
import {openAssistant} from './assistant';
import {useDocsSearch} from './useDocsSearch';
import {groupByPage, pageLink} from './resultUtils';
import ResultRow from './ResultRow';
import {DocIcon, SearchIcon, SparklesIcon} from './Icons';
import './aiSearch.css';

const MAX_ROWS = 5;

type Props = {onClose: () => void};

/** Any keyboard-reachable row in the dialog, in visual order. */
type Action = {key: string; run: () => void};

export function searchPageUrl(baseUrl: string, query: string): string {
  const params = new URLSearchParams();
  params.set('q', query);
  return `${baseUrl}search?${params.toString()}`;
}

export default function SearchModal({onClose}: Props) {
  const history = useHistory();
  const location = useLocation();
  const {
    siteConfig: {baseUrl},
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const aiEnabled = AI_SEARCH_LOCALES.includes(currentLocale);

  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const openedAtPath = useRef(location.pathname);

  const {results, loading, ready} = useDocsSearch(query, 60);
  const pages = useMemo(() => groupByPage(results), [results]);
  const rows = pages.slice(0, MAX_ROWS);
  const trimmed = query.trim();
  const hasQuery = trimmed.length > 0;
  const isProd = process.env.NODE_ENV === 'production';

  useEffect(() => {
    if (location.pathname !== openedAtPath.current) onClose();
  }, [location.pathname, onClose]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('ais-dialog-open');
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      document.body.classList.remove('ais-dialog-open');
    };
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, pages.length]);

  const go = useCallback(
    (url: string) => {
      onClose();
      history.push(url);
    },
    [history, onClose],
  );

  const ask = useCallback(
    (question: string) => {
      onClose();
      openAssistant(question, 'search_modal');
    },
    [onClose],
  );

  // Rows under "Ask AI Assistant": the query itself, handed to the assistant as typed.
  const askRows = useMemo(() => (aiEnabled && hasQuery ? [trimmed] : ([] as string[])), [aiEnabled, hasQuery, trimmed]);

  const suggested: Action[] = useMemo(
    () => [
      {key: 'getting-started', run: () => go(`${baseUrl}getting-started`)},
      {key: 'learn', run: () => go(`${baseUrl}learn`)},
      ...(aiEnabled ? [{key: 'ask-empty', run: () => ask('')}] : []),
    ],
    [aiEnabled, ask, baseUrl, go],
  );

  // Flat list of actionable rows in display order, for ↑/↓ and Enter.
  const actions: Action[] = useMemo(() => {
    if (!hasQuery) return suggested;
    const list: Action[] = rows.map((hit) => ({key: hit.url, run: () => go(pageLink(hit.url, hit.tokens))}));
    if (pages.length > 0) list.push({key: 'view-more', run: () => go(searchPageUrl(baseUrl, trimmed))});
    askRows.forEach((q) => list.push({key: `ask:${q}`, run: () => ask(q)}));
    return list;
  }, [hasQuery, suggested, rows, pages.length, askRows, baseUrl, trimmed, go, ask]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    } else if (event.key === 'ArrowDown') {
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

  // Keep the active row in view while arrowing.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>('.is-active');
    el?.scrollIntoView({block: 'nearest'});
  }, [activeIndex]);

  const indexOf = (key: string) => actions.findIndex((a) => a.key === key);
  const activeKey = actions[activeIndex]?.key;

  const placeholder = aiEnabled
    ? translate({id: 'aiSearch.modal.placeholderAi', message: 'Search the docs or ask a question'})
    : translate({id: 'aiSearch.modal.placeholder', message: 'Search the docs'});

  const dialog = (
    <div
      className="ais-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}>
      <div
        className="ais-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={translate({id: 'aiSearch.modal.label', message: 'Search the documentation'})}
        onKeyDown={onKeyDown}>
        <div className="ais-dialog__input">
          <SearchIcon size={16} className="ais-dialog__search-icon" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            aria-owns="ais-dialog-menu"
            autoComplete="off"
            spellCheck={false}
            maxLength={1000}
          />
          <button type="button" className="ais-dialog__close" onClick={onClose} aria-label="Close search">
            ✕
          </button>
        </div>

        <div className="ais-dialog__menu" id="ais-dialog-menu" ref={listRef}>
          {!hasQuery && (
            <section className="ais-section">
              <h3 className="ais-section__label">
                {translate({id: 'aiSearch.modal.suggested', message: 'Suggested'})}
              </h3>
              <button
                type="button"
                className={`ais-row ${activeKey === 'getting-started' ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveIndex(indexOf('getting-started'))}
                onClick={suggested[0].run}>
                <DocIcon size={16} className="ais-row__icon" />
                <span className="ais-row__title">
                  {translate({id: 'aiSearch.modal.suggestGettingStarted', message: 'Getting started with Vendasta'})}
                </span>
              </button>
              <button
                type="button"
                className={`ais-row ${activeKey === 'learn' ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveIndex(indexOf('learn'))}
                onClick={suggested[1].run}>
                <DocIcon size={16} className="ais-row__icon" />
                <span className="ais-row__title">
                  {translate({id: 'aiSearch.modal.suggestLearn', message: 'Browse guided learning paths'})}
                </span>
              </button>
              {aiEnabled && (
                <button
                  type="button"
                  className={`ais-row ${activeKey === 'ask-empty' ? 'is-active' : ''}`}
                  onMouseEnter={() => setActiveIndex(indexOf('ask-empty'))}
                  onClick={() => ask('')}>
                  <SparklesIcon size={16} className="ais-row__icon ais-row__icon--ai" />
                  <span className="ais-row__title">
                    {translate({id: 'aiSearch.modal.suggestAsk', message: 'Ask the AI assistant a question'})}
                  </span>
                </button>
              )}
            </section>
          )}

          {hasQuery && (
            <section className="ais-section">
              <h3 className="ais-section__label">
                {translate({id: 'aiSearch.modal.results', message: 'Results'})}
              </h3>
              {rows.length > 0 ? (
                <>
                  {rows.map((hit) => (
                    <ResultRow
                      key={hit.url}
                      hit={hit}
                      active={activeKey === hit.url}
                      onHover={() => setActiveIndex(indexOf(hit.url))}
                      onSelect={onClose}
                    />
                  ))}
                  <button
                    type="button"
                    className={`ais-more ${activeKey === 'view-more' ? 'is-active' : ''}`}
                    onMouseEnter={() => setActiveIndex(indexOf('view-more'))}
                    onClick={() => go(searchPageUrl(baseUrl, trimmed))}>
                    {translate({id: 'aiSearch.modal.viewMore', message: 'View more results'})}
                  </button>
                </>
              ) : (
                <p className="ais-empty">
                  {!isProd
                    ? 'Keyword results only appear in production builds (npm run build && npm run serve).'
                    : loading || !ready
                      ? translate({id: 'aiSearch.modal.loading', message: 'Searching…'})
                      : translate({id: 'aiSearch.modal.noResults', message: 'No results found.'})}
                </p>
              )}
            </section>
          )}

          {hasQuery && askRows.length > 0 && (
            <section className="ais-section">
              <h3 className="ais-section__label">
                {translate({id: 'aiSearch.modal.askSection', message: 'Ask AI Assistant'})}
              </h3>
              {askRows.map((q) => (
                <button
                  key={q}
                  type="button"
                  className={`ais-row ${activeKey === `ask:${q}` ? 'is-active' : ''}`}
                  onMouseEnter={() => setActiveIndex(indexOf(`ask:${q}`))}
                  onClick={() => ask(q)}>
                  <SparklesIcon size={16} className="ais-row__icon ais-row__icon--ai" />
                  <span className="ais-row__body">
                    <span className="ais-row__title">{q}</span>
                    <span className="ais-row__desc">
                      {translate({id: 'aiSearch.modal.askHint', message: 'Ask the AI assistant'})}
                    </span>
                  </span>
                </button>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(dialog, document.body);
}
