---
name: learning-path-writing
description: Write or edit learning path content under docusaurus/training/ (the LEARN tab at docs.vendasta.com/learn). Use whenever creating, rewriting, or reviewing a learning path step, path overview, the Learn home, or their diagrams and knowledge checks. Encodes the editorial rulebook established with Cal Cooper in July 2026 — voice, sourcing, structure, diagrams, and the review loop. Do not commit learning path content without a human review pass.
---

# Writing learning paths

Every rule in this file was earned by critiquing a real, shipped step line by line. The reference implementation is `docusaurus/training/getting-started/the-vendasta-platform.mdx` — when in doubt, match it. The strategy documents behind this work (IA spec, partner-call evidence, implementation plan) live in Cal's workspace at `~/mydev/strategy/docs-learn-revamp/`.

## The one-sentence version

Confident, factual, concise steps inside sequenced learning paths: open with what the learner is looking at, verify every claim, teach behaviors over mechanisms, link documentation as help rather than homework, and never imply the platform is confusing.

## Vocabulary

- The sequences are **learning paths**. The units are **steps** (or unnamed). The word "lesson" never appears in learner-facing copy. "Lab" is reserved for hands-on build steps.
- No activity-type markers. Never label sections with standalone **Read** / **Do** / **Watch** / **Verify** lines (an inheritance from an older doc site, fully removed in July 2026). The step heading and the prose carry the mode; "Try it now" callouts carry the action.
- Product names exactly as branded: Partner Center, Business App, AI Employees, Conversations AI, My Meetings, Marketplace, Executive Report, Vibe.
- "Local businesses," not SMBs, in learner-facing copy.
- **Name concepts and patterns with the base verb, not the -ing gerund.** "Ask" and "Announce," not "Asking" and "Announcing"; a flip-card front or a pattern name takes the base form. Natural verb use inside a sentence is fine ("your receptionist asking the calendar"); it is labels, headings, and concept names that must not be gerunds. Cal, July 7: "I hate ing everywhere."

## Voice rules (each of these killed real copy)

1. **The platform is never the problem.** No "confusing," "trips people up," "tricky," "be careful," or any framing that implies mistakes are easy. State rules affirmatively.
2. **No fear.** Open with what a setup unlocks, never what mistakes cost. Warnings, edge cases, and troubleshooting live in documentation and are linked at the moment of need. (Scripts that help partners address their clients' fears are fine; fear aimed at the partner is not.) **No confidence-undercutting reassurance either:** never tell the learner they do not need to be technical, do not need to code, or that a path "starts in plain English" or "builds that comfort." Naming the worry plants it, and the line is redundant. Assume competence and teach directly. (Cal, July 7: "it's redundant and doesn't build confidence.")
3. **No mistake stories.** Field stories appear only when they show partners building, improving, and winning. "She did everything right in the wrong workspace" is not a story we tell. Coaching an AI Employee to get better answers is craft, not error.
4. **Openers are descriptors, not dramas, and the copy never narrates the path.** Open with the subject itself, not the step ("AI arrived into businesses that were already partly automated", never "This step covers..."). No touring ("the next five steps...", "the final step returns to this"), no recapping ("the previous step ended on..."), and no naming steps by number in body copy; the sequence is visible in the chrome, and paths are short enough that the story carries itself. Light callbacks by concept ("that old sorting tool") are fine. Never open with "we hear from partners" or any Vendasta-centered framing.
5. **"It should be apparent."** If a concept needs a story or a metaphor to seem learnable, the explanation is wrong. Rewrite until the fact carries itself.
6. **Teach the behavior, footnote the mechanism.** Lead with what to do ("log activity in the CRM company; activate and bill on the account"), then the system explanation, briefly.
7. **No absolutes.** "Everything happens in two places" is false the moment Vendor Center exists. Say "two main workspaces" and survive the exceptions.
8. **No change management or future state.** Present tense, current product. No roadmap, no "this is moving," no "coming soon" inside path steps.
9. **No contractions** ("you will," not "you'll"; "it is," not "it's"). Exception: "let's" in walk-through invitations and handoffs.
10. **Concise and factual with a storytelling rhythm.** Short sentences that hand off to each other. Cut anything the learner does not need to act or understand.
11. Sentence-case headings, no end punctuation on headings, no emojis, no em dashes (use commas, colons, or parentheses).
12. **If it confuses the reviewer, it confuses the learner.** Never defend copy by explaining it; rewrite it.
13. **Speak to "you."** The learner IS the partner: never "partners can," "agencies," or "the agency" when it means the reader. "Partner Center is where you streamline operations," not "Partner Center streamlines operations for agencies." Their businesses are "your clients." (Third person is fine only inside quiz distractors that name other actors.)
14. **Remember the audience.** No internal implementation details a partner does not need (multiple PIDs for training/testing/demos, internal team structure, how Vendasta runs things behind the scenes). If it does not change what the learner does, it does not belong.
15. **No community or feedback mentions.** There is no forum, no community, no course feedback channel. Never write "ask in the forum," "share with the community," "provide feedback," "Happy learning!" or any invitation to discuss the course. The step ends with the LessonFooter, nothing after it.
16. **Scope every "the platform has..." claim.** "Two places/workspaces in the platform" means exactly one thing: Partner Center and Business App. Anything narrower must name its container explicitly: the CRM is "inside Partner Center," roles are "two ways your team sees Partner Center," records live "in Partner Center." Never let a sentence like "the platform has two primary interfaces" resolve to something other than the two workspaces — that conflation is the single most disorienting mistake for a new partner.

17. **Teach the knowledge; never narrate what it does for the learner.** No "worth saying to clients exactly this way," no "this is what makes you sound like an expert," no "this is the pitch." The expert-to-their-SMBs angle is served by the content itself: concrete scenarios ("sooner or later a client asks...") and outcome bullets are fine; coaching commentary about selling or sounding smart is not. If a sentence is about the learner's image rather than the platform, delete it.

## Facts and sourcing

18. **Verify every platform claim against documentation before writing it.** Canonical sources: this repo's `docusaurus/docs/` for Partner Center, docs.businessapp.io for Business App and Vibe, developers.vendasta.com for APIs. Watch for tier gates: capabilities available only on select paid tiers or to enterprise partners (e.g. white-label product renaming) are never advertised in beginner paths — either scope them explicitly or leave them to documentation.
19. **Source-tag at draft time** in the review copy (never in published content): `[DOC]` verified with path, `[CALL]` from partner-call evidence, `[SYN]` synthesis or inference, `[INT]` internal signal. Every `[SYN]` is resolved before publish: verify it, soften it ("a pattern many partners use"), or consciously own it as editorial guidance.
20. **Where documentation and field practice differ, state both in one breath** (design and practice), e.g. Business App is client-facing by design and frequently partner-operated in practice.
21. **Two-brand clarity.** White-label surfaces involve the partner's brand and the client's brand; whenever both are in play, name where each lives (the workspace wears the partner's brand; the client's brand is data inside it).
22. **Describe AI Employees by who they serve, never the channel.** "Serving your business," not "on your website" — voice lines and off-platform sites exist.

## Structure of a step

Every step, in order:

1. **Frontmatter**: `title` (sentence case; quote the YAML if it contains a colon), `sidebar_position`, `description`.
2. **Component imports and wrapper**: `InlineHighlighter` wrapping the body, `CourseProgressBar` at top, `SectionFeedback` before the knowledge check, `MarkComplete` after the closing wrapper. `courseId` is the kebab-case filename; `site="vendasta_learn"`. (These are currently inert except KnowledgeCheck; keep invoking them.)
3. **`LessonHeader` component** (`@site/src/components/LessonHeader`), directly after CourseProgressBar — never hand-rolled header markup, and never the older `:::info Before you start` / `:::tip What you will be able to do` callouts:
   - `difficulty`: exactly one of Beginner, Intermediate, Advanced.
   - `video`: set when the step contains video content (light blue tag). `lab`: set for hands-on build steps where the learner leaves with something made (purple tag). No other tags exist; there is no Self-Paced.
   - `time`: honest estimate; when unsure, estimate low.
   - `required`: TECHNICAL requirements only (something breaks without it) — access level, product activations, connected assets. Omit for "None". Recommended prior reading is never a requirement. The word is "Required," not "Prerequisites."
   - `outcomes`: learner-verb-first bullets (this replaces the old "What you will be able to do" callout).
   - `pathName` / `step` / `totalSteps`: the step's position, e.g. Getting started · Step 4 of 8. Update totalSteps across the path when steps are added or removed.
   - No Related docs block and no note callout in the header — doc links live in the body at the moment of need (rule below).
4. **No standalone opener.** Nothing sits between LessonHeader and the first section heading. The first sentence under the first heading does the descriptor work (rules 4-5 above); orphan paragraphs above the first heading read as filler and get cut.
5. Getting started steps assume a new partner: no veteran skip lines there; skip affordances belong only to mixed-audience paths.
6. **Body sections.** Any section specific to one workspace opens with an italic location marker: `*You are here: Partner Center. Everything in this section happens in your workspace.*` Sections that span both stay unmarked.
7. **At least one `:::tip Try it now`** micro-action, however small.
8. **Doc links are tags, not tours.** Link documentation only where a task naturally needs it, phrased as help: "When you are ready to create your first account, [this guide walks you through it](...)". Noun-tags on first mention (e.g. [accounts](/accounts)) are fine. Never narrate what documentation exists or covers ("the Business App documentation covers that whole world" is banned). The learning path is self-sufficient.
9. **Knowledge check** (see below).
10. **Footer handoff**: the `LessonFooter` component (`@site/src/components/LessonFooter`), last element before the closing wrapper — never a prose handoff sentence. `to` points at the next step in the path; on the FINAL step it points at the next path's overview and also passes `nextPathName` (e.g. "Hire your AI Workforce"). Pass the same `pathName`/`step`/`totalSteps` as the LessonHeader — the component detects the final step from them and switches the copy automatically ("Congratulations! You have completed this learning path." + "Keep learning: <next path>"); mid-path steps render "Congratulations, you completed this step!" + "Keep learning". Do not override the copy per step.

## Diagrams

23. **Diagrams show structure; prose explains flow.** The prose never restates the diagram's contents; the diagram never attempts nuanced relationships (that is what sentences are for). If a diagram element needs repeated correction, delete it — the two-box ecosystem diagram lost its arrows for exactly this reason.
24. **Every arrow must read truthfully in the direction it points.** If the label describes something the other end wants, the arrow is lying.
25. **The diagram never repeats the heading that introduces it.** The section heading names; the diagram shows.
26. Mechanics: SVG in `img/` beside the content; reference with a markdown image (renders inline via svgr) wrapped in the standard styled div (`border: '1px solid #e0e0e0'`, `borderRadius: '8px'`, `boxShadow: '0 2px 8px rgba(0,0,0,0.08)'`, `padding: '8px'`, `background: '#ffffff'`, `marginBottom: '28px'`). Trim empty canvas from the viewBox. Descriptive alt text. Brand palette: Vendasta green #3F9B63, navy #072337, platform blue #1976D2.
27. **Metaphors: commit everywhere or nowhere** — default nowhere. A metaphor that appears only in headings is residue, not a theme.

## Knowledge checks

28. **No heading above the component** — its own "Knowledge Check" header carries the section.
29. **Use the `intro` prop to name the actual content** ("Three quick questions on the two workspaces, the two records, and where AI Employees live"), never quiz mechanics.
30. Questions test **placement and decisions**, not recall. All options matched in length and register (length is a tell). Verify distractors against documentation: a "wrong" answer must not accidentally describe a real workflow.
31. Pool may exceed `sessionSize` for variety (e.g. 3 shown from 4).

## Flip cards

- Flip cards **introduce concepts, in place** — use them where a set of two or three sibling concepts first appears (a triad of tools, roles, records, building blocks). They are not a recall block: there is no end-of-step "Key takeaways" or "Key resources" section, ever. The knowledge check is the test.
- **Two or three cards, never more** (the FlipCardGrid component hard-caps at three).
- Front = the concept's name (the component centers it in the card); back = what it is and the one consequence worth remembering, left-aligned. `subtext` only when it differentiates the cards within the set — if every card would carry the same label, omit it. A one-line lead-in ties the set to the surrounding prose ("Three roles cover your team. Flip each one to see what it can do:").
- The flip affordance is built in: every card renders the same circular flip-arrow badge. There is no per-card icon prop; do not try to theme cards individually.
- Sizing and styling live in the component (fixed equal card heights; soft blue front matching the diagram's Business App blue #e9f1fa, navy text, no border) — never inline-style a flip card.

## Repo authoring contract (from the repo CLAUDE.md — these still apply)

- Never a literal `>` in markdown (use `→` for UI paths); callouts via `:::tip` / `:::info` / `:::warning`; bold for UI elements; kebab-case filenames; images in `img/` beside content with the standard style; every moved or renamed page gets a client-redirect entry (case-sensitive URLs); the redirects block in `docusaurus.config.ts` has a Learn section — case-only renames go in `nginx.conf` instead (they collide with real output paths on case-insensitive filesystems).

## The review loop (non-negotiable)

32. **Draft → review copy → human approval → commit.** Never commit learning path content without review. The review copy goes to `~/mydev/strategy/docs-learn-revamp/drafts/` as plain markdown: interactive components shown as labeled blocks, source annotations included, and a numbered changelog of what changed each revision.
33. **Verify the build, then verify the render.** `npm run build` from `docusaurus/`, then check the built page content (grep the HTML, or the JS bundle for SVG text) and eyeball it served locally. Scripts can report success while doing nothing — the rendered output is the only truth. `onBrokenLinks` is 'warn', so grep build output for warnings; CI will not catch content mistakes.
34. Expect and welcome multiple critique rounds. The reference step took eight. Every correction that generalizes becomes a rule in this file — keep it living.
