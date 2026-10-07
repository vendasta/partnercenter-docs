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
  /** 'large' gives a taller card, for back text too long to fit without scrolling at the default size */
  size?: 'default' | 'large';
}

export function FlipCard({ front, back, subtext, href, size = 'default' }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`${styles.card} ${size === 'large' ? styles.cardLarge : ''} ${flipped ? styles.flipped : ''}`}
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

/* --- Icon variant, ported from the Vendasta LEARN AI Foundations path --- */

export type IconFlipCardGradient = 'blue' | 'green' | 'sunrise' | 'purple';

export interface IconFlipCardProps {
  /** The product or feature name: the whole front of the card */
  front: string;
  /** What it is and the one consequence worth remembering */
  back: React.ReactNode;
  /**
   * Optional icon element. Left empty on purpose: we have no Vendasta product
   * icon set, and generic stand-ins read as the wrong product. Pass a real
   * product icon here when one exists.
   */
  icon?: React.ReactNode;
  /** Gradient used for the back face, and for the icon tile when an icon is passed */
  gradient?: IconFlipCardGradient;
  /** 'large' gives a taller card with a left-aligned back, which fits list content */
  size?: 'default' | 'large';
}

export function IconFlipCard({
  front,
  back,
  icon,
  gradient = 'green',
  size = 'default',
}: IconFlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const iconNode = icon;
  const gradientClass = styles[`gradient_${gradient}`];
  return (
    <div
      className={`${styles.card} ${styles.showcase} ${iconNode ? '' : styles.noIcon} ${size === 'large' ? styles.showLarge : ''} ${flipped ? styles.flipped : ''}`}
      onClick={() => setFlipped(!flipped)}
      role="button"
      tabIndex={0}
      aria-expanded={flipped}
      onKeyDown={(e) => e.key === 'Enter' && setFlipped(!flipped)}
    >
      <div className={styles.cardInner}>
        <div className={styles.showFront}>
          {iconNode && <div className={`${styles.iconTile} ${gradientClass}`}>{iconNode}</div>}
          <span className={styles.showFrontLabel}>{front}</span>
          <span className={styles.flipHint} aria-hidden="true">&#8600;</span>
        </div>
        <div className={`${styles.showBack} ${gradientClass}`}>
          <span className={styles.showBackTitle}>{front}</span>
          <div className={styles.showBackText}>{back}</div>
          <span className={styles.flipHintBack} aria-hidden="true">&#8601;</span>
        </div>
      </div>
    </div>
  );
}

export function IconFlipCardGrid({ children }: FlipCardGridProps) {
  const cards = React.Children.toArray(children).slice(0, MAX_CARDS);
  return <div className={styles.showGrid}>{cards}</div>;
}

export default FlipCard;
