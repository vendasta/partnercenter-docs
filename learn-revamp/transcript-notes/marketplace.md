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
