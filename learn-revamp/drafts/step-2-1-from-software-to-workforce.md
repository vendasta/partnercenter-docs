# Review copy: AI foundations step 1, "From work to AI workforce"

**Live file:** `docusaurus/training/ai-foundations/from-work-to-ai-workforce.mdx` (rework uncommitted, on `learn-revamp-phase1` working tree)
**Review at:** http://localhost:3000/learn/ai-foundations/from-work-to-ai-workforce
**Version:** v4, July 5, 2026

## Also in this change (structural, per approved outline)

- `ai-foundations` moved to sidebar position 2; `ai-workforce` to 3; `growth-engine` to 4
- Get started final step footer now hands to `/learn/ai-foundations` ("AI foundations") instead of `/learn/ai-workforce`
- Learn home cards reordered to journey order (Get started, AI foundations, AI Workforce / growth engine, Vibe, builder); AI foundations card copy updated to "How AI Employees actually work, and how to explain it to your clients with confidence."
- Path overview `index.mdx` rewritten: promise + PathRoadmap of six steps + handoff line to AI Workforce
- Steps 2 through 6 created as stubs (growth-engine pattern) so roadmap links resolve and prev/next sequencing works

## Source annotations for step 1 claims

| Claim in copy | Source |
|---|---|
| Traditional AI classifies, routes, selects from predefined outcomes; generative AI predicts new content from learned patterns | [DOC] cit-dev ai-literacy/what-is-generative-ai.mdx |
| Email routing vs email drafting example | [DOC] cit-dev what-is-generative-ai.mdx, adapted from "urgent" routing to "invoice" |
| Model generates rather than retrieves; no stored documents | [DOC] cit-dev what-is-generative-ai.mdx key characteristics |
| "AI does the work, you orchestrate" | [DOC] our own the-vendasta-platform.mdx (continuity callback) |
| "Generative AI is the first technology that handles judgment-shaped work at scale" | [SYN] owned as editorial; the rule-shaped/judgment-shaped frame is this step's teaching device, consistent with the spec's "unit of value shifted from tools to outcomes" |
| "The AI is not the differentiator; your judgment and client knowledge are the product" | [SYN] owned as editorial, per spec Path 2 thesis and Cal's expert-angle direction |

## Voice compliance notes

- No contractions, no em dashes, sentence-case headings, no fear framing, no community mentions
- Third-person actors appear only inside quiz distractors
- KnowledgeCheck: pool of 4, sessionSize 3, intro names content, correctIndex spread (0, 2, 1, 3), distractors matched in length and verified not to describe a real recommended workflow
- Flip cards: 2, in place at the contrast moment, no end-of-step recall block
- One Try it now (task-sorting micro-action, calls forward to step 6)
- Doc links: single noun-tag on first AI Employees mention (/ai); no doc tours

## Changelog

- v4 (Cal, July 5): step retitled "From work to AI workforce." File renamed to from-work-to-ai-workforce.mdx via git mv; courseId, roadmap title, and roadmap link updated to match. No redirect needed: the old URL never shipped (branch unmerged, URL existed only in the committed-but-unreleased v1).

- v1: initial draft from approved outline. No deviations from the outline beats. The step 1 flip cards use "Traditional software" (not "Traditional AI") on the front, because the body contrasts generative AI against all prior software, which is the truer claim and reads cleaner to a non-technical partner.
- v3 (Cal critique round 2, July 5): full-article rework. Cal's direction: open with the whole picture the way step 6 does; the story is that automated workflows have existed for years but never had someone on the other end who could make the best decision and hold nuanced conversation; the merger of automated workflows and human-like interaction is what makes the platform and the workforce powerful as a thing partners sell to SMBs. New structure: (1) "Automation is not the new part": workflows are old news, and every one hit the judgment wall and ended at a person during staffed hours; (2) "Two shapes of work": the sorting tool, now derived from the wall; Try it now reworked to find the human-handoff point in an existing process; (3) "What changed: a worker on the other end": traditional-vs-generative contrast and flip cards now serve the wall story; (4) "The merger is the platform": deterministic automations plus agentic AI Employees, bidirectional handoff examples in one sentence each, three-sentence client pitch; (5) "People run the show": new-hire framing, orchestrator, judgment-is-the-product, vocabulary preview. Step 6 opener updated to close the bookend ("This path opened with the merger..."); roadmap description updated. Knowledge check pool reworked: kept invoice-routing and model-prediction questions, replaced webchat and orchestrator questions with the-wall and the-merger questions (correctIndex spread 0,2,1,3). Supersedes v2.
- v2 (Cal critique, July 5): the "tools you operate vs workforce you direct" section told a software-only story; the real arc for a local business starts with people. Section rewritten as "The story: people, software, workforce": people always held the judgment work, software took pieces of the rule-shaped work, generative AI moves the line, and the platform delivers a workforce with two kinds of workers (AI Employees, agentic; automations, deterministic; composing them foreshadows step 6). People stay in the story via the new-hire framing (briefed, trained, supervised; consistent with the junior-receptionist positioning in Path 3). Added the three-sentence client retell. "Your judgment is the product" moved into the closing section. Third outcome updated from "describe the orchestrator role" to "tell the story in a version a client can repeat." Frontmatter description updated. Uncommitted; supersedes the committed v1 pending Cal approval.
