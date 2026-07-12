---
title: Automations
description: Trigger-based email sequences — list subscribe, segment entry, and signup anniversary.
---

Automations are multi-step sequences built in the same block editor as campaigns, but triggered
automatically instead of sent by hand.

## Triggers

Each automation has exactly one trigger, chosen when you create it:

- **On list subscribe** — a subscriber confirms their subscription to a specific list.
- **On segment entry** — a subscriber newly matches a specific segment's conditions.
- **On anniversary** — a subscriber's signup date matches today's month and day.

:::note
The list-subscribe trigger fires at **double opt-in confirmation**, not at the moment a
subscriber is added. A subscriber added manually, via CSV import, or via a Ghost import does
**not** enroll — only a subscriber who clicks the confirmation link in their own signup email
does. This keeps automations tied to genuine, confirmed consent.
:::

Segment-entry automations only enroll subscribers who join the segment *after* the automation is
published — existing matching subscribers at publish time are treated as a baseline and skipped.
Anniversary automations enroll each active subscriber once, on the next occurrence of their
signup month and day.

## Steps

Build the sequence from two step types:

- **Send** — an email with its own subject line and blocks, built the same way as a campaign.
- **Wait** — a delay, in hours or days, before the next step runs.

## Draft, live, paused

An automation starts as a **draft**, where you can freely edit its steps. **Publish** it to go
**live** — publishing validates that every send step has a subject and at least one block, and
that the automation has at least one step. A live automation's steps are locked; **pause** it
first if you need to make changes, then publish again.

## Tracking

Each send step tracks its own **sent**, **open**, and **click** counts and rates independently,
so you can see which step in the sequence is performing — the same open-pixel and click-tracking
mechanism used for campaigns (see [Tracking & reports](/docs/tracking-reports/)).

## What drives it

Enrollment and step advancement both run off the same one-minute cron job that drives campaign
sending — see [The cron job](/docs/cron/). Nothing in an automation fires without it.
