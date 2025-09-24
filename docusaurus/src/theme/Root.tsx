import React, {useEffect, useRef} from 'react';
import {useLocation} from '@docusaurus/router';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    Cookiebot?: {
      show?: () => void;
    };
  }
}

const COOKIE_SETTINGS_SELECTOR = '[data-cookie-settings-link]';

type CookieSettingsEvent = MouseEvent | React.MouseEvent<HTMLAnchorElement> | undefined;

function openCookieSettings(event?: CookieSettingsEvent) {
  event?.preventDefault();

  if (typeof window !== 'undefined' && window.Cookiebot?.show) {
    window.Cookiebot.show();
  } else {
    // eslint-disable-next-line no-console
    console.warn('Cookiebot not available yet.');
  }
}

export default function Root({children}: {children: React.ReactNode}): React.ReactElement {
  const location = useLocation();
  const previousPathRef = useRef<string>('');

  // Push pageview event to dataLayer on initial load and on every route change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];

    const page_path = `${location.pathname}${location.search}`;
    const payload = {
      event: 'pageview',
      page_path,
      page_title: typeof document !== 'undefined' ? document.title : '',
      page_location: typeof window !== 'undefined' ? window.location.href : '',
      previous_path: previousPathRef.current,
      referrer: typeof document !== 'undefined' ? document.referrer : '',
    };

    window.dataLayer.push(payload);

    // Update previous path for next navigation
    previousPathRef.current = page_path;
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;

    const elements = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(COOKIE_SETTINGS_SELECTOR),
    );

    const listeners = elements.map((element) => {
      const handler = (event: MouseEvent) => openCookieSettings(event);
      element.addEventListener('click', handler);
      return {element, handler};
    });

    return () => {
      listeners.forEach(({element, handler}) => {
        element.removeEventListener('click', handler);
      });
    };
  }, [location.pathname, location.search]);
  return (
    <>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe 
          src="https://www.googletagmanager.com/ns.html?id=GTM-M8CQT5"
          height="0" 
          width="0" 
          style={{display: 'none', visibility: 'hidden'}}
        />
      </noscript>
      {children}
    </>
  );
}
