import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';

// TODO: set this to the real production domain before deploy — it drives
// canonical URLs and the sitemap.
export default defineConfig({
  site: 'https://plume.dev',
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
        { label: 'Guides', items: ['docs/connecting-ses', 'docs/brands-lists-campaigns', 'docs/subscribers', 'docs/sending', 'docs/tracking-suppression', 'docs/additional-features'] },
        { label: 'Reference', items: ['docs/hooks', 'docs/webhooks', 'docs/rest-api', 'docs/cli'] },
        { label: 'More', items: ['docs/migrating', 'docs/faq', 'docs/changelog'] },
      ],
    }),
    sitemap(),
  ],
});
