---
title: Quickstart
description: Get Plume running locally and send your first test email in about five minutes.
---

Get Plume running locally and send your first test email in about five minutes.

## Prerequisites

You'll need **Docker** and **Docker Compose**. You do *not* need AWS to start — until you connect Amazon SES, Plume uses a built-in **log provider** that writes emails to stdout instead of sending them, so it runs with zero AWS setup. When you're ready to send for real, an SES access key and secret are entered in the app UI (see [Connecting Amazon SES](/docs/connecting-ses/)).

## 1. Clone

Clone the repo.

```bash
git clone https://github.com/plume-newsletter/plume.git
cd plume
```

## 2. Configure the environment

Plume is configured entirely through environment variables — there is no `.env.example` and no config file. The bundled `docker-compose.yml` sets the required variables for you; the ones you'll want to review are the first-admin bootstrap and the three secrets:

```yaml
environment:
  PLUME_DATABASE_URL: postgres://plume:plume@db:5432/plume?sslmode=disable
  PLUME_COOKIE_SECRET: change-me-to-at-least-32-bytes-long
  PLUME_SECRET_KEY: 32-byte-key-exactly-0123456789ab
  PLUME_ADMIN_EMAIL: you@example.com
  PLUME_ADMIN_PASSWORD: change-me
  PLUME_BASE_URL: http://localhost:8080
```

`PLUME_ADMIN_EMAIL` / `PLUME_ADMIN_PASSWORD` bootstrap the first admin user on the initial boot. See [Configuration](/docs/configuration/) for the full list.

## 3. Start the stack

Bring up Plume and PostgreSQL together. Migrations run automatically on every boot.

```bash
docker compose up -d

# → UI live at http://localhost:8080
```

:::tip
Visit `localhost:8080` and sign in with the admin email and password you set above. The first admin is created automatically on the initial boot — you don't create an account from the login screen.
:::

## 4. Create your brand

In the dashboard, add a [brand](/docs/brands-lists-campaigns/) with your from-address. Plume shows the DNS records to verify it — add them at your provider and Plume confirms automatically.

## 5. Send a test

With a draft campaign created, fire a test send. Create an API key under **Settings → API keys**, then call the campaign test endpoint. Pick your language:

```bash
# cURL
curl -X POST http://localhost:8080/api/campaigns/cmp_123/test \
  -H "Authorization: Bearer plume_xxx" \
  -H "Content-Type: application/json" \
  -d '{"to":"you@example.com"}'
```

```js
// JavaScript
await fetch("http://localhost:8080/api/campaigns/cmp_123/test", {
  method: "POST",
  headers: {
    "Authorization": "Bearer plume_xxx",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ to: "you@example.com" }),
});
```

```go
// Go
req, _ := http.NewRequest("POST",
    "http://localhost:8080/api/campaigns/cmp_123/test",
    strings.NewReader(`{"to":"you@example.com"}`))
req.Header.Set("Authorization", "Bearer plume_xxx")
req.Header.Set("Content-Type", "application/json")
http.DefaultClient.Do(req)
```

## Troubleshooting

:::caution[Email rejected?]
While SES is in sandbox mode you can only send to verified addresses. (Before SES is configured at all, the log provider just prints the message to stdout — nothing is rejected.) See [Connecting Amazon SES](/docs/connecting-ses/) to leave the sandbox.
:::
