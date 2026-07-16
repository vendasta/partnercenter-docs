# Proposal: the lab pattern

**For:** Cal, sign-off
**From:** Shiva + Claude, July 7, 2026
**Status:** Draft v1, not committed anywhere learner-facing
**Assignment:** HANDOFF.md "Your first thinking assignment: what is a lab?" — define what earns the `lab` tag, define the repeatable inside-of-a-lab treatment, propose which existing steps and stubs are labs. On sign-off, sections 4 and 5 enter the skill file verbatim and the retag table in section 6 gets executed.

---

## 1. The problem this solves

Six steps currently carry the purple `lab` tag, and each one improvises the inside differently [DOC: grep of `lab` prop across `docusaurus/training/`]:

- `getting-started/accounts-and-users.mdx` and `customize-and-brand.mdx` use timed section headings ("Step 1: Know the two records (3 min)") inherited from the ported lessons.
- `builder/the-builder-lab.mdx` uses one numbered build-in-chunks list, no screenshots, no navigation paths.
- `ai-workforce/put-a-receptionist-to-work.mdx` is essay prose with two Try-it-now callouts.
- `builder/authenticate-and-first-api-call.mdx` and `builder/custom-tools.mdx` carry the tag with the entire hands-on motion living inside a single Try-it-now.

Nothing defines what earns the tag or what a learner should expect after seeing it. The builder lab cannot be finalized without the answer, and every growth-engine step about to be written needs it on day one.

## 2. Sources studied

1. **The citizen-developer lab pattern** Cal pointed at: the `code-lab-creation` skill in the citizen-developers-docs repo. Its canonical structure: metadata contract up front, numbered single-action steps under action-oriented headings, a confirm signal after every action sequence, explicit verification checkpoints, a closing summary that mirrors the outcomes. [DOC: citizen-developers-docs `.claude/skills/code-lab-creation/SKILL.md`]
2. **The six lab-tagged steps** in this repo (listed above) plus the closest docs-side equivalent, `docs/ai/ai-capabilities/creating-custom-capabilities.md` (prerequisites, numbered UI steps, tips at decision points).
3. **The learning-path-writing skill**, all 34 rules, which constrain what can be stolen.

**What we steal from the citizen-dev pattern:** the skeleton. Numbered steps that are one action each, action-oriented headings, a confirm signal after every action sequence ("every Do step must have a confirm signal" is its quality bar), outcomes that match the closing summary, screenshots at points of orientation.

**What we deliberately do not steal, and why:**

| Citizen-dev element | Verdict | Reason |
|---|---|---|
| **Read / Do / Verify** type labels | No | Banned by the skill's vocabulary rules; activity-type markers were removed repo-wide in July 2026 |
| Per-step "(X min)" estimates summing to a total | No | One honest estimate lives in LessonHeader; headings stay clean. The two Get started labs that still carry timed headings get cleaned when touched |
| FAQ / troubleshooting section | No | Voice rules 1-2: labs stay affirmative; troubleshooting lives in documentation, linked at the moment of need |
| Badge row, metadata bar, info-sidebar JSX | No | LessonHeader already carries difficulty, tag, time, Required, and outcomes |
| Opening note callout | No | Structure rule: nothing sits between LessonHeader and the first heading |

## 3. What earns the `lab` tag: the state-change test

**A step is a lab when its core motion changes real state in the platform.** An account created, a logo uploaded, a Snapshot run, a calendar connected, an AI Employee configured, a webhook test-fired. If the learner leaves the step having changed something, it is a lab.

What does not qualify: navigating somewhere to look ("open **Accounts** and read the columns"), thinking exercises on paper (the AI foundations Try-it-nows), and research outside the platform. Those stay Try-it-now micro-actions.

This resolves the current conflict between the skill's tag definition ("hands-on build steps where the learner leaves with something made") and the working principle in the handoff ("if a step has the learner actually do something inside the platform"). Doing, for tag purposes, means changing something. [SYN: owned as editorial. Honors the "more labs than not" bias without letting the tag stop discriminating: 20 of the 39 non-index steps qualify under it, and 20 of 27 across the four applied paths, see section 6.]

**Three registers, one vocabulary:**

| Register | Marker | When |
|---|---|---|
| Micro-action | `:::tip Try it now` | Observe, navigate, or think; no state change. At least one per step, per the existing rule |
| Lab block | `:::info Lab: <what you set up or build>` | Every hands-on, state-changing block, in conceptual steps and lab steps alike |
| Lab step | `lab` on LessonHeader | The step's core motion is the state change; most of the body is the doing |

The learner sees the same word, Lab, on the purple tag and on the callout, so the vocabulary travels from the path overview to the block level. **Every hands-on block lives inside a Lab callout, including inside lab steps.** The callout is the go-do-return contract: it opens by naming where in the platform to go, carries the numbered actions, and closes with the confirm signal that sends the learner back to the reading. Per Cal's review (PR, July 8): a step without an explicit marker showing where to go, do the thing, and come back is not a lab, whatever its tag says. [CALL: Cal, PR review]

## 4. The anatomy of a lab step (the repeatable pattern)

Convention over component: everything below uses existing pieces (LessonHeader, `:::tip` / `:::info`, numbered lists, the standard image style). If the shape proves itself across the growth engine, extracting a component is a phase-2 option, not a prerequisite. [SYN: owned. Rationale: zero code risk before sign-off, and rules 32-34 make conventions enforceable through review.]

In order:

1. **LessonHeader** carries the promise: `lab` tag, one honest time estimate, and **Required** lists what the doing needs (access level, activations, connected assets), which is stricter for labs than for reading steps.
2. **The first sentence under the first heading names what you will have built and where you will work.** The practice environment is explicit every time: your own Partner Center, a sandbox account, or a real prospect. ("By the end of this step a real business you choose has an account, a Snapshot Report, and a linked CRM company. You will work in your own Partner Center.")
3. **Action sections under action-oriented headings, with the doing inside a Lab callout.** Headings name the motion ("Create the account", never "Overview" or "Step 3 (4 min)"). The hands-on block itself is a `:::info Lab: <what you set up or build>` callout that opens by naming where to go (**Partner Center** → **Accounts**, screenshot if the destination is unfamiliar), then numbered steps, one action per number, UI names in bold. Choices the platform offers are stated affirmatively at the step where they appear. Teaching prose stays outside the callout; the callout is purely go, do, return.
4. **A confirm signal closes every Lab callout.** One sentence, affirmative, naming what the learner now sees or has: "The account now appears in **Accounts**, and the platform has created its linked CRM company for you." This is the come-back line that returns the learner to the step. Never phrased as error-checking, never "if this did not work."
5. **Screenshots are minimal and orienting.** One per major destination change, or where the screen is genuinely unfamiliar; reuse current images from the docs guides where they exist; standard image style; PII blurred. API and terminal labs may need none.
6. **Doc links at the moment of need**, exactly per the existing rule: the lab carries the core motion inline; the linked guide carries every field and edge case.
7. **A closing "What you now have" section**, directly before the knowledge check: two to four affirmative bullets naming the state the learner created, mirroring the header outcomes. This is the lab's verification, replacing the citizen-dev Verify checkpoint in a form the voice rules allow.
8. **Knowledge check and LessonFooter** as in every step; questions test the decisions made during the lab, not recall of click paths.

**The anatomy of a lab block (tier 2)** is the same callout standing alone inside a conceptual step: where to go, numbered actions, confirm signal. Screenshots only if the destination is unfamiliar. The two tiers differ only in how much of the step the doing occupies; the callout itself is identical everywhere.

## 5. Draft skill rules (verbatim, pending sign-off)

To the **Vocabulary** section:

- Three registers of hands-on: `:::tip Try it now` for micro-actions (observe, navigate, think), `:::info Lab: <what you set up or build>` for every hands-on state-changing block (inside conceptual steps and lab steps alike), and the `lab` header tag for steps whose core motion changes real state in the platform. The word "Lab" appears only in these two mechanisms.

New numbered rules:

35. **The state-change test decides the `lab` tag.** A step is a lab when its core motion changes real state in the platform (a record created, a setting applied, a connection made, a build produced). Navigating to look, thinking exercises, and off-platform research stay Try-it-now. When in doubt, ask what exists after the step that did not exist before it.
36. **Every lab names its ground before the doing starts.** The first sentence under the first heading says what the learner will have built and where they will work: their own Partner Center, a sandbox account, or a real prospect. Required in the header lists what that environment needs.
37. **Every hands-on block is a Lab callout with a go, a do, and a return.** The doing lives inside `:::info Lab: <what you set up or build>`, in lab steps and conceptual steps alike: it opens by naming where in the platform to go, carries numbered steps of one action each, and closes with one affirmative confirm sentence naming what the learner now sees or has. Teaching prose stays outside the callout. A step without this go-do-return marker is not a lab, whatever its tag says. A lab step additionally closes with a "What you now have" section (two to four bullets mirroring the header outcomes) directly before the knowledge check. Never phrase confirmation as error-checking.
38. **Lab screenshots orient, they do not narrate.** One per major destination change or genuinely unfamiliar screen, standard image style, reused from the docs guides when current. No screenshot of a screen the numbered steps already make obvious. No per-section time estimates in headings; the header estimate is the only clock.

## 6. Retag proposal: every step, every stub

Applying the state-change test. "Keep" means the tag is already correct.

### Get started (shipped; retags here touch approved steps, flagged as open question 3)

| Step | Today | Proposed | Core motion |
|---|---|---|---|
| The Vendasta Platform | — | — | Read; Try-it-now navigates to look |
| Partner Center walkthrough | — | — | Guided tour, observation |
| Customize and brand | lab | **keep lab** | Uploads logo, sets domain, configures settings |
| Add customer accounts and users | lab | **keep lab** | Creates account, adds users, orders products |
| Organize your team | — | **add lab** | Step 4 adds real team members; step 5 verifies |
| Get set up to get paid | — | **add lab** | Connects a payment method, sets retail prices |

### AI foundations (built, in Cal's final review)

All six steps: **no tags**. Every Try-it-now is a thinking exercise or an off-platform observation by design. The path proves the boundary: hands-on is not the same as state-changing. No changes proposed.

### Your growth engine (6 stubs, Shiva writes first)

| Step | Proposed | Core motion |
|---|---|---|
| Run your first Snapshot Report | **lab** | Creates the account, runs the Snapshot |
| Turn grades into a conversation | — | Reads and interprets the learner's own report; Try-it-now territory |
| Package and price the fix | **lab** | Builds the package, sets retail prices |
| Send the order and close | **lab** | Builds and sends the order, sets payment on approval |
| Deliver in the client's Business App | **lab** | Adds users, sends the welcome email |
| Prove it with the Executive Report | **lab** (tentative) | Configures and sends the report; confirm at outline time |

Five of six: the path the handoff calls "heavily lab-shaped" comes out that way under the test.

### Build with Vibe (6 stubs, Shiva writes second)

| Step | Proposed | Core motion |
|---|---|---|
| Meet Vibe | — | Conceptual |
| Your first build | **lab** | Prompt to working landing page |
| Prompt like a builder | **lab blocks** | Technique step; the practice moments (iterating on the build, plan mode) become Lab callouts |
| Connect everything | **lab** | Connects Supabase and connectors |
| From prototype to production | **lab** | Publishes: checkpoints, hosting, domain (step itself blocked on WI-7.3) |
| Vibe as a service | — | Business motion, conceptual |

### Hire your AI Workforce (mid-restructure; proposal only, no edits until coordinated with Cal)

| Step | Today | Proposed | Core motion |
|---|---|---|---|
| Meet your AI Workforce | — | — | Roster concepts; Try-it-now observes |
| Put a receptionist to work | lab | **keep lab** | Names the employee, installs it, runs the audit |
| Teach it to book | — | **lab** | Connects calendars, configures booking and routing |
| Train your AI Employee | — | **lab** | Adds knowledge, sets guardrails, runs the coach loop |
| Put your workforce on autopilot | — | **lab** | Builds smart lists and automations |
| Build a Custom AI Employee | — | **lab** | The path's build capstone |
| Sell and manage | — | — | Scripts and pricing, conceptual |

### The builder track (Cal's; proposal only)

| Step | Today | Proposed | Core motion |
|---|---|---|---|
| The integration landscape | — | — | Off-platform research |
| Authenticate and make your first API call | lab | **keep lab** | Generates a token, upserts a real contact |
| Capabilities in depth | — | — | Design thinking on paper |
| Custom tools: connect any API | lab | **borderline, Cal's call** | See open question 1 |
| Webhooks and platform events | — | **add lab** | Creates and test-fires a real outbound webhook step |
| Advanced automations | — | — | Writes a guard condition on paper |
| The builder lab | lab | **keep lab** | The capstone build |
| Beyond the platform | — | — | Judgment framework |

Net effect: 20 lab steps across the six paths (21 if custom-tools keeps its tag), plus lab blocks where technique steps contain real doing. More labs than not in every applied path, and zero in the two concept paths, which is the shape the bias intends. [SYN: owned.]

## 7. Retrofit: accounts-and-users, before and after

Proof on real copy. Three surgical edits turn the strongest existing lab into the pattern; nothing else in the step moves. (The timed headings cleanup applies the same way to customize-and-brand.)

**Edit 1 — the opening names the ground (anatomy item 2).**

Before:

> Adding a customer puts their tools, reporting, and communication in one place under your brand. This lab walks through every step, from creating the account to ordering their first products.

After (first sentence under a first heading, per structure rule 4; "walks through every step" narration dropped per voice rule 4):

> By the end of this step, a real business has an account in your Partner Center, a user invited to your branded Business App, and its first products on order. You will work in your own Partner Center, on a business you know.

**Edit 2 — timed tour headings become action headings, and the core motion comes inline with a confirm signal (anatomy items 3-4).**

Before:

> ## Step 3: Add an account to Partner Center (4 min)
>
> This is your first step to put the business into your customer relationship manager and give your customers access to your branded Business App. Explore the Accounts Overview in Partner Center to add accounts.
>
> When you add an account, you'll enter key business details — name, location, and contact info — so the platform has a complete profile ready for products, reporting, and communication. For every field and option along the way, [this guide walks you through it](...).
>
> :::tip Try it now
> Open **Accounts** in Partner Center and start creating an account for a business you know. Even if you stop at the form, you will see exactly what the platform asks for.
> :::

After (the doing lives in the Lab callout: go, do, return; the guide keeps the fields and edge cases):

> ## Create the account
>
> :::info Lab: create a real customer account
> You are going to **Partner Center** → **Accounts** → **Manage Accounts**.
>
> 1. Select **Create account**.
> 2. Enter the business name and address, and confirm the suggested details.
> 3. Add the primary contact's name and email; this is who you will invite to Business App in a moment.
> 4. Select **Create**.
>
> The account now appears in **Accounts**, and the platform has created its linked CRM company for you.
> :::
>
> For every field and option along the way, [this guide walks you through it](...).

**Edit 3 — the close verifies (anatomy item 7).** A new section directly before the knowledge check:

> ## What you now have
>
> - A customer account in Partner Center, with its linked CRM company created automatically
> - A user invited to your branded Business App, with permissions that match their role
> - Their first products on order and activating
>
> This account is ready for everything the rest of this path does with a real business.

(Exact navigation labels in edit 2 to be verified against the accounts guide before any real edit, per rule 18.)

## 8. Open questions for Cal

1. **Custom tools (builder track):** its hands-on motion, getting a public API call working in Postman, changes nothing in the platform, and the step defers the real build to the builder lab. Under the test it loses the tag; under "the learner leaves with something made" (the raw material for the lab) it keeps it. Either answer is fine for the pattern; naming the exception matters more than which way it goes.
2. **Prove it with the Executive Report:** lab status depends on whether the outline has the learner configuring and sending the report or reading one. Decide at outline review.
3. **Get started retags** (organize-your-team, get-set-up-to-get-paid gain the tag; both timed-heading labs get cleaned): these steps are shipped and Cal-approved. Fold into the next touch of that path, or do as a small standalone pass?
4. **The builder lab retrofit** (screenshots or none, navigation paths inline): Cal's step, so the pattern application there is his edit or a handoff back.

## 9. Changelog

2. v2 (July 8, 2026): Cal's PR review folded in. The go-do-return marker is now baked into both tiers: every hands-on block, including inside lab steps, lives in a `:::info Lab` callout that names where in the platform to go, carries the numbered actions, and closes on the confirm signal (reversing v1's position that the header tag alone made the promise). Rule 37 and anatomy items 3-4 rewritten accordingly; retrofit edit 2 updated to show the callout. Pattern remains provisional pending one or two worked labs for Cal's formatting-and-wording review (run-your-first-snapshot and the full accounts-and-users retrofit proposed).
1. v1 (July 7, 2026): initial proposal. Decisions pre-made with Shiva: two-tier treatment; convention before component; minimal screenshots reusing current doc images; success criteria always; state-change test; per-lab practice-environment line; `:::info Lab` callout for tier 2; doc-links-only for troubleshooting; header-only time estimates; retrofit of accounts-and-users as proof.
