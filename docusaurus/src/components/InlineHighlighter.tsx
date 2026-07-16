import React, { type ReactNode } from 'react';

export interface InlineHighlighterProps {
  courseId?: string;
  site?: string;
  children: ReactNode;
}

export default function InlineHighlighter({ children }: InlineHighlighterProps) {
  return <>{children}</>;
}
