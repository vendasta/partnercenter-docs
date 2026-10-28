import {useEffect, useState} from 'react';
import {useDocsSearch} from './useDocsSearch';
import {useSemanticSearch} from './useSemanticSearch';
import {demoteLegacy, groupByPage, mentionsQuery, mergeHits, normalizeQuery} from './resultUtils';
import type {PageHit} from './types';

/** How long past the debounce the list waits for semantic hits before showing keyword hits alone. */
const SEMANTIC_WAIT_MS = 2500;

/**
 * Below this many keyword pages the query may be gibberish or badly misspelled, so semantic
 * hits must also mention a query word (see mentionsQuery). Real queries find 15 or more.
 */
const FEW_KEYWORD_PAGES = 3;

type Options = {keywordLimit: number; semanticLimit: number; debounceMs: number};

/**
 * Keyword and semantic results merged into one list that changes only when the query does.
 *
 * The keyword search answers in about 100 ms and the semantic one in about a second, so
 * merging as each arrives re-orders the list under an unchanged query. Instead the list is
 * published once per query, when both have answered (or the semantic wait runs out, in which
 * case late semantic hits for that query are dropped). Until then the previous query's list
 * stays up, so typing never flashes an empty or keyword-only list. Both searches run on the
 * normalized query, so adding a "?" neither changes the results nor starts a new search.
 */
export function useMergedSearch(query: string, {keywordLimit, semanticLimit, debounceMs}: Options) {
  const normalized = normalizeQuery(query);
  const keyword = useDocsSearch(normalized, keywordLimit, debounceMs);
  const semantic = useSemanticSearch(normalized, semanticLimit, debounceMs);
  const [gaveUpOn, setGaveUpOn] = useState<string | null>(null);
  const [shown, setShown] = useState<{query: string; pages: PageHit[]}>({query: '', pages: []});

  useEffect(() => {
    if (!normalized) return undefined;
    const timer = window.setTimeout(() => setGaveUpOn(normalized), debounceMs + SEMANTIC_WAIT_MS);
    return () => window.clearTimeout(timer);
  }, [normalized, debounceMs]);

  const keywordDone = keyword.forQuery === normalized;
  const semanticDone = semantic.forQuery === normalized;

  useEffect(() => {
    if (shown.query === normalized || !keywordDone || !(semanticDone || gaveUpOn === normalized)) return;
    const keywordPages = groupByPage(keyword.results);
    const semanticHits = semanticDone ? semantic.hits : [];
    const hits =
      keywordPages.length < FEW_KEYWORD_PAGES ? semanticHits.filter((hit) => mentionsQuery(hit, normalized)) : semanticHits;
    const pages = demoteLegacy(mergeHits(keywordPages, hits, normalized));
    setShown({query: normalized, pages});
  }, [shown.query, normalized, keywordDone, semanticDone, gaveUpOn, keyword.results, semantic.hits]);

  return {
    pages: shown.pages,
    /** The list answers the current query (false while a newer query is in flight). */
    settled: shown.query === normalized,
    ready: keyword.ready,
  };
}
