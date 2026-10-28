import {highlight} from '@easyops-cn/docusaurus-search-local/dist/client/client/utils/highlight';
import {DocType, type PageHit, type SearchResult} from './types';

/** Collapse raw hits (title, heading, content...) into one entry per page, keeping worker order. */
export function groupByPage(results: SearchResult[]): PageHit[] {
  const byUrl = new Map<string, PageHit>();
  for (const hit of results) {
    const isTitle = hit.type === DocType.Title;
    const page = isTitle ? hit.document : hit.page ?? hit.document;
    const isProse = hit.type === DocType.Content || hit.type === DocType.Description;
    const candidate = isProse ? hit.document.t : '';
    // Section the hit belongs to: a heading hit names it directly; a content hit carries
    // its section title in `s` and anchor in `h`. Skip when it is just the page title.
    const sectionAnchor = !isTitle ? hit.document.h : undefined;
    const sectionTitle = hit.type === DocType.Heading ? hit.document.t : !isTitle ? hit.document.s : undefined;
    const heading = sectionTitle && sectionTitle !== page.t ? sectionTitle : undefined;

    const existing = byUrl.get(page.u);
    if (!existing) {
      byUrl.set(page.u, {
        url: page.u,
        title: page.t,
        breadcrumb: page.b ?? [],
        snippet: candidate,
        tokens: hit.tokens,
        source: 'keyword',
        anchor: heading ? sectionAnchor : undefined,
        heading,
      });
      continue;
    }
    if (!existing.snippet && candidate) existing.snippet = candidate;
    if (!existing.heading && heading) {
      existing.heading = heading;
      existing.anchor = sectionAnchor;
    }
  }
  return [...byUrl.values()];
}

/** Sentence punctuation around a word, which neither search should see. */
const EDGE_PUNCTUATION = /^[?!.,;:"'()\[\]\u2018\u2019\u201C\u201D\u2026]+|[?!.,;:"'()\[\]\u2018\u2019\u201C\u201D\u2026]+$/g;

/**
 * The query both searches run: sentence punctuation trimmed from each word, spaces collapsed,
 * so "how can I add a contact?" and "how can I add a contact" are one search. Punctuation
 * inside a word stays ("G-Suite", "1.5", "what's").
 */
export function normalizeQuery(query: string): string {
  return query
    .split(/\s+/)
    .map((word) => word.replace(EDGE_PUNCTUATION, ''))
    .filter(Boolean)
    .join(' ');
}

/**
 * Merge keyword and semantic hits into one ranked list (reciprocal rank fusion).
 *
 * Each page scores 1 / (k + rank) in every list it appears in, so pages both engines
 * agree on rise to the top. When the engines disagree, semantic leads for multi-word
 * queries (meaning matters more than literal words) and keyword leads for single terms
 * (product names, exact labels). Pages on sibling docs sites are weighted slightly
 * lower so this site's own pages win near-ties, and a page whose title contains the
 * whole query phrase gets a boost.
 */
export function mergeHits(keyword: PageHit[], semantic: PageHit[], query = ''): PageHit[] {
  const K = 1;
  const EXTERNAL_WEIGHT = 0.95; // tie-breaker only: this site's pages win exact ties
  const PHRASE_BOOST = 0.5;
  const phrase = query.trim().toLowerCase();
  const multiWord = phrase.split(/\s+/).filter((w) => w.length >= 3).length >= 2;
  const semanticWeight = multiWord ? 1.05 : 0.95;
  const keywordWeight = multiWord ? 0.95 : 1.05;

  const key = (url: string) => url.replace(/[?#].*$/, '').replace(/\/+$/, '') || '/';
  const scores = new Map<string, {hit: PageHit; score: number}>();
  const add = (hit: PageHit, rank: number, weight: number) => {
    const k = key(hit.url);
    const entry = scores.get(k) ?? {hit, score: 0};
    entry.score += weight / (K + rank);
    // Prefer the keyword hit's richer metadata (real breadcrumb, section anchor).
    if (entry.hit.source === 'semantic' && hit.source === 'keyword') entry.hit = hit;
    scores.set(k, entry);
  };
  keyword.forEach((hit, i) => add(hit, i + 1, keywordWeight));
  semantic.forEach((hit, i) => add(hit, i + 1, semanticWeight * (hit.external ? EXTERNAL_WEIGHT : 1)));
  for (const entry of scores.values()) {
    if (phrase.length >= 4 && entry.hit.title.toLowerCase().includes(phrase)) entry.score += PHRASE_BOOST;
  }
  return [...scores.values()].sort((a, b) => b.score - a.score).map((e) => e.hit);
}

/** Title with matched terms wrapped in <mark>. */
const STOP_WORDS = new Set(
  'the and for are can how what why when where who which does did with you your from this that into about'.split(' '),
);

/** Edit distance between two words, giving up once it passes `max`. */
function withinEdits(a: string, b: string, max: number): boolean {
  if (Math.abs(a.length - b.length) > max) return false;
  let previous = Array.from({length: b.length + 1}, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    for (let j = 1; j <= b.length; j++) {
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    if (Math.min(...current) > max) return false;
    previous = current;
  }
  return previous[b.length] <= max;
}

/**
 * Whether a hit's text has a word spelled like one of the query's words (typos allowed after
 * the first letter: one for 5–7 letter words, two for longer ones). The semantic search always
 * returns its nearest pages, even for gibberish, and its similarity scores for gibberish
 * overlap real queries, so this text check is what tells a real match from noise.
 */
export function mentionsQuery(hit: PageHit, query: string): boolean {
  const terms = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((term) => term.length >= 3 && !STOP_WORDS.has(term));
  if (terms.length === 0) return false;
  const words = new Set(`${hit.title} ${hit.snippet} ${hit.breadcrumb.join(' ')}`.toLowerCase().split(/[^a-z0-9]+/));
  return terms.some((term) => {
    const max = term.length >= 8 ? 2 : term.length >= 5 ? 1 : 0;
    for (const word of words) {
      // A typo rarely hits the first letter; requiring it keeps "dolor" from matching "color".
      if (word.startsWith(term) || (max > 0 && word[0] === term[0] && withinEdits(term, word, max))) return true;
    }
    return false;
  });
}

/** Pages under /legacy/ document retired tools; they rank after current pages. */
export function isLegacyHit(hit: PageHit): boolean {
  try {
    return /^\/legacy(\/|$)/.test(new URL(hit.url, 'https://docs.vendasta.com').pathname);
  } catch {
    return false;
  }
}

/** Current pages first, legacy pages after them, each group keeping its order. */
export function demoteLegacy(pages: PageHit[]): PageHit[] {
  return [...pages.filter((hit) => !isLegacyHit(hit)), ...pages.filter(isLegacyHit)];
}

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

/** Link for a hit: highlights matched terms on arrival (plugin behaviour) and lands on the matching section. */
export function hitLink(hit: PageHit): string {
  if (hit.external) return hit.url;
  let link = hit.url;
  if (hit.tokens.length > 0) {
    const params = new URLSearchParams();
    for (const token of hit.tokens) params.append('_highlight', token);
    link += `?${params.toString()}`;
  }
  if (hit.anchor) link += hit.anchor.startsWith('#') ? hit.anchor : `#${hit.anchor}`;
  return link;
}

export function breadcrumbText(items: string[]): string {
  return items.join(' › ');
}
