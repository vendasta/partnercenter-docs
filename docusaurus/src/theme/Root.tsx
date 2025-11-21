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
const FAQ_SCHEMA_SCRIPT_ID = 'faq-schema-script';
const FAQ_OBSERVER_TIMEOUT = 5000;

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

type FAQEntry = {
  question: string;
  answer: string;
};

function sanitizeText(text: string | null | undefined): string {
  return text?.replace(/\s+/g, ' ').trim() ?? '';
}

function extractFAQs(): FAQEntry[] {
  if (typeof document === 'undefined') return [];

  return Array.from(document.querySelectorAll('details'))
    .map((detail) => {
      const summary = detail.querySelector('summary');
      const question = sanitizeText(summary?.textContent ?? '');
      if (!summary || !question) return undefined;

      const clone = detail.cloneNode(true) as HTMLElement;
      clone.querySelector('summary')?.remove();
      const answer = sanitizeText(clone.textContent);
      if (!answer) return undefined;

      return {question, answer};
    })
    .filter((entry): entry is FAQEntry => Boolean(entry));
}

function applyFaqSchema(): boolean {
  if (typeof document === 'undefined') return false;

  const faqs = extractFAQs();
  const existingScript = document.getElementById(FAQ_SCHEMA_SCRIPT_ID);

  if (faqs.length === 0) {
    existingScript?.remove();
    return false;
  }

  const script = existingScript ?? document.createElement('script');
  script.id = FAQ_SCHEMA_SCRIPT_ID;
  script.type = 'application/ld+json';
  script.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  });

  if (!existingScript) {
    document.head.appendChild(script);
  }

  return true;
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

  useEffect(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') return undefined;

    let observer: MutationObserver | undefined;
    let timeoutId: number | undefined;

    const stopObserver = () => {
      observer?.disconnect();
      observer = undefined;
      if (typeof timeoutId === 'number') {
        window.clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    };

    const watchForFaqs = () => {
      if (applyFaqSchema()) return;

      observer = new MutationObserver(() => {
        if (applyFaqSchema()) {
          stopObserver();
        }
      });

      observer.observe(document.getElementById('__docusaurus') ?? document.body, {
        childList: true,
        subtree: true,
      });

      timeoutId = window.setTimeout(() => {
        stopObserver();
        applyFaqSchema();
      }, FAQ_OBSERVER_TIMEOUT);
    };

    watchForFaqs();

    return () => {
      stopObserver();
      document.getElementById(FAQ_SCHEMA_SCRIPT_ID)?.remove();
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
