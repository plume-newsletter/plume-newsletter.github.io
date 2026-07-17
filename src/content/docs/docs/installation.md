---
title: Installation
description: Install Plume on shared hosting (cPanel) or a VPS. No command line needed — about 15 minutes.
---

Plume installs through your browser. No command line, no developer tools — if you can use cPanel's
File Manager, you can install it. Set aside about 15 minutes.

## What you need first

- **Web hosting with cPanel** and **PHP 8.2+**. Almost every shared host offers this; you may need
  to switch the PHP version (Step 1).
- **A MySQL 8 database** (or MariaDB 10.6+). Your host provides this — you'll create one in Step 4.
- **The ability to add one cron job.** Nearly all cPanel hosts allow this. Plume cannot send email
  without it.

Have your cPanel login ready — everything below happens inside it.

## Step 1 — Set PHP to 8.2 or newer

In cPanel, open **MultiPHP Manager**. Tick the domain you'll use, choose **PHP 8.2** (or newer),
and click **Apply**.

Do this first — if PHP is too old, the installer stops you at Step 5 anyway.

While you're there, open **Select PHP Version → Extensions** and confirm these are ticked:
`pdo_mysql`, `openssl`, `mbstring`, `ctype`, `curl`, `fileinfo`, `dom`. Most hosts enable all of
them by default.

## Step 2 — Upload and extract Plume

1. In cPanel, open **File Manager**.
2. Go to your **home directory** (`/home/yourusername`) — *not* `public_html`. This is deliberate.
3. Click **Upload**, choose `plume.zip`, and wait for it to finish.
4. Back in File Manager, right-click `plume.zip` → **Extract**.

You'll now have a `plume` folder in your home directory. You can delete the zip afterward.

:::note[Why not `public_html`?]
Only Plume's `public` folder should be reachable from the web. Everything else — your config, your
database password — must sit outside it. Step 3 wires this up properly.
:::

## Step 3 — Point a domain at Plume

In cPanel, open **Domains → Create A New Domain** (on some hosts: **Subdomains**).

- **Domain:** the address you want, e.g. `news.yourdomain.com`
- **Document Root:** untick "share document root", then enter **`plume/public`**

Click **Submit**. That `/public` on the end is the most important detail in this guide — without
it your site will be broken or unsafe.

:::caution[Using your main domain instead of a subdomain?]
cPanel usually won't let you re-point the primary domain's document root. Ask your host's support
to set it to `plume/public` — it's a routine request they'll handle in a minute. Don't move Plume's
files into `public_html` yourself.
:::

## Step 4 — Create the database

In cPanel, open **MySQL® Database Wizard** and follow its three screens:

1. **Database name:** type `plume`. cPanel saves it as `yourusername_plume` — that full name is
   what you'll need.
2. **Database user:** pick a username and let cPanel generate a strong password. **Copy the
   password somewhere safe now** — cPanel won't show it again.
3. **Privileges:** tick **ALL PRIVILEGES**, then **Next Step**.

Keep these four values handy for the next step:

| Field | Value |
|---|---|
| Database host | `localhost` |
| Database port | `3306` |
| Database name | `yourusername_plume` |
| Username / password | the ones you just made |

`localhost` and `3306` are correct on virtually every shared host. If your host runs a remote
database server, they'll have told you.

## Step 5 — Run the installer

Visit your domain in a browser (e.g. `https://news.yourdomain.com`). The installer opens
automatically and walks you through four screens:

1. **Requirements** — a checklist. Everything must be green; see [Troubleshooting](#troubleshooting)
   if not.
2. **Database** — enter the four values from Step 4. Plume tests the connection before continuing.
3. **Tables** — click the button; Plume builds its database and loads the email templates.
4. **Admin account** — your name, email, password (10+ characters), and your brand name.

:::caution[Finish all four screens in one sitting]
Until the installer completes, it's reachable by **anyone** who visits your domain. On the final
screen it locks itself permanently and can't be re-run. Don't upload the files and wander off.
:::

## Step 6 — Add the cron job (required)

The final installer screen shows a command. Copy it, then in cPanel open **Cron Jobs**, set
**Common Settings** to **Once Per Minute** (`* * * * *`), paste the command, and click **Add New
Cron Job**.

This one job is what actually sends your email. See [The cron job](/docs/cron/) for details and the
`php`-path fix if nothing sends.

## Step 7 — Turn on email

Nothing sends until you do this.

Go to **Settings → Mail**, enter your SMTP details (your host's SMTP, Amazon SES SMTP, or any
provider), and click **Send test**. Confirm the test arrives before touching a real campaign. See
[Sending email](/docs/email-sending/).

Optional, once mail works:

- **AI copilot** — Settings → AI. Paste your own Anthropic API key to enable the campaign copilot
  and inline copy help. Plume works fully without it; nothing else needs a key.
- **Signup forms** — every list has a hosted signup page plus a copy-paste embed snippet for
  double-opt-in subscriptions on any site. No API key needed.

## VPS / Docker

Copy `.env.example` to `.env`, fill in your `DB_*` values, then run:

```
php artisan key:generate
php artisan migrate --force
```

Create your admin through the same web installer, or run the app behind the included Dockerfile.
Point your web server's document root at `public/`. Add the same one-minute cron for
`php artisan schedule:run` (the Dockerfile handles this for you).

## Troubleshooting

**"500 Server Error" on the first visit**
`storage/` and `bootstrap/cache/` need to be writable. In File Manager, right-click each →
**Change Permissions** → `755`. Use **Recurse into subdirectories** on `storage/`.

**The requirements screen shows a red ".env writable" or "storage/ writable"**
Same fix — the `plume` folder itself must be writable so the installer can save your settings.
`755` is enough.

**I see a directory listing, "No input file specified", or Plume's source code**
Your document root points at `plume` instead of `plume/public`. Go back to Step 3 — the `/public`
is required.

**Emails aren't sending**
Check the cron job exists and runs once per minute, then read the `php`-path note on
[The cron job](/docs/cron/) — that's the most common cause on cPanel. Then Settings → Mail →
**Send test**.

**Confirmation or campaign emails are delayed**
They queue and drain on the one-minute cron. A missing or broken cron stalls both.

**Images I upload don't appear in emails**
See [Images in email](/docs/images-in-email/) — the storage shortcut didn't get created, and that
page has the fix.

**I need to re-run the installer**
By design, you can't — it locks after creating your admin. If you genuinely need to start over,
delete `storage/app/installed.lock` and `.env` in File Manager and empty your database. This wipes
your setup.
