# Contributing to Vendasta Documentation

Thanks for helping improve our documentation!  
Before you start, please follow these quick guidelines to keep our docs consistent, clear, and error-free.

This cheat sheet is for **all contributors** working in GitHub/Cursor on our Docusaurus site.  
For technical details (redirects, JSON-LD, etc.), see the **[Architecture Guide](./ARCHITECTURE.md)**.

---

## Content Organization

All documentation content is located in the `docusaurus/docs` directory.
*   **Folders**: Group related pages (e.g., `accounts/`, `marketing/`).
*   **Index Pages**: Use `index.mdx` for category landing pages.
*   **Sidebar**: Controlled by `_category_.json` files in each folder (see Architecture Guide for details).

---

## Voice & Tone
- **Fun, not silly** | **Professional, not formal** | **Helpful, not overbearing** | **Expert, not bossy**
- Active voice: “Admins can change these settings” ✅
- Present tense: “View your invoices” ✅
- Avoid internal jargon in Partner-facing docs.

---

## Structure & Formatting (Markdown)

**Headings**
- Sentence case: `## Set up a domain`
- Hierarchy:
  - `##` Section
  - `###` Subsection

**Text Styles**
- **Bold** → UI elements (**Orders tab**, **Submit** button)
- *Italics* → Foreign words only
- `Inline code` → Commands, filenames

**Lists & Steps**
- Numbered = sequence
- Bullets = options
- Navigation paths: `**Partner Center** > **Accounts** > **Manage Accounts**`

---

## Product, Platform & UI Naming
- Capitalize branded products: Vendasta Payments, Marketplace
- Lowercase generic objects: accounts, invoices
- Match UI labels exactly
- Material UI terms: hamburger menu, kebab menu

---

## Linking
- Internal: `[Text](./file-name.md)` (relative path)
- External: `[Text](https://example.com)`
- Avoid “click here” — use descriptive link text
- Check all links before committing

---

## Media

**Images**
- Store in `/img/feature-folder/file-name.png` (lowercase, dashes)
- Alt text = purpose of image
- Blur sensitive data, use sample PIDs

**Videos**
- Use `<iframe>` embed
- Replace when UI changes

---

## Callouts
Use Docusaurus callouts:
- `:::tip` (Green) – best practices
- `:::info` (Blue) – extra info
- `:::warning` (Yellow) – cautions

---

## Grammar & Mechanics
- Acronyms: spell out first use → acronym (Google Business Profile (GBP))
- Sentence case for headings/buttons
- Hyphenation: US English rules
- Numbers: numerals ≥10, spell out 1–9
- Dates: October 15, 2025
- Time: 3:00 pm–4:00 pm
- Units: 20 GB
- File extensions: PDF, CSV

---

## Markdown Workflow
1. Add required frontmatter to docs pages:
   ```yaml
   ---
   id: file-name
   title: Page title
   sidebar_position: 1
   description: Short description
   ---

