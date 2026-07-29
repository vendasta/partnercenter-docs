# Wire your AI Workforce to Act — transcript notes

Running notes extracted from SME/partner call transcripts. Feeds the
`learning-path-writing` skill when this path is drafted or enriched.
Each entry below is one source call — do not merge or overwrite prior entries.

---

## Date unknown — Alistair George, internal LFA automation deep-dive (internal Vendasta walkthrough)

**Source:** [CALL] Alistair George walks Madison O'Neill, Hemanth P, and Ashir Fazal through the Neighborly "LFA" (lead follow-up automation) framework and the tooling used to deploy it across franchise brands.

This is an internal Vendasta call (not a partner call), but it's the single most detailed builder/automation architecture walkthrough in the batch — a full franchise-scale nurture automation reconstructed step by step. Useful as an advanced/expert-tier example for the builder path.

Background: Neighborly's own CRM integration originally triggered LFA off a **contact field update**, which was destructive — any later update to the contact wiped the trigger record. The fix (co-driven with Neighborly): the integration now writes a **Note** to the contact instead, tagged `form submission: nbli`, and the automation triggers on note creation with that tag. A second tag chains in web-chat-sourced leads (see step 13).

The workflow, front to back:

1. **Rate limit:** the automation is allowed to fire once per day per contact — a safety measure so a contact's phone doesn't get "blown up."
2. **Automation goal = Lead Status field.** If Lead Status changes to anything other than the brand's "top of funnel" values (commonly "New," "Lead," "Open" — each brand has its own list), the automation stops immediately. This replaced an explicit if/else branch placed before every SMS step in the old version — same effect, far fewer steps.
3. **Opportunity check:** pull the opportunity off the contact. If its stage is Closed Lost/Closed Won, or it does **not** contain the keyword "New Booking" (a marker meaning the opportunity was created by the *current* LFA version, not a stale one from 3+ months ago sitting in "New Inquiry" from the old version), the workflow creates a **new** opportunity for this nurture pass, pulls in business-profile data for later SMS copy, and tags the contact "LFA" (cosmetic only — for CRM visibility, not workflow logic).
4. **Record-source bypass branches:** "Trading Gauge" leads and anything already at Lead Status = "Book" skip LFA entirely and get pushed immediately — per Neighborly's explicit request. Other brands maintain their own excluded third-party record-source lists (Angie's List, etc.). All brands share **one master-level array** of third-party source names (not a true platform variable, but used as one) instead of maintaining 18 near-identical lists — necessary because the vendor's own list of third-party names has inconsistent spelling/capitalization that drifts over time with no explanation from the vendor.
5. **Non-webchat, third-party leads** skip straight to sending the first SMS — no booking flow exists for these sources, and "speed to lead" (get to a new lead as fast as humanly possible) is the operative franchise-world term.
6. **Non-third-party leads wait for a website booking.** The booking form is multi-page: page 1 (submit) creates the CRM contact record; a later page (actually picking a time) creates the meeting activity. If no meeting activity appears, a delay fires.
7. **Delay duration is brand-specific and often not a round number** — e.g., Mr. Rooter wanted 2.5 minutes. The automation-builder UI only accepts round numbers (minutes/hours), so the exact value has to be forced in via the API directly.
8. After the delay: if the opportunity isn't still in "New Inquiry," the workflow ends. If it is, it sends SMS #1, logs a note on the contact (not required for the logic, but a recommended practice — owners read the contact's note trail to see the "SMS1 → SMS2 → booked" story without digging through full conversation transcripts), then waits (event-based delay) for a reply.
9. **No reply →** the lead gets pushed to the brand's point-of-sale system via a cloud function call, using the same JSON payload shape as the separate "send leads to Neighborly" automation, except with `isLeadOnly: true` — this flag tells the cloud function there's no chat summary to attach, vs. the webchat-lead version which does attach one.
10. **"Wait until next day" workaround:** built as a 65-minute wait combined with a time-window check (9am–10am local). If currently inside that window, the 65-minute wait pushes past 10am into the next day; if outside the window, it waits longer to land back in the 9–10am band the next day. The platform's automation delays don't natively support "wait until tomorrow morning" — this is the workaround.
11. The cycle repeats (check opportunity → send next SMS → wait up to 1 day for reply) and ends by moving the opportunity to **Closed Lost**, which frees the contact up for a different nurture campaign to run against them later (e.g., a future MFA — a maintenance-follow-up automation Neighborly and Vendasta are also building).
12. A companion automation, **"LFA Booking Pipeline Management,"** triggers whenever a meeting activity is created (regardless of channel — website, AI reply, call center) and moves the opportunity to "Appointment Booked." This is what makes the "not New Inquiry" checks elsewhere in the main workflow pass, ending outreach the moment someone books through any path.
13. A **helper automation** exists purely because CRM automation triggers are gated to one specific activity type each (e.g., "communication" vs. "note" vs. "meeting"), and there's no single trigger that covers both entry paths (webchat lead vs. form submission). The helper listens for the webchat-lead trigger and writes the same tagged note the main LFA automation is watching for, effectively chaining the two automations together. Alistair flagged this to R&D as something that should ideally be replaced by a proper shared trigger.
14. **"LFA Stop Follow-up Management":** on a new contact communication summary, an AI step is asked whether the contact soft-opted-out (declined service, said don't text me, going elsewhere, etc.). If yes, the opportunity moves to a "Stop Follow-up" stage.
15. **Per-brand variation example (Glass Doctor):** adds an AI classifier branch for lead type — residential/"flat" glass vs. automotive glass — because automotive leads need faster follow-up and the SMS needs to ask for a VIN and email if not already provided (skipped if already given, since there's no point re-asking).

Rollout/ops tooling (relevant to anyone maintaining automations at franchise scale):

16. Source automations currently live in each brand's high-traffic "Main Street" demo/marketing account — being migrated to **dedicated, quiet, per-brand source accounts** because Main Street accounts have too much unrelated activity (demos, marketing team work) happening in them.
17. **New brand builds are copied via API** from whichever existing brand's automation is closest to the new requirement, rather than built from scratch (Alistair: building from scratch "would take a while"). A blank **"LFA Source" template shell** was introduced the week of this call specifically so future brand rollouts start from an empty standardized skeleton instead of a copied, brand-specific automation that then needs stripping down.
18. **Deployment/audit tooling:** currently a script Alistair runs locally (being migrated to Google Cloud Run so it doesn't depend on his laptop being on). Plan is a recurring (roughly weekly) audit across every location account that diffs each one against its brand's source automations, checking three things: (a) does the automation exist, (b) is its internal structure correct, (c) is it enabled.
19. **Gotcha:** an earlier, shallower version of this audit only checked "does an automation with this name exist" — which passed even when someone had manually edited and re-enabled a broken automation, silently breaking it in production. The audit was extended to inspect automation internals, not just presence/name, after this was discovered.
20. R&D is separately working on **versioning and account-template features** intended to eventually replace this custom audit/deployment tooling altogether.

---

## Date unknown — Femi Oludimu & Johan Moreno, AI Workforce discovery/demo (prospect call, thin builder content)

**Source:** [CALL] Femi Oludimu and Johan Moreno (Vendasta) run an AI Workforce discovery/demo call with prospect Adam Porter, a real-estate-focused digital marketing agency owner in Denver.

This call is overwhelmingly an AI Workforce / platform sales demo (chat receptionist setup, pricing, Vibe teaser) — **not** primarily builder content, and most of it is being filed elsewhere (see flag below). The one piece of real builder/automation-relevant substance:

- Adam Porter already runs his own automation/agent stack integrated with **HubSpot** (his current primary CRM) and explicitly asked whether Vendasta exposes an **MCP service or an API** he could connect into — his stated goal was to compare it against what he's built on HubSpot and potentially consolidate onto one platform ("if I could kill off Hubspot and move over to one platform, that would be awesome"). Johan did not actually answer the MCP/API question directly in this call — he pivoted to describing Vendasta's CRM/Prospector lead-list tooling instead. So there's a real, named technical ask (MCP/API access to integrate an existing HubSpot-based automation stack) that went unanswered on this call — worth flagging as an open item if this prospect returns for a technical follow-up.
- Separately, Johan gave a brief tour of the "AI" tab / custom-agent builder and cited an internal example of a more advanced custom build: an AI/BDR agent named **"Iris,"** built entirely on the Vendasta platform, that runs a full research report on a prospect, drafts personalized outreach based on the partner's services plus that research, and writes the results back into the CRM — described as running "on autopilot" once fed contacts/leads. This is a real (if brief) example of chaining multiple capabilities into one custom AI employee, distinct from the default chat/voice receptionist.

**Flag — content in this file that belongs to other topics, not filed here:**
- Chat receptionist setup walkthrough (role, AI model choice, capabilities like "book appointments," knowledge base auto-import from website/business profile, install snippet for WordPress) — `ai-workforce`.
- AI Workforce bundle pricing ($39 chat receptionist, $15 social, $35 reputation, ~$13 sales assistant, $499 "AI Workforce" bundle retail example, wholesale-offset-subscription model) — `ai-workforce` (pricing/tier literacy).
- Social Marketing / content-scheduling demo and AI image generation — `social-marketing`.
- Vibe teaser (build-with-a-prompt landing page, custom domain publishing) — `vibe`.

---

## Date unknown — Hadley Schmidt & Jamie Morrison, automation setup follow-up (CS check-in, thin builder content — sets up entry below)

**Source:** [CALL] Hadley Schmidt (CS) and Jamie Morrison (partner acquiring a reputation-management book of business via a revenue-share deal) — pick up an automation request from a prior call and book a technical follow-up.

The concrete automation ask, stated plainly by the partner: when a website chat visitor becomes a lead, it should (a) land in the CRM automatically, (b) trigger an internal team notification, and (c) kick off automatic first-touch email and SMS follow-up — essentially replicating what a junior sales associate would do, without a human doing it.

Gotcha/pattern worth keeping for the builder path: **the CS rep handling the account was upfront that automations aren't her strength** ("I never end up in here with any of my training") and escalated internally to a specialist — Alistair George, whom she works with regularly to get "the technical stuff" done on AI-agent builds. She booked a dedicated session with him specifically to build this out live with the partner, noting he'll likely also suggest further automations once he's in the account. This is the escalation-map pattern (partner-call-insights.md 4.8) showing up **inside Vendasta's own CS layer**, not just partner-to-Vendasta — even CS reps route non-trivial automation builds to a technical specialist rather than attempting them.

The actual build that resulted from this escalation is documented in the next entry below (same partner, same specialist, next call).

**Flag — content in this file that belongs to other topics, not filed here:**
- Full Social Marketing product demo (connecting accounts, AI-drafted posts and AI-generated images, content calendar, RSS curation, analytics) — `social-marketing`.
- Campaigns product overview (10,000 marketing emails/month base allowance, SMS add-on, template library, multi-language support, per-account send stats) — likely `crm` (Campaigns lives under CRM/marketing in-platform) — flag for whoever owns that slug to confirm.
- A partner side-conversation about becoming a "poster child" build showcasing his own local-service business running entirely on the platform — not really a documented topic; probably not worth its own file, flagging only in case it resurfaces.

---

## Date unknown — Alistair George, capabilities & automation build walkthrough (technical follow-up to the entry above)

**Source:** [CALL] Alistair George walks Jamie Morrison through AI Employee capabilities/tools and builds the webchat-lead-to-CRM-to-SMS/email automation live, per the request booked in the prior call.

**Capabilities and tools, explained from scratch:**

1. A **capability** = a prompt module, optionally paired with a **tool**. A tool is a connection to something external the AI can pull data from or push data into. Example given: a Shopify capability lets the AI check what's actually in stock and only mention in-stock items to a website visitor.
2. Capabilities can be edited or created from scratch (**+ New capability**, write the prompt, optionally attach tools at the bottom).
3. **Coming soon (per this call, beta today, full release expected "sometime in Q4," not committed):** an in-platform AI assistant for rewriting/improving your own capability prompts, so partners don't have to copy a prompt out to ChatGPT/Claude, get it rewritten, and paste it back in. Alistair was clear this is a **different, smaller feature** than the bigger outcome-focused/agentic automation initiative referenced later in the call — don't conflate the two.
4. **Role** = the AI employee's job description and how it should approach that job; this is also where you pick the underlying AI model. Alistair's live recommendation for the chat receptionist specifically: **Gemini Flash** — "found that one does work quite well with the chat receptionist."
5. **Knowledge base** = retrieval-augmented generation over uploaded/connected sources (website content, pasted text, uploaded documents). When the AI doesn't know an answer from its role/capabilities, it searches the knowledge base for facts (services offered, who founded the company, etc.).

**Building the automation, step by step:**

6. Trigger used: **"Webchat captures leads."** What this actually hooks into: every website chat conversation has a 5-minute inactivity timer that resets on each new message; when it expires, the transcript is fed to an AI model that generates a paragraph-style summary — that summary's creation is what fires this trigger.
7. Gotcha/product feedback surfaced live: there was **no existing automation template** for this extremely common job (chat lead → CRM → automated follow-up), even though Alistair agreed it's probably the first thing most customers want. He built it from the blank template instead and said he'd flag the templating gap to the product team (recorded, so it goes in as feedback).
8. Add an AI-employee step to **qualify the lead** before doing anything else: feed it the chat summary (pulled via the trigger's dynamic "Chat Summary" component) and prompt it to answer "is this lead qualified — yes/no," since not every chatted-with visitor is a real prospect (could be an existing customer, could be a vendor trying to sell something).
9. Branch on the answer with an **if/else step** ("if the answer contains yes").
10. On the "yes" path: notify a team member, send a follow-up **text**, and optionally start an email/SMS **campaign** (a campaign must already exist to reference here).
11. SMS sent by the automation lands in the **same conversation thread** as the original website chat — one unified, cohesive conversation. If the lead replies over SMS, the same AI receptionist responds with full context from the earlier web-chat exchange (no "starting over" for the customer).
12. **Gotcha:** sending SMS through Conversations requires **A2P 10DLC verification** first. At the time of this call, turnaround was running **2–3 business days** (down from roughly 2 weeks previously) — Alistair noted Vendasta has been pushing its provider on this.
13. Publish the automation to activate it. Alistair's framing of the finished result: "kind of the most basic version of this could look like ... but you can get pretty in-depth with these workflows."

**Scale and build-process notes (context: partner had seen a franchise account's automation with ~50 steps):**

14. Franchise-scale "mega automations" can run 50+ steps. Alistair, who personally builds/maintains these for the platform's largest franchise groups (his title is "sales engineer," but the actual role is implementation/solutions work with the largest enterprise accounts), describes the process as **"educated trial and error"**: ship a reasonably simple version, watch how it performs in production, and add branches/steps only as real opportunities for improvement surface — not a from-scratch, fully-speced build.
15. **B2B vs. B2C automation complexity differs by design, not by accident:** consumer/local-business leads are "flaky" and need repeated, aggressive automated outreach across many steps; B2B leads are more intentional and don't need (and shouldn't get) the same volume of automated touches.

**Adjacent platform facts surfaced in the same call (useful context, not automation steps per se):**

16. Payments: partner-level payments run through Stripe today; **customer/local-business-level payments are "work in progress"** — for now, the platform integrates with external systems the client already uses (QuickBooks, Housecall Pro, etc.) to receive transactional data, and automations can act on that data once it arrives, but the platform isn't yet the system of record for that transaction.
17. LLM vendors in use at time of call: primarily **OpenAI and Google**, with some internal model work also underway; Vendasta has a working relationship with these labs sufficient to get help squeezing more value out of the models ("if you're tall enough to ride the rides, they'll work with you"), though not daily contact.

---

## Date unknown — Certified partner roundtable: AI credit/token monetization, with an automation-cost tangent (roundtable, mostly pricing — automation-relevant portion only)

**Source:** [CALL] Gabriel Tsoi (Vendasta PM for CRM/integrations/building) and Megan Cheesbrough (Vendasta AI team) run a certified-partner roundtable — Jeff Pierce, Chris Geer, Brett Prieskorn, Nick Prentice, Klint Rudolph, Simon Papadopoulos — soliciting feedback on an upcoming AI credit/token monetization model.

This call is almost entirely a pricing/business-model discussion (credit pools, tiered subscriptions, client-facing transparency about AI usage) — most of it belongs to a pricing/business-model theme outside this taxonomy, not builder. Extracting only the parts that are genuinely automation/technical facts:

1. **Key technical fact surfaced by Gabriel:** inside the platform, the AI usage that consumes by far the most tokens/credits isn't chat-style interaction (a human typing to an AI assistant) — it's **automated, scheduled workflows that run without a human present**: bulk contact enrichment (one partner was running enrichment across 100,000+ contacts, each contact effectively one research prompt), or content-generation automations set to run repeatedly on a schedule (e.g., an agent that researches three times a day, picks the best angle, and drafts a post — done automatically every day). This is why the team is considering splitting credit accounting into "chat interaction" usage vs. "automated agentic workflow" usage.
2. **Custom agents can combine multiple capabilities into one build** — Gabriel confirmed a single custom AI employee can chain, for example, a social-posting capability together with a contact-enrichment capability ("you can make some magic between the different kind of capabilities in a single custom agent").
3. **Feature-unlock structure confirmed live on the call:** the Blogger and Social AI agent unlock when an app moves from its Pro tier to Premium tier (e.g., Social Marketing Pro → Premium unlocks both); partners had separately been quoted roughly **$9/month** as an add-on price for social media manager + blogger on top of Social Marketing Pro.
4. **A real automation-escalation story, worth keeping as a pattern:** partner Nick Prentice described requesting a recurring, scheduled marketing automation — scrape auction listings weekly, generate an email from them, and send it automatically to a list every Monday — and being told "no" repeatedly by his rep over roughly three months of check-ins. On this call it came out that the actual blockers were (a) the campaigns/email sending infrastructure being actively rebuilt to work well in the AI era (legacy infrastructure limitation, not a hard "can't"), and (b) the token/cost economics of running large scheduled automations at scale. Gabriel confirmed the campaigns email infrastructure has been under active rebuild for roughly the past six months for exactly this reason.
5. **Partner-voiced lesson for the escalation map:** partners explicitly asked Vendasta to be honest about *why* an automation request is blocked (cost/infrastructure reasons) instead of a flat "no" or "we're working on it" — Nick: "if there's other things that are saying like we can't really do this, then tell us actually why we can't really do it."

**Flag — content in this file that belongs to other topics, not filed here:** the bulk of the call — credit/token pricing models, tiered subscription vs. pay-as-you-go debate, per-app vs. shared credit pools, one-time/non-recurring credit purchases (referenced for Vibe specifically), business-center-user AI-visibility toggles for managed-service partners, and a mention of a possible future "vibe your own client-facing dashboard" vision — is a pricing/business-model and `vibe` discussion, not builder. Recommend routing to whichever topic covers partner pricing strategy (not in the current taxonomy) and to `vibe`.

---

## Date unknown — Logan Ochitwa et al., Kixie phone integration & ServiceMinder discovery (prospect discovery/demo call)

**Source:** [CALL] Logan Ochitwa, Cody Baier, Brian Heppner, Jeff Leach (Vendasta) run a discovery/demo call with Alyssa Markham, Heather Gatlin, and Maeghan Callaghan — a multi-brand home-services call-center ("the jungle") evaluating Vendasta to replace/augment their phone and lead-routing stack.

Real technical/automation substance, despite being a sales-discovery call:

1. **Missed-call text-back pattern:** if a call goes unanswered, the platform automatically texts the caller and starts a conversational (not just yes/no) exchange aimed at booking the appointment — cited as the mechanism that took a neighboring franchise client's dropped-lead rate from ~30–40% down to effectively zero.
2. **AI voice receptionist as a phone-system layer, not a replacement for live agents:** it's positioned as the backstop for whatever a human agent's hours don't cover — after hours, no answer, on hold, or declined.
3. **Call-handling configuration options, by scenario:** end the call and immediately send a follow-up text (used when a client doesn't want the AI voice itself talking to callers but still wants instant engagement); play a message before ending the call ("our office is currently closed, we'll text you right now") then follow up by SMS; forward the call to a live number; or answer directly with the AI voice.
4. **Zip-code-based call routing:** for multi-location/franchise setups, an inbound call can be routed by the caller's zip code to the AI instance/voice assistant assigned to that specific location, which is also location-aware for scheduling (knows that location's calendar/hours).
5. **AI-as-voicemail hack:** when Google's Local Services Ads (LSA) paid-ad billing counts a pickup vs. a voicemail, having the **AI answer the call counts as a pickup** — voicemail does not. Partners are deliberately using the AI voice receptionist specifically to avoid a "went to voicemail" ding on LSA billing.
6. **Kixie is Vendasta's most closely integrated third-party call/IVR partner** (used internally by Vendasta's own sales team) — the integration pattern: a form fill or inbound-lead event creates a task that pops up in the rep's screen inside the CRM, with the number already loaded in a soft-phone dialer; one click starts the call. If the call doesn't connect, the automation automatically follows up by text.
7. **The integration isn't Kixie-specific** — any third-party call/IVR system works as long as it exposes an open API the platform can connect to (RingCentral was named as another example). If the third-party system locks its data down, Vendasta can't support tying into it.
8. **ServiceMinder (field-service platform) integration pattern, explained as a trigger-condition model:** e.g., "job marked complete" fires an automated flow (send SMS/review request/thank-you note); "estimate created but appointment not yet confirmed" fires a different automated follow-up (reminder text/email) after a set number of days. Building this requires walking the client's actual sales/support/payment journeys end to end so Vendasta's team knows exactly which ServiceMinder data points and trigger conditions to wire up.
9. **Gotcha raised by the prospect's own former ServiceMinder employee (Heather Gatlin):** the ServiceMinder API is "not as complete as some people think" — there are real gaps in what can be transferred between it and outside CRM/automation tools, and she explicitly wanted confirmation Vendasta's integration team had deep, repeated hands-on experience with that specific API (not just a generic "we can integrate with any API that's open" answer) before trusting the build. Vendasta named two specific specialists (Sean Schroeder and Alistair George) as the people who've actually done this integration work before, rather than committing a generic team.
10. **Complexity driver called out by the prospect:** their sales workflow complexity isn't in the IVR/call-routing logic — it's in the service-selection logic (7 main service lines, each with 6–14 sub-options that change the outcome/quote), and that complexity varies by both brand and individual location/franchisee, not just brand. A prior vendor attempt at handling this failed because "what we're using just didn't have the capability" — a cautionary data point for scoping automation complexity honestly before committing to a build.
11. **Escalation/handoff pattern for the deal itself:** rather than diving straight into a deep technical scoping call with the ServiceMinder and Kixie integration teams, Vendasta suggested a lighter first step — validate against how Vendasta's own internal sales team already uses Kixie (via the person who owns that internal integration) before looping in the vendor's own reps.

---

## Date unknown — Umair Khan & Jennifer Brunet, multi-location automation template rollout (status/scoping check-in, brief)

**Source:** [CALL] Umair Khan (Vendasta) and Jennifer Brunet (partner) — a short status check ahead of finalizing and rolling out a shared automation template across multiple podiatry clinic clients.

1. **Multi-location visibility workaround:** the partner (via a request from "Sean") wanted a single-account view showing, for a multi-location client (example given: a 3-location practice), which products are activated per location, even though the platform doesn't natively roll this up cleanly. Alistair's proposed workaround (relayed by Umair): add custom fields to the CRM to surface an "activated products" view per location as an overview, acknowledging it won't be a fully native rollup but will cover the reporting need.
2. **Rollout sequencing for the template:** a technical call (with engineers) is scheduled specifically to lock down what will be controlled by data vs. controlled by the automation itself; the goal is to finalize the template shape at a follow-up meeting two days later, after which the account team updates branding (logo) and initiates **10DLC registration** per client before rollout can proceed.
3. **Staffing note:** two Vendasta sales engineers (Alistair and one other) are now supporting this rollout jointly, explicitly called out by the partner as a confidence signal ahead of a deadline.
4. Per-client customization still required even with a shared template: each doctor/practice uses a different review platform, so listings/review-source setup has to be tailored per client on top of the shared automation shell (partner had separately walked clients through fixing "primary listing" status flagged orange/red in Listings — a `local-seo-listings` note, not filed here).

---

## Date unknown — Alistair George, "49 Financial" scope-of-work review (technical scoping call — Databricks-to-CRM automation)

**Source:** [CALL] Alistair George (Vendasta) reviews a written scope-of-work document with Amber Allen, Luke Stanton, Braedon Gaudet, and Chris Deianni from "49 Collective" / "49 Financial," scoping an automated referral-routing integration between their Databricks environment and Vendasta CRM/automations.

1. **Data flow, end to end:** referrals originate in "49 Collective" member financial systems, land in Databricks, and from there Databricks calls **Vendasta platform APIs** to create a CRM **contact record** and an **activity record**. That activity creation **fires an automation** which creates an **opportunity** in a pipeline. The receiving side (the member/service provider) works the opportunity through pipeline stages as normal. A **second automation** pushes pipeline-stage updates back out to the 49 Collective side, so the originating team can see who's working (or ignoring) a given referral and follow up with that person directly.
2. **Live vs. batched sync — decided live, with a debounce buffer:** the group debated real-time sync vs. a nightly batch. Real-time won ("if it is an option ... 100%, let's go for live"), but with a safety concern: a rep clicking through several pipeline-stage changes quickly in the UI would otherwise fire the outbound-update automation once per click. Fix agreed live on the call: add a short debounce/buffer (initially proposed 5 minutes, then 30 minutes, settled on **2 minutes**) so rapid successive changes collapse into a single outbound update. Alistair noted this buffer value is trivial to change later or remove entirely once real usage patterns are observed.
3. **Responsibility split, documented explicitly in the scope of work:** Vendasta owns setting up the service-provider account, the pipeline template, and implementing both automations (inbound contact/opportunity creation, outbound status sync). The client owns the Databricks-side logic (the "path in and path back out") and any reporting/analytics on their end, since that's their domain, not something Vendasta's team can access directly — Vendasta can advise on the logic/shape but can't touch the Databricks implementation itself.
4. **Testing prerequisite:** at least one service-provider account (real or a dummy/placeholder) must exist in the CRM before the Databricks-to-Vendasta connection can be tested end to end.
5. **Test-data hygiene gotcha, caught proactively:** rather than reuse an existing account that might have stray "test submission, please ignore" data in it, the plan is to **duplicate the account into a fresh instance** specifically for this integration test, avoiding contaminated test data bleeding into the pilot.
6. **Fallback integration path flagged (not the current plan):** if a given 49 Collective member's own CRM won't hand over direct API access for the Databricks-side sync, the fallback would be manual spreadsheet transfer (explicitly disliked by both sides) or potentially **Zapier** as middleware — but this was deliberately deferred ("that's maybe a down-the-line thing to tackle") in favor of getting a single-member Salesforce-based MVP working first and validating the whole flow before generalizing the rollout.
7. **Operational (non-technical) risk flagged by Alistair as the biggest open question:** not the automation logic itself, but simply ensuring people actually log in and work the referrals once they land — proposed technical mitigation is a reminder automation if a referral opportunity hasn't been touched within 24 hours.
8. **Rollout sequencing:** onboard one real service-provider member first (candidate named, not the org's own internal financial arm) to pilot the flow and gather feedback before generalizing to the rest of the collective; targeted for onboarding by end of month/early next month, contingent on other competing priorities (an internal summit was cited as a scheduling constraint).

---

## Date unknown — Kent Breckner (Vendasta CS) with Stan Edwards & Dylan Martin (agency, "TMG")

**Source:** [CALL] `crm-onboarding-training-session.txt` — QuickBooks + Make.com invoice-automation workflow portion of a partner check-in/troubleshooting session (the My Meetings booking setup and team-event bug from this same call are already filed in `crm.md`).

Stan (the partner) spent roughly **five hours** independently mapping and proving out this workflow before the call, using webhook.site to confirm payloads before wiring the real integration — a concrete example of the "educated trial and error" build pattern seen elsewhere in this taxonomy.

1. **Root problem:** no native way exists to export invoice data out of Vendasta via any webhook trigger or action — Stan searched every resource guide and support couldn't answer the question directly ("they're dodging it"). Verified conclusion after his own testing: **there is no invoice-export webhook/trigger in the platform** as of this call.
2. **Workaround found instead: build the automation off the Order/approval flow, not invoices.** Prerequisite: train the team member (Cara) to create every sale as a proper Order in Partner Center — even wholesale add-on services — rather than working outside the order system, since the order-submission event is the only reliable trigger available.
3. **Workflow, step by step, as designed (not yet built at call time):**
   - Cara creates an order for a customer and submits it for **internal approval**.
   - An admin (Stan or Dylan) reviews the order and clicks **Approve** — this approval action is the actual automation trigger.
   - Approval fires a **webhook** carrying the full order payload (all line items, prices, and customer contact/email info) out to **Make.com**.
   - Make.com checks QuickBooks for an existing customer matching that contact; if none exists, it creates the customer record first, then creates the invoice (or, for a recurring product, sets up the initial invoice and configures the recurring schedule once approved).
   - Make.com emails the accounting inbox that a **draft invoice** is sitting in QuickBooks needing review/send.
   - In parallel, the automation creates a **task inside Vendasta**, assigned to a specific employee, mirroring the same "go verify and send this invoice" reminder as a backup to the email.
   - Once the invoice is actually reviewed and sent from QuickBooks side, a callback closes out the Vendasta task and logs a **CRM note on the company record** ("invoice generated, invoice #___, this date, this amount") so the team has an audit trail inside the CRM without needing to open QuickBooks.
   - When the invoice is later marked paid in QuickBooks, a final callback logs that payment status back into Vendasta as well.
4. **Escalation path used:** rather than trying to finish the build solo, Stan booked dedicated time with **Alistair George** (Vendasta engineering) to review the mapped-out roadmap and build the remaining pieces together — consistent with the pattern elsewhere in this taxonomy of CS/account teams routing non-trivial automation builds to a named technical specialist rather than attempting them directly.
5. **Gotcha for anyone replicating this:** the build explicitly treats "sync the invoice into QuickBooks" and "notify humans it needs review" as two separate, parallel outputs of the same trigger (email + in-platform task) — a deliberate redundancy so a missed email doesn't silently stall the invoice from ever going out.

---
