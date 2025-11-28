---
title: Payment Methods, Fees, and Regional Support
sidebar_label: Methods and Fees
sidebar_position: 2
description: Understand transaction fees, supported payment methods, currencies, and regional availability for payment processing
tags: [payments, fees, currencies, payment-methods]
keywords: [transaction-fees, payment-methods, supported-currencies, regional-availability]
---

## What are payment fees and options?

Payment fees and options define the costs, supported payment methods, accepted currencies, and regional availability for payment processing. Understanding these details helps you make informed decisions about payment configuration and customer billing.

## Why are payment fees and options important?

Clear understanding of fees and options helps you:
- Set appropriate pricing for your services
- Choose the right payment methods for your customers
- Understand the total cost of payment processing
- Ensure compliance with regional payment regulations

## What's included with payment options?

### Transaction fees
- **Standard processing**: See below
- **Personal Stripe account**: 0.75% platform fee (plus your existing Stripe rates)
- **Automatic deduction**: Fees are automatically deducted after payment collection
- **Refund handling**: Full refunds deduct transaction fees from your connected bank account

### Supported payment methods
- **Credit cards**: Visa, Mastercard, American Express, Discover
- **Debit cards**: All major debit card networks
- **Bank transfers**: ACH transfers (where available)
- **Pre-Authorized Debits**: PADs for recurring payments

### Accepted currencies
- Canadian Dollars (CAD)
- US Dollars (USD)
- Australian Dollars (AUD)
- Great British Pounds (GBP)
- New Zealand Dollars (NZD)
- Czech Koruna (CZK)

### Regional availability

#### Fully supported regions
- **United States**: Full payment processing and support
- **Canada**: Complete payment processing capabilities
- **Australia**: Full service availability
- **New Zealand**: Complete payment processing support
- **United Kingdom**: Full payment processing features
- **Czech Republic**: Complete service availability

#### Additional supported countries
Contact sales for setup assistance in:
- **Germany** (EUR currency)
- **Belgium** (EUR currency)
- **Netherlands** (EUR currency)
- **Poland** (PLN currency)
- **Switzerland** (CHF currency)

## How payment fees work

### Standard transaction fees

Vendasta Payments charges a transaction fee per successful credit card transaction. This fee will be applied on all transactions as follows:

- Transactions in USD, CAD, AUD, NZD all pay 2.9% + $0.30 in the local currency
- Transactions in GBP pay 2.9% + £0.20
- Transactions in CZK pay 2.9% + 8.00 Kč

Allowing international credit cards for payments may result in additional fees for cross-border rates and currency conversion rates. Please visit [Stripe Docs](https://stripe.com/docs/international-pricing) for more information.

Transactions processed through Vendasta Payments are reflected on Partner statements as non-taxable items. Partners can view their fees on their **Wholesale invoice** in Snapshot each month.


### Personal Stripe account fees
When you connect your existing Stripe account:
- **Your Stripe fees**: Remain at your negotiated rates
- **Platform fee**: Additional 0.75% of transaction amount
- **No changes**: Your existing Stripe terms and rates stay the same
- **Example**: If you normally pay 2.5% + $0.30 to Stripe, you'll pay 2.5% + $0.30 + 0.75% = 3.25% + $0.30 total

### Refund fee handling
When processing full refunds:
- **Customer receives**: Complete refund amount
- **Fee responsibility**: Transaction fees are deducted from your connected bank account
- **Partial refunds**: Fees are calculated proportionally
- **Processing time**: Refunds typically process within 3-5 business days

## Currency and regional considerations

### Multi-currency support
- **Billing currency**: Must match your business location and banking setup
- **Customer currency**: Customers see prices in your configured currency
- **Conversion**: No automatic currency conversion between different currencies
- **Regional compliance**: Currency selection must comply with local regulations

### Geographic requirements
Your business address, banking details, and account representation must be based in supported regions. Cross-border setups may require additional verification or may not be supported.

### Banking integration
- **Payout currency**: Must match your business banking currency
- **Account verification**: Bank accounts must be verifiable in your business region
- **Processing times**: Payouts typically arrive within 2-3 business days
- **Minimum thresholds**: Some regions have minimum payout amounts

## Third-party integration options

### Current integration support
- **Stripe integration**: Full support for connecting existing Stripe accounts
- **Other providers**: Currently no other payment processor integrations available
- **Platform processing**: Primary method for payment collection and billing

### Integration limitations
- **Single provider**: Only one payment processor can be active at a time
- **Migration restrictions**: Limited ability to switch between different processors
- **Data transfer**: Customer payment details cannot be automatically transferred between systems

## Common questions about fees and payment methods

<details>
<summary>How much do I pay in transaction fees?</summary>

Standard processing costs 2.9% + $0.30 per transaction. If you connect your own Stripe account, you pay your existing Stripe fees plus a 0.75% platform fee.
</details>

<details>
<summary>What credit cards do you accept?</summary>

The platform accepts Visa, Mastercard, American Express, and Discover credit and debit cards through the payment processing system.
</details>

<details>
<summary>Can I accept payments in multiple currencies?</summary>

You can accept payments in CAD, USD, AUD, GBP, NZD, and CZK. Your billing currency is set during account setup and typically matches your business location.
</details>

<details>
<summary>What happens to transaction fees when I issue refunds?</summary>

For full refunds, the transaction fees (2.9% + $0.30) are deducted from your connected bank account to ensure customers receive the complete refund amount.
</details>

<details>
<summary>Can I use payment processing if I'm located outside North America?</summary>

Yes, payment processing is available in Australia, UK, New Zealand, Czech Republic, and several other countries. Some regions may require sales assistance for setup.
</details>

<details>
<summary>What's the difference between platform processing and connecting my Stripe account?</summary>

Platform processing uses standard rates (2.9% + $0.30) while connecting your Stripe account uses your existing rates plus a 0.75% platform fee. Choose based on which option offers better total costs.
</details>

<details>
<summary>Can I integrate third-party billing systems other than Stripe?</summary>

Currently, there is no integration support for third-party billing systems other than Stripe. The platform's payment processing is the primary method for invoicing and billing clients.
</details>

<details>
<summary>Are there any additional charges beyond transaction fees?</summary>

No, there are no setup fees, monthly fees, or hidden charges. You only pay the transaction fees: either 2.9% + $0.30 for standard processing or your Stripe rates + 0.75% platform fee for connected Stripe accounts.
</details>