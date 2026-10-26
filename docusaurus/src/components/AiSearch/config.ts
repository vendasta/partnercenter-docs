// Shared configuration for the AI-assisted search.

/** Locales where the AI assistant is offered. Other locales keep keyword search only. */
export const AI_SEARCH_LOCALES = ['en'];

/** Locales where meaning-based (semantic) results are merged into search. The index is English. */
export const SEMANTIC_SEARCH_LOCALES = ['en'];

/** Vendasta MCP server. Its `search_docs` tool is public (no token) and allows browser calls. */
export const MCP_URL = 'https://mcp.vendasta.com/mcp';

/**
 * Web chat widget that answers the AI assistant drawer. It belongs to the docs account
 * (AG-5FXRJCBV2K) and is connected to the docs assistant. Empty keeps the drawer in its
 * "not configured" state.
 */
export const WEBCHAT_WIDGET_ID = 'dbc1a796-c975-11f1-b4fa-32fd05cad730';

/** Public conversation API used by the web chat widget (prod; the docs widget lives there). */
export const CONVERSATION_API_URL = 'https://conversation-prod.apigateway.co/conversation.v1.ConversationService';

/** Firestore environment segment matching CONVERSATION_API_URL. */
export const CONVERSATION_FIRESTORE_ENV = 'prod';

/** Conversations' Firebase project and its public web API key (from the web chat widget's config). */
export const INBOX_FIREBASE_PROJECT = 'inbox-291119';
export const INBOX_FIREBASE_API_KEY = 'AIzaSyAmrv372h8otvJv6mBdHZzywPn5d6h6oPc';

/** This site's host. Semantic hits from it become in-app links. */
export const SITE_HOST = 'docs.vendasta.com';

/** Hosts whose semantic hits are shown, with the label used for sibling sites. */
export const SEMANTIC_RESULT_HOSTS: Record<string, string> = {
  'docs.vendasta.com': '',
  'docs.businessapp.io': 'Business App docs',
};
