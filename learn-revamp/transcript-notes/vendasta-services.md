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

## Date unknown — a Saskatchewan-based digital marketing agency owner with a Vendasta account manager (product walkthrough / pricing call)

**Source:** [CALL] Partner reviews his own bundled reseller pricing against Vendasta guidance on markup norms

1. **Partner's own bundle math, walked through live:** wholesale cost for a 4-product bundle (Local SEO Pro + Yext, Campaigns Pro, Reputation AI Pro, Social AI) totaled roughly **$142/month**, sold retail at **$599/month** — about **4.2x** wholesale. The account manager's read: this is "toward the highest side of the ceiling" but not unreasonable, given clients today can easily Google baseline chatbot/tool pricing and don't place much extra value on a dashboard alone.
2. **Vendasta account manager's stated markup guidance:** never go **below 2x wholesale**; most successful partners land somewhere between roughly 2x and 4x. One outlier partner known to the account manager runs a much higher markup across everything and generates seven-figure annual revenue on it: his model bundles everything into a single "we do it all for you" custom package with a minimum multi-month contract, runs a biweekly reporting cadence in the first month, then shifts to monthly — and bundles in Citation Builder as a standard line item that most partners overlook.
3. **Sales-objection technique named on the call ("FUD"):** a fear/uncertainty/doubt framing borrowed from another partner, used specifically on AI-skeptical prospects — "create the fear [competitors are already doing this], create the uncertainty, then create doubt [for the holdouts who don't yet see the value of AI]." Framed as a technique for a slow-adopting/skeptical local market.
4. **Concrete adoption anecdotes shared by the partner as sales proof points:** (a) a bulk-goods distributor client found the partner via an AI-search tool after his own website revamp/SEO work got him ranked #1 within ~12 weeks, and later added a chatbot for lead capture; (b) an older, low-tech client received a single large-value order lead generated purely through the website's chatbot capturing an inbound email inquiry — used as an ROI story to un-stick reluctant, "if it's not broke, don't fix it" older business owners.
5. **General market-education/objection-handling note from the call:** partner reported real resistance in some regional markets to any AI or automated communication and to using AI-driven scheduling instead of face-to-face meetings — reinforcing that "we like human interaction" is a live, common objection that has to be worked around with reassurance (e.g., no long-term contract to reduce trial risk) rather than argued away outright.

---

## Date unknown — a physical-therapy franchise partner (co-owners) with a Vendasta sales rep (SEO/reputation/AI-chatbot proposal call)

**Source:** [CALL] Proposal/packaging structure for a seven-location physical-therapy clinic group

1. **Package structure proposed:** a **$300 one-time setup fee per location** (covering fixing directory/listing inaccuracies and platform configuration) plus a recurring monthly tier (one of three tiers offered) bundling reputation management, listings, and AI chatbot/conversations.
2. **Two-tier dashboard model explained:** each individual location gets its own **location-level dashboard** (local staff can log in, see performance, respond to reviews); the franchise's corporate/head office would separately get a **multi-location roll-up dashboard** to see performance across all locations and identify who's winning/losing where.
3. **Sales approach for enterprise/multi-location proposals — offer a scoped pilot before a full commitment:** rather than pushing for a system-wide signed contract, the rep proposed building a free offline demo on a single chosen location first, timeboxed to a couple of business days, explicitly framed as low-risk ("if you like it, we can chat more; if you don't, we go our separate ways as friends").

---

## Date unknown — a solo/single-operator digital marketing agency owner with a Vendasta account manager (billing/automation troubleshooting call)

**Source:** [CALL] Billing/automation troubleshooting call; touched on general reseller selling philosophy for AI products

1. **Explicit reseller philosophy stated by the account manager:** don't just resell software access — "here's the software, go set it up" is, in his words, "a recipe for disaster... because they don't know how it works." His recommended approach: mark product up meaningfully (example cited: wholesale $39/month Conversations AI Pro marked up to $149+ retail with a separate setup fee), and actually configure/train it for the client as part of the sale.
2. **Vendasta's own recommended campaign templates** are available as starting points under Campaigns, some dating back years — intended as ideation/inspiration rather than send-as-is; newer agencies commonly use them when they don't know where to start, and any template can be copied and edited into something fully custom.
3. **A2P/10DLC SMS compliance flagged again as a broad current pain point** across partners, not specific to one product — described as "cracking down" recently.

---

## Date unknown — a salon-suite franchise location owner exploring a reseller/license-to-hunt model (agency discovery call)

**Source:** [CALL] Discovery call — done-for-you vs. self-serve service model decision with a Vendasta account executive

The prospect was explicit he did not want to create more work for himself ("I'm not looking to create more work for myself... I got to be able to explain this to an 8th grader"). The rep laid out three fulfillment paths available on Vendasta for any given service: (1) Vendasta's own team does the work fully done-for-you, (2) the partner trains up their own team (including offshore/VA staff) to use Vendasta's tools to do the work, lowering the partner's cost and increasing margin, or (3) give the end business/tenant direct self-serve access to their own dashboard to do the work themselves. The rep concluded this prospect's use case fit either the fully-managed or the "train an offshore team" path, not self-serve.

---

## Date unknown — a solo prospective reseller (family/friends referral, passive-income motivation) (webchat/reseller demo and pricing walkthrough)

**Source:** [CALL] Reseller demo — tool vs. managed-service distinction with a Vendasta sales rep

Explains the difference between the self-serve social posting tool ($15/mo wholesale, partner or client does the work manually with AI assistance) and the fully-managed **Social Media Manager service** ($24–25/mo wholesale), where Vendasta's own team configures and runs the monthly content calendar for the client. The prospect had initially confused a "2 posts/week, pay more for extra" limitation with Vendasta's offering — the rep clarified that limitation applied to a different managed-service SKU he'd researched elsewhere, and that the core social tool itself is unlimited posting.

---

## Date unknown — Jordan H (Vendasta) with Elias Hanna (City Scene Media, partner) — white-label email connection mechanics, and how far white-labeling actually extends
**Source:** [CALL] `white-label-email-setup-city-scene-media-elias-hanna.txt` — a setup call connecting a partner's custom-domain email address for white-labeled client communication, followed by the partner asking pointed questions about how "white label" actually works in practice.

1. **White-label email setup, step by step:** partner supplies a custom-domain email address hosted on **Gmail** (e.g., `digital@[partnerdomain].com`); Vendasta connects it live by signing into that Gmail account, including handling Google's phone-number 2FA text-verification step tied to whichever number is on that Gmail account.
2. **Deliverability verification practice:** after connecting, Vendasta sends a live test email from the new white-labeled address to a real staff inbox and asks for a reply, specifically to confirm two-way deliverability rather than just outbound send — called out explicitly because "I've had that happen a few times where we send, but we couldn't receive emails."
3. **Cutover practice:** the previous default address continues in parallel for roughly one more day while the account rep updates the internal fulfillment team to switch fully to the new white-labeled address; once cut over, all client-facing communication and Marketplace order fulfillment uses only the new address.
4. **How far white-labeling actually goes, confirmed explicitly for a nervous partner:** Vendasta fulfillment staff can be as hands-off/hands-on with the end client as the partner wants — **fully white-labeled by default**: staff introduce themselves using the partner's brand name only (e.g., "Hi, it's Jordan from [Partner]"), never mention Vendasta by name, and never wear/reference any Vendasta branding — explicitly reassured in response to a direct question about whether staff would ever "give away" the real vendor.
5. **Fulfillment-form mechanic, framed as the single most useful thing a partner can do:** every Marketplace product has an associated **fulfillment form** (a PDF, accessible directly from that product's Marketplace listing panel) listing exactly the intake questions Vendasta's fulfillment team needs for that specific SKU. Partners are encouraged to send this PDF to the client themselves during the sales conversation (or immediately after activation) and forward the completed answers back — explicitly framed as "the most helpful thing you can do" to speed up setup for any product, AI Workforce included.
6. **Client-contact routing for AI Workforce products specifically:** activating an AI Workforce setup product in Marketplace triggers a fulfillment intake that asks for the client's email and a yes/no toggle on whether Vendasta should contact the client directly — if yes, Vendasta's fulfillment team reaches out fully white-labeled to book a setup call.
7. **Channel flexibility, with an honest caveat:** setup can be handled entirely by email if a partner prefers no live call, though Vendasta's default/preferred approach for anything non-trivial is a live call, since slower email-only back-and-forth risks client frustration on more complex setups; the team commits to proactively looping the partner back in if a given email-only setup isn't progressing well.
8. **Feature gap acknowledged on the call:** there's no clear on-dashboard indicator today showing which specific line items/services are Vendasta-fulfilled versus partner-fulfilled — the rep had to say she'd check with the internal Marketplace team on whether such an indicator exists at all.

---

## Date unknown — Desiree Kupietz (Vendasta) with William Cosey and Alyssa Brekken (Salem Media Group) — billing self-service enablement, SLA benchmarks, and a white-label team-inbox pattern
**Source:** [CALL] `content-approval-workflow-billing-review-salem-media-group.txt` — billing/communications-process portion of a broader account-review call (the content-approval-workflow content from this same call is filed in `social-marketing.md`).

1. **White-label contact-routing example:** this long-standing multi-market partner has a dedicated white-label email address (a custom-domain inbox Vendasta set up during a prior platform migration) that routes any request — social, reputation, or otherwise — to the right internal fulfillment team, rather than the partner needing to know which of several possible Vendasta-side addresses to use.
2. **SLA benchmarks confirmed and matched to the partner's own commitments:** same-day initial response (targeting ~4 hours even if just an acknowledgment); task turnaround depends on request type — roughly 1-2 days for a content-calendar edit, roughly 3 days for a website support request — confirmed by the partner as consistent with what their own sales field is told to expect ("sounds like we're in alignment there").
3. **Billing self-service enablement:** the account manager personally trained named finance-team contacts at the partner on how to pull itemized billing/charge breakdowns directly from the platform themselves (previously the AM manually extracted the data and built pivot tables each cycle) — a concrete example of proactively reducing a partner's dependency on manual AM support for routine billing questions.
4. **Recurring billing-confusion pattern worth flagging for any partner-facing documentation:** a consolidated invoice spanning **all** markets/accounts under one master billing relationship does not come pre-broken-out by market by default — that market-level allocation is something the partner's own finance team has to derive themselves from platform data (or request a walkthrough for); a flat recurring **platform fee** (billed to corporate) is a distinct line item from per-account product charges tied to specific named accounts, and seeing both together in one large consolidated statement is a common source of "what is this charge?" confusion for multi-market partner finance teams.

---
