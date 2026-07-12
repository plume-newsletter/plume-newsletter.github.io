import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';

// Hosted on GitHub Pages (repo: plume-newsletter.github.io) at the custom
// domain plumenewsletter.com. `site` drives canonical URLs + the sitemap;
// public/CNAME pins the custom domain (no base path needed either way).
export default defineConfig({
  site: 'https://plumenewsletter.com',
  integrations: [
    starlight({
      title: 'Plume docs',
      // Docs live under /docs/* (content is nested in a docs/ folder); the
      // custom landing page at src/pages/index.astro owns /.
      logo: { src: './src/assets/plume-mark.svg', replacesTitle: false },
      customCss: ['./src/styles/docs.css'],
      sidebar: [
        { label: 'Getting started', items: [{ slug: 'docs', label: 'Introduction' }, 'docs/quickstart', 'docs/installation', 'docs/configuration'] },
        { label: 'Guides', items: ['docs/connecting-ses', 'docs/email-providers', 'docs/brands-lists-campaigns', 'docs/subscribers', 'docs/sending', 'docs/tracking-suppression', 'docs/additional-features', 'docs/rss', 'docs/ghost-migration', 'docs/wordpress', 'docs/n8n'] },
        { label: 'Reference', items: ['docs/hooks', 'docs/webhooks', 'docs/rest-api', 'docs/cli'] },
        { label: 'More', items: ['docs/migrating', 'docs/faq', 'docs/changelog'] },
      ],
    }),
    sitemap(),
  ],
});
