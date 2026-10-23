import {useEffect, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  fetchIndexesByWorker,
  searchByWorker,
} from '@easyops-cn/docusaurus-search-local/dist/client/client/theme/searchByWorker';
import type {SearchResult} from './types';

/**
 * Runs the local keyword search (same index as the plugin's own search bar).
 * The worker only exists in production builds; in `npm run start` it returns nothing.
 * `forQuery` is the trimmed query the current `results` answer.
 */
export function useDocsSearch(query: string, limit = 100, debounceMs = 120) {
  const {
    siteConfig: {baseUrl},
  } = useDocusaurusContext();
  const [answer, setAnswer] = useState<{query: string; results: SearchResult[]}>({query: '', results: []});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchIndexesByWorker(baseUrl, '')
      .catch(() => undefined)
      .then(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [baseUrl]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setAnswer({query: '', results: []});
      return undefined;
    }
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      let found: SearchResult[] = [];
      try {
        found = ((await searchByWorker(baseUrl, '', trimmed, limit)) as SearchResult[]) ?? [];
      } catch {
        // No keyword results for this query.
      }
      if (!cancelled) setAnswer({query: trimmed, results: found});
    }, debounceMs);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query, baseUrl, limit, debounceMs]);

  return {results: answer.results, forQuery: answer.query, loading: answer.query !== query.trim(), ready};
}
