---
name: support-capture
description: Rules for adding a small piece of Support-verified knowledge (an FAQ entry or troubleshooting step) to an existing Partner Center docs article. Used by the capture-knowledge skill in support-on-demand-docs, or directly when a Support agent wants to add what they learned on a ticket to docs.vendasta.com. Additions to existing articles only; never creates new pages.
---

# Support capture: Partner Center docs

These docs are **public** (docs.vendasta.com) and written for **partners**. Everything merged here is published. Support agents add small, verified pieces of knowledge learned on tickets to existing articles. The docs team reviews every PR.

Follow `CLAUDE.md` for all style rules. This file only covers what is specific to Support captures.

## What belongs here

Add knowledge that a partner could act on themselves in Partner Center:

- Why something behaves the way it does, when that is the product working as designed.
- Steps a partner can take to fix or avoid a problem.
- A limit, requirement, or prerequisite the article doesn't mention.

It does **not** belong here if it needs internal tools (VStore, superadmin, BigQuery, logs, Jira), a Vendasta-side action ("Support can reset…"), an unreleased or unconfirmed behavior, or details about a specific partner or account. That knowledge goes to support-on-demand-docs instead.

## Where to put it

**Additions only. Never create a new page, folder, or `_category_.json`.** If no existing article fits, stop and report it as a doc gap; do not force it into an unrelated page.

1. Search `docusaurus/docs/` for the feature (search titles, `description`, `keywords`, and body text). Skip `docusaurus/docs/legacy/`.
2. Pick the one article a partner would read when hitting this problem:
   - A `content_type: troubleshooting` article or a `*troubleshooting*` page for the feature, if one exists (e.g. `automations/automation-history/troubleshooting-automations.mdx`, `getting-started/partner-troubleshooting-guide.mdx`).
   - Otherwise the feature's main article.
3. Add the knowledge in the form that article already uses:
   - **FAQ entry** (most common): a new `<details>` block at the end of the existing FAQ section. The FAQ heading varies (`## Frequently asked questions`, `## FAQs`, …); use whatever the article has. If the article has no FAQ section, add `## Frequently asked questions` at the end, before any "Related" or "Next steps" section.
   - **Troubleshooting guide**: follow the guide's existing pattern, e.g. a new `### N. <cause>` under the matching `## Why…?` heading, or a new "Common issue" block.
   - **Missing fact in a how-to**: one sentence or a `:::tip`/`:::info` in the relevant step. Keep it minimal.
4. Before adding, check whether the article already answers the question. If it does but is wrong or unclear, correct that text instead of adding a duplicate.

## FAQ entry format

```markdown
<details>
<summary>Why does my automation skip some contacts?</summary>

An automation skips a contact when the contact doesn't meet the trigger's filters at the moment the automation runs. Open the automation, go to `Automations` → `Activity`, and check the filter conditions.

</details>
```

- The summary is the question a partner would actually ask, in their words.
- Answer first: the first sentence answers the question. Then, if needed, the steps.
- Keep it to 1–4 sentences, or a short numbered list.
- `<details>` and `</details>` on their own lines with a blank line after `<summary>…</summary>` and before `</details>`.

## Rules that commonly trip up captures

- **Never use the `>` character.** Use `→` for UI paths: `Settings` → `Integrations`.
- UI elements in `code`, not bold.
- Address the partner as "you" and their customers as "your clients". Never "partners" or "the agency" in the third person.
- Present tense only. No "now", "new", "previously", "coming soon", "no longer".
- No customer names, account names, AGIDs, PIDs, ticket numbers, emails, or screenshots from a real account.
- Only write what was confirmed on the ticket. No guesses about why.

## Frontmatter

Don't edit the frontmatter, except to add a `keywords` entry when the new FAQ introduces a search term the article lacks. Leave `last_reviewed` and `last_reviewed_by` to the docs team.

## Check before committing

From the repository root:

```bash
python3 .claude/skills/support-capture/scripts/check_capture.py --profile partnercenter "<changed file>"
```

It reports only problems the change introduces. Fix every `ERROR`; review every `WARN`. PR checks here only run a secret scan and the site is built after merge, so this check is the main protection against breaking docs.vendasta.com.

## Commit and PR

- Branch: `support-capture/<yyyy-mm-dd>-<short-topic>` from `origin/master`.
- Commit: `docs: update <feature> — add support FAQ` (or `— add troubleshooting step`).
- The PR description records the source ticket and the routing decision; the doc itself never mentions the ticket.
