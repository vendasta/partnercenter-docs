import React, {useEffect, useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import {useHistory, useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {translate} from '@docusaurus/Translate';
import {AI_SEARCH_LOCALES, SEARCH_LIMITS} from '../../components/AiSearch/config';
import {openAssistant} from '../../components/AiSearch/assistant';
import {useMergedSearch} from '../../components/AiSearch/useMergedSearch';
import ResultRow from '../../components/AiSearch/ResultRow';
import AskRow from '../../components/AiSearch/AskRow';
import {AiStarIcon} from '../../components/AiSearch/Icons';
import '../../components/AiSearch/aiSearch.css';

const PAGE_SIZE = 20;

/** Results page at /search: an "Ask AI" row on top, then the results, 20 at a time. */
export default function SearchPage(): React.ReactElement {
  return (
    <Layout>
      <SearchPageContent />
    </Layout>
  );
}

function SearchPageContent() {
  const isBrowser = useIsBrowser();
  const history = useHistory();
  const location = useLocation();
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const aiEnabled = AI_SEARCH_LOCALES.includes(currentLocale);

  const urlQuery = useMemo(
    () => new URLSearchParams(isBrowser ? location.search : '').get('q') ?? '',
    [isBrowser, location.search],
  );
  const [draft, setDraft] = useState(urlQuery);
  useEffect(() => {
    setDraft(urlQuery);
  }, [urlQuery]);

  const {pages, settled, ready} = useMergedSearch(urlQuery, {...SEARCH_LIMITS, debounceMs: 0});
  const [visible, setVisible] = useState(PAGE_SIZE);
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [urlQuery]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next = new URLSearchParams();
    if (draft.trim()) next.set('q', draft.trim());
    history.push({search: next.toString()});
  };

  const title = urlQuery
    ? translate(
        {id: 'theme.SearchPage.existingResultsTitle', message: 'Search results for "{query}"'},
        {query: urlQuery},
      )
    : translate({id: 'theme.SearchPage.emptyResultsTitle', message: 'Search the documentation'});

  return (
    <main className="ais-page">
      <div className="ais-page__inner">
        <Head>
          <title>{title}</title>
          <meta property="robots" content="noindex, follow" />
        </Head>

        <form className="ais-page__search" onSubmit={submit}>
          <AiStarIcon size={18} className="ais-page__search-icon" />
          <input
            type="search"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={translate({id: 'aiSearch.results.placeholder', message: 'Search the docs'})}
            aria-label={translate({id: 'aiSearch.results.placeholder', message: 'Search the docs'})}
            autoComplete="off"
            autoFocus={!urlQuery}
          />
        </form>

        {urlQuery && (
          <>
            <h1 className="ais-page__title">{title}</h1>
            <p className="ais-page__count">
              {translate(
                {id: 'aiSearch.results.count', message: '{count} pages'},
                {count: pages.length},
              )}
            </p>

            {aiEnabled && (
              <AskRow query={urlQuery} className="ais-page__ask" onSelect={() => openAssistant(urlQuery, 'results_page')} />
            )}

            <div className="ais-page__list" role="listbox">
              {pages.slice(0, visible).map((hit) => (
                <ResultRow key={hit.url} hit={hit} snippetLength={220} />
              ))}
            </div>

            {pages.length > visible && (
              <button type="button" className="ais-page__more" onClick={() => setVisible((n) => n + PAGE_SIZE)}>
                {translate(
                  {id: 'aiSearch.results.showMore', message: 'Show more ({count} left)'},
                  {count: pages.length - visible},
                )}
              </button>
            )}

            {pages.length === 0 && (
              <p className="ais-empty">
                {process.env.NODE_ENV !== 'production'
                  ? 'Keyword results only appear in production builds (npm run build && npm run serve).'
                  : !settled || !ready
                    ? translate({id: 'aiSearch.results.loading', message: 'Searching…'})
                    : translate({id: 'theme.SearchPage.noResultsText', message: 'No results were found'})}
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}
