---
name: ai-assistant-conversations-triage
description: Turn a periodic export of the docs-site AI assistant's conversations into reviewed documentation fixes for partnercenter-docs. Run manually with /ai-assistant-conversations-triage.
disable-model-invocation: true
---

# AI Assistant Conversations — Documentation Triage

This skill runs the documentation-triage loop for `partnercenter-docs` (a Docusaurus
site): it turns an export of partner ↔ AI-assistant conversations into reviewed article
fixes. It is **manual-only** — run it deliberately with `/ai-assistant-conversations-triage`,
typically once a month.

## Setup (once)

- Ensure `.triage/` is in the repo's `.gitignore` (it holds the export and per-run
  scratch; none of it should ever be committed).
- The bundled `validate.mjs` defaults to reading articles from `docusaurus/docs`. No
  flag needed as long as you run from the repo root.

## Hard rules

1. **Commit only article changes.** Never commit conversation data, findings, snippets,
   or anything under `.triage/`.
2. **Findings are ephemeral.** `report.json`, `findings.json`, and `validated.*` are
   per-run scratch — inputs, not artifacts.
3. **Single repo.** Every citation is expected to resolve to an article in this repo.
   A citation that does not resolve is surfaced as `CITED_NOT_IN_REPO` (it likely lives
   on the vendasta.com docs site). Never silently drop it.
4. **No staleness-by-age.** A file's git age does NOT mean it is out of date. Age is only
   a sort key for review order, never a verdict. The real out-of-sync signal is the
   conversation itself (a Citation Failure or Post-Citation Escalation on an article).
5. **Snippets may go to the model as-is** — the API org is covered by Zero Data Retention,
   so no scrubbing step is required. (If that changes, sanitize snippets first.)

## The two checks per finding

Resolve the cited article to a file, then determine:
- **(a) Does the article exist in the repo?** — deterministic, done by `validate.mjs`.
- **(b) Does the article actually answer the partner's question?** — judgment: read the
  article against the verbatim snippets. This is the step the script cannot do.

Note: being listed in the sidebar is NOT the same as being in the AI's retrieval index,
so no sidebar check is run. The case that matters — a Knowledge Gap whose article already
exists — surfaces during the judgment step as `EXISTS_UNINDEXED`.

## Verdict buckets → action

- `MISSING` — Knowledge Gap, no matching article → **write a new article.** First confirm
  it's truly missing and not just unindexed (topic-search the repo).
- `EXISTS_WRONG` — article found, but a Citation Failure or your read shows it doesn't
  answer the question → **fix / rewrite for correctness.**
- `EXISTS_UNCLEAR` — article found and correct, but partners still struggled
  (Post-Citation Escalation) → **clarify / restructure.**
- `EXISTS_UNINDEXED` — a "Knowledge Gap" whose article actually exists in the repo (found
  by topic-searching during the judgment step, NOT by `validate.mjs`) → **not a writing
  job.** The doc is fine; the AI's retrieval missed it. Flag it for the AI-index owner.
- `CITED_NOT_IN_REPO` — citation didn't resolve → **surface for a human to eyeball**
  (probably the vendasta.com site). Do not act blindly.

Three layers: content can be missing in the **repo** (write it), present but
**unlinked/undeployed** (publish it), or present but **unindexed by the AI** (reindex it).
The fix differs — don't treat all three as "write a doc."

## Prioritization

Rank proposed work by **reach × severity**. Reach = topic volume + how often the article
is cited (the analyzer's Top Citations). Severity: MISSING ≈ EXISTS_WRONG > EXISTS_UNCLEAR.

## Run protocol

**Input:** the export lives at `.triage/report.json`. If missing, stop and ask the user to
export the conversations and drop the file there.

1. **Normalize (adapt to the real export shape).** Read a few objects from
   `.triage/report.json` and identify the fields for: conversation id, gap type, intent,
   outcome, CSAT, the partner's message/snippet, and the cited article (title and/or URL).
   Field names vary — do not assume, look. Write `.triage/findings.json` as an array of:
   `{ id, gapType, intent, outcome, csat, snippet, citedArticle: {title, url} | null }`.
   Keep only Knowledge Gap, Citation Failure, and Post-Citation Escalation findings.

2. **Deterministic checks.** From the repo root run:
   `node .claude/skills/ai-assistant-conversations-triage/validate.mjs`
   It builds the doc index from `docusaurus/docs`, matches each finding to a file, assigns
   verdicts, and writes `.triage/validated.json` + `.triage/validated.md`. Read the latter.

3. **Judgment + worklist.** For each `EXISTS_*` finding, open the matched article and read
   it against the snippets. Reclassify where the read disagrees (e.g. a `MISSING` whose
   article turns out to exist → `EXISTS_UNINDEXED`). Cluster into doc themes. Produce a
   prioritized worklist (reach × severity) — theme, verdict, matched file(s), git age
   (context only), and 3–5 verbatim snippets as evidence. Confirm scope with the user
   before writing anything.

4. **Draft.** On a new branch, draft edits (or new articles) for the confirmed worklist.
   Edit ONLY article files. Then STOP — the user reviews diffs inline and commits. Do not
   commit, and never stage anything under `.triage/`.

5. **Continuity.** Remind the user to append one line to their metrics log (date, window,
   counts per bucket, slugs touched), kept OUTSIDE the repo — see below.

## Continuity

After each run, append one line to a metrics log kept **outside** the repo (a private note
or Sheet): date, export window, count per gap type, article slugs touched. This is the only
cross-run memory — without it you cannot tell whether a fix landed.

## First-run calibration (once)

- The `report.json` field names may differ from the defaults assumed in Step 1. On the
  first run, inspect one conversation object and confirm the mapping before trusting output.
- Sample the analyzer's **Unknown/Unclear** bucket — real undocumented area or noise?
- Decide what **Engagement Drop-off** means in your data before acting on it.
