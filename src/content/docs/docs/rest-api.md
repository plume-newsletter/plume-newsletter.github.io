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

`POST /api/campaigns/{id}/send` takes a body with **exactly one** of `listId` or `segmentId` — sending to a segment resolves only its currently-matching, `active`-status subscribers:

```json
{ "segmentId": "3f9c2b7e-1a2b-4c3d-9e8f-0a1b2c3d4e5f" }
```

```json
{ "recipients": 4213 }
```

Both keys present, or neither, is a `400` (`provide exactly one of listId or segmentId`); an unknown list/segment/campaign is a `404`; a campaign that's already queued or sent is a `409`.

## Analytics

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/analytics/overview` | Aggregate engagement overview |
| `GET` | `/api/analytics/deliverability` | Deliverability metrics |

## AI

The [AI assistant](/docs/additional-features/) endpoints under `/api/ai/*`, including the campaign copilot. All of them require an Anthropic API key configured under **Settings → AI** — without one, every route in this section returns `400 AI not configured`.

`POST /api/ai/campaign` drafts or refines a campaign in one turn: send the chat history plus the editor's current state, get back a complete replacement draft.

```json
{
  "messages": [{ "role": "user", "content": "Black Friday promo, 20% off" }],
  "state": { "subject": "", "blocks": [], "audience": null }
}
```

```json
{
  "reply": "Drafted a Black Friday promo with a 20%-off code and a shop-now button.",
  "subject": "20% off, today only",
  "blocks": [
    { "type": "heading", "text": "Black Friday is here", "level": 1 },
    { "type": "text", "html": "<p>Take <strong>20% off</strong> everything, today only.</p>" },
    { "type": "button", "label": "Shop now", "href": "#", "align": "center" }
  ],
  "audience": null,
  "sendTimeAdvice": "Your last three campaigns opened best around 9am on weekdays."
}
```

`state.blocks` uses Plume's standard [block editor](/docs/additional-features/) JSON (`heading` / `text` / `image` / `button` / `divider` / `spacer`) — the AI never invents image URLs, leaving `src` empty with a descriptive `alt` for you to fill in. If the request implies a target audience ("send this to people who haven't opened in 30 days"), the response also includes `audience` (the same match/conditions shape as [segments](/docs/additional-features/)) and `audienceCount`; the UI lets you save that as a segment in one click. `sendTimeAdvice` is grounded in your own analytics and only appears when there's enough data to say something.

The server validates the model's blocks and audience before responding (retrying once internally on a bad draft) and returns `502 AI produced an invalid draft` rather than ever handing back something that would fail to render. This endpoint never sends email — it only returns a draft for you to review in the editor.

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
