---
title: Sending & the worker
description: How Plume hands campaigns to an in-process background worker that drips mail to your configured email provider within your rate limits.
---

When you send a campaign, Plume hands it to a background **send worker** that drips mail to your configured email provider (SES or SMTP) within your rate limits — resilient and resumable. The worker is a goroutine running inside the single Plume process, not a separate process you deploy.

## The send pipeline

1. Campaign is queued and the recipient list is snapshotted
2. Suppressed addresses are filtered out
3. The worker batches messages and calls your configured provider
4. Delivery, opens, and clicks stream back as events

## Choosing recipients

The send dialog has **List** and **Segment** tabs — pick one target, not both. Sending to a list mails everyone on it (minus suppressions, below); sending to a [segment](/docs/additional-features/) mails only the subscribers currently matching its rules, and only those with `active` status — a segment built on, say, "opened in the last 30 days" never reaches a pending or unsubscribed address, even if its rules would otherwise match one. Suppression filtering and per-recipient one-click unsubscribe work exactly the same either way.

## Rate limiting

The worker respects your provider's send rate. It never bursts past your quota, so you won't get throttled.

## Retries

Transient provider errors are retried with backoff. If the worker restarts mid-send, it resumes exactly where it left off — no duplicates, no gaps.

## Scheduling

Schedule a campaign for a future time, or let the [AI assistant](/docs/additional-features/) suggest the best send window based on your list's past engagement.
