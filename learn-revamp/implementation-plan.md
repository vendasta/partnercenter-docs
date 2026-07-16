# Implementation plan: docs.vendasta.com Learn tab revamp, phase 1

**Repo:** `~/mydev/repos/partnercenter-docs` (deploys to docs.vendasta.com via Cloud Build → Cloud Run on merge to `master`)
**Author:** Claude, for Cal Cooper review
**Date:** July 3, 2026
**Status:** Draft for review. After approval, this is the file I execute from.
**Parents:** [learn-tab-ia-spec.md](./learn-tab-ia-spec.md) v2.2 (what and why), [phase1-lesson-outlines.md](./phase1-lesson-outlines.md) (lesson content), [partner-call-insights.md](./partner-call-insights.md) (evidence)

Everything below is grounded in repo recon (July 3): exact files, verified mechanics, no assumptions. Scope is phase 1 (Learn home, pill rename, Path 1, Path 3, library regroup, redirects) with the content-source map covering phases 2-3 so nothing is re-researched later.

---

## 0. Decisions needed from Cal before execution

> **Status July 3:** Cal green-lit execution; proceeding on all six recommendations (D1a, D2a, D3 yes, D4 yes, D5 confirmed, D6 new-content-only). Flag any reversal during PR review. Also adopted: the confidence-over-fear voice rule (spec section 7) — placeholder and lesson copy opens with payoff, never risk.

## Execution log (read this first in a new session)

**As of July 5, 2026:**

- **PATH 2 (AI FOUNDATIONS) IS BUILT** and moved to sidebar position 2 per the spec journey order (ai-workforce → 3, growth-engine → 4; Get started final footer now hands to /learn/ai-foundations). Six steps + three SVG diagrams, written from the approved outline (drafts/OUTLINE-ai-foundations.md), grounded in four repos (cit-dev ai-literacy, businessapp ai docs, partner docs, vendastaapis as backstop) plus a one-time internal platform-services-docs recon (intel note deleted July 5 after use, per Cal; never cited in lessons). Step 1 committed as f07c1f28 then reworked; **everything after f07c1f28 is uncommitted pending Cal's final pass.** Step 1 retitled and renamed to from-work-to-ai-workforce.mdx (no redirect needed; URL never shipped).
- **Six critique rounds on July 5 reshaped the editorial voice; all are now skill rules.** The story that landed: businesses always had automation, every workflow hit the judgment wall, generative AI is the worker on the other end, the merger is the platform. Then: "grounding" and AI jargon banned (phone-menu decision tree is the approved old-AI foil); coaching meta-commentary removed (new rule 17: teach the knowledge, never narrate it); path self-narration removed (rule 4 amended: no step announcements, tours, recaps, or step numbers in body copy); standalone openers eliminated (structure item 4: body starts at the first heading).
- **Verification pass done against docs.vendasta.com:** all Path 2 claims check out; two fixes applied (Reputation Specialist link → businessapp docs, since partner docs never mention that employee; Explanation-shows-tool-calls added to step 5). Found a partner-docs bug (KB page claims retrieval happens "every interaction"; workforce page and businessapp FAQ say only-when-relevant) — task chip spawned, Cal started it in a separate session. Tier-gate flag open: Reputation Specialist auto-response is Premium; step 6 uses it as a concept example, Cal to decide if it needs explicit scoping.
- **HANDOFF TO SHIVA prepared:** HANDOFF.md (this folder) carries the working loop, the editorial philosophy, per-path build-out ideas with sources, and the binding API accuracy rules. Her order: (1) growth engine, (2) Build with Vibe, (3) AI Workforce remainder. **Cal keeps the builder track** (citizen-dev insight). Product courses + Vendasta Services stay as-is until end of quarter. Her flow: one path at a time, self-critique at least six full rounds against the skill before sending anything to Cal, own outline/step approvals within a path, Cal gives per-path critique + PR approval. **Her first thinking assignment: define the lab pattern** (if the learner does something in the platform, it gets a screenshot, step-by-step, or lab callout like the citizen-dev docs; bias toward more labs than not) and propose which steps earn the tag. training/vibe/ (6 stubs) and training/builder/ (7 stubs) are scaffolded from the spec tables so the build-out plan is visible in the repo (uncommitted).
- **Coordination warning:** another Claude session is mid-restructure of training/ai-workforce/ (deletions plus hire-the-receptionist → put-a-receptionist-to-work rename, config edits); paused mid-day; its staged state got flattened to unstaged during a commit fix (content intact). Check git status before committing and commit only your own paths.
- New gotchas: `git commit -- <paths>` skips untracked files, and `--amend` swallows anything another session staged; SVGs can inline as base64 in built HTML, so content greps need decoding before declaring a diagram missing; the dev server dies when its owning session pauses (restart via the learn-docs-dev launch entry).

**As of July 4, 2026:**

- **WI-1 and WI-2 are DONE and in review:** [PR #685](https://github.com/vendasta/partnercenter-docs/pull/685), branch `learn-revamp-phase1`, reviewer Shivapriya92. Three commits: pill rename + search/cron config (`69d9a489`), full restructure with redirects (`8a07535d`), sidebar label fix (`24117bec`). Cal chose ONE combined PR instead of the plan's separate PR-1/PR-2.
- **Verified:** build green, redirects spot-checked (case-sensitive), LEARN pill active, sidebar order correct, placeholders render with prev/next sequencing.
- **1.2 ecosystem map is WRITTEN and pushed** (commit `4f42771b` on PR #685): full lesson + reusable SVG diagram (training/getting-started/img/ecosystem-map.svg) + 3-question KnowledgeCheck, verified rendering in preview. The SVG renders inline via svgr from a markdown image reference; wrap in a styled div for the border convention.
- **1.2 is APPROVED by Cal after a full critique cycle (v7.2)** and committed as `67fedeaf` on PR #685: rewritten opening, verified two-records section, You-are-here markers, arrowless two-box diagram, KnowledgeCheck `intro` prop added to the component (backwards-compatible), plus a learning-path vocabulary sweep across all placeholders. Review copy + changelog: `drafts/lesson-1-2-ecosystem-map.md`.
- **The lesson-writing skill EXISTS**: `.claude/skills/learning-path-writing/SKILL.md` in partnercenter-docs (commit `61fd5539`), 29 rules distilled from the critique. **All future lesson writing goes through that skill**, including the review loop: draft → review copy in `drafts/` → Cal approves → commit.
- **PATH 1 IS BUILT AND COMMITTED (July 4, commits 9258e7f0..d02705de on PR #685):** 6 steps, no stubs. Your growth engine was PROMOTED OUT of Get started into its own path (training/growth-engine/, position 3, six stub steps pending outline review with Cal). Get started renamed from "Getting started"; docs getting-started guides now cross-link the path. Steps 1+2 merged into "The Vendasta Platform" (the-vendasta-platform.mdx); the-vendasta-story deleted; get-set-up-to-get-paid and growth-engine written from the Cowork drafts. New component system: LessonHeader (difficulty/Video/Lab tags, Required line, outcomes, step position), LessonFooter ("Congratulations, you completed this step!" + faded position + Keep learning link), PathRoadmap (navy-ramp boxes on the path overview), FlipCard redesigned (Business App blue #e9f1fa fronts, flip badge, 3-card cap, inline concept sets only — all end-of-lesson "Key Resources" blocks deleted). Voice sweeps: you-voice (never "agencies/partners can"), no PIDs, no forum/community mentions (6 lessons cleaned repo-wide), no Read/Do/Verify markers (118 removed across 22 files), platform-scope rule (CRM is "inside Partner Center"). The skill file grew from 29 to ~38 rules — it is the single source of truth; reread it before writing any step.
- **NEXT UP:** (1) Cal reviews the growth-engine six-step outline (training/growth-engine/ stubs), then write those steps one at a time through the review loop, with the Northside Dental worked example threading through; source material is drafts/DRAFT-growth-engine.md. (2) Hire your AI Workforce path content: 3.4 teach-it-to-book, 3.5 train-your-employee (send CS review requests early), then 3.1-3.3, 3.6-3.10; the Cowork DRAFT-set-up-your-first-ai-employee.md gets carved into it (placement decision made: fold into existing path, not a new one). (3) Parked: the pay-down claim (verify with billing/CS; if real it goes in the WI-6 billing FAQ, never in path steps), WI-7 flags (message Haley re A2P duplicate; verify Vibe Code mode/GitHub sync; confirm A2P audit tool is partner-requestable), and the 40+ library pages still carrying end-of-lesson flip-card blocks (relocate-or-remove per the skill's flip-card rules during the library refresh).
- **Gotchas learned during execution:**
  - YAML frontmatter: titles/descriptions containing colons must be double-quoted (broke the first build).
  - Case-only file renames cannot have client-redirect entries — the redirect output collides with the real page on case-insensitive macOS (fine on Linux CI, but breaks the local gate). Solution in place: nginx.conf server-side redirects (2 entries, comment-fenced). Any future case-only rename goes to nginx.
  - A single-doc autogenerated category renders as the doc's `sidebar_label`, not the category label — placeholder path folders need matching sidebar_labels on their index docs.
  - Do NOT flip `onBrokenLinks` to 'throw' for the whole build: pre-existing main-docs debt fails it (broken link in docs/crm/index.mdx). Gate = build with 'warn' + grep output for learn/training mentions.
  - Pre-existing, out of scope, untouched: 2 typecheck errors (Root.tsx, TOC/PageActions) on master.
  - BSD sed has no `0,/pattern/` address form — use `1,10s/.../.../` for frontmatter edits.
  - Local preview: `npm start` from `docusaurus/` runs a hot-reload dev server on port 3000 — Cal reviews lessons live there, which replaced the drafts-folder review copies as the primary review surface (review copies still get changelog notes). Static check of a production build: `npm run serve` after `npm run build`.
  - Case-only renames can leave BOTH the TitleCase and kebab-case paths tracked in git (aliased on macOS, duplicate pages on a case-sensitive checkout). Fixed for vendasta-services in d02705de; after any case-only rename, check `git ls-files | sort -f | uniq -d -i`.
  - KnowledgeCheck shuffles the question pool but NOT mcq options — spread correctIndex positions by hand or every correct answer sits first.
  - The dev server hot-reloads edits but NOT file deletions — deleting a lesson file leaves the route registry pointing at a ghost module (webpack 'Cannot find module' + cascading React errors). Restart the dev server after any delete or rename.

| # | Decision | Options | My recommendation |
|---|---|---|---|
| D1 | Library regrouping mechanics | (a) Move product folders under new `attract/`, `convert/`, `engage/` parents — true visual grouping, deeper URLs, ~40 more redirects. (b) Keep flat product folders, reorder via `_category_` positions with lifecycle prefixes in labels ("Attract · Local SEO") — no URL churn, weaker grouping | **(a)** — we are already paying the redirect cost for kebab-case renames; do all URL churn once, get real grouping |
| D2 | Stub component policy for new lessons | (a) Keep invoking CourseProgressBar/MarkComplete/SectionFeedback/InlineHighlighter (inert, preserves future wiring). (b) Drop them from new lessons, KnowledgeCheck only | **(a)** — costless, consistent with 68 existing lessons, keeps the tracking option open |
| D3 | Search indexing of /learn | The local-search plugin currently sets `docsRouteBasePath: '/'` — /learn pages are likely not indexed. Add `'learn'` to the search config in phase 1? | **Yes** — findability is the point; one-line config change, test locally |
| D4 | Article-review cron | `.github/workflows/article-review.yml` flags stale articles from configured dirs. Include `training/` so lessons enter the freshness rotation? | **Yes, phase 1** — dated freshness is a stated trust feature |
| D5 | Retired-content holding | Move retired lessons to `docusaurus/training-retired/` (outside the plugin path — not built, stays in git for review) | Confirm — honors "nothing deleted without sign-off" |
| D6 | Em-dash policy | CONTRIBUTING.md bans em dashes; ported lessons violate it everywhere. Enforce in new content only, or also sweep ported content in the migration PRs? | New content complies; sweep ported lessons only when a lesson is touched anyway |

## 1. Mechanics reference (verified)

- **Plugin:** training instance in `docusaurus/docusaurus.config.ts` lines 76-84: `id: 'training'`, `path: 'training'`, `routeBasePath: 'learn'`, `sidebarPath: './sidebars-training.ts'`. No changes needed.
- **Sidebar:** `sidebars-training.ts` is `[{type: 'autogenerated', dirName: '.'}]`. **Keep autogenerated.** Sequence is enforced by folder structure + `_category_.json` position + per-file `sidebar_position`. No hand-built sidebar needed; this also keeps the repo's convention.
- **Pill rename:** `docusaurus/src/theme/DocSidebar/index.tsx` line 23 — change text node `TRAINING` → `LEARN`. Optionally rename the cosmetic `isTraining` variable. No CSS changes (uppercase comes from `.sidebar-pill` in `src/css/custom.css` lines 267-329). Note: the mobile sidebar swizzle renders no pills — mobile navigation to /learn is an existing gap, logged as a phase 2 item, not phase 1 scope.
- **Redirects:** single flat array in the `@docusaurus/plugin-client-redirects` block (`docusaurus.config.ts` lines 103-343). Add a commented `// --- Learn restructure (2026-07) ---` section. Gotcha (documented in-file at lines 130, 171): a `from` path that collides with a real build output directory fails the build with EEXIST — since every old training URL ceases to exist, no collisions are expected, but the build gate (section 8) catches any.
- **URLs are case-sensitive** and current lesson files are TitleCase — every rename/move needs a redirect.
- **Frontmatter contract per lesson:** `title` (sentence case), `sidebar_position`, `description`; `sidebar_label` where the title is long. New lessons add `tags` (path, difficulty) and a `last-reviewed` line in an HTML comment until a frontmatter field is agreed.
- **Authoring rules (repo CLAUDE.md/CONTRIBUTING.md):** never a literal `>` in markdown (use `→` or the `&gt;` entity as existing lessons do); callouts via `:::tip` / `:::info` / `:::warning`; sentence-case headings; bold for UI, code for commands; images in `img/` beside content with the standard border/radius/shadow style, explicit width, alt text, PII blurred; `<details>` on own lines (Root.tsx auto-generates FAQ JSON-LD from them — use deliberately in FAQ-ish lesson sections); no em dashes in new content (D6); kebab-case file and folder names.
- **Build gates:** none in CI beyond security scans. `onBrokenLinks: 'warn'` — see section 8 for the manual gate.

## 2. Target tree (phase 1 end state)

> **Superseded July 4** for getting-started: the path is now 6 steps (steps 1+2 merged into the-vendasta-platform.mdx, the-vendasta-story deleted, growth-engine promoted to its own `training/growth-engine/` path at position 3 with six stubs). Later path positions shifted +1. The tree below is the July 3 plan, kept for the parts still pending (Path 3 content, library details).

```
docusaurus/training/
├── index.mdx                                  ← REWRITE: Learn home (outlines §home)
├── getting-started/                           ← Path 1 (positions 1-8)
│   ├── _category_.json                        (label "Getting started", position 1, link→index)
│   ├── index.mdx                              ← REWRITE: path overview
│   ├── the-vendasta-story.mdx                 NEW (1.1)
│   ├── ecosystem-map.mdx                      NEW (1.2)
│   ├── partner-center-walkthrough.mdx         REVISE (1.3, from Partner-Center-Walkthrough-(An-Introduction).mdx)
│   ├── customize-and-brand.mdx                REVISE-LIGHT (1.4)
│   ├── accounts-and-users.mdx                 REVISE (1.5)
│   ├── organize-your-team.mdx                 REVISE-LIGHT (1.6)
│   ├── get-set-up-to-get-paid.mdx             NEW (1.7)
│   └── growth-engine.mdx                      NEW (1.8)
├── ai-workforce/                              ← Path 3 (position 2 in root; lessons 1-10)
│   ├── _category_.json                        (label "Hire your AI Workforce", position 2, link→index)
│   ├── index.mdx                              NEW: path overview
│   ├── meet-your-workforce.mdx                NEW (3.1)
│   ├── your-own-first-customer.mdx            NEW (3.2)
│   ├── hire-the-receptionist.mdx              NEW (3.3, consolidates 4 retired lessons)
│   ├── teach-it-to-book.mdx                   NEW (3.4)
│   ├── train-your-employee.mdx                NEW (3.5)
│   ├── grow-the-roster.mdx                    NEW (3.6)
│   ├── custom-employee-lab.mdx                NEW (3.7)
│   ├── autopilot.mdx                          NEW (3.8)
│   ├── keep-it-compliant.mdx                  NEW (3.9)
│   └── sell-and-manage.mdx                    NEW (3.10)
├── ai-foundations/                            ← Path 2 placeholder (position 3): _category_.json + index.mdx
│                                                "coming soon" overview only — ships real lessons in phase 2
├── vibe/                                      ← Path 4 placeholder (position 4): same pattern
├── builder/                                   ← Path 5 placeholder (position 5): same pattern
├── products/                                  ← Library (position 6), regrouped per D1(a)
│   ├── _category_.json                        (label "Product courses", position 6, link→index)
│   ├── index.mdx                              REWRITE: library overview, lifecycle framing
│   ├── attract/
│   │   ├── _category_.json                    (label "Attract", position 1)
│   │   ├── local-seo-listings/                (moved + files kebab-cased; dupes merged per §4)
│   │   ├── social-marketing/
│   │   └── advertising/
│   ├── convert/
│   │   ├── _category_.json                    (label "Convert", position 2)
│   │   ├── snapshot-executive-reports/        (collisions fixed per §4)
│   │   ├── crm/                               (moved from platform/crm)
│   │   ├── conversations-ai/                  (position-14 outlier fixed)
│   │   └── marketplace/                       (moved from platform/marketplace, minus lessons feeding 3.10)
│   └── engage/
│       ├── _category_.json                    (label "Engage", position 3)
│       ├── business-app/                      (moved from platform/business-app; near-dupe merged)
│       ├── reputation-management/             (near-dupe merged)
│       └── websites/
└── vendasta-services/                         ← Library (position 7), unchanged content
    └── (existing 3 lessons + index, files kebab-cased)

docusaurus/training-retired/                   ← NOT built (outside plugin path); per D5
```

Placeholders for paths 2/4/5 exist so the Learn home's five-path story is visible at launch and URLs are stable; each is one honest overview page ("in development — here's what it will cover and where to go today"), which also seeds the redirect-stable namespace for phases 2-3.

## 3. Work items

### WI-1 — Pill rename and chrome (tiny, its own PR)
1. `src/theme/DocSidebar/index.tsx` line 23: `TRAINING` → `LEARN`.
2. D3: add `'learn'` to the search plugin's route config and verify /learn pages index in a local build.
3. D4: add `training/` to `ARTICLE_DIRS` in `.github/workflows/article-review.yml`.

### WI-2 — Scaffold, moves, and redirects (the structural PR)
1. Create the target tree (folders, `_category_.json` files, path placeholders).
2. Execute the file-operations table (section 4): `git mv` for every keep/move, content merges for the dupe pairs, `git mv` to `training-retired/` for retired lessons.
3. Fix all `sidebar_position` collisions and gaps flagged in recon (local-seo-listings 1,1/2,2,2/3,3/4,4; snapshot-executive-reports 1,1/2,2/3,3; business-app gap; websites gap; conversations-ai outlier 14).
4. Write every redirect entry (section 5).
5. Fix in passing: the stray extensionless duplicate file `docusaurus/docs/ai/ai-workforce/ai-sales-assistant` (accidental commit — remove, it isn't built; flag in PR description).
6. Run the full build gate (section 8) before review.

### WI-3 — Learn home + path overviews (content PR 1)
`training/index.mdx` per outlines: two-sentence story, five path cards in journey order + two library cards (existing `.card-link` / `homepage-top-section` CSS), "most partners start here" strip, "recently updated" list (manual at first), "how these paths work" note. Path overview `index.mdx` for getting-started, ai-workforce, and the three placeholders.

### WI-4 — Path 1 content (content PR 2)
Author/revise the 8 lessons per outlines §1.1-1.8. Revision lessons keep their `courseId` values where content substantially survives; new lessons get kebab-case courseIds matching filenames. Every lesson: header block, KnowledgeCheck per outline, stub components per D2(a), docs handoffs from the source map (section 6), footer handoff.

### WI-5 — Path 3 content (content PR 3, can run parallel to WI-4)
Author the 10 lessons per outlines §3.1-3.10. Writing order within the PR: 3.4, 3.5 first (highest-demand, need CS review lead time), then 3.1-3.3, then 3.6-3.10.

### WI-6 — Docs-side dependency: billing FAQ page (small PR, main docs instance)
Per outlines production note 8: audit `docs/commerce/` and `docs/administration/` for existing coverage; create/extend a consolidated billing FAQ covering the six just-in-time items (price-change behavior, per-account overrides, auto-activation control, Snapshot-Reputation trial linkage, cancel timing, processing rates). Lesson 1.7 links to it. Use `<details>` blocks (free FAQ JSON-LD via Root.tsx).

### WI-7 — Cross-repo flags (not this repo; file tickets/messages, don't fix here)
1. businessapp-docs: A2P content duplicated (`business-app/administration/sms_configuration.md` vs `business-app/conversations/sms/us-businesses-sms-registration.mdx`) — flag to Haley; our lessons link the conversations version as canonical.
2. businessapp-docs gaps for phase 2 linking: Vibe Code mode, GitHub sync, dedicated publishing page (only custom-domain.mdx covers publish), standalone tools reference. Either commissioned there or gap-filled in Learn lessons — decide at phase 2 kickoff.
3. Verify with the Vibe team the current state of Code mode/GitHub sync before Path 4 writing (partner docs claim GitHub sync; Business App docs never mention it).
4. Confirm the A2P website-audit motion is officially partner-requestable before 3.9 documents it (offered freely on CS calls).

## 4. File operations table (all 68 lessons + indexes)

Legend: **K**=keep in place (kebab-case rename only), **M**=move+rename, **G**=merge into another file, **R**=retire to training-retired/, **F**=feeds a new lesson (content harvested, file retired).

### getting-started/ (5)
| Current file | Op | Target |
|---|---|---|
| A-Brief-Introduction-to-the-Vendasta-Platform.mdx | R | replaced by the-vendasta-story.mdx (1.1); harvest the environments/roles tables into 1.2 |
| Partner-Center-Walkthrough-(An-Introduction).mdx | M | getting-started/partner-center-walkthrough.mdx (1.3 revise; drop the explicit slug once the filename is clean) |
| Customize-and-Brand-Your-Platform.mdx | M | getting-started/customize-and-brand.mdx (1.4) |
| Add-Your-Customer-Accounts-and-Users.mdx | M | getting-started/accounts-and-users.mdx (1.5 revise + Find Accounts absorbed) |
| Organize-Teams-in-the-Platform.mdx | M | getting-started/organize-your-team.mdx (1.6 + sales-teams callout) |

### platform/business-app/ (6) → products/engage/business-app/
| Current file | Op | Target |
|---|---|---|
| Introducing-Business-App.mdx | G | merge into introduction-to-business-app.mdx (near-dupe pair) |
| Introduction-to-Business-App-Pro.mdx | M | products/engage/business-app/introduction-to-business-app.mdx (merge host) |
| Attract-Convert-and-Engage-Customers-with-Business-App-Pro.mdx | M | products/engage/business-app/attract-convert-engage-with-business-app.mdx |
| Customize-Business-App-in-Partner-Center.mdx | M | products/engage/business-app/customize-business-app.mdx |
| How-to-Sell-Business-App-Pro.mdx | M | products/engage/business-app/how-to-sell-business-app.mdx |
| Automation-Workflows-in-Business-App-Pro.mdx | M | products/engage/business-app/automation-workflows-in-business-app.mdx (cross-link from 3.8) |

### platform/marketplace/ (6) → products/convert/marketplace/ (4) + harvest (2)
| Current file | Op | Target |
|---|---|---|
| Package-Digital-Products-with-Vendasta.mdx | F | packaging content feeds 3.10; file retires |
| Billing-and-Payment-Basics.mdx | F | feeds 1.7 + WI-6 FAQ; file retires |
| Set-up-your-Store.mdx | M | products/convert/marketplace/set-up-your-store.mdx |
| Build-your-product-catalog-with-the-Vendasta-Marketplace.mdx | M | products/convert/marketplace/build-your-product-catalog.mdx |
| Set-up-Payments-and-Create-Invoices.mdx | M | products/convert/marketplace/payments-and-invoices.mdx (1.7 links here) |
| Digital-Ads-Advertising-Campaigns-in-the-Marketplace.mdx | M | products/convert/marketplace/digital-ads-campaigns-in-the-marketplace.mdx |

### platform/crm/ (7) → products/convert/crm/ (all M, kebab-case, positions 1-7 preserved; CRM-AI-era accuracy pass per spec)
All seven move as-is with kebab-case names (nurture-leads-with-the-crm.mdx, optimize-sales-team-performance.mdx, start-selling-in-the-crm.mdx, crm-2-identifying-your-customers.mdx, set-up-your-crm-to-scale.mdx, crm-2-connecting-with-your-customers.mdx, crm-2-closing-opportunities.mdx).

### platform/integrations/ (1)
| Current file | Op | Target |
|---|---|---|
| Integrations-101.mdx | F | feeds Builder lesson 5.1 (phase 3); retires now, redirect points at builder/ placeholder index |

### products/ai-receptionist/ (4) → all F into Path 3
| Current file | Feeds |
|---|---|
| Meet-Your-First-AI-Employee-The-AI-Receptionist.mdx | 3.1 + 3.3 |
| AI-Receptionist-Setup-and-Configuration.mdx | 3.3 |
| Vendasta-AI-Receptionist-Walkthrough.mdx | 3.3 |
| AI-Receptionist-Implementation-Essentials.mdx | 3.3 + 3.4 |
Redirects for all four point at /learn/ai-workforce/hire-the-receptionist.

### automations-ai/ (2) → F (split per spec: concept → Path 2 later; applied → 3.8; advanced → builder)
Both retire now; redirects point at /learn/ai-workforce/autopilot.

### products/conversations-ai/ (3) → products/convert/conversations-ai/
All three M with kebab-case names; fix position outlier (14→3); AI-Workforce-naming accuracy pass per spec.

### products/local-seo-listings/ (10) → products/attract/local-seo-listings/ (7 after merges)
| Current file | Op | Target/notes |
|---|---|---|
| Introduction-to-SEO.mdx | G | merge into introduction-to-seo.mdx (host: Introduction-to-Search-Engine-Optimization content, better of the pair kept — judged at merge time) |
| Introduction-to-Search-Engine-Optimization.mdx | M | products/attract/local-seo-listings/introduction-to-seo.mdx (merge host) |
| Why-Small-Medium-Businesses-SMBs-need-SEO.mdx | M | why-local-businesses-need-seo.mdx (title updated to brand vocabulary) |
| Listings-An-Introduction-to-What-an-Online-Listing-Is.mdx | M | what-is-an-online-listing.mdx |
| Manage-Listings-with-Local-SEO.mdx | M | manage-listings-with-local-seo.mdx (merge host) |
| Introduction-to-Listing-Management.mdx | G | merge into manage-listings-with-local-seo.mdx |
| SEO-Website-Analysis-with-Alpha-SEO.mdx | M | seo-website-analysis-with-alpha-seo.mdx |
| Search-Engine-Marketing.mdx | M | search-engine-marketing.mdx |
| Power-Your-Organic-Search-Visibility.mdx | M | power-your-organic-search-visibility.mdx |
| Product-Knowledge-SEO-Standard.mdx | M | product-knowledge-seo-standard.mdx |
Positions renumbered 1-7, no collisions. (Cal pre-approved SEO consolidation — spec open question 6 resolved as "consolidate.")

### products/reputation-management/ (3→2), advertising/ (2), social-marketing/ (1), snapshot-executive-reports/ (6), websites/ (3)
- Reputation: Reputation-An-Introduction.mdx **G**→ introduction-to-reputation-management.mdx; manage-online-reviews stays; both → products/engage/reputation-management/; 3.6 cross-links.
- Advertising (2) → products/attract/advertising/, kebab-case.
- Social-marketing (1) → products/attract/social-marketing/, kebab-case.
- Snapshot/exec reports (6) → products/convert/snapshot-executive-reports/, kebab-case, collisions renumbered 1-6 in a sensible order (snapshot pages then executive-report pages); 1.8 cross-links.
- Websites (3) → products/engage/websites/, kebab-case, positions 1-3.

### vendasta-services/ (3)
All three **K** within vendasta-services/, kebab-case renames only.

### Section indexes
- training/index.mdx **REWRITE** (WI-3). getting-started/index.mdx **REWRITE**. platform/index.mdx **R** (folder dissolves; redirect → /learn/products). products/index.mdx **REWRITE**. automations-ai/index.mdx **R** (redirect → /learn/ai-workforce). vendasta-services/index.mdx **K** (kebab pass only).

Net counts: 68 lessons → 42 library lessons (after 5 merges) + 18 path lessons (5 revised + 13 net-new authored) + 3 placeholder overviews; 12 files retired to training-retired/ (harvested or superseded).

## 5. Redirects

One entry per moved/renamed/retired URL, ~75 total, in a dedicated commented block. Patterns:

```ts
// --- Learn restructure (2026-07) ---
// getting-started renames
{ from: '/learn/getting-started/Organize-Teams-in-the-Platform', to: '/learn/getting-started/organize-your-team' },
{ from: '/learn/getting-started/A-Brief-Introduction-to-the-Vendasta-Platform', to: '/learn/getting-started/the-vendasta-story' },
// consolidations
{ from: '/learn/products/ai-receptionist/AI-Receptionist-Setup-and-Configuration', to: '/learn/ai-workforce/hire-the-receptionist' },
// library regroup
{ from: '/learn/platform/crm/Nurture-leads-with-the-CRM', to: '/learn/products/convert/crm/nurture-leads-with-the-crm' },
// dissolved sections
{ from: '/learn/platform', to: '/learn/products' },
{ from: '/learn/automations-ai', to: '/learn/ai-workforce' },
```

Full enumeration is generated mechanically from the section 4 table at execution time (one `from` per old URL including the four ai-receptionist files, both automations-ai lessons, and each merged dupe). Category index URLs (`/learn/platform`, `/learn/products/ai-receptionist`, etc.) each get an entry too.

## 6. Content-source map (what each lesson links to or draws from)

Canonical-link policy: **partner-side how-tos** → docs.vendasta.com `/...` (main instance). **Business App-side how-tos (client-facing product, AI Employee config UI, Vibe)** → docs.businessapp.io. **API reference** → developers.vendasta.com. Lessons never restate steps that live at any of the three.

### Path 1
| Lesson | Primary link targets |
|---|---|
| 1.1 | /getting-started |
| 1.2 | /getting-started, /accounts, /crm, /business-app; diagram is net-new |
| 1.3 | /partner-center |
| 1.4 | /administration (partner branding, Business App customization) |
| 1.5 | /accounts (Find Accounts, users) |
| 1.6 | /administration (team), /crm (Sales Teams) |
| 1.7 | /administration (Vendasta Payments), /commerce, /marketplace pricing; WI-6 billing FAQ |
| 1.8 | /snapshot-report, /marketplace, /business-app, /reports (Executive Report) |

### Path 3
| Lesson | Primary link targets |
|---|---|
| 3.1 | /ai (overview), /ai/ai-workforce; businessapp: business-app/ai/index.md, ai_workforce_overview.md |
| 3.2 | businessapp: ai-chat-receptionist/index.mdx (setup); /ai/ai-workforce/ai-chat-receptionist |
| 3.3 | businessapp: ai-chat-receptionist/index.mdx (incl. its prompt templates), ai-voice-receptionist.md; /ai/ai-workforce pages; features-by-plan for tier gates |
| 3.4 | businessapp: crm "My meetings" set (index, team-booking-links, groups-and-service-menus, integrating-google-meet), ai-voice-receptionist.md booking-capability section; /crm. Gap noted: no single end-to-end AI-booking doc anywhere — this lesson IS the canonical sequence, linking pieces |
| 3.5 | businessapp: knowledge-base.md (incl. KB-vs-capability decision rule and the Explanation audit feature), configuring-capabilities.md, ai-models-and-privacy.md (no-open-web, no-learning-from-chats facts); /ai/knowledge-base |
| 3.6 | businessapp: ai-reputation-specialist.md (trigger settings), automations/review-requests.mdx, ai-sales-assistant.mdx (+ its CRM AI editions section), custom-ai-employees recipes (inside-sales-representative, ai-support-employee, ai-data-analyst); /automations |
| 3.7 | businessapp: custom-ai-employees/index.md + one recipe as the lab's model (inside-sales-representative.mdx), creating-custom-capabilities.md §prompt-writing; /ai/ai-workforce/custom-ai-employees |
| 3.8 | /automations (creating-and-configuring, templates-overview, steps/triggers references); businessapp: automations/index.mdx, review-requests.mdx, zapier trio |
| 3.9 | businessapp: conversations/sms/us-businesses-sms-registration.mdx (CANONICAL — not the administration duplicate), ai-models-and-privacy.md (privacy/awareness facts); /marketing/forms (opt-in) |
| 3.10 | /marketplace (packages), /reports; businessapp: executivereport/ |

### Phases 2-3 (mapped now so nothing is re-researched)
| Lesson | Primary sources |
|---|---|
| 2.1-2.6 (AI foundations) | Concept-level; grounding facts from businessapp ai-models-and-privacy.md (2.2), knowledge-base.md retrieval model (2.3), creating-custom-capabilities.md tool anatomy (2.5), automations concepts (2.6) |
| 4.1 (Meet Vibe) | businessapp vibe/index.md (canonical); /ai/vibe |
| 4.2 (First build) | vibe/getting-started.md + use-cases/landing-page.mdx (the lab) |
| 4.3 (Prompt like a builder) | vibe/guides/prompting.md + prompting-library.md; credits.md (canonical tier/credit table — correct the earlier wholesale guesses against it: Free 250/day-1 project, Standard 10k/mo, Pro 25k/mo + Supabase + zip download) |
| 4.4 (Connect everything) | vibe/connectors/index.md, forms.mdx, analytics.md, single-sign-on.md (QUOTE the members-not-customers caveat), supabase.md (Pro-only), guides/business-knowledge.md |
| 4.5 (Prototype to production) | guides/custom-domain.mdx, troubleshooting.md (checkpoints/self-correction), getting-started.md (zip download w/ git history). GAPS: Code mode + GitHub sync undocumented — verify with Vibe team (WI-7.3); publishing has no dedicated page — this lesson gap-fills |
| 4.6 (Vibe as a service) | use-cases/* (all six as labs), ideas.md, credits.md plan table for pricing conversations |
| 5.1 (Integration landscape) | developers.vendasta.com; API brief facts; businessapp automations/zapier trio; ServiceTitan/Shopify connect guides as native-integration examples |
| 5.2 (Capabilities in depth) | businessapp creating-custom-capabilities.md (canonical) |
| 5.3 (Custom tools) | creating-custom-capabilities.md tool-configuration reference (cURL import, methods/URL/params/headers/auth, MCP connection) + connect-the-ai-receptionist-with-servicetitan.md as the advanced worked example. API facts: tool = URL/method/params/headers with four auth strategies (unauthed/API key, platform-managed, OAuth-connected integration, impersonation) |
| 5.4 (Webhooks) | Automation outbound-webhook step with test-fire + verifier token; inbound webhook triggers; Zapier docs; vendor webhooks (purchase/add-on/account/user/customer events) for the marketplace-vendor angle. Terminology: "platform events," never internal system names |
| 5.5 (Advanced automations) | /automations/data-expressions, /crm/custom-objects; businessapp automation-steps/triggers/conditions |
| 5.6 (Lab) | Meeting-booking public API (availability-slots → book), CRM API (contact create/list) as the two real endpoints the lab touches via a custom tool |
| 5.7 (Beyond the platform) | developers.vendasta.com (incl. its browsable event catalog), /vendor-center technical requirements, account templates docs. Teach: OAuth2 scopes with :read variants, narrowest-scope discipline; CRM API as flagship |

### API accuracy rules for all technical lessons (from vendastaapis recon)
- Partners consume REST via developers.vendasta.com — never mention gRPC/protos.
- Public today: CRM (flagship, ~54 endpoints), meetings (book/reschedule/cancel/availability), forms (create/list/embed-code — submissions are NOT a public write endpoint; they arrive via the widget), reputation (reviews/listings/NPS, mixed), conversation (2 endpoints only — don't promise a messaging API).
- NOT public: automations authoring, AI assistants, Vibe, Event Broker. Automations are UI-built.
- Forward-looking, verify before teaching: platform RPCs are being MCP-annotated (forms, CRM, meetings, reputation) — the MCP-as-tool-interface direction is real but teach only what's shipped in-product.

## 7. PR sequencing

| PR | Contents | Depends on | Review |
|---|---|---|---|
| PR-1 | WI-1 (pill rename + search config + cron config) | — | Cal; visual check on preview |
| PR-2 | WI-2 (scaffold, moves, merges, position fixes, all redirects, stray-file fix) | PR-1 merged (not strictly, but keeps diffs clean) | Cal + Haley (docs ecosystem); full build gate |
| PR-3 | WI-3 (Learn home + overviews) | PR-2 | Cal |
| PR-4 | WI-4 (Path 1 content) | PR-2 | Cal; billing lesson → billing-accuracy reviewer |
| PR-5 | WI-5 (Path 3 content) | PR-2 | Cal; 3.4/3.9 → CS review (Nathan Yaworski's team); 3.9 audit-tool motion confirmed first (WI-7.4) |
| PR-6 | WI-6 (billing FAQ, main docs instance) | — (parallel anytime) | Haley |

PR-2 is the risky one (URL churn) — it merges only after the build gate passes clean and redirects spot-check on the preview build. Content PRs 3-5 are additive and low-risk.

## 8. Build gate (run locally before every PR; CI will not catch these)

```bash
cd ~/mydev/repos/partnercenter-docs/docusaurus
npm ci
npm run typecheck
# temporarily flip onBrokenLinks + onBrokenMarkdownLinks to 'throw' in docusaurus.config.ts (do not commit)
npm run build          # must pass with zero broken-link errors
git checkout docusaurus.config.ts  # if the flip was uncommitted-only
npm run serve          # manual spot checks:
#  - /learn renders with LEARN pill active
#  - 10-15 sampled old URLs redirect correctly (case-sensitive!)
#  - search returns /learn pages (D3)
#  - no EEXIST during build (redirect collision gotcha)
```

Also per PR: grep the build output for `broken` warnings even when green, and verify no literal `>` blockquotes slipped into new MDX (`grep -rn '^>' training/ --include='*.mdx'`).

## 9. Execution checklist (what I do after Cal approves this file)

1. Confirm D1-D6 answers.
2. Branch `learn-revamp-phase1` off `master` in partnercenter-docs.
3. PR-1 → review → merge.
4. PR-2: scaffold + moves + merges + redirects; build gate; review → merge.
5. PR-3/4/5 content authoring per outlines, in the stated writing order (1.2's diagram first — commission/spec the canonical diagram asset before lesson text).
6. PR-6 billing FAQ in parallel.
7. WI-7 flags: messages to Haley (A2P dup, businessapp gaps), Vibe team verification, audit-tool confirmation — sent when PR-2 opens so answers arrive before the dependent lessons are written.
8. Post-launch: add the "recently updated" maintenance note to the team's BAU checklist; log phase 2 items (mobile pill gap, progress-tracking decision, Path 2/4/5 authoring, library content refresh).
