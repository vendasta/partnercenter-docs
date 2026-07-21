# Build with Vibe — transcript notes

Running notes extracted from SME/partner call transcripts. Feeds the
`learning-path-writing` skill when this path is drafted or enriched.
Each entry below is one source call — do not merge or overwrite prior entries.

---

## Date unknown — Bertram Croes (EU partner) with Catalina Bresser, Brad Petersen, Alistair George (partner platform demo, screen recording)

**Source:** [CALL] Ad planner + Vibe demo for a Netherlands-based partner, alongside a simplified CRM walkthrough.

Alistair demonstrated Vibe by feeding it a single business profile/outline document (generated with ChatGPT — a fictional "pigeon racing store" test business), typing one prompt, and hitting enter; a few minutes later Vibe had produced a multi-page website with a working contact form and a customizable embedded AI chat widget, unbranded by default. He then built something bigger live: a Business App **custom app** (not a website) for issuing condo parking passes, prompted step by step:
1. Describe the desired app in plain language (PDF export/printing support, a validity date range, a license-plate field).
2. Vibe enters **plan mode** first — it shows an objective description of what it intends to build before writing anything, with three choices: Approve, Edit (make your own changes), or Cancel and re-prompt for AI to revise the plan.
3. Approving kicks off the build; a live preview appears in a side panel within one to two minutes.
4. Built apps can be hosted externally, either public or gated behind a login page.

Settings panel for a Vibe project, walked through live: **Business Knowledge** (auto-populated from the business profile and a website crawl, if one exists), **Connectors** (single sign-on using the partner's own auth so users don't have to log into Business App separately), **Analytics** (pulls in platform reporting data), **Forms** (collected data feeds straight into the CRM), and a newly added **Supabase** connector for teams that want a full custom backend.

Templates (brand new at the time of the call): a finished Vibe project can be exported as a template — packaged as a `tar.gz` archive — and re-applied to other accounts, populating each with that business's own data. Alistair compared it to "an email template but three-dimensional."

Credits/account mechanics: every new Partner Center account automatically comes with a free Vibe plan carrying limited credits; a partner can also request one free Vibe Pro (still beta at the time) added to a specific account for a team that wants to build more seriously, and multiple people can work on separate projects inside the same account.

Sales positioning gotcha called out explicitly: partners commonly "aim too high" when pitching a Vibe-rebuilt website to an existing customer as a cold-outreach hook, framing it as a $200+/month package — which reads as a big ask and kills conversion. The pattern that converts better: position it as a low, roughly $20/month, fully-inclusive offer ("you don't have to do anything, we own your domain, all you need to do is say yes"), then upsell once the client is in the door.

Core differentiator named directly: unlike Lovable, Base44, or other generic vibe-coding tools that start every project from zero context, a Vendasta Vibe project already has the business's existing profile, website content, and platform data loaded in as a starting point.

---

## Date unknown — Gabriel Tsoi (Vendasta PM, AI monetization) certified-partner roundtable (Brett Prieskorn, Klint Rudolph, Nick Prentice, Simon Papadopoulos, Chris Geer, Jeff Pierce)

**Source:** [CALL] Roundtable gathering partner feedback on a proposed AI token/credit pricing model across products, including Vibe.

Vibe today bills the same way as Campaigns Pro — a straight monthly recurring subscription with no easy one-off purchase path. This was flagged as a real gotcha: Klint Rudolph described buying a block of roughly 100,000 Vibe credits for a one-time client project, then forgetting to cancel the purchase afterward, so the team kept paying for capacity it never used again for two to three months — the same failure mode he'd separately hit with Campaigns Pro email-send add-ons. The fix partners asked for: a genuine one-time credit purchase option for Vibe (buy a block for a specific project month, no recurring commitment), with unused credits ideally carrying over rather than expiring, instead of only offering a monthly subscription tier.

Partners were unanimous that they never want their own SMB clients to see "credits" as a concept for Vibe (or any AI feature) at all. They sell fixed deliverables/outcomes ("a blog a day," a finished project, "24 posts a month") and manage the underlying credit budget themselves behind the scenes; several specifically asked for the ability to hide the AI/credits section entirely from business-center users so a client can't see, or accidentally break, what's running underneath.

Roadmap signal mentioned in passing by Brett Prieskorn (attributed to a conversation with a Vendasta exec about the "2.0" vision): the long-term plan discussed internally is that partners won't expose the native Business App to customers at all — instead the partner **vibes their own customer-facing dashboard/portal**, wired to the same underlying data, and toggles on only the products/sections they want a given client to see. Partners on the call reacted positively to this because it avoids customers ever landing in the raw AI/credits UI.

---

## Date unknown — Braedon Gaudet & Jeff Leach (Vendasta) demo call with Dynamico, a HubSpot implementation partner (Amy Volatile, Brian Heppner, Emily Grotkin, Cody Baier)

**Source:** [CALL] Partner discovery/demo call; Vibe was the last of several topics covered, with limited time.

Vibe lets you build both custom reporting/analytics dashboards and full websites through conversation, comparable to Lovable or Base44 — but with a built-in advantage: a Vibe project starts already wired into the account's existing business, CRM, and reporting data instead of a blank slate. Best framed use case: **prototyping**, not always final production. Example cited: for a Four Seasons Sunrooms/Equinox Roof site rebuild, the team sat with the client live for about an hour, iterating in Vibe ("move the form fill to the right instead of the bottom") until the client loved the direction, then handed that approved concept to the dev team to actually code and launch (often onto WordPress) — Vibe itself wasn't the final hosting destination in that case.

If a client's existing website already converts well, there's no reason to migrate it into Vibe — the only benefit would be unified tracking/reporting, not a rebuild ("I would not move a website into vibe... that's not something that I would [recommend]," confirmed by both Braedon Gaudet and Jeff Leach). Where Vibe does shine standalone: fast, disposable landing pages — a seasonal offer page (example: a Valentine's Day promotion) can be stood up "in 20 minutes" for a short-lived campaign.

Live demo moment: asked on the spot "can I compare two locations," Vibe produced a working two-location comparison dashboard with dropdown selectors within the demo. This was pitched as valuable specifically for lean franchise corporate teams that don't have a big internal implementation team and would otherwise need to hire an agency to hand-code a custom dashboard.

---

## Date unknown — Myron Kindrachuk (Vendasta partner sales) onboarding/discovery call with Jeff Swinehart (new solo agency, home-services niche)

**Source:** [CALL] Partner onboarding/discovery demo call; Jeff was evaluating Vendasta against two other vendors.

Vibe was described as "the next thing on the horizon," still in beta at call time, using the term **"liquid software."** The pitch: unlike starting a project from zero in Lovable or Replit, a Vibe build already has the client's core business details and other platform data pre-loaded as a foundation, so results land faster and more relevant on the first pass. Concrete example given: an **estimator tool** for a roofing company — a widget a homeowner could use directly on the business's site to get an instant quote for a new roof or air conditioner based on square footage. Second near-term use case flagged: three-to-five-page starter websites for very small businesses, generated from just a handful of descriptive sentences in about three minutes — aimed at businesses too small to justify a full custom build.

---

## Date unknown — Chris Deianni & Dale Bruce Hopkins (Vendasta CTO) with Neighborly's data team (Mahesh Chandrappa, Javid Arain, Karen Elisa Nogueira, Balwant Singraul)

**Source:** [CALL] Follow-up call on Neighborly's AI-conversation reporting; a vibe-coded dashboard came up as the interim solution in place today.

Neighborly's current AI-conversation reporting runs on a dashboard that a Vendasta solutions engineer (Alistair) **vibe-coded** as an interim, non-productized solution — described on the call as "90% there," with the team actively weighing whether to keep iterating on it or graduate the client onto direct data-warehouse/BigQuery access instead. This is a concrete example of Vibe being used **internally by Vendasta staff**, not just partners, to stand up a bespoke client-facing analytics dashboard faster than a formal product build would allow.

Gaps surfaced when the client (Mahesh) walked through it live: no multi-month date-range selector (single month only); CSV/PDF export only exports the currently selected snapshot rather than a month-by-month breakdown, forcing a manual re-run per month for trend analysis; and inconsistent terminology between "AI bookings" and "assisted bookings" that had eroded the client's trust in the numbers until the definitions were walked through live on the call. The dashboard also can't show true revenue yet, because Neighborly doesn't share revenue data back to Vendasta — that link only closes once the client has raw data to merge against their own POS/revenue records themselves.

---

## Date unknown — Alistair George (Vendasta Sales Engineer) working session with Brian Hardy (partner, "Square Peg Pizzeria" / "Square Peg Connect" restaurant client)

**Source:** [CALL] Partner working session on integrating a Vibe-built lead-intake app with CRM automation.

Brian had built a Vibe app (catering/fundraiser/large-reservation lead-intake forms) storing all customer data in a **Supabase** backend rather than the platform's own CRM — largely because he didn't know the CRM option existed. Alistair walked through the tradeoff rather than prescribing an answer:
- Staying on Supabase means maintaining two parallel databases (Vibe/Supabase, and each location's Vendasta CRM) with no clear rule for which one is authoritative if they ever disagree.
- Moving to the CRM means first exporting existing Supabase contacts to CSV and importing them via **Contacts → Import**, then building matching custom fields under **Administration → CRM Objects** so nothing is lost in the move.

Platform gotcha raised live: **a Vibe project can only be tied to one Vendasta account at a time.** For a franchise wanting one Vibe app to serve multiple locations, all contacts have to route into a single "corporate" account rather than being split per location — workable here since Brian didn't need per-location visibility on this data.

Fallback integration pattern for teams not ready to migrate off Supabase: set up a Supabase webhook that fires on a real database event (e.g., a "last request" date field changing because of an actual customer action, not a scheduled job) and have it hit a Vendasta CRM automation that finds-or-creates the contact and starts the right campaign, using a `type` field in the webhook payload to branch between catering/fundraiser/reservation logic.

Live product bug flagged and escalated: the CRM automation step meant to populate a date field from webhook payload data was forcing a **hardcoded date** instead of allowing the dynamic-content picker to pull it from the incoming payload — Alistair called this out as "should not be like that... this feels like a bug" and took it to the product team on the call.

Workflow tip for larger rebuilds: export the entire Vibe project (a full code archive) and hand it to **Claude Code** with one long, detailed prompt describing the desired architecture change (e.g., "remove Supabase, use the CRM integration instead") rather than trying to do the rework inside Vibe's own AI agent — Alistair's stated preference, because Claude Code can connect to more external systems.

Vibe's managed/professional-services offering (a paid Vendasta team building this kind of automation on a partner's behalf) was still being defined at call time — pricing and scope rules were expected to firm up "within about two weeks."

---

## Date unknown — Amy Deck (Vendasta CS, Vibe specialist) deep-dive follow-up with Cephas Sharp & Felix Flores (C+J Creative Services, education-vertical agency)

**Source:** [CALL] Vibe deep-dive follow-up session, working through two live partner projects (a school waitlist/intake dashboard and a restaurant-style funnel-campaign builder).

Confirmed gotcha: the partner tried to rename a Vibe-hosted site to a **custom domain** and it silently didn't take — custom domains require upgrading off the free/beta tier to Standard or Pro first; once upgraded, a project can be published with a real custom domain (the free-tier default is a `vendasta.ai`-style address) with DNS pointed at it.

Two ways to build a custom AI agent were confirmed as functionally equivalent: through the standard AI section using custom capabilities, or inside a Vibe project itself — same end result, different tooling.

Recommended workflow to avoid burning credits: **draft and refine the full prompt in an external tool (Claude) first, then paste the finished prompt into Vibe**, rather than iterating live inside a Vibe session.

Vibe projects can call CRM data directly when given custom capabilities like "Access CRM Information" and "Create Email Template" — but at call time it was **unconfirmed** whether a Vibe-built agent can actually create a template that lands inside Campaigns Pro itself, versus just generating the content elsewhere; Amy Deck flagged this as something to verify with the internal team before the partner relies on it in production.

Forms built inside a Vibe project auto-populate the account's CRM contact record once "track form fills" is toggled on in project settings — but **only if the form's custom field names match the CRM's existing custom fields exactly.** A mismatch (in this case a bilingual English/Spanish intake form using differently worded field labels than the CRM's custom fields) is why submitted data wasn't showing up in the built dashboard as expected.

Getting SSO, full analytics, and a Supabase connection all require the same paid-tier upgrade as custom domains. The partner deliberately stayed on the free tier to build and pitch a working prototype internally before asking the school client to pay for the upgrade.

Account templates: a Vibe/AI-employee build made once inside a real (non-Partner-Center) Business App account can be saved as a template and copied to other Business App accounts — a path to productizing a build (e.g., the same intake-dashboard pattern) across multiple similar clients (multiple schools, in this case).

Confirmed limitation: a Vibe project **cannot be exported into WordPress.** It runs entirely in Vibe's own hosting environment — the two systems are architecturally separate, so "prototype in Vibe, then hand off to a developer to actually build the production site in WordPress" remains the pattern for teams that need a WordPress end state.

---
