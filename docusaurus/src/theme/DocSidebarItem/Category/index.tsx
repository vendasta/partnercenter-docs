import React, {type ReactElement} from 'react';
import OriginalCategory from '@theme-original/DocSidebarItem/Category';
import type {Props} from '@theme/DocSidebarItem/Category';

// The grey-labeled, client-facing Vendasta Services documentation.
const GREY_LABEL_DOCS_URL = 'https://servicesdocs.io/';

export default function CategoryWrapper(props: Props): ReactElement {
  const isVendastaServices = props.item?.label === 'Vendasta Services';

  if (!isVendastaServices) {
    return <OriginalCategory {...props} />;
  }

  return (
    <div className="sidebar-category-with-link">
      <OriginalCategory {...props} />
      <a
        href={GREY_LABEL_DOCS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="sidebar-external-link-icon"
        title="Open the grey-labeled Vendasta Services docs"
        aria-label="Open the grey-labeled Vendasta Services docs (opens in a new tab)"
        onClick={(e) => e.stopPropagation()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </div>
  );
}
