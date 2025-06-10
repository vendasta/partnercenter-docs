import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Partner Center',
  tagline: 'Welcome to the Vendasta Help Center',
  favicon: 'img/favicon.ico',

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
          // editUrl: undefined,
          // routeBasePath: '/', // Set docs as the root
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    // Add plugins if needed
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
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Help Resources',
          items: [
            {
              label: 'Getting Started',
              to: '/getting-started',
            },
            {
              label: 'Partner Center',
              to: '/partner-center',
            },
            {
              label: 'Business App',
              to: '/business-app',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Partner Community',
              href: 'https://www.facebook.com/groups/vendasta',
            },
            {
              label: 'Vendasta Academy',
              href: 'https://academy.vendasta.com/',
            },
            {
              label: 'Blog',
              href: 'https://www.vendasta.com/blog/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Vendasta.com',
              href: 'https://www.vendasta.com',
            },
            {
              label: 'Submit a Ticket',
              href: 'https://support.vendasta.com/hc/en-us/requests/new',
            },
            {
              label: 'Product Feedback',
              href: 'https://roadmap.vendasta.com',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Vendasta. All Rights Reserved.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
