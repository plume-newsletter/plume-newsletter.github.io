---
title: n8n integration
description: Automate Plume with n8n — trigger workflows on subscriber events and manage subscribers and campaigns from any workflow.
---

Plume ships an official [n8n](https://n8n.io) community node: [`n8n-nodes-plume`](https://www.npmjs.com/package/n8n-nodes-plume).

## Install

In self-hosted n8n: **Settings → Community Nodes → Install** and enter `n8n-nodes-plume`.

## Connect

1. In Plume, create an API key: **Settings → API Keys → New key**. The `plume_...` key is shown once.
2. In n8n, add **Plume API** credentials: your instance URL (e.g. `https://news.example.com`) and the key. The credential test verifies both immediately.

## Trigger workflows from Plume

The **Plume Trigger** node starts workflows on:

| Event | Fires when |
|---|---|
| `subscriber.created` | A subscriber is added (API, form, import, or manually) |
| `subscriber.confirmed` | A subscriber completes double opt-in |
| `campaign.sent` | A campaign finishes enqueueing to all recipients |

Activating the workflow registers a webhook endpoint on your Plume instance automatically; deactivating removes it. Every delivery is HMAC-signed by Plume and verified by the node — forged requests never start your workflow.

## Act on Plume from workflows

The **Plume** node exposes:

- **Subscriber → Create** — add a subscriber to a list (list picker included)
- **Subscriber → Unsubscribe** — set a subscriber's status to unsubscribed
- **Campaign → Create Draft** — brand, subject, HTML body
- **Campaign → Send** — send an existing campaign to a **list or segment**
- **List / Segment → Get Many** — fetch for downstream logic

## Example: paid subscribers segment

Stripe Trigger (new payment) → **Plume: Create Subscriber** into your "Customers" list → your `Customers` segment powers a members-only campaign via **Campaign → Send**.

## Roadmap

More trigger events (opens, clicks, bounces) will land as the webhook catalog grows — the node picks them up by version bump.
