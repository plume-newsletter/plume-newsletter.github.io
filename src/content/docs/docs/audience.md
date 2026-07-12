---
title: Audience
description: Brands, lists, subscribers, custom fields, segments, and importing from CSV or Ghost.
---

## Brands

Every list, subscriber, segment, and campaign belongs to a **brand** — a sender identity with its
own name, from-address, reply-to, and logo. A quick switcher in the header changes which brand
you're working in; nothing is shared or visible across brands. Manage brands under
**Settings → Brands**.

## Lists

Lists are the basic unit you send to. Create one under **Audience → Lists**, then open it to view
and manage its subscribers, or import a CSV. A list's subscriber count is shown on the list index.

## Subscribers

Each subscriber has one of three statuses:

- **pending** — signed up but hasn't confirmed (double opt-in) yet
- **active** — confirmed and eligible to receive campaigns
- **unsubscribed** — opted out; never sent to again

The subscribers table supports **search** (by email or name) and **filtering by status**. Add or
edit a subscriber directly, or remove one entirely.

### Custom fields

Type a field name (e.g. "Company", "Plan") into any subscriber's edit form and it's created
automatically the first time it's used — there's no separate field-management screen. Every
subscriber shares the same set of available fields; a value is only stored where you've filled
one in.

## Segments

A segment is a saved, live audience rule built from two condition types:

- **Status** — subscriber status is / is not `active`, `pending`, or `unsubscribed`
- **List membership** — subscriber is on / is not on a specific list

Combine multiple conditions with **match all** (AND) or **match any** (OR). The segment builder
shows a live preview — matching count, percentage of your total audience, and a sample of
matching subscribers — as you add or change conditions. Segments can be used as a
[campaign](/docs/campaigns/)'s audience or as an [automation](/docs/automations/) trigger.

## Importing subscribers

From a list's page, open **Import** and paste in CSV data. The `email` column is required;
`name` is recognized if present; any other column becomes a custom field automatically.

### Ghost member exports

If the CSV includes a `subscribed_to_emails` column (Ghost's members-export format), the import
is Ghost-aware: rows marked subscribed (`true`/`1`) import as **active**, and opted-out or blank
rows are **skipped** entirely — nothing pending gets created for them. Without that column, every
imported row lands as **pending**, same as a generic CSV, so it still goes through normal
confirmation before it's active.

Re-importing the same file is safe: a row whose email already exists updates that subscriber
(and its custom fields) instead of duplicating it.
