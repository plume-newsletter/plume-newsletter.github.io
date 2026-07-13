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

Uploaded images are served from your `public/storage` directory, which is a symlink to
`storage/app/public`. The [installer](/docs/installation/) creates this link for you. If uploads
show as broken images after a manual move or a fresh clone, recreate it:

```bash
php artisan storage:link
```

**Shared hosting that blocks symlinks:** some hosts disallow `symlink()`. In that case, point a
real `public/uploads` (or `public/storage`) directory at your storage, or configure the host's
file manager to create the symlink. Once `public/storage/...` serves your uploaded files over
HTTPS, image blocks work.
