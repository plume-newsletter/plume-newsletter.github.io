---
title: Installation
description: Install Plume on shared hosting (cPanel) or a VPS in about five minutes.
---

## Requirements

- PHP **8.2+** with the extensions `pdo_mysql`, `openssl`, `mbstring`, `ctype`, `curl`,
  `fileinfo`, `dom`
- **MySQL 8** or **MariaDB 10.6+**
- Ability to add **one** cron job

## Shared hosting (cPanel)

1. Upload the zip to your host and extract it. Point your (sub)domain's document root at the
   `public/` folder.
2. Visit your domain in a browser — the installer opens automatically.
3. Follow the 4 steps: **requirements** → **database** → **tables** → **admin account**.
4. Add the cron line shown on the final screen (cPanel → Cron Jobs). See
   [The cron job](/docs/cron/) for the exact line and what it powers.

:::caution
The web installer is **unauthenticated** until it completes. As soon as you extract the zip and
visit your domain, finish all 4 steps immediately — don't leave the install page sitting there.
It self-locks the moment you finish step 4 and can't be run again after that.
:::

## VPS / Docker

Copy `.env.example` to `.env`, fill in your `DB_*` values, then run:

```
php artisan key:generate
php artisan migrate --force
```

Create your admin account through the same web installer, or run the app behind the included
Dockerfile. On a VPS, add the same one-minute cron for `php artisan schedule:run` (the Dockerfile
handles this for you automatically).

## After install

- **Mail (required to send):** go to Settings → Mail and enter your SMTP or Amazon SES SMTP
  credentials, then send a test. See [Sending email](/docs/email-sending/).
- **AI copilot (optional):** Settings → AI — paste your own Anthropic API key to enable the
  campaign copilot. Plume works fully without it.
- **Signup forms:** each list has a hosted signup form and a copy-paste embed snippet for
  double-opt-in subscriptions on any site — no API key needed.

## Troubleshooting

- **500 error on first visit** — check that `storage/` and `bootstrap/cache/` are writable by
  the web server.
- **Emails aren't sending** — confirm the cron job is running (see [The cron job](/docs/cron/)),
  then go to Settings → Mail and click Send test.
- **Confirmation or campaign emails are delayed** — they queue and drain on the one-minute
  scheduler cron. A missing or broken cron job stalls both.
