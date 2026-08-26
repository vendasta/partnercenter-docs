import React from 'react';

type Item = {
  // Either an imported SVG (svgr turns it into a component) or an imported
  // image URL (png/jpg). Prefer real Vendasta brand imagery via img.
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  img?: string;
  title: string;
  text: string;
};

// Key-point rows: small illustration left, bold term + one-liner right.
export default function KeyPoints({items}: {items: Item[]}) {
  return (
    <div className="keypoints">
      {items.map((it) => (
        <div className="keypoints__row" key={it.title}>
          {it.img ? (
            <img className="keypoints__icon" src={it.img} alt="" loading="lazy" />
          ) : it.icon ? (
            <it.icon className="keypoints__icon" aria-hidden="true" />
          ) : null}
          <div>
            <div className="keypoints__title">{it.title}</div>
            <p className="keypoints__text">{it.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
