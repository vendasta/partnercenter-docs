/** One indexed document from @easyops-cn/docusaurus-search-local. */
export type SearchDocument = {
  /** Numeric id */
  i: number;
  /** Text: page title, heading text, or content chunk */
  t: string;
  /** Page url */
  u: string;
  /** Heading anchor, e.g. "#set-up" */
  h?: string;
  /** Parent page id */
  p?: number;
  /** Breadcrumb labels */
  b?: string[];
  /** Section title */
  s?: string;
};

export const DocType = {
  Title: 0,
  Heading: 1,
  Description: 2,
  Keywords: 3,
  Content: 4,
} as const;

export type SearchResult = {
  document: SearchDocument;
  type: number;
  page: SearchDocument | undefined;
  metadata: Record<string, unknown>;
  tokens: string[];
};

/** Search hits folded into one entry per page. */
export type PageHit = {
  url: string;
  title: string;
  breadcrumb: string[];
  snippet: string;
  tokens: string[];
};
