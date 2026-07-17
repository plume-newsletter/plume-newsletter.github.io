---
title: The cron job
description: The single cron line Plume needs, and what it powers.
---

Plume needs exactly **one** cron job, running every minute:

```
* * * * * cd /path/to/your/site && php artisan schedule:run >> /dev/null 2>&1
```

Replace `/path/to/your/site` with the full path to your Plume installation (the folder that
contains `artisan`, one level above `public/`) — typically `/home/yourusername/plume`.

The last screen of the installer prints this line with your real path already filled in. Copy it
from there rather than typing it out.

## Adding it in cPanel

1. Log in to cPanel and open **Cron Jobs**.
2. Under **Add New Cron Job**, set the schedule to **Common Settings → Once Per Minute**
   (`* * * * *`).
3. Paste the command into the **Command** field.
4. Click **Add New Cron Job**.

## If nothing sends, check the `php` path first

The command starts with `php`. On some cPanel hosts, `php` inside a cron job points at an **older
PHP version** than the one your site runs — even after you've set 8.2 in MultiPHP Manager. The job
runs, fails silently, and nothing sends.

To fix it, open **Select PHP Version** in cPanel and copy the full path it shows for your PHP
binary — typically something like:

```
/opt/cpanel/ea-php82/root/usr/bin/php
```

Then edit your cron job and replace the leading `php` with that full path:

```
* * * * * cd /home/yourusername/plume && /opt/cpanel/ea-php82/root/usr/bin/php artisan schedule:run >> /dev/null 2>&1
```

Paths differ between hosts. If you can't find it, your host's support can tell you the correct one
in seconds — it's a common question.

## What it powers

This single cron line drives everything time-based in Plume:

- Campaign sending
- Double-opt-in confirmation emails
- Automations (welcome series, drips, anniversary sends)
- Any other scheduling in the app

**Nothing sends without it.** If campaigns sit stuck, confirmation emails never arrive, or
automations don't fire, the cron job is the first thing to check.
