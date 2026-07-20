// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Content lives at src/content/docs/docs/** so Starlight's generated
// routes land under /docs/* instead of /* — this lets a hand-written
// src/pages/index.astro (Sendit marketing landing) own the site root
// without colliding with Starlight's routing.
export default defineConfig({
  site: 'https://flixir-io.github.io',
  base: '/',

  integrations: [
    starlight({
      title: 'Flixir',
      description:
        'Flixir is a visual workflow automation engine built for Shopify. Automate your store without writing code.',
      social: [
        {
          icon: 'youtube',
          label: 'YouTube',
          href: 'https://www.youtube.com/@Flixirio',
        },
      ],
      editLink: {
        baseUrl:
          'https://github.com/flixir-io/FlowNet/edit/main/docs-site/src/content/docs/',
      },
      // Brand accent color + Inter, tied to the same tokens the Sendit
      // marketing landing uses (see src/styles/global.css). Old MkDocs
      // equivalent was docs/assets/extra.css's --md-primary-fg-color.
      customCss: ['./src/styles/starlight-custom.css'],
      // Without this, Starlight falls back to its own default favicon
      // instead of picking up public/favicon.svg automatically.
      favicon: '/favicon.svg',
      head: [
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossorigin: true,
          },
        },
        {
          tag: 'link',
          attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
          },
        },
        // Same PWA/touch-icon tags MarketingLayout.astro sets for `/` —
        // Starlight's `favicon` option only covers the tab icon, not
        // these, so they need to be added separately here for `/docs/*`.
        {
          tag: 'link',
          attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        },
        {
          tag: 'link',
          attrs: { rel: 'manifest', href: '/site.webmanifest' },
        },
        // Matches theme_color in site.webmanifest, same as MarketingLayout.
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: '#6b39d3' },
        },
      ],
      sidebar: [
        {
          label: 'Overview',
          link: '/docs/',
        },
        {
          label: 'Guides',
          items: [
            { label: 'Expressions', link: '/docs/expressions/' },
            { label: 'Storage', link: '/docs/storage/' },
          ],
        },
        {
          label: 'Triggers',
          items: [
            { label: 'Manual', link: '/docs/triggers/manual/' },
            { label: 'Webhook', link: '/docs/triggers/webhook/' },
            { label: 'Scheduled', link: '/docs/triggers/cron/' },
            { label: 'Shopify', link: '/docs/triggers/shopify/' },
            {
              label: 'Storage Changed',
              link: '/docs/triggers/storage-changed/',
            },
          ],
        },
        {
          label: 'Steps',
          items: [
            { label: 'Debug', link: '/docs/steps/debug/' },
            { label: 'HTTP Request', link: '/docs/steps/http-request/' },
            { label: 'Lua script', link: '/docs/steps/lua-script/' },
            { label: 'Condition', link: '/docs/steps/condition/' },
            { label: 'Loop', link: '/docs/steps/loop/' },
            { label: 'Sleep', link: '/docs/steps/sleep/' },
            {
              label: 'Shopify GraphQL',
              link: '/docs/steps/shopify-graphql/',
            },
            { label: 'Gemini', link: '/docs/steps/gemini/' },
            { label: 'Storage Write', link: '/docs/steps/storage-write/' },
            { label: 'Storage Read', link: '/docs/steps/storage-read/' },
            {
              label: 'Storage Update',
              link: '/docs/steps/storage-update/',
            },
            {
              label: 'Storage Delete',
              link: '/docs/steps/storage-delete/',
            },
          ],
        },
      ],
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
