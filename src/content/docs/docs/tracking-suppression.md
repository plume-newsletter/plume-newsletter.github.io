---
title: Tracking & suppression
description: How Plume captures opens, clicks, bounces, and complaints, then auto-suppresses bad addresses.
---

Opens and clicks are tracked on any email provider. Automatic bounce and complaint suppression, described below, requires Amazon SES — see [Email providers](/docs/email-providers/) for the full comparison.

## Opens & clicks

A tracking pixel records opens via `GET /t/{recipientId}`. Links are rewritten through Plume to record clicks before redirecting, via `GET /l/{linkId}/{recipientId}`. Both can be disabled per campaign for privacy-first sends. This works the same regardless of which email provider is active.

## Bounces

:::note[SES only]
Automatic bounce tracking requires Amazon SES. SES reports hard and soft bounces through the `/webhook/ses` SNS feed. Hard bounces are suppressed immediately; soft bounces are retried before suppression. If you send through SMTP instead, watch your provider's own bounce dashboard — see [Email providers](/docs/email-providers/).
:::

## Complaints

:::note[SES only]
Automatic complaint tracking also requires Amazon SES. When a recipient marks mail as spam, SES sends a complaint notification over the same `/webhook/ses` feed. Plume suppresses the address and records the event against the campaign.
:::

## Auto-suppression

:::caution
Hard bounces, complaints, and unsubscribes are auto-suppressed. Suppressed addresses are never emailed again, across all campaigns, until you explicitly remove them — suppression is enforced at send time. This is the single most important safeguard for staying out of spam folders. Automatic bounce/complaint suppression works with **SES only** today; unsubscribes are suppressed on every provider.
:::
