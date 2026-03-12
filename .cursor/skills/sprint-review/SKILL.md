---
name: sprint-review
description: Updates Partner Center documentation based on sprint review transcripts. Use when the user provides a sprint review transcript, demo recording notes, or release summary and wants docs updated to reflect shipped changes. Extracts eligible items (GA or already released only), updates relevant docs in repo style, and produces an exclusion report for anything skipped.
---

# Sprint review to docs

Update Partner Center documentation from sprint review transcripts. Only document items explicitly stated as GA or already released. Exclude everything else and report why.

## Workflow

```
1. Read the sprint review transcript the user provides
2. Extract candidate changes (features, updates, fixes, removals)
3. Filter: keep only items with explicit release-status language
4. Map eligible items to existing docs in docusaurus/docs/
5. Update docs in repo style with evergreen language
6. Produce an exclusion report for anything skipped
```

### Step 1: Read the transcript

Accept the transcript in any format: pasted text, attached file, or URL. Read the full transcript before extracting anything.

### Step 2: Extract candidates

Identify every product or feature change mentioned. For each candidate, record:
- **What**: the feature, change, or update
- **Status language**: exact quote from the transcript about release state
- **Scope**: which product area it affects (e.g. CRM, Marketplace, Automations)

### Step 3: Filter by release status

A candidate is **eligible** only if the transcript explicitly says one of:
- "GA" / "generally available"
- "released" / "already released" / "released now" / "live" / "shipped"
- "available to all partners" / "rolled out"

A candidate is **ineligible** if:
- No explicit release language is present (default: exclude)
- Described as "coming soon", "planned", "in progress", "beta", "alpha", "preview", "internal", "experimental", "prototype"
- Discussed as a roadmap item, future sprint work, or backlog
- Mentioned only in Q&A, speculation, or side discussion without a release statement
- Ambiguous or contradictory signals about release state

**When in doubt, exclude.** The cost of documenting something unreleased is higher than the cost of adding it in the next cycle.

### Step 4: Map to docs

For each eligible item:

1. Search `docusaurus/docs/` for the relevant file(s)
2. Identify where the change fits (existing section, new section, updated instructions)
3. If no existing doc covers this area, note it and ask the user before creating a new page

Use semantic search, grep, and glob to locate the right files. Check `_category_.json` and frontmatter for context on how the docs are organized.

### Step 5: Update docs

Apply all edits following the repo rules below. Use the StrReplace tool or Write tool for edits. After editing, run lints on changed files and fix any issues introduced.

### Step 6: Produce exclusion report

After all eligible updates are complete, output the exclusion report. Format:

```
## Exclusion report

| Item | Reason | Transcript quote |
|------|--------|------------------|
| [feature name] | [reason] | "[exact quote or summary]" |
| ... | ... | ... |
```

If nothing was excluded, state: "All transcript items were eligible. No exclusions."

---

## Release-status rules

### Eligible (update docs)

The transcript must contain **explicit, unambiguous** language that the item is currently available to partners. Examples of qualifying language:

- "This is now GA"
- "We shipped this last week"
- "This is live for all partners"
- "Already released in production"
- "This rolled out on [date]"

### Ineligible (exclude and report)

| Signal | Exclusion reason |
|--------|-----------------|
| No release language at all | Not explicitly stated as released |
| "Coming soon" / "next sprint" / "Q3" | Unreleased; roadmap or future work |
| "Beta" / "alpha" / "preview" / "early access" | Pre-release; not GA |
| "Internal only" / "for internal use" | Internal; not partner-facing |
| "We're exploring" / "thinking about" | Speculative; not committed |
| "Behind a feature flag" / "dark launch" | Not generally available |
| Contradictory ("released but still in beta") | Ambiguous; cannot safely document |
| Mentioned in passing without context | Too ambiguous to safely document |
| Implementation detail (architecture, infra) | Not relevant to Partner Center docs |
| Product outside this repo's scope (e.g. Yesware, Broadly) | Not documented in this repository |
| Process chatter (sprint planning, team updates) | Not actionable for documentation |

---

## Evergreen writing rules

All documentation must use durable, stable language. Never write as if the feature just launched.

### Do

- Describe what the feature **does**, not when it shipped
- Use present tense: "You can filter by date range"
- Write instructions that remain accurate indefinitely

### Do not

- "New feature" / "now available" / "just released" / "recently launched"
- "We've added" / "we just shipped" / "starting today"
- "Upcoming" / "soon" / "in a future release"
- Dates or version numbers unless the repo already uses them in that context

### Examples

| Bad (announcement-style) | Good (evergreen) |
|--------------------------|------------------|
| "We've just added bulk editing to accounts." | "Bulk editing lets you update multiple accounts at once." |
| "New: CRM now supports custom fields." | "CRM supports custom fields for tracking data specific to your business." |
| "Starting March 2026, you can export reports as CSV." | "You can export reports as CSV." |

---

## Repo compliance

Follow all rules from `CLAUDE.md` and the conventions visible in existing docs. Key rules:

### Markdown
- **Never use `>` in markdown** (no blockquotes). Use `:::tip`, `:::info`, `:::warning` callouts instead.
- Sentence case headings: `## Set up a domain`
- **Bold** for UI elements, `code` for commands and filenames
- `<details>`/`<summary>` on own lines with blank lines around content

### Frontmatter
Preserve existing frontmatter. If adding a section to an existing doc, do not change `id`, `title`, `sidebar_position`, or `description` unless the change directly warrants it.

### Links
- Internal links: root-relative paths starting with `/` (e.g. `/crm/opportunities/`)
- Verify target files exist before linking

### Images
- Place in `img/` folder alongside the doc
- Relative paths: `![Alt text](./img/image-name.png)`
- Always include descriptive alt text

### Structure
- Docs live in `docusaurus/docs/` organized by product area
- File-system based autogenerated sidebars; folder structure determines navigation
- Category folders use `_category_.json` for label, position, collapse state
- Landing pages use `index.mdx`

### What to preserve
- Surrounding formatting and structure in files you edit
- Existing content unrelated to the sprint review changes
- Pattern consistency with adjacent sections

---

## Scope boundaries

### In scope
- Updating existing docs to reflect shipped changes
- Adding sections to existing docs for eligible features
- Correcting outdated information contradicted by eligible transcript items
- Suggesting new pages when no existing doc covers an eligible item (ask user first)

### Out of scope
- Internal process documentation
- Architecture or infrastructure details
- Features not explicitly stated as released
- Content for products outside the Partner Center docs scope (e.g. Yesware/Yeswware, Broadly, or other products with separate documentation)
- Changes to site config, components, or theme files

---

## Example

### Input

```
Sprint review transcript (excerpt):

"The new bulk account import feature is now live for all partners. You can
upload a CSV with up to 5,000 accounts and it will validate and import them.
We also started work on the bulk delete feature, which should be ready by
next sprint. The team is also exploring an API endpoint for account imports
but nothing is committed yet."
```

### Expected output

**Doc update** (to the accounts management doc):

Add a section covering CSV-based bulk import: what it does, the 5,000 account limit, and how to use it. Written in evergreen language following repo style.

**Exclusion report:**

| Item | Reason | Transcript quote |
|------|--------|------------------|
| Bulk delete feature | Unreleased; described as future sprint work | "should be ready by next sprint" |
| API endpoint for account imports | Speculative; not committed | "exploring... nothing is committed yet" |

---

## Additional resources

- For detailed exclusion reason categories, see [references/exclusion-reasons.md](references/exclusion-reasons.md)
