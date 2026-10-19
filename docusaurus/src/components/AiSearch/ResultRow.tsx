import React from 'react';
import Link from '@docusaurus/Link';
import {DocIcon} from './Icons';
import {breadcrumbText, hitLink, snippetHtml, titleHtml} from './resultUtils';
import type {PageHit} from './types';

type Props = {
  hit: PageHit;
  active?: boolean;
  onHover?: () => void;
  onSelect?: () => void;
  /** Longer snippet on the results page. */
  snippetLength?: number;
};

/** One search hit, Stripe-style: icon, highlighted title, snippet, breadcrumb. */
export default function ResultRow({hit, active, onHover, onSelect, snippetLength = 140}: Props) {
  return (
    <Link
      className={`ais-row ${active ? 'is-active' : ''}`}
      to={hitLink(hit)}
      {...(hit.external ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
      // Docusaurus Link replaces onMouseEnter on internal links with its prefetch handler,
      // so hover selection uses the pointer event, which passes through untouched.
      onPointerEnter={onHover}
      onClick={onSelect}
      role="option"
      aria-selected={active}
      data-source={hit.source}>
      <DocIcon size={16} className="ais-row__icon" />
      <span className="ais-row__body">
        <span className="ais-row__title">
          <span
            // Plugin helper escapes the text and wraps matches in <mark>.
            dangerouslySetInnerHTML={{__html: titleHtml(hit.title, hit.tokens)}}
          />
          {hit.external && (
            <span className="ais-row__ext" aria-label="opens in a new tab">
              ↗
            </span>
          )}
        </span>
        {hit.snippet && (
          <span
            className="ais-row__desc"
            dangerouslySetInnerHTML={{__html: snippetHtml(hit.snippet, hit.tokens, snippetLength)}}
          />
        )}
        <span className="ais-row__path">
          {breadcrumbText([
            ...hit.breadcrumb,
            // Category index pages already end their breadcrumb with their own title.
            ...(hit.breadcrumb[hit.breadcrumb.length - 1] === hit.title ? [] : [hit.title]),
            ...(hit.heading ? [hit.heading] : []),
          ])}
        </span>
      </span>
    </Link>
  );
}
