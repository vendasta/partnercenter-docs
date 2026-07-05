# Review record: AI foundations steps 2 through 6

**Status:** Written, build-gated, UNCOMMITTED, awaiting Cal review on the preview
**Review at:** http://localhost:3000/learn/ai-foundations (overview links to all six)
**Date:** July 5, 2026
**Prior context:** Step 1 + structure committed as f07c1f28 after Cal's approval. This record covers the remaining five steps and three diagrams, all per the approved outline (drafts/OUTLINE-ai-foundations.md).

## Files in this round

| File | What it is |
|---|---|
| how-ai-employees-think.mdx | Step 2 (7 min): prediction, the $499 story, grounding, working memory, the three trust facts |
| context-is-everything.mdx | Step 3 (7 min): three context sources, KB as library, instructions-lead rule, Explanation audit, data-is-the-moat |
| instructions-that-scale.mdx | Step 4 (7 min): capabilities, ground-rules layer, behavior-or-facts test, wires-crossed, three-question brief |
| taking-action.mdx | Step 5 (6 min): tools as doorways, live-data rule, three safety facts, builder deferral |
| agents-and-automations-together.mdx | Step 6 (6 min): deterministic vs agentic, sorting test, review-engine composition, four-line capstone recap |
| img/where-an-answer-comes-from.svg | Step 2 diagram: ungrounded vs grounded stacks, arrowless |
| img/anatomy-of-an-ai-employee.svg | Step 4 diagram: Knowledge / Capabilities / Tools compartments, conversation chip |
| img/two-systems-one-outcome.svg | Step 6 diagram: job done, automation sends request, review arrives, AI Employee responds (chevron sequence) |

## Source annotations (key claims per step)

### Step 2
| Claim | Source |
|---|---|
| Model predicts next words from patterns; no stored documents; fluent by default | [DOC] cit-dev what-is-generative-ai |
| $499 package quoted as $800-2,000 by ungrounded bot | [CALL] per IA spec v2 field examples |
| Working memory holds the live conversation | [DOC] cit-dev context page |
| No open-web browsing beyond provided sources | [DOC] businessapp ai-models-and-privacy FAQ |
| No permanent learning from chats; behavior from configuration only | [DOC] businessapp ai-models-and-privacy FAQ |
| Account data isolated between businesses | [DOC] businessapp ai-models-and-privacy |
| External link to models-and-privacy reference | canonical policy: Business App-side → docs.businessapp.io |

### Step 3
| Claim | Source |
|---|---|
| Answers draw on capabilities + knowledge + conversation | [DOC] businessapp ai-models-and-privacy "How AI Employees generate answers" |
| KB contents: profile (incl. attributes), website, documents, manual entries | [DOC] businessapp knowledge-base |
| Semantic search; retrieves relevant parts; may skip lookup for general conversation | [DOC] businessapp knowledge-base |
| Instructions take priority over knowledge on conflict; rules-in-instructions, facts-in-knowledge | [DOC] businessapp knowledge-base FAQ |
| Explanation view shows retrieved knowledge per answer | [DOC] businessapp knowledge-base FAQ |
| Remove outdated/duplicate docs; lean beats abundant | [DOC] businessapp models-and-privacy improve-quality + knowledge-base best practices |
| "Data is the moat" client framing | [SYN] owned as editorial per spec thesis and Cal's expert angle |

### Step 4
| Claim | Source |
|---|---|
| Capability = discrete skill, instructions + optional tools, several at once, AI picks by context | [DOC] businessapp ai-capabilities overview |
| Ground rules vs request-of-the-moment layering | [DOC] cit-dev understanding-system-and-user-prompts (incl. its explicit Vendasta mapping) |
| Behavior-or-facts placement test | [DOC] businessapp knowledge-base tip |
| One working memory; overlapping instructions compete; "wires crossed" | [CALL] per spec + [DOC] businessapp "keep capability instructions short, specific, action-oriented" |
| Three-question brief (when to act / what must be true / what done looks like) | [DOC] businessapp creating-custom-capabilities prompt guidance, condensed; structure-beats-prose from cit-dev prompt-design |

### Step 5
| Claim | Source |
|---|---|
| Tools = API doorways: calendar, orders, inventory, tickets | [DOC] businessapp creating-custom-capabilities when-to-use list |
| AI decides when, tool defines what | [DOC] partner docs tools-overview + businessapp capability architecture |
| Constant KB updates signal the info should be a tool | [DOC] businessapp knowledge-base FAQ note |
| Credentials never visible to the model | [DOC] cit-dev context page caution ("credentials are never part of the context") + consistent with internal architecture (verified, not cited) |
| Scoped, deliberate doorways; person configures and reviews | [SYN] owned as editorial, consistent with all product docs |

### Step 6
| Claim | Source |
|---|---|
| Automation deterministic / AI Employee agentic | [DOC] /automations + IA spec Path 2 table |
| "If your automation requires manual input, it is not an automation" | [CALL] per spec lesson 6 core concept |
| Review engine: automation sends request, Reputation Specialist responds | [DOC] businessapp ai-reputation-specialist + automations/review-requests ("two systems, one outcome" from spec 3.6) |
| Lead capture can trigger follow-up automation | [DOC] /automations triggers + businessapp automations |
| Four-line recap (knows/does/acts/how work finds it) | [SYN] capstone synthesis of the path's own taught content |

## Voice compliance

- Grep-verified: zero contractions, zero em dashes, zero literal blockquotes, zero SMB/forum/community/prerequisite mentions, zero "lesson" outside component names
- All openers are descriptors; no fear framing (the $499 story is framed as the system doing what ungrounded systems do, per spec's trust-building intent; "not a malfunction" stated explicitly)
- Knowledge checks: pools of 4, sessionSize 3, intros name content, correctIndex spread within every pool (step 2: 1,0,2,3; step 3: 3,0,1,2; step 4: 0,2,1,3; step 5: 2,0,1,3; step 6: 0,1,2,3), distractors matched in length, none describes a real recommended workflow
- Flip cards: step 3 only (the three context sources, in place); steps 2/4/5/6 carry diagrams or neither; no end-of-step recall blocks anywhere
- One Try it now per step; step 6's calls back to step 1's, closing the loop the outline promised
- Doc links: /ai/knowledge-base (step 3), /ai/ai-capabilities (step 4), /ai/ai-capabilities/tools-overview (step 5), /automations + /ai/ai-workforce (step 6), businessapp models-and-privacy (step 2); all phrased as help at the moment of need
- Diagrams: arrowless stacks (step 2), arrowless compartments (step 4), truthful temporal chevrons (step 6); none repeats its section heading; standard styled div wrapper; descriptive alt text; brand palette

## Changelog

- v6 (Cal critique, July 5): delete the standalone opener paragraphs under the LessonHeader in all six steps; fold what carries value into the first sentence under the first heading. Step 1: "AI arrived into businesses that were already partly automated" now opens "Automation is not the new part." Step 2: the few-seconds image moved inside the model paragraph ("In the few seconds between a customer's question and the answer, nothing gets looked up and nothing was scripted"). Step 3: context-in-three-parts merged into "Three sources, one answer" ahead of the flip cards, per Cal's example. Step 4: instructions-you-shape-most merged into "Skills you switch on." Step 5: "Knowledge answers questions; tools take action" now opens "A doorway into another system." Step 6: the merger recap merged into "Two kinds of help." Skill structure item 4 rewritten: no standalone opener; the first sentence under the first heading does the descriptor work.
- v5 (Cal critique, July 5): remove path self-narration path-wide; tell the story, let the chrome show the sequence. Removed or reworked in every step: opener announcements ("This step covers/opens up/hands you..."), path tours ("The five steps after this one fill in the details", "The next five steps hand you the vocabulary", "The next path puts the vocabulary to work"), forward promises ("the final step of this path comes back to it", "The next step covers exactly where those facts live"), backward recaps ("The previous step ended on the fix", "The previous step gave you the placement rule", "from step 3"), step-number callbacks ("Step 1 asked you to sort" → "that old sorting tool"), and self-praise about the copy ("the single most useful sentence in this step", "that is the promise in this step's title"). Step 1 now closes on "your judgment... is the product" (punchy, per Cal); step 1 opener is now story-first ("AI arrived into businesses that were already partly automated"). Overview lead trimmed of "This learning path makes you fluent." Skill rule 4 amended to encode all of this (openers describe the subject, never the step; no touring, recapping, or step numbers in body copy; concept callbacks fine).
- v4 (Cal critique, July 5): remove the coaching meta-commentary path-wide. The client-facing knowledge stays; the narration about it goes. Removed or reworked: "both are worth saying to clients exactly this plainly" and "separates partners who sound like experts" (step 2, plus its heading "Three facts you can repeat to any client" → "Where the data goes: three facts"); "the one you will sell", "that merger is the pitch, and told to a client", the "clients hear AI noise / that someone is you" passage, and the flip-card lead-in (step 1); "Here is the client-ready framing" lead-in and the "you are stating your own value precisely" close (step 3, + one KC explanation trimmed); "worth stating to clients exactly this way" and "so you can deliver it with confidence" (step 5); "worth memorizing" and the "That is fluency" self-praise (step 6); "the client-ready way to say it" (path overview) and descriptions/Learn-home card. Kept: scenario framings ("sooner or later a client asks..."), outcomes phrased as abilities, and the concrete client-question KC scenarios; those are content, not narration. New editorial rule candidate for the skill file: teach the knowledge, never narrate that it will make the learner sound expert; scenario yes, coaching no.
- v3 (Cal critique, July 5): de-jargon step 2 and sweep "grounding" from the path. Cal keeps the concept (the system built around the AI Employee is what supplies business facts) but the word is too much. Changes: (1) step 2 opens with Cal's differentiator angle, "A different beast from the phone menu": the old AI was a decision tree (press one for hours), every branch scripted; the language model is unscripted composition. (2) "What an ungrounded answer looks like" is now "What a guess looks like"; the fix line is "handing the model the business's real facts." (3) The old grounding section is now "Surround the model with the business's facts", framing the platform machinery as what feeds facts to the model at answer time. (4) Diagram panel labels changed from Without/With grounding to "Left to guess" / "Given the facts" (boxes unchanged, per Cal). (5) Knowledge check q2 rewritten around the AI-Employee-vs-generic-chatbot comparison; intro updated. (6) Path-wide sweep: step 1 KC explanation, step 3 opener and flip-card follow-up, step 6 capstone ("business facts"), roadmap description. "Ground rules" in step 4 stays: plain-English idiom, not the term.
- v1: all five steps written from the approved outline in one pass, per Cal's "go ahead on all the rest" (July 5). Deviations from outline: none of substance. Step 5's safety beat folds the outline's "humans stay in the loop where it matters" into "judgment stays with you" configuration framing (avoids implying an in-product approval feature that partner docs do not document). Step 6 adds the lead-capture reverse-handoff example from /automations triggers to show bidirectionality concretely.
- v2 (verification round, July 5, per Cal's request): every path claim cross-checked against docs.vendasta.com sections (/ai, /ai/knowledge-base, /ai/ai-capabilities, tools-overview, /ai/ai-workforce, /automations references). Results:
  - Verified word-for-word alignments: the reactive/proactive/integration triad (/ai Quick Reference), "combines all the Capabilities into the prompt" (capabilities page, confirms the one-working-memory claim), "Shorter is Better," the live-inventory-wants-a-tool rule (KB best practices), contextual-activation examples, and the "Web Chat captures a lead" automation trigger (triggers reference, confirms step 6's reverse handoff).
  - Fix 1: step 6's AI Reputation Specialist link now points to docs.businessapp.io (partner docs do not document that employee; canonical policy sends Business App-side employees there).
  - Fix 2: step 5 adds the verified fact that the Explanation view also shows tool calls and their results (source: /ai/ai-workforce "Use AI Explanations").
  - Docs inconsistency found (not a lesson issue): partner KB page says retrieval "happens automatically for every customer interaction"; workforce page and businessapp KB FAQ say lookups happen only when relevant. Lessons follow the accurate behavior; a task chip was spawned to fix the partner KB page separately.
  - Tier-gate note for Cal: the AI Reputation Specialist auto-response requires Premium edition (businessapp doc). Step 6 uses it as a concept example without promising availability; the linked doc carries the requirement. Flag if you want it scoped explicitly.
