import {useEffect, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {SEMANTIC_SEARCH_LOCALES} from './config';
import {semanticSearch} from './semanticSearch';
import type {PageHit} from './types';

/**
 * Debounced meaning-based search; fails quietly (no hits) so keyword results still show.
 * `forQuery` is the trimmed query the current `hits` answer, failures and skipped queries included.
 */
export function useSemanticSearch(query: string, limit = 6, debounceMs = 250) {
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const enabled = SEMANTIC_SEARCH_LOCALES.includes(currentLocale);
  const [answer, setAnswer] = useState<{query: string; hits: PageHit[]}>({query: '', hits: []});

  useEffect(() => {
    const trimmed = query.trim();
    if (!enabled || trimmed.length < 3) {
      setAnswer({query: trimmed, hits: []});
      return undefined;
    }
    let stale = false;
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      const timeout = window.setTimeout(() => controller.abort(), 6000);
      let found: PageHit[] = [];
      try {
        found = await semanticSearch(trimmed, limit, controller.signal);
      } catch {
        // Failed or timed out: no semantic hits for this query.
      } finally {
        window.clearTimeout(timeout);
      }
      if (!stale) setAnswer({query: trimmed, hits: found});
    }, debounceMs);
    return () => {
      stale = true;
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [query, enabled, limit, debounceMs]);

  return {hits: answer.hits, forQuery: answer.query, loading: answer.query !== query.trim(), enabled};
}
