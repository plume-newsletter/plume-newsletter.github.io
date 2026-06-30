---
title: REST API reference
description: A JSON REST API under /api that covers everything the Plume UI can do.
---

Plume exposes a JSON REST API that covers everything the UI can do. The base path is `/api` (relative to your install's URL) — there is no `/api/v1`.

## Authentication

Authenticate with either:

- An **API key** in an `Authorization: Bearer <api key>` header, or
- The **session cookie** set when you log in to the UI.

API keys are created in the UI under **Settings → API keys**. They are prefixed `plume_`, **shown only once** at creation, and stored only as a SHA-256 hash — Plume can never display the key again. A key acts as the workspace owner, so it has the same access the owner does. There is no `X-API-Key` header.

```bash
curl https://your-plume.example.com/api/subscribers \
  -H "Authorization: Bearer plume_xxx"
```

## Auth & health

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/login` | Log in, set the session cookie |
| `POST` | `/api/logout` | Log out |
| `GET` | `/api/me` | Current user |
| `GET` | `/health` | Health check (unauthenticated) |

## Brands

`GET` / `POST` / `PUT` / `DELETE` on `/api/brands` — full CRUD over sender identities.

## Lists

CRUD on `/api/lists`, plus CSV import:

| Method | Path | Description |
|---|---|---|
| `GET` `POST` `PUT` `DELETE` | `/api/lists` | List CRUD |
| `POST` | `/api/lists/{listId}/import` | Import subscribers from a CSV |

## Subscribers

CRUD on `/api/subscribers`.

```json
{
  "id": "sub_8f2a",
  "email": "sofia@example.com",
  "status": "subscribed",
  "lists": ["product-news"]
}
```

## Campaigns

CRUD on `/api/campaigns`, plus send/test/report actions:

| Method | Path | Description |
|---|---|---|
| `GET` `POST` `PUT` `DELETE` | `/api/campaigns` | Campaign CRUD |
| `POST` | `/api/campaigns/{id}/test` | Send a test email |
| `POST` | `/api/campaigns/{id}/send` | Send the campaign |
| `GET` | `/api/campaigns/{id}/report` | Fetch the campaign report |

## Analytics

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/analytics/overview` | Aggregate engagement overview |
| `GET` | `/api/analytics/deliverability` | Deliverability metrics |

## Settings

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/settings` | Read workspace settings |
| `PUT` | `/api/settings/ses` | Configure Amazon SES credentials |
| `PUT` | `/api/settings/ai` | Configure the AI assistant key |

## Other endpoints

The rest of the product is exposed under the same base path, including: `/api/api-keys`, [`/api/webhooks`](/docs/webhooks/), `/api/segments`, `/api/ab-tests`, `/api/automations`, `/api/templates`, `/api/signup-forms`, `/api/team`, `/api/ai/*`, and `/api/blocks/render`.

## Public (unauthenticated) flows

These power the subscriber-facing surface and the SES feedback loop. They are not under `/api` and need no key:

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/subscribe/{listId}` | Public subscribe |
| `GET` | `/confirm/{subscriberId}` | Confirm double opt-in |
| `GET` `POST` | `/u/{recipientId}` | Unsubscribe |
| `GET` | `/f/{id}` | Hosted signup form |
| `POST` | `/webhook/ses` | SNS bounce/complaint feedback |

## Errors

Errors use standard HTTP status codes with a JSON body:

```json
{ "error": "message" }
```

A `401` means a missing or invalid key (or no session); a `422` means validation failed.
