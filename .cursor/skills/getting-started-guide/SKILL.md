---
name: getting-started-guide
description: Creates or edits a Getting Started guide in the partnercenter-docs repository. Use when the user asks to create, write, or fill in a Getting Started guide for a platform topic (e.g. "create a Getting Started guide for accounts", "write the Your Team guide", "fill in the Vendasta Payments stub").
---

# Getting Started guide

Create or edit a Getting Started guide for a beginner partner audience. Guides live in `docusaurus/docs/getting-started/getting-started-guides/` and follow a consistent structure, style, and linking pattern.

## When to apply

- User asks to "create a Getting Started guide for [topic]"
- User asks to "write" or "fill in" a Getting Started guide stub
- User asks to "edit" or "update" an existing Getting Started guide

---

## Workflow

### 1. Read the source docs

Before writing anything, read the existing documentation for the topic. Source docs live in `docusaurus/docs/` under the relevant section:

| Topic area | Source path |
|---|---|
| Team management | `administration/my-account/my-team/` |
| Branding | `administration/platform-settings/partner-branding/`, `administration/platform-settings/customize-business-app/` |
| Accounts | `accounts/manage-accounts/` |
| Marketplace / store | `marketplace/` |
| Payments | `administration/commerce/vendasta-payments/` |
| Subscriptions / billing | `commerce/subscriptions/`, `commerce/invoices/`, `commerce/orders/` |
| CRM | `crm/` |
| Marketing / campaigns | `marketing/` |
| Automations | `automations/` |
| Task Manager | `fulfillment/task-manager/` |

Read the index and key child docs to understand the feature before writing. Do not duplicate full procedures from source docs — summarize and link instead.

### 2. Check the stub

If a stub file already exists for this guide:
- **Do not change the frontmatter or sidebar_position** — leave them exactly as they are
- Only replace the placeholder body content (e.g. `*Content coming soon.*`)

If no file exists, create one at:
```
docusaurus/docs/getting-started/getting-started-guides/getting-started-with-[topic].mdx
```

### 3. Verify all links before writing

For every internal link you plan to include:
- Confirm the target file exists under `docusaurus/docs/`
- Use root-relative paths starting with `/` (e.g. `/administration/my-account/my-team/`)
- To link to a section, append the anchor (e.g. `/partner-center/#customize-your-domains`)
- Never link to a Getting Started guide that does not yet exist — use plain text instead

### 4. Write the guide

Follow the document structure and style rules below exactly.

### 5. Check for linting errors

After writing, run the linter on the file and fix any errors introduced.

---

## Document structure

Every guide must follow this structure in order:

### H1 title
If creating a new file, use: `# Getting Started: [Topic Name]`
If editing a stub, keep the H1 that already exists.

### Intro paragraph
1-3 sentences. Explain what the topic is, why it matters to a beginner, and what the guide covers. Write for a new partner who is just getting started on the platform, not an experienced user.

### Plan restriction note (if applicable)
If any feature in the guide requires a paid or higher-tier plan, add a `:::note` immediately after the intro. Never name specific plan tiers (e.g. Growth, Scale, Starter, Pro). Use generic language and link to the pricing page:

```mdx
:::note
Some features covered in this guide are only available on certain plans. [View plan details](https://www.vendasta.com/pricing)
:::
```

### Getting Started Checklist
A numbered list linking to each major step. Use colons, not em dashes, to separate the step name from its description:

```mdx
## Getting Started Checklist

1. [Step one title](#step-1-step-one-title): brief description
2. [Step two title](#step-2-step-two-title): brief description
3. [Step three title](#step-3-step-three-title): brief description
```

### Steps (H2 sections)
Each step is a `##` section. Open with 1-2 sentences of context, then a navigation path if relevant, then H3 sub-sections for each sub-task.

Navigation paths use this format:
```
Navigate to **Partner Center** > **Section** > **Page**.
```

Link to relevant reference docs inline within each step, at the point where the topic is introduced. Do not save links for a "What's next" section at the end.

End every step section with:
```mdx
[Back to checklist](#getting-started-checklist)

---
```

### Inline links (no "What's next" section)
Do not add a "What's next" section at the end of the guide. Instead, link to relevant reference docs and related articles naturally within the body of the guide, at the point where the topic is introduced or explained.

**How to do this:**
- When a step references a feature covered in more depth elsewhere, add a `[Learn more](/path/to/doc)` link at the end of that section or paragraph
- When a sub-topic has its own dedicated reference page, link the feature name inline: e.g. `[Learn more about permissions](/administration/my-account/my-team/permissions)`
- When a step ends with a "Back to checklist" link, place any relevant "Learn more" link immediately before it

**Wrong:** saving all links for a "What's next" list at the bottom
**Right:** linking to the permissions reference page at the end of the permissions step, where the reader actually needs it

Only link to pages that actually exist in the repo. Never link to a Getting Started guide that does not yet exist.

---

## Style rules

### Em dashes: never use them
Em dashes (`—`) are not allowed anywhere, including the frontmatter description. Replace with:
- A colon (`:`) when introducing a list or expansion
- A comma (`,`) when used as a parenthetical
- A period (`.`) to start a new sentence
- Parentheses `( )` for asides

**Wrong:** `This is a white-label platform — meaning you can brand it as your own.`
**Right:** `This is a white-label platform, meaning you can brand it as your own.`

### Heading casing
Use sentence case for all headings. Capitalize only the first word of the heading and any proper nouns or product names. Every other word should be lowercase, even if it feels like an important word.

**Wrong:** `### Add Your Company Name And Logo`
**Wrong:** `## Step 1: Set Up Partner Branding And Customization`
**Right:** `### Add your company name and logo`
**Right:** `## Step 1: Set up Partner Branding and customization`

Proper nouns that are always capitalized as written, regardless of position in a heading:
- Vendasta, Partner Center, Business App, Task Manager, Marketplace
- Vendasta Payments, Snapshot Report, Executive Report
- Named Vendasta products (e.g. Reputation AI, Social Marketing, LocalSEO)

### Plan tier names
Never reference specific plan names (Growth, Scale, Starter, Pro, etc.). Use "certain plans", "select plans", or "paid plans" and link to `https://www.vendasta.com/pricing`.

### Tone
- Write for a beginner partner who is brand new to the platform
- Use "you" and "your clients" — not "the user" or "the partner"
- Be direct and instructional
- Numbered lists for sequential steps, bullet lists for non-sequential info

### Step instructions
Bold all UI element names (buttons, field labels, menu items, tab names):

```mdx
1. Go to **Partner Center** > **Administration** > **My Team**.
2. Click **Invite team member**.
3. Enter a name and email address.
4. Click **Send**.
```

### Tables
Use tables for comparison or decision-making content. Use "N/A" instead of em dashes in table cells.

### Admonitions

| Type | Use for |
|---|---|
| `:::note` | Plan restrictions, behavior caveats, things that may vary |
| `:::tip` | Best practices, recommendations, time-saving advice |
| `:::warning` | File format requirements, things that will cause errors if wrong |
| `:::info` | Prerequisites, related settings the reader should know about |

---

## Canonical example

Refer to the branding guide as the model for structure, tone, and formatting:
[getting-started-with-branding-and-customization.mdx](mdc:docusaurus/docs/getting-started/getting-started-guides/getting-started-with-branding-and-customization.mdx)

---

## Planned guide series

Use this to understand what has been built and what's coming:

| # | Guide title | Status |
|---|---|---|
| 1 | Getting Started: Branding & Customization | Created |
| 2 | Getting Started: Your Team | Created |
| 3 | Getting Started: Accounts & Product Activation | Stub |
| 4 | Getting Started: Vendasta Payments | Stub |
| 5 | Getting Started: Subscriptions & Client Billing | Stub |
| 6 | Getting Started: Your Store & Marketplace | Planned |
| 7 | Getting Started: CRM & Sales Pipeline | Planned |
| 8 | Getting Started: Marketing & Email Campaigns | Planned |
| 9 | Getting Started: Automations | Planned |
