# Transcript notes — manifest

Tracks which `docusaurus/training/` topic slugs have distilled call notes filed
under this folder, fed by the `transcript-knowledge-capture` skill. Only slugs
with at least one filed entry appear below — see
`.claude/skills/transcript-knowledge-capture/SKILL.md` for the full 17-slug
taxonomy, including slugs with nothing filed yet (`ai-foundations`,
`business-app`).

Last processed: 48 of the 49 transcripts in `learn-revamp/transcripts/` as of
this pass (`incomplete-fragment-call-join-catalina-alistair.txt` was skipped —
a genuine fragment with no usable content). Almost none of the source
transcripts stated an explicit calendar date, so "most recent entry" below is
marked accordingly rather than guessed.

| Topic slug | # source calls | Most recent entry | What's covered |
|---|---|---|---|
| `ai-workforce` | 17 | Date unknown | AI Receptionist/Voice/Chat setup end to end: role/capability/knowledge config, A2P/10DLC compliance, call-timing and routing, booking integrations, white-label reseller pricing and tiers, multi-location and franchise rollouts, custom AI-employee builds, internal reporting/analytics use, and a recurring platform sales-demo technique. |
| `crm` | 12 | Date unknown | Companies/Contacts/Opportunities/Activities/Lists/My Meetings mechanics, Find Accounts prospecting, custom fields vs. custom objects, Smart Lists and permission-scoping (including a reproducible visibility bug), Campaigns Pro pricing, Vendasta Payments/Stripe billing and dunning behavior, multi-pipeline opportunity patterns, lead dedup, and third-party CRM/call-center integration architecture (Kixie, ServiceMinder). |
| `builder` | 9 | Date unknown | Automation-builder fundamentals (capabilities, tools, roles, knowledge), a full franchise-scale "LFA" nurture-automation teardown, webchat-to-CRM-to-SMS build walkthroughs, Kixie/ServiceMinder/Databricks/QuickBooks integration scoping, AI credit/token cost drivers, and multi-location automation-template rollout mechanics. |
| `conversations-ai` | 6 | Date unknown | Chat/voice widget install and configuration, billing and website-training bugs, live multi-channel demos (SMS/webchat/Facebook/Instagram/WhatsApp), franchise LFA lead-flow timing and bugs, HubSpot two-way sync, and account-template scaling across locations. |
| `vibe` | 7 | Date unknown | Vibe-coded client apps and dashboards, Supabase/export/backend patterns, ad-planner coding tangents, professional-services pricing, and platform positioning within the broader ecosystem demos. |
| `reputation-management` | 6 | Date unknown | Reputation AI review-response (SEO-aware, tone-configurable) and NPS-gated review-request flows, multi-source review aggregation, Birdeye-based cooldown/template rollout mechanics at scale, live-launch monitoring and SMS-credit gotchas, and email deliverability/A2P fixes. |
| `getting-started` | 5 | Date unknown | Partner Center vs. Business App navigation and support routing, platform origin story/flywheel framing, Account Group and multi-location hierarchy modeling, and account-manager onboarding vocabulary/practices. |
| `snapshot-executive-reports` | 5 | Date unknown | Snapshot Report mechanics and paywalling, Executive Report as its time-series extension, BigQuery/data-lake export architecture and compliance blockers, and a data-warehouse-vs-in-product-dashboard decision. |
| `advertising` | 4 | Date unknown | MatchCraft (Vendasta Advertising) history, taxonomy scale, pricing/management-fee models, Ad Planner demo, and MC-takeover thresholds. |
| `social-marketing` | 3 | Date unknown | Full Social AI product tour (posting, calendar, RSS curation, AI captions/images), partner uncertainty over managed-services-vs-AI-agent transparency, and product-organization debate (should Social/Blogger live in AI Workforce or in the product app). |
| `vendasta-services` | 3 | Date unknown | White-label/reseller subscription mechanics ("$0 subscription" model), an in-development Inventory Management/SKU feature aimed at unblocking a stalled partner contract, and referral/sub-brand white-label portal setup. |
| `growth-engine` | 2 | Date unknown | "Agency in a box" ecosystem framing and subscription/billing-credit mechanics; the canonical Attract/Convert/Engage "AI-optimized flywheel" framing. |
| `local-seo-listings` | 2 | Date unknown | AI Search/SEO Pro app positioning and gaps, and BigQuery-based listings-data export use cases. |
| `marketplace` | 2 | Date unknown | Discover Products catalog and package-builder mechanics, wholesale/retail/stairstep pricing, and provisioning/fulfillment paths. |
| `websites` | 2 | Date unknown | Website-migration support/ticket-routing history, and a WordPress migration batch status plus a staging-environment bug. |

## Notes for whoever picks this up next

- Every entry above carries `[CALL]` provenance (source transcript filename, participants where identifiable, and call type) inside its topic file — see each `.md` file's individual entries for exact attribution.
- A handful of thin/passing mentions were deliberately **not** filed anywhere (per the skill's substance bar) — examples: a one-line 10DLC mention, an unresolved "grouping accounts" open item, a single "spammy backlinks" aside. These were noted as skipped during extraction rather than silently dropped.
- `ai-foundations` and `business-app` have zero entries — nothing in this transcript batch clearly covered either topic. Worth flagging if a call specifically targeting either topic comes in later.
- This manifest reflects one full pass over the 49-file batch dropped in `learn-revamp/transcripts/` as of this session. Re-run `transcript-knowledge-capture` on any newly added transcripts and update this table's counts/rollups afterward — do not treat this as a one-time snapshot.
