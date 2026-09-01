---
name: article-verifications
description: Verifies flagged Partner Center articles for quality, accuracy, and freshness. Reviews brand standards, style, grammar, links, and content currency. Produces a structured verification report with recommended actions for each article.
---

# Article Verifications

## Purpose

Review flagged articles to confirm they are accurate, current, and compliant with documentation standards. This replaces the previous Zendesk-based verification process. Five articles per day are flagged from each repository for review.

## When to Use

- Running the daily article verification batch (5 articles flagged for review)
- Spot-checking any article that may be outdated after a product update
- Verifying an article before a Knowledge Team member signs off on it

---

## Workflow

### Step 1: Identify articles to verify

**If file paths were provided by the user**, use those and skip to Step 2.

**If no file paths were provided**, fetch today's open verification issues from GitHub:

```bash
gh issue list --repo vendasta/partnercenter-docs --label review-due --limit 5 --json number,title,body
```

From each issue, extract:
- The **file path** from the `File:` line in the issue body (e.g. `docusaurus/docs/administration/my-account/index.mdx`)
- The **issue number** — store this alongside the file path so issues can be closed after verification

Announce what was found before proceeding:

> "Found [N] open review-due issues. Verifying:
> - `path/to/article.mdx` (issue #NNN)
> - ..."

If no open issues are found, tell the user and stop.

### Step 2: Read each article

Use the Read tool to load each file. Do not skim — read the full content before evaluating.

### Step 3: Check external links

For each external URL found in the article, run:

```bash
curl -s -o /dev/null -w "%{http_code}" --max-time 10 "<url>"
```

- **200–299**: Link is live
- **301–302**: Redirect — note the destination and confirm it is still appropriate
- **400, 403, 404, 410**: Broken or restricted — flag as broken
- **Timeout / no response**: Flag as unverifiable

Only check links that are explicitly in the article content. Do not follow redirect chains more than one level.

### Step 4: Check internal links

For each internal relative link (e.g. `../accounts/connect-profile.md`), resolve it relative to the article's directory and verify the target file exists:

```bash
ls docusaurus/docs/accounts/connect-profile.md
```

Flag any link where the target file does not exist.

**If the link includes a `#anchor` fragment**, also verify the anchor resolves. Extract every `## Heading` (and `###`) from the target file and slugify each one the way Docusaurus does (lowercase, spaces → hyphens, strip punctuation). Flag the link if the fragment doesn't match any slug — a valid target file with a dead anchor is still a broken link.

```bash
grep -n "^#" docusaurus/docs/accounts/connect-profile.md
```

### Step 4b: Check inbound anchors

A link pointing *into* one of today's flagged articles can go stale the moment you rename or remove a heading in it during this verification — and nothing else will ever check that. This step only exists to catch damage from *today's own edits*, so scope it accordingly:

**Skip this step entirely for any flagged article whose headings you did not add, rename, or remove in Step 5/7.** No heading change means no inbound anchor could have broken today — re-scanning the repo for it is redundant work with no new information. Note in the Link check section that inbound anchors were not re-checked because no headings changed.

For articles that did have heading changes, batch the repo scan into a single pass instead of one grep per article — search for all such articles' filenames at once:

```bash
grep -rlE "article-one-filename|article-two-filename" docusaurus/docs
```

Then, for each hit found outside today's batch, filter to only the lines that actually contain a `#anchor` fragment on the link before opening anything — a plain file-level link with no fragment cannot be broken by a heading rename:

```bash
grep -n "article-filename-without-extension#" path/to/hit.mdx
```

For each remaining hit, open it and check the `#anchor` fragment against the affected article's current headings, using the same slugify check as Step 4. Flag any inbound link whose anchor no longer resolves — this is a broken link on a page you weren't otherwise going to touch, so it needs its own **Pending approval** item (propose fixing the anchor or the surrounding text on the linking page, scoped narrowly to that link).

This is how a self-referential loop gets caught: Page A defers to Page B for a topic's details ("see Page B for details") while Page B has no content on that topic and defers back to Page A. Anchor resolution surfaces the symptom (a dead fragment) even when the underlying cause (missing content, circular deferral) needs a human judgment call — flag it as a **Needs SME Review** item rather than guessing where the content should live.

### Step 5: Run qualitative review

Apply every criterion in the **Verification Criteria** section below to each article. Read closely — automated checks catch patterns, but this step catches judgment calls.

### Step 6: Output the verification report

For each article, produce one report block using the **Report Format** below. Output all reports in a single response when verifying a batch.

### Step 7: Apply auto-fixable issues

After outputting the report, apply all auto-fixable issues using the Edit tool. Do not ask for confirmation before making these changes. See **Fix Authorization** for the complete list of what is and is not auto-fixable.

For every article that reaches **Pass** status with zero applied fixes, still add or update a `last_reviewed: YYYY-MM-DD` line in its frontmatter (today's date). The review-due bot (`scripts/flag_articles.py`) re-flags articles by git commit date alone — a Pass verification that touches nothing leaves the commit date unchanged, so the article gets re-flagged and re-reviewed on the very next run. The frontmatter stamp is a real, minimal commit that records the verification without altering visible content. List this under **Applied fixes** as "Added `last_reviewed` stamp (Pass, no content changes)."

### Step 8: Interactive approval flow for pending items

After auto-fixes are applied, check whether any articles have items listed under **Pending approval**. If none, skip this step.

**Collapse duplicates first.** If the exact same issue (e.g. the same prohibited term, the same tone problem) appears at multiple locations in the same article with the same proposed fix, treat it as **one** pending item covering every location, not one item per occurrence. List all affected lines in that single item's **Location** field. This is what keeps a repeated issue from turning into repeated near-identical prompts.

**Go one item at a time.** Collect all pending items across all articles into a single ordered queue (article order, then report order within each article), then work through the queue **one item per `AskUserQuestion` call** — never batch multiple items into one call, even though the tool supports up to 4 questions per call. The user needs to read each item's context before deciding, and a multi-question call makes that hard to do carefully. Present, wait for the answer, apply or skip, then move to the next item.

**Opening:** Announce how many total items need input before starting:

> "Auto-fixes are applied. [N] items need your input across [M] articles — I'll go through them one at a time."

---

**For each item**, output its context block as plain text first — before calling AskUserQuestion. Do not put this content inside the option descriptions. Lead with the article name and a clickable link as a sub-heading, so the user can see which file the item belongs to:

```
**[Article title]** ([path/to/file.mdx](path/to/file.mdx))

**Issue:** [One plain sentence — no jargon — describing what was found and why it matters]
**Location:** Line [N] in [filename](path/to/file.mdx)
**Current:** "[exact text as it appears in the file]"
**Proposed:** "[exact replacement text]"
```

Then make **one** AskUserQuestion call containing **exactly one** question entry for this item. For the standard case, that entry uses:
- Question: `Apply this change? [file.mdx:line]`
- Option 1: `Yes — apply it`
- Option 2: `No — skip it`

Keep the option descriptions brief (one short sentence max) — all the detail the user needs is in the text block above. Do not repeat the Issue/Current/Proposed content inside the option descriptions.

Each question automatically includes an "Other" free-text field. If the user types their own version there, apply their text instead of the proposed change — do not apply the original proposed text.

Apply, apply-custom, or skip the item based on its answer, then move to the next item in the queue. If a collapsed duplicate item is approved, apply the fix at every location it covers.

---

**Special cases — work through these in the same one-item-at-a-time queue as standard items, in queue order.** As with the standard format, output the item's context block as text first, then call AskUserQuestion with exactly one question entry for it:

**Prohibited term with no obvious replacement:**

```
**Issue:** "[term]" is a prohibited term — it should not appear in partner-facing documentation.
**Location:** Line [N] (and any other lines with the same term/fix — see Collapse duplicates above)
**Current:** "[exact sentence]"
**Question:** What should this say instead?
```

Use an AskUserQuestion entry with options tailored to the context, e.g.:
- `Remove the sentence entirely`
- `Replace "[term]" with "[suggested alternative]"`
- `Leave it for now — I'll handle this manually`

**File rename:**

```
**Issue:** The filename contains "[problematic term]", which appears in the public URL. Partners visiting this article would see "[term]" in the browser address bar.
**Current filename:** [current-name.mdx]
**Proposed filename:** [new-name.mdx]
**Note:** This changes the article's URL. Check for any existing inbound links to the old URL before confirming.
```

Use an AskUserQuestion entry with:
- `Yes — rename the file`
- `No — leave the filename as-is`

**SME review item** (no change can be proposed without product knowledge):

```
**Issue:** [Plain description of what's uncertain]
**Location:** Line [N]
**Current:** "[the text in question]"
**This needs an SME to verify** — I can't propose a safe change here without product confirmation.
```

Use an AskUserQuestion entry with:
- `Flag it with an inline comment for SME follow-up`
- `Leave it as-is — I'll handle it separately`

---

**After the queue is complete**, if any articles had items in their **Needs verification** section, print a compact checklist before the closing summary:

> **Before creating your PR, verify these manually in the live product:**
> - [Article title]: [the specific thing to check]
> - [Article title]: [the specific thing to check]

Then output the closing summary. If issues were fetched from GitHub, include a ready-to-use PR closing block:

```
## Approval flow complete

**Applied** — [N] change(s)
- [Article title]: [brief description of what was applied]

**Skipped** — [N] change(s)
- [Article title]: [brief description of what was skipped]

**Still needs follow-up** — [N] item(s)
- [Article title]: [what's outstanding and why — SME review, manual rename, etc.]

**Add to your PR description to auto-close the verified issues on merge:**
Closes #NNN
Closes #NNN
Closes #NNN
```

Use one `Closes #NNN` per line — GitHub only reliably parses one issue per closing keyword, so comma-separated lists on a single line may only close the first issue.

Only include issues that reached **Pass** or **Needs Update** (i.e. all fixes applied). Leave **Needs SME Review** issues out — they should stay open until the SME question is resolved.

### Step 9: Comment on GitHub issues

**Only run this step if issues were fetched from GitHub in Step 1.**

For each issue, post a comment with the verification outcome so there is a record on the issue itself. Do not close the issues — they will be closed automatically when the PR that contains `Closes #NNN` is merged.

```bash
gh issue comment [NNN] --repo vendasta/partnercenter-docs --body "[comment]"
```

The comment should follow this format:

```
**Article verification complete** — [Pass / Needs Update / Needs SME Review]

[1–2 sentences describing what was found and fixed. If items are still outstanding, name them specifically.]

Verified by Claude Code on [today's date]. Changes will be included in an upcoming PR.
```

Post a comment for every issue — including SME review ones. For SME review issues, note what question still needs answering so it is clear why the issue remains open.

Do this automatically without asking — it is just a log entry, not a destructive action.

---

## Verification Criteria

### 1. Brand and audience compliance

This is a **partner-facing** product. Partners, resellers, and agencies read these docs. They have a direct relationship with Vendasta and manage accounts on behalf of their clients.

**Correct and expected in this repo:**
- "Vendasta" — this is Vendasta's own partner documentation
- "Partner Center" — this is the product being documented
- "partner", "reseller", "agency" — these are the audience
- "your clients", "your customers" — partners manage accounts on behalf of others

**Flag immediately if any article contains:**
- Business-owner or consumer framing that addresses the end customer instead of the partner (e.g., "your business" when the reader is a reseller managing clients, not a business owner)
- Gray-label or SMB-product language carried over from Business App docs (e.g., "your provider", "your app")
- Product names that may have changed (e.g., a product renamed since the article was written)
- Any feature attributed to a product it no longer belongs to

---

### 2. Evergreen compliance

Articles must describe only the current, live state of the product.

**Flag any language that references:**
- The past: "previously", "formerly", "used to", "before this update", "earlier versions", "legacy", "deprecated", "renamed", "has since changed"
- The future: "coming soon", "on the roadmap", "will be available", "planned feature"
- Implied recency: "the new dashboard", "now supports", "recently added", "updated to include", "we've added", "you can now" — these imply a change, which violates evergreen even without using banned keywords

---

### 3. Voice and style

- **Tense**: Present tense only. Flag any past or future tense.
- **Perspective**: Second person — "you", "your clients", "your account". Flag "the user", "users", "they", "their account" when referring to the partner reader.
- **Tone**: Calm, clear, neutral. Flag marketing or promotional language.

**Prohibited terms to flag:**
powerful, robust, seamless, cutting-edge, best-in-class, revolutionary, game-changing, innovative, amazing, incredible, awesome, unlock, might, may be able to, could potentially, it is possible that

---

### 4. Grammar, spelling, and clarity

Read each sentence and flag:
- Spelling errors
- Grammatical errors
- Incomplete sentences
- Awkward or unclear phrasing that could confuse a partner
- Wall-of-text paragraphs (more than 5–6 lines without a break, list, or heading)
- Missing punctuation at the end of list items (apply consistent style — either all end with periods or none do)

---

### 5. Formatting and structure

**Headings:**
- Sentence case only — capitalize only the first word and proper nouns
- H1 should not appear in body content (only in frontmatter `title`)
- H2 for main sections, H3 for subsections — no skipping levels

**Lists:**
- Bullet points for non-sequential items
- Numbered lists for steps only

**UI elements:**
- Button names, tab names, field names, and menu paths must use inline code (backticks): `Save`, `Settings`, `Tools` > `Integrations`

**Blockquotes:**
- Never use `>` for callouts or notes — it creates unintended blockquotes. Replace with the appropriate Docusaurus callout: `:::tip`, `:::info`, `:::warning`, or `:::note`.
- UI navigation paths should use `→` (the arrow character), not `>`.

**Em dashes:**
- Never use `—`. Replace with a colon, comma, or period depending on context.

**Callout blocks:**
- `:::info`, `:::warning`, `:::note`, `:::tip` must be closed. Flag unclosed blocks.

---

### 6. Content accuracy and freshness

Read the article as a partner would and evaluate:

**UI and navigation references:**
- Do step-by-step instructions reference UI elements (buttons, menus, tabs, settings) that may have been renamed or moved?
- Do navigation paths match what you'd expect from other current articles in the repo?

**Product name references:**
- Are all product names consistent with how they appear in other current articles?
- Look for names that may have changed (e.g., a product rebranded or renamed)

**Deprecated workflows:**
- Do any steps describe a workflow that sounds outdated compared to how the product is described elsewhere in the docs?

**Screenshots and videos:**
- Do the described UI steps seem to match the screenshot shown?
- Note any screenshot that looks potentially outdated (e.g., old-style UI, references to renamed features)

**Completeness:**
- Does the article explain what the feature is and how to use it?
- Are there obvious gaps — steps that assume knowledge, missing prerequisites, or unexplained outcomes?

**When in doubt, flag for SME review** rather than guessing. Do not assert that something is outdated without a clear reason — use "may be outdated" or "verify with SME" in the report.

---

### 7. Frontmatter

Every article must have at minimum:

```yaml
---
title: Feature Name
description: Short description
---
```

Flag if:
- `title` is missing
- `description` is missing
- Values containing colons are not quoted
- YAML syntax is malformed

---

## Fix Authorization

### Auto-fix (apply immediately, no approval needed)

These are mechanical, rules-based changes with no risk of affecting product accuracy:

- **Sentence casing** — heading capitalization fixes (capitalize only the first word and proper nouns)
- **Audience language** — consumer/SMB framing rewritten for a partner audience (e.g., removing "your provider" framing, correcting third-person "users" → "you" when addressing the partner reader)
- **UI formatting** — bold UI elements and navigation paths converted to inline code (backticks)
- **Blockquote replacement** — `>` callouts replaced with the appropriate `:::info`, `:::tip`, `:::warning`, or `:::note` block
- **Duplicate H1 removal** — a top-level heading in the body that duplicates the frontmatter `title` is deleted outright; this is always mechanical since the title already lives in frontmatter
- **Em dash replacement** — every `—` replaced with a comma, colon, or period depending on context; purely mechanical punctuation, no risk to accuracy

### Approval required (flag and wait)

These require the user to confirm before making any edit:

- **Product/UI references** — button names, navigation paths, or feature names that need to be verified against the live product before changing
- **Content accuracy** — any step, claim, or description that may not match the current product
- **Structural rewrites** — articles that need a new angle, are missing sections, or require SME input on correctness
- **File renames** — any change to a filename (affects URLs and may break inbound links)

---

## Report Format

Produce one block per article. Use this exact structure:

```
---

### Article: [title from frontmatter or filename if title missing]
**Path:** `path/to/article.md`
**Status:** Pass | Needs Update | Needs SME Review

**Summary**
[1–3 sentences describing the overall state of the article. If passing, say so. If issues found, briefly describe the category of problems.]

**Applied fixes**
[Bullet list of auto-fixable changes that were applied directly (sentence casing, audience language, UI formatting). Use "None" if no auto-fixes were needed.]
- Line 55: "users can" → "you can" (audience language)
- Line 12: Heading "Key Performance Metrics" → "Key performance metrics" (sentence case)
- Line 34: `**Settings > Connections**` → `` `Settings` > `Connections` `` (UI formatting)

**Pending approval**
[Bullet list of issues that require user or SME confirmation before editing. Use "None" if all issues were auto-fixed or article passed.]
- Line 19: Blockquote used as a callout — verify intended type (info, tip, warning) before converting
- Line 44: Button labeled `Submit` — confirm this button still exists and has the same label in the live product

**Link check**
[Results of external and internal link checks, including anchor resolution (Step 4) and inbound links from elsewhere in the repo (Step 4b). Use "No links found" or "All links verified" if applicable.]
- https://example.com/guide — 404 Not Found (broken)
- ../accounts/connect-profile.md — file not found (broken internal link)
- ../accounts/connect-profile.md#old-heading — file exists but anchor not found (heading was likely renamed)
- Inbound: `other-article.mdx` links here with `#section-that-no-longer-exists` — broken by this verification's heading changes

**Needs verification**
[UI element names, navigation paths, product references, or content claims to spot-check against the live product. Use "None" if nothing stands out.]

---
```

---

## Status Definitions

| Status | Meaning |
|--------|---------|
| **Pass** | Article is current, accurate, and compliant. No action needed beyond routine re-verification scheduling. |
| **Needs Update** | Article has one or more issues that can be fixed without SME input. A writer can make the changes from the documentation alone. |
| **Needs SME Review** | Article contains claims about the product that cannot be verified from other documentation. A subject-matter expert must confirm before any edits are made. Do not guess — always flag these. |

---

## Example Output

```
---

### Article: Set up multi-location accounts
**Path:** `docusaurus/docs/accounts/multi-location/index.mdx`
**Status:** Needs Update

**Summary**
The article is mostly clear and well-structured. Two audience-language issues and one em dash were auto-fixed. One product/UI reference still needs confirmation before editing.

**Applied fixes**
- Line 8: "users can manage locations" → "you can manage locations" (audience language)
- Line 22: "business owners receive a confirmation email" → "your clients receive a confirmation email" (audience language)
- Line 45: "accounts are synced—automatically" → "accounts are synced automatically" (em dash removed)

**Pending approval**
- Line 3: Step 3 references a "Locations" tab under Account settings — confirm this tab name is current before updating the text.

**Link check**
- https://partners.vendasta.com/accounts — 301 Redirect to https://partners.vendasta.com/client-accounts (redirect acceptable, destination valid)

**Needs verification**
- Step 3: "Locations" tab under Account settings — verify this tab name is current in the live product.

---
```

---

## Guardrails

- **Never assert** that content is wrong — use "may be outdated" or "verify with SME" when uncertain.
- **Never infer functionality** from the article text. If a step or feature claim cannot be verified from other current documentation, flag it for SME review.
- **Apply auto-fixes immediately, flag the rest** — sentence casing, audience language, UI formatting, blockquote-to-callout fixes, duplicate H1 removal, and em dash replacement are applied directly without asking. All other changes require explicit approval before editing.
- **Check every link** — do not skip link checks even if the article looks clean. This includes anchor fragments (Step 4) and inbound links from other articles into the ones you're editing (Step 4b) — a heading rename that looks harmless in isolation can silently break a link on a page you never opened.
- **Report on every article** — even articles that pass should appear in the output with "Status: Pass" and a brief confirmation.
