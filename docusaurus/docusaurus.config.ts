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
          // Administration Advanced: translate-and-customize-with-weblate merged into index
          { from: '/administration/advanced/translate-customize/translate-and-customize-with-weblate', to: '/administration/advanced/translate-customize/' },
          // Legacy Customer Voice: overview merged into main index
          { from: '/legacy/customer-voice/overview/what-is-customer-voice', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/overview/customer-voice-walkthrough', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/overview/overview-page-and-performance-metrics', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/overview/sms-performance-metrics', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/overview/a2p-10dlc-registration', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/overview/product-details', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/overview', to: '/legacy/customer-voice/' },
          { from: '/legacy/customer-voice/overview/', to: '/legacy/customer-voice/' },
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
          { from: '/business-app/administration/files', to: '/accounts/manage-business-app/files' },
          { from: '/business-app/administration/projects', to: '/accounts/manage-business-app/projects' },
          { from: '/vendasta-products', to: '/category/legacy-products' },
          { from: '/vendasta-products/general', to: '/legacy-products/general' },
          { from: '/vendasta-products/general/getting-started', to: '/legacy-products/general/getting-started' },
          { from: '/vendasta-products/calendarhero', to: '/legacy-products/calendarhero' },
          { from: '/getting-started/intro-to-vendasta/vendasta-platform-overview', to: '/getting-started' },
          { from: '/getting-started/intro-to-vendasta/partner-onboarding', to: '/getting-started/partner-onboarding' },
          { from: '/getting-started/intro-to-vendasta/partner-troubleshooting-guide', to: '/getting-started/partner-troubleshooting-guide' },
          { from: '/getting-started/intro-to-vendasta/vendasta-affiliate-program', to: '/getting-started/vendasta-affiliate-program' },
          { from: '/partner-center/partner-center-getting-started-guide', to: '/partner-center' },
          { from: '/partner-center/AI-receptionist-features-by-plan', to: '/ai/ai-workforce/ai-receptionist-features-by-plan' },
        ],
      },
    ],
  ],

  themeConfig: {
    // Vendasta's social card
    image: 'img/vendasta-social-card.jpg',
    navbar: {
      title: 'Partner Center',
      logo: {
        alt: 'Vendasta Logo',
        src: 'img/vendasta-logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'mainSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'html',
          position: 'right',
          value: `<a href="https://docs.businessapp.io/" target="_blank" rel="noopener noreferrer" class="business-app-navbar-button">
            <span class="button-text">Business App Docs</span>
            <span class="diagonal-arrow">↗</span>
          </a>`,
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'RESOURCES',
          items: [
            {
              label: 'Vendasta Website',
              href: 'https://www.vendasta.com/ai/',
            },
            {
              label: 'Blog',
              href: 'https://www.vendasta.com/blog/',
            },
            {
              label: 'Content Library',
              href: 'https://www.vendasta.com/content-library/',
            },
            {
              label: 'Community',
              href: 'https://www.facebook.com/groups/vendasta',
            },
            {
              label: 'Service Status',
              href: 'https://status.vendasta.com/',
            },
          ],
        },
        {
          title: 'COMPANY',
          items: [
            {
              label: 'About Us',
              href: 'https://www.vendasta.com/company/',
            },
            {
              label: 'Contact',
              href: 'https://www.vendasta.com/contact/',
            },
            {
              label: 'Newsroom',
              href: 'https://www.vendasta.com/newsroom/',
            },
          ],
        },
        {
          title: 'LEGAL',
          items: [
            {
              label: 'Terms of Service',
              href: 'https://www.vendasta.com/terms/',
            },
            {
              label: 'Privacy Policy',
              href: 'https://www.vendasta.com/privacy/',
            },
            {
              label: 'Cookie Policy',
              to: '/legal/cookie-policy',
            },
            {
              html: '<a href="#cookie-settings" data-cookie-settings-link>Cookie Settings</a>',
            },
            {
              label: 'GDPR',
              href: 'https://www.vendasta.com/gdpr/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Vendasta Technologies Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    } as any,
  } satisfies Preset.ThemeConfig,
};

export default config;
