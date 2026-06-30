---
title: Sending & the worker
description: How Plume hands campaigns to an in-process background worker that drips mail to SES within your rate limits.
---

When you send a campaign, Plume hands it to a background **send worker** that drips mail to SES within your rate limits — resilient and resumable. The worker is a goroutine running inside the single Plume process, not a separate process you deploy.

## The send pipeline

1. Campaign is queued and the recipient list is snapshotted
2. Suppressed addresses are filtered out
3. The worker batches messages and calls SES
4. Delivery, opens, and clicks stream back as events

## Rate limiting

The worker respects your SES send rate. It never bursts past your quota, so you won't get throttled.

## Retries

Transient SES errors are retried with backoff. If the worker restarts mid-send, it resumes exactly where it left off — no duplicates, no gaps.

## Scheduling

Schedule a campaign for a future time, or let the [AI assistant](/docs/additional-features/) suggest the best send window based on your list's past engagement.
