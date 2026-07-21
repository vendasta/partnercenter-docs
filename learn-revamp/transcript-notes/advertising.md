# Attract > Advertising — transcript notes

Running notes extracted from SME/partner call transcripts. Feeds the
`learning-path-writing` skill when this path is drafted or enriched.
Each entry below is one source call — do not merge or overwrite prior entries.

---

## Date unknown — Catalina Bresser, Brad Petersen, Alistair George (Vendasta) with Bertram Croes & Marianne Faas (EU/Netherlands partner)

**Source:** [CALL] Ad planner + MatchCraft demo for a Netherlands-based partner (the Vibe-coding portion of this same call is filed separately under `vibe.md`).

Company/product history given directly by Brad Petersen (SVP Global Business Development, ex-MatchCraft, ~17-18 years with MatchCraft before the Vendasta acquisition): MatchCraft has been an ad-serving platform for roughly 18 years, with a legacy going back to a partnership with Google and a company called City Search — City Search sold advertisers a bucket of guaranteed clicks and used MatchCraft-served ads to fill the gap whenever organic traffic under-delivered against what had been sold. That "fill the gap" logic is the direct ancestor of the nano-budget concept described below.

**Nano/micro-budget advertising** — the core concept walked through in detail:
1. Standard paid search/social campaigns range anywhere from about €25-50/month up to thousands of euros, and can be built either via an AI ad-builder or via MatchCraft's own long-standing taxonomy-based system.
2. The taxonomy for the Netherlands specifically: **39 parent/top-level headings** (broad categories like "home and garden"), expanding to **3,993 total tier-three headings** once fully expanded — each heading carries pre-built phrase-match keywords, exact-match keywords, negative keywords, and ad copy, refined over roughly 17 years.
3. Key mechanical insight Brad shared from a US real-estate client test: **when you deliberately run a very small ("nano") budget campaign — as low as $1-3/day in testing — the CPC drops significantly**, because the bidding algorithm isn't under pressure to spend a large budget and can simply wait for cheap traffic gaps (times when other advertisers' budgets have already been exhausted). Standard smart/automated bidding is described as "useless" at these budget levels because it doesn't get enough data/signal to optimize — MatchCraft instead uses its own proprietary bidding logic built for exactly this scenario.
4. Named nano-budget use cases: (a) legacy directory/IYP (independent yellow pages) companies — instead of running one large campaign, split the budget across advertiser subscription tiers (e.g., guarantee silver advertisers 10 clicks/month, gold 20, platinum 100) and only spend where organic traffic isn't already delivering; (b) real estate listings — running $10-20/month campaigns per individual listing rather than per realtor, in a fast-moving, high-turnover inventory market; (c) job/employment listings — running ads against individual job postings instead of a generic "we're hiring" campaign; (d) products/services prone to churn — an Austria client found that guaranteeing just 11 clicks/month to a website product dropped churn by 35%; (e) selling a guaranteed-traffic product (e.g., "we guarantee you 20 visitors/month") as the value proposition itself, letting the client set the click value/price point.
5. Reporting gotcha and its fix: partners have historically avoided showing ad performance data to clients out of fear a low-traffic report would trigger complaints or an SEO upsell that then also underperforms in the short term (SEO takes 6-12 months to show traction). MatchCraft's counter-position: the ad spend exists specifically to "buy time" while SEO works, and — direct quote from an Austrian client relayed by Brad — **"we make sure that no client ever looks at a report that says zero."**
6. API access: MatchCraft/ad-planner functionality is available via API, so a partner's own CRM/order system can fire off a campaign automatically, either tied to the existing taxonomy or to the newer AI ad planner (below) — enabling this at thousands-of-campaigns scale without manual work.

**Ad Planner** (the newer AI-driven builder, demoed live): enter a business name, and it auto-generates ad groups, headlines, descriptions, positive keywords, negative keywords, and geo-targeting (default radius 20 km, adjustable), producing a full campaign proposal with rotating ad previews and a suggested budget — reviewable in a few clicks and either shared with a client as a proposal or fired live via "Run this ad" (goes live within about an hour of approval). Positioned explicitly as what makes nano/micro-budget packages commercially viable to sell at scale, since there's no per-campaign manual build time required — described on the call as "a complete AI ad builder that could be used in a self-fulfillment environment."

At call time (per Catalina), the ad planner and full MatchCraft product were only available for US/Canadian clients due to currency handling; bringing the reporting side of MatchCraft into the main Vendasta platform (so MatchCraft reporting shows up in the same reporting/Vibe-accessible data as everything else) was the active Q3 project, targeted to have a first version ready to demo in September, with European-market rollout (Netherlands specifically) requiring engineering review of the ad planner's budget-proposal defaults before go-live.

---

## Date unknown — Brad Petersen, Mark Brodahl, Catalina Bresser, Alistair George (Vendasta) with Yell (UK): David Lynch, Kristen George, Stephen [Nero], Rebecca Rhydderch, Luke Archbold

**Source:** [CALL] Strategic-partnership exploration call — Yell evaluating whether Vendasta could become a single platform provider behind both their standardized SME offering and their higher-end/agency offering (marketplace/ecosystem content from this call is filed separately; this entry is the advertising-specific portion).

MatchCraft was confirmed as now branded **"Vendasta Advertising"** internally. Billing model for paid media confirmed directly by Brad: **percentage of media spend**, with **stair-step pricing** depending on whether the client operates as a self-serve SaaS user of the platform or as a fully managed-service client (higher management percentage for managed service, consistent with the setup-fee/management-fee split described in the Bertram Croes call above).

Scale reference point given: **Italiaonline** (a large existing European client, publicly referenced in press releases) runs what Brad called "the factory" — on the order of **17,000-20,000 individual standardized paid-advertising campaigns** running simultaneously through this system, contrasted with Italiaonline's separate, more bespoke agency arm that serves their higher-spend segment. Brad's framing: the standardized "factory" volume is much harder to disrupt/migrate/innovate on than the bespoke agency-style book, which is why he suggested any new partner (Yell included) pilot the platform at the higher, more flexible end first before touching a large standardized campaign base.

---

## Date unknown — Braedon Gaudet & Jeff Leach (Vendasta) demo call with Dynamico, a HubSpot implementation partner (Amy Volatile, Brian Heppner, Emily Grotkin, Cody Baier)

**Source:** [CALL] Same call filed under `growth-engine.md` and `snapshot-executive-reports.md` — this entry captures only the MatchCraft/advertising portion, covered briefly near the end of the call.

Braedon introduced MatchCraft as "a massive ads platform" that predates Google's own ad business in a meaningful sense — he noted Google itself licensed/used some of MatchCraft's patents for search advertising — acquired by Vendasta **about four to five years** before this call.

Two fulfillment models, confirmed with pricing: (1) Vendasta trains the partner's or the client's own team to run the platform themselves — **setup fee of roughly $5,000**, ongoing **management fee of 2-5%** of ad spend; (2) Vendasta's own team manages the ads fully on the client's behalf — **management fee of 8-15%** of ad spend. Braedon flagged this as "really low management fees for a very powerful ad system."

Core value proposition as described: the system continuously reallocates ad spend across channels in real time based on performance — e.g., if Google is consuming budget without producing conversions while Bing is converting well on less spend, the system auto-shifts budget toward Bing to maximize conversions per dollar, rather than requiring a human to notice and rebalance manually.

Coverage confirmed: search, social, targeted/display and OTT ads. A recently announced **TikTok** advertising partnership was mentioned as having an active promotion at call time, positioned as relevant to any client specifically asking about TikTok ads.

---

## Date unknown — Myron Kindrachuk (Vendasta partner sales) onboarding/discovery call with Jeff Swinehart (new solo agency, home-services niche, Sacramento)

**Source:** [CALL] Same call filed under `growth-engine.md` and `snapshot-executive-reports.md` — this entry captures only the paid-media/MatchCraft portion.

Myron confirmed Vendasta acquired **MatchCraft about four years** before this call, describing it as an "Enterprise Level Ad Management System" that has existed for about **26 years**. Two ways a partner can order paid media through the platform: through Vendasta/MatchCraft directly, or through a second paid-media partner option called **"Ad Seller"** — both cover search, social, video, and programmatic.

Billing/account-handling mechanics: for most clients, Vendasta/MatchCraft runs campaigns out of its **own master ad account** and simply reports the results into the client's Business App — no client-owned Google Ads account is required, which Myron called out as meaningfully simpler for the partner (no need to troubleshoot a client's own ads account setup). For larger spenders — Myron's threshold: **roughly $5,000+/month in ad spend** — Vendasta can instead do an **"MC takeover,"** operating directly inside the client's own existing ad account; in that scenario, the ad spend itself bills to the client's own card directly with Vendasta/the partner only charging the management fee on top. Myron characterized MC takeover as relatively rare in practice.

Scale/credibility point: MatchCraft's system has built out **thousands of pre-existing keyword/negative-keyword taxonomies by industry vertical**, with AI-based optimization and call tracking already embedded, and is used by some large media groups/telcos/publishers to run on the order of **11,000 campaigns per month** — Myron's framing: this is a system built for scaling an ad-fulfillment team, not for a single manually-managed account. No minimum spend/campaign-term commitment applies to this paid-media offering.

---
