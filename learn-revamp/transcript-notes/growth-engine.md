# Your growth engine — transcript notes

Running notes extracted from SME/partner call transcripts. Feeds the
`learning-path-writing` skill when this path is drafted or enriched.
Each entry below is one source call — do not merge or overwrite prior entries.

---

## Date unknown — Myron Kindrachuk (Vendasta partner sales) onboarding/discovery call with Jeff Swinehart (new solo agency, home-services niche, Sacramento)

**Source:** [CALL] Partner onboarding/discovery demo call; Jeff was evaluating Vendasta against two other vendors after a failed attempt at running fulfillment himself and a stint in print advertising.

Myron walked through the platform as a single, integrated "agency in a box" operating system rather than a bundle of point tools: CRM, pipeline management, an order system, marketing automation, project/task management, all under one roof and included in the "Pro" agency plan. The company framing given: about 18 years old, grown from roughly 70 staff to about 850 over Myron's own 10-year tenure, five acquisitions in the last five years, and about $200 million raised over that time — offered as evidence this is a partnership model with dedicated account management/coaching, not just a self-serve software shelf.

Billing mechanic explained in detail because Jeff was confused by "starts at $0": the subscription is a fixed-cost minimum, and every product a partner activates for a client generates a billing credit that offsets that minimum until it hits zero. On the Pro plan, once a partner has $500/month of active client spend running through the platform, the partner subscription itself is effectively covered. This is deliberately different from vendors who charge a subscription and then bill separately for everything else "for life" — the intent is to reward partners for onboarding, training, and actually activating clients.

Marketplace mechanics: roughly 70% of the marketplace catalog is Vendasta owned-and-operated; the rest is white-labeled third-party vendors Vendasta has vetted and negotiated wholesale rates with. Partners see a wholesale rate and a suggested (non-binding) retail rate; Myron's observed norm is partners charging 2-4x wholesale, with home-services bundles commonly landing around 3x. Volume discounting exists per product (first price break around 20 paying clients on that product, with further brackets as volume grows) and bundled-volume deals can be negotiated case by case if a partner commits a mix of products across enough clients.

Plan tiers: **Starter** is $99/month minimum, explicitly non-white-label ("powered by Vendasta" branding stays), one team seat, no contract — positioned as a trial-like plan. **Pro/Professional** requires an annual partnership agreement (Myron's stated reasoning: Vendasta invests heavily up front in onboarding, coaching, and account management, and recoups that over the term) but unlocks full white-label and volume wholesale pricing.

Growth-engine framing that ties directly to the ecosystem story: the **Snapshot Report** is positioned as the diagnostic/prescriptive front door — "I ran the numbers, I see these issues, here's what I recommend, and I can manage this for you" — feeding a package recommendation (bronze/silver/gold/platinum is the common partner pattern, though everything underneath is fully a-la-carte). From there, the **Business App** client portal (white-labeled, URL and domain fully brandable) becomes the day-2 home: a unified inbox pulling in Facebook Messenger, Instagram, WhatsApp, SMS, live chat, and phone conversations into one CRM record with lead-source attribution, plus AI employees (chat, voice/receptionist with call routing, social content, reputation response) that can be self-serve, hired out as a Vendasta managed service, or left for the partner to run.

A partner-facing quirk worth carrying into the ecosystem-map lesson: everything visible to a client in the left-hand nav of Business App is independently controllable per user role — a general manager, a front-desk person, and a field tech ("Jerry driving the truck") can each see a different slice of the same account.

---

## Date unknown — Braedon Gaudet & Jeff Leach (Vendasta) demo call with Dynamico, a HubSpot implementation partner (Amy Volatile, Brian Heppner, Emily Grotkin, Cody Baier)

**Source:** [CALL] Partner discovery/demo call pitching Vendasta as a complementary layer for a HubSpot-implementation shop exploring franchise/multi-location clients.

Braedon framed Vendasta's whole positioning as the **"AI optimized flywheel"**: speed-to-lead, lead generation, lead conversion, and client engagement, illustrated with a canonical slide of the full customer journey. On that slide, each product/service icon sits somewhere across three named stages — **Attract, Convert, Engage** — the lines between icons represent automations/connections, and a star icon marks anywhere AI is doing the work. This is the direct source for the canonical ecosystem-map diagram partners keep asking for.

Braedon named four reasons customers come to Vendasta, in order of frequency: (1) leads dying with no follow-up in a CRM — introducing conversational AI is cited as producing roughly a 30% increase in captured leads (example given: 1 lead/month becoming closer to 4); (2) tech-stack consolidation — replacing "a hundred different vendors for a hundred different things" with one marketplace, explicitly including cases where agencies were white-labeling Vendasta products underneath their own 25-40% margin without disclosing it; (3) reporting — corporate/multi-location rollup plus per-location drill-down; (4) efficiency — free up owner/staff time via either self-serve tools or a fully done-for-you AI-agent setup.

Platform structure confirmed explicitly: there are **three distinct interfaces** — a multi-location (corporate) dashboard, a single-location dashboard, and the Partner Center/admin portal used to build and configure everything (the demo repeatedly called this the "God mode" or architecting view that end customers never see).

Neighborly (via its Molly Maid brand specifically) was the flagship proof point: a **372% increase in Q1 2024 revenue/leads** after adoption, versus a prior state where the brand was missing roughly 30% of its leads every month. Scale note: Neighborly owns roughly 22 brands and was, at call time, live on 21 of the 22 (the 22nd, Real Property Management, was a recent acquisition not yet onboarded).

Retention mechanic called out as deliberate and "super impactful": the platform automatically emails account users a recap on a set cadence (commonly weekly, Monday morning) summarizing recent activity and what's coming — built specifically to keep business owners logging back into the application, and configurable if a partner wants a different cadence.

Scaling pattern for multi-location/franchise rollouts: build and validate a setup for one location first, then use **account templates** (Admin Center → Accounts and account templates) to copy that configuration — in whole or in specific pieces, e.g., just the web-chat setup — across every other location; each copy still learns its own site's knowledge base rather than inheriting the source location's content verbatim.

CMS/build note relevant to ecosystem framing: WordPress is the primary website build/host path (Vendasta has an in-house team that designs, codes, and hosts WordPress sites), with Duda and a couple of other third-party CMS partners as alternates; Vibe (see `vibe.md`) is positioned as a prototyping layer on top of this, not a replacement for it.

Integration philosophy stated directly by Braedon: "we are open source" — meaning the platform exposes APIs, webhooks, and native connectors (demonstrated live as a two-way HubSpot contact/notes sync) so that leads, notes, and activity mirror in both systems; when a formal connector isn't wanted, partners have improvised with things like an email-parser feeding a client's own tool, though Braedon's own preference is Zapier/webhook over that pattern.

---

## Date unknown — a salon-suite franchise location owner exploring a reseller/license-to-hunt model (agency discovery call)

**Source:** [CALL] Discovery call — franchise/reseller business-model exploration with a Vendasta account executive

A salon-suite property owner (commercial landlord model, dozens of independent stylist/tattoo/lash-artist tenants across two locations, each tenant running their own brand) wanted to build a second revenue stream by offering marketing services to his tenants, both to grow tenant retention/success and to eventually license the model out to other franchise locations. Key concepts discussed:

- Vendasta does business two ways: **direct with a franchisor/franchisee**, or through an **agency/reseller model** — the rep identified this prospect's situation as best fit for the reseller model, where the property owner's own business entity becomes the reseller to the individual tenant businesses.
- The rep described a **"license to hunt" model** used with larger franchise partners: the partner gets tools at a set wholesale cost, then sells/upsells those tools to the franchisee network at a markup, keeping the difference. This doesn't have to be structured exactly that way — it's one template among several.
- Because products are "a la carte," a partner can pick one tool, three tools, or bundle everything into a custom package, choosing their own markup/profit margin on each.
- Recommended go-to-market approach: **run a pilot with 1–2 locations first** to build a case study/proof of results, then use that case study to sell the remaining tenant/franchisee base once the pilot shows results.
- The prospect's core objection/insight worth capturing: individual tenant-level businesses (sole practitioners) have very low per-service budgets and don't think in annual-cost terms — a weekly charge doesn't register as an annual dollar figure to them; they instead evaluate it as "how many client appointments does this cost me." Packaging price anchors around "this equals one client appointment" resonated more than dollar-per-month framing for this micro-business segment.
- The three product lines the rep recommended leading with for this segment: **Google Business Profile setup**, **scheduled/automated social posting**, and an **AI receptionist/missed-call-text-back** tool — with reputation management, SEO, websites, and paid ads positioned as later upsells once individual tenants "buy in."

---

## Date unknown — a multi-agency owner focused on SEO and AI automations (agency discovery/reseller partnership call)

**Source:** [CALL] Agency discovery call — partner growth/reach and lead-generation options with a senior Vendasta account executive

An established multi-agency owner (SMB-focused, referrals + paid ads + SEO + agency-partner referrals as his lead sources, doing zero outbound at the time) asked specifically whether Vendasta offers any way to extend his agency's reach/lead generation, not just tools to resell. The rep's answer: Vendasta doesn't have a formal lead-referral program to point to here, but the platform itself has partner-facing prospecting/outbound tooling (see `crm.md`) that agencies use to build their own outbound list and pipeline — framed as "it depends on what you as the agency owner want to do with these solutions," i.e., growth is partner-driven using the built-in tools rather than a Vendasta-supplied lead-sharing arrangement.

---
