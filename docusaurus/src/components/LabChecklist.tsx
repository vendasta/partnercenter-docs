import React, { useEffect, useState } from "react";

interface LabChecklistProps {
  /** Unique key for saving progress, e.g. "run-your-first-snapshot-lab-1" */
  storageKey: string;
  /** One entry per action, in order */
  steps: React.ReactNode[];
  /** The confirm signal at the end; lights up when every step is checked */
  confirm: React.ReactNode;
}

const STORAGE_PREFIX = "vendasta_learn_lab_";

const GREEN = "#3F9B63";
const NAVY = "#072337";

export default function LabChecklist({
  storageKey,
  steps,
  confirm,
}: LabChecklistProps): JSX.Element {
  const [checked, setChecked] = useState<boolean[]>(() =>
    steps.map(() => false)
  );

  // Restore saved progress after mount (never during server-side render).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_PREFIX + storageKey);
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved) && saved.length === steps.length) {
          setChecked(saved.map(Boolean));
        }
      }
    } catch {
      // Private browsing or storage disabled: the checklist still works, it just forgets.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      try {
        window.localStorage.setItem(
          STORAGE_PREFIX + storageKey,
          JSON.stringify(next)
        );
      } catch {
        // Storage unavailable: in-memory state still applies.
      }
      return next;
    });
  };

  const done = checked.length > 0 && checked.every(Boolean);

  return (
    <div>
      <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {steps.map((step, i) => (
          <li
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.6rem",
              padding: "0.35rem 0",
            }}
          >
            <input
              type="checkbox"
              id={`${storageKey}-step-${i}`}
              checked={checked[i]}
              onChange={() => toggle(i)}
              style={{
                marginTop: "0.3rem",
                width: "1rem",
                height: "1rem",
                accentColor: GREEN,
                cursor: "pointer",
                flexShrink: 0,
              }}
            />
            <label
              htmlFor={`${storageKey}-step-${i}`}
              style={{
                cursor: "pointer",
                opacity: checked[i] ? 0.6 : 1,
                transition: "opacity 0.15s ease",
              }}
            >
              <span style={{ fontWeight: 700, marginRight: "0.4rem" }}>
                {i + 1}.
              </span>
              {step}
            </label>
          </li>
        ))}
      </ol>
      <div
        style={{
          marginTop: "0.75rem",
          padding: "0.6rem 0.9rem",
          borderLeft: `3px solid ${done ? GREEN : "#c9ced3"}`,
          borderRadius: "0 6px 6px 0",
          background: done ? "#e8f4ed" : "transparent",
          color: NAVY,
          opacity: done ? 1 : 0.75,
          transition: "background 0.25s ease, border-color 0.25s ease",
        }}
      >
        {done && (
          <span
            style={{ color: GREEN, fontWeight: 700, marginRight: "0.45rem" }}
          >
            &#10003;
          </span>
        )}
        {confirm}
      </div>
    </div>
  );
}
