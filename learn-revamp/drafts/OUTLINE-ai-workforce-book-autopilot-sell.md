# Outline spec: Hire your first AI Employee — steps 3, 6, 7 (Teach it to book, Put your workforce on autopilot, Sell and manage your AI Workforce)

**Status:** Draft for Shiva review, v2 — all five open questions resolved, two Jira tickets opened. No lesson copy gets written until this is approved (per the skill's non-negotiable review loop and the precedent set in `OUTLINE-ai-workforce-train-and-custom-lab.md`).
**Date:** July 29, 2026
**Author:** Claude, from this session's transcript-knowledge-capture pass (27 new call transcripts, redacted, filed to `learn-revamp/transcript-notes/`) plus repo recon.
**Parents:** `learn-tab-ia-spec.md` Path 3 lessons 4, 8, 10 (old numbering — these are steps 3, 6, 7 in the shipped 7-step path); `phase1-lesson-outlines.md` 3.4/3.8/3.10; `partner-call-insights.md` 4.1, 4.3, 4.10, sections 3.7-3.11 and 6.5; `PROPOSAL-lab-pattern.md` retag table (confirms step 3 and step 6 as `lab`, step 7 as untagged); `OUTLINE-ai-workforce-train-and-custom-lab.md` (precedent format and its "Not in this outline" scope fences, which named exactly these three steps as out of scope).
**Scope:** Steps 3, 6, 7 of the path's 7. Steps 1-2 and 4-5 are shipped. This closes out the path.
**Coordination note:** confirm with Cal that no other session is mid-restructure of `training/ai-workforce/` before any of this becomes real lesson copy (same caution HANDOFF.md gave the last outline).

## The angle

The path so far taught deploy (steps 1-2), fix (step 4), and build (step 5). These three steps are where the workforce stops being one employee you manage by hand and becomes a program: an employee that closes the loop by booking real time, work that keeps happening when nobody is watching, and a business motion that pays for all of it. Step 3 and step 6 are both hands-on under the state-change test (a calendar gets connected, a smart list and automation get built) and carry the `lab` tag, confirmed against the retag table in `PROPOSAL-lab-pattern.md`. Step 7 stays untagged: it is scripts, positioning, and a pricing table, not a build.

## Where this session's new resources landed

This session captured and filed 27 new call transcripts into `learn-revamp/transcript-notes/`, redacted of names per an explicit requirement (role/industry descriptors only). Cross-referenced against what these three steps need:

| New source material | Where it lands | Notes |
|---|---|---|
| A franchise field-service CRM vendor's booking/cancellation API walkthrough (three-step auth, slot search, "quick-book" method, identity-verification risk on cancellation) — `builder.md` | **Not step 3** — this is API/webhook depth, the Builder track's territory, same boundary the last outline drew for step 5. Worth a single doc-link sentence in step 3's close ("when a client's booking needs to land in an outside system, [the integration landscape] is where that gets built"), nothing more. | `[CALL]` |
| An agency actively trying to displace Calendly asked detailed booking-link questions: individual vs. team/round-robin links, per-link buffers, custom booking questions, and a confirmed payment-gating gap (~60-70% Calendly feature parity, no pay-to-book) — `crm.md` | Step 3, the plumbing beats | `[CALL]` — corroborates and sharpens `partner-call-insights.md` 4.1's base setup list |
| A Business App walkthrough covering My Meetings/booking links plus the AI Workforce panel from the client side — `crm.md`, `business-app.md` | Step 3 (booking-link mechanics) and background context only; the AI Workforce panel material is already covered by shipped steps | `[CALL]` |
| A hands-on AI receptionist build session: My Meetings setup end to end (pick a URL slug, connect calendar, availability increments, buffer time, 15/30/60-minute prebuilt links), plus the exact chat-vs-voice booking-link workaround for a lead already using another booking tool — `ai-workforce.md` | Step 3, the enable-the-capability beat | `[CALL]` — matches `partner-call-insights.md` batch 3 (section 6.5) almost beat for beat; this call is more specific on the chat/voice workaround, so it leads |
| Extensive published wholesale pricing: Conversations AI Standard/Pro/Premium tiers, AI Employee Setup, AI Workforce Optimization / AI Optimization add-on (waives the setup fee), a bundled industry package example — `ai-workforce.md` | Step 7, the packaging/pricing and do-it/delegate-it/buy-it beats, as the **structure** (tier + setup + managed fee) rather than as memorized dollar figures | `[CALL]`, multiple independent calls converge on the same numbers, but exact figures are deliberately left out of lesson copy — see "Decided by Shiva" #4; lesson points to Marketplace as the live source of truth instead |
| Reseller markup benchmarking (2x-4x norms, one outlier high-markup case) — `vendasta-services.md` | Step 7, the pricing beat | `[CALL]` |
| Real end-to-end package pricing benchmarks from partner examples: a full voice-AI-plus-lead-gen bundle at $1,500-$2,000/month retail, a lighter SMS/email-only automation package at $600-$750/month retail — `ai-workforce.md` | Step 7, packaging beat, as a worked example range rather than a prescriptive price | `[CALL]` |
| An "AI employee" / LLM-agnostic architecture pitch used in a marketplace sales demo, with enterprise-scale proof points (generalized, not named) — `ai-workforce.md` | Step 7, optional flavor for the outcome-first positioning beat — not required, flag as a nice-to-have, not load-bearing | `[CALL]`, generalized per this session's redaction rule |

Nothing new this session materially changes step 6 (autopilot) beyond what `partner-call-insights.md` 4.3 and 4.10 already carry — no new smart-list or multi-location-automation call surfaced in this batch. Step 6's outline below leans on the existing evidence base plus doc verification.

## Source map

| Source | Role | Constraint |
|---|---|---|
| `learn-revamp/transcript-notes/crm.md`, `builder.md`, `ai-workforce.md`, `vendasta-services.md`, `marketplace.md` (this session's filings) | Field evidence for all three steps, see mapping table above | `[CALL]`, redacted of names this session — cite by topic and call type, never by participant |
| `learn-revamp/partner-call-insights.md` 4.1 (booking), 4.3 + 4.10 (autopilot), 3.7/3.8/3.11 + 6.5 (sell and manage) | Primary field evidence, already vetted into the IA spec | `[CALL]`, carried forward, not re-derived |
| `learn-revamp/learn-tab-ia-spec.md` Path 3 lessons 4, 8, 10 | Canonical scope for these three steps | Primary scope authority where it conflicts with call evidence |
| `learn-revamp/phase1-lesson-outlines.md` 3.4, 3.8, 3.10 | Detailed arc drafts pre-dating this outline | Superseded in numbering (old 3.4/3.8/3.10 map to shipped steps 3/6/7) but the beats hold; reconciled below |
| `docusaurus/docs/crm/my-meetings/team-booking-links.mdx` and sibling pages | Canonical Partner Center booking mechanics | Verify field/menu names against this before writing lesson copy |
| `docusaurus/docs/automations/` (`creating-and-configuring-automations.mdx`, `automation-templates-overview.mdx`, `automation-triggers-reference.mdx`) | Canonical automation mechanics | Verify smart-list and trigger terminology before writing |
| `docusaurus/docs/marketplace/packages/` | Canonical packaging/pricing mechanics | Verify wholesale/retail terminology and the current package-builder flow before writing |
| `PROPOSAL-lab-pattern.md` | Lab anatomy and the retag table settling which of these three steps carry the `lab` tag | Confirmed, not re-litigated |
| Shipped steps 1-2, 4-5 (`meet-your-workforce.mdx`, `put-a-receptionist-to-work.mdx`, `train-your-employee.mdx`, `custom-employee-lab.mdx`) | Voice, component, and footer-chain reference | Match these exactly; do not introduce new patterns |

## Decided by Shiva (July 29)

1. **Step 3's builder-track boundary.** Confirmed: one closing sentence, doc-linked, nothing more. Since the destination (a Builder track step on wiring booking/cancellation into an outside FSM/CRM via API) does not exist yet, the sentence and its link get authored now as a **hidden placeholder** — a JSX comment in the `.mdx` source (`{/* ... */}`), not rendered on the live page — tagged with the tracking ticket, so it is one uncomment away from live once the target exists. Tracked as **[ET-740](https://vendasta.jira.com/browse/ET-740)**, linked to ET-690.
2. **Step 6's advanced example.** Same treatment as #1: the multi-location zip-code-branching pattern stays a described example in step 6's prose (not a build-it-yourself lab section), with its own "read more" link authored as a hidden placeholder pointing at a Builder track / advanced-automations piece that does not exist yet. Tracked as **[ET-741](https://vendasta.jira.com/browse/ET-741)**, linked to ET-690.
3. **Step 7's footer target.** Both paths, learner's choice. `LessonFooter` as it exists today only takes one `to` + `nextPathName` (single link, confirmed by reading the component). Plan: add two small optional props (`secondTo`, `secondNextPathName`) so the final step of a path can render two "keep learning" links side by side instead of one — backward compatible, every other step's footer call is untouched. This is a small component change to make at copy time for step 7, not a lesson-content change; flagging it here so it does not surprise anyone reviewing the diff. Step 7 renders both: `to="/learn/ai-foundations"` / `nextPathName="AI foundations"` and `secondTo="/learn/vibe"` / `secondNextPathName="Build with Vibe"`.
4. **Step 7's pricing table, exact figures.** Revised: drop the six exact wholesale/setup/optimization dollar figures from the lesson prose entirely (the $29/$39/$79 tier prices, the $199 setup fee, the $29/month optimization fee, and the ~$218/month bundle example) — none are doc-verified, and hardcoding them risks going stale the moment Marketplace pricing changes, misleading a partner pricing a real deal. Keep the parts that do not go stale: the three-building-blocks framework itself (a tier fee, a one-time setup fee, an ongoing managed fee, combined into a client price), and the two real end-to-end retail benchmarks ($1,500-2,000/month and $600-750/month), which describe outcomes rather than list prices. Where the lesson would have stated a wholesale number, it instead points the partner to check current pricing in Marketplace when they build the package.
5. **Step 7's Elite Web Professionals case study.** Confirmed: fold it in. Add as a worked example alongside the field pricing benchmarks in beat 6, not in place of them.

## Step 3: Teach it to book (Intermediate, lab, ~30 min)

**Outcomes:**
- Connect a calendar the right way (per person, not by an admin on someone's behalf).
- Configure a booking link and a team event without the round-robin trap.
- Enable the book-appointments capability on a receptionist and choose one calendar per employee.
- Build a business-hours routing capability that transfers during hours and captures leads after.

**Ground (first sentence under first heading):** by the end of this step, your receptionist from step 2 can book a real meeting on a real calendar, and knows what to do with a call outside business hours. Environment: your own Partner Center, on the same employee steps 2 and 4 already touched.

**Beats:**
1. Opening descriptor: an employee that only answers is a receptionist who never puts anything on the books; booking is the step that turns a conversation into a kept appointment. [SYN, voice rule 4 — descriptor, not a tour]
2. Lab: connect a calendar. Each person taking bookings signs in **as themselves** — an admin cannot connect a calendar on a teammate's behalf. CRM → My Meetings → connect Google or Microsoft 365; the connection both writes new bookings and reads busy time, so double-booking cannot happen. [CALL 4.1 beat 1; CALL batch 3 section 6.5 booking checklist item 4; DOC `crm/my-meetings/team-booking-links.mdx` for the rest]
3. Lab: configure the booking link. Pick a URL slug, set availability windows and buffer time before/after, remove durations you will not use. Three prebuilt links exist (15/30/60 minutes); a receptionist books through exactly one of them, so decide which before testing. [CALL, hands-on build session; CALL batch 3 section 6.5 items on buffer time and the three prebuilt event links]
4. The team-event gotcha, stated once, affirmatively: for team scheduling, create a team event and choose round robin; a teammate only appears in the pool once their own individual link is published, and round-robin membership is checked against CRM → Sales Teams. Cross-link back to the team-setup step earlier in the path. [CALL 4.1 beat 4; CALL, Calendly-comparison call — service-specific team links as a further pattern worth one sentence]
5. Lab: enable the capability. In the employee's Capabilities, turn on **Book appointments**; if **Record preferred booking time** is present, remove it — it only records a preference and reads like an incomplete booking flow. [CALL 4.1 beat 5]
6. The channel-specific workaround for a lead already using a different booking tool: chat can return the link directly in conversation; voice cannot paste a link mid-call, so it tells the caller a person will follow up and an automation sends the link afterward. [CALL, hands-on build session — this is more specific than the older evidence base, leads over `phase1-lesson-outlines.md`'s version of this beat]
7. One honest limit, stated affirmatively rather than as a warning: the booking tool does not collect payment or gate a booking behind one. A business that needs to collect a deposit first ties link delivery to a payment-confirmation automation instead (cross-link to step 6). [CALL, Calendly-comparison call]
8. Lab: build business-hours routing. Create a custom capability (for example, "Business hours check") rather than adding to the role prompt; write it in markdown with numbered steps and dash branches; reference other capabilities by their capitalized proper names ("use the Transfer Call capability"); pull hours from the business's own website knowledge rather than a hardcoded list, so a holiday never needs a manual edit; put this capability at the top of the list, since capabilities higher up take priority. [CALL 4.1 beats 2-6, the flagship field-built pattern]
9. Extend, do not duplicate: the same Capture Leads capability that already runs after hours can ask which department the caller wanted, instead of a second capability re-doing that logic. [CALL 4.1 beat 7]
10. Lab: test both directions. Call during business hours and confirm a transfer; call after hours and confirm the AI captures the lead instead. [CALL 4.1 beat 8]
11. Close, one sentence, doc-linked, no new beat: a booking that needs to land inside a client's own outside scheduling or field-service system is a deeper build than one employee needs today; a link to that deeper build is authored now as a **hidden MDX comment** (not rendered) rather than left as a bare mention, so it is one uncomment away from live once [ET-740](https://vendasta.jira.com/browse/ET-740) ships the target page. At copy time this looks like: `{/* TODO(ET-740): once the builder-track "wire booking into an outside system" step exists, uncomment — "If a client needs bookings to land in their own outside system, that's a deeper build — [here's where to go for it](/learn/builder/...)." */}`

**Components:** LessonHeader (`lab`, Intermediate, ~30 min, Required: "Partner Center access," "A receptionist with a Capabilities panel, such as your employee from step 2", "Calendar sign-in for everyone who will take bookings"). Four to five `:::info Lab:` callouts (connect calendar; configure booking link; enable the capability; build the routing capability; test both directions). "What you now have" before the knowledge check. A hidden MDX comment closes the step per beat 11 (tracked in ET-740). LessonFooter → `/learn/ai-workforce/train-your-employee` (already the live target from the shipped step 2 footer).

**Knowledge check:** the round-robin debug scenario from `partner-call-insights.md` 4.1 (a teammate shows grayed out — what do you check first); which calendar connection step an admin cannot do for someone else; chat-vs-voice booking-link handoff; what the routing capability should reference by name rather than restate.

---

## Step 6: Put your workforce on autopilot (Intermediate, lab, ~30 min)

**Outcomes:**
- Build a smart list that triggers on a real filter.
- Pair a smart list with an automation using one of three starter recipes.
- Read an activity log entry without mistaking a safety net for a failure.
- Describe what the multi-location review-automation pattern looks like when a business is ready for it.

**Ground:** by the end of this step, one real automation is live on your own account, running without you touching it again. Environment: your own Partner Center, the guinea-pig account from step 2.

**Beats:**
1. Opening descriptor: the workforce so far only acts when spoken to; this step is what runs when nobody is in the conversation at all. [SYN, voice rule 4]
2. Lab: build a smart list. CRM → Lists → Create list → **Smart list**, name it before saving, then add a filter (for example, record source = form submission). Matching contacts populate immediately and keep populating — the list itself is the trigger. [CALL 4.3 beats 1-2]
3. Lab: pair it with an automation. Create an automation on "contact added to list," and choose an action: send a campaign, create a task, or notify someone. [CALL 4.3 beat 3; DOC `automations/creating-and-configuring-automations.mdx`]
4. The three starter recipes, each built as its own short lab: a form submission that starts a nurture campaign; a new lead that creates an owner task and sends an SMS acknowledgment; a completed job (through an integration) that sends a review request. [CALL 4.3 beat 4; DOC `automations/automation-templates-overview.mdx` for ready-made starting points]
5. Reading the activity log: an "entity already exists" line is usually the safety net working, not a failure — read the log before assuming something broke. [CALL 4.10 beat 4]
6. The advanced pattern, shown as what autopilot grows into rather than something to build today: a real multi-location business branches review requests by zip code, with a webhook to each satellite location and a safety-net fallback to the hub when nothing matches. Described in prose, not built step by step; a "go deeper" link is authored as a **hidden MDX comment** pointing at the Builder-track / advanced-automations piece tracked in [ET-741](https://vendasta.jira.com/browse/ET-741), to be uncommented once that page exists. [CALL 4.10, full pattern]
7. Where a human stays in the loop: an approval step before anything client-facing goes out on its own, especially for content a client did not expect to see posted automatically. [CALL, dental-agency social-drafts caution, carried from `phase1-lesson-outlines.md` 3.8 beat 6]

**Components:** LessonHeader (`lab`, Intermediate, ~30 min, Required: "Partner Center access," "A CRM with at least one contact source already flowing in, such as a form or your receptionist from step 2"). Two to three `:::info Lab:` callouts (build the smart list; pair it with an automation; ship one starter recipe in full). "What you now have" before the knowledge check. A hidden MDX comment accompanies beat 6 (tracked in ET-741). LessonFooter → `/learn/ai-workforce/sell-and-manage`.

**Knowledge check:** what makes a smart list a trigger rather than a static list; matching a trigger and a goal to the right starter recipe; reading an "already exists" log entry correctly; when a human approval step belongs in the loop.

---

## Step 7: Sell and manage your AI Workforce (Intermediate, ~30 min)

**Outcomes:**
- Pitch outcome-first, using field-tested language rather than feature names.
- Recognize the champion-wedge pattern for a multi-stakeholder prospect.
- Package AI employees into a bundle and price it using real wholesale/retail benchmarks.
- Choose the right support model: self-serve, one-time setup, or ongoing managed service.
- Run the monthly loop that keeps a deployed workforce improving.

**Ground:** by the end of this step, you can price a real AI Workforce package for a real prospect and know which support model to offer them. Environment: no new platform state; this step is pitch and pricing, applied to the account you have been building since step 2.

**Beats:**
1. Opening descriptor: everything up to here worked on one account; this step is what turns that account into a sale, and every sale into a program you manage rather than a one-time setup. [SYN, voice rule 4]
2. The words that work, given as reusable language rather than technique commentary (voice rule 16 — teach the line, do not narrate why it works): lead with the outcome, not the word "AI" ("never miss another lead, no question goes unanswered, day or night"); the junior-receptionist framing for job-fear ("an extra set of hands up front, so the skilled work stays with the people already doing it"); after-hours economics (a paid ad click that goes unanswered on a Saturday call is a lead paid for and lost). [CALL 3.7/3.8, `partner-call-insights.md` section 8]
3. Your own account is the proof: the screenshots and before/after answers collected since step 2 are the sales asset, not a slide deck. [CALL 3.9, cross-link to step 2]
4. The champion wedge for a multi-location or franchise prospect: deploy with one believer, prove real lead volume on their account, then bring the decision-makers receipts instead of a pitch. [CALL 3.8]
5. Match the employee to the business model: an online-only business gets chat, not voice; a business that lives on the phone gets voice with after-hours capture. Getting this backwards costs trust before the workforce gets a chance to prove itself. [CALL section 8]
6. Package and price, framed around structure rather than a memorized price list: a tier fee (Conversations AI's Standard/Pro/Premium plans), a one-time AI Employee setup fee, and an ongoing managed-optimization fee are the three building blocks partners combine into a client price — check current Marketplace pricing for each when building a real package, since none of these numbers are fixed here and Marketplace is the live source of truth. Two real end-to-end examples from the field, given as outcomes rather than a price list: a fuller voice-plus-lead-generation package running $1,500-$2,000/month retail, and a lighter SMS/email-only automation package running $600-$750/month retail. Alongside these, the Elite Web Professionals before/after case study (from the original course material) as a worked example of a package priced and sold end to end. Price the bundle, not the seat — a per-employee fee structure throttles a client who wants to add more employees later. [CALL, this session's pricing calls, converging across multiple independent examples on structure; exact wholesale figures deliberately omitted from lesson copy — see "Decided by Shiva" #4]
7. Do it, delegate it, or buy it, as one table: what the partner now does themselves after this path, what a one-time setup fee covers, and what an ongoing managed service covers, term stated plainly. The fulfillment-form workflow is the thing that actually starts a service order; an order with no form filled out stalls before anyone on the services side sees it. [CALL 3.7 verbatim CS guidance; CALL batch 3 fulfillment-form note]
8. Segment clients the way advanced partners segment their own learning: a client new to AI gets one simple win that changes their week; a client already comfortable gets the next challenge. The same four-tier thinking a partner uses on themselves applies to every client relationship. [CALL 3.11]
9. Manage and improve, the monthly loop: review real conversations, send anything off back through the step-4 audit habit, and raise autonomy as trust grows rather than leaving it wherever it started. [CALL, IA spec lesson 10 beat 7; cross-link step 4's audit habit and step 5's autonomy-level setting]

**Components:** LessonHeader (no tag, Intermediate, ~30 min, Required: "Completion of steps 1-6," "A real prospect or client to price for"). At least one `:::tip Try it now` (price one real package for a business you know, using the table in beat 6). No lab callouts — this step does not change platform state. LessonFooter → path completion, both next paths offered: `to="/learn/ai-foundations"` / `nextPathName="AI foundations"` plus `secondTo="/learn/vibe"` / `secondNextPathName="Build with Vibe"`, once `LessonFooter.tsx` gains the two optional props described in "Decided by Shiva" #3.

**Knowledge check:** matching a client objection to the right script; spotting a champion-wedge opportunity in a scenario; pricing a bundle correctly from the three building blocks; choosing self-serve vs. setup vs. managed for a given client profile.

---

## Not in this outline (scope fences)

- **The ServiceMinder-style FSM booking/cancellation API integration** (auth model, slot search, quick-book, cancellation identity-verification risk): real, well-sourced this session, but Builder-track depth. Step 3 closes with one sentence, authored as a hidden MDX comment until the target page exists. Tracked as **ET-740**.
- **The full multi-location zip-code-branching review-automation build**: shown in step 6 as an example of what autopilot grows into, not built step by step; its "go deeper" link is likewise a hidden MDX comment until the target page exists. Tracked as **ET-741**.
- No new webhook, middleware, or API depth anywhere in these three steps — that is the Builder track's territory, same fence the last outline drew around step 5.

## Changelog

- **v1** (July 29, 2026): initial outline, built from this session's 27-transcript capture (redacted) plus `partner-call-insights.md`, `learn-tab-ia-spec.md`, `phase1-lesson-outlines.md`, and `PROPOSAL-lab-pattern.md`. Five open questions for Shiva; none resolved yet.
- **v2** (July 29, 2026): all five open questions resolved by Shiva. (1) Step 3's builder-track boundary sentence becomes a hidden MDX comment; tracking ticket **[ET-740](https://vendasta.jira.com/browse/ET-740)** created and linked to ET-690. (2) Step 6's multi-location example keeps its prose treatment; its "go deeper" link becomes a hidden MDX comment; tracking ticket **[ET-741](https://vendasta.jira.com/browse/ET-741)** created and linked to ET-690. (3) Step 7's footer offers both AI foundations and Build with Vibe; requires a small backward-compatible `LessonFooter.tsx` extension (`secondTo` / `secondNextPathName`) at copy time. (4) Step 7's pricing: checked the six wholesale/setup/optimization dollar figures against existing published docs, found none doc-verified. Rather than flag them for a later check, dropped them from lesson copy entirely — kept the three-building-blocks framework and the two retail benchmark ranges (both outcome-shaped, not price lists), and pointed the lesson to Marketplace as the live source of truth for current numbers. (5) The Elite Web Professionals case study is folded into step 7 beat 6. "Open questions for Shiva" retired in favor of "Decided by Shiva."
- **v3** (July 29, 2026): revised decision #4 — instead of shipping the six wholesale dollar figures with a "verify before publish" flag, removed them from lesson copy outright. Reasoning: none were doc-verified, and hardcoded prices go stale the moment Marketplace changes, which risks misleading a partner pricing a real deal. Step 7 beat 6 and the source-map row updated accordingly; the framework and the two retail benchmark examples stay, the exact tier/setup/optimization numbers do not.
