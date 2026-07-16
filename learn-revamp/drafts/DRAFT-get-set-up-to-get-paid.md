# REVIEW COPY — get-set-up-to-get-paid.mdx

Target: `docusaurus/training/getting-started/get-set-up-to-get-paid.mdx` (fills existing stub, sidebar_position 7)
Source tags: [DOC] verified in repo docs (path noted) · [CALL] partner-call evidence · [SYN] synthesis · [INT] internal signal

## Reviewer notes and open flags

1. **Subscription pay-down claim held back.** Partner calls (transcripts 15, 17) described selling owned-and-operated products "paying down" your base subscription, with MatchCraft excluded and the offset starting month two. I could not verify this in `docusaurus/docs/` (the billing docs describe wholesale/retail subscriptions and Estimated Usage, plus vCash and credit notes, but no base-subscription offset). Per skill rule 14 I left it out of the learner copy. **Decision needed:** confirm it is a real, current contract feature (then I add it, sourced), or we omit. The stub's own promise does not mention it, so omitting is consistent.
2. **Vocabulary:** used "Vendasta Payments," "wholesale," "retail," "Estimated Usage," "Marketplace" as branded. [DOC]
3. First-payout $1 tip is [CALL] plus [DOC] ($1.00 is the documented minimum charge, `commerce/payments/payment-declines.mdx`). Kept as a light "Try it now," phrased affirmatively.

## Changelog

- **v2 (SHIPPED to repo)** — Written into `get-set-up-to-get-paid.mdx` (step 6 of 7) with the current standards: LessonHeader (Beginner, 8 min, Required · Partner Center admin access), wholesale/retail as an inline two-card flip set, no You-are-here markers (whole step is Partner Center, named explicitly in prose), KC intro + spread answer positions, LessonFooter to growth-engine. Pay-down claim still omitted (flag 1 unresolved — recommend billing FAQ if confirmed). First-payout $1 tip dropped for length; can return as a Try it now if wanted.
- **v1** — First draft from partner-call research, re-cast to the learning-path step format and voice. Pay-down model omitted pending verification (flag 1).
- **v1.1** — Price-change claim verified against commerce/subscriptions/subscription-management.mdx: a catalog change does not touch existing subscriptions, but a partner can edit a subscription directly (effective next billing cycle). Body and Q2 updated from [CALL/SYN] to [DOC]. Pay-down claim re-searched in docs: still not found, flag 1 stands.

---

## FRONTMATTER

```yaml
---
title: Get set up to get paid
sidebar_position: 7
description: The wholesale-retail model, connecting a payment method, and setting your retail prices, so you are ready before your first sale.
---
```

## [COMPONENT IMPORTS] — KnowledgeCheck, CourseProgressBar, SectionFeedback, InlineHighlighter, MarkComplete

## [COMPONENT: InlineHighlighter wraps the whole body — courseId="get-set-up-to-get-paid" site="vendasta_learn"]

## [COMPONENT: CourseProgressBar — top of body]

---

Getting paid runs on one relationship: you buy products from Vendasta at a wholesale price, and you sell them to your clients at the retail price you set. This step connects your payment method, sets your prices, and shows you the one page where you check what you owe each month. [DOC: commerce/subscriptions/index.mdx; marketplace/index.mdx]

:::info Before you start
**Difficulty:** Beginner &nbsp;|&nbsp; **Time:** about 8 minutes
:::

:::tip What you will be able to do
- Explain the wholesale-to-retail model in one sentence
- Connect Vendasta Payments so clients can pay you inside the platform
- Set the retail price and margin on a product you resell
- Read your Estimated Usage to know what you owe Vendasta this month
:::

## Wholesale to retail, in one line

*You are here: Partner Center. Everything in this section happens in your workspace.*

Every product has two prices. Vendasta charges you the **wholesale** price when a product is active on an account. You charge your client the **retail** price you set, and the difference is your margin. [DOC: marketplace/index.mdx "shows wholesale cost and suggested retail price so you can set competitive pricing and control margins"]

Each active product creates two matching subscriptions: a wholesale subscription from you to Vendasta, and a retail subscription from your client to you. You manage both from Partner Center. [DOC: commerce/subscriptions/index.mdx "Every activated product or service creates equivalent subscriptions ... (wholesale subscriptions) and ... (retail subscriptions)"]

## Connect a way to get paid

*You are here: Partner Center.*

You can collect from clients inside the platform with **Vendasta Payments**, or bill them your own way and collect outside the platform. Connecting Vendasta Payments lets a client pay an order or invoice with a card, and pays that revenue out to your bank account on a schedule. [DOC: commerce/payments/index.mdx; commerce/payouts/index.mdx]

To collect in-platform, connect Vendasta Payments in Partner Center under **Commerce**, then add the bank account you want revenue paid out to. When a client pays, funds are processed and then transferred to that account. [DOC: commerce/payouts/index.mdx "Navigate to Partner Center → Commerce → Payouts"]

:::tip Try it now
Open **Commerce** → **Payouts** and read the status row at the top: upcoming payouts, funds in transit, and completed. This is where your money shows up once a client pays. [DOC: commerce/payouts/index.mdx]
:::

When you are ready to connect a payment method, [this guide walks you through Vendasta Payments](/commerce/payments). [DOC: link target exists]

## Set your retail prices

*You are here: Partner Center.*

Pricing is yours to control. Open a product in the **Marketplace** to see its wholesale cost and a suggested retail price, then set the retail price and billing frequency that fit your market. Adjust pricing any time in **Marketplace** → **Products**. [DOC: marketplace/index.mdx "You can set the retail price shown in your store for each product ... Adjust pricing in Marketplace → Products"]

Two facts keep your numbers clean. A catalog price change applies to new subscriptions from then on; existing clients keep the price they signed up at unless you edit their subscription directly, and an edit takes effect on the next billing cycle. [DOC: commerce/subscriptions/subscription-management.mdx:101 "Changing a product's price in your catalog does not automatically update existing active subscriptions"] And retail billing frequency is yours to set, while the wholesale frequency follows your Vendasta contract. [DOC: marketplace/products/index.mdx "adjust billing frequency ... Wholesale frequency is fixed"]

## Check what you owe each month

*You are here: Partner Center.*

One page answers "what will I pay Vendasta this month?" Open **Administration** → **My Billing** → **Estimated Usage**. It breaks down what you owe at month end based on the products currently active on your accounts. [DOC: administration/my-account/my-billing/index.mdx "See how much you'll pay at the end of the month based on currently active products"]

The **Active Subscriptions** tab beside it shows which products are in the current billing cycle and when any of them expire. Together they are your monthly billing check. [DOC: administration/my-account/my-billing/index.mdx]

:::tip Try it now
Open **Administration** → **My Billing** → **Estimated Usage** and find the current month. Even with nothing sold yet, this is the page you will return to first each month. [DOC]
:::

## [COMPONENT: SectionFeedback — section="content"]

## [KNOWLEDGE CHECK] — intro: "Three quick questions on the two prices, where you get paid, and where you check what you owe." sessionSize=3, pool=4

**Q1 (mcq).** You set a product's retail price at $200 and your wholesale cost is $120. A client activates it. What is your position?
- You earn $80 of margin on that subscription ✅
- You owe Vendasta $200 for the activation
- The client pays Vendasta directly and you are not involved
- You earn $200 and pay no wholesale cost

Explanation: Vendasta charges you the $120 wholesale price; your client pays the $200 retail price you set; the $80 difference is your margin. [DOC: marketplace/index.mdx]

**Q2 (mcq).** You raise a product's retail price from $150 to $180. What happens to a client who bought it last month at $150?
- They keep the $150 price they signed up at ✅
- They are re-billed at $180 on their next renewal
- Their subscription is canceled and must be repurchased
- They are refunded the difference automatically

Explanation: A catalog price change does not automatically update existing active subscriptions; new subscriptions pick up the new price, and you can apply it to an existing client by editing their subscription directly. [DOC: commerce/subscriptions/subscription-management.mdx:101]

**Q3 (mcq).** You want to know what you will owe Vendasta at the end of this month. Where do you look?
- Administration → My Billing → Estimated Usage ✅
- Commerce → Payouts
- The Marketplace product page
- The client's Business App billing tab

Explanation: Estimated Usage shows your month-end total based on currently active products. Payouts is where client revenue is paid out to you. [DOC: administration/my-account/my-billing/index.mdx]

**Q4 (mcq, pool spare).** A client is ready to pay you with a card inside the platform. What needs to be connected first?
- Vendasta Payments, with a payout bank account ✅
- Only the client's Business App user
- A Marketplace store embed on your website
- An Executive Report subscription

Explanation: Vendasta Payments processes the card payment and pays revenue out to your connected bank account. [DOC: commerce/payments/index.mdx; commerce/payouts/index.mdx]

## [COMPONENT: MarkComplete — after closing wrapper]

---

## FOOTER HANDOFF

Now that you are set up to get paid, let's run the whole thing end to end for one prospect: [Your growth engine](/learn/getting-started/growth-engine).
