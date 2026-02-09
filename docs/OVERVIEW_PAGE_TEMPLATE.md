# Overview/Landing Page Template - Best Practices

This template is based on analysis of successful overview pages in the documentation, particularly the CRM overview page. Use this as a guide when creating or updating overview/landing pages.

## Important: Overview Pages Are Category Landing Pages

**CRITICAL:** Overview/landing pages should **NOT** create a new separate page. Instead, they **ARE** the landing page that appears when users click on a category dropdown in the sidebar.

### How It Works

- **File location**: Overview pages must be named `index.mdx` and placed in the category folder (e.g., `docusaurus/docs/crm/index.mdx`)
- **Category configuration**: The `_category_.json` file in the folder should link to this `index.mdx` file:
  ```json
  {
    "label": "CRM",
    "position": 9,
    "collapsed": true,
    "link": { "type": "doc", "id": "index" }
  }
  ```
- **User experience**: When users click on the "CRM" category in the sidebar, they see the `index.mdx` content - this IS the overview page
- **Do NOT create**: A separate "Overview" or "Getting Started" page in addition to `index.mdx` - the `index.mdx` file serves as both the category landing page and the overview

### Example Structure

```
docusaurus/docs/crm/
├── _category_.json          ← Links to index.mdx
├── index.mdx                ← THIS IS THE OVERVIEW/LANDING PAGE
├── contacts/
│   └── index.mdx
├── companies/
│   └── index.mdx
└── ...
```

When users click "CRM" in the sidebar, they see `crm/index.mdx` - that's the overview page. It's not a separate page; it's the category's landing page.

## Frontmatter Structure

```yaml
---
title: [Feature Name] Overview
description: [One-sentence description of what this feature/product does and its key benefits]
sidebar_position: [Number - lower numbers appear first]
sidebar_label: [Optional - custom label if different from title]
tags: [optional, list, of, relevant, tags]
keywords: [optional, comma, separated, keywords, for, SEO]
---
```

**Best Practices:**
- Keep description concise (under 160 characters for SEO)
- Use sentence case for titles
- Include relevant tags for discoverability
- Set appropriate sidebar_position to control navigation order

## Page Structure

### 1. Main Heading
```markdown
# [Feature Name] overview
```
- Use sentence case
- Keep it simple and clear
- Match the title from frontmatter (can be slightly different for readability)

### 2. Opening Paragraph
```markdown
[Feature/Product name] provides [key capabilities]. Built to [primary purpose], 
[feature name] integrates seamlessly with [related systems/workflows]. This 
[type of tool/platform] helps you [main value propositions] to [end goal].
```

**Best Practices:**
- 2-3 sentences maximum
- Focus on value proposition
- Use active voice
- Mention integration points if relevant
- Avoid jargon - use clear, partner-facing language

### 3. Why Use Section (Optional but Recommended)
```markdown
## Why use [Feature Name]?

[Compelling value statement that explains the transformation or benefit]. 
[Feature Name] [key differentiators] to [desired outcome].
```

**Best Practices:**
- Focus on benefits, not just features
- Use action-oriented language
- Highlight what makes it unique or valuable
- Keep to 2-3 sentences

### 4. What's Included Section
```markdown
## What's included

- **[Sub-feature 1](./path/to/sub-feature/index.mdx)**: [Brief description of what it does]
- **[Sub-feature 2](./path/to/sub-feature/index.mdx)**: [Brief description]
- **[Sub-feature 3](./path/to/sub-feature/index.mdx)**: [Brief description]
```

**Best Practices:**
- Use bulleted list with links to sub-pages
- Keep descriptions to one line each
- Order by importance or logical flow
- Use descriptive link text (not "click here")
- Link to `index.mdx` files for category pages

### 5. Get Started Section
```markdown
## Get started

1. **Step one action**
   - Navigate to `Partner Center` > `[Section]` > `[Subsection]`
   - [Additional detail or context]

2. **Step two action**
   - [Specific action to take]
   - [Expected outcome or result]

3. **Step three action**
   - [Next action]
   - [What this enables]
```

**Best Practices:**
- Use numbered list for sequential steps
- Include navigation paths using backticks: `Partner Center` > `Section`
- Keep steps actionable and specific
- Limit to 3-5 steps for quick wins
- Use bold for key actions or UI elements

### 6. Feature Deep-Dive Sections (Optional)
```markdown
## [Feature name or capability]

![Descriptive alt text](img/path/to/image.jpg)

[Detailed explanation of the feature, how it works, and when to use it.]

:::note [Note Type]
[Important information, warnings, or context that users should know.]
:::
```

**Best Practices:**
- Include relevant screenshots with descriptive alt text
- Use Docusaurus callouts (`:::note`, `:::tip`, `:::warning`) for important info
- Place images in `img/` folder alongside documentation
- Use relative paths: `./img/image-name.png`
- Add notes about screenshot currency if UI may have changed

### 7. Common Workflows Section (Optional)
```markdown
## Common [Feature] Workflows

**Getting Started:**
1. **First workflow step** - [Description]
2. **Second workflow step** - [Description]

**Advanced Usage:**
- **Workflow type 1**: [Description]
- **Workflow type 2**: [Description]
```

**Best Practices:**
- Organize by user journey or use case
- Use bold for workflow names
- Keep descriptions concise
- Link to detailed guides when available

### 8. Frequently Asked Questions Section
```markdown
## Frequently Asked Questions

<details>
<summary>[Question in question format]</summary>

[Answer with clear steps or explanations. Use numbered lists for procedures, 
bullets for options or features.]

</details>

<details>
<summary>[Another common question]</summary>

[Answer with relevant details, links to related pages, and actionable guidance.]

</details>
```

**Best Practices:**
- Use `<details>` and `<summary>` tags for collapsible FAQs
- Place `<details>` tags on their own lines with blank lines around content
- Start questions with question words (How, What, Why, Can, Does)
- Provide actionable answers, not just explanations
- Include links to related documentation
- Group related questions together
- Cover common troubleshooting scenarios

## Visual Elements

### Images
- Place images in `img/` folder within the documentation directory
- Use descriptive filenames: `feature-name-screenshot.png`
- Always include alt text describing the image purpose
- Use relative paths: `./img/image-name.png` or `img/section/image-name.png`
- Blur or replace sensitive data (PII) in screenshots

### Screenshot Notes
```markdown
:::note Screenshot Update Needed
The screenshots in this document may show outdated interface elements. 
The functionality described remains accurate, but visual elements may differ 
from the current interface.
:::
```

## Content Guidelines

### Voice & Tone
- **Fun, not silly** | **Professional, not formal** | **Helpful, not overbearing** | **Expert, not bossy**
- Use active voice: "Admins can change these settings" ✅
- Use present tense: "View your invoices" ✅
- Avoid internal jargon in partner-facing docs

### Formatting Rules
- **CRITICAL: Never use `>` character in markdown** - creates unintended blockquotes
- Use Docusaurus callouts: `:::tip`, `:::info`, `:::warning` (not blockquotes)
- Sentence case headings: `## Set up a domain`
- **Bold** for UI elements, `code` for commands and filenames
- Use backticks for navigation paths: `Partner Center` > `Section` > `Subsection`

### Links
- Link to sub-pages using relative paths: `./sub-page/index.mdx`
- Use descriptive link text (not "click here" or "here")
- Link to `index.mdx` files for category landing pages
- Test all links before publishing

## Example: Complete Overview Page

```markdown
---
title: CRM Overview
description: Comprehensive overview of Vendasta's Customer Relationship Management system including navigation, email capture, record sources, and frequently asked questions
sidebar_position: 1
---

# CRM overview

The Vendasta CRM provides comprehensive tools for managing customer relationships, tracking interactions, and nurturing business prospects. Built to streamline sales processes and improve client engagement, the CRM integrates seamlessly with your existing workflows. This centralized platform helps you organize contacts, track opportunities, and automate communications to drive revenue growth.

## Why use the CRM?

Transform your sales process with powerful relationship management tools that keep your team organized and your prospects engaged. The Vendasta CRM eliminates data silos, automates routine tasks, and provides insights that help you close more deals faster.

## What's included

- **[Contacts](./contacts/index.mdx)**: Manage people, import/export, and run campaigns
- **[Companies](./companies/index.mdx)**: Manage organizations, associate contacts and opportunities  
- **[Lists](./lists/index.mdx)**: Segment contacts and companies with static or smart lists
- **[Tasks](./tasks/index.mdx)**: Plan and complete sales activities
- **[Opportunities](./opportunities/index.mdx)**: Track and manage deals in table or board views

## Get started

1. **Go to CRM in Partner Center**
   - Navigate to `Partner Center` and click on `CRM`
   - Choose between `Contacts` and `Companies` views

2. **Set up your Companies view** 
   - Customize columns to show information that matters to you
   - Enable, display, and reorder columns based on your preferences

3. **Create your first contact**
   - Click `Create contact` in the top right corner
   - Fill in name, email, and phone number (email recommended)

## Setting up your view

![Setting up CRM view](img/crm/crm-overview/setting-up-view.jpg)

:::note Screenshot Update Needed
The screenshots in this document may show outdated interface elements. The functionality described remains accurate, but visual elements may differ from the current CRM interface.
:::

Navigate to `CRM` > `Companies`. You are now on the company page. The very first thing you want to do is ask yourself what information matters to you.

## Frequently Asked Questions

<details>
<summary>Who can see these new tabs in Partner Center? Can I change this?</summary>

Yes, you can control who can see the new tabs in `Partner Center` for users with admin roles, here's how:

1. **Navigate to the My Teams Page**:
   - Begin by navigating to the [`My Teams` page](https://partners.vendasta.com/my-team) in the `Partner Center`.

2. **Edit User Settings**:
   - Locate the user whose tab visibility you want to control.
   - Click on the row action menu next to their name.
   - Select `Edit member` from the menu to modify their settings.

</details>
```

## Checklist for New Overview Pages

- [ ] **File is named `index.mdx`** and placed in the category folder (NOT a separate page)
- [ ] **`_category_.json` links to `index.mdx`** so clicking the category shows this overview page
- [ ] Frontmatter includes title, description, and sidebar_position
- [ ] Opening paragraph clearly explains what the feature/product is
- [ ] "Why use" section highlights key benefits
- [ ] "What's included" section lists all major sub-features with links
- [ ] "Get started" section provides 3-5 actionable steps
- [ ] Images are included where helpful, with descriptive alt text
- [ ] FAQ section addresses common questions
- [ ] All links are tested and working
- [ ] Content follows voice & tone guidelines
- [ ] No `>` characters used (would create blockquotes)
- [ ] Navigation paths use backticks: `Partner Center` > `Section`
- [ ] UI elements are bold, commands/filenames are in code format

## Additional Resources

- See [CLAUDE.md](../CLAUDE.md) for project-specific guidelines
- See [CONTRIBUTING.md](./CONTRIBUTING.md) for content style guide
- See [ARCHITECTURE.md](./ARCHITECTURE.md) for technical architecture details
- Review existing overview pages for inspiration:
  - `docusaurus/docs/crm/index.mdx`
  - `docusaurus/docs/marketing/index.mdx`
  - `docusaurus/docs/business-app/index.mdx`
