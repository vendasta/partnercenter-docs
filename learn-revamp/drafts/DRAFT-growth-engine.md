> **Promoted to its own path (July 4, 2026):** Cal ruled the full loop is not a Getting started step — it is now the standalone **Your growth engine** learning path (`training/growth-engine/`, sidebar position 3, right after Hire your AI Workforce), broken into six steps: run-your-first-snapshot, read-the-snapshot, build-your-package, propose-and-close, deliver-in-business-app, prove-with-executive-report (all stubs pending review of the outline). The v2 single-lesson version was removed from getting-started (path back to 6 steps). This draft's content is the source material for the six sub-steps — the Northside Dental worked example threads through all of them.

# REVIEW COPY — growth-engine.mdx

Target: `docusaurus/training/getting-started/growth-engine.mdx` (fills existing stub, sidebar_position 8)
Source tags: [DOC] verified in repo docs (path noted) · [CALL] partner-call evidence · [SYN] synthesis · [INT] internal signal

## Reviewer notes and open flags

1. This is the closing step of the getting-started path, so its footer hands off out of the path (to the AI Employees path once confirmed), not to another getting-started step. Flagged: final link depends on flag 1 of the AI Employees draft.
2. Kept as one continuous worked example following a single prospect ("Northside Dental") through six moves, matching the stub's promise. No fear, no mistake beats; each move is a forward action. [SYN structure]
3. Snapshot "do not refresh after activation" tip from calls (transcript 8) is [CALL]; softened to an affirmative "the Executive Report takes over" rather than a warning. Confirm if you want the explicit guidance kept.

## Changelog

- **v2 (SHIPPED to repo)** — Written into `growth-engine.mdx` (step 7 of 7) with current standards: LessonHeader, You-are-here markers kept (this step genuinely spans workspaces), Snapshot/Executive Report as a before-and-after flip pair in Prove the result, KC answers spread, LessonFooter closes the path handing off to /learn/ai-workforce. Draft flag 1 resolved (AI Workforce path overview exists); flag 3 snapshot-refresh guidance stayed out.
- **v1** — First draft: single worked example, find → snapshot → propose → activate → deliver → prove, in step format and voice.

---

## FRONTMATTER

```yaml
---
title: "Your growth engine: find, prove, propose, deliver"
sidebar_position: 8
description: Run the full loop for one prospect, from finding the account through proof of performance in the Executive Report.
---
```

## [COMPONENT IMPORTS] — KnowledgeCheck, CourseProgressBar, SectionFeedback, InlineHighlighter, MarkComplete

## [COMPONENT: InlineHighlighter wraps the whole body — courseId="growth-engine" site="vendasta_learn"]

## [COMPONENT: CourseProgressBar — top of body]

---

Every step so far set up one piece. This one runs them as a single motion: find a business, show it where it stands, propose the fix, activate it, deliver it, and prove the result. We will follow one prospect, Northside Dental, through the whole loop. [SYN worked-example framing]

:::info Before you start
**Difficulty:** Beginner &nbsp;|&nbsp; **Time:** about 12 minutes
:::

:::tip What you will be able to do
- Find a business and create its account
- Run a Snapshot Report to show where the business stands today
- Turn the Snapshot into a proposal and activate the products
- Deliver the products in the client's Business App and prove results with the Executive Report
:::

## Find the business

*You are here: Partner Center.*

Start by finding the business and giving it a home in your workspace. Search for it, then create the account; creating an account also creates the linked CRM company, so your sales activity and the service record stay connected from the first touch. [DOC: accounts/directory/business-search.mdx; accounts/manage-accounts/create-accounts.mdx]

When you are ready to add your first business, [this guide covers creating accounts](/accounts/manage-accounts/create-accounts). [DOC: link target exists]

## Show them where they stand

*You are here: Partner Center.*

Run a **Snapshot Report** on the account. It grades the business across listings and reviews, website and SEO, social and advertising, and more, so the conversation starts from evidence rather than opinion. This is your first sales conversation in one page. [DOC: snapshot-report/index.mdx; snapshot-report/snapshot-report-listings-reviews.mdx]

:::tip Try it now
Open an account and run its Snapshot Report, then scroll to one grade that is low. That gap is the opening line of your proposal. [DOC: snapshot-report/index.mdx]
:::

## Propose the fix

*You are here: Partner Center.*

Match each gap in the Snapshot to a product, then build the order. Bundle the products into a package, set the retail prices, and send the order to the client for approval, with payment required so it activates as soon as they accept. [DOC: commerce/orders/creating-and-managing-orders.mdx; marketplace/packages/index.mdx]

When you are ready to build one, [this guide walks through creating and managing orders](/commerce/orders/creating-and-managing-orders). [DOC: link target exists]

A bundle also serves the client better than a single product: a low listings grade, weak reviews, and a quiet phone are one problem with three parts, and solving them together is what moves the business. [CALL — transcripts (7),(24) "the more you're selling, the stickier they are"; SYN reframed as client value]

## Activate and deliver

*This section spans both workspaces: you activate in Partner Center, and the client receives it in Business App.*

Once the client accepts and pays, the products activate, and each one appears as a dashboard in the client's **Business App** under your brand. Add the client as a user and send the welcome email so they can log in to their new tools. [DOC: commerce/orders/order-processing-and-activation.mdx; accounts/manage-users/ (users and welcome email)]

The client's own brand lives inside their Business App and flows into everything the products send on their behalf. Your brand is the workspace; their brand is the business inside it. [DOC: SYN consistent with ecosystem-map two-brand model]

## Prove the result

*You are here: the client's Business App.*

The **Executive Report** turns activity into proof: leads captured, reviews earned, and results across the products you activated, delivered to the client under your brand. It is how a client sees the value of what they bought, month after month. [DOC: business-app/executive-report/index.mdx; business-app/executive-report/leads.mdx]

Where the Snapshot showed the gap before the sale, the Executive Report shows the progress after it. That before-and-after is your renewal conversation. [DOC: snapshot-report/index.mdx; business-app/executive-report/index.mdx; SYN]

## [COMPONENT: SectionFeedback — section="content"]

## [KNOWLEDGE CHECK] — intro: "Three quick questions on the loop: which report proves results, what activation does, and where products land." sessionSize=3, pool=4

**Q1 (mcq).** You are opening a sales conversation with a business you just added. Which report shows where they stand today?
- The Snapshot Report ✅
- The Executive Report
- The payout report
- The Estimated Usage report

Explanation: The Snapshot grades the business as your first sales conversation. The Executive Report proves results after products are active. [DOC: snapshot-report/index.mdx; business-app/executive-report/index.mdx]

**Q2 (mcq).** A client accepts and pays for a package of products. What happens to those products?
- They activate and appear as dashboards in the client's Business App ✅
- They appear only in your Partner Center
- They stay pending until you run another Snapshot
- They are billed to you but not delivered to the client

Explanation: On acceptance and payment, products activate and appear in the client's Business App under your brand. [DOC: commerce/orders/order-processing-and-activation.mdx]

**Q3 (mcq).** Three months in, a client asks what they are getting for their money. Where do you point them?
- The Executive Report in their Business App ✅
- The Snapshot Report you ran before the sale
- The Marketplace product page
- Their Vendasta Payments receipt

Explanation: The Executive Report turns ongoing activity into proof of performance under your brand. [DOC: business-app/executive-report/index.mdx]

**Q4 (mcq, pool spare).** You create an account for a new prospect. What is created alongside it?
- A linked CRM company ✅
- A Business App user
- An Executive Report subscription
- A Marketplace store

Explanation: Creating an account also creates the linked CRM company, so sales activity and the service record stay connected. [DOC: accounts/manage-accounts/create-accounts.mdx; ecosystem-map step]

## [COMPONENT: MarkComplete — after closing wrapper]

---

## FOOTER HANDOFF

You have run the whole loop once. Next, put an AI Employee to work inside it: [Set up your first AI Employee](#) *(reviewer: link once the AI Employees path is confirmed)*.
