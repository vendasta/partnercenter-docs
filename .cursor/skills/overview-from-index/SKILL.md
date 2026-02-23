---
name: overview-from-index
description: Turns Docusaurus category index pages into full overview/landing pages by reading the index and child docs and producing a consistent, flexible structure (what it is, what's included, get started, optional concepts/FAQ). Use when the user asks to create or improve an overview page, expand an index into a landing page, or make index.mdx a full overview for a docs category.
---

# Overview from index

Turn a category's index page into a full overview/landing page by reading that index and its child docs, then writing overview content **into the same index file**. The overview is the index — no separate overview page.

## When to apply

- User asks to "turn this index into an overview", "make this a full landing page", "expand this index", or similar.
- User asks to "create an overview for [category]" or "write a landing page for [section]".
- User points at an `index.mdx` (or `index.md`) in `docusaurus/docs/` and wants it improved.

**Scope**: Docs live in `docusaurus/docs/`. The index is `index.mdx` or `index.md` in a category folder (often linked from `_category_.json` as `"id": "folder/index"` so the sidebar category label opens it).

## Critical: one file only

- **Output**: Edit (or create) the folder's **index file only** — e.g. `docusaurus/docs/crm/opportunities/index.mdx`.
- **Do not** create `overview.mdx`, `landing.mdx`, or any other file. When the user clicks the category in the sidebar, that link opens the index; the overview content must live there.

## Workflow

### 1. Identify the index file (one folder only)

- From the user's message or the file they pointed at: determine the **folder** (e.g. "opportunities" → `docusaurus/docs/crm/opportunities/`). The index is that folder's `index.mdx` or `index.md`.
- **Edit only this one index.** Do not change index files in subfolders (e.g. for "Reports", edit only `docs/reports/index.mdx`, not `docs/reports/metrics/index.mdx`) unless the user explicitly asked for that subcategory.
- If the folder has **no index file**, create `index.mdx` in that folder and put the overview there. If the category uses `_category_.json`, note that it may need `"link": { "type": "doc", "id": "folder/index" }` so the sidebar opens this page.

### 2. Discover child content

- **Sibling docs**: All `.mdx`/`.md` in the same folder except the index (e.g. `create-booking-links.mdx`, `team-booking-links.mdx`).
- **Subfolders with index**: If a subfolder has its own `index.mdx`, treat it as one child page (e.g. `./metrics/index.mdx`, `./premium-reports/index.mdx`).
- **What's included**: List only these child docs. Do not list the current index. Order by `sidebar_position` when available so the list matches the sidebar; otherwise use a sensible order (e.g. alphabetical by title).

### 3. Gather content

- **Index**: Read full current content (preserve useful bits, see what's missing).
- **Each child**: Read frontmatter (`title`, `description`) and the first H1/H2 plus first 1–2 paragraphs (or first ~15–25 lines). Do not read entire long docs unless you need to pull specific material (e.g. for FAQ).

### 4. Synthesize

- **Opening**: One short paragraph — what the feature/area is and why it matters (from current index or child intros).
- **What's included**: One bullet per child: `**[Title](./path.mdx)**: description` using frontmatter and first-line context.
- **Get started**: Only if there's a clear first-time path; 3–5 high-level steps from child "how to get started" or access/setup content.
- **Other sections**: Add only when child content or product knowledge clearly supports them; keep brief and link to child docs for detail.

### 5. Write the overview into the index file

- **Target**: The same index file only. Do not create a separate overview page.
- **Frontmatter**: Preserve existing keys (`sidebar_position`, `id`, etc.). Ensure at least `title` and `description` are present and aligned with the new content so the sidebar and category link keep working.
- **Links**: Use relative paths (e.g. `./sales-pipeline-overview.mdx`, `./metrics/index.mdx`).
- **Conventions**: Follow the project's content guidelines (see below). Use `<details>`/`<summary>` per FAQ; images in `img/` next to docs with alt text.

### 6. Quick check

- Every child doc in the folder is represented in "What's included".
- No broken links; no long duplicated prose that already exists in a child doc.

## Overview structure (flexible)

Include only sections that add value for this category.

| Section | When to include | Notes |
|--------|------------------|--------|
| **H1 + opening paragraph** | Always | One short paragraph: what it is and why it matters. |
| **Why use [topic]?** | When benefit isn't obvious from the intro | One short paragraph. Omit for very obvious areas (e.g. "My Team"). |
| **What's included** | Always for category landings | Bullet list: each child doc as link + one-line description. |
| **Get started** | When there's a clear first-time path | 3–5 numbered steps; sub-bullets OK. Use **Partner Center** → **Section** → **Page**. Omit if no single "start here" path. |
| **Key concepts / How it works / Key features** | When important concepts aren't fully covered by child links | One or more H2s; 1–3 short paragraphs or bullets; link to children for detail. Omit if "What's included" + child intros are enough. |
| **Best practices** | When child content or product knowledge supports it | Short bullets. Omit if nothing specific. |
| **FAQ** | When child docs or support suggest recurring questions | `<details>`/`<summary>` per question. Omit if no clear FAQs. |
| **Need more help? / Related** | Optional | Links to related sections (e.g. settings, automations). |

**Flexibility**: Prefer short, scannable content; link out for depth. If a section would be one vague sentence, omit it. Match tone and depth to existing overviews in the repo (e.g. `docusaurus/docs/crm/opportunities/index.mdx`, `docusaurus/docs/reports/index.mdx`, `docusaurus/docs/marketing/campaigns/index.mdx`).

## Content rules (from CLAUDE.md)

- **Sentence case** for headings (e.g. `## Set up a domain`).
- **Bold** for UI elements; `code` for commands and filenames.
- **Never use `>`** in markdown (use "greater than" in text or `→` for UI paths).
- Use Docusaurus callouts: `:::tip`, `:::info`, `:::warning` — not blockquotes.
- Details/summary: put `<details>` on its own line with a blank line above and below the content inside.

## What to avoid

- **Separate overview page**: Never create another file for the overview. The index file is the overview so the sidebar category label opens it.
- **Rigid templates**: Don't require every section on every page; include only what adds value.
- **Over-reading**: Don't load full content of every child doc; frontmatter + first section is enough unless you need specific material (e.g. FAQ).
- **Duplicating child content**: Summarize and link; don't repeat long procedures from child docs.
- **Editing the wrong index**: Only edit the index in the folder the user asked about (or that contains the file they pointed at). Do not recursively update subfolder indexes unless the user asked for that subcategory.
