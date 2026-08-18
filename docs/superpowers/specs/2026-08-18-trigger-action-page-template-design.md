# Trigger & Action Page Template

**Date:** 2026-08-18
**Repo:** vendasta/partnercenter-docs
**Path:** `docusaurus/docs/automations/my-automations/`

## Problem

The automations docs have catalog pages (triggers overview, actions overview) that link to individual trigger and action detail pages. Today only 5 of 130+ actions have dedicated pages. The rest link to sections in the monolithic triggers-reference and steps-reference pages, which are hard to maintain and hard for users to land on directly.

We need a standard page template so every trigger and action page is consistent, scannable, and scales from a 40-line lightweight page to a 180-line deep-dive without feeling like a different kind of document.

## Scope

- One unified template for both triggers and actions
- Sections are required or optional based on page complexity
- Does not cover the overview/catalog pages (already shipped)
- Does not cover logic & flow control pages (delay, if/else, jump) — those follow their own format

## Template structure

### Required sections

Every trigger and action page includes these six sections, in this order.

#### 1. Frontmatter

```yaml
---
title: Action or trigger name
description: One sentence — what it does and why you'd use it.
sidebar_class_name: hidden-sidebar-item
tags: [automations, relevant-tags]
keywords: [search terms users might type]
---
```

All detail pages use `sidebar_class_name: hidden-sidebar-item` so they are accessible by URL and linked from overview pages but do not appear in the sidebar.

#### 2. Intro paragraph

- H1 matching the title
- 2-3 sentences: what it does, when you'd reach for it
- Bold the action/trigger name on first mention
- No heading for this section — it sits directly under the H1

Example tone (from existing pages):

> **Find company** lets you search for an existing company record in your CRM based on field criteria you define. When a match is found, the company is brought into scope so downstream steps can act on it — assign an owner, start a campaign, update fields, or branch based on whether a match was found.

#### 3. How it works

Heading: `## How it works`

A numbered list of 3-5 steps in plain English describing the runtime behavior.

For **triggers**, the pattern is:
1. What event/condition fires the trigger
2. What entity comes into scope
3. What data is available to downstream steps

For **actions**, the pattern is:
1. What you configure (inputs)
2. What the step does at runtime
3. What comes out (outputs available downstream)

#### 4. Configuration

Heading: `## Set up the trigger` or `## Set up the action`

Walk through how to configure it in the automation builder:

1. Brief numbered steps to find and add it (e.g., "Open the automation builder and add a new step. Under **Category**, select **Action name**.")
2. A fields table:

| Field | Required | Description |
|---|---|---|
| **Field name** | Yes/No | What this field controls and how to fill it in. |

3. For triggers, include **Conditions** as a subsection (`### Conditions`) explaining AND/OR filtering if applicable.

Include a `:::tip` callout for dynamic content:

```
:::tip
Select **Add dynamic content** to insert data from a previous step. Dynamic values are resolved at runtime.
:::
```

#### 5. Outputs

Heading: `## Outputs`

A table of values available to downstream steps after this trigger fires or action runs.

| Output | Description |
|---|---|
| **Output name** | What this value contains. |

Close with: "Reference these outputs in later steps using **Add dynamic content** and selecting this step's output."

For triggers, use the heading `## Available data` instead of `## Outputs`.

#### 6. Related resources

Heading: `## Related resources`

A bulleted list of 3-5 links to relevant pages. Always include the parent overview page (triggers overview or actions overview). Prefer links to complementary actions, the logic & flow control page, and the creating/configuring automations page.

### Optional sections

Include these when the page warrants it. Insert them in the order shown below, between the required sections they sit nearest.

#### Scope callout (triggers only)

Insert after the intro paragraph, before "How it works."

A `:::info` admonition stating what entity the trigger brings into scope and what that means for downstream actions.

```
:::info Trigger scope
This trigger operates at the **company** scope. Company, account, and contact actions are available downstream. Use a lookup step to bring additional records into context.
:::
```

#### Example configuration

Insert after the configuration fields table.

Heading: `### Example configuration`

A concrete scenario showing the fields filled in with realistic values. Use a table or inline description. Include the trigger that pairs with the action to give full context.

Include when the fields table alone doesn't convey how to use the action — typically when fields accept dynamic content or have interplay between them.

#### Tips

Insert after Outputs.

Heading: `## Tips`

A bulleted list of non-obvious best practices, gotchas, or guidance. Each bullet starts with a bolded phrase.

- **Be specific in descriptions** — "Customer is asking about an invoice or payment" works better than "Money stuff"

Include when there are meaningful gotchas. Skip for straightforward actions like "Add tags" where the configuration is self-evident.

#### Use cases

Insert after Tips (or after Outputs if no Tips section).

Heading: `## Use case examples`

1-3 end-to-end walkthroughs showing the action/trigger in a real automation. Each use case follows the pattern:

```
### Use case title

Brief sentence describing the scenario.

**Step 1 — Set the trigger**
...
**Step 2 — Add the [action] step**
...
**Step 3 — What comes next**
...
```

Use cases always show the full automation context (trigger + this step + at least one downstream step), not the action in isolation.

**Sizing guide for use cases:**

| Complexity | Examples | Use cases |
|---|---|---|
| Light | Add tags, notify a salesperson, pause campaign | 0 — configuration is self-explanatory |
| Medium | Send webhook, create opportunity, start campaign | 1 — show a representative scenario |
| Heavy | AI actions, find company, webhooks, API triggers | 2-3 — cover distinct scenarios |

#### Video or screenshot

Insert wherever it adds clarity — typically after the intro (for a Loom overview) or within the configuration section (for a panel screenshot).

Follow the repo's image conventions:
```jsx
<img src={require('./img/image-name.png').default}
  alt="Description"
  style={{width: '100%', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}} />
```

## Page sizing

The template flexes across three tiers. The tier is a guideline, not a hard rule — let the content dictate.

| Tier | Sections included | Approx. lines | When to use |
|---|---|---|---|
| **Light** (~40-60 lines) | Frontmatter, intro, how it works, configuration, outputs, related resources | 40-60 | Simple, single-purpose actions/triggers where config is obvious |
| **Medium** (~80-120 lines) | Light + tips and/or example configuration | 80-120 | Actions with non-obvious fields, multiple config options, or common mistakes |
| **Heavy** (~120-180 lines) | Medium + use cases + screenshots | 120-180 | Complex actions with branching, AI, lookups, or external integrations |

## Conventions

These conventions apply to all pages and are carried forward from the existing 5 detail pages:

- **Frontmatter:** Always include `sidebar_class_name: hidden-sidebar-item`
- **Bold for UI elements:** Field names, button labels, menu items
- **`code` for values:** `true`, `false`, field values when referencing outputs programmatically
- **Dynamic content pattern:** Always mention "Select **Add dynamic content** to insert data from a previous step" at least once in the configuration section
- **No `>` character in markdown** — use `:::tip`, `:::info`, `:::warning` callouts instead (per repo CLAUDE.md)
- **Sentence case headings:** "Set up the action" not "Set Up The Action"
- **Images in `img/` subfolder** alongside the .mdx files, using `require()` imports with standard border styles
- **Related resources last** — always the final section on the page

## Examples of existing pages by tier

These existing pages demonstrate the template at different sizes:

| Page | Tier | Notable |
|---|---|---|
| `find-company.mdx` | Heavy | 4 use cases, screenshot, tips |
| `categorize-with-ai.mdx` | Heavy | Loom video, example config, 3 use cases |
| `summarize-with-ai.mdx` | Heavy | Custom prompt guidance, 4 use cases |

No light or medium tier pages exist yet — they will be created as part of the rollout.

## Out of scope

- Writing the actual 130+ pages (separate implementation effort)
- Changes to the overview/catalog pages
- Trigger-reference or steps-reference page restructuring
- Search/filter functionality on overview pages
- Template category pages
