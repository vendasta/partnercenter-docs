import React from "react";
import { journeyTotals, formatHours } from "../data/learnJourney";
import type { JourneyStage } from "../data/learnJourney";

// Start here hero: one line of totals computed from the journey data, so it
// never drifts from the stepper below it. Added 2026-10-08.

export default function JourneyTotals({ stages }: { stages: JourneyStage[] }) {
  const t = journeyTotals(stages);
  const items = [
    `${t.paths} paths`,
    `${t.steps} steps`,
    formatHours(t.minutes),
    `${t.skillChecks} skill checks`,
  ];
  return (
    <p className="learn-totals" aria-label="Journey at a glance">
      {items.map((item, i) => (
        <React.Fragment key={item}>
          {i > 0 && <span className="learn-totals__dot" aria-hidden="true">·</span>}
          <span className="learn-totals__item">{item}</span>
        </React.Fragment>
      ))}
    </p>
  );
}
