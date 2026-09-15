import React, {type ReactNode} from 'react';

// Tinted section band for lesson pages. Wrap alternating ## sections to give
// the page a course rhythm instead of one long document. CSS: .lesson-band.
export default function LessonSection({children}: {children: ReactNode}) {
  return <section className="lesson-band">{children}</section>;
}
