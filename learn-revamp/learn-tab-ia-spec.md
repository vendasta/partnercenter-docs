# Information architecture spec: the new Learn tab on docs.vendasta.com

**Project:** docs.vendasta.com Learn tab revamp
**Repo:** partnercenter-docs (`docusaurus/training/` at routeBasePath `/learn`)
**Author:** Claude, for Cal Cooper review
**Date:** July 3, 2026
**Version:** 2.2 — v2.1 revised against three-repo recon (partnercenter-docs implementation detail, businessapp-docs content library, vendastaapis API surface); execution detail lives in [implementation-plan.md](./implementation-plan.md)
**Status:** Draft for review. Nothing gets built until this is approved.
**Companion docs:** [intel-brief.md](./intel-brief.md) — brand story, product taxonomy, gap analysis. [partner-call-insights.md](./partner-call-insights.md) — 14-call analysis: sentiment, pain points, and the exact workflows partners ask for.

---

## 1. The design thesis

The website's story is "Meet the AI Workforce for local businesses." The strategic principle behind it is "AI does the work, humans orchestrate." So the Learn tab has one job:

**Turn a partner into an AI workforce manager.**

Every path, course, and lesson serves that arc. The learner journey is not "learn our features" — it is a progression of identity: set up your business on the platform, understand how AI Employees work, hire and train your workforce, build what does not exist yet (Vibe), and go deeper with APIs and webhooks when the business demands it.

Three structural principles, taken from what demonstrably works (Cursor Learn, the citizen developers site, and the existing docs architecture):

1. **Split by question, not by topic.** Documentation answers "how do I do X" and is organized by product surface. Learn answers "why does this work and what do I do next" and is organized by learner progression. The same subject appears in both, written in a different register. Learn never duplicates how-to steps — it links to the canonical doc at the moment of need.
2. **Finishable paths, not a content pile.** Every path has a fixed sequence, a visible end, and a narrative handoff between lessons. A learner always knows where they are and what is next.
3. **Concepts before workflows.** An AI Foundations track builds mental models with zero setup required (near vendor-neutral, evergreen, trust-building for pre-customers). Applied tracks then map those models onto the product.

## 2. What the partner calls changed in this spec

Nine call transcripts (onboarding, Fast Track intake, success calls) were analyzed after v1 — full detail in [partner-call-insights.md](./partner-call-insights.md). The architecture held; the lesson inventory changed materially:

- Partners' loudest problem is not any feature — it is the missing **mental model** ("I would love a visual of the workflow of how it all connects") and not knowing **where to start**. A canonical ecosystem-map lesson now opens the journey.
- The most-repeated how-do-I (five of nine calls) is **letting an AI Receptionist book real appointments**. It is now a flagship lesson.
- The defining skill gap is **training the AI Employee** — price hallucination in front of live prospects, over-prompting, missing guardrails. Now its own lesson.
- **Automations have near-zero adoption** ("zero automations set up for any of our clients... because it's so complicated") — a gentle on-ramp lesson (smart lists + three recipes) now sits in the workforce path, separate from advanced builder material.
- **Compliance (A2P/SMS, sensitive-vertical data)** and **billing surprises** (auto-activations, wholesale/retail, subscriptions) blindside everyone. Compliance is a full lesson; billing splits into a lean sale-readiness lesson plus just-in-time documentation FAQs — partners must be ready to sell in week one, but nobody needs renewal-timing rules until they're standing in front of a bill.
- Partners sell best after **becoming their own first customer** — formalized as the workforce path's on-ramp.
- **Certification demand is explicit** and a catch-22 exists (need training to earn activations, need activations to access training). Certification moves from open question to design goal.
- Every applied lesson gains a **"do it, delegate it, or buy it"** block (DIY vs $199 setup vs $29/month managed service) because "is this DIY or white-glove?" came up on nearly every call.

Batch 2 (five more calls: a CS office-hours build, a certified-partner roundtable, two CS expansion/check-in calls, and a multi-location SMB session) confirmed the architecture and sharpened four things:

- **Learners come in tiers and the advanced partners say so explicitly** ("us, versus Fast Track partners, versus my customers, versus average customers — four different tiers"). The path structure already matches this; the selling lessons now also teach partners to segment their own clients the same way.
- **Vibe has an undocumented prerequisite (Supabase) that stalled real client work for a month** — the Vibe path gains explicit infrastructure content (Supabase, domains/DNS, credits economy, export boundaries).
- **The booking lesson levels up to call orchestration** — business-hours routing via a custom capability was built live on a call and is now part of the flagship lesson.
- **Partners run client masterminds** and want material to power them — lessons should be reusable as partner-to-client teaching assets, and an internal prototype of a partner showcase app (insights section 7) makes community a coordination point, not just content.

## 3. Audiences

docs.vendasta.com is the partner-facing property. SMB end users belong to docs.businessapp.io and are out of scope (flagged as a fast-follow in section 10).

| Persona | Who | Primary paths |
|---|---|---|
| The operator | Partner admin or agency owner setting up and running the platform | Getting started, AI Workforce |
| The seller | Partner sales and fulfillment teams who pitch and deliver | Product library, selling lessons in the AI Workforce path |
| The builder | The technical person (or citizen developer) wiring AI Employees to real systems | AI Foundations, Builder track, Vibe |

One learner can be all three — the paths are entry points, not walls. The calls confirmed a fourth internal audience worth acknowledging: the partner's own team. Partners run internal enablement to win buy-in from their own salespeople ("we struggle with internal buy-in as much as customer engagement") — lessons should be shareable as-is for that purpose.

Within every audience, assume a maturity spread. The advanced partners name it themselves: "us, versus the Fast Track partners, versus my customers, versus our average customers — four different tiers," and the coaching principle that follows is "segmenting and challenging them where they are." The path structure serves this (foundations for the surface-scratcher, builder track for the power user), lesson difficulty badges make it navigable, and the selling lessons teach partners to apply the same segmentation to their own clients.

## 4. Site architecture

### 4.1 Top level

Keep the two-pill mechanism in the sidebar. Rename the pill from TRAINING to **LEARN** to match the `/learn` URL, the website's language, and the industry pattern. All existing URLs are preserved; renames get client-redirects.

```
docs.vendasta.com
├── DOCUMENTATION  (/)          reference, autogenerated sidebar, 389 docs
└── LEARN          (/learn)     curated, sequenced, hand-built sidebar
```

### 4.2 The Learn sitemap

```
/learn                                  Home: story + path picker by persona and goal
│
├── /learn/getting-started              PATH 1 · Platform foundations        8 lessons
├── /learn/ai-foundations               PATH 2 · AI foundations              6 lessons
├── /learn/ai-workforce                 PATH 3 · Hire your AI Workforce     10 lessons
├── /learn/vibe                         PATH 4 · Build with Vibe             6 lessons
├── /learn/builder                      PATH 5 · The builder track           7 lessons
│
├── /learn/products                     LIBRARY · Product courses (existing, regrouped)
└── /learn/services                     LIBRARY · Vendasta Services (existing 3 courses)
```

Two content types, two mechanisms:

- **Paths (1-5)** are sequenced curricula. Hand-curated in `sidebars-training.ts`, numbered lessons, narrative handoffs, progress bar, completion. The core learner journey.
- **Libraries** are course collections without enforced sequence — the existing product and services courses, regrouped. Learners drop in by product.

### 4.3 The learner journey across paths

```
Getting started ──► AI foundations ──► AI Workforce ──► Vibe
   (operate)           (understand)       (orchestrate)    (create)
                                              │
                                              └──────────► Builder track
                                                            (integrate)
Product library and Services support all stages as drop-in references.
```

The recommended spine for a new partner is paths 1 → 2 → 3. Vibe and Builder are branches from path 3: required core, then choose your own adventure.

## 5. Path-by-path design

Evidence tags reference [partner-call-insights.md](./partner-call-insights.md) sections.

### Path 1 · Getting started: run your business on Vendasta

Mostly a revamp of existing lessons, reframed around the story, plus two new evidence-driven lessons. The single biggest v2 change: partners at every level lack the ecosystem mental model, so it is now taught in lesson 2 — before any walkthrough.

| # | Lesson | Source | Maps to docs |
|---|---|---|---|
| 1 | The Vendasta story: AI does the work, you orchestrate | NEW — replaces "A Brief Introduction to the Vendasta Platform" | /getting-started |
| 2 | The ecosystem map: how it all connects | NEW — Partner Center vs Business App (your command center vs your client's), where each AI Employee lives, accounts vs CRM companies (the one-way street), products vs employees vs automations. One canonical diagram, reused everywhere. Evidence: insights 3.1 | /getting-started, /accounts, /crm |
| 3 | Partner Center walkthrough | REVISE existing | /partner-center |
| 4 | Customize and brand your platform | KEEP existing | /administration |
| 5 | Add your customer accounts and users | KEEP existing — absorb the Find Accounts prospecting workflow (insights 4.7) | /accounts |
| 6 | Organize your team in the platform | KEEP existing | /administration |
| 7 | Get set up to get paid | NEW — sale-readiness only: the wholesale-retail model in one diagram, connect a payment method (or consciously choose manual invoicing), set retail prices, and the monthly self-check (Billing → estimated usage). Everything else — price-change behavior, per-account overrides, auto-activation control, trial linkages, cancel timing, processing rates — is just-in-time knowledge deferred to documentation FAQs and linked from a closing "when you need it" box. Docs dependency: consolidated billing FAQ page (outlines, production note 8). Evidence: insights 3.6, 4.4, 4.5 | /administration, /commerce, /marketplace |
| 8 | Your growth engine: Snapshot, Marketplace, Business App | NEW capstone — the Attract, Convert, Engage loop end to end | /snapshot-report, /marketplace, /business-app |

Outcome: the learner can operate the platform, picture the whole system, and price with confidence — before meeting a single AI Employee.

### Path 2 · AI foundations: how AI Employees work

All new. Concept-level, near vendor-neutral, no setup required — readable by a skeptical agency owner who has not bought anything yet. Written in the Learn register: analogies, second person, honest about failure modes. v2 change: the failure examples are now real ones from the field (a chatbot quoting $800-2,000 for a $499 package; over-prompted employees getting "wires crossed"), which makes the trust-building concrete.

| # | Lesson | Core concept | Maps to docs |
|---|---|---|---|
| 1 | From software to workforce | Why the unit of value shifted from tools to outcomes; humans orchestrate | /ai |
| 2 | How AI Employees think | Models, context windows, strengths, limitations, hallucination — why an untrained employee invents prices, and why grounding fixes it | /ai |
| 3 | Context is everything | An AI Employee is only as good as the context it is given; business data as the differentiator; garbage sources produce confident garbage | /ai/knowledge-base |
| 4 | Instructions that scale | Capabilities: proactive behavior vs reactive facts; why over-prompting backfires | /ai/ai-capabilities |
| 5 | Taking action | Tools: how AI safely calls APIs and acts in external systems | /ai/ai-capabilities/tools-overview |
| 6 | Agents and automations, together | Deterministic workflows for the repeatable, agentic AI for the open-ended; "if your automation requires manual input, it's not an automation" | /automations |

Outcome: the learner can explain Knowledge Base vs Capabilities vs Tools — the three components every AI Employee is built from — before touching configuration.

### Path 3 · Hire your AI Workforce

The flagship path, rebuilt in v2 around what the calls proved partners actually do and ask. The arc is the employee lifecycle a manager experiences — meet, deploy on yourself, hire, train, expand, automate, protect, sell, manage — with the four new lessons carrying the highest-frequency real-world questions.

| # | Lesson | Covers | Maps to docs |
|---|---|---|---|
| 1 | Meet your AI Workforce | The roster mapped to Attract, Convert, Engage; where each employee lives (Partner Center vs Business App); the tier decoder: standard = manual, pro = you + AI, premium = AI-led. Evidence: insights 3.1, 3.7 | /ai/ai-workforce |
| 2 | Become your own first customer | Deploy the workforce on your own agency first — the proven adoption pattern ("Hey, we use the same thing. Let me show you how it's doing for us."). Sets up the guinea-pig account used in every later lab. Evidence: insights 3.9 | /ai |
| 3 | Hire your first AI Employee: the AI Receptionist | Chat and voice receptionist end to end — consolidates the 4 existing AI Receptionist lessons | /ai/ai-workforce/ai-chat-receptionist, /ai/ai-workforce/ai-voice-receptionist |
| 4 | Teach it to book: calendars, appointments, and call routing | The most-requested workflow in the field: per-user calendar connection, My Meetings, booking links, team events and round robin (and the sales-team gotcha), enabling the book-appointments capability, testing end to end. Then the orchestration layer built live on a CS call: business-hours routing via a custom capability — transfer during hours, capture leads after hours — with hours pulled from website knowledge (holiday-proof) and capabilities referenced by name. Evidence: insights 3.2, 4.1 | /crm, /ai/ai-capabilities |
| 5 | Train your AI Employee | Knowledge sourcing and cleanup, price lists, guardrail instructions ("quote only published prices"), prompt-length discipline, sensitive-data rules for regulated verticals, the test-iterate loop. The operating mindset from the field: it's a new employee, not a setting — coach continuously, "go break it" in the sandbox, reset-to-default as the safety net; knowledge is the degree, capabilities are the skill. Evidence: insights 3.3, 4.2 | /ai/knowledge-base, /ai/ai-capabilities |
| 6 | Grow the roster: the specialists | AI Reputation Specialist (paired with automated review requests — two systems, one outcome; star-rating thresholds for auto-response, human routing below 4), AI Sales Assistant and Inside Salesperson, AI Data Analyst and Support Agent — each anchored to its lifecycle stage. Matching the employee to the business model (chat for online-only, voice for the trades). Evidence: insights 3.8, 4.10 | /ai/ai-workforce, /crm, /automations |
| 7 | Build a Custom AI Employee | Knowledge Base + Capabilities + Tools applied — the foundations path made real. Hands-on lab | /ai/ai-workforce/custom-ai-employees |
| 8 | Put your workforce on autopilot | Smart lists and the three starter recipes (form → nurture campaign; lead → task + SMS acknowledgment; job complete → review request); automation templates; reading the activity log; when a human should stay in the loop. Advanced example: the multi-location review-request pattern (zip-code branching, webhooks between locations, safety-net fallbacks). Evidence: insights 3.4, 4.3, 4.10 | /automations, /crm |
| 9 | Keep it compliant | Payoff-first framing: registration switches on the highest-converting channel. Audit-first A2P: check the client site (SMS terms, ToS, opt-in/opt-out) before submitting — Vendasta's compliance audit via CS claims ~95% first-pass approval after fixes; if a submission comes back, the CS path gets the exact reason and one fix-everything pass resolves it; legal identifiers; sensitive-vertical data handling framed as regulated-industry professionalism ("customer not patient", graceful redirects); regional notes linked to documentation. Warnings and troubleshooting live in docs, not the lesson. Evidence: insights 3.5, 4.6 | /marketing/forms, /ai |
| 10 | Sell and manage your AI Workforce | Outcome-first positioning ("never miss another lead", not "AI"), the junior-receptionist framing, after-hours economics, demystifying the knowledge base; the champion wedge (prove it with one believer inside a big prospect, then go to decision-makers with receipts); segmenting your own clients into adoption tiers and coaching each where they are; packaging, wholesale pricing and recurring revenue; do-it / delegate-it / buy-it and the fulfillment-form workflow; feedback loops and adjusting autonomy as trust grows. Evidence: insights 3.7, 3.8, 3.11 | /marketplace, /reports, /ai |

Outcome: the learner has deployed the workforce on their own business and at least one client, trained it to answer accurately, automated the follow-through, stayed compliant, and can package and pitch it with field-tested scripts.

### Path 4 · Build with Vibe

All new. The forward-looking story, told the way the launch told it: liquid software, the app builder that already knows your business, no blank page. v2 adds the prompting lesson partners asked for verbatim ("How do I learn the prompts, though?").

| # | Lesson | Covers | Maps to docs |
|---|---|---|---|
| 1 | Meet Vibe | What vibe coding is, why pre-loaded business context is the differentiator, what partners are building (landing pages, dashboards, the business-card-scanner story) | /ai/vibe (+ docs.businessapp.io Vibe section) |
| 2 | Your first build | Hands-on lab: prompt to working landing page — the highest-frequency first use case | docs.businessapp.io/business-app/ai/vibe |
| 3 | Prompt like a builder | Context-rich prompting, iteration and follow-ups, plan mode for big changes, clarifying questions; the field-standard credit-saving workflow (draft and perfect the prompt in Claude, then paste into Vibe); the credits economy (what a style edit vs a multi-page site costs, monthly allowances by tier); realistic expectations ("trial and error is the process, not a failure"). Evidence: insights 4.9 | /ai/vibe |
| 4 | Connect everything — and the infrastructure underneath | Connectors: CRM, forms, analytics, auth, AI Employees embedded in one line; form fills flowing into the platform. The prerequisite nobody documents: Supabase as Vibe's storage and backend — free account, Administration → Integrations → connect, one per client account, and the failure symptoms when it's missing (file uploads silently fail — this stalled a real client project for a month). Evidence: insights 4.9 | /ai/vibe |
| 5 | From prototype to production | Code mode, checkpoints, hosting; custom domains (pro tier + DNS records) vs the default published domain; current export boundaries (zip download with git history on Pro; no WordPress export) — set client expectations honestly. Caution from recon: Code mode and GitHub sync are effectively undocumented on the Business App side — verify current feature state with the Vibe team before writing, and treat this lesson as partly gap-filling (implementation plan, content-source map) | /ai/vibe |
| 6 | Vibe as a service | The agency motion: landing pages replacing designer spend, client portals (the realtor-signs ordering portal case), white-label builds, multi-client management; pricing patterns from the field (resell pro at ~2x wholesale, upsell tiers on credit burn; or setup fee plus retainer) and answering the client's "how many credits will my project use?" | /marketplace |

Outcome: the learner has shipped one working app and can articulate the Vibe revenue story to a client.

### Path 5 · The builder track: APIs, webhooks, and deeper connections

All new, and the most technical content on the site. The audience is the partner-side builder and citizen developer — the calls prove this person exists today (custom quote-and-proposal employees chained through Make.com and DocuSign; multi-location voice programs with custom roster APIs) and is currently stuck in support loops. v2 grounds every lesson in those real cases and adds an explicit escalation map.

API recon (v2.2) grounds the track in the real public surface: the CRM REST API is the flagship (full CRUD for contacts, companies, opportunities, pipelines, custom objects), meeting booking and forms are genuinely public APIs, vendors receive platform webhooks for purchase/account/user/customer events, and everything is OAuth2 scope-gated with read-only variants — teach narrowest-scope discipline. The don't-overpromise list is equally binding: no public API exists for creating automations, AI assistants, Vibe projects, or conversations; automations are built in the UI (with an outbound webhook step and test-fire flow); say "platform events," never internal system names. Full terminology and source map in the implementation plan.

| # | Lesson | Covers | Maps to docs |
|---|---|---|---|
| 1 | The integration landscape | The map: native integrations (ServiceTitan, Shopify, Jobber, QuickBooks) → automations → webhooks/Zapier/Make → custom tools → platform APIs. The community's webhook-first rule ("all of Vendasta's automations will take a webhook"), the middleware cost curve (Zapier balloons at scale), and API access tier-gating. Choosing the lightest tier that works; the escalation map (community vs support vs services) with realistic expectations — confirm a ticket number exists, CC your CS contact, don't spend a month in a loop. Evidence: insights 3.10 | /automations, /ai/ai-capabilities, /vendor-center |
| 2 | Custom capabilities in depth | Outcome-first design ("what is the result?"), instruction drafting with AI assistance, trimming for reliability | /ai/ai-capabilities/creating-custom-capabilities |
| 3 | Custom tools: connect any API | Methods, URLs, headers, parameters, auth, nested objects — the full tools reference applied to a real case (the always-accurate quote calculator) | /ai/ai-capabilities/tools-overview/building-custom-tools |
| 4 | Webhooks and event-driven workflows | Inbound and outbound events, Zapier and Make.com chains (capability → webhook → proposal → DocuSign), form handoffs | /automations/trigger-automation-using-zapier, /marketing/forms |
| 5 | Advanced automations | Data expressions, custom objects, cross-system orchestration | /automations/data-expressions, /crm/custom-objects |
| 6 | Lab: an AI Employee that acts in your systems | Capstone build: custom employee + custom tool booking real appointments in an external calendar or CRM; multi-location knowledge structuring and the data-contract conversation (API roster vs manual maintenance) | /ai (all) |
| 7 | Beyond the platform | When you need the raw APIs: developers.vendasta.com orientation, Vendor Center technical requirements for productizing what you built; account templates for vertical-scale rollouts. Evidence: insights 4.10 | developers.vendasta.com, /vendor-center, /administration |

Outcome: the learner can wire an AI Employee into any system with an API, knows the escalation path when stuck, and knows where the platform hands off to the developer portal.

### Libraries · Products and Services

The existing product courses stay, regrouped under the website's lifecycle framing so even the library tells the story:

- **Attract** — Local SEO and Listings (10 lessons), Social Marketing, Advertising and Advertising Intelligence
- **Convert** — Snapshot and Executive Reports, CRM (7 lessons), Conversations AI
- **Engage** — Reputation Management, Business App and Business App Pro, Websites
- **Vendasta Services** — the existing 3 fulfillment courses, unchanged

Course content is untouched in phase 1 except: retitle where needed for sentence case, add the standard lesson header (outcomes, time, difficulty), and update any copy that contradicts current AI-first messaging.

## 6. Lesson anatomy (the contract every lesson signs)

Adopted from the citizen developer lab pattern plus the existing course components. Every lesson has:

1. **Frontmatter:** title (sentence case), description, sidebar position, tags (path, persona, difficulty), owner, last-reviewed date. Dated lessons are a trust signal for partners burned by change velocity — findability and freshness are features (insights 2, 3.12)
2. **Header block:** difficulty badge, estimated time, prerequisites (linked), outcomes as a checkable list
3. **Body:** the Learn register — second person, analogies, honest about failure modes. Screenshots follow the repo image standard. UI paths use the docs convention
4. **Docs handoffs:** every how-to moment links to the canonical documentation page instead of restating steps
5. **Do it, delegate it, or buy it:** applied lessons close with a consistent block naming the DIY path, the Vendasta services option (one-time setup vs monthly managed, with commitment terms stated plainly), and when each makes sense. Evidence: insights 3.7
6. **Interaction:** KnowledgeCheck at concept boundaries (fully functional, client-side, six question types). Repo recon correction: CourseProgressBar, MarkComplete, SectionFeedback, and InlineHighlighter are inert stubs in this repo — ported with APIs intact but bodies returning null, no backend anywhere. New lessons keep invoking them (cheap, preserves the option to wire real tracking later), but actual progress persistence is a phase 2+ product decision, not an inherited feature
7. **Handoff footer:** two sentences that create the motivation for the next lesson, plus the next-lesson link. Final lessons close the arc and route to the next path

Video: every path 2-4 lesson is designed video-optional — a video slot at the top with a full-text equivalent below. Video production is a parallel workstream, never a blocker for shipping text.

## 7. Voice: the Learn register

Documentation is terse and declarative. Learn is the same brand voice — bold, clever, helpful — at a warmer temperature:

- Second person, present tense. The learner is "you," their client is "your client"
- Analogies for every abstract concept; real field examples for every failure mode (the $800 hallucinated quote teaches more than a paragraph of theory)
- AI Employees are always staff: hire, train, manage, orchestrate — never configure bots
- "Local businesses," not SMBs. Sentence-case headings, no end punctuation, no emojis
- Honest about limitations — partners trust content that names what goes wrong and shows the fix
- Confidence over fear: lessons open with what a setup unlocks, never with what mistakes cost. Stakes are framed as readiness and payoff; warnings, edge cases, and troubleshooting live in documentation, linked at the moment of need. (Scripts that help partners address their *clients'* fears are fine — fear aimed at the partner is not.)
- Outcome-first framing in every intro: what the learner will be able to do, not what the feature does
- Where a selling technique is taught, give the words ("never miss another lead"), not just the principle — partners reuse scripts verbatim with their own clients

## 8. Migration map for the existing 68 lessons

| Current location | Count | Disposition |
|---|---|---|
| getting-started | 5 | Revise into Path 1 (one replaced by new story lesson; ecosystem map, get-set-up-to-get-paid, and capstone added) |
| platform/business-app | 5 | Move to Products library (Engage) |
| platform/marketplace | 6 | Split: selling-focused lessons feed Path 3 lesson 10; setup lessons to Products library (Convert) |
| platform/crm | 7 | Move to Products library (Convert); My Meetings/booking material feeds Path 3 lesson 4; check CRM AI-era accuracy |
| platform/integrations | 1 | Absorb into Builder track lesson 1; retire standalone |
| products/ai-receptionist | 4 | Consolidate into Path 3 lessons 3-4 |
| products/conversations-ai | 3 | Products library (Convert); update naming to current AI Workforce language |
| products/local-seo-listings | 10 | Products library (Attract); audit for redundancy — three "introduction to SEO" variants exist |
| products/reputation-management | 4 | Products library (Engage); reputation-AI lessons cross-link Path 3 lesson 6 |
| products/social-marketing, advertising, websites, snapshot-executive-reports | ~15 | Products library under lifecycle groups |
| automations-ai | 2 | Split: conceptual content feeds Path 2 lesson 6; starter applied content feeds Path 3 lesson 8; advanced content feeds Builder track lesson 5 |
| vendasta-services | 3 | Keep as Services library |

Every moved URL gets a client-redirect. Nothing is deleted without your explicit sign-off — "retire" means moved to a holding branch pending review.

## 9. Build phasing

| Phase | Ships | Why first |
|---|---|---|
| 1. The story and the workforce | Learn home, pill rename, curated sidebar, Path 1 revamp (incl. ecosystem map + get-set-up-to-get-paid), Path 3 (all 10 lessons), library regrouping, redirects, consolidated billing FAQ page on the docs side | Closes the brand-story gap and answers the field's top questions in one release. Path 3 lessons 4, 5, 8, 9 (booking, training, autopilot, compliance) are the four highest-frequency real-world asks — they do not slip |
| 2. Understanding and creating | Path 2 (AI Foundations), Path 4 (Vibe), certification/assessment design decision | All-new writing; foundations makes the workforce path smarter, Vibe rides the beta momentum; assessments build on shipped paths |
| 3. Depth and reach | Path 5 (Builder track), role-based landing pages on Learn home, video production pass | Technical content needs SME review cycles; role pages need paths 1-4 live to point at |

Each phase is shippable alone. Phase 1 changes the story; phases 2-3 deepen it.

## 10. Certification (elevated from open question)

The calls settle this: partners are shopping for credible AI education and finding "BS certificates"; the Partner Certification program has an access catch-22 (training gated on activations, activations blocked on training); and large partners want the badge partly to win internal buy-in. The Learn tab is the missing rung:

- **Learn (open, free, self-serve)** → activations grow → **Partner Certification** (relationship-based, badge, co-marketing).
- Design Learn path completions so they can later count as evidence toward certification criteria — coordinate with the partner programs team (Fast Track/Certified owners) before phase 2 so assessment design matches their bar.
- Ship completion-only in phase 1; decide the credential layer in phase 2 with that team at the table.

## 11. Open questions for Cal

1. **Pill rename.** TRAINING → LEARN: any reason the current label is load-bearing (marketing links, support macros)?
2. **Partner programs alignment.** Who owns the conversation with the Fast Track/Certified and AI Jumpstart owners? The Learn tab should be the durable home their unlabeled recording drives can't be, and the certification handshake (section 10) needs their buy-in.
3. **Builder track depth.** Lesson 7 hands off to developers.vendasta.com. Does your team own any learn content on that property, or is the handoff link the boundary?
4. **Video capacity.** Paths 2-4 are designed video-optional. Does Shiva's walkthrough-video pipeline have capacity for a phase 2 video pass, or do we plan it as phase 3?
5. **SMB-facing learn.** Business App users have no learn surface on docs.businessapp.io. Fast-follow after phase 2, or out of scope for this initiative?
6. **SEO course cleanup.** The Local SEO folder has three overlapping introductions. Approve consolidating to one during the library regroup, or leave content untouched in phase 1?
7. **Migration-era content.** The Partner Center CRM → Business App consolidation is in flight and partners are anxious about it ("how do I even get my customers out of this?"). Do we write migration-readiness content in the Learn tab now, or hold until the transition plan is public? My recommendation: hold lessons, but keep the ecosystem-map lesson migration-aware so it stays true through the change. Reinforced by internal signal (insights section 7): the consolidation is still described internally as a concept, not a committed migration.
8. **Partner showcase coordination.** An internal prototype exists for an AI-certified-partner showcase app (share what you built with the AI Workforce and Vibe), with its home undecided (Partner Center vs dedicated site). The Learn tab's community dimension — mastermind-ready lessons, partner examples in courses — overlaps directly. Who connects with that team so we design once, not twice?
