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

- Ensure `.triage/` is in the repo's `.gitignore` (it holds the exports and per-run
  scratch; none of it should ever be committed).
- Two bundled scripts, both zero-dependency and both run from the repo root:
  - `inspect-export.mjs` — Step 0. Identifies the exports in `.triage/` by shape and
    checks they pair correctly.
  - `validate.mjs` — Step 2. Resolves citations against `docusaurus/docs`. No flag needed.

## Hard rules

1. **Commit only article changes.** Never commit conversation data, findings, snippets,
   or anything under `.triage/`.
2. **Findings are ephemeral.** The exports, `findings.json`, and `validated.*` are per-run
   scratch — inputs, not artifacts. Everything worth keeping goes in the PR description.
3. **Single repo.** Every citation is expected to resolve to an article in this repo.
   A citation that does not resolve is surfaced as `CITED_NOT_IN_REPO` (it likely lives
   on the vendasta.com docs site). Never silently drop it.
4. **Documentation only — training is out of scope.** This triage covers `docusaurus/docs`
   and nothing else. `docusaurus/training` (the LEARN tab, served at `/learn`) is a separate
   editorial track with its own review process — see the `learning-path-writing` skill. A
   `/learn` citation is reported and tagged `(training — out of scope)`, never matched into
   `docs`, and never actioned here. Do not propose training edits from this run.
5. **No staleness-by-age.** A file's git age does NOT mean it is out of date. Age is only
   a sort key for review order, never a verdict. The real out-of-sync signal is the
   conversation itself (a Citation Failure or Post-Citation Escalation on an article).
6. **Snippets may go to the model as-is** — the API org is covered by Zero Data Retention,
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

**Input:** drop the export(s) in `.triage/` **under their original filenames — do not rename
them.** Two different exports feed this skill and both download as sensible names on their
own (`exported-conversations_<user>_<timestamp>.json` and `report.json`). Renaming is what
made them collide on the first run.

0. **Identify the inputs before reading them.** From the repo root run:

   ```bash
   node .claude/skills/ai-assistant-conversations-triage/inspect-export.mjs
   ```

   It classifies every file in `.triage/` **by shape, not by filename**, reports what each
   can and cannot be used for, surfaces the known analyzer data-quality traps automatically,
   and checks that the two exports cover the same window. Act on what it prints:

   - **Window mismatch** — the exports are from different pulls. Stop and ask for a matching
     pair; calibrating across pulls produces plausible but meaningless results, and nothing
     downstream would catch it.
   - **Raw only** — stop and ask for the analyzer. Do not derive gap type (see below).
   - **Analyzer only** — you have counts but no quotes, so Step 3 cannot run. Ask for the raw
     export.
   - **Neither** — ask the user to export and drop the files in `.triage/`.

**Two exports exist, and neither is sufficient alone:**

- **Analyzer summary** — top-level `aggregates`, usually downloaded as `report.json`. Carries
  `ai_process_gaps` (the real per-bucket counts), `intents`, `csat`, `escalation_breakdown`,
  `total_citations`. **This is the only trustworthy source of gap type.** If `examples` and
  `conversation_topics` are empty objects, findings cannot be mapped to conversations, so it
  can calibrate but cannot drive Step 1 on its own — ask for the per-conversation variant.
- **Raw conversation dump** — top-level `conversations[]`, usually downloaded as
  `exported-conversations_<user>_assistant_system_<timestamp>.json`. Each conversation has
  `messages[]` of `{message_id, participant_id, message_type, body, created, ui_components,
  media, metadata}`. **This is the only source of verbatim partner quotes**, which the
  judgment step in Step 3 depends on. Beware: `metadata` is null throughout, `participant_id`
  is opaque (derive speaker from the first chronological message), and `messages` is **not**
  reliably ordered — sort by `created` before splitting speakers, or alternation breaks on
  roughly half the conversations.

Neither replaces the other: the analyzer knows *how many* and of what type, the raw dump
shows *why*. A run with only one of them is a partial run — say so rather than filling the
gap by inference.

**Do not derive gap type from the raw dump.** It was tried and it fails badly — measured
against the analyzer on the same 2,742 conversations: Knowledge Gap 280 derived vs 114 actual,
Post-Citation Escalation 73 vs 1. The cause is structural: **citations are retrieval metadata,
not links in the message body.** The analyzer counts 10,028 citations at a 92.6% citation rate,
while only 1,884 of 14,336 message bodies contain any URL. "No URL in the body" says nothing
about whether the assistant had a source.

1. **Normalize.** From the **per-conversation** export, identify the fields for: conversation
   id, gap type, intent, outcome, CSAT, the partner's message/snippet, and the cited article
   (title and/or URL). Field names vary — do not assume, look. Write `.triage/findings.json`
   as an array of:
   `{ id, gapType, intent, outcome, csat, snippet, citedArticle: {title, url} | null }`.
   Keep only Knowledge Gap, Citation Failure, and Post-Citation Escalation findings.

   Two filters that matter when reading snippets:
   - **Partner Center app URLs are not citations.** `partners.vendasta.com`, `crm.*`,
     `*.smblogin.com` and partner white-label domains are product deep-links. Only
     `docs.vendasta.com`, `docs.businessapp.io`, `servicesdocs.io`, `developers.vendasta.com`
     and `support.vendasta.com` are documentation.
   - **Not every finding is documentation work.** A large share of low-turn conversations are
     pure escalation requests ("human", "speak with support") or the app's own
     "Help me fix something" button label, and others are account-specific incidents
     (`AG-*`/`ORD-*`, site down, stuck order). Neither is a doc gap — drop them before ranking.

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

5. **Record, then clean up.** In that order — the record has to exist before the scratch it
   was built from is deleted. See Continuity and Cleanup below.

## Continuity

**The decision record goes in the PR description.** That is the only durable output of a run:
nothing under `.triage/` is ever committed, so anything not written into the PR is lost.
Include:

- Export window and the gap counts per bucket
- Each article changed, with a one-line reason tied to what partners actually did
- Anything deferred, with the open question and who needs to answer it — these outlive the
  PR and are what the next run should start from
- Anything needing a live UI check before it can be actioned

## Cleanup (end of every run)

`.triage/` holds partner PII — the 2026-08 derived files carried 91 unique account IDs and
email addresses, and the raw export holds far more. It is gitignored, so it will not be
committed, but it should not linger on disk either.

Once the PR description is written, delete the derived scratch:

```bash
rm -f .triage/findings.json .triage/themes.json .triage/validated.json \
      .triage/validated.md .triage/worklist.md
```

This removes the **files only** — `.triage/` itself stays, so the next run has nothing to
recreate and no window where a fresh export lands before the ignore rule applies. Never
`rm -rf` the directory.

**Ask before deleting the exports themselves** — anything `inspect-export.mjs` identified as
a raw dump or analyzer summary. Re-obtaining one is a manual step the user may not want to
repeat, so removing them is their call, not an automatic action. Do prompt for it: an
export sitting on disk is the largest concentration of partner PII in the working tree.

### The ignore rule is permanent

`.gitignore` carries `.triage/` as a tracked, committed line. It survives deleting the
directory's contents, and being a directory rule it covers every filename inside — including
awkward ones with spaces and parentheses. It does not need re-adding between runs, and
exports keep their original filenames safely.

Verify it once at the start of a run, before any export is read, and stop if it ever fails:

```bash
git check-ignore -q ".triage/probe.json" || echo "STOP: .triage/ is not ignored"
```

## First-run calibration (once)

- Export field names may differ from the defaults assumed in Step 1. Run
  `inspect-export.mjs` first, then inspect one conversation object and confirm the mapping
  before trusting output.
- Sample the analyzer's **Unknown/Unclear** bucket — real undocumented area or noise?
- Decide what **Engagement Drop-off** means in your data before acting on it. On the
  2026-08 export it was 684 — larger than every other gap bucket combined — and undefined.

## Known analyzer data-quality issues (2026-08 export)

Verified against `aggregates`; confirm they are still present before trusting either field:

- **`escalation_after_citations` is not credible.** It reported 1, while `citation_rate` was
  0.926 and `escalated` was 365 — nearly every escalation must have followed a citation-bearing
  response. Treat Post-Citation Escalation counts as suspect until the definition is confirmed.
- **CSAT is a relabel of resolution, not a survey.** `csat.satisfied` (2219) was exactly
  `ai_resolved` (2219), `resolution_rate` == `satisfaction_rate` == 0.80926, and
  `not_satisfied` + `neutral` (523) was exactly `escalated` + `unresolved` (523). CSAT carries
  no signal beyond the outcome field — **do not prioritize on it** (this weakens the
  reach × severity ranking in Prioritization above).
