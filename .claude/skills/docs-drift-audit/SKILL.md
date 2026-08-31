---
name: docs-drift-audit
description: Audit published documentation against the live product and fix what has drifted. Use on a recurring cadence (every two weeks) or whenever the platform UI has changed and the docs may not have followed. Drives a real browser through Partner Center and Business App, captures screenshots as evidence, builds a register of verified ground truth, hunts every stale instance across the corpus, then fixes in two separate passes and verifies against a pre-established baseline. Encodes the method established with Cal Cooper on 2026-08-29, which found ~120 factual errors and ~370 convention violations across 582 files. Never guess: anything unverified goes on a list, not into a doc.
---

# Auditing docs against the live product

Documentation does not rot evenly. Concepts age well; **front doors do not**. Nearly every error this method finds is a navigation label or route the platform renamed and the docs did not follow. The guide explains the product correctly and then sends the reader to a door that no longer exists.

That is the thing to hunt. Weight navigation lines far above prose.

---

## The one principle that makes this manageable

**There are two piles, and they must never be merged.**

| | Factual errors | Convention violations |
|---|---|---|
| What it is | The doc is wrong. Reader follows it and gets stuck. | The doc is right, it just looks different from the page beside it. |
| Example | Page says set `Collection method`. No such field exists. | Nav written `**A** > **B**` instead of `` `A` → `B` ``. |
| Typical volume | ~25% | ~75% |
| Typical harm | All of it | None of it |
| How to fix | Screenshots, judgment, agents | One script, minutes |

Reporting "500 problems in the docs" is how an audit gets ignored. Someone opens it, sees a mountain, closes it. **Report two numbers, fix them two different ways.**

A corollary: never spend a human's attention on the convention pile. Fix it once with a script and enforce it in review, so the next audit does not rediscover the same 370 lines.

---

## Phase 1 — Baseline before you touch anything

You cannot prove you broke nothing without knowing what was already broken.

```bash
cd docusaurus && npm run build 2>&1 | grep -c 'Broken link on source page path'
```

Record the number **and the full list**. Both matter: a run that fixes one broken link and introduces another still reports the same count.

```bash
npm run build 2>&1 | grep 'Broken link on source page path' | sed 's/.*path = //' | sort > /tmp/baseline_links.txt
```

Many baseline "broken links" point at files that do not exist in the repo at all. Those are pre-existing and not yours to fix in this pass. Say so in the report rather than silently absorbing them.

---

## Phase 2 — Live validation, with evidence

Drive a real browser through the product. Screenshot as you go: the screenshots are the audit's evidence base and they outlive the session.

Use the in-app Browser pane tools (`mcp__Claude_Browser__*`) for anything that does not need a logged-in session, and Claude in Chrome (`mcp__claude-in-chrome__*`) when you need the user's existing SSO session to Partner Center or Business App.

**Walk the routes the docs actually claim.** Do not explore freely and then compare impressions. Take the navigation lines out of the docs, follow each one literally, and record what you find. That is what turns "the AI section feels stale" into "24 lines say `AI` → `AI Workforce` and the item is called `Workforce`".

### Safety rules in live accounts — these are not optional

This runs against **real partner and client data**. A previous run of this audit accidentally persisted a draft automation into a live workspace by clicking `Create automation` → `Blank`, expecting an unsaved canvas.

- **Read-only by default.** Navigate, expand, open menus, screenshot. Do not save, create, delete, send, or activate.
- **A creation flow may persist on the first click.** If you must see a creation screen, expect the record to exist afterwards, and report it immediately so a human can clean it up. Do not delete it yourself.
- **Never open a live client's conversations, invoices, or contact records** to verify a label. Find the label somewhere that is not someone's private data, or leave it unverified.
- **Redact before any screenshot leaves the session**: client domains and DNS values, phone numbers, widget IDs, staff names, wholesale cost columns, webhook URLs, and anything else in the frame you did not intend to capture.

---

## Phase 3 — Build the register

The register is the list of verified stale→correct pairs. Everything downstream keys off it.

If a learning-path or docs correction pass already happened, the git diff **is** the register:

```bash
git diff -U0 -- <corrected-path>/ | grep -E '^[-+]' | grep -v '^\(---\|+++\)' \
  | grep -E 'Go to |→|Navigate' | sed 's/^\(.\)\s*/\1 /'
```

Otherwise build it from the Phase 2 walk. Each entry needs the stale string, the correct string, and a confidence label:

- **Validated** — seen on a live screen this session, screenshot exists.
- **Contradiction** — the docs disagree with themselves. One side is wrong; you have not established which.
- **Convention** — violates the repo's own `CLAUDE.md`. No platform check needed.
- **Unverified** — looks stale, not confirmed.

**Only `validated` and `convention` entries are safe to fix.** The other two go on the report.

---

## Phase 4 — Hunt every instance

For each register entry, find every occurrence in the corpus. Two detectors earn their keep beyond simple grep:

**The contradiction detector** — the same destination reached different ways. Extract every `X → Y` nav pair, group by destination, and flag any destination with more than one parent or more than one spelling. This finds errors no screenshot can, because the docs are already disagreeing with themselves.

**The case-drift detector** — the same UI label written two ways. Mostly noise (`Save`/`SAVE`), but the signal inside it is real nav labels drifting between title and sentence case.

Both are implemented in `scripts/detect.py`.

**Check before you flag.** A previous run nearly reported `Commerce` → `Payouts` as a stale rename. It is a real section with its own folder. Confirm the thing you are about to "fix" is actually wrong.

---

## Phase 5 — Fix, in two separate passes

### Pass A: the convention pile, by script

Deterministic work should be deterministic. `scripts/sweep.py` converts bold-and-`>` navigation into backticks-and-`→`, skipping fenced code blocks, blockquote lines, and anything containing a markdown link target.

Always dry-run first, inspect the samples, then apply:

```bash
python3 .claude/skills/docs-drift-audit/scripts/sweep.py docs/          # dry run
python3 .claude/skills/docs-drift-audit/scripts/sweep.py docs/ --apply
```

Then **prove the script did not mangle any links** by comparing the link-target sets in the diff:

```bash
git diff -U0 -- docs/ | grep '^-' | grep -v '^---' | grep -oE '\]\([^)]*\)' | sort > /tmp/before.txt
git diff -U0 -- docs/ | grep '^+' | grep -v '^+++' | grep -oE '\]\([^)]*\)' | sort > /tmp/after.txt
diff /tmp/before.txt /tmp/after.txt && echo "IDENTICAL - no links altered"
```

### Pass B: the factual pile, by agents split on folders

**Split agents by folder, never by finding type.** Two agents fixing "all the nav labels" and "all the field names" will collide on the same files. Three agents owning `docs/ai/`, `docs/marketing/`, and the rest will not.

Roughly three agents suits a 500-file corpus. Each agent's brief must contain:

- **Its folder list, and an explicit statement that other agents own the rest.**
- **The register entries relevant to its folders**, written as ground truth with the verified correct value spelled out. Do not make an agent infer the right answer.
- **The traps.** Name the things that look wrong but are right (`Payouts` is real; "AI Workforce" as a *concept* in prose is correct even though the *nav item* is `Workforce`; a page that is accurate except for its opening route must not be rewritten wholesale).
- **The house rules** from the repo's `CLAUDE.md`: no `>` character, backticks for UI elements and bold for emphasis only, sentence-case headings, no em dashes.
- **`Do NOT run npm run build`** — concurrent Docusaurus builds clash. Build centrally after all agents finish.
- **`Do NOT commit.`**
- **"If a fix requires inventing a fact you cannot verify from this brief, DO NOT GUESS. Leave it and report it."** This single line is what keeps the output trustworthy.
- A required report path, including a **"Needs verification"** section.

Tell agents to make surgical edits and not to improve prose they were not asked to touch. Left unconstrained, an agent will rewrite a correct page.

---

## Phase 6 — Verify

```bash
cd docusaurus && npm run build 2>&1 | grep 'Broken link on source page path' | sed 's/.*path = //' | sort > /tmp/after_links.txt
diff /tmp/baseline_links.txt /tmp/after_links.txt && echo "NO REGRESSIONS"
```

Compare the **set**, not the count.

Then re-run the Phase 4 hunt and confirm each register entry is at zero. Anything non-zero is either a miss or a deliberate exception — and every deliberate exception must appear in the report with its reason. Real examples worth expecting:

- Instances that are a *different real feature* sharing a name (Task Manager has its own `Email Settings` screen; do not sentence-case it alongside Marketing's).
- Instances an agent was explicitly told to leave.

---

## Phase 7 — Report

Two artifacts.

**The fix record** — what changed, by category, with counts and the verification evidence (baseline versus after).

**The needs-verification list** — everything left alone, *ranked by how many doc lines each item unblocks*. This is the more valuable of the two, because it is the input to the next run. One screenshot that settles ten instances belongs at the top, above a subtle single-line question.

---

## Traps this method has already hit

**A rename may not be a rename.** `Try it` looked like the old name for the `Chat` button. Mid-audit it turned out "My Listing" is a real Local SEO page, documented independently in two other files, making the old docs internally coherent: a `Try it` preview, opening a My Listing page, gated on Local SEO. It may be a *separate feature that still exists*. When three files agree on something that looks stale, that is evidence, not coincidence. Slow down.

**Fixing words does not fix pictures.** Corrected text sitting above a screenshot of the old UI is a new contradiction you just created. Grep the touched files for image references and list them.

**Agents may report your own edits as foreign.** If you ran a scripted sweep before launching agents, they will see uncommitted changes they did not make and flag them. Verify rather than dismiss, then move on.

**An agent deleting content deserves review.** One correctly deleted a testing subsection premised on a page that does not exist, but the incognito advice inside it was still good and lived elsewhere in the corpus. Review deletions specifically; they are the edits most likely to overshoot.

**Do not flatten a contradiction just to close it.** Where two routes are documented and you cannot tell which is right, both stay and the question goes on the list. A confident wrong answer is worse than an open question.

---

## Repo specifics

Run this against **both** documentation repos; the platform serves both audiences and drifts for both.

| | Partner Center docs | Business App docs |
|---|---|---|
| Content root | `docusaurus/docs/` | see that repo's `CLAUDE.md` |
| Learning content | `docusaurus/training/` | n/a |
| Build | `cd docusaurus && npm run build` | per repo |
| Audience | partner | SMB client |

House rules live in the repo's own `CLAUDE.md` and win any conflict with this file. The ones that matter most here: **never use `>` in markdown**, UI elements in backticks rather than bold, sentence-case headings, images in an `img/` folder beside the page.

Do not commit or open a PR without a human review pass.
