---
name: learning-path-writing
description: Write or edit learning path content under docusaurus/training/ (the LEARN tab at docs.vendasta.com/learn). Use whenever creating, rewriting, or reviewing a learning path step, path overview, the Learn home, or their diagrams and knowledge checks. Encodes the editorial rulebook established with Cal Cooper in July 2026 — voice, sourcing, structure, diagrams, and the review loop. Do not commit learning path content without a human review pass.
---

# Writing learning paths

Every rule in this file was earned by critiquing a real, shipped step line by line. The reference implementation is `docusaurus/training/getting-started/ecosystem-map.mdx` — when in doubt, match it. The strategy documents behind this work (IA spec, partner-call evidence, implementation plan) live in Cal's workspace at `~/mydev/strategy/docs-learn-revamp/`.

## The one-sentence version

Confident, factual, concise steps inside sequenced learning paths: open with what the learner is looking at, verify every claim, teach behaviors over mechanisms, link documentation as help rather than homework, and never imply the platform is confusing.

## Vocabulary

- The sequences are **learning paths**. The units are **steps** (or unnamed). The word "lesson" never appears in learner-facing copy. "Lab" is reserved for hands-on build steps.
- Product names exactly as branded: Partner Center, Business App, AI Employees, Conversations AI, My Meetings, Marketplace, Executive Report, Vibe.
- "Local businesses," not SMBs, in learner-facing copy.

## Voice rules (each of these killed real copy)

1. **The platform is never the problem.** No "confusing," "trips people up," "tricky," "be careful," or any framing that implies mistakes are easy. State rules affirmatively.
2. **No fear.** Open with what a setup unlocks, never what mistakes cost. Warnings, edge cases, and troubleshooting live in documentation and are linked at the moment of need. (Scripts that help partners address their clients' fears are fine; fear aimed at the partner is not.)
3. **No mistake stories.** Field stories appear only when they show partners building, improving, and winning. "She did everything right in the wrong workspace" is not a story we tell. Coaching an AI Employee to get better answers is craft, not error.
4. **Openers are descriptors, not dramas.** State what the learner is looking at and what they will do in it. Never open with "we hear from partners" or any Vendasta-centered framing.
5. **"It should be apparent."** If a concept needs a story or a metaphor to seem learnable, the explanation is wrong. Rewrite until the fact carries itself.
6. **Teach the behavior, footnote the mechanism.** Lead with what to do ("log activity in the CRM company; activate and bill on the account"), then the system explanation, briefly.
7. **No absolutes.** "Everything happens in two places" is false the moment Vendor Center exists. Say "two main workspaces" and survive the exceptions.
8. **No change management or future state.** Present tense, current product. No roadmap, no "this is moving," no "coming soon" inside path steps.
9. **No contractions** ("you will," not "you'll"; "it is," not "it's"). Exception: "let's" in walk-through invitations and handoffs.
10. **Concise and factual with a storytelling rhythm.** Short sentences that hand off to each other. Cut anything the learner does not need to act or understand.
11. Sentence-case headings, no end punctuation on headings, no emojis, no em dashes (use commas, colons, or parentheses).
12. **If it confuses the reviewer, it confuses the learner.** Never defend copy by explaining it; rewrite it.

## Facts and sourcing

13. **Verify every platform claim against documentation before writing it.** Canonical sources: this repo's `docusaurus/docs/` for Partner Center, docs.businessapp.io for Business App and Vibe, developers.vendasta.com for APIs.
14. **Source-tag at draft time** in the review copy (never in published content): `[DOC]` verified with path, `[CALL]` from partner-call evidence, `[SYN]` synthesis or inference, `[INT]` internal signal. Every `[SYN]` is resolved before publish: verify it, soften it ("a pattern many partners use"), or consciously own it as editorial guidance.
15. **Where documentation and field practice differ, state both in one breath** (design and practice), e.g. Business App is client-facing by design and frequently partner-operated in practice.
16. **Two-brand clarity.** White-label surfaces involve the partner's brand and the client's brand; whenever both are in play, name where each lives (the workspace wears the partner's brand; the client's brand is data inside it).
17. **Describe AI Employees by who they serve, never the channel.** "Serving your business," not "on your website" — voice lines and off-platform sites exist.

## Structure of a step

Every step, in order:

1. **Frontmatter**: `title` (sentence case; quote the YAML if it contains a colon), `sidebar_position`, `description`.
2. **Component imports and wrapper**: `InlineHighlighter` wrapping the body, `CourseProgressBar` at top, `SectionFeedback` before the knowledge check, `MarkComplete` after the closing wrapper. `courseId` is the kebab-case filename; `site="vendasta_learn"`. (These are currently inert except KnowledgeCheck; keep invoking them.)
3. **Opening descriptor** (one short paragraph, rules 4-5 above).
4. `:::info Before you start` — **Difficulty** and **Time** only. Honest time estimates; when unsure, estimate low. **Prerequisites appear only when technically required** (something breaks without it) — recommended prior reading is not a prerequisite. Getting started steps assume a new partner: no veteran skip lines there; skip affordances belong only to mixed-audience paths.
5. `:::tip What you will be able to do` — outcome bullets, learner-verb first.
6. **Body sections.** Any section specific to one workspace opens with an italic location marker: `*You are here: Partner Center. Everything in this section happens in your workspace.*` Sections that span both stay unmarked.
7. **At least one `:::tip Try it now`** micro-action, however small.
8. **Doc links are tags, not tours.** Link documentation only where a task naturally needs it, phrased as help: "When you are ready to create your first account, [this guide walks you through it](...)". Noun-tags on first mention (e.g. [accounts](/accounts)) are fine. Never narrate what documentation exists or covers ("the Business App documentation covers that whole world" is banned). The learning path is self-sufficient.
9. **Knowledge check** (see below).
10. **Footer handoff**: one sentence that hands off to the next step, with the next step linked. Pattern: "Now that you have X down, let's walk through Y: the [next step](...)."

## Diagrams

18. **Diagrams show structure; prose explains flow.** The prose never restates the diagram's contents; the diagram never attempts nuanced relationships (that is what sentences are for). If a diagram element needs repeated correction, delete it — the two-box ecosystem diagram lost its arrows for exactly this reason.
19. **Every arrow must read truthfully in the direction it points.** If the label describes something the other end wants, the arrow is lying.
20. **The diagram never repeats the heading that introduces it.** The section heading names; the diagram shows.
21. Mechanics: SVG in `img/` beside the content; reference with a markdown image (renders inline via svgr) wrapped in the standard styled div (`border: '1px solid #e0e0e0'`, `borderRadius: '8px'`, `boxShadow: '0 2px 8px rgba(0,0,0,0.08)'`, `padding: '8px'`, `background: '#ffffff'`, `marginBottom: '28px'`). Trim empty canvas from the viewBox. Descriptive alt text. Brand palette: Vendasta green #3F9B63, navy #072337, platform blue #1976D2.
22. **Metaphors: commit everywhere or nowhere** — default nowhere. A metaphor that appears only in headings is residue, not a theme.

## Knowledge checks

23. **No heading above the component** — its own "Knowledge Check" header carries the section.
24. **Use the `intro` prop to name the actual content** ("Three quick questions on the two workspaces, the two records, and where AI Employees live"), never quiz mechanics.
25. Questions test **placement and decisions**, not recall. All options matched in length and register (length is a tell). Verify distractors against documentation: a "wrong" answer must not accidentally describe a real workflow.
26. Pool may exceed `sessionSize` for variety (e.g. 3 shown from 4).

## Repo authoring contract (from the repo CLAUDE.md — these still apply)

- Never a literal `>` in markdown (use `→` for UI paths); callouts via `:::tip` / `:::info` / `:::warning`; bold for UI elements; kebab-case filenames; images in `img/` beside content with the standard style; every moved or renamed page gets a client-redirect entry (case-sensitive URLs); the redirects block in `docusaurus.config.ts` has a Learn section — case-only renames go in `nginx.conf` instead (they collide with real output paths on case-insensitive filesystems).

## The review loop (non-negotiable)

27. **Draft → review copy → human approval → commit.** Never commit learning path content without review. The review copy goes to `~/mydev/strategy/docs-learn-revamp/drafts/` as plain markdown: interactive components shown as labeled blocks, source annotations included, and a numbered changelog of what changed each revision.
28. **Verify the build, then verify the render.** `npm run build` from `docusaurus/`, then check the built page content (grep the HTML, or the JS bundle for SVG text) and eyeball it served locally. Scripts can report success while doing nothing — the rendered output is the only truth. `onBrokenLinks` is 'warn', so grep build output for warnings; CI will not catch content mistakes.
29. Expect and welcome multiple critique rounds. The reference step took eight. Every correction that generalizes becomes a rule in this file — keep it living.
