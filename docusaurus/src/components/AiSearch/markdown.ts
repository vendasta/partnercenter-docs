import {micromark} from 'micromark';

/** Link schemes allowed in assistant replies; relative links (no scheme) are always kept. */
const SAFE_LINK = /^(https?:|mailto:|[/#?.]|[^:/?#]+(?:[/?#]|$))/i;

/**
 * Render assistant markdown to HTML. Replies come from a public chat backend, so the
 * output is treated as untrusted: micromark escapes raw HTML and drops script-style
 * links, images become plain links so nothing loads on render, and only http, https,
 * mailto and relative links keep their href. External links open in a new tab.
 */
export function renderMarkdown(markdown: string): string {
  const html = micromark(markdown ?? '', {allowDangerousHtml: false});
  return html
    .replace(/<img src="([^"]*)" alt="([^"]*)"(?: title="[^"]*")? \/>/g, (_match, src: string, alt: string) =>
      src ? `<a href="${src}">${alt || src}</a>` : alt,
    )
    .replace(/<a href="([^"]*)"/g, (match, href: string) => {
      if (!SAFE_LINK.test(href)) return '<a';
      if (!/^https?:\/\//i.test(href)) return match;
      try {
        const url = new URL(href);
        if (typeof window !== 'undefined' && url.host === window.location.host) return match;
      } catch {
        return match;
      }
      return `<a href="${href}" target="_blank" rel="noopener noreferrer"`;
    });
}
