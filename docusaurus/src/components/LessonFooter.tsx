import React from "react";
import Link from "@docusaurus/Link";

interface LessonFooterProps {
  /** Where "Keep learning" goes: the next step, or the next path's overview on the final step */
  to: string;
  /** e.g. "Getting started" — renders the completed-step line when step/totalSteps are also set */
  pathName?: string;
  step?: number;
  totalSteps?: number;
  /** On the final step of a path: the name of the next path to try, e.g. "Hire your AI Workforce" */
  nextPathName?: string;
  title?: string;
  linkText?: string;
}

export default function LessonFooter({
  to,
  pathName,
  step,
  totalSteps,
  nextPathName,
  title,
  linkText,
}: LessonFooterProps): JSX.Element {
  const isFinalStep = Boolean(step && totalSteps && step === totalSteps);
  const resolvedTitle =
    title ??
    (isFinalStep
      ? "Congratulations! You have completed this learning path."
      : "Congratulations, you completed this step!");
  const resolvedLinkText =
    linkText ??
    (isFinalStep && nextPathName ? `Keep learning: ${nextPathName}` : "Keep learning");
  return (
    <div className="lesson-footer">
      <p className="lesson-footer__title">{resolvedTitle}</p>
      {pathName && step && totalSteps && (
        <p className="lesson-footer__position">
          {pathName} · Step {step} of {totalSteps}
        </p>
      )}
      <Link className="lesson-footer__link" to={to}>
        {resolvedLinkText}
        <span className="lesson-footer__arrow" aria-hidden="true">
          &#8250;
        </span>
      </Link>
    </div>
  );
}
