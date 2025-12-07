const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'Embodied Intelligence for the Real World',
  url: 'https://your-docusaurus-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'your-organization',
  projectName: 'physical-ai-book',

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/your-organization/physical-ai-book/tree/main/',
          lastVersion: 'current',
          versions: {
            current: {
              label: 'Next',
              badge: true,
            },
          },
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/your-organization/physical-ai-book/tree/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Physical AI & Humanoid Robotics',
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Book',
          },
          {
to: '/blog', label: 'Blog', position: 'left'
          },
          {
            href: 'https://github.com/your-organization/physical-ai-book',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      algolia: {
        appId: 'YOUR_ALGOLIA_APP_ID',
        apiKey: 'YOUR_ALGOLIA_SEARCH_API_KEY',
        indexName: 'YOUR_ALGOLIA_INDEX_NAME',
        // Optional: path for search page that contains filters `'/search'`
        // contextualSearch: true,
        // Optional: Specify domain for client-side code
        // externalUrlRegex: 'external\.com/[a-zA-Z0-9_]+',
        // Optional: Replace internal algolia-loader with a custom one (if you need to manipulate search requests/responses)
        // algoliaOptions: { 'facetFilters': ['language:en', 'version:3.0.0'] },
        // Optional: The search config to use for contextual search.
        // contextualSearchOptions: {
        //   externalUrlRegex: 'external\.com/[a-zA-Z0-9_]+',
        //   algoliaOptions: { 'facetFilters': ['language:en', 'version:3.0.0'] },
        // },
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Book Intro',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/your-organization/physical-ai-book',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Physical AI & Humanoid Robotics. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
