Create or edit a Getting Started guide for the partnercenter-docs repository. Guides live in `docusaurus/docs/getting-started/getting-started-guides/` and follow a strict structure, style, and linking pattern.

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
| Conversations | `business-app/conversations/` |

Read the index and key child docs to understand the feature before writing. Do not duplicate full procedures from source docs — summarize and link instead.

### 2. Check for an existing stub

Check whether a file already exists at:
```
docusaurus/docs/getting-started/getting-started-guides/getting-started-with-[topic].mdx
```

If a stub exists:
- Do not change the frontmatter or sidebar_position — leave them exactly as they are
- Only replace the placeholder body content (e.g. `*Content coming soon.*`)

If no file exists, create one at the path above.

### 3. Verify all links before writing

For every internal link you plan to include:
- Confirm the target file exists under `docusaurus/docs/`
- Use root-relative paths starting with `/` (e.g. `/administration/my-account/my-team/`)
- To link to a section, append the anchor (e.g. `/partner-center/#customize-your-domains`)
- Never link to a Getting Started guide that does not yet exist — use plain text instead

### 4. Write the guide

Follow the document structure and style rules below exactly.

### 5. Check for linting errors

After writing, run `npm run build` from the `docusaurus/` directory and fix any errors in the new file.

---

## Document structure

Every guide must follow this structure in order:

### H1 title
Use: `# Getting Started: [Topic Name]`
If editing a stub, keep the H1 that already exists.

### Intro paragraph
1–3 sentences. Explain what the topic is, why it matters to a beginner partner, and what the guide covers. Write for someone who is brand new to the Vendasta platform.

### Plan restriction note (if applicable)
If any feature in the guide requires a paid or higher-tier plan, add a `:::note` immediately after the intro:

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
Each step is a `##` section. Open with 1–2 sentences of context, then a navigation path if relevant, then H3 sub-sections for each sub-task.

Navigation paths use this format:
```
Navigate to **Partner Center** → **Section** → **Page**.
```

Link to relevant reference docs inline within each step, at the point where the topic is introduced. Do not save links for a "What's next" section.

End every step section with:
```mdx
[Back to checklist](#getting-started-checklist)

---
```

### No "What's next" section
Do not add a "What's next" section at the end. Instead, link to reference docs naturally within the body, at the point where the topic is introduced.

---

## Style rules

### Em dashes: never use them
Replace `—` with a colon, comma, period, or parentheses depending on context.

**Wrong:** `This is a white-label platform — meaning you can brand it as your own.`
**Right:** `This is a white-label platform, meaning you can brand it as your own.`

### Heading casing
Sentence case only. Capitalize the first word and proper nouns. Every other word is lowercase.

Proper nouns always capitalized: Vendasta, Partner Center, Business App, Task Manager, Marketplace, Vendasta Payments, Snapshot Report, Executive Report, and named Vendasta products.

**Wrong:** `### Add Your Company Name And Logo`
**Right:** `### Add your company name and logo`

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
1. Go to **Partner Center** → **Administration** → **My Team**.
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

Refer to this file as the model for structure, tone, and formatting:
`docusaurus/docs/getting-started/getting-started-guides/getting-started-with-branding-and-customization.mdx`
