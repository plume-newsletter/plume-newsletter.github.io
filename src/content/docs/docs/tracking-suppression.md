---
title: Tracking & suppression
description: How Plume captures opens, clicks, bounces, and complaints, then auto-suppresses bad addresses.
---

Plume captures engagement and feedback from SES, then auto-suppresses bad addresses to keep your reputation healthy.

## Opens & clicks

A tracking pixel records opens via `GET /t/{recipientId}`. Links are rewritten through Plume to record clicks before redirecting, via `GET /l/{linkId}/{recipientId}`. Both can be disabled per campaign for privacy-first sends.

## Bounces

SES reports hard and soft bounces through the `/webhook/ses` SNS feed. Hard bounces are suppressed immediately; soft bounces are retried before suppression.

## Complaints

When a recipient marks mail as spam, SES sends a complaint notification over the same `/webhook/ses` feed. Plume suppresses the address and records the event against the campaign.

## Auto-suppression

:::caution
Hard bounces, complaints, and unsubscribes are auto-suppressed. Suppressed addresses are never emailed again, across all campaigns, until you explicitly remove them — suppression is enforced at send time. This is the single most important safeguard for staying out of spam folders.
:::
