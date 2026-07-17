---
title: Images in email
description: What actually works for images in email — formats, hosting, the "display images" prompt, and Outlook sizing.
---

Images in email are not images on a web page. Mail clients (Gmail, Outlook, Apple Mail, Yahoo)
each strip, rewrite, or block things a browser would happily render. This page covers the rules
Plume follows for you and the few you need to know about.

## Upload or paste a URL

In the campaign editor, add an **Image** block and either:

- **Upload** a file — Plume stores it on your own server and inserts the finished URL, or
- **Paste a URL** to an image you already host somewhere public.

Either way the image is referenced by an **absolute URL** in the sent email. Relative paths and
embedded (base64 / `cid:`) images are deliberately avoided — Gmail strips embedded images, and
relative paths have nothing to resolve against inside an inbox.

## Use PNG, JPG, or GIF — nothing else

Plume accepts **PNG, JPG, and GIF** and rejects everything else on upload. That's not a
limitation, it's the reality of email:

- **SVG** is blocked or stripped by almost every major client (and is an XSS vector) — never use
  it in email.
- **WebP / AVIF** don't render in Outlook and older clients.

If you paste a URL, point it at a PNG/JPG/GIF too.

## Every reader can hide your images

**This is unavoidable and applies to every email tool, not just Plume.** Most clients don't load
remote images until the reader clicks **"Display images"** (or has whitelisted the sender).
Outlook and corporate mail often block them by default. So:

- **Always write alt text.** It's the only thing a reader sees when images are off — the editor
  nudges you for it on every image block.
- **Never put essential words inside an image.** Your unsubscribe link, offer, or call-to-action
  must exist as real text, not baked into a picture.
- Expect a meaningful share of opens to happen with images off. That's normal.

## Sizing — Plume handles Outlook for you

Modern clients respect CSS, but **Outlook (desktop) ignores `max-width`** and will render an
image at its full pixel size — blowing your layout apart. Plume sets an explicit `width`
**attribute** on every image (defaulting to the 600px content width, never upscaling) so it sizes
correctly everywhere, Outlook included. You don't have to do anything.

For crisp images on high-DPI ("retina") screens, upload at roughly **2× the display size** — e.g.
a 600px-wide banner looks best uploaded at ~1200px. Plume caps the displayed width so the larger
file just renders sharper, not bigger.

## One-time setup: `storage:link`

Uploaded images are served from your `public/storage` directory, which is a shortcut (a symlink)
pointing at `storage/app/public`. The [installer](/docs/installation/) creates it for you, and on
almost every host that's the end of it.

A few shared hosts block symlinks, and the installer deliberately doesn't fail the install over it
— so the first sign is uploaded images showing as broken. To create the link yourself, on cPanel,
without a command line:

1. Open **Cron Jobs** in cPanel.
2. Add a new job set to **Once Per Minute**, with this command (substitute your real path):

   ```
   cd /home/yourusername/plume && php artisan storage:link
   ```

3. Wait a minute, check that your images now load, then **delete the cron job** — it only needs to
   run once.

If your host offers **Terminal** in cPanel, run the same command there instead and skip the cron
dance. If images still don't load, the host is blocking symlinks outright — their support can
create the `public/storage` → `storage/app/public` link for you. Once `public/storage/...` serves
your uploads over HTTPS, image blocks work.
