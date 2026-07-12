---
title: The cron job
description: The single cron line Plume needs, and what it powers.
---

Plume needs exactly **one** cron job, running every minute:

```
* * * * * php /path/to/your/site/artisan schedule:run >> /dev/null 2>&1
```

Replace `/path/to/your/site` with the full path to your Plume installation (the folder that
contains `artisan`, one level above `public/`).

## Adding it in cPanel

1. Log in to cPanel and open **Cron Jobs**.
2. Under **Add New Cron Job**, set the schedule to **Common Settings → Once Per Minute**
   (`* * * * *`).
3. Paste the command above into the **Command** field, with your real path substituted in.
4. Click **Add New Cron Job**.

## What it powers

This single cron line drives everything time-based in Plume:

- Campaign sending
- Double-opt-in confirmation emails
- Automations (welcome series, drips, anniversary sends)
- Any other scheduling in the app

**Nothing sends without it.** If campaigns sit stuck, confirmation emails never arrive, or
automations don't fire, the cron job is the first thing to check.
