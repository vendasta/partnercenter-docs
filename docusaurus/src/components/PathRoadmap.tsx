import React from "react";
import Link from "@docusaurus/Link";

export interface PathRoadmapStep {
  title: string;
  description: string;
  to: string;
}

interface PathRoadmapProps {
  steps: PathRoadmapStep[];
}

const PER_ROW = 4;

// Vendasta navy ramp: tint #788691 (lightest) -> shade #071C2A (darkest)
const LIGHTEST = [120, 134, 145];
const DARKEST = [7, 28, 42];

function shadeFor(index: number, count: number): string {
  const t = count > 1 ? index / (count - 1) : 1;
  const [r, g, b] = LIGHTEST.map((from, c) =>
    Math.round(from + (DARKEST[c] - from) * t)
  );
  return `rgb(${r}, ${g}, ${b})`;
}

export default function PathRoadmap({ steps }: PathRoadmapProps): JSX.Element {
  const perRow = Math.min(PER_ROW, steps.length);
  // 4 equal item columns with narrow arrow columns between: 1fr auto 1fr auto 1fr auto 1fr
  const columns = Array(perRow).fill("1fr").join(" auto ");

  return (
    <div className="path-roadmap" style={{ gridTemplateColumns: columns }}>
      {steps.map((step, i) => (
        <React.Fragment key={step.to}>
          {i > 0 && i % perRow !== 0 && (
            <span className="path-roadmap__arrow" aria-hidden="true">
              →
            </span>
          )}
          <div className="path-roadmap__item">
            <Link className="path-roadmap__link" to={step.to}>
              <div
                className="path-roadmap__box"
                style={{ background: shadeFor(i, steps.length) }}
              >
                {step.title}
              </div>
            </Link>
            <p className="path-roadmap__desc">{step.description}</p>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
