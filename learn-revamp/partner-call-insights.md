# Partner call insights: what partners are actually trying to learn

**Project:** docs.vendasta.com Learn tab revamp
**Source:** 14 partner call transcripts across two batches — onboarding sessions, AI Fast Track intake calls, certified-partner roundtables, customer success office hours, and services scoping calls. Partners span agencies, media companies, a telco division, and vertical specialists (dental, salon/beauty, roofing, pools/patios/spas, home services, printing, general marketing). One additional transcript was an internal Vendasta leadership meeting — excluded from partner-voice analysis; two strategic signals from it are flagged separately in section 7.
**Author:** Claude, for Cal Cooper
**Date:** July 3, 2026 (updated same day with batch 2)
**Status:** Voice-of-partner evidence base. Feeds [learn-tab-ia-spec.md](./learn-tab-ia-spec.md) v2.1.

Quotes are lightly cleaned for transcription noise; meaning is preserved.

---

## 1. Who is on these calls

| Partner profile | Situation | Signals |
|---|---|---|
| Fast Track agency, two principals | Onboarding sessions with customer success; testing AI Voice Receptionist | Booking/calendar setup, billing mechanics, auto-activation frustration |
| Solo agency owner, Calgary, home-services niche | Training his chatbot to sell a $499 AI Workforce package | AI training and guardrails, pricing hallucination, CRM follow-up flow |
| Dental-niche agency, ~40 full-service clients | Fast Track intake; experienced with chat receptionists | Capabilities discovery gap, webhooks/API ceiling, health-data compliance, positioning |
| Telco division (legacy partner, downsized 3x) | Fast Track and certification intake | Internal buy-in, zero automations, account templates opportunity, certification value |
| Long-time partner, grew from solo to 6 account managers | CRM triage call | "Don't know where to start," Partner Center vs Business App confusion, CRM hygiene, migration anxiety |
| Bilingual agency, Florida | Product update call | Seminar-based selling, AI-word aversion, certification demand, Vibe curiosity |
| Full-service marketer (websites, social, SEO, PPC) | AI Workforce discovery call | "Show me how it all connects," DIY vs white-glove ambiguity, tier confusion |
| Agency using 5-8% of platform, Tennessee | Fast Track intake | Custom AI Employee builder hitting API walls, certification catch-22, findability of training |
| Consultant building a salon-franchise voice receptionist program (700+ locations) | Services scoping call | Multi-location voice AI, custom APIs, A2P compliance, fulfillment workflow |
| Agency (Mad Pelican), pools/patios/spas client | CS office hours | Business-hours call routing, custom capability prompt engineering, coach-vs-do-for-them |
| Certified partner roundtable (6+ advanced partners) | Peer session on client AI adoption | Learner segmentation, client masterminds, monetizing AI consulting, custom portals, AI SDR demand |
| Agency (Lemon Tree), signs/real-estate clients | CS check-in | Vibe in production: Supabase prerequisite, credits economy, domains, support-ticket black hole |
| Web/print reseller (endgame-adjacent book) | CS expansion call | Fulfillment form workflow, A2P audit tool, voice AI walkthrough, book-of-accounts expansion |
| Roofing company, 7 locations (Greatway) | Direct SMB with CS | Multi-location review automation, zip-code routing, Twilio A2P loop, GBP listing matching |

Two Vendasta motions appear constantly alongside these: **AI Fast Track / Certified** (weekly peer cohorts) and **AI Jumpstart** (weekly webinar, rebranded from "Getting started with Vendasta"). The Learn tab does not compete with these — it is the durable, self-serve layer underneath them.

## 2. Sentiment overview

**Committed but overwhelmed.** Nobody on these calls is churning. They are invested — some describe themselves as "welded to Vendasta." The dominant emotion is not dissatisfaction with the product; it is anxiety about their own ability to keep up with it.

- "We're still not using the software like I think we should be using it. There's some training deficits... I'd say we're using five to eight percent of the platform. I don't like that."
- "I'm at the point where I don't even know where to start anymore."
- "Everything is so a la carte... I would love a visual of the workflow of how it all connects together."

**Fear is a motivator.** The sharpest articulation of why partners are leaning in: "Honestly, I'm driven by fear. I'm terrified of being somehow not relevant... so that I can't be replaced in five years by some other agency who is more AI than I was."

**Change velocity erodes confidence.** Partners who learned the platform once feel un-onboarded by the pace of change: "Before I even figure out what the solution is, you guys are changing it." A learning system that is versioned, dated, and continuously updated is itself a trust signal.

**Peer proof beats vendor claims.** "Somehow you take peers more seriously... a partner is going to be just honest about what you know." The certified-partner roundtable is partners teaching partners — spotlighting customers, sharing builds, trading vendor contacts. Learn content that carries partner examples will outperform feature explanations.

**The internal-buy-in problem is real.** Partners run the same enablement motion internally that Vendasta runs with them: "We struggle with internal buy-in as much as we do customer engagement." Advanced partners now run **client masterminds** — recurring group sessions to move their SMB clients up the adoption curve ("high tides raising all boats") — and explicitly want teachable material to power them.

**Frustration concentrates in four places:** products that activate themselves; support loops (a Vibe file-upload ticket escalated twice with no human response for a month — "How many times can you escalate it before you actually give me a call?" — after the AI support channel failed to even create the ticket); the Partner Center vs Business App split; and un-findable training ("I wouldn't recommend digging back through old session recordings... they're not labeled"; a partner hunting for the AI SDR webinar found it missing from the content library entirely).

That last one is a direct mandate for this project: the current learning surfaces fail at findability. The Learn tab is the fix.

## 3. The recurring pain points

Ranked by frequency and severity across the fourteen calls.

### 1. No mental model of the ecosystem
Partners cannot picture how the pieces connect — Partner Center vs Business App, products vs AI Employees vs automations, which CRM is which, where an AI Employee "lives." One partner built a chat receptionist in Partner Center and only later discovered it did not carry to a client website. Another paid a year for a product that was already included free. The most common request phrased as learning: "I would love a visual of the workflow of it."

**Learn implication:** an ecosystem-map lesson with a canonical diagram must exist in the first hour of the learner journey.

### 2. Booking, calendars, and call routing — the most repeated how-do-I
Six of fourteen calls walk through appointment mechanics. Batch 2 upgraded this from setup to *orchestration*: an agency built dynamic business-hours behavior live with CS — transfer calls to departments while the business is open, switch to lead qualification after hours — via a custom "time check" capability (full steps in 4.1). The same call surfaced durable design tricks: pull business hours from the website knowledge instead of hardcoding them (so holidays don't require prompt edits), and reference other capabilities by their proper names.

**Learn implication:** a flagship lesson, teaching both the base setup and the business-hours routing pattern.

### 3. Training the AI Employee — the defining skill gap
The single most consequential capability partners lack. Failure modes seen live on calls:

- **Price hallucination:** a chatbot quoted "$800 to $2,000 per month" for a $499 package — "So I just lost the customer here."
- **Over-prompting:** "You can over-prompt it, you can give it way too much instruction... find the right degree of prompt length without over-engineering it to where it starts to hallucinate."
- **Missing guardrails:** quote prices only from the published price list; otherwise offer a human.
- **Capability blindness:** an experienced partner did not know the capabilities library existed.
- **Set-and-forget:** CS teaches the opposite — "It's like one of your new employees. You cannot just train it once and leave... over a period of time this will become an absolute sales agent for you." And the input rule: "If the input is trash, the output will be trash."
- **The mental model that lands:** "Knowledge source is like a degree — you don't use it daily but it's at the back of your mind. Capabilities are the skill — what I can do." Plus the sandbox mindset CS actively encourages: "Go break it. That's how we learn it" — with the reset-to-default button as the safety net ("if you ever break something, just hit that little button to get back to square one").

**Learn implication:** a dedicated training lesson, and the exact metaphors above — they were coined by CS on live calls because they work.

### 4. Automations: near-zero adoption despite being the value multiplier
"We have zero automations set up for any of our clients. Not one. Because it's so complicated." Smart lists are unknown yet land instantly when demonstrated. Batch 2 adds the counter-evidence: when automations do get built, they transform the account — a 7-location roofing company now routes review requests by zip code through webhook-chained automations with a safety-net fallback (4.10). The gap between "zero automations" partners and that build is exactly the learning path.

### 5. Compliance is a silent liability
A2P/SMS registration blocks launches constantly. Batch 2 filled in the operational reality: rejection emails contain no reason ("Your account's been rejected. That's all it says."); resubmissions cost money each time ("Every time somebody tries to submit, Twilio gets paid"); CS has an escalation contact who can pull the exact Twilio error, and an **internal website-compliance audit tool** that pre-checks a site (opt-in checkboxes, SMS terms, ToS) and claims ~95% first-pass approval after fixes. Partners coach their clients' web developers through privacy-policy updates as a normal part of go-live. Sensitive-vertical data handling (dental/health) is still solved partner-by-partner via folklore. Related privacy walls partners hit: visitor-ID pixels cannot be used in Canada, and one partner blocks California outright.

**Learn implication:** a compliance lesson with an audit-first checklist — teach partners to audit the website *before* submitting, and what the escalation path is on rejection.

### 6. Money mechanics surprise people
Wholesale vs retail, price changes affecting only new activations, per-account overrides, subscription scheduling, card-on-file collection, auto-activations, cancel-before-renewal. Batch 2 adds tier-gating literacy: voice AI lives in the premium tier ("upgrade to gain access" if you bought pro); Vibe standard ~$19 / pro ~$39 wholesale with ~25,000 credits/month, custom domains pro-only. And the pricing instinct partners reach for unprompted: "Do the pro and double it, and if he burns those credits, upsell him the next level."

### 7. DIY vs done-for-you is a fog
"Is this stuff that I would do for him, or is it a do-it-yourself situation?" Partners don't know, feature by feature, whether to self-serve, buy the $199 one-time setup, or the $29/month managed service. CS's actual answer, verbatim: "For tone and knowledge of the business, partners generally teach their clients how to do it... some partners want to be the white-glove service. I see a mix of both. It's going to be client to client — some want to get their hands dirty, some say just make sure it works." The fulfillment-form workflow (order → form → onboarding call with the services team) is itself untaught — a partner on one call had submitted an order but never filled the form, stalling everything.

### 8. Selling AI to skeptical local businesses
Proven positioning moves from the calls: lead with the outcome, not the AI; junior-receptionist framing; after-hours economics; demystifying the knowledge base. Batch 2 adds two field-tested sales motions:

- **The champion wedge:** deploy with one believer inside a big prospect (a franchise, a group), prove lead volume, then go to the decision-makers with receipts — "We prove it out with her and I think you've got them, because the next step is a meeting with that big company."
- **Match the employee to the business model:** an online-only printing company needs chat, not voice ("He doesn't want to answer the phone"); a busy trades company needs voice with after-hours capture. Choosing wrong burns trust.

### 9. Be your own first customer — the proven adoption pattern
Reconfirmed in batch 2 from both sides: CS actively tells partners to activate the free chatbot on their own site ("It's free for you... train your own chatbot, you will know how it reacts"), and roundtable partners preach it to each other ("We've got to do it for ourselves first — you've got to see the stuff that would be so much easier if you just didn't have to do it").

### 10. The technical ceiling: APIs, webhooks, integrations
The most advanced partners are building seriously: a custom quote-and-proposal employee chained through Make.com and DocuSign; a salon-franchise voice program with custom roster APIs; and from the roundtable — a partner-built client portal integrating ~50 apps (invoicing went from a full day to 30 minutes), and a productized website-visitor-ID service built on agency-level API access to 80 data sources, templated and resold at $125/client. The friction list is equally concrete: platform API access is gated to the highest subscription tier; Zapier costs balloon at scale ("we were spending so much money with Zapier, so we built our own servers"); the community's own answer is "all of Vendasta's automations will take a webhook." Support loops burn these builders worst.

**Learn implication:** the builder track has a ready audience and must include the escalation map (community vs support vs services) and the webhook-first pattern.

### 11. Learners come in tiers — and everyone knows it
New in batch 2, and the single most important instructional-design signal in the corpus. The advanced partners segment learners explicitly: "There's different tiers even within the space — us, versus the Fast Track partners, versus my customers, versus our average customers. Four different tiers." And the coaching principle that follows: "Segmenting and challenging them where they are — that's a big takeaway." One partner formalized it commercially: identify key clients, run a paid discovery interview ($2,000, 2-3 hours), then scope five-figure AI solution engagements — "If you ask, 'if we can solve this problem for you, would you be interested,' most of them agree."

**Learn implication:** the path architecture (foundations → applied → builder) matches this reality, but lessons should also teach *partners* to segment their own clients the same way — it belongs in the selling/managing content.

### Bonus signal: certification demand is explicit
Unchanged from batch 1, plus reinforcement: partners actively shop for credible AI education and find "BS certificates"; the certification catch-22 (need training to earn activations, need activations to access training) is verbatim; the badge is an internal-politics tool for large partners.

## 4. The common jobs, with exact steps

Procedures reconstructed from what customer success actually taught on the calls. Each becomes a lesson (or lesson section) whose how-to steps live in Documentation, with the Learn lesson owning sequence, context, and gotchas.

### 4.1 Let your AI Receptionist book appointments — and route calls by business hours

Base setup (batch 1, most-requested workflow):

1. Each person who will take bookings signs in to Partner Center **as themselves** — calendar connections are per-user.
2. **CRM → My Meetings** → connect Google Calendar or Microsoft 365. Optionally set the meeting app (Meet, Teams, Zoom).
3. Configure booking links: availability windows, delete unused durations, one-word link slugs.
4. For team scheduling, create a team event (round robin or multi-host). Gotcha: members appear grayed out or missing when sales-team membership under **CRM → Sales Teams** doesn't match the event's team — check that first (a partner lost a month to this).
5. In the AI Employee's capabilities, **enable "Book appointments"**; remove "Record preferred booking time" if present (it only records a preference, which reads as a broken booking flow).
6. One calendar per receptionist — decide whose before testing.
7. Test end to end, then configure confirmations and reminders.

Business-hours routing (batch 2 — built live on an office-hours call):

1. Confirm the voice employee can tell the current time (it can; it answers "are you open right now" from configuration and knowledge).
2. Create a custom capability (e.g., "Business hours check") rather than bloating the role prompt — keeps the role clean and the behavior reusable.
3. Structure the capability in markdown: `##` for the instruction ("When a caller asks to speak with a team member or department, proceed with the following workflow"), `###` numbered steps, dashes for branches.
4. **Reference existing capabilities by name as proper nouns** — "initiate the transfer using the Transfer Call capability," "use the Capture Leads capability" — instead of restating their logic. Capitalize the capability names so the model recognizes them.
5. **Pull business hours from the website knowledge, not hardcoded text** — holidays and hour changes then flow through automatically ("There's the Fourth of July — I'd hate to go into the AI and change it every time").
6. Order matters: capabilities higher in the list get priority — put the time check at the top.
7. Extend the Capture Leads capability to also ask which department the caller wanted, rather than duplicating lead-capture logic in the new capability.
8. Test protocol: call during business hours (expect transfer), call after hours (expect lead capture).
9. Client-coaching safety net: the role shows a "modified" badge with a reset-to-default arrow — teach clients "if you break it, hit that button."

### 4.2 Train an AI Employee to quote accurately (and stop making things up)

1. Audit what the employee knows: ask it your ten most likely prospect questions, including prices, before any client sees it.
2. Fix the sources — copy real package details into a clean document and upload it to the Knowledge Base as the authoritative source (auto-imported marketplace content can carry broken links and no usable pricing).
3. Upload a price list with exact figures.
4. Add a guardrail capability instruction: quote only from the published list; never generalize; otherwise capture contact details and offer a human.
5. Mind prompt length — over-instruction degrades behavior.
6. Re-test the same questions; iterate in test-and-try; use Claude or similar to draft capability prompts.
7. Sensitive verticals: refuse medical details, redirect, say "customer" never "patient."
8. Teach the operating mindset: it's a new employee, not a setting — coach and correct continuously; go break it in the sandbox; reset to default if an edit goes rogue; garbage in, garbage out.

### 4.3 Build your first smart list and pair it with an automation

1. **CRM → Lists → Create list** on contacts, choose **Smart list**, name it before saving.
2. Add a filter (record source = form submission / My Meetings / etc.). Matching contacts populate immediately and continuously — the list is the trigger.
3. Create an automation on **contact added to list**: send a campaign, create a task, notify, or activate a product.
4. Three starter recipes: form submission → nurture campaign; new lead → owner task + SMS acknowledgment; job complete (via integration) → review request.
5. Use the same pattern to clean the CRM before any migration: filter out spam and internal contacts, tag customers vs users, export a clean cut.

### 4.4 Stop products from activating (and billing) by surprise

1. Known linkage: a Snapshot Report auto-activates a 7-day Reputation trial that powers the report grading and expires on its own.
2. Anything else self-activating: account → **Product info** → turn off auto-activation.
3. **Billing → estimated usage** shows what will be charged at wholesale and for whom.
4. Cancel unwanted paid products before the renewal date.
5. Stop refreshing Snapshot after real products activate — proof-of-performance moves to the Executive Report (and configure its client notifications deliberately).

### 4.5 Get paid automatically

1. Choose the collection model per account: manual, or automatic via Vendasta Payments (roughly 2.9% + 30 cents card, ~1% ACH — verify current rates).
2. Account → **Billing settings → Subscription on**.
3. Collection → **Automatic**, enable charge card on file.
4. Add the client's card or send the card-capture form.
5. Set the receipt recipient and memo.
6. Marketplace price changes affect only new activations; edit an existing client's price on their subscription directly.

### 4.6 Pass A2P/SMS compliance the first time

1. **Audit before you submit.** Vendasta's team can run an internal website-compliance audit (checks opt-in checkboxes, SMS terms, privacy policy, ToS) — ask your CS contact for it; partners report ~95% first-pass approval after fixing what it flags.
2. The client website needs a privacy policy covering SMS/data terms and a terms-of-service page. Keep a plug-and-play template ready — successful partners write one once and reuse it.
3. Every form collecting a phone number needs opt-in/opt-out language.
4. Gather legal name, EIN, address, authorized representative before starting. Pick the nearest category from the fixed list.
5. On rejection: the email tells you nothing. Escalate through your CS contact, who can pull the exact Twilio error report. Expect multiple passes as normal; each resubmission costs Vendasta money, so fix everything the audit flags in one pass.
6. Registration lives at **Administration → Conversation settings → Register now** (or via the AI Employee setup service, whose team submits and monitors for you).
7. Plan around the wait: build and test everything else while A2P clears; treat phone numbers as precious.

### 4.7 Prospect with Find Accounts and the Snapshot Report

1. **Accounts → Manage accounts → Find accounts**: industry + city. Google-sourced; 20 results per search.
2. Narrow geography for more ("coffee shop, 8th Street" vs "coffee shop, Saskatoon").
3. Save results to create accounts in bulk; create manually for businesses without a Google Business Profile.
4. Data model: account → auto-creates CRM company; company does **not** create an account. One-way street.
5. Assign a salesperson for correct campaign sender profiles.
6. Snapshot from the account page (watch quota); lifecycle: lead → prospect → customer.

### 4.8 Give an AI Employee a real skill with a custom capability and tool (builder tier)

1. Start from the outcome ("What is the result?"), work backwards.
2. Draft the capability instruction with an AI assistant, then trim.
3. Add a tool where the employee must act on an external system: method, URL, headers, parameters.
4. Chain through middleware (Make.com/Zapier) for what the platform can't reach natively — but know the cost curve: Zapier balloons at scale; the community norm is "all of Vendasta's automations will take a webhook," and the heaviest builders graduate to their own middleware.
5. Dynamic external data (rosters, calendars) needs a data contract: API if the client's system has one; otherwise someone maintains it manually — price that honestly.
6. Multi-location: one employee can serve multiple locations if knowledge is structured per location and the workflow asks "which location?" first; separate phone numbers need separate Conversations AI instances; voice numbers are dedicated and registered.
7. Escalation map: community (Fast Track chat) for how-to; support for defects — with realistic expectations (tickets have vanished for weeks; confirm a ticket number exists, CC your CS contact); services for done-for-you. Do not spend a month in a loop.

### 4.9 Ship your first Vibe build and charge for it

1. Anchor on the differentiator: Vibe already knows the business — reviews, forms, chat widget, CRM data, no embed codes.
2. **Set up the infrastructure first: Supabase.** File uploads and data features fail without it, and the error isn't obvious — a partner watched a client project stall for a month over this. Supabase is Vibe's storage and backend ("think of it as a large filing cabinet for all of your projects"): create a free Supabase account, then **Administration → Integrations → connect Supabase**, then retry. One Supabase connection per client account you build in.
3. Start with a landing page — the highest-frequency first use case. Real second use case from the field: a client portal where a sign company's realtor customers upload artwork and place orders.
4. **Draft prompts in Claude first, then paste into Vibe** — the field-standard credit-saving workflow ("I learned the hard way... perfect your prompt before you put it into Vibe"). Iterate with follow-ups; expect trial and error.
5. Know the tier and credits economy: standard ~$19 wholesale / pro ~$39 with ~25,000 credits/month; custom domains require pro plus DNS records you control (default is a vendasta.ai domain); no WordPress export — projects live in the Vibe environment (HTML; import/export on the roadmap). A support article estimates credits per prompt type — link it, because clients ask "how many credits will 30 signs cost?" and partners currently can't answer.
6. Wire the build into the platform: forms → CRM, chatbot embed, follow-up automations.
7. Package it: partner instinct from the field — resell pro at roughly double wholesale, upsell the next tier when credits run out; or flat setup fee plus maintenance retainer.

### 4.10 Automate reviews across a multi-location business

New in batch 2 — the full pattern from a 7-location roofing company, transferable to any multi-location or franchise client:

1. One hub location owns the master automation. Trigger: invoice sent (via QuickBooks integration).
2. The automation branches on **zip code**: hub zips → create contact (safety net; QuickBooks already creates it, the automation catches misses) → send review request. Other zips → fire a **webhook** to that location's account.
3. Each satellite location runs a simple automation: webhook received → create contact → send review request.
4. Final safety-net branch: no zip match → default to the hub. Expect "entity already exists" failures in the log — that's the safety net working; learn to read the activity log before panicking.
5. Email requests work day one; SMS waits on A2P (4.6). Twelve requests in the first week produced six new reviews on email alone.
6. AI review responses: set the star threshold — auto-respond at 4+ stars, route below-4 to a human (CS guidance: four-star reviewers "had nothing but great things to say but feel they're not supposed to give a five"). Configure per location.
7. GBP connection hygiene for multi-location: unlabeled profiles cause wrong-location matches. Disconnect before reconnecting (reconnecting over a stale connection caches the old match); in Listings, expand the Google listing, remove wrong matches, and set "verify as only listing source." Fix the names on the Google Business Profiles themselves so future connections are identifiable.
8. Manual override for repeat/commercial clients where automation would annoy: Reputation → Reviews → **Request review** — choose template and channel (email or SMS, not both unless asked) and send yourself a test first.
9. Respond to reviews the SEO-aware way: name the service and location in the reply.

### 4.11 Roll out at scale with account templates

For partners with vertical concentration: build the optimal account configuration once — AI Employees, automations, CRM objects, product bundle — save as an account template, apply per vertical. Multi-location businesses layer on the multi-location portal and the 4.10 routing pattern. This is the bridge from "I set up one AI Employee" to "I run a program."

## 5. What partners explicitly asked to learn, verbatim

- "I think we need to figure out some more training other than the website."
- "What's the best way for me to train AI Conversations? I'm going to have to explain this to anybody I'm onboarding."
- "I would love a visual of the workflow of how they all connect together."
- "How do I learn the prompts, though?" (Vibe)
- "There's something called a smart list — don't know what that is or why we would use it."
- "Is there a course, is there something that you see out there?" (AI education/certification)
- "Where do we start at this point?"
- "Is that something I would do for him, or is it do-it-yourself?"
- "Do they coach their clients to go into the AI Workforce and make those modifications, or do the Partner Center guys do that for their clients?" (batch 2 — the same DIY-vs-white-glove question from the agency side)
- "We want the chat receptionist to be able to schedule the meeting itself instead of just sending us a notification."
- "What is Supabase? I don't even know what Supabase is." / "How did we not know?" (batch 2 — Vibe's undocumented prerequisite)
- "How many credits is he going to blow through? He's going to ask that." (batch 2 — Vibe pricing conversations with clients)
- "Is this markdown or markup? What is that?" (batch 2 — capability authoring is a genuinely new literacy for this audience)

## 6. Implications carried into the IA spec

1. **Ecosystem map lesson** first — Partner Center vs Business App, where employees live, the one-way account/CRM street.
2. **Teach it to book** — now including business-hours routing, the custom-capability pattern, and capability ordering (4.1).
3. **Train your AI Employee** — knowledge sourcing, price lists, guardrails, prompt discipline, the new-employee/degree-vs-skill metaphors, go-break-it sandboxing, reset-to-default (4.2).
4. **Workforce on autopilot** — smart lists, three recipes, and the multi-location review-automation pattern as the advanced example (4.3, 4.10).
5. **Keep it compliant** — audit-first A2P checklist, rejection escalation path, sensitive-vertical handling (4.6).
6. **Money mechanics** — plus tier-gating literacy (voice = premium; Vibe tiers and credits).
7. **Become your own first customer** — reconfirmed by CS and partners independently.
8. **Selling lessons carry scripts and motions** — outcome-first language, junior-receptionist framing, champion wedge, employee-to-business-model matching, and client segmentation (the four-tier insight, taught to partners as a client-coaching skill).
9. **"Do it, delegate it, or buy it" block** on every applied lesson — now with the CS-verbatim guidance and the fulfillment-form workflow explained.
10. **Vibe path**: prompting lesson (draft-in-Claude workflow, credits economy) plus an infrastructure lesson (Supabase prerequisite, domains/DNS, export boundaries) — both gaps produced real stalled client work in the field.
11. **Builder track grounded in real cases** — webhook-first integration pattern, middleware cost curve, API tier-gating, escalation map with realistic support expectations.
12. **Certification elevated to design goal** — unchanged.
13. **Findability is a feature** — reinforced by a partner unable to find a webinar that officially exists.
14. **Community and masterminds** — partners run client masterminds and want material to power them; Learn lessons should be reusable as partner-to-client teaching decks. See also section 7.

## 6.5 Batch 3: the canonical onboarding sequence (10 CS onboarding calls, July 4)

Ten additional transcripts, mostly first and second onboarding calls run by customer success. Their value is different from batches 1-2: they reveal the **standard setup sequence CS runs with every new partner**, which is the ground truth for Path 1 ordering and the ecosystem-map side-by-side.

**The Partner Center first-call checklist (observed repeatedly, near-identical order):**
1. Brand the platform: upload logo top-left; it brands Partner Center AND every client Business App. Starter tier is co-branded ("powered by Vendasta"); professional is white-label. Starter includes 1 seat, professional 5; extra seats ~$30-35/month.
2. Your own AI employees: AI → Workforce. Partner's chat and voice receptionists exist in Partner Center out of the box (no need to buy Conversations AI for yourself). Knowledge is a shared library but must be **assigned per employee** (a real partner had website knowledge on voice but not chat). Website knowledge modes: single page / follow links / sitemap, exclude paths, enable automatic refresh.
3. Voice receptionist: the name is how it introduces itself; number options are AI-number-on-website (simplest) or call forwarding from the existing number via carrier star-codes (mobile: no-answer/busy/off; landline: immediate or conditional); Transfer Calls capability takes a phone number + criteria (write conditions with "or", not commas); recommended voice models per CS: Deepgram Aura and GPT Realtime; 10-minute call cap.
4. Booking: CRM → My Meetings is **per-user** (an admin cannot set it up for a teammate); URL convention first-initial-last-name (save the business name for a future team calendar); connecting the calendar both writes bookings AND reads busy time to prevent double-booking; buffer time 10-15 minutes and advance-notice filters recommended; notetaker rename is organization-wide (brand it, do not personalize); three prebuilt event links (15/30/60); the AI books through exactly one selected event link.
5. Email domain: Marketing → Email Settings; sender name = business name; reply address on your domain; Advanced → use your own domain → add DMARC/SPF/DKIM records (DMARC often already matches; SPF conflicts resolved by merging include:sendgrid.net into the existing record).
6. Payments: Administration → Vendasta Payments. Build Stripe in-platform (no platform fee, but locked in) vs connect existing Stripe (0.75% platform fee, portable, keeps history) — CS consistently recommends connecting your own. Then default billing settings → automatic + charge card on file (new accounts inherit the default). CS etiquette observed: stop screen sharing and pause recording during banking entry.
7. Sell: marketplace Start Selling (adds to your product shortlist, not the store; packages beat single products), suggested retail prices are deliberately conservative, salesperson profile (administration → My Team → edit salesperson) powers the client-facing contact card in Business App and snapshot emails.

**The order-to-activation lifecycle (client side):** create order from the account → add package → order forms block activation until filled, fulfillment forms do not (and have a white-label shareable link) → submit for customer approval (contact, expiry, require payment, preview) → client sees retail only, enters card, signs → products activate → THEN send the user welcome email. Item visibility on packages is a deliberate choice (package only / items without prices / items with prices). Trials: zero out retail lines at order time, later edit the retail subscription on the account's Subscriptions tab. Contract start/duration is expectation-setting only; per-line billing terms set actual charge dates. Stripe payout is 1-2 days (first charge on a brand-new Stripe account can be 7-10; partners self-charge $1 to clear it).

**Other lesson-grade facts surfaced:** account templates now exist (template an account's AI employees, campaigns, automations and apply to other accounts — the scale mechanism from spec lesson 5.7); forms in Business App auto-create CRM contacts with record source "Form" and a hidden tag field distinguishes which form; subscription pay-down mechanics (wholesale on Vendasta-owned products offsets the platform subscription from month 2; MatchCraft excluded); the Commerce tab is client billing, not the partner's own bill (a real confusion — the partner's bill lives in Administration → My Billing → estimated usage); custom white-label product URLs (crm.yourdomain.com etc.) are a support-ticket motion; docs.businessapp.io is gray-label and shareable with clients; snapshot campaigns live under Marketing → Campaigns and reuse a snapshot under 30 days old.

**Fact-check outcomes for the ecosystem-map lesson:** the your-workforce/their-workforce framing is confirmed nearly verbatim ("for most products you would turn it on in Business App, but your chat and voice receptionists already exist for you in Partner Center"; "we're building them out of Business App, where their AI lives"). Configure-on-behalf confirmed (impersonation, client A2P handled from their Business App, per-user permission toggles). New rule earned: the contact-vs-user distinction is CS-taught ("when you create a contact, it doesn't automatically create a user") and now lives in the lesson alongside the account/company rule.

## 7. Internal signals (not partner voice — flagged separately)

One transcript in batch 2 was an internal Vendasta leadership meeting, excluded from the partner-voice analysis above. Two items in it are strategically relevant to this project and worth Cal knowing:

1. **A partner-community showcase app is being prototyped internally** — a space for AI-certified partners to share what they build with the AI Workforce and Vibe, with an open question of whether it lives in Partner Center or a dedicated site. This overlaps directly with the Learn tab's community dimension and the mastermind demand in section 6.14 — worth connecting with that team before designing any "partner showcase" content into Learn.
2. **The one-platform consolidation ("Vendasta 2.0") is explicitly described internally as a concept car, not a committed migration.** This validates the spec's recommendation to hold migration-readiness lessons and keep the ecosystem-map lesson migration-aware rather than migration-specific.
