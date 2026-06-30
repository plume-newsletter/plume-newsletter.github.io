---
title: Brands, lists & campaigns
description: The three core objects that model everything Plume does, and how they relate.
---

Three objects model everything Plume does. Understanding how they relate makes the rest of the product click.

## Brands

A **brand** is a sender identity: a from-name, from-address, reply-to, and verified sending domain. Run multiple brands from one Plume install — each keeps its own reputation and DNS setup.

## Lists

A **list** is a collection of subscribers who opted in to hear from a brand. Lists own consent and unsubscribe state; a subscriber can belong to several.

## Campaigns

A **campaign** is one HTML email sent from a brand to a list (or a [segment](/docs/subscribers/) of it). Campaigns carry their own tracking and per-send cost report.

## How they relate

```text
Brand ──owns──▶ List ──holds──▶ Subscribers ;  Campaign ──targets──▶ List
```
