import React from "react";
import Link from "@docusaurus/Link";

export interface PathCard {
  /** Card heading, e.g. "Prospecting" */
  title: string;
  /** One sentence on what this part is for */
  description: string;
  /** Three or so concrete things the part covers */
  topics: string[];
  /** Route to the step */
  to: string;
}

interface PathCardsProps {
  cards: PathCard[];
}

export default function PathCards({ cards }: PathCardsProps): JSX.Element {
  return (
    <div className="path-cards">
      {cards.map((card) => (
        <div key={card.to} className="path-cards__card">
          <h3 className="path-cards__title">{card.title}</h3>
          <hr className="path-cards__rule" />
          <p className="path-cards__description">{card.description}</p>
          <p className="path-cards__topics-label">Key topics:</p>
          <ul className="path-cards__topics">
            {card.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
          <Link className="path-cards__link" to={card.to}>
            Learn more &rarr;
          </Link>
        </div>
      ))}
    </div>
  );
}
