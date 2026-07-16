# Outline spec: AI foundations path (Path 2), six steps

**Status:** Draft for Cal review. No lesson copy gets written until this is approved.
**Date:** July 5, 2026
**Parents:** learn-tab-ia-spec.md section "Path 2", implementation-plan.md source map

## The angle (per Cal, July 5)

Partners want to sound like experts to their SMBs. Every step therefore delivers two things at once: the concept itself, and the client-ready way to say it. Each step's outcomes include at least one "explain X to a client" verb. Concept-level only, near vendor-neutral, zero setup required, readable by a skeptical agency owner who has not bought anything. Webhooks, API wiring, and tool-building mechanics are named but deferred to documentation links (the Builder track will pick them up later; per voice rule 8 we never say "coming soon" in step copy, so deferrals are doc links, not roadmap promises).

## Source map (all four repos)

| Source | Role | Constraint |
|---|---|---|
| citizen-developers-docs `ai-literacy/` | The "intro to AI in general" tidbits: generative vs traditional AI, prediction not retrieval, context as working memory, system instructions vs conversational prompts, iteration mindset | Internal-employee framing gets rewritten for partners; PTFCE framework is chat-prompting oriented, borrow the spirit ("brief it like a new team member"), not the acronym |
| businessapp-docs `business-app/ai/` | The verified product facts: knowledge-base.md, ai-models-and-privacy.md, ai-capabilities/ | SMB voice; re-aim every claim at the partner ("your clients" not "your customers") |
| partnercenter-docs `docs/ai/`, `docs/automations/` | Canonical doc-link targets for partner-side how-tos | Links phrased as help, not tours |
| platform-services-docs (internal) | Mental-model verification only | Never linked, never quoted, no internal vocabulary leaks |
| vendastaapis | Accuracy backstop for any API-adjacent claim in step 5 | Concept level only in this path |

## Structural decisions needing Cal sign-off

1. **Sidebar position.** The IA spec journey is Get started → AI foundations → AI Workforce. Current positions: getting-started 1, ai-workforce 2, growth-engine 3, ai-foundations 4. **Recommendation:** move ai-foundations to position 2 and shift ai-workforce and growth-engine down one. That also means updating the Get started final-step footer (currently hands to /learn/ai-workforce) to hand to /learn/ai-foundations, and this path's final step hands to /learn/ai-workforce. One approved-lesson edit (get-set-up-to-get-paid.mdx footer), flagged here so it is not a surprise in the diff. Alternative: leave order as is and have this path sit after growth-engine; the journey story on the Learn home then contradicts the sidebar.
2. **Diagrams.** Two SVGs proposed for the whole path (rule: diagrams show structure, prose explains flow):
   - Step 2: "Where an answer comes from", grounded vs ungrounded. Two short vertical stacks: question → model prior → guess, versus question → your business facts + model → grounded answer. No arrows between the stacks.
   - Step 4: "Anatomy of an AI Employee", one employee box with its three parts (Knowledge, Capabilities, Tools) plus the conversation. Reuses the ecosystem-map visual language (navy, Business App blue #e9f1fa fronts, no arrows).
3. **Difficulty and time.** All six steps Beginner. Estimates: 5/7/7/7/6/6 minutes, total roughly 38. No Video or Lab tags anywhere in the path.
4. **Writing order:** 1 through 6 sequentially; each step leans on the previous one's vocabulary.

## Path overview (index.mdx rewrite)

Replaces the "coming soon" placeholder. Opening descriptor: what this path makes you able to do (explain AI to your clients with confidence, and configure with intent later). "No setup required" stated plainly: nothing to activate, nothing to install. PathRoadmap component with the six steps. Closing line points at the AI Workforce path as where these ideas get hands-on. Frontmatter sidebar_position stays 0 within the folder; folder position per decision 1.

---

## Step 1: From software to workforce (5 min)

**Outcomes:** Explain to a client what makes generative AI different from every tool they already use. Sort a task into rule-shaped or judgment-shaped work. Describe your own role in an AI workforce: the orchestrator.

**Beats:**
1. Opening descriptor: this path is the working vocabulary behind every AI Employee; six short steps, nothing to set up.
2. Traditional software and traditional AI follow rules: classify, route, pick from known outcomes. Generative AI produces new content by predicting what comes next from learned patterns. [DOC cit-dev what-is-generative-ai]
3. The email example, adapted: a rule can route "urgent" emails to a queue; generative AI can draft the reply that did not exist before. [DOC cit-dev]
4. The unit of value shift: software you operate versus a workforce that produces outcomes while you direct it. The human stays the orchestrator; your judgment is the product. [SYN, owned as editorial, per spec]
5. Client-ready line: your clients hear AI noise everywhere; what they need from you is someone who can say what it is actually good at and where it needs direction.

**Flip cards (2, in place at the traditional/generative contrast):** Traditional AI / Generative AI.
**Try it now:** Take the most repetitive task from your week and ask: does it have fixed rules, or does it need judgment? Keep the answer, step 6 comes back to it.
**Doc links:** [AI in the platform](/ai) as a noun-tag on first mention of AI Employees.
**Knowledge check (intro names content):** 3 questions, pool of 4. Placement: which of these tasks suits rules, which suits generation; what generative AI actually does (predicts patterns, not retrieves documents).

## Step 2: How AI Employees think (7 min)

**Outcomes:** Explain in plain language how a language model produces an answer. Explain why an ungrounded AI invents details, and what grounding changes. Answer a client's "can I trust it with my business?" with facts.

**Beats:**
1. Opening descriptor: what is happening in the seconds between a customer's question and the AI Employee's answer.
2. A language model predicts the most likely next words from patterns learned in training. It is not looking anything up; there is no filing cabinet. Fluent and confident is the default, correct requires grounding. [DOC cit-dev what-is-generative-ai]
3. The field example: an ungrounded chatbot asked about a $499 package quoted $800 to $2,000, because plausible-sounding numbers are exactly what pattern prediction produces. [CALL, per spec v2]
4. Grounding: give the model your business facts at answer time and it answers from those facts instead of its general patterns. This is the single most important sentence in the path; step 3 is entirely about it.
5. Working memory: the model also carries the live conversation, which is why it can follow a thread. [DOC cit-dev context page]
6. Trust facts, each verified in Business App documentation, each phrased so a partner can repeat it to a client verbatim: AI Employees do not browse the open web beyond the sources you provide; they do not permanently learn from individual chats (persistent behavior comes only from configuration); each business's data is isolated. [DOC businessapp ai-models-and-privacy]

**Diagram:** "Where an answer comes from" (decision 2).
**Try it now:** Ask any general-purpose chatbot a specific question about one of your clients' businesses (hours, pricing). Watch what an ungrounded answer looks like.
**Doc links:** [models and privacy](docs.businessapp.io link) at the trust-facts moment.
**Knowledge check:** why the bot invented a price; what grounding means; what the AI does and does not retain from conversations.

## Step 3: Context is everything (7 min)

**Outcomes:** Name the three things every AI Employee answer draws on. Decide what belongs in a Knowledge Base and what does not. Explain why your client's business data is the differentiator, not the AI itself.

**Beats:**
1. Opening descriptor: an AI Employee is only as good as the context it is given; this step is what "context" actually contains.
2. Three sources feed every answer: its instructions (how to behave), its knowledge (what it knows about the business), and the live conversation (what is happening right now). [DOC businessapp ai-models-and-privacy, cit-dev context page]
3. The Knowledge Base is a reference library, not a script: business profile, website content, uploaded documents, written entries. The AI searches it by meaning when a lookup would help, retrieves the relevant parts, and answers from them. It does not read everything on every message. [DOC businessapp knowledge-base]
4. Quality in, quality out: outdated or conflicting documents produce confident wrong answers; when knowledge conflicts with instructions, instructions win, so keep rules in instructions and facts in knowledge. [DOC businessapp knowledge-base FAQ]
5. Every answer is auditable: the Explanation view shows exactly which knowledge an answer used. [DOC businessapp knowledge-base FAQ]
6. The differentiator framing for clients: generic AI knows the world; an AI Employee knows their business. The data work you do for a client is the moat.

**Flip cards (3, in place at beat 2):** Instructions / Knowledge / The conversation.
**Try it now:** Open a client's website and write down three questions their customers ask that the site answers, and three it does not. That gap is a knowledge list.
**Doc links:** [Knowledge Base](/ai/knowledge-base) noun-tag; "when you are ready to add sources, this guide walks you through it."
**Knowledge check:** placement (does X go in knowledge or instructions); what happens on conflict; what semantic retrieval means in practice.

## Step 4: Instructions that scale (7 min)

**Outcomes:** Explain what a capability is by what it does for the business. Decide whether something belongs in instructions or in knowledge. Explain why short, specific instructions outperform long ones.

**Beats:**
1. Opening descriptor: capabilities are the skills of an AI Employee; this step is how instructions actually shape behavior.
2. A capability is a discrete skill you switch on: capture a lead, book an appointment, answer from knowledge. Each one is instructions, sometimes with a tool attached. The AI reads the situation and uses the capability that fits. [DOC businessapp ai-capabilities]
3. The two-layer idea from AI in general: ground rules set once versus the specific request of the moment. In a chat tool those are system instructions and your prompt; in an AI Employee, capabilities are the ground rules and the customer's message is the prompt. Partners who get this stop writing instructions like one-off requests. [DOC cit-dev understanding-system-and-user-prompts, incl. its explicit Vendasta mapping]
4. The decision rule: must it govern behavior or appear every time? Instructions. Is it a fact to look up when relevant? Knowledge. (Echoes step 3 from the other side.) [DOC businessapp knowledge-base tip]
5. Why over-prompting backfires: everything an employee is told lands in one working memory; long, overlapping instructions compete with each other. The field phrase is "wires crossed." Short, specific, action-oriented wins. [CALL + DOC businessapp ai-models-and-privacy improve-quality list]
6. Writing craft, briefly: brief a capability like a new team member; say when to act, what is required first, and what done looks like. Structure beats prose. [DOC cit-dev prompt-design, adapted; DOC businessapp creating-custom-capabilities prompt guidance]

**Diagram:** "Anatomy of an AI Employee" (decision 2).
**Try it now:** Write a two-sentence instruction for one thing a client's receptionist does daily: when to do it, and what must be true before doing it.
**Doc links:** [configuring capabilities](/ai/ai-capabilities) at the moment of need.
**Knowledge check:** placement across instructions vs knowledge; what happens when two long capabilities overlap; pick the better-written instruction from two candidates (matched length).

## Step 5: Taking action (6 min)

**Outcomes:** Explain what a tool lets an AI Employee do that knowledge cannot. Recognize when a job needs a tool instead of more documents. Explain to a client how AI actions stay safe and scoped.

**Beats:**
1. Opening descriptor: knowledge answers questions; tools take action. This step is how an AI Employee reaches into other systems.
2. A tool is a doorway into another system: check calendar availability, look up an order, fetch live inventory. The AI decides when to walk through the doorway; the doorway defines what is possible on the other side. [DOC partner docs tools-overview, businessapp creating-custom-capabilities]
3. The live-data rule of thumb: if you find yourself updating the Knowledge Base constantly, that information wants to be a tool instead. [DOC businessapp knowledge-base FAQ note]
4. Safety, client-ready: each tool is scoped to one job in one system; credentials are never part of what the model sees; the AI can only act through the doorways you gave it, nothing else. [DOC cit-dev context page credentials note + SYN owned as editorial, consistent with all product docs]
5. Where the how-to lives: building tools (APIs, parameters, connections) is builder territory; documentation covers it when they are ready. No mechanics here. [Deferral per Cal]

**Try it now:** Name one system a client uses every day (booking, point of sale, online store). Write the one question a receptionist could answer instantly if they could see inside it.
**Doc links:** [tools overview](/ai/ai-capabilities/tools-overview) phrased as "when you are ready to connect one."
**Knowledge check:** which scenario needs a tool vs knowledge vs neither; what a tool can and cannot do once configured.

## Step 6: Agents and automations, together (6 min)

**Outcomes:** Explain the difference between an automation and an AI Employee in one sentence each. Pick the right one for a given job. Describe how the two hand off to each other in a real workflow.

**Beats:**
1. Opening descriptor: the platform gives you two kinds of help; knowing which to reach for is the last piece of fluency.
2. An automation is a deterministic workflow: same trigger, same steps, every time. An AI Employee is agentic: it reads each situation and exercises judgment. [DOC /automations + spec]
3. The field test, quoted as guidance: "if your automation requires manual input, it is not an automation." Rule-shaped work belongs in automations; judgment-shaped work belongs with an AI Employee. [CALL/spec]
4. Callback to step 1's Try it now: the task the learner sorted in step 1 now has a home.
5. Together, not versus: an automation can put an AI Employee to work, and an employee's events can start an automation. Worked example at concept level: an automation sends the review request on job completion; the AI Reputation Specialist handles the response when the review lands. Two systems, one outcome. [DOC businessapp ai-reputation-specialist + automations/review-requests]
6. Path capstone recap: knowledge is what it knows, capabilities are what it does, tools are how it acts, automations are how work finds it. One tight paragraph, then the footer.

**Try it now:** Split one client process into its rule-shaped half and its judgment-shaped half; that split is an implementation plan.
**Doc links:** [automations](/automations) noun-tag; review-request template guide at the worked example.
**Knowledge check:** placement across automation vs AI Employee (scenarios matched in length); how the handoff works in the review example.
**Footer:** final step; nextPathName "Hire your AI Workforce", to /learn/ai-workforce.

---

## What I am NOT doing (scope fences)

- No Vibe content; that is Path 4 and stays there.
- No tool-building mechanics, webhooks, cURL, MCP, or API surface detail; named once in step 5 as documentation links only.
- No model names, vendors, versions, context-window sizes, or token vocabulary. "Working memory" is the only memory metaphor, borrowed from the citizen-dev docs and used consistently (metaphor rule: commit everywhere or nowhere).
- No internal vocabulary from platform-services (goals, functions, namespaces, prompt modules).
- No Vendasta-internal policy content from the responsible-AI page; accountability appears only as the partner-facing "you review what your workforce sends."

## Open questions for Cal

1. Approve the position-2 move and the Get started footer edit (decision 1)?
2. The step 2 trust facts are the strongest "sound like an expert" material in the path. Comfortable teaching all three (no open web, no learning from chats, data isolation) in a beginner path? All are public in Business App docs.
3. Two diagrams enough, or do you want a third on the step 6 automation-plus-employee handoff?
4. Any field stories from partner calls you want threaded in beyond the $499 quote and "wires crossed"?
