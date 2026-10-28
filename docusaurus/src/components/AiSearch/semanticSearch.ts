import {MCP_URL, SEMANTIC_RESULT_HOSTS, SITE_HOST} from './config';
import type {PageHit} from './types';

/**
 * Meaning-based search over the docs through the Vendasta MCP server's `search_docs`
 * tool: one JSON-RPC POST, no session, no credentials. Results are page excerpts with
 * a citation URL, which we fold into the same PageHit shape the keyword search uses.
 */

type McpSearchResult = {
  title?: string;
  content?: string;
  citation?: string;
  similarity?: number;
};

let rpcId = 0;

async function callSearchDocs(query: string, limit: number, signal: AbortSignal): Promise<McpSearchResult[]> {
  const response = await fetch(MCP_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', Accept: 'application/json, text/event-stream'},
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: ++rpcId,
      method: 'tools/call',
      params: {name: 'search_docs', arguments: {query, limit}},
    }),
    signal,
  });
  if (!response.ok) throw new Error(`search_docs failed: ${response.status}`);

  // Streamable HTTP servers may answer with JSON or with an SSE body carrying one event.
  const raw = await response.text();
  const isSse = (response.headers.get('content-type') ?? '').includes('text/event-stream');
  const json = isSse
    ? raw
        .split('\n')
        .filter((line) => line.startsWith('data:'))
        .map((line) => line.slice(5).trim())
        .join('')
    : raw;
  const rpc = JSON.parse(json) as {result?: {content?: Array<{type: string; text?: string}>}};
  const text = rpc.result?.content?.find((c) => c.type === 'text')?.text;
  if (!text) return [];
  const parsed = JSON.parse(text) as {results?: McpSearchResult[]};
  return parsed.results ?? [];
}

/** Strip markdown and Docusaurus heading-anchor artefacts from an excerpt. */
function cleanExcerpt(markdown: string): string {
  return markdown
    .replace(/\[​\]\([^)]*\)/g, '') // "[​](url)" heading anchors
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links -> text
    .replace(/^#{1,6}\s+/gm, '') // headings
    .replace(/[`*_>]/g, '')
    .replace(/\\([#.])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanTitle(title: string): string {
  return title.replace(/\s*\|\s*(Vendasta Documentation|Product Help & Documentation|Product Help)\s*$/i, '').trim();
}

const ACRONYMS: Record<string, string> = {ai: 'AI', crm: 'CRM', seo: 'SEO', sms: 'SMS', api: 'API', faq: 'FAQ'};

/** "/marketing/email-settings/x" -> ["Marketing", "Email settings"] (approximation of the real breadcrumb). */
function breadcrumbFromPath(pathname: string, dropLeading?: string): string[] {
  const parts = pathname.split('/').filter(Boolean);
  parts.pop();
  if (dropLeading && parts[0] === dropLeading) parts.shift();
  return parts.map((segment) => {
    if (ACRONYMS[segment]) return ACRONYMS[segment];
    const words = segment.replace(/-/g, ' ');
    return words.charAt(0).toUpperCase() + words.slice(1);
  });
}

export function normalizeUrl(url: string): string {
  return url.replace(/[?#].*$/, '').replace(/\/+$/, '') || '/';
}

/** Tokens used only to highlight matches in semantic hits (the server does not return them). */
export function queryTokens(query: string): string[] {
  return [...new Set(query.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length >= 3))].sort(
    (a, b) => b.length - a.length,
  );
}

/**
 * Answers already received, by limit and query. The server's ranking varies slightly between
 * calls, so the results page reuses the search menu's answer instead of asking again; that
 * keeps "View all N results" and the page's count the same. Failures are not cached.
 */
const answers = new Map<string, PageHit[]>();
const MAX_ANSWERS = 30;

export async function semanticSearch(query: string, limit: number, signal: AbortSignal): Promise<PageHit[]> {
  const key = `${limit}|${query}`;
  const cached = answers.get(key);
  if (cached) return cached;
  const hits = await fetchSemanticHits(query, limit, signal);
  answers.set(key, hits);
  if (answers.size > MAX_ANSWERS) answers.delete(answers.keys().next().value as string);
  return hits;
}

async function fetchSemanticHits(query: string, limit: number, signal: AbortSignal): Promise<PageHit[]> {
  const results = await callSearchDocs(query, limit, signal);
  const tokens = queryTokens(query);
  const seen = new Set<string>();
  const local: PageHit[] = [];
  const external: PageHit[] = [];
  for (const result of results) {
    if (!result.citation) continue;
    let url: URL;
    try {
      url = new URL(result.citation);
    } catch {
      continue;
    }
    const label = SEMANTIC_RESULT_HOSTS[url.host];
    if (label === undefined) continue;
    const isLocal = url.host === SITE_HOST;
    const path = normalizeUrl(url.pathname);
    if (/^\/(tags|search)(\/|$)/.test(path)) continue; // listing pages, not content
    const key = `${url.host}${path}`;
    if (seen.has(key)) continue; // the same page can appear more than once (multiple excerpts)
    seen.add(key);
    const hit: PageHit = {
      url: isLocal ? path : `${url.origin}${path}`,
      title: cleanTitle(result.title ?? path),
      // Sibling sites nest everything under one root segment (e.g. /business-app/...); the label covers it.
      breadcrumb: isLocal ? breadcrumbFromPath(path) : [label, ...breadcrumbFromPath(path, 'business-app')],
      snippet: cleanExcerpt(result.content ?? ''),
      tokens,
      source: 'semantic',
      external: !isLocal,
    };
    (isLocal ? local : external).push(hit);
  }
  // Same-site pages first, then sibling docs sites in their own relevance order.
  return [...local, ...external];
}
