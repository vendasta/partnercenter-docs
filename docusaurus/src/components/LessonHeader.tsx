import React from "react";

type Difficulty = "Foundational" | "Beginner" | "Intermediate" | "Advanced";

interface LessonHeaderProps {
  difficulty: Difficulty;
  /** e.g. "about 7 minutes" */
  time: string;
  /** What the learner can do after this step */
  outcomes: string[];
  /** Technical requirements only: access level, product activations, connected assets. Defaults to ["None"]. */
  required?: string[];
  /** Step includes video content */
  video?: boolean;
  /** Hands-on build step */
  lab?: boolean;
  /** e.g. "Getting started" */
  pathName?: string;
  step?: number;
  totalSteps?: number;
}

export default function LessonHeader({
  difficulty,
  time,
  outcomes,
  required = ["None"],
  video = false,
  lab = false,
  pathName,
  step,
  totalSteps,
}: LessonHeaderProps): JSX.Element {
  return (
    <div className="lesson-header">
      <div className="lesson-header__tags">
        <span
          className={`lesson-header__tag lesson-header__tag--${difficulty.toLowerCase()}`}
        >
          {difficulty}
        </span>
        {video && (
          <span className="lesson-header__tag lesson-header__tag--video">
            Video
          </span>
        )}
        {lab && (
          <span className="lesson-header__tag lesson-header__tag--lab">
            Lab
          </span>
        )}
        {pathName && step && totalSteps && (
          <span className="lesson-header__position">
            {pathName} · Step {step} of {totalSteps}
          </span>
        )}
      </div>

      <div className="lesson-header__bar">
        <span>
          <strong>Estimated time</strong> · {time}
        </span>
        <span className="lesson-header__divider">|</span>
        <span>
          <strong>Required</strong> · {required.join(", ")}
        </span>
      </div>

      <div className="lesson-header__outcomes">
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
  );
}
