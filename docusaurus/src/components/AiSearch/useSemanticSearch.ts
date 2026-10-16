import {useEffect, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {SEMANTIC_SEARCH_LOCALES} from './config';
import {semanticSearch} from './semanticSearch';
import type {PageHit} from './types';

/** Debounced meaning-based search; fails quietly so keyword results still show. */
export function useSemanticSearch(query: string, limit = 6, debounceMs = 250) {
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const enabled = SEMANTIC_SEARCH_LOCALES.includes(currentLocale);
  const [hits, setHits] = useState<PageHit[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();
    if (!enabled || trimmed.length < 3) {
      setHits([]);
      setLoading(false);
      return undefined;
    }
    const controller = new AbortController();
    setLoading(true);
    const timer = window.setTimeout(async () => {
      const timeout = window.setTimeout(() => controller.abort(), 6000);
      try {
        const found = await semanticSearch(trimmed, limit, controller.signal);
        if (!controller.signal.aborted) setHits(found);
      } catch {
        if (!controller.signal.aborted) setHits([]);
      } finally {
        window.clearTimeout(timeout);
        if (!controller.signal.aborted) setLoading(false);
      }
    }, debounceMs);
    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [query, enabled, limit, debounceMs]);

  return {hits, loading, enabled};
}
