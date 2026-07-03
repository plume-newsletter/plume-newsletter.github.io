---
title: Migrating to Plume
description: Bring your audience over from Sendy, Mailchimp, or anywhere that can export a CSV.
---

Bring your audience over from Sendy, Mailchimp, or anywhere that can export a CSV. Plume keeps consent state intact.

## From Sendy

Export each Sendy list to CSV from the brand dashboard. Sendy's columns map cleanly to Plume's email, name, and custom fields — and since both send via Amazon SES, your domain reputation carries over.

## From Mailchimp

Export your audience as CSV from Mailchimp (**Audience → Export**). Only import contacts marked *subscribed* — Plume won't email cleaned or unsubscribed addresses, but importing them anyway just adds them as suppressed.

## Export your data

Most platforms put email, name, and merge fields in the first columns. Keep the header row — you'll map it during import.

## Import into Plume

Use the in-app CSV importer (see [Subscribers & opt-in](/docs/subscribers/)) or, for automation and large lists, the API endpoint `POST /api/lists/{listId}/import` (see the [REST API reference](/docs/rest-api/)). Plume dedupes against existing subscribers and reports skipped or invalid rows.

:::note
Already opted-in contacts can skip Plume's double opt-in — toggle *existing consent* during import so you don't re-confirm a warm list.
:::

## Connecting an email provider

Plume sends through your own email provider — Amazon SES or any SMTP provider — configured **in the app UI** under **Settings**, not through environment variables. The only environment configuration Plume reads is the eight `PLUME_*` variables (there is no `.env.example`). See [Configuration](/docs/configuration/), [Connecting Amazon SES](/docs/connecting-ses/), and [Email providers](/docs/email-providers/) before your first send.
