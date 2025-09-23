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

  // Add external scripts
  scripts: [
    {
      src: 'https://consent.cookiebot.com/uc.js',
      'data-cbid': '18defc9c-f3d9-498d-b1d8-469fdf619133',
      'data-blockingmode': 'auto',
      async: false,
    },
    // Google Tag Manager
    {
      innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M8CQT5');`,
    },
  ],

  // Add head tags
  headTags: [
    // Google Tag Manager (noscript) fallback will be handled in a custom component
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
          label: 'Overview',
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
              type: 'html',
              value: '<a href="javascript:void(0)" onclick="Cookiebot.show()">Cookie Settings</a>',
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
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
