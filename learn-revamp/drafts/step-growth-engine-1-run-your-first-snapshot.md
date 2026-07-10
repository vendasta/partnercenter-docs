# REVIEW COPY — run-your-first-snapshot.mdx (Your growth engine, step 1 of 6)

Target: `docusaurus/training/growth-engine/run-your-first-snapshot.mdx` (fills the stub)
Role: first written step of the path AND the lab-pattern worked sample for Cal's formatting-and-wording review (per his comment on the lab-pattern proposal PR).
Source tags: [DOC] verified in repo docs (path noted) · [CALL] partner-call evidence · [SYN] synthesis, owned · [INT] internal signal

## Reviewer notes and open flags

1. **Required line** includes "A Snapshot Report create available on your plan" — the honest, flat handling of the metered create (creates/refreshes are paid or plan-included per snapshot-report/index.mdx FAQ). Confirm wording; the fee amount stays in docs.
2. **Three Lab callouts** exercise the go-do-return pattern at three sizes: a 5-step create, a 2-step run, a 2-step notification toggle. This is deliberately the formatting sample: if the smallest one feels heavy, the pattern needs a floor.
3. The v2 draft and call insight 4.7 said "Find Accounts" from Manage Accounts; docs show the feature is now **Find Leads** under CRM → Companies and creates company records, not accounts [DOC crm/companies/index.mdx]. The lab therefore uses Create Account with business search, and Find Leads appears as a one-sentence doc link. Call-evidence corrected against documentation per skill rule 18.
4. Northside Dental grades (B reviews, D listings) are illustrative for the worked example [SYN, owned]: chosen so the gap is a story ("patients love the clinic, directories cannot find it") without naming a real business.
5. The 10-minute estimate covers the platform actions; report generation wait time is explicitly not part of the step (the Try it now fills the gap with the sample report).

## Claim register

| Claim in copy | Source |
|---|---|
| Snapshot before the relationship, Executive Report after | [DOC snapshot-report/index.mdx "used before you've formed a business relationship"] |
| Creating an account creates the linked CRM company | [DOC accounts/manage-accounts/create-accounts.mdx; carried from approved accounts-and-users step] |
| Business search auto-fills address, phone, category from public directories | [DOC accounts/manage-accounts/create-accounts.mdx "Using business search"] |
| Primary category drives industry benchmarks | [DOC snapshot-report/index.mdx "How the business category is set"] |
| Salesperson assigned via Business Details → Edit → Administration → Sales | [DOC accounts/manage-accounts/index.mdx line 100] |
| Report needed a salesperson to be sent | [DOC snapshot-report/index.mdx "A salesperson must be assigned to the account for the Email Report button to function"] |
| Snapshot create icon beside the account in Manage Accounts | [DOC snapshot-report/index.mdx "Via 'Snapshot Create Icon'"] |
| Gathers 24 hours, enriches 7 days, fullest at the 7-day mark | [DOC snapshot-report/index.mdx "Report timing"] |
| Snapshot Ready notification in Administration → Client Notifications, alert typically within 24 hours | [DOC snapshot-report/index.mdx FAQ "How do I get notified..."] |
| Eight sections, A–F letter grades, overall Digital Score | [DOC snapshot-report/index.mdx "What's included"] |
| Section descriptions (listings accuracy, reviews volume/ratings/frequency/sources, social presence/followers/posting, website Core Web Vitals, SEO organic visibility, advertising vs industry keywords, ecommerce sell/schedule/pay, AI optimization visibility in AI search) | [DOC snapshot-report/index.mdx sections 1–8] |
| Find Leads: CRM → Companies, local business search, bulk company records | [DOC crm/companies/index.mdx "Find leads"] |
| Sample report available in the Snapshot guide | [DOC snapshot-report/index.mdx "Sample Snapshot Report"] |

## Voice and structure compliance (self-critique rounds)

- Rounds run against: skeptical-partner read, skill rules 1–17 (voice), 18–22 (facts), structure items 1–10, rules 35–38 (lab pattern), KC rules 28–31.
- No contractions, no em dashes, sentence-case headings, no step narration or path tours, no fear framing (the metered create is a Required line, not a warning; "Other" category guidance is expressed as "closest real match").
- Rule 36: opener names what the learner will have and where they work. Rule 37: every Lab callout opens with the destination and closes on a confirm signal; "What you now have" mirrors the four header outcomes. Rule 38: zero screenshots — every destination is reachable by the named path and the numbered steps; flagged for Cal as a deliberate test of "minimal screenshots" (add one of the Create Account search screen if he wants an orientation image).
- KnowledgeCheck: 4-question pool, 3 shown; correctIndex spread 1, 3, 2, 0; distractors verified against docs (refreshing does not fix category-driven grades; rerunning from CRM is a real creation path but not the fix; competitors are real report features but unrelated).

## Changelog

- **v4** — Interactivity: new `LabChecklist` component (src/components/LabChecklist.tsx) drives all three Lab callouts. The numbered actions become tickable checkboxes (progress saved in localStorage per lab), and the confirm signal sits in a quiet bordered row that turns green with a check mark once every action is ticked, so "come back once done" is something the page acknowledges. Note for Cal: the lab-pattern proposal chose convention over component for the STRUCTURE; this component does not change the structure (same callout, same go-do-return anatomy), it adds interaction inside it. New component, needs explicit sign-off; trivially removable (swap back to numbered lists) if it does not earn its place. Deferred by design: wiring lab completion into LessonFooter congratulations (separate prototype PR, agreed with Shiva).

- **v3** — Two images added per Shiva's review, both reused from docs/snapshot-report/img: the create icon inline in Lab 2 (an unlabeled icon the learner must find in a row of icons, the "screenshot where confusion is likely" case), and the sample scorecard at the top of "What the grades measure" (480px, standard style) so the eight bullets describe something visible. Flip pair for the two reports deliberately deferred to step 6 (Shiva's call); the 7-day timeline SVG rejected (prose already carries the rhythm; a diagram would repeat it). Rule 38 note in v1 review updated accordingly.

- **v2** — Lab 1 corrected against docs: Find Accounts is now Find Leads under CRM → Companies and creates company records, so the lab uses Create Account with business search; salesperson assignment moved to its verified path (Business Details → Edit → Administration → Sales) as step 5; Find Leads kept as a one-sentence doc link. Outline beat updated to match.
- **v1** — First draft from DRAFT-growth-engine.md v2 spine + snapshot-report docs, in the lab pattern (three Lab callouts, What you now have close, KC pool of 4).
