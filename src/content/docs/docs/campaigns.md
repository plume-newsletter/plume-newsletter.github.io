---
title: Campaigns
description: Build campaigns from a template gallery or blank canvas, then send to a list or segment.
---

Campaigns are built with a drag-and-drop block editor and sent through your own mail credentials
(see [Sending email](/docs/email-sending/)). Every campaign is scoped to the brand you're
currently working in.

## Starting a campaign

From **Campaigns → New**, either:

- **Pick a starter template** — a gallery of 14 ready-made layouts across seven categories
  (Newsletter, Product, Promo, Welcome, Announcement, Event, Minimal), each pre-filled with
  sample blocks you edit in place.
- **Start blank** — an empty canvas with no blocks.

Either way, the campaign opens directly in the builder as a draft.

## The block builder

Add blocks from the toolbar and drag them (via the handle) into order:

| Block | What it does |
|---|---|
| Heading | H1–H3 text, three levels |
| Text | Rich text (paragraphs, lists, bold/italic) |
| Button | A labeled link with left/center/right alignment |
| Image | An image with alt text and an optional link |
| Columns | Two side-by-side columns, each its own mini block stack |
| Social | A row of social platform links |
| Divider | A horizontal rule |
| Spacer | Adjustable vertical space |
| HTML | Raw HTML for anything the other blocks don't cover |

The right-hand pane shows a live preview as you edit. Output is sanitized, 600px-wide table HTML
built to render consistently across email clients — not just modern browsers.

Set the **subject line** and an optional **preheader** (the preview text shown next to the
subject in most inboxes) at the top of the builder. If you've added your own Anthropic API key
in Settings → AI, a **Suggest subjects** button and inline text-rewrite actions are also
available — see the [FAQ](/docs/faq/) for the AI copilot.

Click **Save** at any point while the campaign is a draft.

## Sending

Click **Send** to open the send dialog:

- **Test** — send the current draft to a single address without affecting the campaign's status.
- **List or Segment** — pick either a list or a segment as the audience (not both). Only
  **active** subscribers are ever included, even if a segment's conditions would otherwise match
  a pending or unsubscribed one. The dialog shows a live recipient count before you confirm.

## What happens after you send

Sending doesn't email anyone immediately — it queues one recipient row per active subscriber and
flips the campaign to **queued**. From there, the one-minute cron job (see
[The cron job](/docs/cron/)) drains the queue in batches, rendering and delivering each email
and rewriting its links for open/click tracking (see
[Tracking & reports](/docs/tracking-reports/)).

Individual send failures are retried automatically with increasing backoff (roughly 1 minute, 5
minutes, 30 minutes, 2 hours, then 6 hours) before that recipient is marked failed — a slow or
temporarily-down mail server doesn't lose the send. Once every recipient has been attempted, the
campaign flips to **sent** (or **failed** if nothing went out at all).

**A queued or sent campaign is locked** — the builder becomes read-only, so recipients still
being processed always get the exact content that was queued, not a mid-send edit. Use
**Duplicate** from the campaigns list to reuse a sent campaign's content as a new draft.
