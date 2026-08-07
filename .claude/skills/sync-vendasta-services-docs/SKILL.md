---
name: sync-vendasta-services-docs
description: >-
  Keep Vendasta Services documentation in sync across the two repos:
  servicesdocs.io (SMB, grey-labeled) and Partner Center docs (partner,
  branded). Use after editing, drafting, or deleting an article in either repo
  to produce reviewable suggested edits to the counterpart article in the other
  repo, audience-adapted automatically. Also handles articles that exist in only
  one repo (flag and ask). Trigger when the user says things like "sync this
  article", "update the other repo", "propagate this change", or after editing a
  Vendasta Services doc.
---

# Sync Vendasta Services docs across repos

Two repositories document the same Vendasta Services offerings for different
audiences. When an article changes in one, this skill produces **suggested
edits to the counterpart in the other repo, adapted for that audience**, for a
teammate to review before committing. It never auto-commits, and never deletes
or creates an article without asking.

## The two repos

| | **services-docs** (SMB) | **partnercenter-docs** (Partner) |
|---|---|---|
| Site | servicesdocs.io | docs.vendasta.com |
| Audience | SMB owners & operators | Vendasta partners (agencies/resellers) |
| Branding | **Grey-labeled** — never name a brand, company, product, or team. Use "our team", "the platform", "the dashboard". | **Branded** — "Vendasta", "Partner Center", "Business App", and product names are expected. |
| Article root | `docs-site/docs/` | `docusaurus/docs/vendasta-services/` |
| Repo rules | `<repo>/CLAUDE.md` (strict section order, `:::info`/`:::warning`) | `<repo>/CLAUDE.md` (never use `>`, em-dash rules, `require()` images) |

Both follow Docusaurus. Section folders mostly share names
(`digital-advertising`, `listings-claims-optimization`, `ai-workforce-setup`,
`websites`, `social-media-management`, `expectations`, `using-the-platform`).
**The Partner repo intentionally has extra articles with no SMB counterpart**
(e.g. partner training, white-labeling communications, budget-change requests).
That is by design — do not force a counterpart to exist.

## Step 1 — Locate both repos

You may be invoked from either repo. Determine which one you are in and find the
other:

- **services-docs** root contains `docs-site/docs/` and a `CLAUDE.md` mentioning
  `servicesdocs.io`.
- **partnercenter-docs** root contains `docusaurus/docs/vendasta-services/` and a
  `CLAUDE.md` mentioning `docs.vendasta.com`.

Find the other repo by checking, in order: the session's additional working
directories, sibling directories of the current repo, then ask the teammate for
its path if not found. Confirm the resolved path before editing anything in it.

## Step 2 — Identify what changed

If the teammate named a file, use it. Otherwise inspect the **source repo's**
working tree:

```bash
git status --porcelain && git diff --stat HEAD
```

Classify each changed Vendasta Services article as **edited**, **new (drafted)**,
or **deleted** (staged deletions and `git status` `D`). Only articles under the
article roots above are in scope. Work through them one at a time.

## Step 3 — Find the counterpart

Map source → destination by **section folder + article identity**:

1. Same section folder name in the destination root (see table in Step 1).
2. Within that folder, match by `title` / `sidebar_label` frontmatter first,
   then by filename slug, then by body content. Filenames legitimately differ
   between repos.

Known filename aliases (services-docs ↔ partnercenter-docs) — treat as examples,
not an exhaustive list; always confirm by title/content:

| services-docs | partnercenter-docs |
|---|---|
| `websites/website-support.md` | `websites/vendasta-services-website-support.md` |
| `websites/website-ordering-guide.md` | `websites/vendasta-services-website-ordering-guide.md` |
| `websites/website-plugins.md` | `websites/website-plugins-working-with-vendasta-services.md` |
| `digital-advertising/advertising-intelligence-dashboard-setup-overview.md` | `digital-advertising/advertising-intelligence-dashboard-partner-setup-overview.md` |

If no counterpart is found, go to **Step 5**.

## Step 4 — Produce audience-adapted suggested edits

When a counterpart exists, translate the source change into the destination's
audience and conventions. **Read `references/audience-transform.md` for the full
rule set** (branding, voice, link-path and filename differences, MDX imports,
markdown quirks). In short:

- Preserve the *substance* of the change (facts, steps, policies, timelines).
- Re-skin for the destination audience: strip brand names for SMB / restore them
  for Partner; adjust "you" framing (SMB = the business owner; Partner = the
  partner serving clients).
- Fix cross-reference link paths and filenames to the destination's slugs.
- Respect destination-only mechanics: services-docs uses shared MDX snippet
  imports (e.g. `_optimization-plan-section.mdx`) that do **not** exist in the
  Partner repo; do not copy those imports across.
- Obey the destination repo's `CLAUDE.md` (section order, em-dash/`>` rules,
  image syntax, frontmatter shape).

Apply the edits to the counterpart file **in the destination repo's working
tree** so they appear as a reviewable `git diff`. Do **not** stage or commit.
Then show the teammate:

1. A short summary of what changed and how you adapted it for the audience.
2. The `git diff` of the counterpart file.
3. Any judgment calls or spots that need a human decision.

Tell the teammate to review both the original and the suggested counterpart, and
that nothing is committed until they approve.

## Step 5 — One-sided articles (flag and ask)

When a counterpart does not exist:

- **New / edited with no counterpart:** State that no counterpart was found.
  Assess whether the article looks intentionally audience-specific (partner-only
  operational content, or SMB-only). Explain your read, then **ask** whether to
  draft a new counterpart. Only draft it (audience-adapted, into the destination
  working tree for review) if they say yes.
- **Deleted with no counterpart, or deleted where a counterpart still exists:**
  Never delete the counterpart automatically. Report the deletion and **ask**
  whether the counterpart should also be removed or kept (it may be intentionally
  one-sided).

## Guardrails

- Suggest only — never `git add`, `git commit`, or `git push`.
- Never invent facts; carry over only what the source change actually says, then
  adapt phrasing for the audience.
- Never delete or create files without explicit confirmation.
- When unsure whether content is audience-specific, ask rather than guess.
