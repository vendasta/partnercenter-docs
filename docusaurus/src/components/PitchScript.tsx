import React, {type ReactNode} from 'react';

// Pieces for the per-industry pitch scripts in the Sell the AI Workforce path.
// They mirror the visual language of the marketing pitch guides: a row of stat
// cards, numbered stage bars down the call, and the lines a rep actually says
// set apart from the coaching around them. CSS: .pitch-* in custom.css.

type Stat = {figure: string; caption: string};

// Four-up stat cards. Big figure, small caption underneath.
export function PitchStats({items, source}: {items: Stat[]; source?: string}) {
  return (
    <div className="pitch-stats-wrap">
      <div className="pitch-stats">
        {items.map((s) => (
          <div className="pitch-stat" key={s.figure + s.caption}>
            <div className="pitch-stat__figure">{s.figure}</div>
            <div className="pitch-stat__caption">{s.caption}</div>
          </div>
        ))}
      </div>
      {source ? <p className="pitch-stats__source">{source}</p> : null}
    </div>
  );
}

// Numbered stage bar: the step number in a badge, the stage name beside it.
// Every stage after the first draws a rail up to the one before it, so the
// five read as one sequence. Keyed off n rather than a CSS :first-of-type,
// which would match the first <div> of any kind in the rendered MDX.
export function PitchStage({n, title}: {n: number; title: string}) {
  const cls = n > 1 ? 'pitch-stage pitch-stage--linked' : 'pitch-stage';
  return (
    <div className={cls}>
      <span className="pitch-stage__num">{n}</span>
      <span className="pitch-stage__title">{title}</span>
    </div>
  );
}

// A line the rep says out loud. Set apart so it is findable mid-call.
export function PitchSay({children}: {children: ReactNode}) {
  return <div className="pitch-say">{children}</div>;
}

// The buyer profile block at the top of an industry script.
export function PitchWho({children}: {children: ReactNode}) {
  return <div className="pitch-who">{children}</div>;
}

// The discovery questions. Wraps the ordered list so each question reads as a
// card with its branches indented beneath it, instead of one long bullet wall.
// Content stays plain markdown inside: `1.` items with `-` sub-bullets.
export function PitchAsk({children}: {children: ReactNode}) {
  return <div className="pitch-ask">{children}</div>;
}

// A partner testimonial inside the proof stage. Replaces markdown blockquotes,
// which the repo bans because a stray `>` renders as one by accident.
export function PitchQuote({
  author,
  children,
}: {
  author: string;
  children: ReactNode;
}) {
  return (
    <figure className="pitch-quote">
      <blockquote className="pitch-quote__body">{children}</blockquote>
      <figcaption className="pitch-quote__author">{author}</figcaption>
    </figure>
  );
}
