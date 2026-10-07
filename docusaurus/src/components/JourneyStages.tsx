import React from "react";
import Link from "@docusaurus/Link";

// Start here (training/index.mdx): the six learning paths as numbered,
// expandable bars. Collapsed, the bars are the outline of the whole journey
// and fit above the fold; expanded, a bar shows every step in that path with a
// link, plus a Start link into the path overview. Native <details> so it works
// without JavaScript and stays keyboard-accessible. Styles: .journey in
// src/css/custom.css. Added 2026-10-07 (Learn sidebar reorg, phase 1).

export interface JourneyStep {
  title: string;
  to: string;
  description: string;
}

export interface JourneyStage {
  title: string;
  /** One line shown under the title while collapsed. */
  tagline: string;
  /** Short chips, e.g. ["9 steps", "2 h 15 min"]. */
  meta: string[];
  /** Paragraph shown when expanded, above the steps. */
  blurb: string;
  steps: JourneyStep[];
  to: string;
  /** Defaults to "Start". Use "Open" for a reference page. */
  cta?: string;
}

interface JourneyStagesProps {
  stages: JourneyStage[];
  /** Zero-based index of a stage to render expanded on load. */
  defaultOpen?: number;
}

export default function JourneyStages({ stages, defaultOpen }: JourneyStagesProps): JSX.Element {
  return (
    <ol className="journey">
      {stages.map((stage, i) => (
        <li key={stage.to} className="journey__stage">
          <details className="journey__details" open={i === defaultOpen}>
            <summary className="journey__summary">
              <span className="journey__number" aria-hidden="true">{i + 1}</span>
              <span className="journey__heading">
                <span className="journey__title">{stage.title}</span>
                <span className="journey__tagline">{stage.tagline}</span>
              </span>
              <span className="journey__meta">
                {stage.meta.map((m) => (
                  <span key={m} className="journey__chip">{m}</span>
                ))}
              </span>
              <svg className="journey__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <div className="journey__body">
              <p className="journey__blurb">{stage.blurb}</p>
              <ol className="journey__steps">
                {stage.steps.map((step) => (
                  <li key={step.to} className="journey__step">
                    <Link to={step.to} className="journey__step-link">{step.title}</Link>
                    <span className="journey__step-desc">{step.description}</span>
                  </li>
                ))}
              </ol>
              <Link to={stage.to} className="journey__start">
                {stage.cta ?? "Start"} {stage.title}
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}
