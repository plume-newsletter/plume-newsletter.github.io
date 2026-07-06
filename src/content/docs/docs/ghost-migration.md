---
title: Migrate from Ghost
description: Move your Ghost audience into Plume in one upload — subscribed members import ready to email, opted-out members are skipped.
---

Bring your Ghost audience into Plume by uploading Ghost's members export. Your posts are handled separately by [RSS import](/docs/rss/) — this page covers subscribers.

## Export your members from Ghost

1. In Ghost Admin, open **Members**.
2. Click the **⋯** menu → **Export**. Ghost downloads a CSV of every member.

## Import into Plume

1. In Plume, open the **list** you want your Ghost members to land in (create one first if needed — it becomes your Ghost audience).
2. Click **Import CSV** and choose the file you exported from Ghost.
3. Plume reads the export and reports how many members were **imported**, **skipped**, and **failed**.

## What happens to each member

- **Subscribed members** (`subscribed_to_emails` = `true` in the export) import as **active** subscribers — they were already confirmed on Ghost, so you can send to them right away without a re-confirmation email.
- **Opted-out members** (`subscribed_to_emails` = `false`, or blank) are **skipped** and counted under *skipped*. Plume never emails someone who opted out on Ghost.
- **Duplicates** already in the list are skipped.

Ghost's other columns — labels, tiers, notes, Stripe data — are ignored. Only email, name, and subscription status are read.

The import is a point-in-time snapshot, not an ongoing sync. It reads the status in the file you upload; it doesn't keep watching Ghost. If someone unsubscribes on Ghost later, re-importing an older export won't change a member already in your Plume list — manage unsubscribes in Plume from then on.

## Bringing your posts across

New posts publish into Plume automatically once you [connect your Ghost RSS feed](/docs/rss/) (`https://yourblog.com/rss/`). Existing posts aren't back-filled; re-publish any you want as a fresh newsletter, or let RSS pick up new ones from here on.
