# Convert > Marketplace — transcript notes

Running notes extracted from SME/partner call transcripts. Feeds the
`learning-path-writing` skill when this path is drafted or enriched.
Each entry below is one source call — do not merge or overwrite prior entries.

---

## Date unknown — Catalina Bresser & Alistair George (Vendasta) with Robert Ferenc (Swisscom/reseller prospect)

**Source:** [CALL] Enterprise reseller pricing walkthrough of the Marketplace and packaging tools (call context: appears to be mid-to-late July, based on Robert's trip timing, not stated explicitly in the transcript; CRM AI tier detail from this same call is filed in `crm.md`).

1. The **Marketplace tab** in Partner Center is where partners look up product info, pricing tiers, and packaging/resale options — e.g., searching "CRM AI" surfaces the paid/upsell version's detail page, and each product page breaks out exactly what's included at **Standard vs. Professional vs. Premium**.
2. The **Professional tier for Conversations AI effectively doesn't exist in some European markets** (e.g., Switzerland) because it requires a dedicated phone number, which carries different carrier costs by country — EMEA quoting uses only Standard and Premium.
3. Two separate marketing-collateral tracks sit behind the marketplace: **"channel partner facing" collateral** (informs the reseller on packaging/pricing — decks, breakdowns) vs. **"SMB facing" collateral** (client-facing materials, English by default, meant to be reused/relabeled by the partner's own marketing team).
4. The marketplace surfaces **third-party vendor products/apps alongside Vendasta's own**, browsable via search — explicitly separate from the partner's own product shortlist ("Start Selling").
5. Conversations AI tier/limit structure relevant to how partners package it: Standard = chat only; Premium = adds voice; an **"Embedded"** chat tier (same as Standard but with the AI-message limit removed) is reserved for large enterprise accounts committing a minimum of 250 seats. Standard chat ships with a monthly AI message limit (200/month cited in the pricing sheet shown on this call) with paid add-on packages to raise it; voice Premium ships with a base allotment (800 minutes/month cited) with paid add-on packages for more minutes.
6. Underlying AI model choice is partner/end-customer configurable (OpenAI, Anthropic, ElevenLabs, Deepgram) and can be locked down by the partner if they don't want end customers changing it. EMEA testing found Deepgram best for English and OpenAI/ElevenLabs often better for other languages, with ElevenLabs sometimes struggling on clean language-switching across many languages.
7. Sales-demo workflow for prospecting a reseller: spin up a demo/fake business account (any invented business name works — no real domain needed), the platform auto-crawls the site to seed AI receptionist knowledge within minutes, and the chat widget can be embedded on that demo site for a live phone/chat walkthrough during the pitch.

---

## Date unknown — Mark Brodahl, Brad Petersen, Catalina Bresser & Alistair George (Vendasta) with David Lynch, Kristen George, Stephen, Rebecca Rhydderch & Luke Archbold (Yell, UK)

**Source:** [CALL] Enterprise scoping/sales call with Yell (UK marketing reseller), covering the Marketplace/packaging model in depth (call also covered CRM positioning — filed in `crm.md` — plus AI Employees and Vibe, out of scope here).

1. **"Discover Products"** is the name of the channel-partner-facing product catalog inside Partner Center — end customers never see this view unless a partner explicitly exposes something to them. It lists both Vendasta owned-and-operated products and third-party vendor products (e.g., Yext, Wix, Uber-all-style listing distributors) side by side.
2. Partners can either **(a) bring an existing vendor relationship** into the marketplace and use Vendasta's connector purely to consolidate reporting, or **(b) use Vendasta's own negotiated/owned product** for the same function (example given: a lighter-weight owned listings product covering just Google/Apple core listings instead of a 5,000+ point distribution network) — both models coexist by design.
3. **Package builder, demoed live:** select multiple products to bundle (built live on this call: Conversations AI voice receptionist + CRM AI Standard + Reputation); the builder shows the **wholesale rate and a suggested/recommended retail rate side by side**, in the partner's local currency (GBP shown alongside USD). Retail price is editable per package to protect the partner's margin; wholesale is not.
4. Wholesale pricing is **volume/stairstep-based**, varying by vendor, product, and commitment tier (banding cited: roughly 0–100, 100–500, up to thousands of accounts) — high-volume custom pricing is negotiated directly rather than pulled off the standard rate card.
5. Most partners don't sell full a-la-carte (one partner's catalog view had ~19 individual products available) — instead they build a small number of **predefined bundles** using a simple named-tier convention (bronze/silver/gold/platinum given as the example) as the default go-to-market pattern. True bespoke per-deal packaging exists but is mainly used at the high end when a rep has uncovered a specific gap in a specific deal.
6. Reference case cited (publicly documented, so usable in training material): **"Italian Online,"** a large European partner, built its entire product ladder — from a low-cost hard-bundled basic tier through several upsell layers — entirely on top of Vendasta's CRM and chatbot, per statements Vendasta says are already public via press release.
7. **Two account set-up paths for provisioning a package onto a new client:**
   - Manual, via the Partner Center UI: pick a market/business-profile template, which auto-activates the associated products.
   - API-driven, for partners running meaningful volume: orders submitted in the partner's own CRM/sales tool (Salesforce, HubSpot, etc.) trigger provisioning on Vendasta's side automatically — no one needs to log into Partner Center at all.
8. New-account setup automatically pulls the business's **Google Business Profile data (via the Google Places API)** as part of provisioning — this same pull is what seeds the AI receptionist's initial knowledge.
9. **Fulfillment/ownership is a separate commercial decision from the package itself:** a partner can self-fulfill (with Vendasta training them) or pay for Vendasta's professional-services team to run fulfillment under the partner's brand. Pricing for the latter is a distinct professional-services conversation, not baked into product wholesale cost.

---

## Date unknown — Vendasta senior sales/product executive, account manager, and marketplace team member with a multi-location marketing agency prospect

**Source:** [CALL] Partner/prospect pitch — marketplace and platform overview call, first session in a multi-part evaluation

High-level platform framing given to the prospect, useful as reusable positioning language: Vendasta described itself (at time of call) as roughly **650 employees**, operating in **24 countries**, with the platform itself coded to support **24 languages** and AI-driven translation extending real-time support to roughly **80 languages**, serving about **60,000 agencies** and **6.5 million SMBs** on the platform. The "spider" analogy used to explain platform architecture to a new prospect: Partner Center is the **body** of the spider (the partner's own base CRM/account), and each individual client account is a **leg** — each with its own connected CRM instance that rolls information back up to the central body, all of which becomes consumable by AI.

Vendasta's differentiation pitch versus point-solution competitors and other fulfillment companies, as stated on the call: it covers the **full end-to-end lifecycle** — proposal, order-taking, SKU/application provisioning, connectivity/fulfillment, invoicing, billing, and reporting/ROI — and owns its own CRM (explicitly claimed as displacing Salesforce for some SMB customers who adopt Vendasta's bundled products instead). Compliance posture cited: SOC 2 compliant, plus GDPR and California privacy-law handling — positioned as a meaningful differentiator versus smaller agencies/point solutions that can't afford that compliance overhead. Website hosting was called out specifically: Vendasta builds fully custom WordPress sites (not just a proprietary CMS) with its own hosting stack, including plugin/PHP version management, Cloudflare, and DDoS/firewall protection.

**Marketplace structure**: roughly ~100 services across categories (listings management, social media management, reputation management, content creation, various ad products including both Vendasta-owned solutions and other vendors). Inside the marketplace UI you can filter by vendor (Vendasta vs. others) and browse into any product's card to see how it works, its features, and its pricing before adding it to a client's account. **SSO from a partner's own branded dashboard** into any purchased Vendasta product was demonstrated explicitly — the partner never sees Vendasta branding, they simply pop between their own dashboard and the purchased tool seamlessly.

**Support/enablement model scales by partner size**: small agencies (roughly 500 accounts or fewer, per the exec's rule of thumb) typically just work with a customer service manager and get self-service launched account by account. Larger enterprise partners get an assigned account manager plus "forward-deployed engineers" (FDEs) — described as partial engineers/AI-savvy technical staff, not full software developers — who do a "train the trainer" onboarding and stay engaged through full rollout, including custom API/webhook integration work into a partner's existing homegrown systems.

Packaging pattern Vendasta's own direct-to-SMB division uses: tiered packages at roughly **$299 / $499 / $699 / $999 / $1,999 / $2,999 per month** (see `advertising.md` for the caveat that the higher tiers were partially garbled in the transcript), with the $299 tier including paid search. The exec's advice to smaller agencies: sell the same repeatable package over and over and get into an efficient sales/fulfillment routine, versus larger custom builds (which need FDEs) only once you're doing bespoke API/system integration work.

---

## Date unknown — a Vendasta account manager with a home-services-focused marketing agency partner (AI Workforce demo and pricing walkthrough)

**Source:** [CALL] Partner enablement — marketplace "Discover Products" and AI-ready package browsing

Within the marketplace, a **"Discover Products"** section surfaces pre-built, industry-specific bundles ("AI-ready workforce packages") combining multiple AI-powered SKUs (CRM AI, Conversations, Campaigns, Social Pro, etc.) at a bundled wholesale price, intended as a fast starting point rather than a finished, ready-to-sell package — the rep's guidance was that partners should still expect to customize/add the setup-fee SKUs (like AI Employee Setup) on top of the base bundle price before reselling it. See `ai-workforce.md` for the specific pricing walkthrough of an example automotive-industry bundle.

---

## Date unknown — a brand-new solo agency owner exploring database reactivation (partner discovery/pricing call)

**Source:** [CALL] Partner discovery call — marketplace/rebrand-and-resell model overview with a Vendasta sales rep

Vendasta was described to a first-time prospect as having a marketplace of AI tools, services, and software from third-party vendors as well as Vendasta's own in-house products, all of which the partner can **rebrand and resell** under their own brand/name. The client-facing side gets a login/portal where the client can see what they've purchased and their progress since onboarding. This "sell software, sell fully managed services, all in one place" framing was used to differentiate from needing 10 separate tool subscriptions.

---

## Date unknown — a solo prospective reseller (family/friends referral, passive-income motivation) (webchat/reseller demo and pricing walkthrough)

**Source:** [CALL] Reseller demo — marketplace and per-product pricing SKUs with a Vendasta sales rep

The rep repeatedly stressed the marketplace has **200+ services** to choose from, with a la carte activation (turn on one or many). Concrete SKU-level wholesale pricing walked through on this call:
- **Social posting tool** (manual, AI-assisted content creation): $15/month wholesale, unlimited posts.
- **Social Media Manager (AI agent)**: $24–25/month wholesale.
- **Landing page**: $149 wholesale.
- **Templated 3-page WordPress website**: $299 wholesale.
- **AI-built 5-page website** (fast turnaround, buildable in ~24 hours): $149 wholesale, commonly resold at $500–$600 retail.
- **Custom website build**: separate SKU, can include a developer joining partner/client calls.
- Local SEO/listing-sync tool: pushes accurate business data to **65 different listing sources**.
- General partner margin example cited by the rep: partners running a bundle of services around $250/month wholesale reselling at roughly $800–850/month retail to the end client (a general illustrative benchmark, not a specific customer's negotiated deal).
- The rep distinguished "tools" (client or partner self-serve) from "managed services" (Vendasta's own team does the work) — some partners had been comparing the tool tier against managed-service tiers and gotten pricing confused; worth clarifying this distinction explicitly when pitching.

---

## Date unknown — a multi-agency owner focused on SEO and AI automations (agency discovery/reseller partnership call)

**Source:** [CALL] Agency discovery call — marketplace and white-label reseller model overview with a senior Vendasta account executive

Framed to an existing multi-agency owner (four agencies across multiple countries, SMB-focused, deep in SEO) as roughly "150 different types of solutions" that partners can pick and choose from — the partner isn't required to use Vendasta for everything, just whatever gaps they want filled. The rep emphasized this is a fully white-labeled experience: "nobody knows it's Vendasta" — the end client only ever sees the partner's own brand. The rep said Vendasta works with roughly 60,000 agencies worldwide, ranging from solo operators to full-service agencies using Vendasta just for task management/fulfillment/reporting, up to enterprise-scale partners (example cited: a large multi-location quick-service-restaurant franchise partner using Vendasta only for listings management and review management across thousands of locations).

---

## Date unknown — a Vendasta account manager with a dental-marketing agency's owner/decision-maker

**Source:** [CALL] Reputation-management white-label sales demo; marketplace navigation and subscription-pricing segment

1. **Product discovery path:** Partner Center → Marketplace → **Discover Products**, filterable by category. Clicking into a product card surfaces: how-it-works overview videos, a feature/tier breakdown, an FAQ section, and dedicated **sales resources** (screenshots, sales/spec sheet files, and a white-label overview presentation) that a partner can use directly with prospects.
2. **Wholesale-credit subscription mechanic, clarified after partner confusion:** looking at a pilot account, the partner had seen a breakdown showing per-product dollar amounts against a $499 subscription line and assumed each product category had its own capped credit "bucket" toward the $499. The AM clarified this is **not** the case — **any combined wholesale spend, from any single product or mix of products, applies dollar-for-dollar toward zeroing out the $499 subscription**; there's no per-feature cap or siloing.
3. **Sandbox/pilot pricing caveat:** numbers visible in a trial/pilot account are not the partner's real locked-in pricing — actual reseller pricing includes **stair-step and bulk-volume pricing** that gets negotiated once the partner is ready to move forward, so pilot-account numbers should not be treated as final.
4. **Onboarding sequencing:** full platform training (top-to-bottom, from the dedicated onboarding team) happens *after* commercial terms/rates are settled — the initial sales/discovery call and even hands-on test-account walkthroughs are separate from that formal onboarding step.
5. **Company-scale context volunteered as a trust signal:** roughly 18 years in business, ~60,000 agency partners worldwide, and a marketplace that has grown from an original core of reputation management + social + listings + SEO/PPC to roughly 150 marketing services/products today.

---
