import React from "react";

const KNOWN_LEVELS = [
  "foundational",
  "beginner",
  "intermediate",
  "advanced",
];

interface PathHeaderProps {
  /** Number of steps in the path, e.g. 9 renders "9 parts" */
  parts: number;
  /** e.g. "Beginner" or "Beginner to Intermediate" */
  difficulty: string;
  /** Subject pills, e.g. ["Prospecting", "Discovery", "Closing"] */
  topics?: string[];
  /** Total time across the path, e.g. "about 2 hours". Omit when steps are still
   *  unpublished and a total would be a guess. */
  time?: string;
  /** Technical requirements only. Defaults to ["None"]. */
  required?: string[];
  /** What the path builds, in one short paragraph */
  objective: string;
  /** What the learner can do once the whole path is done */
  outcomes: string[];
}

export default function PathHeader({
  parts,
  difficulty,
  topics = [],
  time,
  required = ["None"],
  objective,
  outcomes,
}: PathHeaderProps): JSX.Element {
  const level = difficulty.toLowerCase();
  const levelClass = KNOWN_LEVELS.includes(level)
    ? `lesson-header__tag--${level}`
    : "lesson-header__tag--foundational";

  return (
    <div className="path-header">
      <div className="lesson-header__tags">
        <span className="path-header__count">
          {parts} parts
        </span>
        <span className={`lesson-header__tag ${levelClass}`}>{difficulty}</span>
        {topics.map((topic) => (
          <span key={topic} className="path-header__topic">
            {topic}
          </span>
        ))}
      </div>

      <div className="lesson-header__bar">
        {time && (
          <>
            <span>
              <strong>Estimated time</strong> · {time}
            </span>
            <span className="lesson-header__divider">|</span>
          </>
        )}
        <span>
          <strong>Required</strong> · {required.join(", ")}
        </span>
      </div>

      <div className="path-header__panel">
        <div>
          <p className="lesson-header__outcomes-label">Objective</p>
          <div className="path-header__objective">{objective}</div>
        </div>
        <div>
          <p className="lesson-header__outcomes-label">Outcomes</p>
          <div>
            {outcomes.map((outcome) => (
              <div key={outcome} className="lesson-header__outcome">
                <span className="lesson-header__check">&#10003;</span>
                {outcome}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
