# Vendasta Services — transcript notes

Running notes extracted from SME/partner call transcripts. Feeds the
`learning-path-writing` skill when this path is drafted or enriched.
Each entry below is one source call — do not merge or overwrite prior entries.

---

## Date unknown (context: before mid-July, likely June/early July 2026) — Ranjit Shinde, Vendasta partner/sales rep & Brian P., partner (owner, Slash Media) — product/reactivation overview call

**Source:** [CALL] Vendasta rep re-engages a dormant partner (agency inactive since a post-pandemic client falloff, restarting under a rebrand) and walks through current white-label pricing tiers, the $0-subscription mechanic, and paid setup services.

Brian had an old/dormant Vendasta account (a prior trial arranged by a rep named "Braden," last touched a few months earlier) and was evaluating whether to fold Vendasta's AI products into a relaunching product suite. The call covered reseller contract/pricing mechanics in enough concrete detail to log here.

**White-label / wholesale access — tier gating:**
1. Wholesale/white-label pricing is **not** available on the free plan.
2. White-labeling is unlocked starting at the **Professional** tier (referenced informally as "the $99 or professional" plan) and up.
3. The **Starter** tier is co-branded only — shows "powered by Vendasta" — it does not white-label.

**New subscription/billing mechanic described (a "$0 subscription" model):**
1. Partner pays a flat platform fee to onboard — example given was $119/month.
2. As the partner activates paid products for themselves or for clients, the dollar value of those activated products is credited against the *next* month's platform subscription charge.
3. Net effect: once a partner's activated product spend meets or exceeds the base subscription amount (e.g. $119+ worth activated), subsequent months bill only for the products — the base platform subscription fee effectively zeroes out.
4. This mechanic was described as consistent "across all the plans."

**Paid setup/enablement service ("AI Employee Setup"):**
1. Described as a one-time, white-glove service: Vendasta's team gets on a call with the partner and their client and configures the AI employee(s), triggers, and automations directly.
2. Complexity varies by product — Reputation Management setup is comparatively quick/simple; Voice Assistant setup is more involved because of call routing/forwarding, booking/scheduling, and automation configuration.
3. SLA given: once a product is activated and the enablement form is submitted, Vendasta's team reaches out within 24-48 hours to book the onboarding call.

**Account access / reactivation mechanics for a dormant partner:**
1. A partner's platform access persists even after months of inactivity — access does not need to be re-provisioned from scratch, and a rep can simply resend/refresh login access.
2. Marketplace navigation for reviewing a product's sell sheet: **Marketplace → Discover products → search by product name** (e.g. "reputation management") surfaces the product page with overview info, demo videos, screenshots, and downloadable **white-label material** (marketing/sales assets a partner can present to clients under their own brand).

**Regional/pricing specifics mentioned (verify current rates before reuse):**
- Reputation Management Premium: ~$35 USD/month standalone reference point (~$50 CAD quoted informally); Canadian starter-tier price for Reputation Management Premium given as $50 CAD.
- Social Media Premium: quoted around $25 (cheaper than Reputation Management); Canadian starter-tier price given as $30 CAD.
- A basic posting-only tool tier was quoted at $15 USD.
- Voice Assistant availability called out as US, Canada, and Australia only at time of call; Reputation Management was described as available worldwide.

**Note:** this call also covered live product-capability detail for Voice Assistant, Reputation Management AI, Social Media Manager, CRM AI, and the not-yet-released Local SEO product, plus a Vibe pitch — none of that is captured here; it belongs to other topic files (conversations-ai / reputation-management / social-marketing / crm / local-seo-listings / vibe respectively).

---

## Date unknown (context: mid-to-late July, per weather small talk referencing a June heatwave and an explicit "it's July" remark) — Johan Moreno & Alistair George (Vendasta account/solutions team) with Brandon Lake, Nikki DeSantis, Greg Rosenhan, and Scott Riddell (Resmark, a tour-operator software partner) — stalled-partnership revisit call

**Source:** [CALL] Vendasta revisits a partner-contract negotiation with Resmark that had stalled roughly six months earlier over specific product gaps, to see whether new in-flight platform development changes the calculus and to scope what an implementation/contract would look like next.

**New product development directly aimed at unblocking this contract — Inventory Management (in progress, database-level at time of call, UI not finalized):**
1. A new **Inventory Management** layer coming to Business App: lets a partner define actual product SKUs (not a workaround custom object) with monthly or one-time billing, each with name, ID, price, and description fields at minimum.
2. SKUs tie directly into CRM objects (Contacts, Companies) — e.g., "this contact purchased this product on this date," with quantity, dollar figure, and start/end dates supported.
3. A companion **"Invoicing"** object associates a Product with other CRM objects (Contacts/Companies) and does not have to represent an actual monetary transaction processed by Vendasta — it can just represent that a transaction happened elsewhere, purely for record-keeping/segmentation purposes.
4. This directly fixes the blocker that killed the deal previously: Resmark's core use case — "find everyone who booked this tour last season but hasn't rebooked this season, and send them a re-engagement campaign" — previously required hacking together CRM Custom Objects with associations, which Vendasta's own SE called "clunky" and a poor customer experience.
5. Second blocker fixed by the same feature: **audience-size preview before sending.** With the old custom-object-and-associations approach, the platform could not tell a partner how many contacts a filter/segment would actually match before they turned the automation live — a real "cross your fingers" risk. The new model will show the match count (e.g., "20 contacts" vs. "2,000") up front.
6. **Access path for early features:** Vendasta runs a **trusted-tester / beta-access program for channel partners**, giving early access to in-development features ahead of general rollout; Vendasta offered to look into adding this partner's demo account to a pre-trusted-tester tier even before the formal program opens, pending a check with the product manager.

**Contract-negotiation specifics surfaced on this call (pricing and structure):**
1. Reputation Management pricing at the basic tier (monitor + respond to reviews on a source like Google or Facebook) was quoted at roughly **$5 per client, per review source**. This was raised in direct pricing comparison against the partner's current competing tool (HighLevel), which bundles a basic review tool at no added cost.
2. Vendasta's rep offered, as part of structuring a larger partnership, to potentially fold that basic review-monitoring functionality in at no extra charge for the specific client base in question, rather than charging per-client/per-source.
3. Stated product/pricing philosophy driving Vendasta's direction: rather than handing a partner's clients a self-serve tool (e.g., a social scheduler they operate themselves), the goal is to sell an AI "employee" (e.g., reputation specialist) that fully completes the job — auto-requesting and auto-responding to reviews — with the client only monitoring/approving, not operating the tool by hand.
4. Onboarding/setup mechanics confirmed as standard process, not a special favor: after contract kickoff, the partner is assigned a **dedicated account manager** who helps actually configure things like ads/call-tracking dashboards (Vendasta MatchCraft plus Call Rail integration in this case) and walks the partner's team through setup — Vendasta's rep noted he personally used to do this exact operationalization work as an account manager before moving into his current role.
5. Migration-risk framing used to de-risk a potential switch: Vendasta asked directly whether the partner's clients had become deeply reliant on specific competitor (HighLevel) functionality that Vendasta might not be able to replace. The partner's answer — clients were only using simple features (basic conversation replies, simple forms) and had never had complex pipelines/opportunities/automations built out for them — was treated as a positive signal that migration risk was low.

**Note:** this call also covered live Reputation-Management AI response tone/customization detail and a MatchCraft/Call Rail advertising-dashboard walkthrough — not captured here in full; that belongs in reputation-management.md and advertising.md respectively.

---

## Date unknown (context: approximately one week before July 4th, per closing remarks) — Kent Falk (Vendasta Account Manager) with Matthew Conner & Ben Dean (partner team, brand "Visible") — referral/sub-brand white-label setup call

**Source:** [CALL] Partner sets up a referral/reseller sub-brand ("market") for one of their own clients, a PR firm principal who wants to resell marketing services under his own portal branding without doing any of the marketing work himself.

**The business arrangement, as described by the partner:** the client (a PR/business-consulting firm principal) typically runs 3-5 month PR/consulting engagements; he wants to layer on a marketing offering as a retention/permanency play — clients who fall in love with the marketing stay on as ongoing marketing clients even after his PR engagement ends. He wants his own portal branding for consistency with his existing client relationships, but is explicitly not hiding that the actual marketing work is fulfilled by the partner ("Visible") behind the scenes — described candidly on the call as fine with all parties.

**Concrete setup steps the Vendasta account manager walked through live:**
1. Create a new **"market"** (a branded sub-instance/referral portal) under the partner's existing Partner ID — in Partner Center this is set up as its own market ID (here, named after the client, "O'Keefe PR").
2. Customize that market's logo and favicon — these display inside the Business App instance shown to that sub-brand's own end clients.
3. **Gotcha/hard limit:** the **custom domain is tied to the Partner ID as a whole** and cannot be changed per market/referral-brand — so a referral sub-brand gets its own logo but not its own distinct URL; it still lives on the parent partner's existing domain.
4. Because of that domain constraint, the "powered by [parent partner]" attribution does **not** actually display anywhere in the product UI automatically — the partner chose, voluntarily, to add "powered by Visible" as subtext underneath the client's own logo for transparency with the client's own customers, even though the platform itself wouldn't have shown that by default.
5. Division of labor: the reseller/referral client supplies and approves his own logo; the platform partner is the one who actually uploads it into the branding settings.
6. Access model for this referral setup: the referral client (O'Keefe) gets **no Partner Center login and no additional platform access at all** — he simply refers/sends prospective clients to the partner, who performs all product activations and account setup themselves. This is a lighter-weight arrangement than full white-labeling with delegated platform access.
7. Turnaround: once the market and branding were configured, changes were live and editable immediately on the call — described by the AM as "quick and easy."

**Note:** this same call also covered a website-migration status check and a specific post-migration site-loading bug report — logged separately in websites.md since it matches that topic more directly. It also touched on a request for Vendasta Solutions Architecture co-development time and a custom CRM quoting/product-cost-calculation use case for a multi-company manufacturing client — both out of scope here; they likely belong in a crm.md or builder.md topic file.

---
