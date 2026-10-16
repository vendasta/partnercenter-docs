import {micromark} from 'micromark';

/**
 * Render assistant markdown to HTML. micromark escapes raw HTML by default, so the
 * assistant cannot inject markup. External links open in a new tab.
 */
export function renderMarkdown(markdown: string): string {
  const html = micromark(markdown ?? '', {allowDangerousHtml: false});
  return html.replace(/<a href="(https?:\/\/[^"]+)"/g, (match, href: string) => {
    try {
      const url = new URL(href);
      if (typeof window !== 'undefined' && url.host === window.location.host) return match;
    } catch {
      return match;
    }
    return `<a href="${href}" target="_blank" rel="noopener noreferrer"`;
  });
}
