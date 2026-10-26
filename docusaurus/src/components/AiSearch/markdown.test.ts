import {describe, expect, it} from 'vitest';
import {renderMarkdown} from './markdown';

describe('renderMarkdown', () => {
  it('renders images as links instead of loading them', () => {
    const html = renderMarkdown('See ![diagram](https://example.com/p.png?q=secret)');
    expect(html).not.toContain('<img');
    expect(html).toContain('href="https://example.com/p.png?q=secret"');
    expect(html).toContain('>diagram</a>');
  });

  it('drops javascript:, data: and vbscript: links', () => {
    for (const scheme of ['javascript:alert(1)', 'data:text/html,hi', 'vbscript:msgbox(1)']) {
      const html = renderMarkdown(`[click](${scheme})`);
      expect(html).not.toMatch(/javascript:|data:|vbscript:/);
      expect(html).toContain('click');
    }
  });

  it('keeps only http, https, mailto and relative links', () => {
    expect(renderMarkdown('[irc](irc://example.com/chan)')).not.toContain('irc://');
    expect(renderMarkdown('[mail](mailto:help@example.com)')).toContain('href="mailto:help@example.com"');
    expect(renderMarkdown('[page](/marketing/email)')).toContain('href="/marketing/email"');
  });

  it('escapes raw HTML', () => {
    const html = renderMarkdown('<script>alert(1)</script> <img src=x onerror=alert(1)>');
    expect(html).not.toContain('<script');
    expect(html).not.toContain('<img');
  });

  it('opens external https links in a new tab', () => {
    expect(renderMarkdown('[docs](https://docs.vendasta.com/x)')).toContain(
      '<a href="https://docs.vendasta.com/x" target="_blank" rel="noopener noreferrer"',
    );
  });
});
