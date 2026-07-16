# Outline spec: Your growth engine path, six steps

**Status:** Draft for Cal review. Step 1 is drafted in full alongside this outline as the lab-pattern worked sample Cal asked for on the proposal PR; steps 2 through 6 get no lesson copy until this outline is approved.
**Date:** July 8, 2026
**Author:** Shiva + Claude
**Parents:** drafts/DRAFT-growth-engine.md (v2 worked-example source), learn-tab-ia-spec.md, partner-call-insights.md sections 4.4, 4.5, 4.7, drafts/PROPOSAL-lab-pattern.md (the treatment)

## The angle

The learner does not read about the loop; they run it. By the end of the path a real prospect of their own choosing has been graded, packaged, proposed, delivered, and proven, alongside the worked example (Northside Dental, fictional composite) that threads through every step. This is the proving ground for the lab pattern: five of six steps carry the `lab` tag under the state-change test, every hands-on block is a go-do-return Lab callout, and every lab closes on "What you now have."

## Source map

| Source | Role | Constraint |
|---|---|---|
| drafts/DRAFT-growth-engine.md | The narrative spine and verified beat list from the shipped v2 single-lesson version | Re-verify every [DOC] tag against current docs; the v2 copy predates the lab pattern |
| partner-call-insights.md 4.7 | The field prospecting motion: Find Accounts (industry + city, Google-sourced, 20 per search), narrow geography, salesperson assignment, account → CRM company is one-way | [CALL] tags; UI paths verified against docs before use |
| partner-call-insights.md 4.4, 4.5 | Post-activation behaviors: proof moves to the Executive Report, notification configuration, collection models | Affirmative framing only; no billing fear in path steps |
| docs/snapshot-report/ | Canonical for step 1 and 2 claims: creation paths, eight sections, grades and Digital Score, category drives benchmarks, 24-hour/7-day timing, salesperson required to send | Tier gate: report creates and refreshes are metered on some plans; see open question 2 |
| docs/commerce/orders/, docs/marketplace/packages/ | Canonical for steps 3 and 4 | |
| docs/accounts/ | Canonical for account creation, users, welcome email (steps 1 and 5) | |
| docs/business-app/executive-report/ | Canonical for step 6 | |

## Structural decisions needing Cal sign-off

1. **Lab designations.** Steps 1, 3, 4, 5, 6 are labs (state-change test); step 2 is the interpretive step and stays untagged, carrying Try-it-now micro-actions against the learner's own live report. This is the retag table from the lab-pattern proposal applied.
2. **The practice cost line.** The path has the learner actually run a Snapshot Report, and creates are metered on some plans. Proposed handling: Required in step 1 reads "Partner Center admin access" plus "A Snapshot Report create available on your plan", stated flat, no warning framing. Confirm the wording.
3. **Difficulty and time.** All six Beginner. Estimates: 10/7/10/8/10/8 minutes. Lab steps estimated on the platform actions, not the reading.
4. **Footer chain.** Step 6 is the path's final step; per journey order its footer should hand to the next path overview with `nextPathName`. Growth engine sits at sidebar position 4 with the builder track at 5; proposal: hand to /learn/builder ("The builder track"). Confirm, since the builder audience is narrower than the paths before it.
5. **Diagrams.** None new. Step 6 reuses the Snapshot/Executive Report before-and-after flip pair from the v2 draft. Step 2 uses prose plus the learner's own report; the eight sections are a list, not a diagram.
6. **Writing order.** 1 (done, in review), 2, 3, 4, 5, 6. Each later lab assumes the account and report from step 1 exist.

## Path overview (index.mdx)

Already live with PathRoadmap and the one-line promise. One edit on approval: the overview gains a sentence naming the practice model (you work a real prospect of your own through the whole path) so the lab expectations are set before step 1. No other changes.

---

## Step 1: Run your first Snapshot Report (10 min) — LAB (drafted, see step file + review record)

**Outcomes:** Choose a real prospect and create its account, with the linked CRM company created for you. Run a Snapshot Report and know when it is ready to present. Explain what the eight grades measure and what drives their accuracy. Set yourself up to hear the moment the report is ready.

**Beats:**
1. Opening descriptor: one report starts the sale; grades a business's online presence into a one-page conversation. Snapshot is the before-relationship report; the Executive Report is its after-relationship sibling (placement, one breath). [DOC snapshot-report/index.mdx]
2. Northside Dental introduced; the learner picks their own equivalent and runs every move in parallel. [SYN worked-example framing, carried from v2 draft]
3. Lab: create the account (Create Account with business search auto-fill, or manual entry; accurate primary category because benchmarks hang off it; then assign yourself as salesperson via Business Details → Edit → Administration → Sales). Confirm: account in Manage Accounts with linked CRM company. Find Leads (renamed from Find Accounts, now in CRM → Companies) linked as the bulk-prospecting doorway, one sentence. [DOC accounts/manage-accounts/create-accounts.mdx; DOC accounts/manage-accounts/index.mdx salesperson path; DOC crm/companies/index.mdx Find Leads; DOC snapshot-report/index.mdx category section; CALL 4.7 corrected against docs]
4. Lab: run the report from the account (Snapshot create icon). Confirm: generation underway. Timing stated affirmatively: gathers for 24 hours, enriches to day 7, fullest picture at the 7-day mark, which sets the presentation rhythm. [DOC snapshot-report/index.mdx]
5. Lab (small): Snapshot Ready client notification so the learner hears the moment it lands. [DOC snapshot-report/index.mdx FAQ]
6. What the grades measure: eight sections (listings, reviews, social, website, SEO, advertising, ecommerce, AI optimization), letter grades A to F, overall Digital Score, benchmarks against the business's industry. Depth deferred to the learner's own report next step (unnarrated). [DOC snapshot-report/index.mdx]
7. Try it now (micro-action): skim the sample report in the Snapshot guide as a business owner would; notice which grades you would feel first.

**Components:** LessonHeader (lab, Beginner, 10 min, Required per decision 2), three Lab callouts, one Try it now, What you now have, KnowledgeCheck (3 of 4 pool), LessonFooter → read-the-snapshot.
**Knowledge check:** placement and decisions: which report before the relationship; what a wrong primary category does to grades; when the report is at its fullest; what account creation brings with it. correctIndex spread by hand.

## Step 2: Turn grades into a conversation (7 min) — no tag

**Outcomes:** Read each section of a live Snapshot Report the way its owner would. Pick the one gap that opens the sale. Say what a grade means without jargon.

**Beats:**
1. Opening descriptor: a graded report is only a conversation when someone chooses where it starts.
2. Section-by-section read of the learner's own report (from step 1), Northside Dental as the parallel: what each grade measures, what a C feels like to an owner, benchmarks are industry comparisons over a 6-month lookback. [DOC snapshot-report section pages]
3. The gap-picking discipline: one low grade with a business consequence beats five grades recited. The chosen gap becomes the opening line of the proposal. [CALL, carried from v2 draft; SYN owned]
4. Try it now: on your own report, write the one sentence you would open with, naming the gap and its consequence.
5. Presentation timing callback by concept (the 7-day mark), no step references. [DOC]

**Components:** LessonHeader (no tag), one tier-2 Lab callout with LabChecklist (the prep ritual: fix details, add competitors, rearrange sections — state-changing, surfaced by the transcript analysis), Try-it-now micro-action, KnowledgeCheck, LessonFooter → build-your-package.
**Method note (July 8):** Cal's transcript-mining loop was run for this step: 19 Snapshot sales/training call transcripts analyzed in two parallel passes. DRAFTED — see `training/growth-engine/read-the-snapshot.mdx` and `drafts/step-growth-engine-2-read-the-snapshot.md` (claim register, excluded claims, and a docs gap flagged: per-report section hiding is field practice but undocumented).

## Step 3: Package and price the fix (10 min) — LAB

**Outcomes:** Match each chosen gap to a product. Bundle products into a package. Set retail prices deliberately.

**Beats:**
1. Opening descriptor: the fix is a package, not a product; a low listings grade, weak reviews, and a quiet phone are one problem with three parts. [CALL, carried from v2 draft, reframed as client value]
2. Marketplace orientation: Start Selling adds to your product shortlist, not your store. [CALL 281; verify against marketplace docs]
3. Lab: build the package around the gaps (products in, package assembled). Confirm: package exists. [DOC marketplace/packages]
4. Pricing: wholesale-retail recap by concept (links back to Get started get-set-up-to-get-paid territory without naming steps); suggested retail prices run conservative, set yours deliberately. [CALL 281; DOC]
5. Lab: set the retail prices on the package. Confirm: package priced.

**Components:** LessonHeader (lab), two Lab callouts, Try it now, What you now have, KnowledgeCheck, LessonFooter → propose-and-close.

## Step 4: Send the order and close (8 min) — LAB

**Outcomes:** Build the order from the package. Require payment on approval so acceptance activates everything. Send it and know what the client sees.

**Beats:**
1. Opening descriptor: the close is one send; acceptance does the activating.
2. Lab: build the order for the account, package in, payment required on approval, send. Confirm: order sent, visible in its pending state. [DOC commerce/orders/creating-and-managing-orders]
3. What the client receives and what acceptance triggers: pay, activate, deliver, one motion. [DOC commerce/orders/order-processing-and-activation]
4. Salesperson profile powers the client-facing contact card; set once, used everywhere. [CALL 281; verify path]

**Components:** LessonHeader (lab), one or two Lab callouts, What you now have, KnowledgeCheck, LessonFooter → deliver-in-business-app.
**Open question:** the worked example needs an honest way to handle "your real prospect has not accepted yet" between steps 4 and 5. Proposal: step 5 opens on the activation moment whenever it comes, and the learner can self-activate a trial-tier product on a test account to see delivery immediately. Needs a verified mechanism (see step 5).

## Step 5: Deliver in the client's Business App (10 min) — LAB

**Outcomes:** See products land as dashboards under your brand. Add the client as a user and send the welcome email. Say where your brand ends and theirs begins.

**Beats:**
1. Opening descriptor: delivery is a login, not a handoff document.
2. Activation lands each product as a dashboard in the client's Business App under your brand. [DOC commerce/orders/order-processing-and-activation; business-app docs]
3. Lab: add the client as a user and send the welcome email. Confirm: user invited, welcome email sent. [DOC accounts/manage-users]
4. Two-brand clarity, one breath: the workspace wears your brand; the client's brand is the business inside it. [carried from v2 draft]

**Components:** LessonHeader (lab), one Lab callout plus the activation walkthrough, What you now have, KnowledgeCheck, LessonFooter → prove-with-executive-report.
**Open question:** the delivery walkthrough needs an activated product to show. Confirm the recommended practice route (trial activation on the learner's own test account, or proceeding with the real prospect's timeline).

## Step 6: Prove it with the Executive Report (8 min) — LAB (tentative, confirm)

**Outcomes:** Turn activity into proof of performance. Configure who receives it and when. Set up the renewal conversation with a before-and-after.

**Beats:**
1. Opening descriptor: proof is a report the client receives without asking for it.
2. The Executive Report: leads captured, reviews earned, results across the activated products, under your brand, month after month. [DOC business-app/executive-report]
3. Lab: configure the report's client notifications deliberately (who receives it, cadence). Confirm: notifications set. [CALL 4.4; verify exact settings path]
4. The before-and-after: Snapshot showed the gap before the sale, the Executive Report shows progress after it; proof moves here once products are active. Flip pair (2 cards): Snapshot Report / Executive Report. [DOC both; CALL 4.4 affirmative framing]
5. The renewal conversation as the loop closing back to a new Snapshot for the next prospect.

**Components:** LessonHeader (lab pending confirmation), one Lab callout, FlipCardGrid (2 cards), What you now have, KnowledgeCheck, LessonFooter → next path overview with `nextPathName` (decision 4).
**Confirm:** the lab tag holds only if the notification/configuration motion survives outline review as the step's core; if the step ends up read-and-interpret, it drops to no tag with the configuration as a Lab block.

---

## Open questions for Cal (gathered)

1. Required-line wording for the metered Snapshot create (decision 2).
2. Footer destination for step 6 (decision 4).
3. The practice route for steps 5 and 6 when the real prospect has not yet accepted (trial/test-account mechanism, needs verification).
4. Whether step 2 waits for a transcript-mining enrichment pass or ships from existing evidence (recommendation: ship, enrich later).

## Changelog

1. v1 (July 8, 2026): initial outline. Step 1 drafted in full alongside as the lab-pattern worked sample (see `training/growth-engine/run-your-first-snapshot.mdx` on the branch and `drafts/step-growth-engine-1-run-your-first-snapshot.md` for the review record).
