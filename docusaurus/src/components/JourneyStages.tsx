import React, { useEffect } from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import { parseMinutes, type JourneyStage } from "../data/learnJourney";

// Start here (training/index.mdx): the Learn journey as a vertical stepper.
// A continuous line down the left, one numbered node per path, and a row that
// expands in place to the step list, with the skill check as the last row and
// a hand-off link to the next path. A reference page (sales assets) gets a
// book glyph and an Open button instead of Start. Native <details>, so it
// works without JavaScript; the only script is opening the stage named in the
// URL hash (/learn#make-your-first-sale), on load and on in-page hash changes. Data: src/data/learnJourney.ts.
// Styles: .jy in src/css/custom.css. Rebuilt 2026-10-08 from the earlier
// expandable bars (Start here redesign, after the docs-site landing research).

interface JourneyStagesProps {
  stages: JourneyStage[];
}

// Chip time, rounded down to the half hour so the row reads at a glance:
// "2 h 10 min" shows as "2 h", "1 h 40 min" as "1 h 30 min". The data keeps
// the exact time each PathHeader shows.
function roundedTime(time?: string): string | undefined {
  const minutes = Math.floor(parseMinutes(time) / 30) * 30;
  if (!minutes) return time;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return [h && `${h} h`, m && `${m} min`].filter(Boolean).join(" ");
}

function BookGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function QuizGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 11l2 2 4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function JourneyStages({ stages }: JourneyStagesProps) {
  // Runs on load and again whenever the hash changes, so an in-page "Next:"
  // link opens its stage the same way a /learn#... deep link does.
  const { hash } = useLocation();
  useEffect(() => {
    try {
      const id = hash.replace(/^#/, "");
      if (!id) return;
      const el = document.getElementById(id);
      const details = el?.querySelector("details");
      if (details) {
        details.open = true;
        el?.scrollIntoView({ block: "start" });
      }
    } catch {
      // Hash handling is a convenience only.
    }
  }, [hash]);

  return (
    <ol className="jy">
      {stages.map((stage, i) => {
        const next = stages[i + 1];
        const number = stages.slice(0, i + 1).filter((s) => !s.reference).length;
        const nextNumber = next && !next.reference ? stages.slice(0, i + 2).filter((s) => !s.reference).length : null;
        const cta = stage.reference ? "Open" : "Start";
        const chips = stage.chips ?? [roundedTime(stage.time), `${stage.steps.length} ${stage.reference ? "sections" : "steps"}`, stage.level].filter(Boolean) as string[];
        return (
          <li key={stage.id} id={stage.id} className={`jy__stage${stage.reference ? " jy__stage--reference" : ""}`}>
            <details className="jy__details">
              <summary className="jy__summary">
                <span className="jy__node" aria-hidden="true">
                  {stage.reference ? <BookGlyph /> : number}
                </span>
                <span className="jy__head">
                  {stage.reference && <span className="jy__kicker">Reference</span>}
                  <span className="jy__title">{stage.title}</span>
                  <span className="jy__tagline">{stage.tagline}</span>
                  <span className="jy__chips">
                    {chips.map((c) => (
                      <span key={c} className="jy__chip">{c}</span>
                    ))}
                    {stage.badge && <span className="jy__chip jy__chip--badge">{stage.badge}</span>}
                  </span>
                </span>
                <span className="jy__actions">
                  <Link to={stage.to} className="jy__start">
                    {cta}<span aria-hidden="true"> &rarr;</span>
                  </Link>
                  <svg className="jy__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </summary>
              <div className="jy__body">
                <p className="jy__blurb">{stage.blurb}</p>
                <ol className="jy__steps">
                  {stage.steps.map((step) => (
                    <li key={step.to} className="jy__step">
                      <Link to={step.to} className="jy__step-link">{step.title}</Link>
                      <span className="jy__step-desc">{step.description}</span>
                    </li>
                  ))}
                  {stage.skillCheck && (
                    <li className="jy__step jy__step--quiz">
                      <span className="jy__quiz-glyph" aria-hidden="true"><QuizGlyph /></span>
                      <Link to={stage.skillCheck.to} className="jy__step-link">Skill check</Link>
                      <span className="jy__step-desc">{stage.skillCheck.questions} scenario questions drawn from every step</span>
                    </li>
                  )}
                </ol>
                <div className="jy__foot">
                  <Link to={stage.to} className="jy__start jy__start--solid">
                    {cta} {stage.title}<span aria-hidden="true"> &rarr;</span>
                  </Link>
                  {next && (
                    <Link to={`#${next.id}`} className="jy__next">
                      {nextNumber ? `Next: ${nextNumber}. ` : "Then: "}{next.title}<span aria-hidden="true"> &rarr;</span>
                    </Link>
                  )}
                </div>
              </div>
            </details>
          </li>
        );
      })}
    </ol>
  );
}
