// Ambient declarations for the untyped internals of @easyops-cn/docusaurus-search-local
// that the AI search components reuse (search worker and highlight helpers).

declare module '@easyops-cn/docusaurus-search-local/dist/client/client/theme/searchByWorker' {
  export function fetchIndexesByWorker(baseUrl: string, searchContext: string): Promise<void>;
  export function searchByWorker(
    baseUrl: string,
    searchContext: string,
    input: string,
    limit: number,
  ): Promise<unknown[]>;
}

declare module '@easyops-cn/docusaurus-search-local/dist/client/client/utils/highlight' {
  export function highlight(content: string, tokens: string[], forceMatched?: boolean): string;
}
