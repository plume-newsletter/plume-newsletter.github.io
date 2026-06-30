---
title: Introduction
description: Plume is an open-source, self-hosted newsletter platform that sends through your own Amazon SES account.
---

Plume is an open-source, self-hosted newsletter platform. You send through your own Amazon SES account — at AWS cost, never per subscriber — and your data never leaves your server.

:::note
New here? Jump straight to the [Quickstart](/docs/quickstart/) to get a working install in about five minutes.
:::

## Why Plume

Hosted newsletter tools price by subscriber count, so your bill climbs as your list grows — even though sending email is nearly free. Plume separates the two: the software is free and open source, and your only sending cost is what AWS charges, roughly `$0.10` per 1,000 emails.

- **Own your sending** — Your AWS account, your reputation, your list — no middleman.
- **Single binary** — One static Go binary with the UI embedded, plus Postgres.
- **Open source** — AGPL-3.0. Self-hosted edition free forever.
- **Extensible** — A first-class hook system — no forking required.

## How it works

Plume manages brands, lists, and subscribers, lets you compose HTML campaigns, and hands them to a background worker that drips mail to SES within your rate limits. It captures opens, clicks, bounces, and complaints from SES feedback, and auto-suppresses bad addresses to protect your reputation.

```
SES → import → compose → worker → track
```

## What you need

- An AWS account with Amazon SES enabled
- A PostgreSQL 14+ database
- Docker, or a host to run a single binary
- A domain you can add DNS records to

## Next steps

Ready to install? The [Quickstart](/docs/quickstart/) gets you sending fast; [Installation](/docs/installation/) covers production deployment.
