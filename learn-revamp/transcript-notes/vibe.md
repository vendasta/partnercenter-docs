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

## Date unknown — Vendasta account manager with an established multi-location digital marketing agency partner

**Source:** [CALL] Partner onboarding/enablement session — Vibe (natural-language site builder) demo plus AI receptionist packaging discussion

1. **Live demo mechanics:** the account manager built a themed novelty website (a movie-character-themed joke site, used purely as a demo prop) in about three minutes using natural language prompts inside Vibe, with the platform's own voice receptionist and chat embedded directly into the generated page (not floating in a corner — deliberately placed inline in an iframe/frame to show layout flexibility).
2. **Why a Vibe-built site inside the platform has an advantage over building the same thing on an external tool (e.g. Replit):** when you vibe-code inside an existing Vendasta business/account, the AI automatically has access to all of the data already ingested for that business — Google Business Profile data, website content, prior social/SEO history, past conversation history — so you don't have to manually feed the AI every fact about the business (name, years in business, fleet size, pricing, service area) the way you would starting from scratch on a generic external AI app builder.
3. **Backend/security stack disclosed:** data storage for a Vibe-coded business app uses **Supabase** as the backend (per-client data separation); an OAuth-based **Google Auth** layer is used for access security; the whole system is described as a "closed loop" rather than assembled from open-source parts, specifically for safety/control reasons.
4. **Content ingestion for a vibe-coded site:** you can ingest an existing website, upload files directly, or type natural-language instructions describing what knowledge to add — all of it gets stored in the account's shared knowledge base, which any of that account's other AI tools (chat, voice, etc.) can also draw on.
5. **Migrating an existing (non-Vendasta) website:** if a client already has a site on WordPress/Wix/another old CMS and doesn't want a rebuild, the AI chat/voice receptionist widgets can still be added by pulling the embed snippet from the AI Employee's configuration and pasting it into the existing site's code — no requirement to migrate to a Vendasta-built site first.
6. **Sales technique demonstrated:** find a trusted existing client ("a hero account") to use as a live demo environment — offer them the software free or at cost in exchange for using their real, populated account as a demo when pitching prospects, since a live account with real connected data looks and feels far more convincing than an empty demo shell.

---

## Date unknown — Vendasta customer success manager with a solo digital marketing agency owner (law-firm and other small-business clients)

**Source:** [CALL] CS check-in / product-adoption review touching AI receptionist packaging and Vibe use cases

1. **Vibe credit mechanics:** every prompt/ask inside Vibe consumes credits, regardless of whether the output is "finished" — the CSM's framing: budget for iteration as part of the creative process rather than expecting to get a perfect result in one shot.
2. **Use cases well outside client marketing work:** Vibe can build small internal/personal tools just as easily as client-facing sites — cited examples were a personal household chores/cleaning-schedule tracker and (suggested on the call) a grocery-list app — illustrating that Vibe isn't limited to "website for a business," it can produce any lightweight natural-language-described app.
3. **Guidance on trusting Vibe for anything requiring factual accuracy (e.g., legal-adjacent content):** Vibe is well suited to building the *structure/concept* quickly, but for content that must be verified against outside facts, upload your own vetted source documents and instruct it explicitly to use only those sources — don't rely on the model's own general knowledge for anything you can't afford to have it "make up" (drawn from a direct comparison to AI legal-brief hallucination risk raised earlier in the same call).
4. **Realistic expectation-setting:** Vibe still requires ongoing refinement, the same way any AI employee does — it is not a fully hands-off, one-time build.

---

## Date unknown — Vendasta AI specialist with a multi-location retail-goods partner (furniture/appliance vertical)

**Source:** [CALL] AI Workforce products review — chat takeover/routing automation, new AI agents, and a Vibe custom-dashboard walkthrough

1. **Vibe activation is per-account, not partner-wide,** because the analytics data that feeds a Vibe-built dashboard is stored inside that specific Business App account. To build a dashboard pulling in an account's own Google/advertising/reputation/listings analytics, Vibe needs to be activated on that account specifically (not just once at the partner level).
2. **External data source integration:** Vibe can connect to a client's own external **Supabase** account/instance to pull in outside data beyond what's native to the Business App.
3. **CRM integration for Vibe-built sites (in trusted-tester/beta as of this call):** if a form built inside a Vibe-generated site is connected to CRM, submissions create CRM leads directly, giving you a working "form + AI chatbot + CRM" pipeline entirely inside a Vibe build.
4. **Custom-domain publishing is a Pro-tier feature.** On the free/standard Vibe tiers, a build launches on a shared Vendasta-branded default domain; Vibe Pro unlocks publishing to a fully custom domain for the specific build (e.g., a client-branded dashboard URL), plus more credits and unlimited applications versus the capped free tier.
5. **Best-fit use case caveat surfaced by the partner:** Vibe-coding a full replacement *website* isn't a good fit for a business with a large product catalog (e.g., a multi-brand furniture/appliance retailer) — the natural-language builder is much stronger for lightweight sites, landing pages, and internal dashboards than for a catalog-heavy storefront rebuild.
6. **Custom-dashboard example walked through live:** to build something like "a Google Ads performance dashboard with AI commentary/recommendations," the underlying advertising data has to already be flowing in via **Advertising Intelligence** (Google Ads, Search Console, GA4 connected) before Vibe has anything real to visualize — Vibe itself doesn't pull raw Google Ads data directly, it visualizes what's already synced into the account's own analytics/executive-report data layer.
7. **Real client example cited by the specialist (from a different partner's account):** a fully custom Vibe dashboard was built to show an end customer their entire "journey" in one place — ad spend in, website traffic generated, conversions/leads generated from that traffic, review-requests sent off those conversions, and listings/social performance before-vs-after — a much more narrative, customer-journey-oriented view than the standard Executive Report.

---

## Date unknown — a prospective solo agency owner with a Vendasta sales rep (pre-sale product-fit and demo call)

**Source:** [CALL] Live Vibe landing-page-generation demo during a prospect qualification call

1. **Live demo built a landing page from a single prompt referencing the prospect's own brand assets:** the rep took a screenshot of the prospect's existing social profile page (to capture his brand colors) and wrote a short prompt describing the business, based only on that screenshot and a verbal description (no brand doc was on hand). Vibe generated a landing page from that single prompt in under a couple of minutes while the call continued.
2. **Iteration model:** once generated, further changes are made by typing plain-language follow-up instructions directly into the same interface (e.g., "change the color scheme") rather than manually editing anything — the tool applies changes live.
3. **Per-client knowledge base, called out as the key differentiator versus generic AI website builders** (the prospect specifically compared it to Lovable): each client-facing portal has its own knowledge base populated from that business's own website and/or Google Business Profile, so prompting inside Vibe doesn't require re-explaining the business's context each time.
4. **Publishing path:** once satisfied, the page can be published directly, with the option to attach a custom domain and built-in hosting — no separate hosting step required.
5. **Embedded chat widget on the generated page** captures leads directly into the same platform/CRM the rest of the account uses.
6. **Sales incentive used on this call:** a complimentary Vibe website/landing-page build was offered as part of a month-end sign-up promotion, alongside a complimentary embeddable web-chat widget — pitched as a way to get a brand-new prospect something usable to start capturing leads immediately after signing up.

---

## Date unknown — a solo prospective reseller (family/friends referral, passive-income motivation) (webchat/reseller demo and pricing walkthrough)

**Source:** [CALL] Reseller demo — Vendasta Vibe AI site builder with a Vendasta sales rep

Introduced as **Vendasta Vibe**, described by the rep as "a liquid software" for creating landing pages/websites purely by prompting — no manual page-building. Two live examples shown: (1) starting from a client's existing PDF, the rep prompted "create an optimized landing page based on this, add offerings, add a form, add a chatbot, use the same brand colors" and Vibe produced a finished page within a couple of minutes; (2) starting from a client's existing website URL, Vibe pulled in the existing images and business info and generated a new landing page from that content, also within minutes. The rep positioned this as far simpler than building an actual custom website, and as a product the partner can activate for themselves and resell to build client sites (with hosting/domains sellable as add-ons).

---

## Date unknown — a Vendasta product leader, a Vendasta VP of product marketing, a Vendasta product manager (AI monetization), and a Vendasta product specialist, with the product leads of a large European telecom/media reseller partner

**Source:** [CALL] Internal-facing roadmap/feedback call on Vendasta's forthcoming AI credit system, plus a live campaign-builder coupon/QR-code walkthrough for the reseller's upcoming client demo

1. **Vibe's existing credit/add-on model, cited by Vendasta as the template the new Conversations AI credit system will mirror:** Vibe has "two different buckets of add-ons" — a **base amount of usage/credits bundled into the monthly plan, which expires at the end of the month** if unused, and a separate **top-up credit package** that, once purchased, is available for the **full year** rather than expiring monthly.
2. **Coupon + QR code workflow in the campaign/automation builder, demonstrated live:**
   - Coupons have their own dedicated **email template** (editable/translatable from the Coupon's own page, not the campaign builder) and a **downloadable QR code**.
   - **Gotcha:** the downloadable QR code is not scoped to one coupon — it links to a landing page listing **all currently active coupons**. If more than one coupon is active, a customer scanning the code lands on a multi-coupon page rather than the specific offer intended. Workaround used for a live demo: temporarily leave only one coupon active. Flagged to the Vendasta PM as a product-improvement request (a QR code scoped to a single coupon).
   - **Two ways to actually send a coupon by email today:**
     a. **Automation-based:** add a step, search "coupon," select **Send Coupon**, choose which coupon — this fires the coupon's own built-in email template automatically (no separate lead-capture/form-fill step needed).
     b. **Campaign-based:** inside a Campaign Pro email template, click the dynamic-fields icon, search "coupon" (the field is actually labeled **"Promotion"** — the UI overlaps "coupon" and "promotion" terminology, which caused confusion during setup), and insert the Promotion field to merge in the coupon's name/description.
   - **Confirmed limitation:** the campaign-side dynamic Promotion field can only insert a **static, identical code for every recipient**. It **cannot generate a unique/random code per contact** the way the dedicated coupon-email flow can. This is a real functional gap between the two paths, not a training issue.
   - **Partner's product ask (unbuilt, logged as feedback):** a first-class "Coupon" content block inside the campaign builder — pick a coupon from a dropdown and drop it in like an image/button block — instead of the current workaround of manually recreating or screenshotting the coupon's own template inside a campaign.
3. **Mobile browser bug in the automation/campaign builder:** building or editing an automation from a phone browser (tested on both Safari and Chrome on iOS) has a scrolling/tap bug severe enough to block saving — confirmed by the Vendasta PM as a known limitation, since the automation/campaign builder was designed and tested for desktop, not mobile. Recommendation: don't plan to build/edit campaigns or automations live on a phone for a client demo.
*(The credit-system/messages-to-credits conversion mechanics from this same call are filed in `conversations-ai.md`; the booking multi-operator issue is filed in `business-app.md`; the custom usage-alert report request is filed in `snapshot-executive-reports.md`.)*

---
