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
 * It also checks that all the exports cover the SAME window. Mixing pulls produces
 * plausible-looking but meaningless calibration, and nothing else in the pipeline would
 * catch it. Three exports feed this skill: the raw conversation dump (JSON), the analyzer
 * summary (JSON), and the per-conversation summary (CSV).
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
  let citations = 0;
  let convsWithCitations = 0;
  let offers = 0;
  let clicks = 0;
  let convsEscalated = 0;
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
    let cited = false;
    let clicked = false;
    for (const m of ms) {
      for (const kv of m.metadata || []) {
        if (kv.key !== "citations") continue;
        let arr;
        try {
          arr = JSON.parse(kv.value);
        } catch {
          continue;
        }
        if (Array.isArray(arr) && arr.length) {
          citations += arr.length;
          cited = true;
        }
      }
      for (const u of m.ui_components || []) {
        if (u.Type !== "button" || !u.Button) continue;
        offers++;
        const ca = u.Button.ClickedAt || "";
        if (ca && !ca.startsWith("0001-01-01")) {
          clicks++;
          clicked = true;
        }
      }
    }
    if (cited) convsWithCitations++;
    if (clicked) convsEscalated++;
  }

  // Cross-check these against the analyzer: citations_used, support_offers.offers,
  // support_offers.clicks and escalation_breakdown.button_clicked reproduced exactly on the
  // 2026-08 export. If they still match, the derivation in SKILL.md Step 1 is trustworthy.
  const notes = [
    unordered
      ? `${unordered} conversations have out-of-order messages — sort by \`created\` before splitting speakers`
      : null,
    convsWithCitations
      ? `citations ARE present in message.metadata — cross-check ${convsWithCitations} cited / ${offers} offers / ${clicks} clicks / ${convsEscalated} escalated against the analyzer`
      : `no citations found in message.metadata — the export shape may have changed; re-verify before deriving anything`,
  ].filter(Boolean);

  return {
    kind: "raw",
    summary:
      `${convs.length} conversations, ${messages} messages, ${citations} citations, ` +
      `${convsEscalated} escalated`,
    from: day(min),
    to: day(max),
    notes,
    usableFor: [
      "verbatim partner quotes (the judgment step)",
      "retrieval citations, per conversation (metadata[].key === 'citations')",
      "Post-Citation Escalation — cited article + a clicked escalation button",
    ],
    notUsableFor: [
      "Knowledge Gap / Citation Failure counts — definitions unknown, nothing here reproduces them",
      "intents, outcome, CSAT — analyzer only",
    ],
  };
}

const PC_REQUIRED = ["conversation_id", "outcome", "intent", "citations_used", "escalation_type"];

/** The per-conversation summary export — CSV, one row per conversation. */
function isPerConversationCsv(text) {
  const first = text.slice(0, 4096).split("\n")[0] || "";
  if (!first.includes(",")) return false;
  const cols = first.split(",").map((s) => s.trim().replace(/^"|"$/g, ""));
  return PC_REQUIRED.every((c) => cols.includes(c));
}

/**
 * Row-count and window only — a full RFC4180 parse is Step 1's job. Quoted fields can
 * contain newlines, so this is an approximation and is labelled as such.
 */
function describePerConversation(text) {
  const lines = text.split("\n");
  const header = (lines.shift() || "").split(",").map((s) => s.trim().replace(/^"|"$/g, ""));
  const idx = Object.fromEntries(header.map((h, i) => [h, i]));
  let min = null;
  let max = null;
  let rows = 0;
  const outcomes = {};
  for (const line of lines) {
    if (!line.trim()) continue;
    const cells = line.split(",");
    const id = cells[idx.conversation_id];
    if (!id || !id.startsWith("CONVERSATION-")) continue; // continuation of a quoted field
    rows++;
    const d = cells[idx.created_date];
    if (d) {
      if (!min || d < min) min = d;
      if (!max || d > max) max = d;
    }
    const o = cells[idx.outcome];
    if (o) outcomes[o] = (outcomes[o] || 0) + 1;
  }
  const unresolved = outcomes.unresolved || 0;
  const escalated = outcomes.escalated || 0;
  return {
    kind: "perconv",
    summary:
      `${rows} conversations — ` +
      Object.entries(outcomes)
        .map(([k, v]) => `${k} ${v}`)
        .join(", "),
    from: day(min),
    to: day(max),
    usableFor: [
      "per-conversation intent, outcome, CSAT — joins to the raw dump on conversation_id",
      `outcome=unresolved (${unresolved}) — a bucket neither other export exposes`,
      `outcome=escalated (${escalated}) — the FULL escalation set, not just button clicks`,
      "kb_mismatch and fallback_count — per-conversation flags, low volume",
    ],
    notUsableFor: [
      "ai_process_gaps — kb_mismatch and fallback_count do NOT reproduce knowledge_gaps/citation_failures",
      "verbatim quotes — example_ptr truncates to ~120 chars; use the raw dump",
    ],
    notes: [
      "escalation is NOT the same as a clicked button — rank on outcome=escalated or you will miss the user-requested ones",
      "kb_mismatch is heavily diluted with account-data lookups ('what is my partner ID') — read before ranking",
    ],
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
    usableFor: [
      "Knowledge Gap / Citation Failure counts — the only source for these",
      "intents, outcome, CSAT, escalation_breakdown",
      "cross-checking the raw dump's derived citation and escalation counts",
    ],
    notUsableFor: emptyExamples || emptyTopics ? ["mapping findings to specific conversations"] : [],
  };
}

if (!existsSync(DIR)) {
  console.error(`No ${DIR}/ directory. Create it and drop the export(s) there.`);
  process.exit(1);
}

const files = readdirSync(DIR)
  .filter((f) => /\.(json|csv)$/i.test(f))
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
  const text = readFileSync(full, "utf8");

  // The per-conversation summary is a CSV, not JSON — check before trying to parse.
  if (isPerConversationCsv(text)) {
    const info = describePerConversation(text);
    info.file = f;
    found.push(info);
    console.log(`✓ ${f}  (${human(size)})`);
    console.log(`   TYPE:   PER-CONVERSATION SUMMARY (CSV)`);
    console.log(`   DATA:   ${info.summary}`);
    console.log(`   WINDOW: ${info.from || "?"} → ${info.to || "?"}`);
    for (const u of info.usableFor) console.log(`   USE:    ${u}`);
    for (const n of info.notUsableFor) console.log(`   NOT:    ${n}`);
    for (const n of info.notes) console.log(`   WARN:   ${n}`);
    console.log();
    continue;
  }

  let data;
  try {
    data = JSON.parse(text);
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
const perconv = found.find((f) => f.kind === "perconv");

console.log("─".repeat(72));

if (perconv) {
  const others = [raw, analyzer].filter(Boolean);
  const mismatched = others.filter((o) => o.from !== perconv.from || o.to !== perconv.to);
  if (mismatched.length) {
    console.log("WINDOW MISMATCH — the per-conversation CSV is from a different pull than:");
    for (const o of mismatched) console.log(`   ${o.file}  (${o.from} → ${o.to})`);
    console.log("Stop and ask for a matching set.");
  } else if (raw) {
    console.log("BEST CASE: raw dump + per-conversation CSV. Join them on `conversation_id`");
    console.log("(2742/2742 matched on the 2026-08 export) — the CSV supplies intent, outcome and");
    console.log("CSAT, the raw dump supplies full quotes and the cited articles.");
    console.log("Rank on outcome=escalated AND outcome=unresolved. Do not rank on button clicks");
    console.log("alone; on 2026-08 that silently dropped 107 of the 365 escalations.");
  } else {
    console.log("Per-conversation CSV but no raw dump. You have outcomes and intents but no");
    console.log("quotes and no cited articles — ask for the raw conversation export.");
  }
  if (!analyzer) {
    console.log("No analyzer summary — Knowledge Gap and Citation Failure counts are unavailable.");
  }
} else if (raw && analyzer) {
  const sameStart = raw.from === analyzer.from;
  const sameEnd = raw.to === analyzer.to;
  if (sameStart && sameEnd) {
    console.log(`Raw dump + analyzer, same window (${raw.from} → ${raw.to}).`);
    console.log("Ask whether a per-conversation summary.csv is also available — it adds the");
    console.log("unresolved bucket and the full escalation set, neither of which these two expose.");
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
  console.log("Raw dump only — a partial run, not a blocked one. Ask for the analyzer, but say");
  console.log("what you can still do: Post-Citation Escalation is derivable from this export");
  console.log("alone (cited article + a clicked escalation button) and drives most of the");
  console.log("worklist. Knowledge Gap and Citation Failure counts are NOT derivable — take");
  console.log("those from the analyzer or leave them out. Never infer gap type from message");
  console.log("bodies: citations live in message.metadata, not in the text.");
}

const dupes = found.filter((f) => f.kind === "raw").length > 1 ||
  found.filter((f) => f.kind === "analyzer").length > 1;
if (dupes) {
  console.log();
  console.log("Two files share a shape — likely the same export saved twice under two names.");
  console.log("Checksum them (md5 -q <a> <b>) before treating them as a pair.");
}

process.exit(found.length ? 0 : 1);
