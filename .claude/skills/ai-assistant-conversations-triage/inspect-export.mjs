#!/usr/bin/env node
/**
 * inspect-export.mjs — Step 0 of the documentation-triage loop.
 *
 * Identifies every export sitting in .triage/ by its SHAPE, not its filename, and reports
 * what each one can and cannot be used for. Run this before reading any export.
 *
 * Why shape and not filename: on the 2026-08 run both inputs were called "report" — a 22MB
 * raw conversation dump and a 7KB analyzer summary, separated only by a browser's "(1)"
 * suffix. The raw dump was mistaken for analyzer output, gap types were derived from message
 * bodies, and the result was Knowledge Gap 280 vs 114 actual. Filenames are a hint here,
 * never the decision.
 *
 * It also checks that the two exports cover the SAME window. Pairing a raw dump with an
 * analyzer summary from a different pull produces plausible-looking but meaningless
 * calibration, and nothing else in the pipeline would catch it.
 *
 * Zero dependencies. Run with:
 *   node .claude/skills/ai-assistant-conversations-triage/inspect-export.mjs
 * Options:
 *   --dir=<path>   directory to scan (default: .triage)
 *
 * Exit codes: 0 = at least one usable export found; 1 = nothing usable.
 */

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  })
);

const DIR = args.dir || ".triage";

// Files this pipeline writes itself — never treat them as inputs.
const DERIVED = new Set(["findings.json", "themes.json", "validated.json"]);

const human = (n) =>
  n > 1048576 ? `${(n / 1048576).toFixed(1)}MB` : n > 1024 ? `${Math.round(n / 1024)}KB` : `${n}B`;

const day = (iso) => (iso ? String(iso).slice(0, 10) : null);

/** Identify an export by its structure. */
function classify(data) {
  if (data && Array.isArray(data.conversations)) return "raw";
  if (data && data.aggregates && typeof data.aggregates === "object") return "analyzer";
  if (Array.isArray(data) && data.length && data[0] && "gapType" in data[0]) return "findings";
  return "unknown";
}

function describeRaw(data) {
  const convs = data.conversations;
  let min = null;
  let max = null;
  let messages = 0;
  let unordered = 0;
  for (const c of convs) {
    const created = c.created;
    if (created) {
      if (!min || created < min) min = created;
      if (!max || created > max) max = created;
    }
    const ms = c.messages || [];
    messages += ms.length;
    for (let i = 1; i < ms.length; i++) {
      if (ms[i].created < ms[i - 1].created) {
        unordered++;
        break;
      }
    }
  }
  return {
    kind: "raw",
    summary: `${convs.length} conversations, ${messages} messages`,
    from: day(min),
    to: day(max),
    notes: [
      unordered
        ? `${unordered} conversations have out-of-order messages — sort by \`created\` before splitting speakers`
        : null,
    ].filter(Boolean),
    usableFor: ["verbatim partner quotes (the judgment step)"],
    notUsableFor: ["gap type — citations are retrieval metadata, not links in message bodies"],
  };
}

function describeAnalyzer(data) {
  const a = data.aggregates;
  const gaps = a.ai_process_gaps || {};
  const days = Object.keys(a.outcomes_by_day || {}).sort();
  const emptyExamples =
    !data.examples || Object.keys(data.examples).length === 0;
  const emptyTopics =
    !a.conversation_topics || Object.keys(a.conversation_topics).length === 0;

  const notes = [];
  if (emptyExamples || emptyTopics) {
    notes.push(
      `\`examples\`${emptyExamples ? " (empty)" : ""} / \`conversation_topics\`${
        emptyTopics ? " (empty)" : ""
      } — findings CANNOT be mapped to conversations, so this alone cannot drive Step 1`
    );
  }
  // Known data-quality traps (see SKILL.md).
  const rate = (a.channels?.AIAssistant?.citation_rate ?? null);
  const escalated = a.totals?.escalated ?? null;
  if (gaps.escalation_after_citations != null && rate != null && escalated != null) {
    if (gaps.escalation_after_citations <= 1 && rate > 0.5 && escalated > 10) {
      notes.push(
        `\`escalation_after_citations\` = ${gaps.escalation_after_citations} is not credible against a ${rate.toFixed(
          3
        )} citation rate and ${escalated} escalations — treat as broken`
      );
    }
  }
  const csat = a.csat || {};
  const resolved = a.totals?.ai_resolved;
  if (csat.satisfied != null && resolved != null && csat.satisfied === resolved) {
    notes.push("CSAT is a relabel of resolution (satisfied === ai_resolved) — do not prioritize on it");
  }

  return {
    kind: "analyzer",
    summary: Object.keys(gaps).length
      ? Object.entries(gaps)
          .map(([k, v]) => `${k} ${v}`)
          .join(", ")
      : "no ai_process_gaps block",
    from: days[0] || null,
    to: days[days.length - 1] || null,
    notes,
    usableFor: ["gap type and per-bucket counts (the truth for classification)"],
    notUsableFor: emptyExamples || emptyTopics ? ["mapping findings to specific conversations"] : [],
  };
}

if (!existsSync(DIR)) {
  console.error(`No ${DIR}/ directory. Create it and drop the export(s) there.`);
  process.exit(1);
}

const files = readdirSync(DIR)
  .filter((f) => f.toLowerCase().endsWith(".json"))
  .filter((f) => !DERIVED.has(f));

if (!files.length) {
  console.error(`No exports found in ${DIR}/. Drop the analyzer and/or raw conversation export there.`);
  process.exit(1);
}

const found = [];
console.log(`Scanning ${DIR}/ — identifying by shape, not filename.\n`);

for (const f of files.sort()) {
  const full = join(DIR, f);
  const size = statSync(full).size;
  let data;
  try {
    data = JSON.parse(readFileSync(full, "utf8"));
  } catch (e) {
    console.log(`✗ ${f}  (${human(size)})\n   not valid JSON — ${e.message.slice(0, 80)}\n`);
    continue;
  }

  const kind = classify(data);
  if (kind === "findings") {
    console.log(`· ${f}  (${human(size)})\n   derived findings from a previous run — not an input\n`);
    continue;
  }
  if (kind === "unknown") {
    console.log(`? ${f}  (${human(size)})\n   unrecognised shape — top-level keys: ${Object.keys(data).slice(0, 6).join(", ")}\n`);
    continue;
  }

  const info = kind === "raw" ? describeRaw(data) : describeAnalyzer(data);
  info.file = f;
  found.push(info);

  console.log(`✓ ${f}  (${human(size)})`);
  console.log(`   TYPE:   ${info.kind === "raw" ? "RAW CONVERSATION DUMP" : "ANALYZER SUMMARY"}`);
  console.log(`   DATA:   ${info.summary}`);
  console.log(`   WINDOW: ${info.from || "?"} → ${info.to || "?"}`);
  for (const u of info.usableFor) console.log(`   USE:    ${u}`);
  for (const n of info.notUsableFor) console.log(`   NOT:    ${n}`);
  for (const n of info.notes) console.log(`   WARN:   ${n}`);
  console.log();
}

const raw = found.find((f) => f.kind === "raw");
const analyzer = found.find((f) => f.kind === "analyzer");

console.log("─".repeat(72));

if (raw && analyzer) {
  const sameStart = raw.from === analyzer.from;
  const sameEnd = raw.to === analyzer.to;
  if (sameStart && sameEnd) {
    console.log(`Both exports present and cover the same window (${raw.from} → ${raw.to}).`);
  } else {
    console.log("WINDOW MISMATCH — these two exports are from different pulls:");
    console.log(`   raw:      ${raw.from} → ${raw.to}   (${raw.file})`);
    console.log(`   analyzer: ${analyzer.from} → ${analyzer.to}   (${analyzer.file})`);
    console.log("Calibrating one against the other would produce plausible but meaningless");
    console.log("results. Stop and ask for a matching pair before continuing.");
  }
} else if (analyzer && !raw) {
  console.log("Analyzer only. You have real gap counts but no verbatim quotes, so the");
  console.log("judgment step cannot run. Ask for the raw conversation export.");
} else if (raw && !analyzer) {
  console.log("Raw dump only. You have quotes but no gap classification. Do NOT derive gap");
  console.log("type from message bodies — ask for the analyzer export instead.");
}

process.exit(found.length ? 0 : 1);
