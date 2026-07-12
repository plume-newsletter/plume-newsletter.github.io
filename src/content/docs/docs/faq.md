---
title: FAQ
description: Common questions about licensing, hosting, sending, and the AI copilot.
---

### What's the license?

Plume is sold under the CodeCanyon (Envato Market) commercial license — a one-time purchase, not
a subscription. Your purchase entitles you to use it per the license tier you bought; please
don't redistribute the code.

### What do I need to host it?

PHP 8.2+ (with `pdo_mysql`, `openssl`, `mbstring`, `ctype`, `curl`, `fileinfo`, and `dom`),
MySQL 8 or MariaDB 10.6+, and a single cron job. See [Installation](/docs/installation/) for the
full walkthrough.

### My emails aren't sending — what do I check?

Two things, in order:

1. Confirm your cron job is actually running — see [The cron job](/docs/cron/). Nothing sends
   without it.
2. Go to Settings → Mail and click **Send test** to verify your SMTP or SES credentials work.

### Can I try it before I buy?

Yes — the live demo is at [demo.plumenewsletter.com](https://demo.plumenewsletter.com). It
resets hourly, and login credentials are shown right on the demo's login page.

### Does the AI copilot cost extra?

No, but it's optional and bring-your-own-key: paste your own Anthropic API key in Settings → AI
to enable it. Plume works fully without it — nothing else in the app requires a key. The copilot
defaults to the `claude-sonnet-5` model.

### Where do I get support?

Support is provided per your CodeCanyon support terms. When you reach out, include your PHP and
MySQL versions and any relevant lines from `storage/logs/laravel.log` — it speeds things up
considerably.
