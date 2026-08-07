import React, { useState } from 'react';
import styles from './FlipCard.module.css';

function FlipIndicator() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 16.03 20 14.57 20 13c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 8.74C4.46 9.97 4 11.43 4 13c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"
        fill="currentColor"
      />
    </svg>
  );
}

export interface FlipCardProps {
  front: string;
  back: string;
  subtext?: string;
  href?: string;
}

export function FlipCard({ front, back, subtext, href }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`${styles.card} ${flipped ? styles.flipped : ''}`}
      onClick={() => setFlipped(!flipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setFlipped(!flipped)}
    >
      <span className={styles.flipBadge} aria-hidden="true">
        <FlipIndicator />
      </span>
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <span className={styles.frontText}>{front}</span>
          {subtext && <span className={styles.subtext}>{subtext}</span>}
        </div>
        <div className={styles.cardBack}>
          <span className={styles.backText}>{back}</span>
          {subtext && <span className={styles.subtext}>{subtext}</span>}
          {href && (
            <a
              href={href}
              className={styles.cardLink}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
            >
              View docs →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export interface FlipCardGridProps {
  children: React.ReactNode;
}

const MAX_CARDS = 3;

export function FlipCardGrid({ children }: FlipCardGridProps) {
  const cards = React.Children.toArray(children).slice(0, MAX_CARDS);
  return <div className={styles.grid}>{cards}</div>;
}

export default FlipCard;
