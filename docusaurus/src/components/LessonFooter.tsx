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
  /** One line on what the next path covers, shown under the link so a learner can pick well on a final step */
  description?: string;
  /** Optional second destination, for a final step that offers a choice of two next paths */
  secondTo?: string;
  /** Name of the second next path, e.g. "Build with Vibe" */
  secondNextPathName?: string;
  secondLinkText?: string;
  /** One line on what the second path covers */
  secondDescription?: string;
}

export default function LessonFooter({
  to,
  pathName,
  step,
  totalSteps,
  nextPathName,
  title,
  linkText,
  description,
  secondTo,
  secondNextPathName,
  secondLinkText,
  secondDescription,
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
  const resolvedSecondLinkText =
    secondLinkText ??
    (isFinalStep && secondNextPathName ? `Keep learning: ${secondNextPathName}` : "Keep learning");
  return (
    <div className="lesson-footer">
      <p className="lesson-footer__title">{resolvedTitle}</p>
      {pathName && step && totalSteps && (
        <p className="lesson-footer__position">
          {pathName} · Step {step} of {totalSteps}
        </p>
      )}
      <div className="lesson-footer__links">
        <div className="lesson-footer__link-group">
          <Link className="lesson-footer__link" to={to}>
            {resolvedLinkText}
            <span className="lesson-footer__arrow" aria-hidden="true">
              &#8250;
            </span>
          </Link>
          {description && <p className="lesson-footer__description">{description}</p>}
        </div>
        {secondTo && (
          <div className="lesson-footer__link-group">
            <Link className="lesson-footer__link" to={secondTo}>
              {resolvedSecondLinkText}
              <span className="lesson-footer__arrow" aria-hidden="true">
                &#8250;
              </span>
            </Link>
            {secondDescription && (
              <p className="lesson-footer__description">{secondDescription}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
