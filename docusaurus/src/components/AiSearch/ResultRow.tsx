import React from 'react';
import Link from '@docusaurus/Link';
import {DocIcon} from './Icons';
import {breadcrumbText, pageLink, snippetHtml, titleHtml} from './resultUtils';
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
      to={pageLink(hit.url, hit.tokens)}
      onMouseEnter={onHover}
      onClick={onSelect}
      role="option"
      aria-selected={active}
      data-source={hit.source}>
      <DocIcon size={16} className="ais-row__icon" />
      <span className="ais-row__body">
        <span
          className="ais-row__title"
          // Plugin helper escapes the text and wraps matches in <mark>.
          dangerouslySetInnerHTML={{__html: titleHtml(hit.title, hit.tokens)}}
        />
        {hit.snippet && (
          <span
            className="ais-row__desc"
            dangerouslySetInnerHTML={{__html: snippetHtml(hit.snippet, hit.tokens, snippetLength)}}
          />
        )}
        {hit.breadcrumb.length > 0 && (
          <span className="ais-row__path">{breadcrumbText([...hit.breadcrumb, hit.title])}</span>
        )}
      </span>
    </Link>
  );
}
