import React, {useEffect, useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import {useHistory, useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {translate} from '@docusaurus/Translate';
import {AI_SEARCH_LOCALES} from '../../components/AiSearch/config';
import {openAssistant} from '../../components/AiSearch/assistant';
import {useDocsSearch} from '../../components/AiSearch/useDocsSearch';
import {useSemanticSearch} from '../../components/AiSearch/useSemanticSearch';
import {groupByPage, mergeHits} from '../../components/AiSearch/resultUtils';
import ResultRow from '../../components/AiSearch/ResultRow';
import {SearchIcon, SparklesIcon} from '../../components/AiSearch/Icons';
import '../../components/AiSearch/aiSearch.css';

/** Results page at /search: full keyword result list, with an "Ask AI" row on top. */
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

  const {results, loading, ready} = useDocsSearch(urlQuery, 100, 0);
  const semantic = useSemanticSearch(urlQuery, 10, 0);
  const pages = useMemo(() => mergeHits(groupByPage(results), semantic.hits, 5), [results, semantic.hits]);

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
      <Head>
        <title>{title}</title>
        <meta property="robots" content="noindex, follow" />
      </Head>

      <form className="ais-page__search" onSubmit={submit}>
        <SearchIcon size={18} className="ais-page__search-icon" />
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
            <button type="button" className="ais-row ais-row--ask" onClick={() => openAssistant(urlQuery, 'results_page')}>
              <SparklesIcon size={16} className="ais-row__icon ais-row__icon--ai" />
              <span className="ais-row__body">
                <span className="ais-row__title">
                  {translate({id: 'aiSearch.results.askTitle', message: 'Ask the AI assistant'})}
                </span>
                <span className="ais-row__desc">“{urlQuery}”</span>
              </span>
            </button>
          )}

          <div className="ais-page__list" role="listbox">
            {pages.map((hit) => (
              <ResultRow key={hit.url} hit={hit} snippetLength={220} />
            ))}
          </div>

          {pages.length === 0 && (
            <p className="ais-empty">
              {process.env.NODE_ENV !== 'production'
                ? 'Keyword results only appear in production builds (npm run build && npm run serve).'
                : loading || !ready || semantic.loading
                  ? translate({id: 'aiSearch.results.loading', message: 'Searching…'})
                  : translate({id: 'theme.SearchPage.noResultsText', message: 'No results were found'})}
            </p>
          )}
        </>
      )}
    </main>
  );
}
