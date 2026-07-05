---
title: Turn your blog into a newsletter
description: Connect a brand to your blog's RSS or Atom feed — every new post becomes a ready-to-send campaign draft, optionally written by AI.
---

Connect a brand to your blog's feed and Plume drafts a campaign for every new post. Nothing sends automatically — you always review first.

## Connect a feed

1. **Brands** → your brand → **RSS**.
2. Paste your feed URL and pick a mode:
   - **Post as-is** — the draft contains your post's HTML, editable in the composer.
   - **Let AI write it** — Plume's AI (requires [AI settings](/docs/additional-features/)) writes the newsletter from your post, following your standing instruction (e.g. "short summary, casual tone, end with a read-more link"). If AI is unavailable, you get the as-is draft instead — a post never goes missing.
3. Connect. Plume validates the feed immediately — a bad URL fails right there.

Common feed URLs:

| Platform | Feed URL |
|---|---|
| WordPress | `https://yourblog.com/feed/` |
| Ghost | `https://yourblog.com/rss/` |
| Hugo / Jekyll / Astro | usually `/index.xml`, `/feed.xml`, or `/rss.xml` |

## How polling behaves

- Plume checks the feed every **15 minutes**.
- **Only posts published after you connect** become drafts — connecting never floods you with your archive.
- At most **3 drafts per check**: if a feed suddenly reports many "new" items (site migration, feed plugin change), the newest 3 draft and the rest are skipped permanently.
- Fetch problems show on the brand's RSS dialog and clear on the next successful check.

## Prefer a custom pipeline?

The [n8n node](/docs/n8n/) plus n8n's built-in RSS trigger gives you full control — filter posts, route different categories to different lists, or add approval steps.
