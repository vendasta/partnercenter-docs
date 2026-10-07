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

Rank proposed work by **reach × severity**. Reach = the number of **distinct conversations
that ended in `escalated` or `unresolved`** and cited the article, counted from the joined
findings — the analyzer has no Top Citations field, despite what an earlier version of this
section claimed. Severity: MISSING ≈ EXISTS_WRONG greater than EXISTS_UNCLEAR.

Two ranking traps, both of which have already cost a run:

- **Do not rank on clicked escalation buttons.** That is 258 of 365 escalations; the rest asked
  in text. Rank on `outcome` from `summary.csv`.
- **Do not skip `unresolved`.** It is smaller (158) but it is the worse outcome, and its topic
  mix is completely different from the escalation mix — on 2026-08 it was almost entirely
  billing, plans, subscriptions and cancellation, a theme that barely registers in escalations.

Do not rank on CSAT; it carries no signal beyond the outcome field (see Known issues).

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
   and checks that the exports all cover the same window. Act on what it prints:

   - **Window mismatch** — the exports are from different pulls. Stop and ask for a matching
     pair; calibrating across pulls produces plausible but meaningless results, and nothing
     downstream would catch it.
   - **Raw only** — ask for the analyzer, but say what you can still do rather than stopping
     dead. Post-Citation Escalation is derivable from the raw dump alone and is the bucket that
     drives most of the worklist; Knowledge Gap and Citation Failure counts are not. Offer the
     partial run.
   - **Analyzer only** — you have counts but no quotes, so Step 3 cannot run. Ask for the raw
     export.
   - **Neither** — ask the user to export and drop the files in `.triage/`.
   - **Two files with the same shape** — the same export was downloaded twice under two names.
     Checksum them (`md5 -q <a> <b>`) before concluding anything; this has already happened
     once, with a raw dump saved as `report.json`.

   Also check whether the export is one you have already triaged. The analyzer numbers are the
   fingerprint — compare them against the Known issues section below. Re-running on the same
   export is legitimate as a deeper second pass, but say so up front and exclude the articles
   the previous pass already fixed.

**Three exports exist, and none is sufficient alone. Ask for all three.**

- **Analyzer summary** — top-level `aggregates`, usually downloaded as `report.json`. Carries
  `ai_process_gaps` (the per-bucket counts), `intents`, `csat`, `escalation_breakdown`,
  `total_citations`, `support_offers`. It is the only source of `intents` and of the
  Knowledge Gap / Citation Failure counts. **Both 2026-08 pulls came back with `examples` and
  `conversation_topics` as empty objects**, so it could not map any finding to a conversation.
  Assume that is the norm until a pull proves otherwise, and plan to drive Step 1 from the raw
  dump.
- **Raw conversation dump** — top-level `conversations[]`, usually downloaded as
  `exported-conversations_<user>_assistant_system_<timestamp>.json`. Each conversation has
  `conversation_id`, `created`, `channel` and `messages[]` of `{message_id, participant_id,
  message_type, body, created, updated, channel, metadata, ui_components, media}`. This is the
  only source of verbatim partner quotes, **and also of the retrieval citations and escalation
  events** — see the next section. Beware: `participant_id` is opaque (derive speaker from the
  first chronological message), `message_type` is always `"Message"` so it separates nothing,
  and `messages` is **not** reliably ordered — sort by `created` before splitting speakers, or
  alternation breaks on roughly half the conversations.

- **Per-conversation summary** — a **CSV**, downloaded as `summary.csv`, one row per
  conversation. Columns: `conversation_id, created_date, channel, intent, is_sales, outcome,
  csat, first_response_ms, turns_to_outcome, citations_used, citations_total, fallback_count,
  kb_mismatch, support_offer_count, support_click_count, support_chat_clicks,
  support_ticket_clicks, button_click_rate, escalation_user_requested,
  escalation_button_clicked, escalation_type, top_phrase, example_ptr`. **`conversation_id`
  joins straight to the raw dump** — 2742/2742 matched on the 2026-08 export. This is the
  per-conversation variant the earlier versions of this skill kept asking the analyzer for.
  Parse it with a real RFC4180 parser: `top_phrase` and `example_ptr` are quoted and contain
  commas, and `example_ptr` is a JSON string inside a CSV cell.

### The per-conversation CSV is the most useful of the three

It reproduces the analyzer **exactly** on `outcome` (2219 / 365 / 158), `csat`, every `intent`
count, and the whole `escalation_breakdown`. Two things it exposes that nothing else does:

- **`outcome=unresolved` (158 on 2026-08).** Conversations that ended badly without the partner
  even reaching a human. Neither other export surfaces this, and on 2026-08 it was where the
  single biggest documentation theme lived — see Carry-forward.
- **The full escalation set.** `outcome=escalated` is 365. Button clicks are only 258.
  **Ranking on clicked buttons alone silently drops 107 escalations** — the ones where the
  partner asked for a human in text rather than clicking. Pass 2 made exactly this mistake.
  Rank on `outcome`, not on buttons.

What it does **not** give you:

- **It does not reproduce `ai_process_gaps`.** `kb_mismatch` is 31 against 34 citation failures,
  and `fallback_count greater than 0` is 16 against 114 knowledge gaps. Close enough to be
  tempting, far enough to be wrong. Do not present either as the analyzer's bucket.
- **`kb_mismatch` is real but diluted.** All 31 had zero citations, and most are account-data
  lookups the assistant cannot answer from documentation at all ("what is my partner ID",
  "how many Website Hosting Pro do I have", "what is my AGID"). Perhaps a third are genuine
  uncovered topics — 2FA enforcement, voice receptionist overage pricing, password rules,
  product codes. Read all of them; the bucket is small enough that this is cheap.
- **`example_ptr` truncates.** It is `{first_ts, snippet}` with the snippet cut at ~120
  characters. Fine for scanning, useless as evidence. Take quotes from the raw dump.

### The raw dump carries citations and escalations — use them

An earlier version of this skill said `metadata` was null throughout and that gap type could
not be derived from the raw dump. **That was wrong, and it blocked a run.** The structural
claim behind it — that citations are retrieval metadata rather than links in the message body
— is true, but the metadata is right there in the export:

- `message.metadata` is an array of `{key, value}` pairs. Where `key === "citations"`, `value`
  is a **JSON string** that parses to an array of
  `{type, link, title, fileUrl, sourceNamespaceId, sourceNamespaceType}`. On the 2026-08
  export this was present and non-null on 5,810 of 14,336 messages.
- `message.ui_components` carries the escalation buttons as
  `{Type: "button", Button: {Label, ID, Action, Payload, ClickedAt}}`. A button was **clicked**
  when `ClickedAt` is set and does not start with `0001-01-01` (the zero value).
  `Button.Payload` parses to JSON holding a `conversationSummary` — an AI-written précis of the
  whole conversation, useful context for the judgment step.

Four independent counts derived this way reproduced the analyzer **exactly** on the 2026-08
export, which is what makes the derivation trustworthy:

| Derived from raw dump | Value | Analyzer field |
|---|---|---|
| Conversations with ≥1 citation | 2540 | `channels.AIAssistant.citations_used` 2540 |
| Buttons offered | 912 | `support_offers.offers` 912 |
| Buttons clicked | 316 | `support_offers.clicks` 316 |
| Conversations with a clicked button | 258 | `escalation_breakdown.button_clicked` 258 |

Total citations came out at 10,114 against the analyzer's 10,028 (0.9% high, most likely
intra-message dedup). Close enough to trust; not a field to quote precisely.

**What this does and does not license:**

- **Post-Citation Escalation is derivable** — a conversation with ≥1 documentation citation
  and a clicked escalation button. Prefer this over the analyzer's
  `escalation_after_citations`, which is broken (see Known issues). On the 2026-08 export it
  yielded 172, against the analyzer's 1.
- **Knowledge Gap and Citation Failure are NOT derivable.** Their definitions are unknown and
  nothing in the raw dump reproduces them. Zero-citation conversations are not the same thing:
  that count was 202 (any citation) or 244 (documentation citations only) against the
  analyzer's 114 Knowledge Gaps. Take those two counts from the analyzer or not at all.
- **`intents`, `outcome` and CSAT are not in the raw dump.** Escalation by button click is,
  but `escalation_breakdown.user_requested` (231) is not — that is a text signal the analyzer
  derives separately.

Neither export replaces the other: the analyzer knows the Knowledge Gap and Citation Failure
counts and the intent mix, the raw dump shows *why* and now also *which article*. A run with
only one of them is a partial run — say so rather than filling the gap by inference.

1. **Normalize.** Confirm the field names against the export before trusting any of this —
   they have changed once already. Write `.triage/findings.json` as an array of
   `{ id, gapType, intent, outcome, csat, snippet, citedArticle: {title, url} | null }`,
   keeping only Knowledge Gap, Citation Failure, and Post-Citation Escalation findings.

   Working recipe — join `summary.csv` to the raw dump, per conversation:

   1. Parse `summary.csv` with a real RFC4180 parser and index it by `conversation_id`.
   2. Sort each conversation's `messages` by `created`. **Do this first** — roughly half are
      out of order and everything downstream depends on it.
   3. Treat `messages[0].participant_id` as the partner; every message with that id is theirs.
   4. Collect citations from every message's `metadata` where `key === "citations"`
      (`JSON.parse` the `value`), keep only documentation hosts, and dedup by link with the
      query string and fragment stripped.
   5. Take `outcome`, `intent`, `csat`, `kb_mismatch` and `fallback_count` from the CSV row.
      **Take escalation from `outcome`, not from clicked buttons.**
   6. Emit one finding per (conversation × cited article), so `validate.mjs` can resolve each
      citation independently. Article-level reach is then a distinct-conversation count per
      matched file — that is the ranking signal for Step 3.

   Build the worklist from **three** populations, not one:

   | Population | Maps to | Why it matters |
   |---|---|---|
   | `outcome=escalated` with ≥1 documentation citation | `EXISTS_UNCLEAR` | cited an article, still needed a human |
   | `outcome=unresolved` | `EXISTS_UNCLEAR` / `MISSING` | ended badly without even escalating — the worst outcome, and easy to miss |
   | `kb_mismatch=true` | `MISSING` candidates | answered with no source; read each, most are account-data lookups |

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

Verified against `aggregates`; confirm they are still present before trusting any of these.
These figures double as the **fingerprint of the 2026-08 export** — if a new pull reports
them, it is the same data, already triaged twice.

- **`escalation_after_citations` is not credible.** It reported 1, while `citation_rate` was
  0.926 and `escalated` was 365 — nearly every escalation must have followed a citation-bearing
  response. Derive this bucket from the raw dump instead; doing so yielded 172.
- **CSAT is a relabel of resolution, not a survey.** `csat.satisfied` (2219) was exactly
  `ai_resolved` (2219), `resolution_rate` == `satisfaction_rate` == 0.80926, and
  `not_satisfied` + `neutral` (523) was exactly `escalated` + `unresolved` (523). CSAT carries
  no signal beyond the outcome field — **do not prioritize on it.**
- **`examples` and `conversation_topics` were empty objects on both pulls.** No finding can be
  mapped to a conversation from the analyzer alone.
- **Fingerprint:** 2,742 conversations / 14,336 messages, window 2025-12-30 → 2026-08-24;
  gaps 114 / 34 / 1 / 684 / 0 / 3; 10,028 citations.

## Known retrieval-quality issues (report, don't fix by writing)

- **`/tags/*` pages are being cited as if they were articles.** 36 citations across 18 tag
  pages on the 2026-08 export, led by `/tags/ordering` (6) and `/tags/user-management` (5).
  Docusaurus tag listings contain no answers, so a partner sent there gets nothing. Excluding
  `/tags/` from the retrieval index is probably worth more than any single article edit.
  `validate.mjs` reports these as `CITED_NOT_IN_REPO`, which is correct but easy to misread as
  a content gap — it is not.
- **The assistant cites URLs that do not exist.** On 2026-08:
  `/administration/my-account/affiliate-program` (redirects away, no content),
  `/automations/advanced-automation-features`,
  `/multi-location-business-app/social/multi-location-business-app-social`, and
  `/multi-location-business-app/executive-report` (folder path, may resolve as a category
  page). Report these; do not write articles to fill a hallucinated URL.
- **Roughly 70% of unresolved citations point at `docs.businessapp.io`** (120 of 170 on
  2026-08). That is the SMB site, a different repo. Expected, not a finding.

## Carry-forward from the 2026-08 runs

Start here on the next export rather than rediscovering these.

Already fixed (exclude from ranking unless the evidence is new): `partner-troubleshooting-guide`,
`ai-workforce-communication-automation`, `delete-accounts`, `apis-and-environment` (pass 1);
`client-notifications`, `email-verification`, `permissions`, `conversations-settings` (pass 2).

**The top priority for the next run is the billing / subscription lifecycle cluster.** It was
deferred in pass 2 as a low-volume escalation theme. That was wrong, and only became visible
once `summary.csv` arrived: it dominates `outcome=unresolved`, the bucket pass 2 could not see.
Articles cited by unresolved conversations, by distinct conversation count:

`my-plan` 29 · `subscriptions/subscription-management` 17 · `my-billing` 16 ·
`accounts/manage-accounts/product-management` 14 ·
`getting-started-with-subscriptions-and-client-billing` 13 · `commerce/payments/managing-refunds` 11 ·
`marketplace/products/google-workspace-complete-guide` 10 · `creating-and-managing-orders` 9 ·
`getting-started-with-accounts-and-product-activation` 8 · `business-app/ai/vibe/credits` 8 ·
`delete-accounts` 6

Two separable jobs inside it. The first is writable now; the second is not:

- **"Deactivate vs cancel vs delete vs schedule deactivation"** — partners cannot tell these
  apart, for their own account or a client's. Verbatim: *"what is the difference between
  schedule deactivation and cancel product tabs"*, *"how to deactivate client, not actually
  deleting just deactivate"*, *"i've removed all paid subscriptions. how to delete my
  account?"*. Pass 1 added a decision table to `delete-accounts` for the client-account case;
  the partner's-own-subscription case is still undocumented. Verify the mechanics in the UI,
  then write it.
- **Partner subscription cancellation procedure** — *"Fetch the cancellation form for starter"*,
  *"I need to cancel my subscription — my own subscription as a partner"*, *"i want to close my
  account"*. Still blocked on billing/commercial: is it self-serve at all, is there a form, and
  what is the notice period?

Also blocked, each on an answer the triage cannot produce:
- **Vibe credit purchases** — partners cannot tell whether wholesale pricing applies when
  buying credits in Business App versus Partner Center, and could not complete the purchase.
- **AI product naming** — recurring inability to map "Reputation AI", "CRM AI",
  "AI-Assisted Web Chat [Legacy]" to orderable items. Needs a current SKU source of truth.
- **Where the conversation notification recipient address is set** — a partner asked directly
  and escalated. `understanding-lead-capture-notifications` never says. Needs a live UI check.
