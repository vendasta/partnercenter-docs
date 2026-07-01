import React, { useState } from 'react';
import styles from './FlipCard.module.css';

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
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <span className={styles.frontText}>{front}</span>
          {subtext && <span className={styles.subtext}>{subtext}</span>}
        </div>
        <div className={styles.cardBack}>
          <span className={styles.backText}>{back}</span>
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

export function FlipCardGrid({ children }: FlipCardGridProps) {
  return <div className={styles.grid}>{children}</div>;
}

export default FlipCard;
