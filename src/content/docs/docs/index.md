---
title: Introduction
description: Plume is an open-source, self-hosted newsletter platform that sends through your own email provider.
---

Plume is an open-source, self-hosted newsletter platform. You send through your own email provider — Amazon SES, Mailgun, SendGrid, Postmark, Resend, or any SMTP server — at provider cost, never per subscriber — and your data never leaves your server.

:::note
New here? Jump straight to the [Quickstart](/docs/quickstart/) to get a working install in about five minutes.
:::

## Why Plume

Hosted newsletter tools price by subscriber count, so your bill climbs as your list grows — even though sending email is nearly free. Plume separates the two: the software is free and open source, and your only sending cost is what your email provider charges — as low as `$0.10` per 1,000 emails with Amazon SES.

- **Own your sending** — Your own provider account, your reputation, your list — no middleman.
- **Single binary** — One static Go binary with the UI embedded, plus Postgres.
- **Open source** — AGPL-3.0. Self-hosted edition free forever.
- **Extensible** — A first-class hook system — no forking required.

## How it works

Plume manages brands, lists, and subscribers, lets you compose HTML campaigns, and hands them to a background worker that drips mail to your configured [email provider](/docs/email-providers/) within your rate limits. It captures opens and clicks on every provider, and — with Amazon SES — bounces and complaints too, auto-suppressing bad addresses to protect your reputation.

```
connect provider → import → compose → worker → track
```

## What you need

- An email provider account — Amazon SES (cheapest at volume) or any SMTP provider; optional to start, since Plume ships with a log provider for local testing
- A PostgreSQL 14+ database
- Docker, or a host to run a single binary
- A domain you can add DNS records to

## Next steps

Ready to install? The [Quickstart](/docs/quickstart/) gets you sending fast; [Installation](/docs/installation/) covers production deployment.
