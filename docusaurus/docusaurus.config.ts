import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Vendasta Documentation',
  tagline: 'Your comprehensive guide to Vendasta\'s platform and tools.',
  favicon: 'img/vendasta-logo.png',

  // Set the production url of your site here
  url: 'https://docs.vendasta.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'vendasta', // Usually your GitHub org/user name.
  projectName: 'partnercenter-docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Add head tags
  headTags: [
    // Google Tag Manager script
    {
      tagName: 'script',
      attributes: {
        type: 'text/javascript',
      },
      innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M8CQT5');`,
    },
  ],

  // Enable faster builds with Rspack bundler and persistent cache
  future: {
    experimental_faster: {
      rspackBundler: true,
      rspackPersistentCache: true,
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Remove edit URLs
          // editUrl: 'https://github.dev/vendasta/partnercenter-docs',
          routeBasePath: '/', // Set docs as the root
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        // Index docs and don't index blog (since blog is disabled)
        indexDocs: true,
        indexBlog: false,
        // Only English content
        language: ['en'],
        // Make search more visible
        searchBarPosition: 'right',
        // Highlight search terms in results
        highlightSearchTermsOnTargetPage: true,
        // Add search page that shows all results
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
        docsRouteBasePath: '/',
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          // Vendasta Services: AI Workforce section renamed (dropped "setup" from URLs)
          { from: '/vendasta-services/ai-workforce-setup', to: '/vendasta-services/ai-workforce/' },
          { from: '/vendasta-services/ai-workforce-setup/ai-receptionist-setup', to: '/vendasta-services/ai-workforce/ai-receptionist' },
          { from: '/vendasta-services/ai-workforce-setup/ai-reputation-specialist-setup', to: '/vendasta-services/ai-workforce/ai-reputation-specialist' },
          { from: '/vendasta-services/ai-workforce-setup/ai-inside-sales-representative-setup', to: '/vendasta-services/ai-workforce/ai-inside-sales-representative' },
          { from: '/vendasta-services/ai-workforce-setup/ai-support-agent-setup', to: '/vendasta-services/ai-workforce/ai-support-agent' },
          { from: '/vendasta-services/ai-workforce-setup/ai-data-analyst-setup', to: '/vendasta-services/ai-workforce/ai-data-analyst' },
          { from: '/vendasta-services/ai-workforce-setup/ai-human-resources-coordinator-setup', to: '/vendasta-services/ai-workforce/ai-human-resources-coordinator' },
          // Vendasta Services: social media onboarding + timeline folded into the section index
          { from: '/vendasta-services/social-media-management/social-media-management-onboarding', to: '/vendasta-services/social-media-management/' },
          { from: '/vendasta-services/social-media-management/social-media-marketing-timeline', to: '/vendasta-services/social-media-management/' },
          // Vendasta Services: expectation brochures article removed
          { from: '/vendasta-services/expectations/expectation-brochures', to: '/vendasta-services/expectations/' },
          // Vendasta Services digital advertising: MatchCraft overview split into Express Ads + Managed Ads Campaign
          { from: '/vendasta-services/digital-advertising/matchcraft-services-overview', to: '/vendasta-services/digital-advertising/' },
          // Vendasta Services digital advertising: short articles merged into the section FAQ
          { from: '/vendasta-services/digital-advertising/matchcraft-ad-services-refund-policy', to: '/vendasta-services/digital-advertising/' },
          { from: '/vendasta-services/digital-advertising/criteria-for-unskippable-youtube-ads', to: '/vendasta-services/digital-advertising/' },
          { from: '/vendasta-services/digital-advertising/how-to-request-a-budget-change-on-matchcraft-ad-services-spend', to: '/vendasta-services/digital-advertising/' },
          // Payment fees: duplicate article removed, redirect to vendasta-payments index
          { from: '/administration/commerce/vendasta-payments/payment-fees-and-options', to: '/administration/commerce/vendasta-payments/' },
          // Web chat GA4 article moved from business-app/conversations to conversations
          { from: '/business-app/conversations/track-web-chat-events-google-analytics', to: '/conversations/track-web-chat-events-google-analytics' },
          // Administration index removed; redirect to My Account (one redirect only to avoid EEXIST on build/administration/index.html)
          { from: '/administration/', to: '/administration/my-account/' },
          // My Plan: subpages merged into one page
          { from: '/administration/my-account/my-plan/view-your-subscription-plan-details', to: '/administration/my-account/my-plan/' },
          { from: '/administration/my-account/my-plan/cancelling-your-subscription', to: '/administration/my-account/my-plan/' },
          // My Billing: billing-overview-and-model is now the index
          { from: '/administration/my-account/my-billing/billing-overview-and-model', to: '/administration/my-account/my-billing/' },
          // Affiliate Program: terms merged into index
          { from: '/administration/my-account/affiliate-program/vendasta-affiliate-program-terms-and-conditions', to: '/administration/my-account/affiliate-program/' },
          // Data Management: CRM Objects and Custom Fields merged into one page
          { from: '/administration/data-management/crm-objects/custom-fields', to: '/administration/data-management/crm-objects/' },
          // Data Management: Pipelines and Create a new Pipeline merged into one page
          { from: '/administration/data-management/pipelines/create-a-new-pipeline', to: '/administration/data-management/pipelines/' },
          // Platform Settings: overview merged into index
          { from: '/administration/platform-settings/platform-settings-overview', to: '/administration/platform-settings/' },
          // Customize: client-experience-and-customization is now the index
          { from: '/administration/platform-settings/customize/client-experience-and-customization', to: '/administration/platform-settings/customize/' },
          // Customize Business App: interface customization overview merged into index
          { from: '/administration/platform-settings/customize-business-app/business-app-interface-customization', to: '/administration/platform-settings/customize-business-app/' },
          // Partner Branding: customize-your-branding is now the index
          { from: '/administration/platform-settings/partner-branding/customize-your-branding', to: '/administration/platform-settings/partner-branding/' },
          // Conversations Settings: how-to-turn-off-inbox-messages-tab merged into index
          { from: '/administration/platform-settings/conversations-settings/how-to-turn-off-inbox-messages-tab', to: '/administration/platform-settings/conversations-settings/' },
          // Administration Commerce: default billing automation guide merged into index
          { from: '/administration/commerce/default-billing-settings/billing-automation-guide', to: '/administration/commerce/default-billing-settings/' },
          // Administration Commerce: order management guide merged into index
          { from: '/administration/commerce/order-settings/order-management-guide', to: '/administration/commerce/order-settings/' },
          // Administration Commerce: tax-rates and tax-configuration-guide merged into index
          { from: '/administration/commerce/tax-rates/tax-rates', to: '/administration/commerce/tax-rates/' },
          { from: '/administration/commerce/tax-rates/tax-configuration-guide', to: '/administration/commerce/tax-rates/' },
          // Social Media Management: overview merged into index
          { from: '/vendasta-services/social-media-management/social-media-management-overview', to: '/vendasta-services/social-media-management/' },
          // Administration Advanced: translate-and-customize-with-weblate merged into index
          { from: '/administration/advanced/translate-customize/translate-and-customize-with-weblate', to: '/administration/advanced/translate-customize/' },
          // Legacy Customer Voice: overview merged into main index
          { from: '/legacy/customer-voice/overview/what-is-customer-voice', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/overview/customer-voice-walkthrough', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/overview/overview-page-and-performance-metrics', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/overview/sms-performance-metrics', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/overview/a2p-10dlc-registration', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/overview/product-details', to: '/legacy/customer-voice/' },
          // Omit overview/ redirect to avoid EEXIST: docs build may create overview/index.html for the folder
          // Legacy Customer Voice customers: index removed, dropdown only
          { from: '/legacy/customer-voice/customers/', to: '/legacy/customer-voice/customers/customer-table' },
          // Legacy Customer Voice templates: index removed, dropdown only
          { from: '/legacy/customer-voice/templates/', to: '/legacy/customer-voice/templates/alternate-email-templates' },
          // Legacy Customer Voice tools: index removed, dropdown only
          { from: '/legacy/customer-voice/tools/', to: '/legacy/customer-voice/tools/email-signature-widget' },
          // Administration Advanced: vendasta-sso-integrations merged into index
          { from: '/administration/advanced/single-sign-on/vendasta-sso-integrations', to: '/administration/advanced/single-sign-on/' },
          // Legacy: proposal-builder-overview merged into proposals index
          { from: '/legacy/proposals/proposal-builder-overview', to: '/legacy/proposals/' },
          // Legacy Customer Voice: FAQs merged into index
          { from: '/legacy/customer-voice/faqs', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/faqs/activate-sms-addons', to: '/legacy/customer-voice/' },
          // Executive Report (multi-location): configure, citation tracking, and why not receiving merged into FAQ
          { from: '/multi-location-business-app/executive-report/configure-multi-location-executive-report', to: '/multi-location-business-app/executive-report/' },
          { from: '/multi-location-business-app/executive-report/citation-tracking', to: '/multi-location-business-app/executive-report/' },
          { from: '/multi-location-business-app/executive-report/why-multi-location-users-not-receiving-executive-report', to: '/multi-location-business-app/executive-report/' },
          // Business App: mobile-app and sso-integrations moved to businessapp-docs
          { from: '/business-app/mobile-app', to: '/business-app/' },
          { from: '/business-app/sso-integrations', to: '/business-app/' },
          // Business App: get-started moved to customize-business-app/setup-guide
          { from: '/business-app/get-started', to: '/administration/platform-settings/customize-business-app/setup-guide' },
          // My Meetings: create-booking-links merged into index
          { from: '/crm/my-meetings/create-booking-links', to: '/crm/my-meetings/' },
          // Campaigns: Day 0 FAQ merged into index
          { from: '/marketing/campaigns/what-is-day-0-in-a-campaign', to: '/marketing/campaigns/' },
          // Premium Reports: overview merged into index
          { from: '/reports/premium-reports/overview', to: '/reports/premium-reports/' },
          // Metrics: SaaS Metrics dashboard merged into index
          { from: '/reports/metrics/saas-metrics-dashboard', to: '/reports/metrics/' },
          { from: '/legacy/customer-voice/faqs/can-i-customize-buttons', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/faqs/can-i-hide-business-address', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/faqs/can-the-link-in-sms-template-be-changed', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/faqs/character-limit-for-sms-message', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/faqs/create-custom-email-review-request-template', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/faqs/customer-voice-sms-credits-reset', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/faqs/edit-review-request-email-template', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/faqs/embed-review-widget-wordpress', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/faqs/inbox-and-customer-voice-phone-number', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/faqs/preferred-sources', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/faqs/products-needed-for-customer-voice', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/faqs/review-generation-widget', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/faqs/send-emails-from-custom-domain', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/faqs/send-review-requests-to-multiple-customers', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/faqs/send-sms-review-requests', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/faqs/upload-multiple-customers-at-once', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/faqs/where-does-a-review-go-once-submitted', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/faqs/which-sources-can-i-request-reviews-on', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/faqs/why-is-first-name-not-displayed-in-review-requests-via-sms', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/faqs/why-is-my-custom-template-failing', to: '/legacy/customer-voice/' },
          // Marketplace: single overview page (marketplace-overview merged into index)
          { from: '/marketplace/marketplace-overview', to: '/marketplace/' },
          // Products: products-overview-management merged into index
          { from: '/marketplace/products/products-overview-management', to: '/marketplace/products/' },
          // Packages: packages-overview-creation merged into index
          { from: '/marketplace/packages/packages-overview-creation', to: '/marketplace/packages/' },
          // Manage Store: store-setup-configuration merged into index
          { from: '/marketplace/manage-store/store-setup-configuration', to: '/marketplace/manage-store/' },
          // Automations: getting-started-with-automations merged into index
          { from: '/automations/getting-started-with-automations', to: '/automations/' },
          // Automations: category page redirects to linked doc
          { from: '/category/automations', to: '/automations/' },
          // Automations: history content merged into managing
          { from: '/automations/automation-history', to: '/automations/managing-your-automations' },
          // Automations: email-campaign-automations deleted (feature removed from Marketing)
          { from: '/automations/email-campaign-automations', to: '/automations/' },
          // Automations: sales-and-crm-integration walkthrough merged into templates overview
          { from: '/automations/sales-and-crm-integration', to: '/automations/automation-templates-overview' },
          // Automations: step deep-dives moved under /automations/steps/
          { from: '/automations/categorize-with-ai', to: '/automations/steps/categorize-with-ai' },
          { from: '/automations/find-company', to: '/automations/steps/find-company' },
          { from: '/automations/find-custom-object', to: '/automations/steps/find-custom-object' },
          { from: '/automations/copy-assistant-automation', to: '/automations/steps/copy-assistant-automation' },
          // Automations: sort-text-with-ai → categorize-text-with-ai → categorize-with-ai (now canonical, under steps/)
          { from: '/automations/sort-text-with-ai', to: '/automations/steps/categorize-with-ai' },
          { from: '/automations/categorize-text-with-ai', to: '/automations/steps/categorize-with-ai' },
          // Automations: deleted /my-automations/* sub-pages — map each to its content's current home
          { from: '/automations/my-automations', to: '/automations/' },
          { from: '/automations/my-automations/index', to: '/automations/' },
          { from: '/automations/my-automations/getting-started-with-automations', to: '/automations/' },
          { from: '/automations/my-automations/create-new-automation', to: '/automations/creating-and-configuring-automations' },
          { from: '/automations/my-automations/automation-settings', to: '/automations/creating-and-configuring-automations' },
          { from: '/automations/my-automations/available-automation-steps', to: '/automations/automation-steps-reference' },
          { from: '/automations/my-automations/available-automations-triggers-list', to: '/automations/automation-triggers-reference' },
          { from: '/automations/my-automations/what-are-automation-triggers', to: '/automations/automation-triggers-reference' },
          { from: '/automations/my-automations/manually-triggered-automations', to: '/automations/automation-triggers-reference' },
          { from: '/automations/my-automations/form-submission-trigger', to: '/automations/automation-triggers-reference' },
          { from: '/automations/my-automations/web-chat-lead-capture-trigger', to: '/automations/automation-triggers-reference' },
          { from: '/automations/my-automations/logic-steps', to: '/automations/advanced-automation-features' },
          { from: '/automations/my-automations/action-sets-in-automations', to: '/automations/advanced-automation-features' },
          { from: '/automations/my-automations/delay-until-steps-in-automation-workflows', to: '/automations/advanced-automation-features' },
          { from: '/automations/my-automations/grouping-of-automation-steps', to: '/automations/advanced-automation-features' },
          { from: '/automations/my-automations/automation-activity', to: '/automations/managing-your-automations' },
          { from: '/automations/my-automations/turn-off-an-automation', to: '/automations/managing-your-automations' },
          { from: '/automations/my-automations/duplicating-automations', to: '/automations/managing-your-automations' },
          { from: '/automations/my-automations/organize-your-automations-with-tags', to: '/automations/managing-your-automations' },
          { from: '/automations/my-automations/automations-data-passing', to: '/automations/data-expressions' },
          { from: '/automations/my-automations/automations-api-action', to: '/automations/automation-steps-reference' },
          { from: '/automations/my-automations/automatically-assign-salespeople', to: '/automations/automation-templates-overview' },
          { from: '/automations/my-automations/start-campaign-snapshot-report', to: '/automations/automation-templates-overview' },
          { from: '/automations/my-automations/set-up-automation-when-a-user-shows-interest-in-a-package', to: '/automations/automation-templates-overview' },
          { from: '/automations/my-automations/add-email-campaign-automations', to: '/automations/' },
          { from: '/automations/my-automations/partner-center-admin-notifications', to: '/automations/' },
          { from: '/automations/my-automations/reputation-management-premium-scheduling-logic', to: '/automations/' },
          // Automations: deleted /templates/* sub-pages — all merged into automation-templates-overview
          { from: '/automations/templates', to: '/automations/automation-templates-overview' },
          { from: '/automations/templates/index', to: '/automations/automation-templates-overview' },
          { from: '/automations/templates/automation-templates-in-partner-center', to: '/automations/automation-templates-overview' },
          { from: '/automations/templates/create-sales-opportunity-form-submission', to: '/automations/automation-templates-overview' },
          { from: '/automations/templates/start-a-campaign-when-a-contact-is-added-to-a-specific-list', to: '/automations/automation-templates-overview' },
          { from: '/automations/templates/system-automations', to: '/automations/automation-templates-overview' },
          // Fulfillment: open-task-manager and flat paths now under task-manager folder
          { from: '/fulfillment/open-task-manager', to: '/fulfillment/' },
          { from: '/fulfillment/open-task-manager/get-started', to: '/fulfillment/task-manager/task-manager-getting-started' },
          { from: '/fulfillment/open-task-manager/accounts', to: '/fulfillment/task-manager/accounts/' },
          { from: '/fulfillment/open-task-manager/projects', to: '/fulfillment/task-manager/projects/' },
          { from: '/fulfillment/open-task-manager/tasks', to: '/fulfillment/task-manager/tasks/' },
          { from: '/fulfillment/open-task-manager/settings', to: '/fulfillment/task-manager/settings/' },
          { from: '/fulfillment/open-task-manager/templates', to: '/fulfillment/task-manager/templates/' },
          { from: '/fulfillment/getting-started', to: '/fulfillment/task-manager/task-manager-getting-started' },
          { from: '/fulfillment/accounts', to: '/fulfillment/task-manager/accounts/' },
          { from: '/fulfillment/projects', to: '/fulfillment/task-manager/projects/' },
          { from: '/fulfillment/tasks', to: '/fulfillment/task-manager/tasks/' },
          { from: '/fulfillment/settings', to: '/fulfillment/task-manager/settings/' },
          { from: '/fulfillment/templates', to: '/fulfillment/task-manager/templates/' },
          // Task Manager: projects/tasks overviews merged into index (one page per section)
          { from: '/fulfillment/task-manager/projects/projects-overview', to: '/fulfillment/task-manager/projects/' },
          { from: '/fulfillment/task-manager/tasks/tasks-overview', to: '/fulfillment/task-manager/tasks/' },
          { from: '/business-app/administration/integrations-overview', to: '/business-app/administration' },
          { from: '/business-app/administration/integrations', to: '/business-app/administration' },
          { from: '/business-app/administration/connect-quickbooks', to: '/business-app/administration' },
          { from: '/business-app/administration/quickbooks-integration', to: '/business-app/administration' },
          { from: '/business-app/administration/connecting-google-analytics', to: '/business-app/administration' },
          { from: '/business-app/administration/integrations/quickbooks', to: '/business-app/administration' },
          { from: '/business-app/administration/integrations/google-analytics', to: '/business-app/administration' },
          { from: '/business-app/administration/api-key-based-integrations', to: '/administration/advanced/integrations/authentication-and-connections' },
          { from: '/business-app/administration/setting-up-sso-integrations', to: '/administration/advanced/integrations/authentication-and-connections' },
          { from: '/business-app/administration/setting-up-vendor-managed-integrations', to: '/administration/advanced/integrations/authentication-and-connections' },
          { from: '/business-app/administration/integrations/authentication-and-connections', to: '/administration/advanced/integrations/authentication-and-connections' },
          { from: '/business-app/administration/using-data-sync-and-automated-review-requests', to: '/business-app/administration' },
          { from: '/business-app/administration/setting-up-triggers-for-closed-matters-in-clio', to: '/business-app/administration' },
          { from: '/business-app/administration/crm-objects', to: '/business-app/administration' },
          { from: '/business-app/administration/score', to: '/business-app/administration' },
          { from: '/business-app/administration/conversations-settings', to: '/business-app/administration' },
          { from: '/business-app/administration/email-configuration-notifications-management', to: '/business-app/administration' },
          { from: '/business-app/administration/email-configuration', to: '/business-app/administration' },
          { from: '/business-app/administration/email-history', to: '/business-app/administration' },
          { from: '/bulk-import-business-app-accounts', to: '/accounts/manage-accounts/create-accounts' },
          { from: '/business-app/administration/files', to: '/accounts/manage-accounts/files' },
          { from: '/accounts/manage-business-app/files', to: '/accounts/manage-accounts/files' },
          { from: '/business-app/administration/projects', to: '/accounts/manage-business-app/projects' },
          { from: '/vendasta-products', to: '/legacy/calendarhero' },
          { from: '/vendasta-products/calendarhero', to: '/legacy/calendarhero' },
          { from: '/legacy-products/calendarhero', to: '/legacy/calendarhero' },
          { from: '/getting-started/intro-to-vendasta/vendasta-platform-overview', to: '/getting-started' },
          { from: '/getting-started/intro-to-vendasta/partner-onboarding', to: '/getting-started/partner-onboarding' },
          { from: '/getting-started/intro-to-vendasta/partner-troubleshooting-guide', to: '/getting-started/partner-troubleshooting-guide' },
          { from: '/getting-started/intro-to-vendasta/vendasta-affiliate-program', to: '/getting-started/vendasta-affiliate-program' },
          { from: '/partner-center/partner-center-getting-started-guide', to: '/partner-center' },
          { from: '/partner-center/AI-receptionist-features-by-plan', to: '/ai/ai-workforce/ai-receptionist-features-by-plan' },
          // AI Workforce Optimization Plan content is now on every service page
          { from: '/vendasta-services/ai-workforce-setup/ai-workforce-optimization-plan', to: '/vendasta-services/ai-workforce/' },
          { from: '/vendasta-services/working-with-our-team/white-labeling-communications-with-vendasta-services', to: '/vendasta-services/working-with-our-team' },
          { from: '/administration/platform-settings/ai-workforce', to: '/ai/ai-workforce' },
          { from: '/administration/platform-settings/ai-knowledge-base', to: '/ai/knowledge-base' },
          { from: '/administration/my-account/reports', to: '/reports' },
          { from: '/administration/my-account/financial-documents', to: '/administration/my-account/my-billing/' },
          { from: '/administration/my-account/company-profile', to: '/administration/my-account/' },
        ],
      },
    ],
  ],

  themeConfig: {
    // Vendasta's social card
    image: 'img/vendasta-social-card.jpg',
    navbar: {
      title: '',
      logo: {
        alt: 'Vendasta Logo',
        src: 'img/vendasta_logo_full.png',
      },
      items: [
        // Moved to DocSidebar swizzle (src/theme/DocSidebar/index.tsx)
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `
        <div class="footer-slim-inner">
          <span class="footer-copyright">© Vendasta ${new Date().getFullYear()}</span>
          <nav class="footer-slim-links">
            <a href="/getting-started">Getting Started</a>
            <a href="https://www.vendasta.com/terms/" target="_blank" rel="noopener noreferrer">Terms of Service</a>
            <a href="https://www.vendasta.com/privacy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            <a href="https://www.vendasta.com/gdpr/" target="_blank" rel="noopener noreferrer">GDPR</a>
          </nav>
        </div>
      `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    } as any,
  } satisfies Preset.ThemeConfig,
};

export default config;
