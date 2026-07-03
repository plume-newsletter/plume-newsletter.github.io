---
title: Configuration
description: Configure Plume entirely through environment variables, with UI-entered secrets encrypted at rest.
---

Plume is configured entirely through environment variables. There is no `.env.example`, no config file, and no `.env` loading — set the variables in your process environment (or your `docker-compose.yml`). Everything has a sensible default except your database URL and the two signing/encryption secrets.

## Required

| Variable | Notes |
|---|---|
| `PLUME_DATABASE_URL` | Postgres connection string (DSN). The app exits at startup if it is unset. |
| `PLUME_COOKIE_SECRET` | Key used to sign session cookies. Must be **at least 32 bytes**. |
| `PLUME_SECRET_KEY` | AES key that encrypts stored secrets at rest. Must be **exactly 32 bytes**. |

## Optional

| Variable | Notes |
|---|---|
| `PLUME_ADMIN_EMAIL` | Bootstraps the first admin user on the initial boot. No-op if an admin already exists. |
| `PLUME_ADMIN_PASSWORD` | Password for the bootstrap admin user. |
| `PLUME_BASE_URL` | Public URL used in email links. Default `http://localhost:8080`. |
| `PLUME_ADDR` | Listen address. Default `:8080`. |
| `PLUME_SECURE_COOKIES` | Set to `true` to mark cookies `Secure` (use when serving behind HTTPS). |

:::caution[Key lengths matter]
`PLUME_COOKIE_SECRET` must be **at least 32 bytes**, and `PLUME_SECRET_KEY` must be **exactly 32 bytes**. Plume will not start with keys of the wrong length.
:::

## Secrets are entered in the UI

Provider credentials are **not** environment variables. Your email provider credentials — Amazon SES (region, access key id, secret) or SMTP (host, port, username, password) — and your Anthropic API key for the [AI assistant](/docs/additional-features/) are entered in the app under **Settings**. Plume encrypts them at rest with AES using `PLUME_SECRET_KEY`, so they are never stored in plaintext and never live in your shell history or compose file.

This means there are no `SES_*`, `SMTP_*`, `AWS_*`, or Anthropic-key environment variables — connect those providers from the running app instead. See [Connecting Amazon SES](/docs/connecting-ses/) or [Email providers](/docs/email-providers/) for SMTP.

:::note
Because `PLUME_SECRET_KEY` decrypts every stored secret, keep it stable and backed up. Rotating or losing it makes previously encrypted provider and Anthropic credentials unreadable, and you'll need to re-enter them.
:::
