import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';

// Hosted on GitHub Pages at the org root site (repo: plume-newsletter.github.io).
// `site` drives canonical URLs + the sitemap; when a custom domain is added,
// change it here and drop a public/CNAME file (no base path needed either way).
export default defineConfig({
  site: 'https://plume-newsletter.github.io',
  integrations: [
    starlight({
      title: 'Plume docs',
      // Docs live under /docs/* (content is nested in a docs/ folder); the
      // custom landing page at src/pages/index.astro owns /.
      logo: { src: './src/assets/plume-mark.svg', replacesTitle: false },
      customCss: ['./src/styles/docs.css'],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/plume-newsletter/plume' },
      ],
      sidebar: [
        { label: 'Getting started', items: [{ slug: 'docs', label: 'Introduction' }, 'docs/quickstart', 'docs/installation', 'docs/configuration'] },
        { label: 'Guides', items: ['docs/connecting-ses', 'docs/email-providers', 'docs/brands-lists-campaigns', 'docs/subscribers', 'docs/sending', 'docs/tracking-suppression', 'docs/additional-features'] },
        { label: 'Reference', items: ['docs/hooks', 'docs/webhooks', 'docs/rest-api', 'docs/cli'] },
        { label: 'More', items: ['docs/migrating', 'docs/faq', 'docs/changelog'] },
      ],
    }),
    sitemap(),
  ],
});
