---
title: "How do I get my WordPress site ready for PHP 8.3 before the WP Cloud migration?"
sidebar_label: "PHP 8.3 and WP Cloud migration"
sidebar_position: 9
description: "Check whether a WordPress Hosting site is affected by the PHP 8.3 requirement on WP Cloud, choose what happens to it, and fix a site that breaks after migration."
tags: [vendasta-services, websites, wordpress-hosting, wp-cloud, php]
keywords: [WP Cloud, PHP 8.3, WordPress Hosting migration, migration tracker, critical error, PHP logs, staging]
brand: vendasta-services
product: vendasta-services-core
audience: partners
content_type: how-to
answer_snippet: "WP Cloud runs every WordPress Hosting site on PHP 8.3. Sites still hosted on GCP and running PHP 8.2 or lower are upgraded to PHP 8.3 when they migrate after 31 October 2026. Check each site in the migration tracker, then choose to fix it after migration, have Vendasta Services rebuild it, or retire it."
review_frequency: 1-month
last_reviewed: 2026-10-30
---

WordPress Hosting runs on WP Cloud, the managed WordPress platform built by Automattic. WP Cloud runs every site on PHP 8.3. Sites still hosted on Google Cloud Platform (GCP) migrate to WP Cloud after 31 October 2026, and any of those sites on PHP 8.2 or lower is upgraded to PHP 8.3 as part of its migration.

Most sites move without problems. A site can break, though, if one of its plugins or its theme doesn't support PHP 8.3. This article explains how to check whether your site is affected, what your options are, and how to fix a site that stops working after the move.

## Is my site affected?

Your site is at risk only if it's still hosted on GCP **and** runs PHP 8.2 or lower. Sites already on WP Cloud, or already on PHP 8.3, need no action.

To check each of your sites:

1. Open the [migration tracker](https://site-migration-track.vendasta.ai/).
2. Enter your Partner ID.
3. Review each site's PHP version and migration status.

Sites running PHP 7.4 carry the most risk, because the jump to 8.3 is larger and older plugins are more likely to fail.

## What are my options for an affected site?

For each affected site, choose one of three options and submit your decision in the [migration tracker](https://site-migration-track.vendasta.ai/).

| Option | What happens | Best for |
| --- | --- | --- |
| Fix the site after migration | The site migrates and is upgraded to PHP 8.3. You fix anything that breaks using the WordPress Hosting dashboard (see [How do I fix a site that breaks after migration?](#how-do-i-fix-a-site-that-breaks-after-migration)). | Sites you or your team can maintain |
| Have Vendasta Services rebuild it | A paid rebuild on PHP 8.3. [Express Website Build](https://partners.vendasta.com/marketplace/products/MP-6NCSZHXZZ5CMBHHSR8FFDXCT7KVGNB8W) is an AI-assisted rebuild of up to five pages. [Templated Website](https://partners.vendasta.com/marketplace/products/MP-XQC6XC2VMV3B4ZJZLD6Z6ZDXKN2VTC86) suits larger sites or sites with ecommerce, bookings, or custom forms. | Sites with outdated themes or many abandoned plugins |
| Retire the site | The site is decommissioned and its WordPress Hosting subscription is deactivated. | Sites the business no longer uses |

An [Express Website Build](./express-website-build.md) is a modern rebuild, not an exact copy of the current design. If your site has [Website Support+](./vendasta-services-website-support.md), contact Vendasta Services, as fixes may be covered.

## How do I fix a site that breaks after migration?

A broken site usually shows a blank page or a "critical error" message. The cause is almost always one plugin or the theme. Work through these steps in the site's WordPress Hosting dashboard (see the [Enhanced Dashboard docs](https://docs.businessapp.io/wordpress-hosting/enhanced-dashboard/)).

1. **Back up first.** In [Backups](https://docs.businessapp.io/wordpress-hosting/enhanced-dashboard/backups), click `+ New Backup` before you change anything.
2. **Find the error.** Load the broken page, then go to [Advanced Tools](https://docs.businessapp.io/wordpress-hosting/enhanced-dashboard/advanced-tools) → `Logs` → `PHP logs`. Filter on `Fatal error` and expand the row. The file path names the failing plugin or theme, for example `wp-content/plugins/plugin-name/...`.
3. **Get file access.** In `Advanced Tools` → `SFTP / SSH`, click `+ Add user`. Connect with any SFTP client using the `Host` and `Port` shown in the panel.
4. **Disable or replace the failing code.** Rename the failing folder under `wp-content/plugins/` or `wp-content/themes/` to disable it, or upload a version that supports PHP 8.3.
5. **Update plugins and theme.** Once the site loads, go to [Plugins & Themes](https://docs.businessapp.io/wordpress-hosting/enhanced-dashboard/plugins-and-themes) or WordPress Admin. Update everything to versions that support PHP 8.3 and remove abandoned plugins.
6. **Roll back if needed.** If a change makes things worse, open the backup's menu in `Backups` and click `Restore`.

:::warning
If you need to edit the database, use phpMyAdmin from `Advanced Tools` → `Database`, and take a backup first.
:::

## How do I test fixes safely?

On WordPress Hosting Pro and Multisite, use [Staging](https://docs.businessapp.io/wordpress-hosting/enhanced-dashboard/staging) so visitors never see a half-fixed site.

1. Create a staging copy of the site.
2. Turn on `WP_DEBUG` in staging to see errors on screen.
3. Apply and test your fixes.
4. When everything works, click `Push to production`.

WordPress Hosting Standard has no staging environment. On Standard, take a backup before each change so you can restore quickly.

## What if I don't choose an option?

An active site migrates after 31 October 2026 whether or not you submit a decision. If it isn't PHP 8.3 compatible, it may break until someone fixes it. Submit your decision in the [migration tracker](https://site-migration-track.vendasta.ai/) before the deadline so nothing is left to chance.

Need help? [Submit a ticket](../../getting-started/partner-troubleshooting-guide.mdx#best-practice-submitting-a-support-ticket) to Vendasta Support with your Partner ID, the site's domain, and the error from the PHP logs.

## FAQ

<details>
<summary>Do I need to do anything if my site is already on PHP 8.3?</summary>

No. It migrates directly to WP Cloud with no changes.

</details>

<details>
<summary>Why is PHP 8.3 required?</summary>

WP Cloud runs every site on PHP 8.3. PHP 7.4 and 8.1 no longer receive security updates, and 8.2 is close to the end of its support.

</details>

<details>
<summary>What happens to deactivated sites?</summary>

Sites deactivated more than 30 days before the migration are marked for deletion and aren't migrated. If you still need one, reactivate it in Partner Center before 31 October 2026.

</details>

<details>
<summary>Will my backups move with my site?</summary>

Take a fresh backup after migration and before making fixes, so you have a known restore point on WP Cloud.

</details>

<details>
<summary>Can I stay on an older PHP version?</summary>

No. Every site on WP Cloud runs PHP 8.3.

</details>
