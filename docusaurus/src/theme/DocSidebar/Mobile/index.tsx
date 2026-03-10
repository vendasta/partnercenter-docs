import React from 'react';
import clsx from 'clsx';
import {
  NavbarSecondaryMenuFiller,
  type NavbarSecondaryMenuComponent,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import DocSidebarItems from '@theme/DocSidebarItems';
import type {Props} from '@theme/DocSidebar/Mobile';

// eslint-disable-next-line react/function-component-definition
const DocSidebarMobileSecondaryMenu: NavbarSecondaryMenuComponent<Props> = ({
  sidebar,
  path,
}) => {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <>
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
        <DocSidebarItems
          items={sidebar}
          activePath={path}
          onItemClick={(item) => {
            if (item.type === 'category' && item.href) {
              mobileSidebar.toggle();
            }
            if (item.type === 'link') {
              mobileSidebar.toggle();
            }
          }}
          level={1}
        />
      </ul>
      <div className="mobile-sidebar-footer">
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
    </>
  );
};

function DocSidebarMobile(props: Props) {
  return (
    <NavbarSecondaryMenuFiller
      component={DocSidebarMobileSecondaryMenu}
      props={props}
    />
  );
}

export default React.memo(DocSidebarMobile);
