import React from 'react';
import styles from './ScriptExample.module.css';

export interface ScriptExampleProps {
  /** Small uppercase label above the script. */
  label?: string;
  children: React.ReactNode;
}

/**
 * Example language a rep says out loud — a call opener, a check-in question, a
 * close. Use this instead of a markdown blockquote: `>` is banned repo-wide
 * because it renders as an unintended blockquote.
 *
 * Each paragraph inside is treated as one separate thing the rep says.
 */
export function ScriptExample({ label = 'Say it like this', children }: ScriptExampleProps) {
  return (
    <div className={styles.script}>
      <span className={styles.label}>{label}</span>
      <div className={styles.body}>{children}</div>
    </div>
  );
}

export default ScriptExample;
