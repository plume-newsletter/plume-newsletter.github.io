# Plume website

Marketing landing page + documentation for [Plume](https://github.com/plume-newsletter/plume),
the open-source self-hosted newsletter platform.

Built with [Astro](https://astro.build) — static HTML output for SEO. One domain,
path-based: `/` landing (done), `/docs/` (Starlight, planned), `/compare/` (planned).

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site -> dist/
npm run preview  # serve the build
```

Set the production domain in `astro.config.mjs` (`site:`) before deploying — it
drives canonical URLs and the sitemap. Deploys as static `dist/` (Cloudflare
Pages / Vercel). Part of the `plume-newsletter` org; deploys separately from the
app repo (`plume-newsletter/plume`).

## Notes

- Fonts (Inter, JetBrains Mono) are self-hosted via `@fontsource-variable`.
- The cloud waitlist form is client-only — wire it to a real endpoint when the
  waitlist exists (see the `ponytail:` note in `src/pages/index.astro`).
- GitHub star count is fetched live from the public API with a static fallback.
