---
title: "Advertising Intelligence Dashboard"
sidebar_label: "Advertising Intelligence Dashboard"
description: "Overview of setting up and using the Advertising Intelligence Dashboard: connecting accounts, configuring metrics, tracking conversions, and viewing campaign performance."
---

This guide covers setting up and using the Advertising Intelligence Dashboard: connecting ad accounts, configuring metrics and conversions, and viewing campaign performance.

### 1\. Connecting Accounts

*   To get started, ensure relevant accounts are connected under the settings section.
*   Once an account is connected, you can edit and adjust management fees to be applied to the ad spend.

:::note

Our Ads team does not update ad management fees. These must be updated by a partner administrator.

:::

#### Google Analytics

Standard GA4 properties are supported. Google Analytics 360 sub-properties are not supported and cannot be connected.

Once connected, GA data is pulled once per day from the Sessions column (not Users). Data in Advertising Intelligence may lag behind the live GA dashboard by up to 24 hours — small discrepancies between GA and Advertising Intelligence are expected.

#### CallRail

CallRail connection requires Advertising Intelligence Pro. To connect:

1. Go to `Settings` → `Connections` → `CallRail`.
2. Enter your CallRail API key.
3. Select a campaign.
4. Choose `Connect Account`.

Selecting a campaign is required — the connection will hang if this step is skipped. If no campaign list appears, confirm the account is on Advertising Intelligence Pro.

### 2\. Metrics Control

*   You can customize the metrics you want to display in the dashboard.
*   Each metric provides a brief description when you hover over it.
*   You can edit, add, or remove metrics based on your preference. The top six chosen metrics will appear on the overview page.
*   Default metrics across all accounts can also be adjusted in Partner Center under Marketplace > [Products](https://partners.vendasta.com/marketplace/manage-products) > Advertising Intelligence > Product Settings.

### 3\. Conversion Metrics

Conversions are not tracked automatically — setup is required in both the ad platform and Advertising Intelligence settings.

:::info

Advanced Reporting must be enabled before conversion metrics are available. Go to `Settings` → `Metrics` to confirm. Conversion tracking requires the Pro/Advanced Reporting tier.

:::

*   You can designate certain actions as conversions. For example, anything marked as a lead can be counted as a conversion.
*   Different platforms offer specific metrics. E.g., Facebook pixels can track conversion metrics, while Google Ads can track calls as a separate metric.

#### Setting up conversions for Google Ads

1. Define your conversion events in Google Ads Manager.
2. In Advertising Intelligence, go to `Settings` → `Metrics`.
3. Under `Conversion Source`, select `Google Ads`.
4. Under `Conversion Category`, select the conversion events you want to track.

**Why Advertising Intelligence may show fewer conversions than Google Ads**

Google Ads reports two figures: *Conversions* and *All Conversions*. Advertising Intelligence only pulls the *Conversions* value — a difference between the two is expected.

#### Setting up conversions for Facebook Ads, LocalAds, and TikTok

In Advertising Intelligence, go to `Settings` → `Metrics` and select the conversion metrics you want to track for each platform.

#### Meta Ads conversion reporting

Advertising Intelligence only ingests Lead-classified conversions from Meta. A campaign result is counted as a conversion when the campaign uses the `Lead Generation` objective (with an instant form), or when the Lead standard event is tracked via `Meta Pixel` or `Conversions API`.

Campaigns using other objectives — such as Calls Placed, Link Clicks, or Engagement — will show zero conversions in Advertising Intelligence, even if Meta Ads Manager records results for those campaigns.

:::note

For campaigns not optimized for Lead Generation, export data directly from Meta Ads Manager to supplement Advertising Intelligence reports.

:::

#### Troubleshooting: Conversions still showing zero

If conversions still show zero after completing setup:

1. Confirm Advanced Reporting is enabled under `Settings` → `Metrics`.
2. Confirm a Conversion Source and Category are selected.
3. Clear your browser cache and refresh the dashboard.

### 4\. ROI Calculation

*   This feature helps estimate the return on investment.
*   The calculation takes into account the average sale value and the close rate. This helps businesses gauge the effectiveness of their campaigns.

### 5\. Viewing the Dashboard

*   If multiple ad platforms are connected, you can view data for each platform separately.
*   You can adjust the timeline view and delve into specific metrics for detailed insights.
*   The displayed metrics, like client spend and cost per click, are adjusted based on the previously set management fee.
*   All campaigns are listed. For campaigns running on multiple networks, you can hover to see the networks. Clicking on a campaign provides more detailed information, including its current status (e.g. if it's live or paused).

## Frequently asked questions

<details>
<summary>Can I pull ad spend receipts from Advertising Intelligence?</summary>

No. Advertising Intelligence displays ad spend data pulled from connected platforms but does not store or provide billing receipts.

To get receipts, log in to the billing section of the relevant ad platform (for example, Google Ads) or contact the ad platform's support team directly.

To adjust how spend is displayed in the dashboard, go to `Settings` → `Connections`, select the three-dot menu next to the connection, and choose `Edit Management Fee`. This adds a fee percentage on top of the base spend figure.

</details>
