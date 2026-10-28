import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useLocation} from '@docusaurus/router';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {translate} from '@docusaurus/Translate';
import SearchMenu from '../../components/AiSearch/SearchMenu';
import {AiStarIcon} from '../../components/AiSearch/Icons';
import '../../components/AiSearch/aiSearch.css';

function isTypingTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
}

/**
 * Header search bar (type here; "/" or ⌘K focuses it) with a dropdown menu of the AI
 * answer card and top articles. The menu's "Ask AI Assistant" row opens the assistant drawer.
 */
export default function SearchBar(): React.ReactElement {
  const isBrowser = useIsBrowser();
  const location = useLocation();

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    inputRef.current?.blur();
  }, []);

  const reset = useCallback(() => {
    close();
    setQuery('');
  }, [close]);

  // "/" and ⌘K / Ctrl+K focus the search bar from anywhere.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const cmdK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
      const slash = event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey && !isTypingTarget(event.target);
      if (cmdK || slash) {
        event.preventDefault();
        setOpen(true);
        inputRef.current?.focus();
        inputRef.current?.select(); // typing replaces any previous query
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Close on a click anywhere outside the bar and its menu.
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  // A result was opened: reset the bar.
  useEffect(() => {
    setOpen(false);
    setQuery('');
  }, [location.pathname]);

  const placeholder = translate({id: 'aiSearch.bar.placeholder', message: 'Search'});

  return (
    <div className="ais-nav">
      <div className={`ais-box ${open ? 'is-open' : ''}`} ref={rootRef}>
        <div
          className="ais-box__field"
          onClick={() => {
            setOpen(true);
            inputRef.current?.focus();
          }}>
          <AiStarIcon size={17} className="ais-box__icon" gradient />
          <input
            ref={inputRef}
            className="ais-box__input"
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                event.preventDefault();
                close();
              }
            }}
            placeholder={placeholder}
            aria-label={placeholder}
            role="combobox"
            aria-expanded={open}
            aria-controls="ais-menu"
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
            maxLength={1000}
          />
          {query ? (
            <button
              type="button"
              className="ais-box__clear"
              aria-label={translate({id: 'aiSearch.bar.clear', message: 'Clear search'})}
              onMouseDown={(event) => event.preventDefault()}
              onClick={(event) => {
                event.stopPropagation();
                setQuery('');
                inputRef.current?.focus();
              }}>
              ✕
            </button>
          ) : (
            !open && (
              <kbd className="ais-box__kbd" aria-hidden="true">
                /
              </kbd>
            )
          )}
        </div>
        {open && isBrowser && <SearchMenu query={query} inputRef={inputRef} onClose={close} onReset={reset} />}
      </div>
    </div>
  );
}
