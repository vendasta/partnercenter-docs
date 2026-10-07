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

// One line icon per stage, in the order the call runs: pick up, ask, explain,
// show the proof, ask for the meeting. Line weight and the 24x24 box match
// src/components/Icons.tsx so they sit with the rest of the site.
const STAGE_ICONS: Record<number, ReactNode> = {
  1: ( // Phone: open the call
    <>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </>
  ),
  2: ( // Magnifier: discover the gap
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  3: ( // Lightbulb: present the fix
    <>
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M15.1 14a5.5 5.5 0 1 0-6.2 0c.6.5 1.1 1.2 1.1 2h4c0-.8.5-1.5 1.1-2Z" />
    </>
  ),
  4: ( // Rising trend: prove it works
    <>
      <path d="m3 16 5.5-5.5 3.5 3.5L21 5" />
      <path d="M15 5h6v6" />
    </>
  ),
  5: ( // Check in a circle: close the call
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
};

// Numbered stage bar: the step number in a badge, the stage name beside it,
// and the stage's own icon at the far end. Every stage after the first draws a
// rail up to the one before it, so the five read as one sequence. Both are
// keyed off n rather than a CSS :first-of-type, which would match the first
// <div> of any kind in the rendered MDX.
export function PitchStage({n, title}: {n: number; title: string}) {
  const cls = n > 1 ? 'pitch-stage pitch-stage--linked' : 'pitch-stage';
  const icon = STAGE_ICONS[n];
  return (
    <div className={cls}>
      <span className="pitch-stage__num">{n}</span>
      <span className="pitch-stage__title">{title}</span>
      {icon ? (
        <svg
          className="pitch-stage__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          {icon}
        </svg>
      ) : null}
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
