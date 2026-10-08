import React from "react";
import Link from "@docusaurus/Link";

// Small labelled cards in a row: an uppercase kicker, one or two lines, and an
// optional arrow link. Start here uses it for "Where are you?", Before you
// begin, Three ways to get the work done, After path six, and Still stuck.
// Shape borrowed from the Documentation home cards so the two tabs read as
// one site. Styles: .rc in src/css/custom.css. Added 2026-10-08.

export interface RouterCard {
  kicker: string;
  text: string;
  to?: string;
  linkText?: string;
  /** Small muted line under the link, e.g. "Read 3 first if you have not." */
  note?: string;
}

interface RouterCardsProps {
  cards: RouterCard[];
  /** Minimum card width; the row wraps below it. Default 200px. */
  minWidth?: string;
}

export default function RouterCards({ cards, minWidth = "150px" }: RouterCardsProps) {
  return (
    <div className="rc" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))` }}>
      {cards.map((card) => {
        const body = (
          <>
            <span className="rc__kicker">{card.kicker}</span>
            <span className="rc__text">{card.text}</span>
            {card.to && card.linkText && (
              <span className="rc__link">
                {card.linkText}<span aria-hidden="true"> &rarr;</span>
              </span>
            )}
            {card.note && <span className="rc__note">{card.note}</span>}
          </>
        );
        return card.to ? (
          <Link key={card.kicker} to={card.to} className="rc__card rc__card--link">{body}</Link>
        ) : (
          <div key={card.kicker} className="rc__card">{body}</div>
        );
      })}
    </div>
  );
}
