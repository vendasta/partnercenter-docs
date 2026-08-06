import React from "react";

interface LabCalloutProps {
  /** What this lab section does, e.g. "create the employee and its profile" */
  title: string;
  children: React.ReactNode;
}

export default function LabCallout({
  title,
  children,
}: LabCalloutProps): JSX.Element {
  return (
    <div className="lab-callout">
      <p className="lab-callout__title">
        <span className="lab-callout__badge">Lab</span>
        {title}
      </p>
      <div className="lab-callout__body">{children}</div>
    </div>
  );
}
