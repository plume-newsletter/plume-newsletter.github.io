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
        { label: 'Getting started', items: [{ slug: 'docs', label: 'Introduction' }, 'docs/installation', 'docs/cron', 'docs/email-sending'] },
        { label: 'Using Plume', items: ['docs/campaigns', 'docs/audience', 'docs/automations', 'docs/tracking-reports'] },
        { label: 'More', items: ['docs/faq', 'docs/changelog'] },
      ],
    }),
    sitemap(),
  ],
});
