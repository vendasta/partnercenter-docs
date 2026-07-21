# Engage > Websites — transcript notes

Running notes extracted from SME/partner call transcripts. Feeds the
`learning-path-writing` skill when this path is drafted or enriched.
Each entry below is one source call — do not merge or overwrite prior entries.

---

## Date unknown — Kent Breckner (Vendasta CS rep, with Daniela Esparza, Vendasta CS, largely silent) & Tiffany Harrell, partner — recurring CS check-in call

**Source:** [CALL] Routine weekly/biweekly CS check-in touching on lingering fallout from a website-related migration, ticket-routing confusion, and a specific plugin data-portability problem on a client site.

**Website migration fallout (platform-wide, not account-specific):**
1. CS confirmed the rocky experience wasn't isolated to Tiffany's accounts — "a lot of website issues with this migration kind of across the board," affecting other partners in the same reps' book of business too.
2. CS's framing: the migration "wasn't as seamless and smooth as we were hoping" but is now considered stabilized ("should be smooth sailing from here").

**Support ticket routing — history of churn and a live gotcha:**
1. Historical pattern (per a former Vendasta contact, "Nami"): always email a **My Team** address rather than the general **support@** or **websites@** inbox, because routing through the wrong inbox created duplicate tickets; My Team handled internal routing to the right owner.
2. That broke down when Vendasta staff temporarily lost access to the My Team inbox, forcing partners through **support@** instead, and when that wasn't responsive, through a **websites@**-style inbox.
3. Live gotcha flagged on this call: forwarding an **already-existing email thread** to `support@vendasta.com` appears not to open a new ticket or notify anyone — no confirmed technical reason was given, just an observed failure. Workaround implied: start a fresh email rather than forwarding an old thread when escalating a website issue.
4. Underlying cause of recent slowness: Vendasta dropped its long-standing external ticketing system (referenced as "Zendesk" in the call, transcribed as "Sandesk") and built a replacement in-house on Vendasta's own platform (built using Vibe). The rollout was rushed against internal deadlines, first phased to the general support team, then a few months later to the marketing services team (which includes the website team) — CS candidly attributed recent response-time dips to this transition, not to any one partner's account. Leadership signaled (per an internal all-hands reference) that things are expected to keep improving.
5. Partner's read on ticket severity by category: website issues (site down, forms broken) are treated by partners as urgent/high-stakes compared to something like a missed social post, which explains why slow website-specific response times feel worse.

**After-hours / emergency website support access:**
1. Before the ticketing migration, partners could reach a live website-support human through chat, including after hours.
2. At the time of this call, live chat support was temporarily down/being rebuilt — no ETA given beyond "working on getting the chat back up and running."
3. Current after-hours path: **call the support phone line.** The call is answered by an AI agent first; explicitly say "I want to talk to a human" (or "transfer me to a human") and it will detect the request and transfer the caller to a live person — website support is included in that phone-transfer coverage, not just general support.

**Client-cancellation data-portability gotcha (member/subscription plugin sites):**
1. Concrete case: a member-based client website (example used: "Virginia Limousine Association") used the **Paid Membership Pro** WordPress plugin (a Vendasta-recommended setup) to gate an annual paid membership, connected to Stripe for payment collection, with automatic removal from the active-member list on non-payment.
2. When the client canceled Vendasta website hosting/build services, the only thing handed back was the plugin's license key — not an exportable member/subscriber list.
3. On the new host, the migrated site is only showing a partial subset of members compared to the original — data isn't reconciling, and once hosting access was cut off, the Vendasta website team could no longer get back into the old environment to help reconcile it.
4. No clean resolution existed at call time — Tiffany's ask (logged here as an unresolved feature request, not a confirmed workflow): either (a) support an export of the plugin's member/subscriber/user list as a portable file at cancellation time, or (b) webhook new plugin sign-ups into the CRM as Contacts automatically as they occur, so a client's member list survives independently of the plugin/hosting relationship and can just be exported from CRM if the account is later canceled.
5. Historical workaround for this same client's data quirks: Vendasta staff (named "Priya," per Tiffany) manually corrected membership start/expiration dates and payment status directly in the backend when the site was first migrated in — described as "crazy manual things," and flagged as this being an unusually complex site due to its heavy plugin customization.

**Note:** this call also included an unrelated walkthrough of the Account Templates feature (cloning AI employees/automations/campaigns from a source account onto new accounts) and a bulk-cancel-products feature request — both are logged here only as a flag, not extracted in full, since they fall outside websites/support-migration scope; they likely belong under a growth-engine or account-scaling topic file.

---

## Date unknown (context: approximately one week before July 4th, per closing remarks) — Kent Falk (Vendasta Account Manager) with Matthew Conner & Ben Dean (partner team) — website-migration status check and post-migration bug report

**Source:** [CALL] Mid-call status check on an in-progress WordPress hosting/admin migration, surfacing one confirmed bug pattern, embedded within a broader account-management call (the white-label/referral-setup portion of this same call is logged separately in vendasta-services.md).

1. **Migration in progress, rolled out in batches:** Vendasta is migrating partner websites into a new WordPress admin environment in batches — the AM estimated roughly 400-500 sites per day — with an official change-log entry stating the migration should cause no disruption.
2. Partner's own experience: a **minor hiccup during their own domain transfer** mid-migration ("one of the domain rotations didn't take") — resolved with what the partner described as a single-button fix, not treated as a big deal.
3. **Confirmed bug reported live on the call:** loading a specific client site produced a **critical error**; the AM tested a different client site (Ridge Exteriors) and that one loaded fine, suggesting the issue was isolated rather than platform-wide — but then the partner also found the **same critical error on that same site's staging environment**, which is notable because per the change log, staging environments are supposed to migrate with no interruption just like production. The AM's guidance: submit a support ticket specifically flagging that staging also broke, since that contradicts the documented expected behavior.
4. **Existing pattern for partners built around staging:** this partner runs a staging copy of client sites specifically so they can make changes without touching the live site directly — called out as their general best practice, and relevant context for why the staging-environment bug mattered to them operationally.
5. Partner Admin page UI gap flagged as feedback (not yet fixed, logged as a feature request): the Partner Admin page shows a client's WordPress site info (e.g., "8 plugin updates needed") but clicking on it does not link through to that client's actual WordPress instance to act on it — the partner has to separately find and search for the site elsewhere to actually apply updates. Requested improvement: make that info clickable/actionable in place (even floated a "one-click update all" idea).

---
