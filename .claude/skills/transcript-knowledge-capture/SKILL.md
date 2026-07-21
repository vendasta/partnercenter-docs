---
name: transcript-knowledge-capture
description: >-
  Capture every workflow and product topic mentioned in an SME/partner call
  transcript, not just the one topic currently being worked on, into a
  persistent per-topic knowledge base under learn-revamp/transcript-notes/.
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
names as an example). Store one note file per **leaf topic slug** in
`learn-revamp/transcript-notes/`, flat (no subfolders) — every leaf name
below is already unique.

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

Raw source transcripts (before extraction) belong in `learn-revamp/transcripts/`
-- see that folder's `README.md` for naming convention. That folder is
git-ignored on purpose (raw verbatim call text can carry names/numbers that
don't need to sit in git history); only the distilled output in
`learn-revamp/transcript-notes/` gets committed. If the user points at a file
there, or pastes text directly in chat, either is a valid input -- check the
folder for anything not yet processed when asked to "catch up on transcripts"
or similar.

## Workflow

### Step 1: Read the full transcript

Use the Read tool (or the pasted text directly) — do not skim or summarize from a partial read. Note the source metadata if available: who was on the call, their role (SME name, partner name, CS rep), the date, and what the call was nominally booked for. If metadata is missing, ask the user for at least a name and date before filing anything (notes with no provenance are not useful later, and `learning-path-writing` rule 19 requires `[CALL]` source tags to trace back to something).

### Step 2: Identify every topic actually covered

Walk the transcript and tag each stretch of content with the topic slug(s) from the taxonomy above that it belongs to. A topic only counts as "covered" if there is enough substance to extract a real workflow, gotcha, terminology point, or concrete fact — a single passing mention ("we also use Social Marketing sometimes") is not enough to warrant a section; a few sentences explaining how or why is.

List the topics found before writing anything, e.g.:

> "This transcript covers: Snapshot & Executive Reports (primary, ~80% of the call) and Social Marketing (a ~5-minute tangent on scheduling posts). Filing both."

### Step 3: Extract each topic's content in detail

For each topic identified, write a **detailed, in-your-own-words** account of what was said — not a transcript excerpt or word-for-word copy. Preserve:

- Concrete steps, in order, if a workflow was walked through
- Exact terminology, product names, UI labels, prices, and numbers (these should stay precise, unlike prose around them)
- Gotchas, failure modes, and the fix ("if X happens, do Y")
- Direct quotes only when the phrasing itself is the point (a metaphor, a verbatim objection) — keep these short and attributed, per the copyright limits already in place for this workspace (short quotes only, attributed, no reproducing large spans verbatim)

Match the depth and style of `learn-revamp/partner-call-insights.md` section 4 (the numbered "common jobs, with exact steps" — see that file for the target level of detail) rather than a loose paragraph summary.

### Step 4: File it

For each topic, append (create the file if it doesn't exist) to `learn-revamp/transcript-notes/<slug>.md` using this structure:

```markdown
# <Topic label> — transcript notes

Running notes extracted from SME/partner call transcripts. Feeds the
`learning-path-writing` skill when this path is drafted or enriched.
Each entry below is one source call — do not merge or overwrite prior entries.

---

## <Date> — <source name/role> (<call type>)

**Source:** [CALL] <one-line description of the call, e.g. "Alistair, technical setup walkthrough, screen recording">

<Detailed notes as extracted in Step 3 — steps, terms, gotchas, quotes.>

---
```

New entries always go at the bottom, oldest first, so the file reads as a timeline. Never delete or rewrite a prior entry to make room for a new one.

### Step 5: Update the manifest

Update `learn-revamp/transcript-notes/_index.md` — one row per topic slug that has at least one entry: topic, number of source calls filed, date of the most recent entry, and a one-line rollup of what is now covered. Keep slugs with zero entries out of the table (or mark them "no transcripts yet" only if the user asks for the full taxonomy view).

### Step 6: Report back

Tell the user plainly which topic(s) got new notes and which topic was the "primary" one they asked about, e.g.:

> "Filed detailed notes to `snapshot-executive-reports.md` (primary — 6 new steps on running and reading a Snapshot) and `social-marketing.md` (new section — scheduling cadence Alistair mentioned in passing). Nothing else in this call warranted its own section."

If a topic file already had entries, mention that too, so the user knows this is now the Nth call on record for that topic.

## Guardrails

- **Never fabricate.** If the transcript is ambiguous or a claim can't be pinned to a topic confidently, say so rather than guessing a slug.
- **Never write directly into `docusaurus/training/` or any published page from this skill.** This skill only populates `learn-revamp/transcript-notes/` — actual lesson drafting is the `learning-path-writing` skill's job, using these notes as `[CALL]`-tagged source material, with its own draft → review → approval loop.
- **Never edit `learn-revamp/partner-call-insights.md` from this skill.** That file is a separate, point-in-time strategic synthesis authored for Cal Cooper's IA spec. Cross-reference it for style/depth, but this skill's output lives only in `transcript-notes/`.
- **Append, never overwrite,** existing topic files — multiple calls about the same topic accumulate as a timeline.
- **Always carry provenance** (who, what kind of call, when) on every entry — notes with no source are hard to trust later and violate the `[CALL]` tagging rule other skills depend on.
- **Respect copyright limits already in place for this workspace**: at most brief, attributed quotes: no reproducing long verbatim spans of a transcript.
