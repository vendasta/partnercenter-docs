---
name: screenshot-docs
description: Capture Partner Center screenshots and inject them into Getting Started guides. Use when asked to "update screenshots", "capture screenshots for docs", or "screenshot the getting started guides".
---

# Partner Center Screenshot Automation

Navigates the Vendasta Partner Center, captures screenshots for each subsection of the Getting Started guides, and injects the image references into the markdown files.

## When to Use

This skill triggers when:
- Taking screenshots of Partner Center pages for documentation
- Updating Getting Started guide images
- User mentions "screenshot docs", "update screenshots", "capture getting started screenshots"

## Prerequisites

Before running this skill, verify:
1. Python 3.6+ is available
2. The `gh` CLI is authenticated (`gh auth status`)

---

## Workflow

### Step 1: Load the Screenshot Map

Read `config/screenshot-map.yaml` from the repo root to get:
- The base Partner Center URL
- The viewport dimensions
- The list of guides, each containing sections with URLs, screenshot names, alt text, and injection anchors

Parse the YAML and build a work queue of screenshots to capture.

### Step 2: Validate Target Files

Before launching the browser:

1. Verify each target `.mdx` file exists
2. Verify the `img/` directory exists (create it if not)
3. Check git status and warn if there are uncommitted changes

```bash
ls docusaurus/docs/getting-started/getting-started-guides/getting-started-with-branding-and-customization.mdx
ls docusaurus/docs/getting-started/getting-started-guides/img/
git status --porcelain
```

### Step 3: Launch Browser and Authenticate

Launch the browser-use subagent and navigate to the Partner Center:

1. Set the viewport to the configured dimensions (default: 1440x900)
2. Navigate to `{base_url}` (https://partners.vendasta.com)
3. **If a login page appears**: Tell the user "Please log in to Partner Center in the browser. I'll wait for you to complete SSO." Then wait and check periodically until the page shows the authenticated Partner Center dashboard.
4. Once authenticated, confirm by checking that the page URL is no longer a login/SSO page.

### Step 4: Capture Screenshots (Per Guide)

For each guide in the screenshot map, process all sections in order:

#### 4a. Navigate to the Target Page

```
Navigate to: {base_url}{section.url}
```

Wait 3-5 seconds for the page to fully render (Partner Center uses Angular/React).

#### 4b. Prepare the View

- Dismiss any tooltips, welcome banners, or notification popups
- If the section has `notes` (e.g., "Click the All Markets dropdown"), follow those instructions to set up the correct UI state before capturing
- If a `focus_element` is specified, scroll to bring that element into view

#### 4c. Take the Screenshot

Take a screenshot. Prefer element-level screenshots when possible (targeting the `focus_element`), falling back to a full-page screenshot if element targeting is not available.

#### 4d. Save the Screenshot

Save the captured image to:
```
{img_dir}/{screenshot_name}
```

All paths are relative to the repo root. If the file already exists, overwrite it.

### Step 5: Inject Image References

After capturing all screenshots for a guide, run the markdown injection script for each section:

```bash
python scripts/update_markdown.py \
    --doc "{file}" \
    --after "{section.header}" \
    --image "./img/{section.screenshot_name}" \
    --alt "{section.alt}"
```

This is idempotent: running it twice produces identical output. Existing image references are updated in place, new ones are inserted.

### Step 6: PII Check

Run the PII check on all captured images:

```bash
python scripts/mask_pii.py "{img_dir}/"
```

This will print warnings reminding the user to manually review screenshots for sensitive data before merging.

### Step 7: Commit and Create a PR

1. Stage the new images and modified markdown files:
```bash
git add docusaurus/docs/getting-started/getting-started-guides/img/*.png
git add docusaurus/docs/getting-started/getting-started-guides/*.mdx
```

2. Commit with the repo's commit message format:
```bash
git commit -m "docs: add screenshots to Getting Started guides"
```

3. Push and create a PR:
```bash
git push -u origin HEAD
gh pr create \
    --title "docs: add screenshots to Getting Started guides" \
    --body "## Summary

- Added screenshots to the Branding and Customization Getting Started guide
- Added screenshots to the Your Team Getting Started guide
- Each subsection now has a corresponding Partner Center screenshot
- All image references injected using idempotent update_markdown.py script

## PII Review

Please manually verify that no personally identifiable information (partner names, emails, phone numbers, account IDs) is visible in the screenshots before merging.

## Test Plan

- [ ] Verify each screenshot shows the correct Partner Center page/section
- [ ] Verify all image references render correctly in the Docusaurus preview
- [ ] Verify no PII is visible in any screenshot
- [ ] Run npm run build in docusaurus/ to confirm no broken image links"
```

---

## Running for a Single Guide

If the user only wants to update screenshots for one guide, filter the work queue by guide file path. For example:

> "Update screenshots for the branding guide only"

Process only the sections under the matching `file` entry in the screenshot map.

## Running for a Single Section

If the user only wants one screenshot:

> "Screenshot the Company Name section of the branding guide"

Find the matching section by header text, capture just that screenshot, inject it, and skip the PR step (let the user decide when to commit).

## Tips

- **Multiple sections on one page**: Several sections in the branding guide share the same URL (`/customize-branding`). Avoid re-navigating if you're already on the right page. Just scroll to the target element.
- **Dialogs and menus**: Some screenshots require opening a dialog or clicking a menu first (noted in the `notes` field). Perform the action, wait for the UI to settle, then capture.
- **Overwriting**: Always overwrite existing screenshots. This keeps the docs "evergreen" with the latest UI.
- **Build verification**: After creating the PR, suggest the user run `cd docusaurus && npm run build` to verify no broken image links were introduced.
