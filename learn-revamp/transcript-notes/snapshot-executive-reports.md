# Convert > Snapshot & Executive Reports — transcript notes

Running notes extracted from SME/partner call transcripts. Feeds the
`learning-path-writing` skill when this path is drafted or enriched.
Each entry below is one source call — do not merge or overwrite prior entries.

---

## Date unknown — Desiree Kupietz (Vendasta, partner-facing) working session with Brandon Kuse (Uberall/listings partner rep) and Ashley Colson

**Source:** [CALL] Vendor/partner relationship check-in on listings sync, doctor.com, and a BigQuery data-export request for a large partner's account base — Uberall/listings business was the nominal topic; the BigQuery portion is the substance for this topic.

Desiree had previously discussed, with colleagues Jesse and Brandon internally, running a **BigQuery export of a partner's full Snapshot Report dataset** — roughly **18,000 accounts**. The one hard blocker identified: the partner's **on-site/organic SEO ranking data** (not local-SEO/listings data — Brandon explicitly clarified the distinction on the call) can populate inside a Snapshot Report for display purposes, but there is a data-sharing/compliance restriction on **extracting that specific SEO ranking data and sending it out** of the platform. Desiree had Jesse looking into whether an exception or compliant path existed; as of this call, that was still open and she planned to follow up that week.

Workaround agreed live on the call: run the BigQuery export **without the organic SEO ranking fields** and proceed with everything else — Brandon confirmed this was sufficient ("we don't need the organic ranking... if we just run the BigQuery on the listings data, that is sufficient"). Fields discussed for inclusion: number of listing sources found, Google Business Profile claimed status, reputation data, and social data — reviews were noted as missing from an initial field list and flagged to be added back. Fields explicitly agreed to drop from the export: rows 27-30 of the original field spec, plus Google Place ID and several "missing website / missing phone" placeholder-type fields that weren't considered useful.

Separate from the BigQuery bulk export, Desiree also asked Alistair (Vendasta sales engineering) to extend an existing **custom premium report** — one already built for this partner that shows only listings data — to also surface reputation and social data, so that every time the partner runs a Snapshot Report, that additional reputation/social data flows automatically into their premium report view. This premium-report enhancement was confirmed as buildable and requested as a ticket, separate from and faster than the BigQuery compliance question.

Net structure that emerged: (1) the custom premium report living inside the partner's own platform instance updates automatically per Snapshot run once reputation/social fields are added; (2) the standalone BigQuery pull covers the full ~18,000-account base but is gated on resolving the SEO-data compliance question, so Desiree proposed running it now for everything except SEO ranking data rather than waiting.

---

## Date unknown — Myron Kindrachuk (Vendasta partner sales) onboarding/discovery call with Jeff Swinehart (new solo agency, home-services niche, Sacramento)

**Source:** [CALL] Partner onboarding/discovery demo call; same call as filed under `growth-engine.md` — this entry captures only the Snapshot/Executive Report specifics.

Myron described the **Snapshot Report** as "the crown jewel" of the system and the primary sales/diagnostic tool:

1. It can be embedded as a website widget, typically placed above the fold with copy like "See how my business performs online / send me my free digital marketing analysis."
2. A prospect enters their business, Google finds it, and the report auto-generates — this triggers an automation that enrolls the prospect in a nurture drip campaign and notifies the partner; the prospect can book a sales call directly from the flow.
3. On open, Vendasta's AI proactively offers to help interpret the report for prospects who don't understand terms like "listings" or "social media grade" — and everything typed into that AI conversation publishes back into the CRM as a lead record.
4. Every line item and data point in the report is individually hideable/removable if a partner thinks it's too advanced or would read badly for a given prospect; the underlying data itself can also be edited (Myron's caution: doing so can visibly skew the report in the client's favor, so tune carefully).
5. The report automatically benchmarks the business against industry averages/leaders, and a partner can manually drop in specific competitors for a side-by-side comparison.
6. Snapshot run limits are plan-dependent: Myron cited having seen accounts run up to 250/month, with a common ask being a 150/month allowance where the partner actually uses about 30; promotions can temporarily raise the cap.
7. A monetization pattern some partners use: paywall the report itself (example cited: charge $99 for the report plus a 15-minute consultation) specifically to filter out low-intent "tire kickers."
8. Onboarding for a new partner includes a guided session with the CS/onboarding team to set up and validate the Snapshot: emails, white-label branding, and general configuration.

The **Executive Report** was described as the direct extension of Snapshot for existing/active clients: same underlying engine, but tracking a client's numbers over time (three weeks, two months, six months) rather than a single point-in-time grade, automatically pulling a "Reader's Digest" summary of key insights from every activated module (Local SEO/keyword tracking and listing sync, Reputation, Social, and "free ad reporting" for combined SEO+paid performance) with configurable date ranges — explicitly built so the partner never has to manually assemble, export, or rebuild a client report by hand.

Also relevant: the platform's own internal AI assistant and the documentation site (support.vendasta.com) are positioned as the first stop for partner questions about reporting/snapshot mechanics before escalating to human support, and the LMS includes a named "Snapshot Ninja" course teaching best practices for pitching a Snapshot Report.

---

## Date unknown — Braedon Gaudet & Jeff Leach (Vendasta) demo call with Dynamico, a HubSpot implementation partner (Amy Volatile, Brian Heppner, Emily Grotkin, Cody Baier)

**Source:** [CALL] Same call as filed under `growth-engine.md` and `advertising.md` — this entry captures only the multi-location Executive Report walkthrough.

Live demo of the reporting layer for a multi-location brand (Molly Maid, part of the Neighborly portfolio): the top-level view is a **multi-location (corporate) dashboard** with an **Overview** tab, an **Insights** tab (trending keywords/themes customers mention, review-response turnaround time, recurring complaint/praise patterns), and an **Executive Report** that aggregates every location into one high-level view — this particular account was tracking **238 locations** — showing leads/conversations volume, response time, listings health, and review activity in one bird's-eye report so corporate can see "who's winning, who's losing, who needs help" and act (promote what's working, intervene where it isn't). Corporate can drill from the brand-wide rollup down into any single location's own numbers.

---

## Date unknown — Chris Deianni (Vendasta/Broadly, strategic partnerships) & Dale Bruce Hopkins (Vendasta CTO) kickoff call with Neighborly's data team (Karen Elisa Nogueira, Manish Kumarsahu — data architect, Balwant Singraul, Mahesh Chandrappa, Paulo Henrique Rodrigues Orind, Lindsey Adams, Jossie Bristow)

**Source:** [CALL] Kickoff call to scope giving Neighborly direct data-warehouse/raw-data access instead of relying on the interim reporting dashboards Vendasta had been building for them.

Context: Vendasta and Broadly are the same company (Vendasta acquired Broadly; many Neighborly franchise owners still call the product "Broadly"). Today's flow: leads generated go from Broadly to Neighborly, Neighborly nurtures them, and sends signals back to Broadly when a job is booked (the "LFA" — lead follow-up automation — pipeline). Chris framed the existing dashboards as "Band-Aid" solutions pending a real data-warehouse setup.

Neighborly's ask, stated plainly by their data architect (Manish) and confirmed by Karen: **raw data, not more dashboards** — full access to build their own internal analytics so they can unify Broadly/Vendasta data with data from other marketing-automation vendors and their own POS/revenue systems into one internal view.

Technical shape agreed on the call:
1. **114 tables** of data are available on Vendasta's side. Delivery as **daily dumps in Parquet format with zstd compression**, with schema/metadata embedded directly inside the Parquet files (Avro was considered and rejected — it roughly triples file size versus Parquet).
2. Volume: a full daily dump runs to roughly **1.5 TB/month**; the data is heavily skewed — the top 5 tables account for about 95% of total volume, and one single table (CRM activity) alone is about 41% of everything. Neighborly can selectively exclude noisy/low-value tables to cut cost and volume.
3. Delivery mechanism: dumped into an **S3 bucket** Neighborly provides (cross-cloud egress from Vendasta's GCP into Neighborly's AWS is the main cost driver), with AWS-native notifications firing when a new dump lands. **Service-account** auth was chosen over a three-legged OAuth flow for simplicity/timeline reasons.
4. Cost-saving alternative floated: instead of a full daily dump, do **one full historical dump plus daily diffs with a weekly full snapshot** — Dale estimated this cuts egress/storage cost by roughly 84% versus daily-full dumps, at the cost of slightly more processing work on Neighborly's side to reassemble history.
5. This is explicitly **data-lake-style raw data, not a curated warehouse** — Dale was direct that Vendasta is handing over raw tables with all platform identifiers intact so Neighborly can deep-link any aggregated row back to the literal record inside the Vendasta platform (e.g., a specific CRM activity entry), rather than delivering pre-modeled insights.
6. Scope explicitly includes full SMS/chat conversation transcripts and AI-booking data, not just email-send/delivery logs — Chris flagged this is meaningfully more sensitive/larger than a typical email-marketing data export.
7. No documentation/catalog of what the 114 tables mean exists yet ("this is our first time rolling this out") — the agreed approach was to ship a first cut, let Neighborly's team report back what's missing or unclear, and iterate rather than fully spec everything up front.
8. Test environment offered first: Neighborly asked to receive data from Vendasta's test/sandbox environment initially to validate the schema before any production data flows.

Two gotchas surfaced mid-call, useful as cautionary/process notes for this topic:
- **No audit log of automation on/off toggles.** One of Neighborly's brands (The Grounds Guys) had paused its own lead funnel to Broadly because an account owner had toggled a pilot automation off without anyone downstream knowing — Vendasta's CS lead (Jossie Bristow) confirmed there is currently no back-end log showing who toggled an automation on or off, or when, which she flagged as a real support/troubleshooting gap. Mitigation already in place: the Automations tab has been hidden from most account owners specifically to reduce "clicky fingers" accidental toggling.
- **No control groups yet.** Neighborly wants control-group/holdout data for nurture-campaign measurement eventually, but Balwant Singraul confirmed control groups are not currently configured in Broadly for the LFA nurture flow — every eligible contact currently receives the outreach.

Timeline: the call happened on a Thursday; the plan was to have test data flowing "starting next week," with an explicit expectation of multiple iterations before the pipeline was considered stable.

---

## Date unknown — Chris Deianni & Dale Bruce Hopkins (Vendasta CTO) follow-up call with Neighborly (Mahesh Chandrappa, Javid Arain — new hire, ~3.5 weeks in, marketing automation/analytics, Balwant Singraul, Karen Elisa Nogueira)

**Source:** [CALL] Follow-up reporting/analytics proposal call — the interim vibe-coded dashboard (filed under `vibe.md`) came up as the current stopgap; this entry covers only the data-warehouse/reporting-proposal decision itself.

Vendasta acquired Broadly **three years before this call**; Neighborly franchise owners still colloquially call the product "Broadly" even though it is fully part of Vendasta now.

Dale framed the fundamental choice for Neighborly plainly: either (a) Vendasta builds and maintains reporting *inside* its own product (fully supported, secured, versioned by Vendasta), or (b) Vendasta hands over the underlying data so Neighborly's own data team builds and owns the reporting in their own warehouse. His stated philosophy: **"we don't want to hold your data hostage and make you use our platform for reporting."** Neighborly's answer was unambiguous — Karen: **"Raw data, please. We want all our data. We don't want dashboards, send us the raw data... in our S3 bucket... that's it."**

Neighborly's internal framing (from Mahesh): their marketing-automation/customer-engagement platform initiative — of which Broadly/Vendasta is only one piece alongside other vendors, paid media, website, and POS/revenue systems — is the company's #1 internal priority. His metaphor for why raw, unified data matters: "if I take a brain and cut it into pieces, each part might work well, but only together do they generate the next best action" — i.e., channel-siloed reporting can't drive true cross-channel personalization; the intelligence needs to live in one place.

Technical scoping that emerged:
1. Neighborly's own data lake sits in an **AWS S3 bucket**; their data engineers weren't on this particular call to confirm whether they run Hadoop-style processing on top of it.
2. Vendasta's underlying data lives in **BigQuery**, and Dale confirmed there are "lots of different ways" to synchronize/export from there.
3. Agreed delivery shape: an **S3 bucket Neighborly designates**, **Parquet format**, **metadata embedded in the Parquet files themselves**, delivered **daily** (Neighborly's stated ideal was near-real-time streaming, but daily was explicitly confirmed as sufficient "at least from a dashboard standpoint").
4. Required fields: for every customer Broadly contacted — contact IDs, contact timestamps, and a **"customer 360" ID** Neighborly can use to merge Vendasta's contact/engagement data against their own POS/revenue records (revenue is not, and cannot be, provided by Vendasta since Neighborly doesn't share it back).
5. Interim access offered while the full pipeline is scoped: (a) Vendasta's existing **Premium Reports** solution inside Partner Center, which Dale noted is essentially the same BigQuery-backed data as it exists in-platform today — so the eventual raw export "would largely be that data dumped into something like this"; (b) credentials to the separate external vibe-coded dashboard Alistair had built specifically for Neighborly (see `vibe.md` for build details).
6. Concrete data-quality gaps surfaced live while reviewing that interim dashboard, directly relevant to why Neighborly wants raw data instead of trusting a pre-built dashboard: **no true multi-month date-range selector** (single-month view only, blocking the annual/year-over-year benchmarking Neighborly wanted); **CSV/PDF export only captures the currently selected on-screen snapshot**, not a month-by-month breakdown, forcing a manual re-run and re-export for each month needed; and a **live numbers-integrity scare** — the "AI bookings" vs. "assisted bookings" (sometimes called "Broadly assisted bookings") figures for the same May data pull materially changed between two look-backs in the same call (e.g., 3,000 bookings/9,000 assisted vs. later 1,300 bookings/7,800 assisted), which Neighborly's Mahesh flagged as a serious concern because their **revenue estimate is calculated directly from the AI-assisted-booking count** — he asked Chris to verify the current number against a prior report (February had shown roughly 2,400) before Neighborly relies on the new figure.
7. Ownership/process: Dale committed to writing up a formal data-warehouse-access proposal and assigning an internal engineering team to execute it, but explicitly declined to commit to a timeline on the call ("I'll talk to the team, they'll be upset if I give timelines ahead of talking to them first").

---

## Date unknown — Vendasta onboarding specialist and marketing agency partner (Business App walkthrough)

**Source:** [CALL] Partner onboarding — Business App walkthrough, Executive Report deep dive

The **Executive Report** is a weekly-or-monthly (partner's choice) client-facing summary. Two important framing points from the rep: (1) sections shown are **product-dependent** — a section like "website performance" simply won't render if the client hasn't purchased website hosting through the partner, and reporting only reflects products actually active on that account; (2) sections are also **data-connection-dependent** — connecting sources like Google Analytics 4 (GA4), Google Search Console, or Google Business Profile unlocks materially more detail in the corresponding report sections than an unconnected account would show. Because of this, the rep recommended that account-prep/onboarding checklists for new clients explicitly include a step: "what do we need to connect, what access do we have, vs. what does the client need to self-connect."

Recommended top-priority section: **lead-type reporting** — new messages, new leads, new CRM contacts added in the period, plus a web-chat-specific breakdown (unique visitors and conversations) — framed as the clearest way to show clients the tangible AI-driven value being delivered ("what did we automate on your behalf").

Other standard sections: **listings** (month-over-month view of new listings deployed, corrected information/errors, aiming for "all green" within roughly a month of onboarding), and **Google Business Profile stats**. The pitch line used for listings/GBP consistency, worth reusing: *"you don't have to go to your Google or your Bing and manage it separately — we're giving you all the insights in one place about your online presence."*

**Customization**: sections can be turned on/off and reordered, either globally (Partner Center → Manage Accounts → Manage Business App → Executive Report) or per individual user/client. Customization is described as fairly minimal beyond visibility/ordering — you cannot deeply restructure what a section measures.

**Confirmed limitations raised by a sophisticated partner** (one already building custom dashboards for clients): the Executive Report does **not**, as of this call, let you build the kind of granular custom conversion segmentation the partner's own team does manually (e.g., distinguishing "vanity" metrics like impressions/clicks from "meaningful" conversions defined per client via GA4 + Google Tag Manager + Google Ads). It also does not natively import granular ad-platform data breakdowns from Meta Ads, Google Ads, or LinkedIn Ads beyond a high level. However:
- **CallRail integration is possible** via CallRail's API, and once integrated, CallRail-sourced calls will show up as new leads in the CRM/Conversations section, which then flows into the report's lead-type numbers.
- **Ahrefs integration was not confirmed** by the rep on this call (she had not heard of it and took it as a follow-up) — the partner specifically prefers Ahrefs' Domain Rating (DR) metric over an alternative SEO tool's equivalent metric, calling that alternative "a little bit lucy-goosey" (loose/imprecise) by comparison.

The rep's suggested resolution for sophisticated partners who already do deep custom reporting: keep the Executive Report as a lightweight, always-on "day-to-day/week-to-week variance and heads-up" surface (things changed, things to address), while continuing separate deeper strategic business reviews (e.g., monthly) using the partner's own more advanced reporting — i.e., positioning Executive Report as a complement to, not a replacement for, an agency's existing premium reporting process.

---

## Date unknown — a Saskatchewan-based digital marketing agency owner with a Vendasta account manager (billing/subscriptions/invoicing walkthrough)

**Source:** [CALL] Snapshot/acquisition-form automation troubleshooting session

1. **Full acquisition-to-snapshot flow confirmed working, after a duplicate-email false negative was diagnosed** (see `crm.md` for the root cause): submitting the acquisition form with a genuinely new email address correctly created a Company, then an Account, then kicked off a Snapshot report generation (~24-hour turnaround) before a "Digital Success: Snapshot" campaign began sending automatically.
2. **Framing for why a Snapshot report matters, as a sales tool, stated directly by the account manager:** "a snapshot report is never gonna make a full sale, but it's gonna make that first sale, which is booking a meeting with you." The Snapshot's job in the funnel is to generate a warm reason to get a prospect on a call — not to close business by itself.
3. The partner had already independently learned this workflow requires deliberate testing — he ran the acquisition automation against test entries repeatedly to confirm what a real customer would actually see and receive before turning it loose publicly, which surfaced the duplicate-email/existing-company gotcha documented in `crm.md`.

---

## Date unknown — a solo prospective reseller (family/friends referral, passive-income motivation) (webchat/reseller demo and pricing walkthrough)

**Source:** [CALL] Reseller demo — Snapshot Report as a sales/needs-analysis tool with a Vendasta sales rep

The **Snapshot Report** is framed explicitly as a "needs analysis tool" for selling, not just an audit: click "create a snapshot report" on any business record and within 24 hours the system generates a rebranded (partner logo/name) report breaking the business's online presence into listings, reviews, social, and website sections, each with specific gaps identified. The rep's suggested sales workflow: run the snapshot on a prospect before ever pitching them directly, then use the report to justify which specific services to recommend, optionally showing a side-by-side comparison against three named competitors.

---

## Date unknown — a marketing manager at a multifamily property management company evaluating a reputation/listings platform (whitelabel reseller product deep-dive)

**Source:** [CALL] Whitelabel partner-led product demo — executive/proof-of-performance reporting with the reseller's account team and a Vendasta partnership manager

An **executive report** is available at both the multi-location (brand-wide) and single-location level, consolidating listings performance, reputation performance, and (if connected) social media performance into one place, explicitly framed as "proof of performance" — i.e., showing where a client's metrics started versus where they are now since onboarding. If the client's account also has the **advertising intelligence** module active (see `advertising.md`), ad performance across Google/Facebook appears in the same executive report. Connecting Google Business Profile, Search Console, and GA4 significantly enriches what the executive report can show; without those connections, reporting is more limited.

---

## Date unknown — a Vendasta account manager with the product leads of a large European telecom/media reseller partner

**Source:** [CALL] Feature request follow-up within a broader AI-credit-system roadmap call

The reseller has an existing **Premium Reports** view for leads, and separately requested a **custom report** that would flag when one of their SMB clients is approaching or has exceeded a monthly usage cap (framed as a "close to running out" alert view for their internal team, distinct from the client-facing usage notifications discussed elsewhere on the same call — see `conversations-ai.md`). Vendasta's response: this isn't an out-of-the-box report — it would need to be scoped as custom work, with cost and feasibility undetermined at call time. Vendasta committed to coming back with a scoping estimate roughly a week later, after internal discussion.

---
