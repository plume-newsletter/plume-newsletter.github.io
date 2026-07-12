---
title: Tracking & reports
description: Open and click tracking, per-campaign reports, the dashboard, and one-click unsubscribe.
---

## Open and click tracking

Every campaign email gets a per-recipient, signed tracking pixel and per-link click URLs
rewritten into it at send time. Opening the email or clicking a link records the event against
that specific recipient — nothing relies on a third-party tracking service.

## Campaign reports

Each sent [campaign](/docs/campaigns/) has its own report page showing:

- **Opens over the first 48 hours** — an hourly timeline starting from the campaign's first
  send, so you can see engagement as it rolls in.
- **Top links** — the five most-clicked links in the campaign, with click counts.
- **Rates** — unique open rate and unique click rate, each calculated against the number of
  emails actually sent (not queued or failed).

## Dashboard

The dashboard gives a running view across your whole brand:

- **Subscriber growth** over the last 30 days.
- **Send volume** over the last 14 days (emails actually delivered per day).
- **Recent campaigns** — your last 5 queued or sent campaigns with their open and click rates,
  so you can compare performance at a glance without opening each report.

## Unsubscribe

Every campaign email carries `List-Unsubscribe` and `List-Unsubscribe-Post` headers per
[RFC 8058](https://www.rfc-editor.org/rfc/rfc8058) — mail clients that support one-click
unsubscribe (Gmail, most major providers) can unsubscribe a recipient with no page load and no
confirmation click required.

Recipients who instead click the link directly land on a hosted unsubscribe page confirming
they're unsubscribed, with a link back to the signup form if they change their mind.

Once a subscriber is unsubscribed, their status flips immediately and they're excluded from any
send still in progress — the send worker checks status at send time, not just at queue time, so
an in-flight campaign never emails someone who unsubscribed after it was queued.
