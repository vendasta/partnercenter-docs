# Handoff: Learn tab build-out (growth engine, Vibe, AI Workforce)

**For:** Shiva
**From:** Cal + Claude, July 5, 2026
**Branch:** `learn-revamp-phase1` in `~/mydev/repos/partnercenter-docs`, PR #685 (one PR, stacked commits)
**Scope and order:** one path at a time, in this order: **(1) Your growth engine, (2) Build with Vibe, (3) Hire your AI Workforce.** The builder track stays with Cal (his citizen-developer program insight feeds it directly). Product courses and Vendasta Services courses stay as they are for now; refreshing them is an end-of-quarter goal, not this work. Vibe and builder are scaffolded with stub steps so the build-out plan is visible in the repo itself.

Shiva works in Claude Code (VS Code): the writing skill loads automatically the moment learning path content is touched, so the rules travel with the work.

## Read these three things first, in order

1. **`.claude/skills/learning-path-writing/SKILL.md`** (in partnercenter-docs). This is the law. ~35 rules earned line by line across two days of Cal critiques. If you work in Claude Code it loads automatically when you touch learning path content. Reread it before every step you write; it changed six times today alone.
2. **The execution log** at the top of `learn-revamp/implementation-plan.md` (this folder). Current state of everything, plus the gotchas list.
3. **This file** for what to build and the thinking behind it.

The deeper strategy lives in `learn-tab-ia-spec.md` (what and why, per-path lesson tables), `partner-call-insights.md` (the field evidence), and `phase1-lesson-outlines.md`.

## The working loop (this is the compounding system)

1. **Outline first.** Draft `learn-revamp/drafts/OUTLINE-<path>.md`: per-step outcomes, beats with source tags, component plan, open questions. Cal approves before any lesson copy exists.
2. **Scaffold stubs** (growth-engine pattern: frontmatter + "What you will learn here" line) so the PathRoadmap links resolve and the build stays green.
3. **Write one step at a time**, strictly per the skill. Verify every product claim against the canonical docs before writing it (partner docs for Partner Center, docs.businessapp.io for Business App and Vibe, developers.vendasta.com for APIs).
4. **Review on the live preview**: `npm start` from `docusaurus/` gives a hot-reload server at localhost:3000 (ask Claude to run it). Cal reads there, not in markdown.
5. **Build gate before showing anything**: `npm run build` from `docusaurus/`, grep output for broken links touching your path, then grep the built HTML for your actual content (SVGs sometimes inline as base64, so a text grep can miss them while they render fine).
6. **Review record in `drafts/`**: source annotations per claim ([DOC] with path, [CALL], [SYN] owned or resolved, [INT]) and a numbered changelog per revision.
7. **Self-critique at least six full rounds before Cal sees anything.** Read the whole path as the skeptical partner it is written for, then as the skill checklist, then again. Today's human critique took six rounds on one path; run that gauntlet yourself first so what reaches Cal is never first-draft AI output. Every correction that generalizes becomes a new skill rule immediately, which is why later paths go faster than earlier ones.
8. **Approvals:** Shiva approves outlines and steps within a path (after studying the AI foundations path and its drafts/ changelogs as the worked example). Each completed path then goes to Cal for human critique and PR-level approval before it merges into the stack.
9. **Commit only after Cal's per-path approval.** Stacked commits on the open PR, never a new PR.

## Your first thinking assignment: what is a lab?

The Learn ecosystem is still fuzzy about what counts as a lab, and settling it is yours. The working principle from Cal: **if a step has the learner actually do something inside the platform, it should be treated as a lab** — with a screenshot of where they are going, a step-by-step, or an explicit lab callout marking the hands-on block (the citizen developer docs have the pattern to steal from). And the bias is clear: **there should be more labs than not.** Most steps in the applied paths should require going into the platform and doing the thing, not just reading about it. Before writing your first path, work through the existing steps and the stubs and propose which ones are labs, what the lab treatment looks like as a repeatable pattern (component, callout, structure), and bring that to Cal. Whatever you land on becomes skill rules, same as everything else here. The `lab` tag on LessonHeader already exists; what needs defining is what earns it and what the inside of a lab step looks like.

## The editorial philosophy in one paragraph

Tell the story and wrap the facts around it. The reader is a partner who will resell and explain all of this to local businesses, but the copy never says so: no "here is what to tell clients," no "this makes you sound like an expert," no "this step covers," no path tours, no standalone opener paragraphs (body starts at the first heading), no AI jargon (we killed "grounding"; the phone-menu decision tree is the approved foil for old-vs-new AI). The story that finally landed for the AI foundations path, and the frame for everything after it: **businesses always had automation; every workflow hit the same wall, the step that needed judgment and a conversation; generative AI is the worker on the other end of the workflow; the merger of deterministic automations and agentic AI Employees is the platform.** Steps 1 and 6 of AI foundations are the reference implementations of that voice, alongside `getting-started/the-vendasta-platform.mdx` for structure.

## State of the world (July 5)

| Path | State |
|---|---|
| Get started | Shipped on the branch (6 steps), final footer hands to AI foundations |
| AI foundations | Built (6 steps + 3 SVGs), six critique rounds applied, verified against partner docs, **uncommitted pending Cal's final pass** |
| Growth engine | **Yours, first.** 6 stub steps; outline review with Cal pending; source: `drafts/DRAFT-growth-engine.md`, Northside Dental worked example threads through. Heavily lab-shaped: the learner runs the full loop on a real prospect |
| Build with Vibe | **Yours, second.** Scaffolded (6 stubs) |
| Hire your AI Workforce | **Yours, third.** Partially built; **another session is mid-restructure** (deletions + a rename in the working tree). Coordinate with Cal before touching anything in `training/ai-workforce/` |
| Builder track | Scaffolded (7 stubs). **Cal is keeping this one** |
| Product library + Vendasta Services | Leave as they are. End-of-quarter goal, not this work |

Also parked: WI-6 billing FAQ (main docs, Haley reviews), WI-7 cross-repo flags, the partner KB-page retrieval inconsistency (task chip already spawned), and a tier-gate scoping decision on the Reputation Specialist example in AI foundations step 6 (flagged to Cal, awaiting his call).

## What to actually build

### First: Your growth engine (6 steps)

The outline seed is `drafts/DRAFT-growth-engine.md` plus the six stub steps already in `training/growth-engine/` (read the Snapshot, turn grades into a conversation, build the package, propose and close, deliver in Business App, prove with the Executive Report). The Northside Dental worked example threads through every step. This path is the natural proving ground for your lab pattern: nearly every step has the learner doing something real in the platform with a real prospect. Outline goes to Cal before lesson copy.

### Second: Build with Vibe (6 steps)

The spec table (ia-spec, "Path 4") is the outline seed. The ideas that must survive into the steps:

1. **Meet Vibe**: what vibe coding is; the differentiator is pre-loaded business context (no blank page); what partners actually build (landing pages, dashboards, the business-card-scanner story). Canonical: businessapp `vibe/index.md`.
2. **Your first build** (Lab): prompt to working landing page, the highest-frequency first use case. `vibe/getting-started.md` + `use-cases/landing-page.mdx`.
3. **Prompt like a builder**: context-rich prompting, iteration, plan mode; the field-standard credit-saving workflow (draft the prompt in Claude, paste into Vibe); the credits economy from `vibe/credits.md`, which is the canonical tier/credit table (correct any older guesses against it); "trial and error is the process, not a failure."
4. **Connect everything**: connectors (CRM, forms, analytics, SSO with its members-not-customers caveat quoted exactly, AI Employees embedded); and the prerequisite nobody documents: **Supabase as Vibe's storage/backend**, free account, one per client account, connected via Administration → Integrations; the failure mode when missing (file uploads silently fail) stalled a real client project for a month. Frame affirmatively per voice rules: what connecting unlocks, warnings live in doc links.
5. **From prototype to production**: checkpoints, hosting, custom domains (Pro + DNS) vs default domain, export boundaries (zip with git history on Pro, no WordPress export). **Blocked on WI-7.3: verify Code mode and GitHub sync with the Vibe team before writing.** This lesson partly gap-fills missing businessapp docs; keep claims verified.
6. **Vibe as a service**: the agency motion (landing pages replacing designer spend, client portals like the realtor-signs ordering portal, white-label builds), pricing patterns from the field (resell Pro at ~2x wholesale, or setup fee plus retainer), answering "how many credits will my project use?" All six use-cases files double as labs.

Voice note: Vibe rides launch momentum; the register can carry a little more energy than the concept paths, but every rule still applies.

### Third: Hire your AI Workforce (remainder)

Coordinate with Cal on the in-flight restructure before starting. The spec's Path 3 table and the content-source map 3.1–3.10 carry the lesson ideas; 3.4 (teach it to book) and 3.5 (train your employee) need CS review lead time, so they go first when you get here.

### The builder track (7 steps) — Cal's, for reference only

The audience is the partner-side builder and citizen developer, proven to exist by the calls (Make.com + DocuSign chains, multi-location voice programs). Spec table "Path 5" + content-source map 5.1–5.7. The stubs are in place. Non-negotiable accuracy rules for whoever writes it (implementation plan, "API accuracy rules"):

- Partners consume REST via developers.vendasta.com. Never mention gRPC or protos.
- Public today: CRM (flagship, ~54 endpoints), meetings (book/reschedule/cancel/availability), forms (create/list/embed; submissions are NOT a public write), reputation (mixed), conversation (2 endpoints only; do not promise a messaging API).
- NOT public: automations authoring, AI assistants, Vibe, Event Broker. Automations are UI-built (outbound webhook step with test-fire is the escape hatch).
- Say "platform events," never internal system names. OAuth2 scopes with :read variants; teach narrowest-scope discipline.

The seven: integration landscape; capabilities in depth (`creating-custom-capabilities.md` is canonical); custom tools (cURL import, four auth strategies, MCP connection; ServiceTitan connect guide as the advanced worked example); webhooks (outbound step + verifier token, inbound triggers, vendor webhooks); advanced automations (data expressions, custom objects); the lab (meeting-booking API availability→book plus CRM contact create/list through a custom tool); beyond the platform (developers.vendasta.com event catalog, vendor requirements, CRM API as flagship).

### Not now

Product courses and Vendasta Services refresh (end of quarter), WI-6 billing FAQ (separate, Haley reviews).

## Gotchas that will bite you (beyond the exec-log list)

- KnowledgeCheck shuffles questions, not options: spread `correctIndex` by hand across the pool.
- FlipCardGrid hard-caps at three cards; fronts are concept names only; no end-of-step recall blocks ever.
- LessonHeader/LessonFooter carry step position; update `totalSteps` everywhere when a path changes length.
- Restart the dev server after deleting or renaming a lesson file; hot reload does not handle deletions.

## Still open when you start

1. WI-7.3 Vibe team verification (Code mode / GitHub sync): confirm with Cal who pings them; Path 4 step 5 waits on the answer.
2. AI foundations (Path 2) is in Cal's final review; check the execution log for whether it has been committed before building on top of anything near it.
