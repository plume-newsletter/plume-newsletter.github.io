---
title: Introduction
description: Plume is a self-hosted newsletter platform you buy once and run on your own PHP hosting.
---

Plume is a complete, self-hosted email-marketing application. You buy it once on CodeCanyon,
install it on your own server, and own it outright — no monthly SaaS fees, no per-subscriber
pricing, and no data leaving your host.

It's built to run on ordinary shared hosting: PHP and MySQL, plus a single cron job. No Redis,
no background daemon, no build tools required on the server.

## What you get

- **Multi-brand** — run several sender identities (from name/email, reply-to, logo) from one
  install, with a quick brand switcher. Every list, subscriber, and campaign is scoped to its brand.
- **Lists & subscribers** — unlimited lists and subscribers, custom fields, search/filter, and
  CSV import (including Ghost member exports).
- **Segments** — build audiences from status and list-membership rules (match all or any) with
  a live subscriber-count preview.
- **Campaign builder** — a drag-and-drop block editor (headings, text, images, buttons, dividers,
  spacers, and more) with a live email preview and a gallery of ready-made templates. Output is
  sanitized, 600px-wide table HTML that renders correctly across email clients.
- **Sending** — send to a list or a segment through your own SMTP or Amazon SES. Delivery runs
  off the cron in the background with automatic retries; campaigns lock after sending.
- **Tracking & reports** — open and click tracking, per-campaign reports (open/click/unsubscribe
  rates, top links), and performance charts on the dashboard.
- **Signup forms & double opt-in** — every list gets a hosted signup form plus a copy-paste embed
  snippet for any site. New subscribers confirm via email before they're active, and one-click
  unsubscribe (RFC 8058) gives a clean resubscribe path.
- **AI copilot (optional)** — bring your own Anthropic API key to draft and refine campaigns
  conversationally. Plume works fully without it.
- **Automations** — welcome series, segment-entry drips, and signup-anniversary sends, authored
  in the same block builder and driven off the same one-minute cron.

## Requirements at a glance

- PHP **8.2+** with the extensions `pdo_mysql`, `openssl`, `mbstring`, `ctype`, `curl`,
  `fileinfo`, `dom`
- **MySQL 8** or **MariaDB 10.6+**
- One cron job (every minute)

Ready to install? Head to [Installation](/docs/installation/).
