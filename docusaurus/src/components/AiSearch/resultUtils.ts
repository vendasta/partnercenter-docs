import {highlight} from '@easyops-cn/docusaurus-search-local/dist/client/client/utils/highlight';
import {DocType, type PageHit, type SearchResult} from './types';

/** Collapse raw hits (title, heading, content...) into one entry per page, keeping worker order. */
export function groupByPage(results: SearchResult[]): PageHit[] {
  const byUrl = new Map<string, PageHit>();
  for (const hit of results) {
    const page = hit.type === DocType.Title ? hit.document : hit.page ?? hit.document;
    const isProse = hit.type === DocType.Content || hit.type === DocType.Description;
    const candidate = isProse ? hit.document.t : '';
    const existing = byUrl.get(page.u);
    if (!existing) {
      byUrl.set(page.u, {
        url: page.u,
        title: page.t,
        breadcrumb: page.b ?? [],
        snippet: candidate,
        tokens: hit.tokens,
      });
    } else if (!existing.snippet && candidate) {
      existing.snippet = candidate;
    }
  }
  return [...byUrl.values()];
}

/** Title with matched terms wrapped in <mark>. */
export function titleHtml(title: string, tokens: string[]): string {
  return highlight(title, tokens);
}

/** Trim a content chunk to a window around the first matched token, then mark matches. */
export function snippetHtml(text: string, tokens: string[], maxLength = 140): string {
  if (!text) return '';
  const lower = text.toLowerCase();
  let start = 0;
  for (const token of tokens) {
    const idx = lower.indexOf(token.toLowerCase());
    if (idx >= 0) {
      start = Math.max(0, idx - Math.floor(maxLength / 3));
      break;
    }
  }
  let slice = text.slice(start, start + maxLength);
  if (start > 0) slice = `…${slice.replace(/^\S*\s/, '')}`;
  if (start + maxLength < text.length) slice = `${slice.replace(/\s\S*$/, '')}…`;
  return highlight(slice, tokens);
}

/** Page link that also highlights the matched terms on arrival (plugin behaviour). */
export function pageLink(url: string, tokens: string[]): string {
  if (tokens.length === 0) return url;
  const params = new URLSearchParams();
  for (const token of tokens) params.append('_highlight', token);
  return `${url}?${params.toString()}`;
}

export function breadcrumbText(items: string[]): string {
  return items.join(' › ');
}
