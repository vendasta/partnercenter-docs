// Shared configuration for the AI-assisted search.

/** Locales where the AI assistant is offered. Other locales keep keyword search only. */
export const AI_SEARCH_LOCALES = ['en'];

/** Locales where meaning-based (semantic) results are merged into search. The index is English. */
export const SEMANTIC_SEARCH_LOCALES = ['en'];

/** Vendasta MCP server. Its `search_docs` tool is public (no token) and allows browser calls. */
export const MCP_URL = 'https://mcp.vendasta.com/mcp';

/** Only semantic hits from these hosts are shown; others cover sibling docs sites. */
export const SEMANTIC_RESULT_HOSTS = ['docs.vendasta.com'];
