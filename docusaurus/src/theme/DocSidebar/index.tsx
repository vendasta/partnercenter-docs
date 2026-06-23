import React, {type ReactElement} from 'react';
import OriginalDocSidebar from '@theme-original/DocSidebar';
import type {Props} from '@theme/DocSidebar';
import {useLocation} from '@docusaurus/router';

export default function DocSidebarWrapper(props: Props): ReactElement {
  const {pathname} = useLocation();
  const isTraining = pathname.startsWith('/platform-training');

  return (
    <div className="custom-sidebar-wrapper">
      <div className="sidebar-pill-placeholder">
        <a
          href="/"
          className={`sidebar-pill${!isTraining ? ' sidebar-pill--active' : ''}`}
        >
          DOCUMENTATION
        </a>
        <a
          href="/platform-training"
          className={`sidebar-pill${isTraining ? ' sidebar-pill--active' : ''}`}
        >
          TRAINING
        </a>
      </div>
      <div className="sidebar-menu-container">
        <OriginalDocSidebar {...props} />
      </div>
      <div className="sidebar-footer-container">
        <a
          href="https://docs.businessapp.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="business-app-sidebar-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="11"
            viewBox="0 0 17 13"
            fill="none"
            aria-hidden="true"
            style={{flexShrink: 0}}>
            <path
              d="M13.3333 0L10 3.33333H12.5V9.16667C12.5 10.0833 11.75 10.8333 10.8333 10.8333C9.91667 10.8333 9.16667 10.0833 9.16667 9.16667V3.33333C9.16667 1.49167 7.675 0 5.83333 0C3.99167 0 2.5 1.49167 2.5 3.33333V9.16667H0L3.33333 12.5L6.66667 9.16667H4.16667V3.33333C4.16667 2.41667 4.91667 1.66667 5.83333 1.66667C6.75 1.66667 7.5 2.41667 7.5 3.33333V9.16667C7.5 11.0083 8.99167 12.5 10.8333 12.5C12.675 12.5 14.1667 11.0083 14.1667 9.16667V3.33333H16.6667L13.3333 0Z"
              fill="white"
            />
          </svg>
          <span>Switch to Business App Docs</span>
        </a>
      </div>
    </div>
  );
}
