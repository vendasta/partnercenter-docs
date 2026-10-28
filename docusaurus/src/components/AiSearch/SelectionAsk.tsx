import React, {useCallback, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {translate} from '@docusaurus/Translate';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {quoteInAssistant} from './assistant';
import {AI_SEARCH_LOCALES} from './config';
import {SparklesIcon} from './Icons';
import './aiSearch.css';

/** Article body: docs, training and MDX pages. */
const ARTICLE_SELECTOR = '.theme-doc-markdown, .markdown';
const MIN_LENGTH = 3;
const MAX_LENGTH = 1500;
const BUTTON_HEIGHT = 36;

type Anchor = {top: number; left: number; text: string};

function cleanSelection(raw: string): string {
  const text = raw.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  return text.length > MAX_LENGTH ? `${text.slice(0, MAX_LENGTH).trimEnd()}…` : text;
}

/** Where to show the button for the current selection, or null when it isn't article text. */
function readSelection(): Anchor | null {
  const selection = window.getSelection();
  if (!selection || selection.isCollapsed || selection.rangeCount === 0) return null;
  const range = selection.getRangeAt(0);
  const node = range.commonAncestorContainer;
  const element = node.nodeType === Node.ELEMENT_NODE ? (node as Element) : node.parentElement;
  if (!element?.closest(ARTICLE_SELECTOR) || element.closest('.ais-drawer')) return null;

  const text = cleanSelection(selection.toString());
  if (text.length < MIN_LENGTH) return null;

  const rect = range.getBoundingClientRect();
  const navbar = document.querySelector('.navbar')?.getBoundingClientRect().bottom ?? 60;
  // Above the selection; below it when that would slide under the navbar.
  const above = rect.top - BUTTON_HEIGHT - 8;
  const top = (above > navbar ? above : rect.bottom + 8) + window.scrollY;
  const center = rect.left + rect.width / 2;
  const left = Math.min(Math.max(center, 60), window.innerWidth - 60) + window.scrollX;
  return {top, left, text};
}

/**
 * Floating "Ask AI" button over highlighted article text. Clicking it opens the assistant
 * drawer with the passage quoted in the composer. Mounted once in theme/Root.
 */
export default function SelectionAsk(): React.ReactElement | null {
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const enabled = AI_SEARCH_LOCALES.includes(currentLocale);
  const {pathname} = useLocation();
  const [anchor, setAnchor] = useState<Anchor | null>(null);
  const draggingRef = useRef(false);

  const update = useCallback(() => {
    if (!draggingRef.current) setAnchor(readSelection());
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    let timer: number | undefined;
    // selectionchange covers mouse, keyboard and touch selection; wait until a drag ends.
    const onSelectionChange = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(update, 150);
    };
    const onPointerDown = (event: PointerEvent) => {
      if ((event.target as Element | null)?.closest('.ais-quote-btn')) return;
      draggingRef.current = true;
      setAnchor(null);
    };
    const onPointerUp = () => {
      draggingRef.current = false;
      onSelectionChange();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setAnchor(null);
    };
    document.addEventListener('selectionchange', onSelectionChange);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onSelectionChange);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('selectionchange', onSelectionChange);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onSelectionChange);
    };
  }, [enabled, update]);

  useEffect(() => setAnchor(null), [pathname]);

  if (!enabled || !anchor) return null;

  const send = () => {
    const pageTitle =
      document.querySelector('article h1')?.textContent?.trim() || document.title.split('|')[0].trim();
    quoteInAssistant({text: anchor.text, pageTitle, pageUrl: pathname});
    window.getSelection()?.removeAllRanges();
    setAnchor(null);
  };

  return createPortal(
    <button
      type="button"
      className="ais-quote-btn"
      style={{top: anchor.top, left: anchor.left}}
      // Keep the selection alive until the click lands.
      onMouseDown={(event) => event.preventDefault()}
      onClick={send}>
      <SparklesIcon size={15} />
      {translate({id: 'aiSearch.selection.ask', message: 'Ask AI'})}
    </button>,
    document.body,
  );
}
