import React from 'react';
import Link from '@docusaurus/Link';

type CardsProps = {
  children: React.ReactNode;
  cols?: 2 | 3 | 4;
  variant?: 'plain';
};

export function Cards({ children, cols = 3 }: CardsProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }[cols];

  return (
    <div className={`vs-cards-grid ${gridCols}`}>{children}</div>
  );
}

type CardProps = {
  href: string;
  title: string;
  children?: React.ReactNode;
  icon?: string; // static path under /img or external
  badge?: string;
  className?: string;
};

export function Card({ href, title, children, icon, badge, className }: CardProps) {
  const isExternal = /^https?:\/\//.test(href);
  const content = (
    <>
      {icon && (
        <img className="vs-card-icon" src={icon} alt="" loading="lazy" />
      )}
      <div className="vs-card-content">
        <div className="vs-card-title">
          {title}
          {badge && <span className="vs-card-badge">{badge}</span>}
        </div>
        {children && <div className="vs-card-desc">{children}</div>}
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a className={`vs-card${className ? ` ${className}` : ''}`} href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link className={`vs-card${className ? ` ${className}` : ''}`} to={href}>
      {content}
    </Link>
  );
}

export default { Cards, Card };


