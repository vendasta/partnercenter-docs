# Intel brief: Vendasta brand, story, and product reality for the Learn tab revamp

**Project:** docs.vendasta.com Learn tab revamp
**Author:** Claude, for Cal Cooper
**Date:** July 3, 2026
**Status:** Source-of-truth intel. Feeds the information architecture spec.

---

## 1. The story the website tells (July 2026)

The homepage no longer sells a platform. It sells a workforce.

- **Hero:** "Meet the AI Workforce for local businesses"
- **Core narrative:** Powered by your business data, Vendasta replaces manual work, lowers operating costs with an AI workforce, and turns one-time services into predictable, recurring revenue.
- **Story arc:** missed leads, manual work, and tool sprawl → an AI Workforce of named AI Employees powered by the business's own data on one platform → partner payoff (recurring revenue, lower operating costs) → proof (66,000+ partners, 8.2M local businesses).
- **Lifecycle framework:** Attract. Convert. Engage. Full journey: Search → Capture → Nurture → Serve → Feedback → Engage → Analyze.
- **Dual audience in every sentence:** the AI works for the local business; the recurring revenue accrues to the partner.

The strategic principle underneath (from the 2025 guiding principles): **"AI does the work, humans orchestrate."** The learner's role shifts from doing to managing — setting strategy, training, and overseeing AI Employees. This is the thesis statement for the entire Learn revamp.

## 2. Product taxonomy (what partners actually buy and sell)

| Layer | Offerings |
|---|---|
| AI Workforce | AI Receptionist (chat + voice), AI Reputation Specialist, AI Sales Assistant, AI Data Analyst, AI Inside Salesperson, AI Support Agent, Custom AI Employees. Coming: AI Social Media Manager, AI Salesperson, AI SEO Expert |
| AI infrastructure | Knowledge Base (reference facts), AI Capabilities (behavior instructions), Tools (API actions in external systems) — the three components every AI Employee is built from |
| Vendasta Vibe | AI website and app builder, public Beta since June 3, 2026. "The first app builder that already knows your business." Pre-loaded business context, Connectors panel (CRM, forms, analytics, Supabase, AI Employees, hosting), React/TypeScript export, white-label reselling |
| Platform products | CRM AI, Conversations AI, Reputation AI, Social Marketing, Local SEO, Advertising Intelligence, Email and SMS Marketing, MatchCraft, Yesware, WordPress Hosting |
| Platform infrastructure | Partner Center, Business App (white-label client portal), Multi-location Portal, Snapshot Report, Sales CRM, Payments and Billing, Workflow Automations, Integrations, Executive Report |
| Marketplace | Rebrandable and resellable third-party plus Vendasta products; vendors join through Vendor Center |
| Services | White-label fulfillment teams, Setup Services for the AI Workforce |

Pricing story: "Deploy an AI Workforce. Get scalable recurring revenue." Starter $99, Professional $499, Premium $999, custom Enterprise. "Your platform is free when you hit monthly minimums."

## 3. The forward-looking story

- **Dec 2025:** Custom AI Employees launch. CEO Brendan King: "The arrival of practical AI for small businesses is a once-in-a-generation opportunity."
- **Mar 2026:** CRM AI launch — "the living CRM."
- **Apr 2026:** Italiaonline selects the AI Workforce platform to power MARiO for 100,000+ Italian SMBs — the AI Workforce as a white-label platform play for international channel partners.
- **Jun 2026:** Vibe Beta launches at Vendasta Connect, alongside the "liquid software" keynote: "For decades, you bought software and bent your business around it. Vibe inverts that."
- Partners name their custom AI Employees like staff: "Banks" (Blue River Digital), "Klaygent" (The Xcite Group). Proof-of-concept dogfooding: Vendasta built vTicket in Vibe in days, replacing a $100K+/yr Zendesk contract.

Roadmap themes to design ahead of: more pre-configured AI Employees, expanded third-party integrations, deeper orchestration for cross-system automation.

## 4. Voice and terminology rules for all Learn content

Brand voice: **bold, clever, helpful.** Confident, plain-spoken, outcome-first. Sentence-case headings, no end punctuation, no jargon, no hyperbole, no emojis in course copy.

Say this, not that:

| Use | Avoid |
|---|---|
| AI Employees, AI Workforce | agents, bots, assistants (in headline copy) |
| local businesses | SMBs (in customer-facing copy) |
| hire, train, manage, orchestrate (AI as staff) | deploy scripts, configure bots |
| out of the box, ready on day one | quick and easy setup |
| your business data, business-aware AI | our proprietary AI |
| recurring revenue, proof of performance | ROI synergies |

House phrases with equity: "Attract. Convert. Engage." / "24/7" / "no lead is missed" / "the app builder that already knows your business" / "AI does the work, humans orchestrate" / "Get more customers. And keep them."

## 5. Current state of docs.vendasta.com

One Docusaurus site, two docs-plugin instances, toggled by a DOCUMENTATION / TRAINING pill in the sidebar:

- **Documentation** (`/`): 389 docs, autogenerated sidebar, 20 sections. Notably `docs/ai/` already documents the full AI stack: AI Workforce employees, Knowledge Base, AI Capabilities, custom Tools (API calls, headers, parameters — the technical layer), Custom AI Employees, and a Vibe overview.
- **Training** (`/learn`): 68 lessons, migrated legacy course content. Categories: Getting Started (5), Platform (Business App, Marketplace, CRM, Integrations), Products (8 product folders), Automations & AI (2 courses), Vendasta Services (3). Courses have real interactive components: CourseProgressBar, KnowledgeCheck, MarkComplete, SectionFeedback, InlineHighlighter — wired to a `vendasta_learn` backend.

Adjacent properties: docs.businessapp.io (SMB product docs, has the deeper Vibe documentation), developers.vendasta.com (API portal). Clean three-way split; the Learn tab must map to all three without duplicating them.

## 6. Gap analysis: story vs Learn tab

| The brand says | The Learn tab says today |
|---|---|
| Meet the AI Workforce | 2 courses under "Automations & AI"; AI Receptionist is the only AI Employee with a course |
| Hire Custom AI Employees, train them with your data | Nothing on Knowledge Base, Capabilities, Tools, or custom employees |
| Vibe: build apps that already know your business | Nothing |
| Deeper orchestration, integrations, APIs | One "Integrations 101" course; nothing technical |
| AI does the work, humans orchestrate | Learner journey is still organized around doing the work manually in each product |

The documentation side is ahead of the learning side. The revamp is not a content migration problem; it is a story alignment problem. The Learn tab must teach partners how to run an AI workforce, in the same arc the website sells it.

## 7. Design constraints and assets to reuse

- Two-instance Docusaurus pattern is already in place; the revamp is content architecture, not platform work.
- Interactive course components exist — with one correction from repo recon (section 8): only KnowledgeCheck is functional; the progress/completion components are inert stubs.
- Curated sequencing is achievable with the existing autogenerated sidebar via folder structure and sidebar_position — no sidebar rewrite required.
- Cross-link, never duplicate: lessons deep-link to canonical docs pages for how-to steps (pattern proven on the citizen developers site with `type: 'ref'` entries and required-software chips).
- Lab anatomy pattern from the citizen developers site to adopt: difficulty badge, estimated time, prerequisites, checkable outcomes, phase-based progression with a required core and choose-your-own-adventure branches.

## 8. Repo recon reality check (July 3 — full detail in implementation-plan.md)

Three-repo deep scan (partnercenter-docs, businessapp-docs, vendastaapis) after the IA was drafted. What it changed:

- **The course components are stubs.** CourseProgressBar, MarkComplete, SectionFeedback, and InlineHighlighter were ported from the internal vendastalearn site with bodies replaced by `return null` — no backend, no API calls anywhere in the repo. KnowledgeCheck is real (fully client-side, six question types). Consequence: restructuring is zero-risk, but progress tracking is a decision to make, not a feature we inherit.
- **docs.businessapp.io is the canonical library for AI Employee and Vibe how-tos** — 46 AI docs and 27 Vibe docs, current to today. Standouts: a genuinely citizen-developer-friendly custom-tools guide (cURL import, methods/params/headers/auth, MCP, worked examples), five complete custom-employee recipes, a prompting guide plus paste-ready prompt library, four connector guides, and six worked Vibe use-case labs. Learn lessons link there for Business App-side how-tos rather than duplicating.
- **The public API surface is real and specific.** Flagship: a full CRM REST API (contacts, companies, opportunities, pipelines, custom objects), a public meeting-booking API, API-manageable forms, and vendor webhooks for purchase/account/user/customer events — all OAuth2 scope-gated with read-only variants, documented at developers.vendasta.com. Equally important is what does not exist publicly: no API for creating automations, AI assistants, Vibe projects, or conversations programmatically. Builder-track lessons teach the real surface and never overpromise.
- **Known documentation gaps** the Learn project either fills or flags: no standalone tools reference (buried in the capabilities guide), Vibe Code mode and GitHub sync effectively undocumented, no dedicated Vibe publishing page, AI booking scattered across two doc sets, A2P content duplicated in two places on the Business App side, and no consolidated billing FAQ (a phase 1 dependency).
