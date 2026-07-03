---
title: Changelog
description: Notable changes to Plume.
---

Notable changes to Plume.

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
