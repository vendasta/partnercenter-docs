import React, {useCallback, useEffect, useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {translate} from '@docusaurus/Translate';
import SearchModal from '../../components/AiSearch/SearchModal';
import {AI_SEARCH_LOCALES} from '../../components/AiSearch/config';
import {openAssistant} from '../../components/AiSearch/assistant';
import {SearchIcon, SparklesIcon} from '../../components/AiSearch/Icons';
import '../../components/AiSearch/aiSearch.css';

function isTypingTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
}

/**
 * Replaces the local-search plugin's navbar input with a compact "Search /" button that
 * opens the search dialog, plus an "Ask AI" button that opens the assistant.
 */
export default function SearchBar(): React.ReactElement {
  const [open, setOpen] = useState(false);
  const isBrowser = useIsBrowser();
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const aiEnabled = AI_SEARCH_LOCALES.includes(currentLocale);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const cmdK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
      const slash = event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey && !isTypingTarget(event.target);
      if (cmdK || slash) {
        event.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="ais-nav">
      <button
        type="button"
        className="ais-nav__search"
        onClick={() => setOpen(true)}
        aria-label={translate({id: 'aiSearch.trigger.label', message: 'Search'})}
        aria-haspopup="dialog">
        <SearchIcon size={15} />
        <span>{translate({id: 'aiSearch.trigger.text', message: 'Search'})}</span>
        <kbd aria-hidden="true">/</kbd>
      </button>
      {aiEnabled && (
        <button
          type="button"
          className="ais-nav__ask"
          onClick={() => openAssistant('', 'navbar')}
          aria-label={translate({id: 'aiSearch.trigger.askLabel', message: 'Ask AI'})}>
          <span>{translate({id: 'aiSearch.trigger.ask', message: 'Ask AI'})}</span>
          <SparklesIcon size={15} />
        </button>
      )}
      {open && isBrowser && <SearchModal onClose={close} />}
    </div>
  );
}
