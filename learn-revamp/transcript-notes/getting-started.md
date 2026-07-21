# Get started — transcript notes

Running notes extracted from SME/partner call transcripts. Feeds the
`learning-path-writing` skill when this path is drafted or enriched.
Each entry below is one source call — do not merge or overwrite prior entries.

---

## Date unknown (context: shortly after the July 4th/Canada Day holidays, likely early-to-mid July 2026) — Alistair George, Vendasta staff (Solutions/CS contact, Saskatoon office) & Brett Prieskorn, partner (screen-share working session)

**Source:** [CALL] Partner (Brett) walks Vendasta staff (Alistair) through a self-built support-ticketing workflow to get guidance on whether it belongs in Partner Center or Business App.

Brett had been running all internal support requests through Monday.com and wanted to replace that with a Vendasta-native ticketing flow, using an AI chat receptionist to triage incoming support email. This surfaced a concrete Partner Center vs Business App distinction that CS confirmed is a known gap, plus a working internal pattern Vendasta uses for the same job.

**The Partner Center vs Business App split, as CS explained it:**
1. There is no hard-and-fast rule for which platform a given workflow belongs in — "it's not totally black and white," it varies item by item.
2. Concrete example that bit Brett: the Partner Center AI chat receptionist does **not** have access to email — email capability only exists on the Business App side. He'd originally planned to build his internal support workflow entirely inside Partner Center and hit this wall.
3. For a support-ticketing use case specifically, Partner Center is the better fit anyway because all of a partner's own customer/prospect/past-customer data (accounts, CRM companies, lifecycle tags) already lives there — building the same thing in Business App would mean duplicating a customer database, which CS explicitly warned against ("not an easy path").
4. Data model reminder: an Account auto-creates a CRM Company in Partner Center; it is one-way (a Company does not create an Account).
5. Named gap: partners cannot buy or toggle on the same set of AI agents from inside Partner Center that are available through Business App — some products can only be purchased/activated via Business App. Alistair called this "one of the biggest gaps... in the channel partner experience" and said the SMB/Business App experience is polished but "the partner experience is a little bit disconnected."
6. Roadmap note (no date attached, treat as directional only): full consolidation so partners can toggle on all the same agents from Partner Center is "probably like the next year thing" — described as a known plan with no committed timeline ("tomorrow could be any time between now and next year").

**How Vendasta's own internal team runs this exact workflow (shown live, described as "not special — you have access to all this on your side"):**
1. A shared support inbox (e.g. `support@vendasta.com`) is logged into by a real staff member under their own profile, connected via Google auth, and added under **Administration → My Team**.
2. An automation triggers on **email activity created**, filtered to only fire when the email's owner/user ID matches that designated support-inbox profile.
3. The automation looks for an existing ticket and an associated company (deterministic matching), then hands off to a narrowly-scoped AI employee whose only job is replying to support tickets — it is not the same assistant used for sales/lead capture.
4. Tickets are modeled as a **custom object** in CRM (custom objects are a Premium-tier CRM feature) — Brett confirmed his account is on Premium. Fields can be added (e.g. request type) to support triage into categories.
5. Custom object records can have an owner assigned, same as Companies/Contacts, so a ticket can be routed to a specific internal person or team (e.g. route "marketing services" tickets to Vendasta, route others to an internal staff member by name).
6. Inside the automation, the **"Categorize with AI"** step (an AI classifier block) can replace a long chain of manual branching logic — feed it the possible request types and let it create/assign the ticket to the right bucket in one step rather than building out every branch by hand.
7. Vendasta's own internal ticket-management UI is not the CRM's default custom-object table view — they built a custom front end for it using Vibe, on top of the same CRM data (their own words: "kind of drinking our own champagne"). The default custom-object table view was described as usable for lower ticket volume.

**Gotcha and fix — don't overload one AI employee's role prompt:**
- Brett's first attempt customized the chat receptionist's role prompt directly to add a "classify existing customer vs. not" step before responding. Alistair flagged this as risky: asking one assistant to wear multiple "hats" (sales tone vs. support tone) makes behavior blend/degrade — "if you try to get an assistant to do too many jobs, they all sort of start to bowl together."
- Fix: keep the automation and the narrowly-scoped reply-only AI employee separate from the general-purpose sales/lead-capture receptionist, rather than stacking multiple jobs into one role prompt.

---

## Date unknown — Braedon Gaudet & Jeff Leach, Vendasta staff (Saskatoon-based channel/enterprise sales) with Brian Heppner (referral connector) and the Dynamico team (Amy Volatile, Cody Baier, Emily Grotkin — a HubSpot implementation partner) — partner/referral ecosystem-overview demo

**Source:** [CALL] Vendasta gives a HubSpot-implementation partner (Dynamico) a first-time, high-level walkthrough of what Vendasta is and how the platform fits alongside a partner's existing CRM stack, as a precursor to a possible referral/white-label relationship.

This was explicitly framed as "how Vendasta works" for people with zero prior exposure — good raw material for the ecosystem-overview/getting-started framing.

**Company origin story, told to new/prospective partners as the opening frame:**
1. Vendasta has been operating for about 18 years, founded in Saskatoon, Saskatchewan — described as one of the first Canadian tech companies of its kind.
2. Started as a single-product company: reputation management software, originally targeted at real estate businesses specifically.
3. Expanded because customers had no unified CRM or social-media tooling and were juggling a different vendor per function — Vendasta's response was to build a marketplace consolidating those point solutions.
4. Over "the last handful of years," Vendasta layered knowledge/context onto those original tools to turn them into "AI employees" — reputation management became a done-for-you reputation-management agent, the social media tool became an AI content creator, and the original lead-capture tooling became the Conversations AI product.
5. Current positioning language used in this pitch: Vendasta describes itself as an **"AI-optimized flywheel"** spanning lead generation ("speed to lead"), lead conversion, and client/customer engagement.

**The four reasons partners say prospects buy in (used as the core sales/positioning framework in this pitch — useful as ecosystem "why this matters" framing):**
1. Losing leads / can't keep up with volume — leads land in a CRM and go cold because nobody follows up fast enough.
2. Tech-stack consolidation — replacing many single-purpose vendors with one connected marketplace (this is also where reseller/white-label economics come up: established agencies were cited white-labeling Vendasta products and adding roughly 25-40% margin on top of Vendasta's own pricing).
3. Roll-up reporting — a multi-location/franchise corporate office can view performance across the whole brand, while each individual location can see its own site-specific numbers.
4. Efficiency — the same outcome can be self-served with the software, or fully handled by Vendasta's own team as a done-for-you setup.

**Platform architecture, as pitched to a brand-new audience:**
1. There are three distinct "views" into the platform: a **multi-location dashboard** (corporate/franchise roll-up), a **single-location dashboard** (the individual business's own Business App), and **Partner Center** (the admin/agency portal).
2. The multi-location dashboard has layered reporting: an Overview, an Insights layer (trending keywords, recurring review themes, how long it's taking to respond to reviews), and an Executive Report (full roll-up across every location: conversations, leads, listings, reviews).
3. Customer-journey framing used on the sales slide: **Attract → Convert → Engage** as the three stages; each product/service is drawn as an icon; the lines between icons represent automations connecting tools; a star marks anywhere AI is doing the work.
4. Scaling pattern for multi-location brands: configure one location fully first, validate it works well, then use **Account Templates** (Admin Center → Accounts → account templates) to copy that full setup — web chat, agents, knowledge base — across every other location, then go in per-location only to make small tweaks (this mirrors the same Account Templates feature described independently in the websites.md CS check-in entry).
5. Openness: the platform was described as "open source" in the sense that APIs, webhooks, and native two-way integrations (demoed live against HubSpot: contacts and notes sync both directions) are all available rather than the partner being walled off from their own data.
6. Cited case-study number used in this pitch: a large multi-brand franchise client ("Neighborly," specifically their "Molly Maid" brand) saw a 372% increase in captured leads/revenue in Q1 after adopting Conversations AI, from a baseline where roughly 30% of inbound leads were being missed entirely.

**Note:** this call also went deep on Conversations AI mechanics, a Vibe demo (AI website prototyping), reputation-management AI response behavior, and MatchCraft advertising — all intentionally excluded here; they belong in conversations-ai.md, vibe.md, reputation-management.md, and advertising.md respectively.

---

## Date unknown (context: call took place ahead of a stated July 1st go-live date) — Alistair George & Arjun Raman (Vendasta Solutions/Sales Engineers) with Umair Khan (Vendasta Account Manager), Jennifer Brunet (partner, agency managing multi-location medical-practice clients), Steve G (client-side developer), and Robert Daniels (Vendasta data/extract support) — technical multi-location integration and migration call

**Source:** [CALL] Working session to design a CRM contact-integration and review-request automation for multi-location medical practice clients with complex clinic/practitioner listing hierarchies, plus adjacent platform-architecture and API questions.

Most of this call is deep reputation-management/CRM integration mechanics (out of scope here — flagged below). The platform-architecture and account-modeling knowledge is captured here as general getting-started material:

1. **The Account Group (AG) is the atomic unit of the platform.** Every distinct business entity — a clinic building, or an individual practitioner who has their own separate online listings — is modeled as its own Account Group with its own product activations, own connected listings, and own timezone setting (found under that account's business profile).
2. **Timezone rule for automations:** an automation tied to a specific business/location account runs on that account's own configured timezone (read from its business profile), regardless of where the partner or the patient physically is. An automation run "from the Partner Center perspective" instead follows the partner's own timezone. This matters for anything time-windowed (e.g., only sending review requests between 8am-8pm).
3. **Modeling decision for real-world hierarchies:** when a practitioner works out of multiple clinic locations and has separate online listings at each (e.g., a doctor with 3 separate Google Business Profiles across 3 clinics), Vendasta's Solutions Engineer flagged this as not how the platform is really meant to be used — the platform expects you to decide whether "the business" is the clinic, the practitioner, or (workably, if messily) both as separate Account Groups. The real customer example on this call had an Account Group per doctor *per location*, which Vendasta's own SE candidly called "clunky" — workable, but not the recommended default.
4. **Practical control pattern when both a clinic-level and a practitioner-level Account Group could both fire a review request for the same visit:** create/update the contact in both Account Groups simultaneously from the integration (every visit always upserts two contact records), then use each Account Group's own **Reputation Management product enable/disable toggle** as the actual routing control — whichever Account Group has Reputation active is the one that sends the request, and the other is a no-op. This was preferred over trying to route dynamically via tags/automation logic, because the toggle is simple for non-technical staff to flip when a client's preference changes.
5. **Review-request links are not hand-built URLs.** Once a business profile's Reputation product is connected to its review sources (Google, Facebook, etc.), the review-request template just lets you pick the source by name (e.g., "Google") and the platform generates the correct link — hardcoding a URL into a template is possible but explicitly discouraged as "not really meant to be used that way."
6. **Compliance aside from Vendasta's SE:** multiple separate Google Business Profiles for the same practitioner at different addresses is against Google's own listing policies, even though a given client may have gotten away with it — worth flagging during onboarding/setup conversations even though Vendasta doesn't block it.
7. **API/service-account behavior (general platform fact, not reputation-specific):** service accounts aren't scope-restricted at creation — any service account can request any valid scope combination when generating a token; invalid scope names are rejected with an explanation. The platform's own account-management UI doesn't show much detail about an existing service account's configured scopes, so cross-referencing the API docs against the account name is currently the only way to confirm what's been granted (a known internal feedback item, per the SE).
8. **CRM contact-upsert facts confirmed live:** contacts can be created via API with no email address at all — the system will not attempt to de-duplicate against other blank-email contacts, so this is safe. Phone numbers can be sent in varied formats (10-digit with no symbols is fine, with or without a leading +1) and are normalized internally into one consistent stored format. Field-level upsert behavior (overwrite vs. merge/append) can be set per field — relevant when using a field like tags as a routing signal that should always reflect the latest value rather than accumulate.

**Note:** the bulk of this call — Account Group tag-based routing logic for review requests, the specific reputation-management API scopes/payload fields, and the review-source scraping mechanics — is reputation-management/CRM-integration-specific and is not captured here; it likely belongs in reputation-management.md or a crm/API-integration topic file.

---

## Date unknown — Keegan Pidwerbeski (Vendasta Sales Manager, existing partners) & Kent Falk (Vendasta Account Manager, ~3.5 years tenure) with Sarah Miller and team (partner agency, Shreveport/Tyler TX offices) — account-management relationship kickoff and Campaigns Pro (email/SMS) intro call

**Source:** [CALL] First substantive call between a partner agency and their newly assigned Vendasta account-management pair, following the departure/reassignment of their prior primary contact ("Nate"); the bulk of the call is a Campaigns Pro (email/SMS marketing) walkthrough, out of scope here.

**Account-management team structure and vocabulary, clarified on the call (useful onboarding/getting-started vocabulary parity):**
1. Vendasta's own team structure: a **Sales Manager for existing partners** (Keegan) leads a team of **Account Managers** (Kent) who work with an assigned "agency division" of partners on sales strategy, implementation, and general platform adoption.
2. Vendasta clarified its internal role definitions to make sure vocabulary matched the partner's own: **Account Executive** = new account acquisition; **Account Management** = existing accounts, growth-focused.
3. The partner's own mirrored structure: their Account Executives and Senior Account Executives handle day-to-day work on existing client accounts, while Managers and Senior Managers focus on deciding which tools to adopt and where to apply them (i.e., platform/vendor selection sits with management, day-to-day execution sits with account staff).
4. Account managers on Kent's team rotate between two sides of Vendasta's own funnel: "acquisition" (bringing on new partners) and "expansion" (growing existing partners) — Kent had worked both, which the Sales Manager framed as valuable because he understands the partner's journey end-to-end.
5. **Relationship handoff pattern:** this call was explicitly a warm handoff — the partner's previous primary contact (Nate) had moved to a different role/account set internally, and the new account manager pairing (Keegan + Kent) opened by relaying that Nate "spoke very highly" of the partner team before the transition, as a trust-building intro move.

**Minor tooling gotcha surfaced in intro small talk:** the partner mentioned an AI notetaker bot ("Read AI") that had auto-attached itself to one of their calendar invites and now joins meetings uninvited on its own — described as hard to fully remove ("it's not a virus, but it's like we can't shake it"); Vendasta's rep offered to manually remove it from that specific meeting. Standard call-recording practice confirmed on this call: Vendasta records via its own notetaker plus native Google Meet recording, and sends the partner a copy afterward that includes an auto-generated summary and transcript.

**Note:** the remainder of this call (Campaigns Pro email/SMS builder, pricing at $16.50 for Campaigns Pro base plus per-location SMS add-ons at $29-$39/month, drip-campaign automation triggers, Conversations AI missed-call/DM automation) is CRM/marketing-product-specific and not captured here; it belongs in crm.md and/or conversations-ai.md.

---

## Date unknown (context: references an upcoming "Monday the 20th" presentation date) — Alistair George & Jeff Leach (Vendasta Sales Engineer / Head of Sales) with Braedon Gaudet (Vendasta), and Ehab Tarabay & Ansh Shah (Anderson Global) — proof-of-concept kickoff and Partner Center orientation call

**Source:** [CALL] First real working call for a proof-of-concept engagement, opening with a from-scratch Partner Center vs. Business App orientation for a client (Anderson Global's head of technology) who had never logged into the platform before.

**Partner Center vs. Business App, explained to a first-time user:**
1. Partner Center was described as the platform's administrative back-end — built for multi-tenant use (many client accounts under one partner) but works fine for a single-tenant setup too.
2. Unusual-but-not-rare setup pattern used for this specific deal: the client (Anderson) is being configured as **a customer of itself** inside the platform — i.e., they use Vendasta's Channel Partner model even though Anderson is simultaneously the platform's own end consumer and the "channel partner" providing it, rather than a typical partner reselling to a separate client.
3. Concrete navigation shown live: from Partner Center → **Accounts → Manage Accounts** → select the account (Anderson) → **Open Business App** to reach the customer-facing view.
4. Inside Business App, the sections called out as most relevant to this use case were **Contacts** and **Conversations**. Expectation set explicitly: since data flows in from Salesforce and Vendasta acts on it and pushes results back, the client team likely would not need to spend much time manually inside Business App day-to-day.

**Proof-of-concept engagement structure and deliverables (reusable pattern for any new POC):**
1. Vendasta owes the client two things before the POC can formally start: a **Statement of Work**, and a **field-mapping document** matching the client's Salesforce field names to the equivalent Vendasta CRM fields.
2. The first workflow being piloted is inbound **contact/lead ingestion** — e.g., someone registers for a webinar in Salesforce, Salesforce logic fires, and that registration lands as a contact in Vendasta.
3. Contract framing: the initial signed agreement is scoped specifically to the proof-of-concept and does not commit the client to anything further — it only converts into an ongoing standard contract if the client is satisfied and agreed KPIs are met.
4. Execution mechanics once both sides agree: redline the draft, incorporate changes, then send for signature via **Adobe Sign**.
5. Role split on Vendasta's side: a Sales Engineer (also referred to interchangeably as "solution architecture") owns the technical proof-of-concept build, the API/CRM field mapping, and test runs of the workflow; the Head of Sales owns the commercial relationship and contract terms.

**Gotcha — cross-border SMS/A2P limits surfaced while improvising a live demo:** the client needed a working SMS demo for an in-person conference on short notice. Spinning up new A2P/10DLC verification wasn't realistic on that timeline (Twilio's partner verification queue was running long at the time). Workaround used: repurpose/rebrand an existing internal Vendasta demo account with the client's logo/branding rather than provisioning net-new infrastructure. Separately flagged: a Canadian-provisioned number can only send/receive SMS two-way with other Canadian numbers, not US-to-Canada — so for a US-based conference audience texting in from their own phones, a **US number** was required, not a Canadian or European one, or the two-way texting simply wouldn't work.

---
