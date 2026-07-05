---
title: Changelog
description: Notable changes to Plume.
---

Notable changes to Plume.

## Unreleased

- **RSS blog-to-newsletter** — connect a brand to your blog's RSS or Atom feed, and Plume drafts a campaign for every new post (published after connection). Pick "Post as-is" for the raw HTML, or "Let AI write it" to let the copilot rewrite each post as a newsletter following your standing instruction. Validates feeds immediately; polls every 15 minutes; max 3 drafts per check. See [Turn your blog into a newsletter](/docs/rss/).

## v0.4.0 — 2026-07-05

- **AI campaign copilot** — describe a campaign in plain language from the
  "New campaign" dialog and get a full draft (subject + body blocks) ready to
  refine by chatting; it can propose a target audience as a one-click segment
  and give send-time advice grounded in your analytics. Optional — requires
  an Anthropic API key in **Settings**; it never sends a campaign itself. See
  [`POST /ai/campaign`](/docs/rest-api/).
- **Segment-targeted sends** — the send dialog now has **List** and
  **Segment** tabs; sending to a segment reaches only its currently-matching,
  `active`-status subscribers. Suppression and one-click unsubscribe are
  unchanged. See [Sending & the worker](/docs/sending/).

## v0.2.0 — 2026-07-03

- **SMTP email provider** — send through Mailgun, SendGrid, Postmark, Resend,
  or any SMTP server; no AWS account required. Choose the active provider
  (SES or SMTP) in **Settings → Email**. One-click unsubscribe headers are
  preserved on the SMTP path; bounce/complaint auto-suppression remains
  SES-only for now. See [Email providers](/docs/email-providers/).

## v0.1.0 — first public release

This entry summarizes the shipped surface:

- **Audience** — brands, lists, and subscribers with custom fields; CSV import; double opt-in.
- **Campaigns** — HTML campaign composition with templates and reusable blocks.
- **Sending & tracking** — background send worker that drips to Amazon SES within your rate limit; open, click, bounce, and complaint tracking; automatic suppression.
- **Segments & A/B tests** — advanced segmentation and split testing.
- **Automations** — multi-step automation journeys.
- **AI** — AI-assisted copy and send-time help.
- **Analytics** — engagement overview and a deliverability dashboard.
- **Growth** — hosted signup forms.
- **Collaboration** — teams.
- **Developers** — a Go [hook system](/docs/hooks/), outbound [webhooks](/docs/webhooks/), API keys, and a [REST API](/docs/rest-api/) covering everything the UI can do.
