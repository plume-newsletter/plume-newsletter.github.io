import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: set this to the real production domain before deploy — it drives
// canonical URLs and the sitemap.
export default defineConfig({
  site: 'https://plume.dev',
  integrations: [sitemap()],
});
