import React from 'react';
import {translate} from '@docusaurus/Translate';
import {AiStarIcon} from './Icons';

type AskRowProps = {
  query: string;
  active?: boolean;
  onHover?: () => void;
  onSelect: () => void;
  className?: string;
};

/** One-line "Ask AI" row that hands the query to the assistant drawer (search menu and results page). */
export default function AskRow({query, active = false, onHover, onSelect, className = ''}: AskRowProps) {
  return (
    <button
      type="button"
      className={`ais-ask ${active ? 'is-active' : ''} ${className}`}
      onPointerEnter={onHover}
      // Keep focus in the search input so typing and arrow keys keep working.
      onMouseDown={(event) => event.preventDefault()}
      onClick={onSelect}
      role="option"
      aria-selected={active}>
      <span className="ais-ask__body">
        <span className="ais-badge">
          <AiStarIcon size={12} /> {translate({id: 'aiSearch.badge', message: 'Ask AI'})}
        </span>
        {query && <span className="ais-ask__query">“{query}”</span>}
      </span>
      {active && (
        <kbd className="ais-ask__kbd" aria-hidden="true">
          ↵
        </kbd>
      )}
    </button>
  );
}
