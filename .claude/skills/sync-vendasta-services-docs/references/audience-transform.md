# Audience transform reference

How to re-skin a change when moving it between the two repos. The **substance**
(facts, steps, policies, timelines, numbers) stays identical; only audience,
voice, branding, and repo mechanics change.

## Direction 1 — Partner → SMB (servicesdocs.io, grey-labeled)

Source: `partnercenter-docs` · Destination: `vendasta-services-docs/docs-site/docs/`

Apply the destination repo's `CLAUDE.md` rules exactly. Key transforms:

- **Strip all brand names.** Remove "Vendasta", "Partner Center", "Business App",
  product names, vendor names. Replace with generic terms:
  - "in Partner Center" → "in the platform" / "in your dashboard"
  - "the Vendasta Services team" → "our team"
  - product names → the generic capability ("the AI Receptionist", "the listings
    service") only if not a brand; otherwise describe the function.
- **Re-aim the voice.** SMB articles speak to the business owner about *their own*
  business. Partner phrasing like "your clients", "your customers' accounts",
  "resell" becomes "your business", "your account".
- **Drop partner-only operational content** (white-labeling instructions,
  reselling, billing-to-clients, partner training) — usually means the article is
  partner-only; flag and ask rather than producing a thin SMB version.
- **Voice/structure:** present tense, second person, no marketing/promo language,
  no historical phrasing ("formerly", "used to", "legacy"). Follow the required
  section order in services-docs `CLAUDE.md` when creating a new article.
- **Admonitions:** `:::info` for tips/context, `:::warning` for
  limits/requirements.
- **MDX snippets:** services-docs reuses shared snippets via imports, e.g.
  `import OptimizationPlanSection from './_optimization-plan-section.mdx';`. If
  the equivalent content is already covered by such a snippet, reference the
  snippet instead of duplicating prose.

## Direction 2 — SMB → Partner (docs.vendasta.com, branded)

Source: `vendasta-services-docs` · Destination:
`partnercenter-docs/docusaurus/docs/vendasta-services/`

Apply the destination repo's `CLAUDE.md` rules exactly. Key transforms:

- **Restore branding** where natural: generic "the platform" → "Partner Center"
  or "Business App" as appropriate; "our team" → "the Vendasta Services team"
  when the partner audience expects the named team.
- **Re-aim the voice.** Partners act *on behalf of their clients*. Where the SMB
  text says "your business", consider whether the partner reads it as "your
  client's business" and adjust.
- **Markdown quirks (Partner repo):**
  - **Never use the `>` character** — it creates blockquotes. Use "greater than"
    in prose or `→` for UI navigation paths.
  - **Never use em dashes (`—`)** — replace with a colon, comma, period, or
    parentheses.
  - Sentence-case headings. Proper nouns (Vendasta, Partner Center, Business App,
    Task Marketplace, product names) stay capitalized.
  - Images use `<img src={require('./img/name.png').default} ... />` with the
    standard border/radius/shadow style, stored in an adjacent `img/` folder.
  - **Never reference specific plan tier names** (Growth, Scale, Starter, Pro).
    Use "certain plans" / "select plans" and link to
    `https://www.vendasta.com/pricing`.
- **Strip MDX snippet imports** that only exist in services-docs
  (`_optimization-plan-section.mdx`, `_optimization-plan-faq.mdx`, etc.). Inline
  the equivalent content directly, adapted for partners, since those snippet
  files do not exist in the Partner repo.

## Cross-reference links

Internal links must point at the **destination repo's** slugs, which often differ:

- Both use relative paths between articles (e.g. `../websites/...`), but the
  **filename differs** — see the alias table in `SKILL.md`. Example:
  `../websites/website-support.md` (SMB) ↔
  `../websites/vendasta-services-website-support.md` (Partner).
- After rewriting a link, verify the target file actually exists in the
  destination repo. If the target is a partner-only or SMB-only article with no
  counterpart, drop the link or replace it with plain text rather than linking to
  a missing file.
- Keep external `https://` links as-is unless they are brand-gated (e.g. a
  partner-only PDF) — in that case adapt or remove for the SMB audience.

## Frontmatter

Carry over `title`, `sidebar_label`, `description`, and tags/keywords, then adapt
wording for the audience (strip brand names for SMB; the description often mirrors
the first sentence). Keep `sidebar_position` aligned with the destination folder's
existing ordering; do not blindly copy the source's position.

## What NOT to change

- Don't alter facts, numbers, timelines, eligibility rules, or step order.
- Don't add content the source change didn't introduce.
- Don't "improve" the counterpart beyond the change being synced unless the
  teammate asks — keep the diff focused and reviewable.
