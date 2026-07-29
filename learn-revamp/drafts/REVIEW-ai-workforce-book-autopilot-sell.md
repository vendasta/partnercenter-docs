# Review copy: steps 3, 6, 7 of Hire your first AI Employee

**Status:** Drafted, self-checked, not yet reviewed by Cal. Do not commit to git until a human review pass happens (per the learning-path-writing skill's non-negotiable review loop, rule 32).
**Date:** July 29, 2026
**Author:** Claude, from `OUTLINE-ai-workforce-book-autopilot-sell.md` v3 (approved by Shiva) plus fresh doc verification during writing.
**Files touched:**
- `docusaurus/training/ai-workforce/teach-it-to-book.mdx` (stub replaced with full lesson copy)
- `docusaurus/training/ai-workforce/autopilot.mdx` (stub replaced with full lesson copy)
- `docusaurus/training/ai-workforce/sell-and-manage.mdx` (stub replaced with full lesson copy)
- `docusaurus/src/components/LessonFooter.tsx` (extended with optional `secondTo` / `secondNextPathName` / `secondLinkText` props, backward compatible)
- `docusaurus/src/css/custom.css` (added `.lesson-footer__links` flex wrapper so a second link has breathing room; existing single-link footers unaffected)

`docusaurus/training/ai-workforce/index.mdx` already listed all three steps correctly (titles, descriptions, `to` paths) before this session touched anything — no change needed there.

## Doc verification done while writing (rule 18)

| Claim | Verified against | Result |
|---|---|---|
| Calendar connection is per-person, writes/reads busy time | `docusaurus/docs/crm/my-meetings/setting-up-calendar-integration.mdx` | `[DOC]` matches |
| Team events, round robin, Sales Teams membership requirement | `docusaurus/docs/crm/my-meetings/team-booking-links.mdx` | `[DOC]` matches, four assignment methods confirmed (round robin, priority, client selection, multi host) |
| Booking link durations (15/30/45/60 or custom) | `docusaurus/docs/crm/my-meetings/index.mdx` | `[DOC]` — note: docs do not describe "three prebuilt links" the way one call transcript did; wrote to the doc's actual mechanic (choose one duration from the options) instead of the call's framing |
| "Book Appointments" capability name (Chat Receptionist) and "Book appointments with calendar" (Voice Receptionist) | `docusaurus/docs/ai/ai-workforce/ai-chat-receptionist/index.md`, `ai-voice-receptionist.md` | `[DOC]` — used "Book Appointments" as the capability name in lesson copy since step 3 is written for a general receptionist (matches the Chat Receptionist doc exactly; Voice Receptionist's doc uses a near-identical name) |
| "Record preferred booking time"-style capability that only records a preference | Not found in either receptionist doc | `[CALL]` only, not doc-verified — softened in copy to "an older capability... that only records a caller's preferred time" rather than asserting an exact, official capability name |
| Capability priority/ordering ("put it at the top of the list") | Not found in `creating-custom-capabilities.md` | `[CALL]` only — dropped from copy; instead framed as "give it a custom capability of its own" rather than claiming a positional-priority mechanic docs do not confirm |
| Smart lists, static vs. smart, list-based automation triggers | `docusaurus/docs/crm/lists/index.mdx` | `[DOC]` matches, including the four list-membership triggers |
| Automation trigger name "A contact is added to a list" / "A company is added to a list" | `docusaurus/docs/automations/automation-triggers-reference.mdx` | `[DOC]` exact match |
| Automation steps: "Start a campaign for the contact/company," "Create a CRM sales task for the contact," "Send an SMS message via Conversations" | `docusaurus/docs/automations/automation-steps-reference.mdx` | `[DOC]` exact match |
| Entry settings ("Only once per account") as the likely explanation for "entity already exists" | `docusaurus/docs/automations/creating-and-configuring-automations.mdx` | `[DOC]` — the log line itself isn't documented verbatim, but the entry-setting mechanic it most often reflects is |
| AI Workforce Setup and AI Workforce Optimization Plan as the two named support products | `docusaurus/docs/vendasta-services/ai-workforce/index.mdx` | `[DOC]` matches product names and structure exactly; no dollar figures, minimum-term, or setup-fee-waiver language found in docs — see pricing note below |
| Packages: wholesale cost, retail price, setup fees, bundling mechanics | `docusaurus/docs/marketplace/packages/index.mdx` | `[DOC]` matches |
| Elite Web Professionals case study numbers (1,017 calls, 778 qualified leads, 76% conversion, four months) | `docusaurus/training-retired/meet-your-first-ai-employee-the-ai-receptionist.mdx` (Vendasta's own prior course content) | `[DOC]` — pulled verbatim from the retired course rather than invented; paraphrased the closing line instead of quoting the president directly |

## Pricing decision carried over from the outline (v3)

Per Shiva's decision, the six exact wholesale/setup/optimization dollar figures ($29/$39/$79 tiers, $199 setup, $29/month optimization, ~$218/month bundle example) are **not** in the lesson copy. Step 7 teaches the three-building-blocks structure (tier fee, one-time setup, ongoing managed fee) and points partners to check current Marketplace pricing, since none of those six figures are doc-verified and Marketplace pricing can move after publish. The two retail benchmark ranges ($1,500-$2,000/month and $600-$750/month) stayed in, since they describe field outcomes rather than list prices.

## Step 3: Teach it to book — review copy

**LessonHeader:** Intermediate · lab · about 30 minutes · Required: Partner Center access, a receptionist with a Capabilities panel (e.g. the step-2 employee), calendar sign-in for everyone taking bookings. Outcomes: connect a calendar the right way; configure a booking link and a team event without the round-robin trap; enable Book Appointments and choose the right calendar; build a business-hours routing capability.

Opening (## Put a real appointment on the calendar): ground statement, one employee that only answers never puts anything on the books.

[LAB: connect a calendar] Each person signs in as themselves, not an admin on their behalf; connect Google or Microsoft 365; confirms as "shows connected in Meeting Settings." Doc link to Setting up calendar integration for the full walkthrough.

(## Configure the booking link) Slug, availability, buffer time, duration choice (15/30/45/60 or custom).
[LAB: build one booking link] Name the event type, set availability/buffer, save and copy the link.

(## The team event, done right) Team event + assignment method (round robin named as the example); two conditions for rotation membership (calendar connected, Sales Team assignment). Doc link to Team booking links.

(## Enable the capability)
[LAB: turn on Book Appointments] Toggle it, choose the event link/calendar.
Prose: replace any preference-only capability with Book Appointments (softened per the doc-verification note above). Chat-vs-voice handoff (chat can share the link directly; voice promises follow-up, an automation sends the link). Payment-gating limit, cross-linked to step 6's automation content.

(## Route calls by business hours)
[LAB: build the routing capability] Custom capability named e.g. `BusinessHoursCheck`; markdown prompt with a during-hours and after-hours branch; reference other capabilities by exact capitalized name; pull hours from the business's own knowledge sources rather than hardcoding them.
Prose: extend Capture Lead Information to ask which department was wanted, rather than duplicating a second after-hours capability.

(## Test both directions)
[LAB: confirm both branches] Call/chat during hours, confirm transfer; call/chat after hours, confirm capture.

**Hidden placeholder (beat 11, per Shiva's decision #1):** a commented-out `{/* TODO(ET-740): ... */}` block sits right after the test-both-directions lab, holding the exact closing sentence and doc link for the outside-booking-system builder-track piece, ready to uncomment once [ET-740](https://vendasta.jira.com/browse/ET-740) ships that page.

What you now have: 4 bullets. Knowledge check: 4 questions (round-robin debug, who connects a calendar, chat-vs-voice handoff, referencing capabilities by name). Footer → `train-your-employee`, step 3 of 7.

## Step 6: Put your workforce on autopilot — review copy

**LessonHeader:** Intermediate · lab · about 30 minutes · Required: Partner Center access, a CRM with at least one contact source flowing in. Outcomes: build a smart list; pair it with an automation; read the activity log correctly; describe the multi-location pattern.

Opening (## What runs when nobody is watching): ground statement, the workforce only acted on request until now.

[LAB: build a smart list] CRM → Lists → Create → Smart List; filter example (record source = form submission); confirms as immediate and ongoing population.

(## Pair it with an automation)
[LAB: connect the list to an action] Trigger "A contact/company is added to a list"; one step (campaign, task, or notification); turn it on.

Prose bridges into the three starter recipes, with the first built end to end:
[LAB: ship the nurture recipe] Trigger: form-submission smart list. Step: Start a campaign for the contact. Confirms by submitting a test form.
Prose (not a separate lab, per outline's 2-3 lab-callout budget): the other two recipes described in one sentence each — new-lead list → CRM sales task + SMS acknowledgment; completed-job list (once an integration exists) → review-request campaign for the company.

(## Read the log before assuming something broke): "entity already exists" as the safety net doing its job, tied to entry settings like Only once per account.

(## Where autopilot grows into): multi-location zip-code-branching pattern described in prose only, framed as "worth knowing the shape exists," not built.

**Hidden placeholder (beat 6, per Shiva's decision #2):** `{/* TODO(ET-741): ... */}` sits right after that section, ready to uncomment once [ET-741](https://vendasta.jira.com/browse/ET-741) ships the deeper piece.

(## Keep a person in the loop): approval step before anything client-facing posts on its own.

What you now have: 5 bullets. Knowledge check: 4 questions (smart list vs. static list, matching a recipe to a scenario, reading "entity already exists," recognizing the multi-location pattern as a further build). Footer → `sell-and-manage`, step 6 of 7.

## Step 7: Sell and manage your AI Workforce — review copy

**LessonHeader:** Intermediate · no lab tag · about 30 minutes · Required: completion of steps 1-6, a real prospect or client to price for. Outcomes: outcome-first pitching; recognize the champion wedge; package and price against current Marketplace rates; choose self-serve/setup/managed; run the monthly loop.

Sections, in order: The words that work (outcome-first, junior-receptionist framing, after-hours economics) `[CALL/SYN, generalized language patterns, no verbatim quotes attributed to a real person]`; Your own account is the proof; The champion wedge; Match the employee to the business model (with a `:::tip Try it now`); Package and price it (three building blocks, Marketplace-check framing, two retail benchmarks, Elite Web Professionals case study `[DOC, from the retired course]`); Choose self-serve, setup, or managed (`[DOC]` product names, softened delivery-start framing per the fulfillment-form doc-verification note below); Segment clients the way you segment yourself; Manage and improve, every month (cross-links steps 4 and 5).

**Note on beat 7 (do it/delegate it/buy it):** the outline's "fulfillment-form workflow" detail came from a call and could not be doc-verified for AI Workforce services specifically (the only documented "fulfillment form" concept is for a partner's own custom Vendor Center products, a different context). Softened in copy to "activating a Setup or an Optimization Plan is what starts delivery... it belongs at the moment the client agrees" rather than asserting an unverified form-based mechanic.

What you now have: 5 bullets. Knowledge check: 4 questions (outcome-first language, champion-wedge move, matching employee to channel, pricing anchor). Footer: final step, **both** next paths per Shiva's decision #3 — `to="/learn/ai-foundations"` / `nextPathName="AI foundations"` and `secondTo="/learn/vibe"` / `secondNextPathName="Build with Vibe"`.

## Verification performed this session

- All three `.mdx` files compiled cleanly with `@mdx-js/mdx`'s `compile()` — no syntax errors.
- `LessonFooter.tsx` transpiles cleanly with the TypeScript compiler (`ts.transpileModule`) — no syntax errors, and the change is additive-only (new optional props, existing single-link callers unaffected).
- Every internal link used (`/crm/my-meetings/setting-up-calendar-integration`, `/crm/my-meetings/team-booking-links`, and all seven `LessonFooter` `to` targets across the full path, step 1 through step 7) was checked against real files in the repo.
- Confirmed `training/ai-workforce/index.mdx`'s `PathRoadmap` already listed correct titles, descriptions, and `to` paths for all three steps — no change needed.
- Checked rendered copy for the repo's hard rules: no literal `>` characters, no banned contractions, no em dashes outside the two hidden MDX comments (which preserve Shiva's own wording verbatim for whoever uncomments them later).

**Not completed, and flagged rather than skipped:** a full `npm run build` from `docusaurus/` could not be run to completion in this session. The sandboxed shell used for this work tears down any background process at the end of each command (by design, for isolation), and a full production build of this site (492 markdown/MDX files) takes longer than a single command's time budget here. **Before merge, run `npm run build` from `docusaurus/` locally, grep the output for broken-link warnings touching `ai-workforce`, and eyeball all three steps on `npm start`** — this is the one review-loop step (rule 33) not yet done, and it is the one that actually renders the page rather than just checking syntax.

## Changelog

- **v1** (July 29, 2026): steps 3, 6, 7 written to `docusaurus/training/ai-workforce/*.mdx`, replacing stubs, per approved `OUTLINE-ai-workforce-book-autopilot-sell.md` v3. `LessonFooter.tsx` and `custom.css` extended for dual next-path links (step 7 only; no other step affected). Two hidden MDX comment placeholders added (step 3 → ET-740, step 6 → ET-741). MDX and TypeScript syntax verified; internal links verified; full `npm run build` still outstanding, flagged above for a local run before merge.
