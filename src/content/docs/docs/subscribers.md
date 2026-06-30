---
title: Subscribers & opt-in
description: Add subscribers one at a time, import a CSV, or collect them through double opt-in — always with consent tracked.
---

Add people one at a time, import a CSV, or collect them through a signup form — always with consent tracked.

## Adding subscribers

Add individuals from the dashboard or via the [API](/docs/rest-api/). Each subscriber stores an email, optional name, custom fields, and per-list consent state.

## CSV import

Upload a CSV and map columns to fields. CSV import is an in-app action — Plume dedupes against existing subscribers and reports skipped or invalid rows. The importer posts to `POST /api/lists/{listId}/import`.

```csv
email,name,plan
sofia@example.com,Sofia Chen,pro
marcus@example.com,Marcus Reid,free
```

## Double opt-in

:::tip
With double opt-in, new subscribers receive a confirmation email and only become active after clicking through — the cleanest way to protect deliverability and stay compliant.
:::

The public flow is a `POST /subscribe/{listId}` that creates a pending subscriber and sends the confirmation email, followed by `GET /confirm/{subscriberId}` when the recipient clicks the link — which marks them confirmed.

## Custom fields

Define fields like `plan` or `country` and use them to personalize campaigns or build [segments](/docs/additional-features/).
