# Phase 1 lesson outlines: Learn home, Path 1, Path 3

**Project:** docs.vendasta.com Learn tab revamp
**Author:** Claude, for Cal Cooper review
**Date:** July 3, 2026
**Status:** Draft outlines for review. Approved outlines become writing assignments.
**Parents:** [learn-tab-ia-spec.md](./learn-tab-ia-spec.md) (architecture), [partner-call-insights.md](./partner-call-insights.md) (evidence, cited as "insights x.x")

Conventions used below: every lesson carries the standard header block (difficulty, time, prerequisites, checkable outcomes) and footer handoff per spec section 6. "Docs handoff" means the lesson links out for how-to steps rather than restating them. KC = knowledge check placement. Voice per spec section 7 — including the confidence-over-fear rule: lessons open with what a setup unlocks, never with what mistakes cost; warnings, edge cases, and troubleshooting live in documentation and are linked at the moment of need.

---

## Learn home — /learn

Not a lesson; the front door. One screen, three jobs:

1. **Tell the story in two sentences.** "The most successful partners run an AI workforce: AI Employees do the work, you orchestrate. These paths take you from platform basics to a workforce you can train, trust, and sell." No feature list, no card grid of nouns.
2. **Route by goal, not by content type.** Five path cards in journey order (Getting started → AI foundations → AI Workforce → Vibe → Builder), each phrased as an outcome: "Run your business on Vendasta," "Understand how AI Employees work," "Hire and manage your AI Workforce," "Build with Vibe," "Connect anything with APIs and webhooks." Below the paths, two library cards (Products by Attract/Convert/Engage, Vendasta Services).
3. **Give the impatient learner one answer.** A "most partners start here" strip pointing at Path 1 lesson 1 for new partners and Path 3 lesson 1 for established partners — the two entry populations from the calls (insights 1).

Also on this page: a short "how these paths work" note (sequenced, finishable, progress saved), and a maintained "recently updated" list — freshness is a trust signal for partners burned by change velocity (insights 2).

---

# Path 1 · Getting started: run your business on Vendasta

Path promise: operate the platform, picture the whole system, and price with confidence — before meeting a single AI Employee.

## 1.1 The Vendasta story: AI does the work, you orchestrate

- **URL:** /learn/getting-started/the-vendasta-story
- **Difficulty:** Beginner · **Time:** 8 min · **Prerequisites:** none
- **Outcomes:** explain the partner model in one sentence; name the three stages of the customer lifecycle; describe what "AI does the work, humans orchestrate" means for an agency's economics
- **Arc:**
  1. Open on the learner's problem, not ours: missed leads, manual fulfillment, tool sprawl — the three complaints every local business brings to a partner.
  2. The model: you white-label the platform; your clients get outcomes under your brand; you get recurring revenue. Two-layer framing exactly as the website tells it (intel brief section 1).
  3. The shift: from selling your hours to managing a workforce. Introduce "AI does the work, you orchestrate" as the thesis for everything that follows, framed as the growth story partners themselves tell: the agencies pulling ahead are the ones orchestrating, and this path is the working manual.
  4. Attract, Convert, Engage — the lifecycle map used across the site, the product library, and your client conversations.
- **KC:** one scenario question — "A client says 'I just need more customers.' Which lifecycle stage do you start the conversation in, and why?"
- **Docs handoff:** /getting-started
- **Footer:** "Before you can orchestrate anything, you need to know the stage you're standing on. Next: the two command centers."

## 1.2 The ecosystem map: how it all connects

- **URL:** /learn/getting-started/ecosystem-map
- **Difficulty:** Beginner · **Time:** 12 min · **Prerequisites:** 1.1
- **Outcomes:** state which environment (Partner Center vs Business App) a given task belongs to; explain the one-way account→CRM-company relationship; locate where an AI Employee lives and why it matters
- **Arc:**
  1. Why this lesson exists, said plainly: the most common request we hear is "I would love a visual of the workflow of how it all connects" (insights 3.1). This is that visual.
  2. **The canonical diagram** (the one asset this whole revamp reuses everywhere): Partner Center (your command center — CRM, accounts, marketplace, billing, automations) / Business App (your client's branded workspace — their AI Employees, conversations, reports) / and the connective tissue (orders flow down, leads and proof flow up).
  3. The one-way street: creating an account auto-creates a CRM company; creating a company does not create an account. Accounts are for activating products and billing; CRM is for logging activity (insights 4.7).
  4. Where AI Employees live — and the real story of the partner who built a chat receptionist in Partner Center and discovered it didn't reach the client's website (insights 3.1). Rule of thumb: your employees live in your Partner Center; your client's employees live in their Business App.
  5. Products vs AI Employees vs automations in one table: what each is, where each lives, what each costs.
  6. Migration-aware close: the platform is consolidating over time; this map names what things *are*, which stays true as *where* evolves.
- **KC:** three rapid placement questions ("Your client wants a chatbot on their site — which environment?").
- **Docs handoff:** /getting-started, /accounts, /crm, /business-app
- **Footer:** "Now that you can see the whole board, let's walk your side of it."

## 1.3 Partner Center walkthrough

- **URL:** /learn/getting-started/partner-center-walkthrough
- **Difficulty:** Beginner · **Time:** 15 min · **Prerequisites:** 1.2 · **Source:** revise existing lesson
- **Outcomes:** navigate the seven areas of Partner Center; find any feature from memory of its area, not its menu position
- **Arc:** guided tour organized by the jobs in the left nav — CRM, Accounts, AI, Marketing, Commerce, Marketplace, Automations, Administration — with one "you'll use this when..." scenario per area. Keep screenshots current with the repo image standard; date-stamp the lesson visibly (menus move; the dated stamp tells learners what they're looking at).
- **KC:** none (orientation lesson) — MarkComplete only.
- **Docs handoff:** /partner-center
- **Footer:** "You know your way around. Time to make it yours."

## 1.4 Customize and brand your platform

- **URL:** /learn/getting-started/customize-and-brand
- **Difficulty:** Beginner · **Time:** 12 min · **Prerequisites:** 1.3 · **Source:** keep existing, light revision
- **Outcomes:** apply your brand to Business App and the store; control which pages clients see
- **Arc:** as existing lesson — partner branding, Business App page visibility (per the onboarding calls: administration → customize Business App → toggle sections clients see), store basics. Add the positioning sentence: white-labeling is why your clients say "my agency's platform," not "Vendasta."
- **Docs handoff:** /administration
- **Footer:** "Branded and yours. Now put your first customers in it."

## 1.5 Add your customer accounts and users

- **URL:** /learn/getting-started/accounts-and-users
- **Difficulty:** Beginner · **Time:** 18 min · **Prerequisites:** 1.4 · **Source:** revise existing + absorb Find Accounts workflow
- **Outcomes:** create accounts three ways (manually, via Find Accounts, in bulk); explain when a welcome email should and shouldn't go out; assign salespeople correctly
- **Arc:**
  1. The three ways in, led by **Find Accounts** prospecting (industry + city, Google-sourced, 20-per-search with the narrow-the-geography workaround — insights 4.7).
  2. Accounts vs users vs contacts — who's who, and the field reality that accounts often have "three, four, five, six people accessing different parts of their dashboard" (insights, CRM triage call). Tagging the decision-maker.
  3. Welcome emails grant Business App access — send deliberately, resend from the user's three-dot menu.
  4. Assign a salesperson so campaigns carry the right sender profile.
- **KC:** one — the account/company one-way street (reinforces 1.2).
- **Docs handoff:** /accounts, /getting-started
- **Footer:** "Customers in. Next, the people on your side of the glass."

## 1.6 Organize your team in the platform

- **URL:** /learn/getting-started/organize-your-team
- **Difficulty:** Beginner · **Time:** 10 min · **Prerequisites:** 1.5 · **Source:** keep existing, add sales-teams callout
- **Outcomes:** invite team members with the right permission level; set up sales teams that won't break round-robin scheduling later
- **Arc:** invitations and permissions (administration); member editing; and the one addition earned by field pain — **set up CRM → Sales Teams correctly now**, because team booking events check membership there and mismatches gray people out of round robin (a partner lost a month to this — insights 4.1). One paragraph, planted early, cross-linked from Path 3 lesson 4.
- **Docs handoff:** /administration, /crm
- **Footer:** "Team seated. Now the part everyone gets surprised by: the money."

## 1.7 Get set up to get paid

- **URL:** /learn/getting-started/get-set-up-to-get-paid
- **Difficulty:** Beginner · **Time:** 10 min · **Prerequisites:** 1.5
- **Outcomes:** explain the wholesale-retail model in one sentence; connect a payment method (or consciously choose manual invoicing); set retail prices on the products you plan to sell; name the one place to check billing monthly
- **Design principle:** this lesson covers only what a partner must do *before* their first sale. Every billing question that arises later — and there are many — is just-in-time knowledge and lives in documentation FAQs, linked from a closing "when you need it" box, not taught here.
- **Arc:**
  1. The model in one diagram: Vendasta charges you wholesale; you charge clients retail; the spread is your recurring revenue. (Money-overlay variant of the canonical 1.2 diagram.)
  2. Decision one — how you collect: connect Vendasta Payments for automatic card-on-file collection, or invoice outside the platform. One decision, honestly framed: automatic is hands-off; manual means you own the chasing. Docs handoff for the connection steps.
  3. Decision two — what things cost: set retail prices on the products you intend to sell, or knowingly accept the suggested defaults. Packages exist and are usually the better unit to sell (cross-link to 1.8 and 3.10 for the why).
  4. Your monthly self-check: Billing → estimated usage — one sentence, one screenshot.
  5. **When you need it (the just-in-time box):** links into documentation FAQs, not lesson content — what happens when I change a price (new activations only); changing one client's price (per-account override); why did this product activate itself (Snapshot trial linkage, free-tier auto-activation, and the toggle); avoiding a renewal charge (cancel timing); current processing rates. These exist as docs FAQs (see production note 8) so the lesson never goes stale.
- **KC:** one — "You're ready to sell when..." (pick the three true statements: payment method decided, prices set, self-check location known).
- **Docs handoff:** /administration (Vendasta Payments), /commerce, /marketplace (pricing)
- **Footer:** "You can take money. Last stop: see the whole growth engine run end to end."

## 1.8 Your growth engine: Snapshot, Marketplace, Business App

- **URL:** /learn/getting-started/growth-engine
- **Difficulty:** Beginner · **Time:** 15 min · **Prerequisites:** 1.1–1.7
- **Outcomes:** run the full loop for one real prospect: find → snapshot → propose → activate → deliver → prove
- **Arc:** capstone walkthrough with a single worked example (a local business, start to finish): Find Accounts (1.5) → Snapshot as the door-opener → package from the Marketplace → activate and bill (1.7) → client lands in branded Business App (1.4) → proof of performance shifts from Snapshot to Executive Report — including the field lesson to configure client notifications deliberately (a partner's client got automated "bad news" emails until they turned them off — insights 4.4). Close by mapping each step onto Attract, Convert, Engage from 1.1.
- **KC:** ordering exercise — put the six steps of the loop in sequence.
- **Docs handoff:** /snapshot-report, /marketplace, /business-app, /reports
- **Footer:** "That's the platform running. Everything from here makes it run *without you doing the work*. Two roads: understand how AI Employees think (AI foundations) or hire your first one now (AI Workforce)."

---

# Path 3 · Hire your AI Workforce

Path promise: deploy the workforce on your own business and at least one client, train it to answer accurately, automate the follow-through, stay compliant, and sell it with field-tested scripts.

## 3.1 Meet your AI Workforce

- **URL:** /learn/ai-workforce/meet-your-workforce
- **Difficulty:** Beginner · **Time:** 12 min · **Prerequisites:** Path 1 or equivalent familiarity
- **Outcomes:** name the roster and what each employee does; place each on the Attract/Convert/Engage map; state where a given employee lives (Partner Center vs Business App); decode product tiers
- **Arc:**
  1. Roster tour as an org chart, not a feature list: AI Receptionist (chat and voice), Reputation Specialist, Sales Assistant, Inside Salesperson, Data Analyst, Support Agent, Custom — each with a one-line job description and lifecycle stage. Note the coming-soon bench honestly (Social Media Manager, etc.) with no dates.
  2. Where they live — reprise the ecosystem map with the AI overlay (your employees vs your client's employees). Evidence: the misplaced-receptionist story (insights 3.1).
  3. Tier decoder reprised from 1.7: standard/pro/premium, and premium as the voice gate ("upgrade to gain access" — insights 3.6).
  4. The three components every employee is built from — Knowledge Base, Capabilities, Tools — introduced by name only, with the promise that 3.5 and 3.7 make them real. (Full concept treatment lives in Path 2; this path stays hands-on.)
- **KC:** roster matching — five client complaints, five employees.
- **Docs handoff:** /ai, /ai/ai-workforce
- **Footer:** "Before you hire for a client, hire for yourself."

> **Superseded (July 5):** Cal re-split 3.2/3.3 by skill, not audience — they taught the same deploy twice. New shape: **3.2 Hire the Chat Receptionist** (own site first as the opening move, then the client install) and **3.3 Put it on the phones: the Voice Receptionist** (plan gate, number, greetings, caps, test calls). The guinea-pig strategy below folds into 3.2's opening; collect-your-sales-assets moves to 3.10. Voice details below in old 3.3 arc item 2 are the core of new 3.3. Note: docs say the voice gate is the **Professional** plan, not premium.

## 3.2 Become your own first customer

- **URL:** /learn/ai-workforce/your-own-first-customer
- **Difficulty:** Beginner · **Time:** 20 min (mostly doing) · **Prerequisites:** 3.1
- **Outcomes:** activate the chat receptionist on your own website; hold your first coach-and-correct session; explain why this is the selling strategy, not just practice
- **Arc:**
  1. The pattern, in partners' own words: "I should use my own website as the guinea pig so I can speak about it easily with clients." "We use the same thing — let me show you how it's doing for us. Wouldn't you like the same?" (insights 3.9). And CS's confirmation: the chatbot is free on your own site — "train your own chatbot, you will know how it reacts."
  2. Do it now: activate on your own site, ask it your ten most likely prospect questions (seeds the 3.5 audit habit), watch it fail somewhere, fix one thing.
  3. Set up the guinea-pig account properly — this account is the lab for every remaining lesson in the path.
  4. What to collect while you test: screenshots of real captured leads, before/after answers — these become your sales assets in 3.10.
- **KC:** none — the lab is the check. MarkComplete gated on a self-attested "my receptionist is live on my site."
- **Docs handoff:** /ai/ai-workforce/ai-chat-receptionist
- **Footer:** "You've hired one for yourself. Now do it for a client, properly."

## 3.3 Hire your first AI Employee: the AI Receptionist

- **URL:** /learn/ai-workforce/hire-the-receptionist
- **Difficulty:** Beginner · **Time:** 25 min · **Prerequisites:** 3.2 · **Source:** consolidates 4 existing AI Receptionist lessons
- **Outcomes:** deploy a chat receptionist on a client site; extend it to voice; choose channels deliberately; know the built-in limits
- **Arc:**
  1. Chat first: install, connect knowledge (website source), name it — partners name employees like staff (Amanda Brooks, Sophia, Martin — insights, multiple calls) and so should clients; it changes how they treat it.
  2. Voice: the premium gate, the dedicated registered phone number, speech model and greeting selection, the 10-minute call cap, call recording disclosure (insights 4.8, E-vantage call).
  3. Channels and where conversations land (Business App conversations; notification setup so someone actually sees the leads).
  4. What it can't do yet — say it plainly; trust content outperforms hype with this audience.
  5. **Do it, delegate it, buy it:** DIY (this lesson) vs the one-time setup service vs monthly managed — with CS's verbatim framing of who chooses what (insights 3.7).
- **KC:** two — channel choice for two business types; what the premium tier gates.
- **Docs handoff:** /ai/ai-workforce/ai-chat-receptionist, /ai/ai-workforce/ai-voice-receptionist
- **Footer:** "It answers. Now teach it to *book* — the number-one thing partners ask us."

## 3.4 Teach it to book: calendars, appointments, and call routing

- **URL:** /learn/ai-workforce/teach-it-to-book
- **Difficulty:** Intermediate · **Time:** 30 min · **Prerequisites:** 3.3
- **Outcomes:** connect calendars per user; configure booking links and team events without the round-robin trap; enable booking in the receptionist; build business-hours routing with a custom capability
- **Arc:** the two-part flagship (insights 4.1, six of fourteen calls):
  1. **Part A — the plumbing.** Per-user calendar connection (admins cannot do this for teammates — the mistake that opened a real onboarding call); My Meetings → booking links (durations, one-word slugs); team events, round robin vs multi-host, and the Sales Teams gotcha (cross-link 1.6); enable the Book Appointments capability and **remove Record Preferred Booking Time** (it reads like a broken booking flow); one calendar per receptionist — decide whose.
  2. **Part B — the orchestration.** The business-hours routing pattern exactly as built live with CS: confirm the employee can tell time; create a Business Hours Check capability in markdown (## instruction, ### numbered steps, dash branches); reference other capabilities by capitalized proper name ("use the Transfer Call capability"); pull hours from website knowledge, never hardcode (holiday-proof); extend Capture Leads with the department question instead of duplicating logic; order capabilities top-down by priority.
  3. **Test protocol:** call during hours → expect transfer; call after hours → expect capture. Both, every time.
- **KC:** debug scenario — "round robin shows your salesperson grayed out; what do you check first?"
- **Docs handoff:** /crm (My Meetings), /ai/ai-capabilities
- **Footer:** "Booked and routed. Next, make every answer it gives as sharp as its booking — training time."

## 3.5 Train your AI Employee

- **URL:** /learn/ai-workforce/train-your-employee
- **Difficulty:** Intermediate · **Time:** 30 min · **Prerequisites:** 3.3
- **Outcomes:** audit an employee before clients see it; fix knowledge sources; write a pricing guardrail; recognize over-prompting; run the coach-and-correct loop on a schedule
- **Arc:** the defining-skill lesson (insights 3.3, 4.2):
  1. Open with the field story partners tell on themselves — the chatbot that quoted "$800 to $2,000" for a $499 package — and the good news that makes it teachable: it's a twenty-minute fix. Diagnose it together (auto-imported content, no price list, no guardrail), then spend the lesson building the fix.
  2. The mental model, in CS's own metaphors: knowledge is the degree ("you don't use it daily but it's at the back of your mind"), capabilities are the skill. Input rule: trash in, trash out.
  3. The audit: ten likely prospect questions, prices included, before launch — and after every knowledge change.
  4. Fix the sources: clean authoritative documents over auto-imports; upload the price list with exact figures.
  5. The guardrail capability: quote only from the published list, never generalize, hand off to a human otherwise.
  6. Prompt discipline: over-prompting degrades behavior — "find the right degree of prompt length without over-engineering it."
  7. The operating mindset: it's a new employee, not a setting. "You cannot just train it once and leave." Coach weekly at first. **Go break it** in test-and-try — and the reset-to-default arrow when an edit goes rogue ("if you ever break something, hit that little button").
  8. Regulated verticals sidebar: refuse health details, redirect, "customer" never "patient" (dental pattern, insights 3.3) — full treatment in 3.9.
- **KC:** write-the-guardrail exercise (free text against a model answer) + one over-prompting diagnosis.
- **Docs handoff:** /ai/knowledge-base, /ai/ai-capabilities
- **Footer:** "One well-trained employee changes a client's week. A roster changes their business."

## 3.6 Grow the roster: the specialists

- **URL:** /learn/ai-workforce/grow-the-roster
- **Difficulty:** Intermediate · **Time:** 25 min · **Prerequisites:** 3.5
- **Outcomes:** deploy the Reputation Specialist with correct thresholds; pair it with automated review requests; choose the right Convert and Engage employees for a client's business model
- **Arc:**
  1. **Attract — Reputation Specialist.** The two-system reality taught honestly: review *requesting* is automation-driven, review *responding* is the AI employee — two systems, one outcome (insights, Fast Track intake). Star thresholds with CS's reasoning: auto-respond 4+ ("four-star reviewers had nothing but great things to say but feel they're not supposed to give a five"), route below 4 to a human. Respond the SEO-aware way: name the service and the location.
  2. **Convert — Sales Assistant and Inside Salesperson.** Lead qualification, CRM updates, research; where the AI SDR direction is heading (partners are already asking — insights 3.10).
  3. **Engage — Data Analyst and Support Agent.** Insight on demand; resolution-first support.
  4. **Match the employee to the business model** — the decision partners get wrong: online-only business → chat, not voice ("he doesn't want to answer the phone"); trades → voice with after-hours capture (insights 3.8).
  5. Each specialist section ends with its do-it/delegate-it/buy-it line.
- **KC:** matching exercise — four client profiles, right employee and channel mix.
- **Docs handoff:** /ai/ai-workforce (per-employee pages), /automations
- **Footer:** "The pre-built roster covers most jobs. For everything else, you build the employee yourself."

## 3.7 Build a Custom AI Employee (lab)

- **URL:** /learn/ai-workforce/custom-employee-lab
- **Difficulty:** Intermediate-advanced · **Time:** 45 min lab · **Prerequisites:** 3.5
- **Outcomes:** design an employee from an outcome statement; assemble knowledge + capabilities + tools; test to a pass/fail script
- **Arc:** hands-on lab in the guinea-pig account (3.2). Outcome-first design ("what is the result?" — the CS question, insights 4.8); write the role; attach knowledge; build one custom capability using the 3.4 markdown pattern; add one simple tool (a calendar or CRM action); name it; run the ten-question audit from 3.5. Reference build: the always-accurate quote assistant (the field case that replaced an error-prone spreadsheet — insights 3.10) at concept level; the full API version lives in the Builder track.
- **KC:** the lab's pass/fail script is the check.
- **Docs handoff:** /ai/ai-workforce/custom-ai-employees, /ai/ai-capabilities/creating-custom-capabilities
- **Footer:** "Your workforce works when spoken to. Now make it work when *nobody* is speaking to it."

## 3.8 Put your workforce on autopilot

- **URL:** /learn/ai-workforce/autopilot
- **Difficulty:** Intermediate · **Time:** 30 min · **Prerequisites:** 3.6
- **Outcomes:** build a smart list and pair it with an automation; ship the three starter recipes; read an activity log with confidence; describe the multi-location pattern
- **Arc:**
  1. Name the gap out loud: partners at real scale run zero automations "because it's so complicated" (insights 3.4). This lesson is the gentle on-ramp, not the full matrix.
  2. Smart lists as living filters: create → filter (record source) → the list is the trigger (insights 4.3). The partner's bar to beat: "If your automation requires manual input, it's not an automation."
  3. The three starter recipes, each built in full: form submission → nurture campaign; new lead → owner task + SMS acknowledgment; job complete (integration) → review request.
  4. Reading the activity log: "entity already exists" failures that are actually safety nets working (insights 4.10).
  5. The advanced example as inspiration, not assignment: the 7-location review-request machine — zip-code branching, webhooks between locations, fallback to hub (insights 4.10). Builder track covers building it; here it shows what autopilot grows into.
  6. When a human stays in the loop — approval steps, and the social-drafts cautionary tale (an AI posted drafts the client never expected — insights, dental agency call).
- **KC:** design-a-recipe exercise — given a trigger and a goal, pick list filter + automation action.
- **Docs handoff:** /automations, /automations/automation-templates-overview, /crm
- **Footer:** "One more setup unlocks texting everywhere your workforce works — let's register it right the first time."

## 3.9 Keep it compliant

- **URL:** /learn/ai-workforce/keep-it-compliant
- **Difficulty:** Intermediate · **Time:** 20 min · **Prerequisites:** 3.8
- **Outcomes:** pass A2P on the first try using the audit-first checklist; know exactly what to do if a submission comes back; set data-handling rules for sensitive verticals
- **Arc:**
  1. Open with the payoff: SMS is the highest-converting channel your workforce has, and registration is what switches it on. Frame the whole lesson as the fast path to approval — partners who prep the website first report near-automatic passes, and most of the prep is three small website items.
  2. **Audit before you submit:** the pre-flight checklist — privacy policy with SMS/data terms, ToS page, opt-in/opt-out on every phone-collecting form, legal name/EIN/address/authorized rep, nearest category from the fixed list. Ask CS for the website compliance audit (~95% first-pass approval after fixes — insights 4.6). Keep a plug-and-play ToS/privacy template like the successful partners do.
  3. Where to file: Administration → Conversation settings → Register now (or the setup service files and monitors for you). Practical habit taught positively: plan the number strategy once up front and keep numbers stable as the business grows.
  4. **If a submission comes back:** resubmission is normal and quick when you know what to fix — escalate via CS for the exact reason, fix everything flagged in one pass, and keep building everything else while you wait. (Detailed rejection troubleshooting lives in documentation, linked — not in the lesson.)
  5. Sensitive verticals: the dental pattern as smart client service — train the employee to gracefully redirect health details to the provider and say "customer" rather than "patient"; position this as the professionalism that wins regulated-industry clients (insights 3.3).
  6. Regional notes in one neutral paragraph, linked to documentation for specifics (insights 3.5).
- **KC:** checklist ordering + one rejection-triage scenario.
- **Docs handoff:** /marketing/forms, /ai (data/privacy pages), vendor ToS templates if published
- **Footer:** "Deployed, trained, automated, compliant. Now the part that pays for all of it."

## 3.10 Sell and manage your AI Workforce

- **URL:** /learn/ai-workforce/sell-and-manage
- **Difficulty:** Intermediate · **Time:** 30 min · **Prerequisites:** full path
- **Outcomes:** pitch outcome-first with the field scripts; run the champion wedge on a multi-stakeholder prospect; segment clients into adoption tiers; package and price; run the monthly manage-and-improve loop
- **Arc:**
  1. **The words that work** (verbatim script bank — insights 3.8): lead with the outcome, not "AI" ("never miss another lead; no question goes unanswered, 24/7"); the junior-receptionist framing for job-fear ("an extra set of hands up front — the real receptionists do the skilled work"); after-hours economics ("you paid for that ad click; someone called Saturday and nobody answered — you paid to lose that lead"); demystify the knowledge base to dissolve fear ("you completely dictate what this thing knows and how it behaves").
  2. **Your proof is your own account** — cash in the assets collected since 3.2.
  3. **The champion wedge** for franchises and groups: deploy with one believer, prove lead volume, take receipts to the decision-makers (insights 3.8).
  4. **Segment your clients like the pros segment theirs:** the four-tier insight applied as a client-coaching skill — power users get the next challenge, surface-scratchers get one simple win that changes their week ("you can be a hero with really simple tools, then move on" — insights 3.11). Optional motion for mature partners: the paid discovery interview → scoped engagement model.
  5. **Packaging and pricing:** bundle employees into packages; wholesale-retail math (cross-link 1.7); setup fees and their scaling tension (the field complaint that per-employee fees throttle multi-employee deals — price the bundle, not the seat).
  6. **Do it, delegate it, buy it — the whole path in one table:** what you now do yourself, what the $199 setup covers, what $29/month managed means (12-month term stated plainly), and the fulfillment-form workflow that actually kicks off services (a real order stalled because nobody filled the form — insights 3.7).
  7. **Manage and improve:** the monthly loop — review conversations, retrain on misses (3.5 audit), expand autonomy as trust grows, report proof via Executive Report.
- **KC:** script selection for three client objections + one tier-segmentation exercise.
- **Docs handoff:** /marketplace (packages), /reports, /ai
- **Footer:** "You run an AI workforce and can sell it. Two roads deeper: understand *why* it behaves the way it does (AI foundations), or build what doesn't exist yet (Vibe, and the Builder track behind it)."

---

## Production notes for phase 1

1. **Order of writing:** 1.2 (ecosystem map — its diagram unblocks everything), then 3.4 and 3.5 (highest-demand), then 3.1–3.3, then Path 1 revisions, then 3.6–3.10, home page last (it links to finished things).
2. **The canonical diagram** (1.2) needs design once and reuse everywhere: ecosystem map with an AI-overlay variant (3.1) and a money-overlay variant (1.7). One source file, three exports.
3. **Existing-lesson salvage:** 1.3/1.4/1.5/1.6 revise in place; the four AI Receptionist lessons collapse into 3.3/3.4 with redirects; marketplace selling material feeds 3.10.
4. **Interactive components (corrected by repo recon):** KnowledgeCheck is the only functional interaction component (client-side, six question types — mcq, truefalse, whicharea, fillblank, match, sort). CourseProgressBar, MarkComplete, SectionFeedback, and InlineHighlighter are inert stubs (`return null`). New lessons still invoke the full stack with the standard courseId/site props — costless, keeps markup consistent with existing lessons, and preserves the option to wire real tracking later — but nobody should promise learners visible progress bars in phase 1. Real completion tracking is a phase 2+ decision (flag for Maryam: wire the stubs to a backend, or replace with localStorage-only progress).
5. **Screenshots:** every UI screenshot gets the repo's standard styling and a visible last-verified date. Blur client PII per repo rules.
6. **Voice pass:** every lesson opens with the learner's problem, quotes real field language where it teaches, sentence-case headings, no emojis, no hype. The scripts in 3.10 stay verbatim-faithful — partners reuse them word for word.
7. **SME review lanes:** 3.4 and 3.9 need CS review (Nathan Yaworski's team knows these flows cold); 1.7 needs billing accuracy review; 3.9's audit-tool reference needs confirmation that partners may request it (it was offered freely on calls, but confirm it's a supported motion before documenting).
8. **Docs-side dependency — billing FAQs.** Lesson 1.7 deliberately teaches only sale-readiness and defers six recurring billing questions to documentation: price changes affect new activations only; per-account price overrides; auto-activation causes and the off switch; the Snapshot-Reputation trial linkage; cancel-before-renewal timing; current processing rates. Audit `/commerce` and `/administration` for existing coverage and create a consolidated billing FAQ page for whatever's missing — this is a DOC-board work item that ships with phase 1, since the lesson links to it. The tier decoder (standard/pro/premium) moves out of Path 1 entirely and is owned by lesson 3.1.
