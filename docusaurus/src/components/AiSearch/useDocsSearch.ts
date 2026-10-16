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
 */
export function useDocsSearch(query: string, limit = 100, debounceMs = 120) {
  const {
    siteConfig: {baseUrl},
  } = useDocusaurusContext();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
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
      setResults([]);
      setLoading(false);
      return undefined;
    }
    let cancelled = false;
    setLoading(true);
    const timer = window.setTimeout(async () => {
      try {
        const found = (await searchByWorker(baseUrl, '', trimmed, limit)) as SearchResult[];
        if (!cancelled) setResults(found ?? []);
      } catch {
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, debounceMs);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query, baseUrl, limit, debounceMs]);

  return {results, loading, ready};
}
