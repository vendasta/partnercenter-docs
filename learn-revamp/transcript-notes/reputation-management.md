# Engage > Reputation Management — transcript notes

Running notes extracted from SME/partner call transcripts. Feeds the
`learning-path-writing` skill when this path is drafted or enriched.
Each entry below is one source call — do not merge or overwrite prior entries.

---

## Date unknown — Kevin Hinahon (Vendasta/partner-success rep) with Jay Grossman / Melissa Beyer (NAI Global network affiliate, senior director of marketing) — product walkthrough / discovery call

**Source:** [CALL] `reputation-ai-google-business-profile-demo.txt` — Kevin Hinahon screen-shares a live Business App instance to demo Customer Voice and Reputation AI for an NAI Global commercial-real-estate affiliate that has an existing corporate Vendasta arrangement but had never actively used it.

1. Context: NAI Global corporate holds the Vendasta relationship and pays on behalf of affiliates; this call was with one individual affiliate office (branded "MHC Real" / Cognant Inc) whose contact admitted the office "just [hasn't] made it a priority" since initial setup years earlier.
2. Positioning hook Kevin used to justify prioritizing this now: AI answer engines (he named Google's Gemini AI Overview specifically) are "training on everything that they know about you online" and pull mostly from Google Business Profile reviews and Reddit. A business only has direct control over two of those channels — Google Business Profile and Facebook reviews — so review volume and response rate are a direct lever on how favorably an AI Overview describes the business.
3. **Customer Voice** = the product used to request reviews from existing clients, delivered by SMS or email. This client hadn't turned it on yet ("that is on my list of things to do this year").
4. **Reputation AI** walkthrough, step by step:
   - Open Reputation AI; use the right-hand filter **"Response required"** to isolate every review that hasn't been answered yet.
   - Two reasons to answer every review, positive or negative: (a) an unanswered review — good or bad — reads to a prospective customer as a sign the business might not be active or legitimate; (b) Google and Facebook's own ranking logic rewards owners who respond to reviews at all, so even a low-effort reply beats silence.
   - Click **"Suggest response"** — free, and can be clicked repeatedly until the wording feels right; the AI-drafted reply is tuned to the phrasing search engines favor. Edit it for a personal touch if desired, then click **Respond** and it posts back automatically to the originating channel (Facebook or Google).
   - For obvious spam/bogus reviews (this account had several multi-year-old crypto-spam reviews sitting unanswered), best practice is to flag them to the platform (e.g., report to Facebook) rather than ignore them — an unaddressed pile of spam reviews reads the same as an inactive, untrustworthy business to both real customers and to Google's own signals.
   - Gotcha: don't assume "no new reviews showing" means the integration is broken. Check **Administration → Integrations** to confirm the Google Business Profile connection is actually live before troubleshooting further — in this case Google *was* connected; the real reason the client saw zero fresh Google reviews was that the office had simply never solicited any (no Customer Voice requests had ever gone out).
5. Side note worth flagging for account hygiene: connected Meta channels (Facebook and Instagram) are disconnected and require reconnecting automatically **every 60 days** per Meta's own policy — worth telling whoever owns social/reputation so the recurring reconnect notification doesn't get ignored as spam.
6. Out of scope for this note (belongs to other topics, see report-back): the same call also demoed the AI chatbot / lead-capture employee (AI Workforce, $148/month, includes setup for custom lead-routing workflows) and Social Marketing's content tool, plus a long side-thread about integrating the chatbot with the affiliate's third-party property-listing backend ("Buildout") via an API-call tool. None of that is reputation-specific.

---

## Date unknown — Umair Khan (CS / Birdeye-integration rep) with Jennifer Brunet (Blue Orchid Marketing, agency serving podiatry-practice clients) — reputation-management rollout planning call

**Source:** [CALL] `reputation-management-review-request-cooldown-period-birdeye.txt` — working session to set the review-request cooldown period and push finalized review-request templates out to ~100+ client accounts via account templates, ahead of go-live.

1. Terminology: this partner's review-request flow runs through **Birdeye** (a third-party reputation platform Vendasta channels through); the partner and CS rep both refer to the whole product area as "rep management."
2. **Cooldown period** (how long before the same contact can be asked for another review): Jennifer's prior Birdeye setup had almost every client at 180 days; the platform's visible max was only 90 days. Podiatry clients specifically didn't want patients asked more than twice a year, so 90 days was accepted as a workable (if not ideal) number to launch with. Umair had to check internally (with a contact named Alistair) before confirming whether the cap could be raised at all — takeaway: don't assume a config field's visible maximum is negotiable; confirm with engineering before promising a change.
3. Template build-and-push workflow (needed because ~102 client accounts sat under one PID):
   1. Finalize templates in one reference/pilot account first (here: the "North Brunswick" account, itself living under a parent "Shapiro" account) — one initial review-request email template, one separate follow-up email template (different tone: "just a follow-up"), and one SMS template.
   2. In Partner Center, go to **Accounts → Account Templates** (last item in that section) → **Create Template**, and choose the source account to copy from.
   3. Gotcha hit live: when picking what to copy, the **Campaigns** and **Email templates** categories were both empty — the review-request templates actually lived under **Automations** instead. Don't assume the template type maps to the obvious-sounding category; check Automations first for rep-management templates.
   4. **Apply Template** only supports picking target accounts by manual search — there is no criteria/filter-based bulk-apply (e.g., "every podiatry account tagged RM") built into that flow. As a workaround, CS ran a manual back-end script and filtered the account list by **Industry = Podiatry AND Tag = RM** to get an exact target count (35 accounts with both filters; 38 with the RM tag alone) before copying.
   5. A feature request was already in progress (CS expected it live around the following July) so partners can bulk-apply account templates by filter criteria directly in the platform instead of needing a manual script.
   6. Practical shortcut Jennifer landed on instead of precisely scoping the ~35–38 currently-live accounts: push the 3 finalized templates to **every** account under the PID (all ~102), regardless of whether rep management is turned on for that account yet — an unused template sitting on an inactive account causes no harm, and it pre-stages any account that turns rep management on later.
   7. Automations follow the same build-then-activate pattern: a newly copied automation shows status **"Inactive"** until manually toggled on — copying/building it is a separate step from activating it.
4. Open item carried to a future call: "grouping accounts" — flagged as unresolved and needing a follow-up with Alistair or another admin contact (Arjun); not detailed further on this call.

---

## Date unknown — Umair Khan, Jennifer Brunet, and Steve (Blue Orchid's IT lead) — email configuration, NPS template, and A2P/10DLC compliance fix

**Source:** [CALL] `reputation-management-nps-template-email-configuration.txt` — follow-up session (the day after the cooldown/template call) finalizing rep-management email sender settings, NPS comment routing, and resolving an SMS carrier registration rejection.

1. **NPS comment routing:** when a review-request template includes an NPS score field and the recipient leaves a free-text comment alongside the score, that comment lands inside the Business App by default. Jennifer didn't want to grant clients Business App access just to read comments (patients sometimes write off-topic things there, like appointment-time questions), so she asked whether the comment could also be emailed out — confirmed as possible/configurable, though the exact setup path had to be checked with the internal team.
2. **Mixed-channel templates and A2P gating:** a template configured for both email and SMS does **not** fail or skip the whole send if a given client hasn't cleared 10DLC (SMS carrier) registration yet — it silently falls back to email-only and just the SMS leg is dropped. Practical implication: build every template as "email + SMS" from day one; you won't have to re-edit each one later as individual clients clear 10DLC approval.
3. **Email sender configuration** (account-level settings):
   - **Sender name** → set to the practice/business name, not a generic agency brand, so it doesn't read as automated spam.
   - **Reply-to address** → whatever address is entered is where a patient's direct reply lands; set to the same monitored mailbox the practice already uses for direct feedback, rather than leaving it no-reply, so replies reach a human.
   - **Display address** (footer disclosure) → legally required (CAN-SPAM-style) physical-address disclosure in the footer; tied to the address already on file as the listing address — not a free-text/style field.
   - **Consent-block language** ("sending emails to us who have not provided solicited consent") must reference the practice's own brand, not the agency's.
   - **From-domain reality check:** initial rollout used Birdeye's own shared sending domain via SendGrid (a `.io`-style no-reply domain) specifically to get review requests live before doing the heavier work of registering a dedicated domain. Real risk called out: a shared public sending domain can bounce or get blocked by an ISP because of *other* customers' sending behavior on that same shared domain — rare, but outside the partner's control.
   - **Longer-term plan:** move onto a client- or agency-owned sending domain, which requires adding DNS/SPF records at the registrar (merging in the SendGrid `include`, not replacing existing mail records). The agency's IT lead estimated this as same-day work once scheduled, and flagged that most partners will **not** hand over a client's own domain access for this by default — that's reserved for specific, tightly access-controlled requests, not standard practice.
4. **Deliverability/formatting gotcha found in QA:** a test send was missing image alt text entirely (bare logo/graphic only). This both hurts inbox placement (properly-formatted emails with all expected fields are treated as more legitimate by mail filters) and breaks the experience for recipients whose client blocks images by default (they see nothing, vs. still seeing alt text). A tracked link in the same test email also 404'd even though it had been manually linked — root cause undetermined on the call and escalated with a screenshot to the platform engineering contact (Arjun); flagged for confirmation that an automation-triggered send uses the exact same template/content path as a manually-triggered "Request a review" send (they're supposed to be identical, but this test showed a discrepancy).
5. **A2P 10DLC SMS registration rejection — concrete fix pattern:** a client's carrier registration was rejected over "verbal consent" as the stated opt-in method. The carrier runs an automated scan of the client's website; if it finds a "Contact Us" form on the site that wasn't declared in the registration application, that mismatch alone reads as suspicious enough to fail the registration, even if the omission was accidental. Remediation steps used on this call:
   1. Add a compliant SMS opt-in checkbox to the website's contact form (the form already collected a phone number but only carried a HIPAA email disclaimer — no SMS consent language, and a separate checkbox that existed but wasn't marked required).
   2. Use the **exact opt-in copy supplied in the carrier's rejection report** (the report cited a specific page — "page six" here — with ready-to-paste language) rather than freehand wording. Verbal-consent-only opt-in is explicitly called out as "the hardest to get approved" because the carrier can't independently verify a verbal exchange took place.
   3. Website-builder note: on a Squarespace site, this was added via the platform's own **Add Field → Checkbox** option with the supplied description text pasted in.
   4. After the fix, resubmit; treat this as an iterative process tied exactly to what each rejection report flags, not a one-shot fix.
6. Bulk template push targeting reconfirmed: Industry = Podiatry + Tag = RM (~35 accounts) vs. Tag = RM alone (~38 accounts) was used again to scope exactly which accounts got the 3 finalized podiatry templates (2 email, 1 SMS) — same filtering approach as the prior call.

---

## Date unknown — Umair Khan & Jennifer Brunet — post-launch reputation-management monitoring check-in

**Source:** [CALL] `reputation-management-live-launch-checkin.txt` — check-in during the first week rep-management review requests went live and began sending daily; reviewing automation run reports and SMS credit usage.

1. **Reading the automation run report:** "Total runs" reflects the number of contacts/accounts the automation fired for (confirmed as the likely interpretation on the call, but not stated with full certainty by the rep — worth independently verifying rather than assuming). Tracked columns: completed, did-not-run, ran, downstream, skip.
2. **The 90-day cooldown gate in practice:** entries reading "a review request is already scheduled for this account/contact" are the cooldown logic (set up in the earlier calls) actively suppressing a duplicate send — not an error. A separate "failed to complete due to an error" status traced back to the same 90-day gate blocking a second attempt, in this case because the client's own team had re-sent the same source file/records more than once (duplicate submissions), not a platform bug. Practical troubleshooting takeaway: if you see repeated account IDs across multiple attempts in a short window alongside a 90-day-gate error, that's almost always duplicate/resent source data — expected behavior, not a defect.
3. **SMS credit limits:** the account had a 50-SMS/month credit allotment. Behavior at the limit wasn't immediately clear even to the CS rep and needed checking with the internal team; per the platform's internal support chatbot, exceeding 50 credits is a **soft limit** resulting in overage billing rather than a hard stop that blocks sending — flagged as needing final confirmation, and the exact per-message overage price wasn't nailed down live on this call.
4. **Real cost-surprise example, worth reusing as a sales-process lesson:** the client discovered mid-engagement that Birdeye/SMS overage costs were being silently absorbed into their existing vendor invoice without being called out — roughly $680+ across their accounts, scaled over a year. Small per-account, but non-trivial in aggregate ("if you have 40 accounts and times it by a year"). The client's explicit ask: flag SMS overage economics to a partner proactively during the sales process, even unprompted, so they can build the true cost into their own client pricing up front rather than discovering it after go-live.
5. **Data-integrity gotcha:** a small number of records reliably dropped out of every daily file transfer (e.g., a batch of ~100 records regularly arrived missing a few — 3, in one confirmed example — even though the source file was verified to include all of them). Root cause was undetermined at call time (unclear whether the drop happens on the sending side or during the API transfer); escalated to a senior developer via the platform's support team due to a backlog, with an explicit ask to loop in a named client-side engineering contact directly if the client lead was unavailable (she was going on vacation the following week).
6. **Minor UI question resolved:** a "50 reviews edited or removed" stat with no obvious explanation turned out, on inspection, to be counting older/past reviews rather than anything currently actionable — treated as a non-issue once viewed, not investigated further.

---

## Date unknown — Braedon Gaudet, Jeff Leach, Cody Baier (Vendasta) with Amy Volatile, Emily Grotkin, Brian Heppner (Dynamico, a HubSpot implementation/RevOps partner)

**Source:** [CALL] `ecosystem-overview-conversations-ai-vibe-demo.txt` — Reputation Management AI-response/NPS demo portion of a platform-overview call exploring a HubSpot referral relationship (the Conversations AI / HubSpot-integration portion of this same call is already filed in `conversations-ai.md`; Vibe and other product content from this call is out of scope here).

1. **Reputation AI walkthrough, demoed live on an active multi-location franchise account:** connecting Google Business Profile and Facebook via single sign-on doesn't just pull reviews from those two channels — it consolidates **every** review source the business has (the demo account also showed Angie's List reviews flowing into the same hub).
2. **AI-drafted review responses are trained the same way Conversations AI is** — they learn the business's brand voice/information over time, and are deliberately SEO-tuned: a positive review containing keywords the business wants to rank for gets a reply that "doubles down" on those keywords, while a negative review's keywords are deliberately **not** echoed back in the AI's response, specifically so the reply doesn't get cached by Google or other search/AI engines as reinforcing an important negative association.
3. **NPS-gated review-request flow, explained as a filter before a review ever goes public:** the tool can send a pre-review NPS-style survey ("would you recommend us to a friend?"); a low/negative score routes the contact into an automation that takes the feedback **offline** for follow-up and remediation rather than prompting a public review; a positive score instead triggers an automated prompt asking the customer to post the review publicly. Explicit intent stated on the call: keep negative sentiment out of public domains like Google while still capturing and acting on it internally.
4. **Review-request triggering, both manual and automated:** requests can be sent manually via email or SMS from inside the tool, but the more common partner pattern described is wiring an automation off an external event — e.g., once an invoice is created or a job is marked complete in a connected QuickBooks/POS system, the review-request send fires automatically.
5. **AI auto-response is configurable, not all-or-nothing:** partners can choose whether the AI responds to all incoming reviews or only positive ones, and can set a delay before it responds — framed as giving businesses their time back rather than requiring a human to log in and reply to every review manually.
6. **Rollout/templating pattern for multi-location brands, same mechanism used elsewhere in the platform:** set up and validate Reputation AI on one location first, then use **Account Templates** (Admin Center → Accounts and account templates) to copy the configuration across every other location; each copy still trains on that specific location's own knowledge base/website rather than inheriting the source location's content wholesale, and small per-location tweaks can be made after the copy.

---

## Date unknown — Johan Moreno, Alistair George (Vendasta) with Brandon Lake, Greg Rosenhan, Nikki DeSantis, Scott Riddell (Resmark, activity/booking-software partner)

**Source:** [CALL] `partner-contract-new-developments-resmark.txt` — Reputation-Management AI tone-customization portion of a partner-contract/product-roadmap check-in call (the bulk of this call covers an in-development CRM inventory-management/SKU feature and a HighLevel-vs-Vendasta tooling comparison, out of scope here).

1. **Direct confirmation that Reputation AI's review responses are AI-generated, not a Vendasta human writing them** — raised because the partner (Nikki, evaluating whether to hand this off from a manual process) was specifically concerned that AI-written review replies can "stick out like a sore thumb," citing the giveaway of a reply that reads like it was obviously "copy and pasted into ChatGPT."
2. **Vendasta's own framing of why their implementation avoids that failure mode:** per Alistair, it's "all about how the AI is implemented" — their claim is the response generation has been tuned specifically to not sound robotic.
3. **Tone is explicitly configurable per account, with real examples given on the call:** the response style can be dialed toward "super blunt" (including directly calling out a reviewer, which Alistair flagged as probably a bad idea in practice even though it's technically possible) or toward "super... bubbly" — i.e., tone is a real, adjustable setting rather than a fixed voice, and the partner is expected to pick a tone appropriate to the brand rather than accept a single default personality.
4. **Context for why this came up:** the partner's own reputation-monitoring today is a manual, free-to-them tool bundled with their agency account (aggregate/reply to reviews, no deeper CRM/data integration) — the AI-tone question surfaced specifically while comparing that manual status quo against Vendasta's fully automated Reputation Specialist (auto-requests **and** auto-responds) as a "hands off" upgrade path Vendasta was pitching for the renewed contract.

---

## Date unknown — Biswarup B (apartments.com Reputation team) with apartment-community property managers (two properties) — Reputation product onboarding: review-response policy and review-generation mechanics
**Source:** [CALL] `gbp-listing-claiming-reputation-onboarding-apartment-properties.txt` — reputation-specific portion of a combined Reputation + Social onboarding call for two apartment properties (the GBP-listing-claiming portion of this same call is filed in `local-seo-listings.md`; the social-posting portion is filed in `social-marketing.md`).

1. **Standing review-response rule:** the team monitors and responds to reviews across Google, Apartments.com, and Facebook — but any review touching a **legal concern or Fair Housing issue** is escalated to the client for approval before any response is posted, never auto-answered; this carve-out was stated as policy, not something negotiated per-account.
2. **Review-generation workflow:** within 24 hours of onboarding, the client gets an email with a spreadsheet to fill in current residents' contact information; the team uses that list to send review-request outreach directly.
3. **Interim-period guidance:** while GBP access/claiming is still pending (a common gap at onboarding for properties with no existing listing access), the client is explicitly told to keep responding to any incoming reviews themselves in the meantime, since Vendasta can't act on a listing it doesn't yet control.
4. **Bundling context confirmed on the call:** Reputation and Social are sold and onboarded together as one combined product for this apartment-industry vertical (via a reseller relationship with apartments.com/CoStar), with a single shared onboarding script covering both.

---

## Date unknown — Biswarup B (apartments.com Reputation team) with Amabel Arteaga (property client) — second instance of the same apartments.com Reputation + Social onboarding script
**Source:** [CALL] `reputation-social-onboarding-roberta-apartment-homes.txt` — a near-identical repeat of the onboarding script captured in the entry above, for a different property; logged separately to confirm the script is consistently applied, and to capture two variations worth noting.

1. Same core mechanics confirmed again: property/address/hours confirmation → GBP-access check (claimed directly by Vendasta with Google when the client has no access) → review-response policy with the same legal/Fair-Housing carve-out → 24-hour review-generation spreadsheet request → 4 social posts/month published to Facebook, Instagram, and GBP as a fully managed (not self-serve) service.
2. **Facebook-page ownership gap, a new wrinkle here:** unlike some other properties in this batch, this client had **no existing Facebook page at all** — Vendasta's team takes on creating it, while the client is expected to create their own Instagram account themselves (a specific division of labor: Facebook creation is Vendasta's job, Instagram account creation is the client's).
3. **Yelp access gap:** the client confirmed a Yelp listing exists for the property but she has no login for it (created by a predecessor before her time) — logged as a listing Vendasta can't act on until/unless the client is able to track down those credentials herself.
4. **Support routing:** a shared "social support @ [reseller]" email address given for any future changes, consistent with the sibling call above.

---

## Date unknown — Harikrishnan V (Vendasta) with Paul (insurance agency, client) — review-response and NPS-gated review-request configuration
**Source:** [CALL] `ai-receptionist-reputation-email-onboarding-paul-insurance.txt` — reputation-configuration portion of a combined AI Workforce + Reputation + Email onboarding call (the AI receptionist/chat setup is filed in `ai-workforce.md`; the email-campaign-automation portion is filed in `crm.md`).

1. **Review-response automation tiers, clarified explicitly:** **4- and 5-star reviews** count as positive and get an automatic AI-drafted response mentioning the business name; **1-3-star reviews** count as negative, and by default the AI-drafted response **omits the business name** specifically so a negative review doesn't compound brand association — client can additionally require his own approval before any negative-review response posts (a configurable gate, not automatic either way).
2. **Distinction the client initially conflated (worth flagging for any Learn content, since it recurred elsewhere in this batch too):** responding to reviews already posted publicly is a completely separate feature from proactively requesting reviews from customers — the client needed this spelled out explicitly mid-call before the rest of the review-request explanation made sense to him.
3. **Review-request format options:** a straight **review-request** template, or an **NPS-style** template using a 1-10 rating — a score of roughly 7-10 routes the customer to actually post publicly (Google/Facebook); a lower score instead captures private feedback only, specifically to prevent a dissatisfied customer from posting a public negative review before the business has a chance to hear about the issue directly. Delivery can be email, SMS, or both, and email/SMS can be sent together or separately depending on client preference.
4. **CRM-sourcing mechanic for review requests:** if the client's contacts live in a third-party CRM (here, the client mentioned evaluating Ricochet360 or Shape CRM as alternatives) rather than Vendasta's own CRM, the workaround is simply exporting contacts to CSV and importing into Vendasta's CRM — described as "pretty simple," not requiring a deeper integration.

---
## Date unknown — Vendasta onboarding specialist and marketing agency partner (Business App walkthrough)

**Source:** [CALL] Partner onboarding — Business App walkthrough, reputation/AI review-response configuration portion

Review response automation is configurable by **star-rating threshold**, not a single on/off switch. Common partner configuration pattern discussed on the call: reviews at 4 stars and above can be fully automated (AI drafts and posts the response with no human step), while reviews at 3 stars and below require a human approval step before the AI-drafted response gets published — some partners set **all** negative reviews to require approval for an initial trial window (30/60/90 days mentioned as typical) until they've built trust in the AI's tone, then loosen the approval requirement over time.

The partner raised a direct objection worth capturing in spirit: he was worried about "putting reputation response on full autopilot" given industry backlash against obviously AI-generated content, and specifically referenced wanting best-practice-aligned (E-E-A-T-style) responses that still read as human. The Vendasta rep's framing in response, a useful sales/positioning line: **"we are managing the AI, we're not managing the work"** — i.e., the human's role shifts from writing every response to supervising/tuning the AI's tone, language, and guardrails per client, and per review sentiment category.

---

## Date unknown — Vendasta senior sales/product executive and account manager (marketplace pitch to a multi-location marketing agency prospect)

**Source:** [CALL] Partner/prospect pitch — marketplace overview call, reputation management deep dive

Reputation management ("Reputation AI") was walked through end to end:
1. **Connect accounts** (Facebook, Google, LinkedIn, etc.) under Reputation settings. Once connected, the tool immediately starts propagating/pulling in any reviews found on those platforms.
2. **Manage Reviews** screen shows every review across connected sources with a flag for whether a response is required; responses can be written and sent to *all* connected platforms from one box. The rep noted this single feature alone satisfies roughly 90% of customers who use the product.
3. For higher-review-volume businesses, the recommended workflow is **NPS-style pre-screening**: after a service/purchase, the customer gets an SMS/email asking them to rate the experience (a single tap, e.g., 0-10). If the score is high (the call used 7/8+ as an example threshold, fully customizable), the customer is automatically redirected to leave a public review on Google/Facebook. If the score is low, it routes internally (e.g., to a manager) instead of the review platforms, so the business can address the problem directly.
   - **Compliance gotcha explicitly confirmed on the call:** review-gating/filtering (only asking happy customers to post publicly) is against Google's and the FTC's rules. The NPS step exists specifically as the compliant workaround — it's a private satisfaction score, not a public review filter, so it doesn't violate the "don't gate reviews" rule.
4. Businesses that don't want the NPS intermediate step can skip straight to blanket **review requests** after every job/purchase (manual entry, CSV upload, Zapier, or a webhook/POS integration).
5. **Review widget**: a piece of embeddable code lets a business choose which star ratings to surface on their own website. **BBB-specific rule flagged**: if you opt in to show Better Business Bureau reviews on the widget, BBB requires you to display *all* of their reviews (you can't selectively hide low BBB ratings) — this is a BBB platform rule, not a Vendasta limitation.
6. **Upcoming feature discussed on this call:** per-technician QR-code "tap cards" for post-job review/NPS requests attributed to individual service staff, with good scores routing to public review requests and bad scores routing to that technician's manager. The vendor cited a pilot showing review-generation volume increasing substantially when the QR code is a mandatory step in the technician's workflow, with reviews attributed and leaderboard-tracked by team member.
7. Reviews themselves always live on their native platform (Google, Facebook, etc.) — Vendasta doesn't store/host the review text itself; the review widget just pulls and displays it.

---

## Date unknown — a Vendasta account manager with a home-services-focused marketing agency partner (AI Workforce demo)

**Source:** [CALL] Partner enablement — AI Workforce product walkthrough and packaging/pricing session with a solo agency partner

The **Reputation Specialist** is one of Vendasta's "out of the box" AI employees, described as an added autonomy layer on top of the existing Reputation Premium tool: given a set of instructions, it responds directly to Google and Facebook reviews on the client's behalf. It can be sold and activated as a standalone product (it does not need to be bundled with the chat/voice receptionist), though the rep's recommended sales approach is to position it as part of a broader "AI Workforce" bundle rather than a single point solution. A stated value-add beyond auto-responding: the client can "chat with the data" — asking things like "what's our customer sentiment been recently" or "turn my latest review into a social post" directly from the reputation module.

Integration note: several job-management platforms are pre-integrated so that when a job is marked complete in the client's existing system of record, Vendasta can automatically trigger a review request — explicitly positioned as "we plug into your existing tech stack rather than disrupting what's already working."

---

## Date unknown — a physical-therapy franchise partner (co-owners) with a Vendasta sales rep (SEO/reputation/AI-chatbot proposal call)

**Source:** [CALL] Review-request automation diagnostic for a seven-location physical-therapy clinic group

1. **Client's existing review-request process (pre-Vendasta), described in detail:** on patient discharge, an automated export from their EMR feeds a list into a third-party email tool, which sends a review-request email, followed by an automatic re-marketing/reminder email **3 days later** if the recipient hasn't clicked the survey link.
2. **SMS vs. email open-rate gap, cited as the reason to add SMS to review requests:** email open rates for review-request messages run roughly **20–30%**, versus roughly **95% for SMS**. Rep's stated rationale: individual consumers don't check personal email consistently and a lot of personal-email traffic is filtered as spam, whereas people at least glance at texts.
3. **NPS-based review-request mechanic described:** Vendasta's SMS-based reputation flow sends an **NPS-style question ("would you recommend us to a friend, 0–10?")**; responses of 8–10 route the person directly to leave a Google review (or into a follow-up campaign), giving a built-in way to filter for happy customers before asking for a public review.
4. **Automation trigger design discussed but not finalized:** the client wanted the review-request trigger tied to their EMR automatically firing "when a contract is closed or a payment is made," rather than manually uploading discharge lists. The sales rep confirmed Vendasta's system is open-code/open-API and can integrate with anything that itself exposes an open API — but was explicit that actually wiring this integration is real work requiring the solutions-architecture team, not a guaranteed instant connection.

---

## Date unknown — a solo prospective reseller (family/friends referral, passive-income motivation) (webchat/reseller demo and pricing walkthrough)

**Source:** [CALL] Reseller demo — review management and review-request funnel with a Vendasta sales rep

Review requests are sent via email/SMS using an uploaded CSV contact list. When a review-request form goes out, a low rating routes the respondent to a private feedback capture (so the negative review doesn't get posted publicly and instead reaches the business directly); a high rating prompts the respondent to post their review publicly — described as a way to preemptively filter negative reviews before they go live. A widget can be embedded on the client's website (described as a review carousel) to display reviews. All reviews-mentioning-the-business activity feeds into one dashboard where the business (or an AI, if configured) can respond.

---

## Date unknown — a marketing manager at a multifamily property management company evaluating a reputation/listings platform (whitelabel reseller product deep-dive)

**Source:** [CALL] Whitelabel partner-led product demo — full reputation-management feature deep-dive for a multi-property portfolio, with the reseller's account team and a Vendasta partnership manager

This is the deepest reputation-management coverage in this batch. Context: the client currently uses a competing multifamily reputation-management platform and previously used a different reputation vendor, and was evaluating consolidating onto this whitelabel reseller's Vendasta-powered platform.

- **Multi-location business app/dashboard**: rolls up reputation, listings, and social for every property into one place, filterable by date range (default 7 days, adjustable) and by individual location.
- **Review response service**: fully human-staffed (explicitly **not AI-generated** — a deliberate differentiator called out repeatedly, since the client's current vendor claims human responses but the client suspects staff are copy-pasting AI output). Reviews rated 4–5 stars get a response drafted and posted by the reseller's team; reviews rated 1–3 stars require the client's approval before posting. Response SLA: **within 2 business days, excluding weekends**. An "Additional Guidelines" notes field lets the client specify tone/language preferences, signature format, and words/phrases to avoid — team members see these notes every time they reply, avoiding the client's prior pain point of inconsistent staff wording.
- **Approval/posting workflow**: the client receives an email containing the review text and the team's proposed reply; clicking through opens the dashboard where the client can edit the text before it posts, or approve as-is. Google and Facebook have direct API integrations so approved replies post automatically; for sources without an integration, the client edits/approves in the dashboard and the reseller's team manually logs in and posts the client-approved text. The platform "will never override" what the client has posted/edited.
- **Reviews covered for response**: confirmed sources included Google, Facebook, and several multifamily-specific and general review sites.
- **Edited-review tracking**: the dashboard shows a history of edited/removed reviews and attributes which team member authored each response, supporting accountability.
- **Sentiment/keyword tracking**: the dashboard surfaces trending keywords and name mentions within reviews — used by some property clients to run internal staff recognition/incentive programs off review mentions. **Gotcha raised by the client**: their prior PMS-integrated review-request automation auto-attributed 5-star reviews to whichever staff member closed out the underlying maintenance work order — even when that staff member wasn't actually named in the review text — producing inflated/misleading per-employee attribution. **Roadmap item mentioned** (not yet released): employee- or location-specific QR codes for review requests, to create a cleaner attribution mechanism than name-mention parsing alone.
- **Negative review removal**: this Vendasta-powered platform does not offer active negative-review-removal/dispute services; it can flag particularly egregious/offensive reviews for the internal reviews team to report to the platform, and will proactively alert the client's point of contact about questionable reviews worth a closer look. This is a known gap versus the client's prior vendor, which used a third-party service to actively contest reviews going back through historical review history, not just newly incoming ones.
- **User management**: users can be added directly in the business app's admin tab per location, with role-based access control — handled by the client themselves rather than requiring a support ticket.
- **Trials/pilots**: this whitelabel reseller does not run short (2–3 week) trials; the standard commitment is annual, but the account team indicated a **30–60 day pilot across a couple of properties** could likely be arranged with manager approval before a full portfolio rollout — a workable path for skeptical multi-location clients.

---

## Date unknown — a Vendasta account manager with a dental-marketing agency's owner/decision-maker and the agency's platform administrator

**Source:** [CALL] White-label reputation-management sales demo for a dental-clinic-focused marketing agency evaluating Vendasta to fill a gap in their existing (listings-only) service stack

1. **Context/need:** the agency already resells listings management (through a separate tool) to dental practices but has no reputation-management offering — that gap, plus a general market trend of marketing agencies moving to "full scope" offerings, was the stated reason for evaluating Vendasta.
2. **Account-consolidation gotcha:** the two people on the call had ended up in **two separate logins/instances** before onboarding was complete — the AM flagged this explicitly as something that causes real problems if left unresolved before go-live ("all of a sudden you'd have two different logins, and that could be all kinds of issues"), and took an action item to consolidate both people and the pilot account into one instance before the next session.
3. **White-label depth demonstrated, end to end:**
   - The Business App can be branded with a **custom domain**, and beyond just the wrapper dashboard, an individual product's page itself (e.g., the Reputation Management tool) can carry its **own separate custom domain URL**.
   - Inside Marketplace → the product itself, a partner can **white-label the tool specifically** — replace the product's own logo and rename it — not just re-skin the outer dashboard.
   - **User/permission setup:** a "user" record is what associates a login with dashboard access; permissions/visible-sections are fully customizable per user (e.g., a client user might only ever see the Reputation Management panel on the left nav, nothing else). This setup can be done **in bulk** as a template so every newly-added client user automatically inherits the same standard access configuration rather than being manually reconfigured each time.
4. **Reputation Management feature set demoed:**
   - **AI-assisted review response:** respond to incoming reviews with AI-drafted replies; set up templates so the AI "learns" how to auto-respond going forward.
   - **Review requests:** SMS/email templates that can be sent post-visit to solicit reviews.
   - **Mentions/comments monitoring:** track online mentions of the business beyond just direct reviews.
   - **NPS-gated review requests:** a post-visit survey scores the customer; high scores are routed to a public review ask, lower scores are routed to an internal follow-up flow instead of a public review request — used to manage reputation risk from upset customers.
5. **Live-testing tool for prospects/new clients — "My Listing" test page:** every account auto-generates a "my listing" test page tied to the demo/test business. A team member can post an intentionally negative fake review there, click "Suggest a review response," and see exactly what the AI-generated reply would look like — without it being live/public — letting an agency validate response quality before turning on live auto-respond for a real, sensitive vertical like dental practices.
6. **Where AI response quality comes from:** the reputation AI's knowledge base is built by scraping the business's website/profile (plus optional PDFs/articles uploaded manually); a **rule/persona** is then defined for how it should talk/behave, and that combination is what lets the "reputation specialist" AI Employee draft on-brand responses.
7. **Standard AM working pattern for a multi-stakeholder onboarding:** rather than looping every stakeholder into every call going forward, the agency owner opted to hand ongoing day-to-day setup calls to her power-user teammate, with the two of them syncing separately afterward — the AM explicitly supported this as a normal pattern to reduce scheduling friction.
*(Marketplace navigation and subscription pricing/wholesale-credit mechanics from this same call are filed in `marketplace.md`.)*

---
