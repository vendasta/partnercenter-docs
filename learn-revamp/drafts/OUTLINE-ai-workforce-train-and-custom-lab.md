# Outline spec: Hire your first AI Employee — steps 4 and 5 (Train your AI Employee, Build a Custom AI Employee)

**Status:** Draft for Shiva review (per HANDOFF.md: Shiva approves outlines and steps within a path; Cal gives per-path critique and PR-level approval). No lesson copy gets written until this is approved.
**Date:** July 21, 2026
**Author:** Claude, from the two 360Learning courses Shiva provided (`AI Receptionist Setup & Configuration`, `Meet Your First AI Employee — The AI Receptionist`, both source material for ET-690) plus repo recon.
**Parents:** learn-tab-ia-spec.md Path 3 lessons 5 and 7, partner-call-insights.md pain point 3 and jobs 4.2/4.8, PROPOSAL-lab-pattern.md, HANDOFF.md, implementation-plan.md execution log.
**Scope:** Steps 4 and 5 of the path's 7. Steps 1-2 (Meet your AI Workforce, Put a receptionist to work) are already shipped on the branch. Steps 3, 6, 7 (Teach it to book, Autopilot, Sell and manage) are **not** covered here — see "Not in this outline."
**Coordination note:** HANDOFF.md flags another session as having been mid-restructure of `training/ai-workforce/`. Confirm that is resolved and check `git status` before any of this becomes real lesson copy.

## The angle

Steps 1-2 already taught the roster and the deploy-and-audit decision. These two steps are where the workforce stops being "configured" and starts being **run**: fixing an employee that gave a wrong answer, and building one from nothing for a job the pre-built roster does not cover. Both steps are hands-on under the state-change test in PROPOSAL-lab-pattern.md (fixing knowledge and capabilities changes real state; building a custom employee changes real state), so both carry the `lab` tag.

## Where the two uploaded courses actually landed

The courses are richer on configuration mechanics than the two stub descriptions suggest, but most of that material is **already shipped** in steps 1-2 (chat vs. voice, SMS/A2P, the ten-question audit, where leads land). What is left over maps like this:

| Course material | Where it lands | Notes |
|---|---|---|
| Purpose/Role prompt writing, best practices (short sentences, specific tone, unsure-handling) | Step 4, beat 5 (guardrail) and step 5, beat 3 (role prompt) | Confirmed against `ai_workforce_overview.md` and `ai-chat-receptionist/index.mdx`: the field is **Purpose**, labeled **Role** specifically on Chat/Voice Receptionist. Already used correctly in shipped steps. |
| Knowledge source types (Business Profile, Website Scrape/Follow Links, Uploaded Documents, Auto-Refresh) | Step 4, beats 3-4 | `knowledge-base.md` confirms Business Profile, Website Content, Custom Documents, Manual Entries; "Auto-Refresh" as a named toggle is not confirmed in docs I read — treat as a course claim needing a UI check, not a hard citation. |
| "Autonomy Level" (default Level 3: Autonomous) | **Included** — Shivapriya confirmed this directly in the live product; see the Verification log below for the signed, dated attestation. It doesn't appear in the `businessapp-docs` pages I checked, so that's a documentation gap worth flagging separately (tracked as `implementation-plan.md` WI-7 item 5), but the feature is real. Folded into Step 5 (where an employee's profile is first set up), with a short callback in Step 4. | Tag as `[VERIFIED IN-PRODUCT — Shivapriya, 2026-07-23, screenshot attached]` rather than `[DOC]` until the docs team adds a page for it. |
| Channel setup table, web chat install options, voice call-handling options | Already shipped (step 2) | No new beat needed. |
| My Listing demo / Try It testing | Already shipped (step 2); reused in step 4's re-test beat | `ai-chat-receptionist/index.mdx` adds a tier gate the course does not mention: My Listing requires **Local SEO Standard** active. Flag if re-citing. |
| Conversations tabs (Inbox/Closed/Anonymous), Explanation feature, Associated Contacts | Already shipped (step 2); Explanation reused in step 4 | |
| "Train it like a teammate" loop (review → improve → repeat), guardrails, misconception vs. reality | Step 4, primary spine | Matches `partner-call-insights.md` 4.2 almost beat for beat; the call evidence is more specific (exact price-hallucination and over-prompting language) than the course, so the call evidence leads and the course corroborates. |
| Elite Web Professionals case study, before/after metrics table | Step 7 (Sell and manage) — **not drafted here** | Good material for that step whenever it gets outlined; flagging so it is not lost. |
| Full configuration walkthrough (name/photo, capabilities/channels table, demo testing) | Step 5, reframed | The course configures the **pre-built** Chat Receptionist; step 5 is building a **custom** employee from blank. Same underlying screens (Profile, Capabilities, Knowledge, test), different starting point — confirmed consistent with `custom-ai-employees/index.md`. |

## Source map

| Source | Role | Constraint |
|---|---|---|
| `AI Receptionist Setup & Configuration` (360Learning, uploaded) | Configuration mechanics, best practices, demo testing | Tag `[COURSE]`; every course claim gets cross-checked against a `[DOC]` before it can stand alone. Unresolved course claims do not ship (same discipline as `[SYN]` in the skill file). |
| `Meet Your First AI Employee — The AI Receptionist` (360Learning, uploaded) | Value framing, training loop, guardrails, case study | Same `[COURSE]` discipline. |
| `businessapp-docs` `business-app/ai/ai-workforce/ai_workforce_overview.md`, `ai-chat-receptionist/index.mdx`, `ai/knowledge-base.md`, `ai-capabilities/index.mdx`, `ai-capabilities/creating-custom-capabilities.md`, `ai-workforce/custom-ai-employees/index.md` | Canonical product facts for both steps | Verified directly this session (see mapping table above for what did and did not check out). |
| `learn-revamp/partner-call-insights.md` sections 3 and 4.2, 4.8 | Field evidence: the exact CS metaphors ("knowledge is the degree, capabilities are the skill," "go break it," "garbage in, garbage out") and the price-hallucination story | `[CALL]`, already vetted into the IA spec; carried forward, not re-derived. |
| `learn-revamp/learn-tab-ia-spec.md` Path 3, lessons 5 and 7 | The canonical scope for these two steps, pre-dating the course upload | Primary scope authority where it conflicts with the courses. |
| `learn-revamp/drafts/PROPOSAL-lab-pattern.md` | Lab anatomy (Lab callouts, go/do/confirm, "What you now have") | Provisional — see structural decision 1. |

## Decided by Shiva (July 21)

1. **Difficulty.** Step 4 stays Beginner (it's the natural next move after step 2). Step 5 is Intermediate, since it's the first step where the learner touches something more technical (setting up a real tool/API call). This is just a small label shown at the top of the step, telling the learner how hard it is before they start — it doesn't move the step or change the order; step 4 still comes right before step 5.
2. **The "reset to default" button.** Not naming a specific button in the copy. Instead of saying "click X button," the lesson will just say something true either way, like "you can always undo a change" — safe regardless of the exact UI, and nothing to verify before writing.
3. **Step 5's boundary with the Builder track.** Keeping step 5 light: one simple example (a single lookup, like checking a price or an order status), and pointing anyone who wants to do more toward the more technical Builder section Cal owns, rather than teaching deep API/webhook stuff here.
4. **Every step is a lab.** Shiva's standing direction: every step under the Learn tab gets the full lab treatment (the `lab` tag and the `:::info Lab:` callout pattern from PROPOSAL-lab-pattern.md), not just the steps that pass the narrower "state-change test" in that proposal. Both steps in this outline already used the lab pattern, so no change needed here, but this is now the rule for every future step in this path (and presumably the whole Learn tab), including ones that read as conceptual today (Meet your AI Workforce, Sell and manage). Noting this so it carries into the next outlines, and flagging that the already-shipped steps 1-2 may want a retrofit pass at some point to match, though that's not part of this outline.
5. **Autonomy Level is real — include it.** See the mapping table above; folded into Step 5.

6. **Sensitive-vertical guardrail.** Keep it, framed as a good-practice tip rather than an official product rule: for businesses in fields like healthcare or legal services, the AI avoids giving specific professional advice and hands off to a person, and refers to "customers" rather than "patients" or "clients" in a clinical sense. Sourced from partner-call evidence, not official documentation — worded so the copy never claims it's a documented feature.

## Still open

None. All open items are resolved.

---

## Step 4: Train your AI Employee (Beginner, lab, ~15 min)

**Outcomes:**
- Audit an AI Employee's answers, prices included, before a client meets it.
- Fix a knowledge source that is producing wrong or outdated answers.
- Write a guardrail capability that stops price hallucination.
- Sort a fix correctly using "knowledge is the degree, capabilities are the skill."
- Re-test with Explanation and read what the AI actually used to answer.

**Ground (first sentence under first heading):** by the end of this step, your own receptionist from step 2 answers your ten hardest questions correctly, with a guardrail in place so it never invents a price again. Environment: your own Partner Center, the same employee step 2 deployed.

**Beats:**
1. Opening descriptor: an AI Employee only ever answers with what it was given; a wrong answer is a training gap, not a defect. [SYN, voice rule 3 — coaching framing, not error framing]
2. Callback by concept (no step numbers) to the ten-question audit from earlier: run it again, deliberately, on the employee now doing real work. [CALL 4.2 beat 1; COURSE both PDFs' audit/FAQ framing corroborates]
3. Lab: fix the source, not the AI. Copy real package and price details into a clean document and upload it to Knowledge Sources as the authoritative source; auto-imported marketplace content can carry broken links or no usable pricing. [DOC knowledge-base.md "Custom Documents"; CALL 4.2 beats 2-3]
4. The Knowledge Base vs. Capabilities split, taught at the moment it matters: knowledge is retrieved when relevant; anything that must hold in *every* response belongs in a capability instead. [DOC knowledge-base.md "Knowledge base vs. capabilities" tip]
5. Lab: write and save a guardrail capability — quote only from the published list, never generalize, otherwise capture contact details and offer a human. [DOC ai-capabilities/creating-custom-capabilities.md steps 2-3 "Writing effective capability prompts"; CALL 4.2 beat 4]
6. Prompt-length discipline: instructions compete with each other in one working memory; short and specific outperforms long. [CALL "over-prompting"; COURSE "best practices: short sentences"]
7. Sensitive-vertical aside, one line: regulated businesses redirect rather than answer specifics directly, in the client's own vocabulary. Framed as a good-practice tip, not a cited product rule. [CALL 4.2 beat 7 — decided, keep]
8. Lab: re-run the audit against the new knowledge and guardrail. Use Explanation on any answer to see exactly which knowledge or capability produced it. [DOC ai-chat-receptionist/index.mdx "Monitor and improve"; knowledge-base.md Explanation FAQ]
9. The operating mindset, in the field's own words: a new employee, not a setting — coach and correct continuously; garbage in, garbage out. [CALL, pain point 3 mental model]
10. The sandbox habit: deliberately testing an employee to find its gaps is the fastest way to improve it; a change that goes wrong can always be undone. [CALL pain point 3; worded so it holds true without naming a specific button — decided]
11. Short callback: as an employee earns trust through this training loop, its autonomy level can move with it (introduced properly in the next step's build). [SYN — forward pointer only, no step number named]

**Components:** LessonHeader (`lab`, Beginner, ~15 min, Required: "Partner Center access," "An AI Employee with Knowledge Sources and a Capability, such as your receptionist from step 2"). Two to three `:::info Lab:` callouts (upload the price list; write the guardrail capability; re-test with Explanation). "What you now have" before the knowledge check. LessonFooter → `/learn/ai-workforce/custom-employee-lab`.

**Knowledge check:** placement (does this belong in knowledge or a capability); what Explanation shows; why a short guardrail beats a long one; the "degree vs. skill" framing applied to a new scenario.

---

## Step 5: Build a Custom AI Employee (Intermediate, lab, ~18 min)

**Outcomes:**
- Start a custom AI Employee from an outcome statement, not a feature list.
- Write a role prompt and connect the knowledge and capabilities that outcome needs.
- Set an autonomy level that matches how much you trust the role on day one.
- Add one custom capability with a simple tool.
- Test against a pass/fail script before calling it done.

**Ground:** by the end of this step, a custom AI Employee built for one outcome you chose is live, answering from its own knowledge and capable of one real action through a tool you configured. Environment: your own Partner Center.

**Beats:**
1. Opening descriptor: every employee so far came pre-built; this one starts blank, defined entirely by what it needs to accomplish. [DOC custom-ai-employees/index.md "start as a blank slate"]
2. Outcome-first design: name the result before naming the employee ("qualify inbound leads before booking," not "build a sales bot"). The three built-in custom examples (Data Analyst, Inside Sales Representative, Support Employee) are patterns to steal from, not a checklist. [DOC custom-ai-employees/index.md "When to build" list; CALL 4.8 beat 1 "start from the outcome, work backwards"]
3. Lab: create the employee (name, avatar, profile), set its autonomy level, and write its role prompt — personality, voice, and behavioral rules the rest of the build runs on. Autonomous is the highest level and the usual starting default (softened per Cal's PR #796 review, so the line survives a UI change): it manages full conversations, collects leads, and books appointments on its own, and every conversation stays reviewable. [VERIFIED IN-PRODUCT — Shivapriya, 2026-07-23, screenshot attached — not yet in businessapp-docs, flagged as a docs gap (implementation-plan.md WI-7 item 5); DOC custom-ai-employees/index.md setup steps 1-2 for the rest of the profile]
4. Lab: connect the knowledge sources and turn on the built-in capabilities the outcome needs (for example, lead capture, booking). [DOC custom-ai-employees/index.md setup steps 3-4]
5. Lab: add one custom capability with a simple tool — an ID, a description, a method and URL, the parameters it needs before it can act. [DOC creating-custom-capabilities.md steps 2-4, "Example custom capability: Product information lookup"]
6. Writing the capability prompt: say exactly when to call the tool, what must be known first, and how to use what comes back — brief it like a new hire's task, not a paragraph of context. [DOC creating-custom-capabilities.md "Writing effective capability prompts"; CALL 4.8 beat 2 "draft with an AI assistant, then trim"]
7. Lab: assign a channel (web chat is fastest to test) and run a pass/fail script — a phrasing that should trigger the capability, one that should not, one with missing information. [DOC creating-custom-capabilities.md step 5, "Testing and troubleshooting"]
8. Where this stops: chaining multiple tools and systems through middleware and webhooks is deeper water than one employee needs on day one; [doc link to the integration landscape] when a job needs more than this. [Deferral, matches AI foundations step 5's pattern; honors HANDOFF's builder-track boundary — decided]

**Components:** LessonHeader (`lab`, Intermediate, ~18 min, Required: "AI Workforce admin access," "A simple API to test against, or use the lookup pattern in the linked guide"). Three to four `:::info Lab:` callouts (create + role prompt; knowledge + capabilities; custom capability + tool; test). "What you now have" before the knowledge check. LessonFooter → `/learn/ai-workforce/autopilot`.

**Knowledge check:** outcome-first vs. feature-first placement; knowledge vs. capability vs. tool triage on a new scenario; what the pass/fail test catches that one chat message does not.

---

## Not in this outline (scope fences)

- **Teach it to book** (step 3): calendars, booking links, business-hours call routing. Neither uploaded course touches this at all. `businessapp-docs` has substantial My Meetings / booking-links material (`crm/My meetings/`) confirmed present; needs its own outline pulling from there plus `learn-tab-ia-spec.md` lesson 4, not from the courses.
- **Put your workforce on autopilot** (step 6): smart lists and automations. Not covered by the courses; separate outline from `partner-call-insights.md` 4.3/4.10 and the automations docs.
- **Sell and manage** (step 7): the Elite Web Professionals case study and before/after metrics table from course 2 are good material here, noted in the mapping table above, but the step's primary scope (positioning, champion wedge, adoption tiers, packaging/pricing) comes from `learn-tab-ia-spec.md` lesson 10 and is not drafted in this outline.
- No webhook, middleware, or multi-tool chaining depth in step 5 — that is the Builder track's territory.

## Verification log

Per CalCooper's PR #782 review (the `[VERIFIED IN-PRODUCT]` tag proposal): a claim the docs don't cover needs a human's own first-person sign-off, not a model relaying that a check happened. Logging that signature here.

> **Shivapriya, 2026-07-23:** I personally checked this in the live product. When you create a new AI Employee, autonomy defaults to Level 3, Autonomous. That default is fixed — you can lower the level afterward if you want closer review while the employee is new, but the starting default itself isn't something you can configure. Screenshot attached: `learn-revamp/drafts/img/autonomy-level-3-default-verification.png` (pending upload).

This satisfies the `[VERIFIED IN-PRODUCT — Shivapriya, 2026-07-23, screenshot attached]` tag used in the source-map table and beat 3 above. Standing flag per Cal's rule: this claim should graduate to a real `[DOC]` citation once businessapp-docs covers the autonomy default — tracked as `implementation-plan.md` WI-7 item 5.

## Changelog

- **v5** (July 23, 2026): Autonomy-level wording softened to "highest level and the usual starting default" per Cal's PR #796 review (survives a UI change without being wrong). `[CONFIRMED IN-PRODUCT]` tags upgraded to the new `[VERIFIED IN-PRODUCT]` format with Shivapriya's signed, dated, screenshot-backed attestation (see Verification log). Feeds WI-7 items 5-7 in implementation-plan.md.
- **v4** (July 21, 2026): Sensitive-vertical guardrail line confirmed — keep it, framed as a good-practice tip rather than a documented feature. Every open item is now resolved; ready to move to lesson copy.
- **v3** (July 21, 2026): Difficulty confirmed (step 4 Beginner, step 5 Intermediate — it's just a label, doesn't change step order). Reset-to-default wording settled (describe the behavior, don't name a button). Step 5's stop point confirmed against what the Builder track owner would want. Only the sensitive-vertical guardrail line is still open, re-asked in plain language in chat.
- **v2** (July 21, 2026): Shiva confirmed Autonomy Level is real in-product — restored, folded into Step 5's build beat plus a callback in Step 4. Locked in "every Learn tab step is a lab" as standing direction, both steps already matched it. Renumbered the remaining open decisions.
- **v1** (July 21, 2026): initial outline, built from the two 360Learning courses Shiva uploaded for ET-690, cross-checked against `businessapp-docs` (connected this session), `partner-call-insights.md`, `learn-tab-ia-spec.md`, and `PROPOSAL-lab-pattern.md`.
