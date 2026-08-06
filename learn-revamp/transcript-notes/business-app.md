# Engage > Business App — transcript notes

Running notes extracted from SME/partner call transcripts. Feeds the
`learning-path-writing` skill when this path is drafted or enriched.
Each entry below is one source call — do not merge or overwrite prior entries.

---

## Date unknown — Vendasta onboarding specialist, Vendasta account manager, and marketing agency partner (Business App walkthrough)

**Source:** [CALL] Partner onboarding — full Business App walkthrough and customization planning session

This call is a structured, section-by-section walkthrough of Business App aimed at a new partner. Core structure as presented:
- **Locations/account switcher**: the top-level control for which client account's Business App instance you're currently viewing; a partner's own team members will regularly switch between client accounts here.
- **Home**: an activity-feed/notification-style landing view — new activity, changes, and things needing attention, based on which products are active for that client.
- **Conversations**: the client-facing lead-capture and message hub; positioned as one of the two areas (with CRM) clients are expected to check "several times a day."
- **CRM**: contacts vs. companies is a meaningful distinction to explain to partners up front — contacts are the base unit, and whether **companies** are used as the primary object depends on the client's business model. B2B/agency-style clients will use companies as primary; residential/local-service clients typically only use contacts and may never touch the companies object. New leads from lead-capture tools automatically create contacts. The CRM section also houses opportunity/pipeline workflows and **booking links/meeting scheduler** (see `crm.md` for full detail).
- **AI Workforce**: introduced here only at a high level (deep-dive left for a future session) — the set of active AI assistants tied to whichever products the client has purchased. Explicit recommendation from the rep: partner teams should generally **set up the AI Workforce on behalf of the client** rather than expect clients to self-configure, with the partner's team building internal SOPs for that setup process; client self-service setup was framed as realistic only for unusually tech-savvy clients.
- **Executive report**: see `snapshot-executive-reports.md` for full breakdown — a weekly/monthly reporting layer that's data-source- and product-dependent, customizable in section visibility/order globally or per user.
- **Products / Store**: each product a client has active shows a "sneak peek" card with a "Launch" button that opens the full product in a new tab. The **Store** is the upsell/browse-more-products surface — it can be hidden entirely, either per individual client or via a global partner-level setting, for partners who don't want a post-sale upsell surface showing to clients.
- **Automations**: template-driven automation builder ("Create Automation") with ready-to-use templates (example given: auto-request a review after a job is marked complete, or trigger a check-in message after X days). Rep's explicit recommendation: **spend deliberate time either building standard automations partners want every client to have, or at minimum walking new clients through the available templates**, since most clients "don't know what they don't know" is possible here.
- **Administration**: houses invoices/order history, contact/configuration detail changes, and — notably — the **business profile** record that feeds listings/GBP sync (see `local-seo-listings.md` for the trailing-space sync gotcha). Recommendation: partner teams should proactively update seasonal business-profile info (holiday hours, etc.) roughly in October/November each year rather than leaving it to clients.
- **Notification settings** (found under Partner Center → Administration, separate from the per-client Business App itself): controls email/in-app/push notification cadence and triggers for each client — options range from a full daily digest to specific-trigger-only notifications to a "roll-up" cadence (weekly/monthly). All notification types are **enabled by default**; the rep's personal recommendation was that the default is "way too much information" and partners should deliberately prune this rather than leave defaults on for clients.

**Branding/customization details:**
- The "Business App" name itself is white-label/renameable, and the rename propagates across the whole platform (found under Partner Center → Manage Accounts → Manage Business App → Branding).
- Individual pages can be hidden entirely, or shown-but-locked to read-only (example given: showing the business profile page but disabling editing so only the partner's team can make changes).
- A **guides/content library** feature lets partners upload their own branded guides or reference blog content for clients to read inside Business App — but this is a static content library, **not** an in-context/inline help overlay tied to specific settings screens (a partner specifically asked for the latter and it does not exist as of this call).
- A **"Contact Us"** button is always visible to the client, tied to whichever salesperson is currently assigned to that account in Partner Center; when a client messages via that button, the assigned rep gets a Partner Center notification and can reply in-thread, or the rep can hand the conversation off to someone else on the team.

**Custom products / SSO**: Partner Center lets a partner create fully custom "products" inside Business App under their own branding (with or without an associated price) that simply redirect the client to another destination/tool — described as a way to make Business App a genuine one-stop-shop even for tools the partner doesn't want to (or can't) rebuild natively. SSO (single sign-on) into third-party tools was confirmed as supported in general (the partner specifically wanted SSO into a project-management tool, which they called "non-negotiable" for their operations); exact SSO setup mechanics were deferred to a future call.

---

## Date unknown — a marketing manager at a multifamily property management company evaluating a reputation/listings platform (whitelabel reseller product deep-dive)

**Source:** [CALL] Whitelabel partner-led product demo — multi-location Business App for property portfolios, with the reseller's account team and a Vendasta partnership manager

The **multi-location business app** is the umbrella dashboard bringing together reputation, listings, and social for an entire brand/portfolio in one login, with drill-down to individual property level. This was the primary sales surface for a client managing 26 multifamily properties, replacing what had been a fragmented workflow across multiple vendor logins and manual per-site checks.

---

## Date unknown — a multi-agency owner focused on SEO and AI automations (agency discovery/reseller partnership call)

**Source:** [CALL] Agency discovery call — client-facing Business App/white-labeled portal demo with a senior Vendasta account executive

Live demo distinguished the **admin/Partner Center portal** (what the agency/partner sees — client setup, marketplace product activation, task management, automations) from the **Business App** (what the end client, or the agency's own team acting on the client's behalf, sees). The Business App is fully white-labeled — the demo explicitly noted "you'd never see Vendasta" in it, only the reselling agency's own brand. What appears inside the Business App depends entirely on which products/services the partner has activated for that specific client (e.g., reporting dashboards, Social AI for content, Reputation AI for review response) — it's described as a flexible container the partner configures per client rather than a fixed feature set.

---

## Date unknown — a Vendasta account manager with the product leads of a large European telecom/media reseller partner

**Source:** [CALL] Brief scheduling/booking-tool clarification within a broader AI-credit-system roadmap call

The reseller flagged that Vendasta's booking/scheduling tool, as tested by the Vendasta team, appeared to only pull availability from **one person's calendar per business**, even for businesses with multiple staff. The reseller clarified this was a misunderstanding on Vendasta's side about which tier the client was on: **the client in question is on the multi-operator tier (three operators/calendars), not the single-operator/basic tier** — Vendasta's team had been testing against the wrong tier assumption. Vendasta committed to re-verifying internally with the booking-tool team rather than treating it as a confirmed product gap. Worth flagging for docs: the scheduling/booking tool has at least two tiers distinguished by number of operator calendars it can pull from, and testing/support conversations should confirm which tier an account is on before diagnosing a "wrong calendar" issue as a bug.

---
