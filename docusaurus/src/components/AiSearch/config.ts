// Shared configuration for the AI-assisted search.

/** Locales where the AI assistant is offered. Other locales keep keyword search only. */
export const AI_SEARCH_LOCALES = ['en'];

/** Locales where meaning-based (semantic) results are merged into search. The index is English. */
export const SEMANTIC_SEARCH_LOCALES = ['en'];

/** Vendasta MCP server. Its `search_docs` tool is public (no token) and allows browser calls. */
export const MCP_URL = 'https://mcp.vendasta.com/mcp';

/** This site's host. Semantic hits from it become in-app links. */
export const SITE_HOST = 'docs.vendasta.com';

/** Hosts whose semantic hits are shown, with the label used for sibling sites. */
export const SEMANTIC_RESULT_HOSTS: Record<string, string> = {
  'docs.vendasta.com': '',
  'docs.businessapp.io': 'Business App docs',
};
