---
name: transcript-knowledge-capture
description: >-
  Capture every workflow and product topic mentioned in an SME/partner call
  transcript, not just the one topic currently being worked on, into a
  persistent per-topic knowledge base in the PRIVATE enablement-docs repo at
  _source-archive/learn-tab-revamp/transcript-notes/. Never writes into this
  repository, which is public.
  Use whenever a transcript, recorded-call summary, or screen-recording
  transcript is shared, whether or not the user names a target topic. Feeds
  the learning-path-writing skill later, when that topic's path is actually
  being drafted or enriched (see ET-689).
---

# Transcript knowledge capture

## Why this exists

SME and partner calls rarely stay on one topic. A call booked to cover
**Snapshot** will wander into Social Marketing, pricing, or CRM hygiene along
the way. If only the intended topic gets written down, that incidental
knowledge is lost — and the next person who works on Social Marketing has no
idea a real recording already covered it.

This skill's job: read the whole transcript, pull out **every** topic that
got real coverage (not just the one the user is currently focused on), and
file detailed, in-your-own-words notes under each topic so they are sitting
there waiting the next time someone drafts or enriches that path. Nothing
gets written into an actual training page by this skill — it only builds the
staging ground the `learning-path-writing` skill draws from.

## Topic taxonomy

Topics map to the real path/folder structure under `docusaurus/training/`
(the learn-revamp content tree — this is what ET-689's "existing paths"
actually refers to; `docusaurus/training/builder/_category_.json` is
literally labeled "Wire your AI Workforce to Act", the exact path ET-689
names as an example). Store one note file per **leaf topic slug** in `enablement-docs` (private) at `_source-archive/learn-tab-revamp/transcript-notes/`,
flat (no subfolders) — every leaf name below is already unique.

**This skill never writes into this repository.** `partnercenter-docs` is
public; the notes are not. See the Output boundary section below.

| Topic slug | Path label | Folder |
|---|---|---|
| `getting-started` | Get started | `docusaurus/training/getting-started/` |
| `ai-foundations` | AI foundations | `docusaurus/training/ai-foundations/` |
| `ai-workforce` | Hire your first AI Employee | `docusaurus/training/ai-workforce/` |
| `builder` | Wire your AI Workforce to Act | `docusaurus/training/builder/` |
| `vibe` | Build with Vibe | `docusaurus/training/vibe/` |
| `growth-engine` | Your growth engine | `docusaurus/training/growth-engine/` |
| `vendasta-services` | Vendasta Services | `docusaurus/training/vendasta-services/` |
| `advertising` | Attract > Advertising | `docusaurus/training/products/attract/advertising/` |
| `local-seo-listings` | Attract > Local SEO & Listings | `docusaurus/training/products/attract/local-seo-listings/` |
| `social-marketing` | Attract > Social Marketing | `docusaurus/training/products/attract/social-marketing/` |
| `conversations-ai` | Convert > Conversations AI | `docusaurus/training/products/convert/conversations-ai/` |
| `crm` | Convert > CRM | `docusaurus/training/products/convert/crm/` |
| `marketplace` | Convert > Marketplace | `docusaurus/training/products/convert/marketplace/` |
| `snapshot-executive-reports` | Convert > Snapshot & Executive Reports | `docusaurus/training/products/convert/snapshot-executive-reports/` |
| `business-app` | Engage > Business App | `docusaurus/training/products/engage/business-app/` |
| `reputation-management` | Engage > Reputation Management | `docusaurus/training/products/engage/reputation-management/` |
| `websites` | Engage > Websites | `docusaurus/training/products/engage/websites/` |

If a transcript covers something that genuinely does not fit any row (a new
product, a cross-cutting theme like pricing/compliance), do not force it into
the nearest slug — create a new topic file with a sensible slug and add a row
to this table in the same edit, and flag the addition to the user.

This taxonomy governs `learning-path-writing` drafts too — if that skill's
scope ever needs re-checking against the live `docusaurus/training/` tree,
re-derive the table from `find docusaurus/training -name _category_.json`
rather than trusting this list blindly, since folders do get added.

## When to use

- The user shares a transcript (pasted text, or a path to a transcript file/doc) from an SME call, partner call, or screen recording.
- This applies **whether or not** the user names a target topic. If they say "this is the Snapshot call," still scan the whole thing — do not stop at Snapshot content.
- Also applies to re-shared or corrected transcripts (append a new dated entry; do not silently overwrite prior notes from a different call).

## Where raw transcripts live

**Raw transcripts live outside the repo entirely.** Not merely git-ignored inside
it -- outside it. A git-ignored folder still puts unredacted partner names,
business specifics, and negotiated pricing on disk inside a shared working
copy, one `git add -f` or one ignore-rule edit away from history. Keep the raw
files in a folder outside the repository and point the skill at that path when
processing.

The **distilled, redacted** output lives in `enablement-docs` (private) at `_source-archive/learn-tab-revamp/transcript-notes/` and gets committed there.
The separation is the whole point: raw text outside any repo, distilled
knowledge inside a private one.

*(Standing instruction from Shiva, 2026-08-18. The `learn-revamp/` folder this
skill used to write into was removed from this repo on 2026-09-01 — it was
publicly readable and carried named individuals, named partner companies, and
wholesale pricing. Redaction on the way in was the right rule; it was written
forward-looking and never applied to the ~226 entries already committed.)* If the user points at a file
there, or pastes text directly in chat, either is a valid input -- check the
folder for anything not yet processed when asked to "catch up on transcripts"
or similar.

## Workflow

### Step 1: Read the full transcript

Use the Read tool (or the pasted text directly) — do not skim or summarize from a partial read. **Read the body, and treat the filename as telling you nothing.** The filename is a label someone typed; what the call covers is decided only by its content, and the two disagree often. Never let a filename set your expectation of what you are about to find, and never skip a file because its name looks off-topic. Note the source metadata if available: who was on the call, their role (SME name, partner name, CS rep), the date, and what the call was nominally booked for. If metadata is missing, ask the user for at least a name and date before filing anything (notes with no provenance are not useful later, and `learning-path-writing` rule 19 requires `[CALL]` source tags to trace back to something).

### Step 2: Identify every topic actually covered

Walk the transcript and tag each stretch of content with the topic slug(s) from the taxonomy above that it belongs to. Derive this from the words spoken, never from the filename or the meeting title -- a call booked as one thing regularly spends most of its time on another, and that wandering is where the useful material is. A topic only counts as "covered" if there is enough substance to extract a real workflow, gotcha, terminology point, or concrete fact — a single passing mention ("we also use Social Marketing sometimes") is not enough to warrant a section; a few sentences explaining how or why is.

List the topics found before writing anything, e.g.:

> "This transcript covers: Snapshot & Executive Reports (primary, ~80% of the call) and Social Marketing (a ~5-minute tangent on scheduling posts). Filing both."

### Step 3: Extract each topic's content in detail

For each topic identified, write a **detailed, in-your-own-words** account of what was said — not a transcript excerpt or word-for-word copy. Preserve:

- Concrete steps, in order, if a workflow was walked through
- Exact terminology, product names, UI labels, and non-commercial numbers (these should stay precise, unlike prose around them). **Never carry a price, fee, or rate across into a note** -- see the redaction rule below. Counts, durations, limits and thresholds ("15 keywords per location", "7 to 10 business days") are fine and should stay exact; currency figures are not.
- Gotchas, failure modes, and the fix ("if X happens, do Y")
- Direct quotes only when the phrasing itself is the point (a metaphor, a verbatim objection) — keep these short and attributed, per the copyright limits already in place for this workspace (short quotes only, attributed, no reproducing large spans verbatim)

Match the depth and style of `enablement-docs/_source-archive/learn-tab-revamp/partner-call-insights.md` section 4 (the numbered "common jobs, with exact steps" — see that file for the target level of detail) rather than a loose paragraph summary.

#### Tag every claim by type and by source authority

Provenance says who spoke; these tags say what kind of claim it is and how far to trust it. Append an inline tag to any claim that is not a plain, corroborated product fact:

- `[PRODUCT]` — how the platform actually behaves or what it can do. These are the claims `learning-path-writing` must check against `docusaurus/docs/` before use; a `[PRODUCT]` claim not found in the docs needs live verification before it reaches a lesson.
- `[VERIFIED IN-PRODUCT — <verifier>, <date>, <evidence>]` — a claim the docs do not cover, checked live in the product by a named person. Use this instead of `[PRODUCT]` when there is no doc to check against. Two rules make it trustworthy:
  - **The verifier signs it first-person, where a human is on record** — a line in the commit message or a PR comment in their own words ("I checked Level 3 is the default in-product on July 21 — screenshot attached"). An AI may draft the surrounding notes, but it must never author the attestation on the human's behalf. A verification the model claims on someone's behalf is not a verification.
  - **Name the evidence** — screenshot, screen recording, or at minimum a dated "checked live." The stronger the claim (anything safety- or money-relevant, like an autonomy default), the more it earns a captured artifact rather than a memory.
  - Any `[VERIFIED IN-PRODUCT]` claim also carries a standing flag to get it into the docs, so it can graduate to a real `[DOC]` citation and stop depending on one person's check.
- `[COMMERCIAL]` — a pricing, fee, tier, or billing *structure* stated as general. **Record the structure, never the figure** (see the redaction rule): "tiering runs standard/pro/premium, voice gated to the top tier" is filable; the monthly rates are not. Use `[COMMERCIAL — partner-specific]` for anything shaped by one partner's negotiated deal, and note only that it was negotiated, not the terms. Every `[COMMERCIAL]` note carries an implicit instruction to the downstream author: verify the current number in the platform.
- `[FIELD]` — a sales or usage technique, a recommendation, or an opinion. True as "what this person does or believes," not as product truth.
- `[SPECULATION]` — a roadmap guess, an ETA, a "working theory," or anything the speaker themselves framed as unconfirmed. Carry the hedge verbatim.
- `[DEMO]` — a value read off a demo, test, or fake account (a placeholder business, sample data). Never a real figure, and never reusable as an example in a lesson without saying it is demo data.

Judge a claim by who is making it (authority ladder, highest first):

1. **Vendasta SME / engineer / product specialist** — authoritative on `[PRODUCT]`.
2. **Vendasta CS / CSM / account manager / sales engineer** — reliable on workflows; treat their `[COMMERCIAL]` and `[SPECULATION]` as approximate.
3. **Partner / agency** — authoritative on their own `[FIELD]` experience and their own `[COMMERCIAL — partner-specific]` terms; not authoritative on `[PRODUCT]`.
4. **Prospect** — lowest; reactions and opinions, not facts.

When a claim's reliability turns on who said it (a `[PRODUCT]` assertion from a partner rather than an SME, say), name the speaker's role right on the claim. Default: a corroborated product fact from a Vendasta SME can stay untagged; tag the exceptions. When in doubt, tag.

### Step 4: Check against what is already filed, and against the published docs (stop and flag)

Before appending, read the existing topic file and compare the new claims to what is there. Also check any `[PRODUCT]`-type claim against the canonical Partner Center documentation under `docusaurus/docs/` (the main docs instance — not `businessapp-docs`, not `developers.vendasta.com`; those are separate canonical sources per the content-source map in `implementation-plan.md`). Three cases are a hard stop — surface them to the user, do not resolve them silently:

- **Contradiction with a filed claim.** A new claim conflicts with a filed one on the same topic (a price, capability, or step disagrees). Do not overwrite, do not quietly keep both. Stop and report: "`<file>` entry from <date/source> says X; this call says Y — needs a human to reconcile." Leave the prior entry intact and hold the new one until told how to file it.
- **Discrepancy with the published docs.** A `[PRODUCT]` claim from the transcript disagrees with what `docusaurus/docs/` already says, or asserts something the docs don't cover in a way that looks like it should be documented. Never resolve this by silently picking a side — not by trusting the transcript over the docs, and not by trusting the docs over a live speaker. Stop and ask the human doing the extraction to verify directly (check the product, check with the docs owner) before the claim gets filed as settled fact. This is exactly the gap the `[VERIFIED IN-PRODUCT]` tag exists to close once a human actually checks (Step 3) — until then, the claim sits flagged, not filed as fact.
- **Substantial duplication.** A new claim substantially repeats one already filed from a different call. Stop and ask whether to (a) file it as **corroboration** — a short line under the existing claim noting a second source confirms it, with its `[CALL]` tag, which is how a field claim earns trust across independent calls — or (b) skip it as redundant. Do not paste the full duplicate as a new standalone block.

Everything genuinely new, and every `[PRODUCT]` claim that squares with the docs (or has no doc to check against and gets tagged `[VERIFIED IN-PRODUCT]`, or is left as an explicitly flagged, unverified `[PRODUCT]` claim), gets filed normally in the next step. Only conflicts, doc discrepancies, and duplicates stop the flow.

### Step 5: File it

For each topic, append (create the file if it doesn't exist) to `_source-archive/learn-tab-revamp/transcript-notes/<slug>.md` **in the private `enablement-docs` repo** using this structure:

```markdown
# <Topic label> — transcript notes

Running notes extracted from SME/partner call transcripts. Feeds the
`learning-path-writing` skill when this path is drafted or enriched.
Each entry below is one source call — do not merge or overwrite prior entries.

---

## <Date> — <source name/role> (<call type>)

**Source:** [CALL] <one-line description of the call, e.g. "Alistair, technical setup walkthrough, screen recording">

1. <Claim in your own words.> [PRODUCT]
2. <The shape of a commercial arrangement specific to this partner's deal, figures withheld.> [COMMERCIAL — partner-specific]
3. <A rep's recommended technique.> [FIELD]
4. <A roadmap guess the speaker hedged.> [SPECULATION]
   - Corroborated by [CALL] <other source/date>.  ← added when a later call confirms an existing claim (Step 4)

---
```

New entries always go at the bottom, oldest first, so the file reads as a timeline. Never delete or rewrite a prior entry to make room for a new one.

### Step 6: Update the manifest

Update `_source-archive/learn-tab-revamp/transcript-notes/_index.md` in `enablement-docs` — one row per topic slug that has at least one entry: topic, number of source calls filed, date of the most recent entry, and a one-line rollup of what is now covered. Keep slugs with zero entries out of the table (or mark them "no transcripts yet" only if the user asks for the full taxonomy view).

**Maintenance note — when a topic file gets large.** Once a topic passes roughly 15–20 entries, the raw timeline gets expensive to re-read and hard to read for consensus. At that point flag the file to the user as a candidate for a synthesis pass: distill the corroborated, stable workflow into one consensus section, keep contested and single-source claims called out, and archive the raw per-call entries below (or into a dated archive) with provenance intact. This is a separate maintenance operation, not part of routine capture — flag it, do not do it inline.

### Step 7: Report back

Tell the user plainly which topic(s) got new notes and which topic was the "primary" one they asked about, e.g.:

> "Filed detailed notes to `snapshot-executive-reports.md` (primary — 6 new steps on running and reading a Snapshot) and `social-marketing.md` (new section — scheduling cadence Alistair mentioned in passing). Nothing else in this call warranted its own section."

If a topic file already had entries, mention that too, so the user knows this is now the Nth call on record for that topic. Name any contradiction, doc discrepancy, or duplicate you flagged in Step 4 for the user to resolve.

## Guardrails

- **Redact before you store. This is not optional and not per-batch.** Every note filed from a transcript is scrubbed of two classes of content on the way in, always:
  - **Identities.** No real customer, partner, prospect, or Vendasta employee names. Use role and industry descriptors instead: "a Vendasta solutions architect with a multi-location retail partner", "an insurance-agency owner". Same for business names, addresses, phone numbers, account IDs, and domains.
  - **All commercial figures.** No prices, wholesale or retail rates, fees, margins, discounts, or negotiated terms -- not even ones presented on the call as standard published pricing. **Pricing is verified in the platform at authoring time, never carried from a transcript.** Prices move, calls go stale, and a figure quoted confidently on a sales call is the least reliable kind of fact in the corpus.

  Record that a commercial conversation happened and what *shape* it took, because that is the teachable part, then point at the platform for the number. Write "the partner benchmarked reseller markup well above the usual range" rather than the multiple, and "tiering runs standard/pro/premium with voice gated to the top tier" rather than the monthly figures. A note that needs a price to make sense is a note that needs rewriting.

  *(Standing instruction from Shiva, 2026-08-18: transcripts are wiped of partner names and any mention of pricing before the information is stored as knowledge, because pricing should be checked in the platform.)*
- **Never fabricate.** If the transcript is ambiguous or a claim can't be pinned to a topic confidently, say so rather than guessing a slug.
- **Never use a transcript's filename as evidence of anything.** Filenames are convenience labels a human typed. They are routinely wrong, partial, or actively misleading about what a call contains. Three specific things are forbidden:
  - **Judging relevance by filename.** A file named for an SEO proposal may hold the corpus's best custom-tool build; one named for a receptionist setup may be forty minutes of billing. Open it and read it.
  - **Judging coverage by filename.** Never check whether a call has been filed by grepping its filename against `transcript-notes/`. Entries deliberately use role and industry descriptors instead of names, so a filename will almost never appear even when the call is fully filed. This method invents gaps at scale: a 2026-08-18 pass reported "60 of 112 transcripts unreferenced" this way, and the real number of genuine gaps turned out to be three, all found by comparing content.
  - **Deriving search keywords from filenames.** Keywords for finding related material come from what people actually said inside the transcript, in their own words. See the matching rule in sop-013 (`enablement-docs/subfunctions/learning/sops/013-search-activity-feed-for-partner-call-evidence.md`).

  **Reconcile coverage by content instead.** Pick distinctive content markers from the transcript -- a specific number, an unusual product combination, a named third-party tool, a verbatim gotcha -- and grep the topic files for those. That is the only reliable way to tell a filed call from an unfiled one.
- **Never write anything into this repository from this skill.** `partnercenter-docs` is public. Output goes only to `enablement-docs` (private) at `_source-archive/learn-tab-revamp/transcript-notes/`. If that repo is not available, stop and say so — do not fall back to writing here.
- **Never write directly into `docusaurus/training/` or any published page from this skill.** This skill only populates the archive's `transcript-notes/` — actual lesson drafting is the `learning-path-writing` skill's job, using these notes as `[CALL]`-tagged source material, with its own draft → review → approval loop.
- **Never edit `partner-call-insights.md` from this skill** (now at `enablement-docs/_source-archive/learn-tab-revamp/partner-call-insights.md`). That file is a separate, point-in-time strategic synthesis authored for Cal Cooper's IA spec. Cross-reference it for style/depth, but this skill's output lives only in `transcript-notes/`.
- **Append, never overwrite,** existing topic files — multiple calls about the same topic accumulate as a timeline.
- **Always carry provenance** (who, what kind of call, when) on every entry — notes with no source are hard to trust later and violate the `[CALL]` tagging rule other skills depend on.
- **Respect copyright limits already in place for this workspace**: at most brief, attributed quotes: no reproducing long verbatim spans of a transcript.
- **Tag claims, do not flatten them.** Every claim is weighed by type and by who said it (Step 3's tags and authority ladder). A partner asserting product behavior is not an SME stating it, and a demo price is not a real price — mark the difference so the downstream author is not guessing.
- **Never let a partner-specific or demo value read as general truth.** Negotiated arrangements carry `[COMMERCIAL — partner-specific]`; sample/test values carry `[DEMO]`. Neither may reach a lesson as standard pricing or real data — and under the redaction rule the figures should not be in the note to begin with.
- **Contradictions, doc discrepancies, and duplicates are a hard stop for a human (Step 4).** When a new claim conflicts with or substantially repeats a filed one, or disagrees with the published Partner Center docs under `docusaurus/docs/`, surface it and wait — never overwrite, never silently keep both, never paste a full duplicate, and never let the transcript or the docs quietly win by default.
- **A human signs a `[VERIFIED IN-PRODUCT]` claim, never the model.** The skill may draft the surrounding note, but the first-person attestation — "I checked this live, here's the evidence" — has to be the named person's own words, on record (commit message, PR comment, or equivalent), not the AI relaying that a check happened.
