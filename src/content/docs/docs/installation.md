---
title: Installation
description: Run Plume with Docker or as a single static Go binary alongside PostgreSQL.
---

Plume ships as a single static Go binary with the web UI embedded. Run it with Docker, or drop the binary next to PostgreSQL.

## Docker (recommended)

The compose file bundles Plume and Postgres with sensible defaults.

```yaml
services:
  plume:
    image: ghcr.io/plume-newsletter/plume:latest
    ports: ["8080:8080"]
    environment:
      PLUME_DATABASE_URL: postgres://plume:plume@db:5432/plume?sslmode=disable
      PLUME_COOKIE_SECRET: change-me-to-at-least-32-bytes-long
      PLUME_SECRET_KEY: 32-byte-key-exactly-0123456789ab
      PLUME_ADMIN_EMAIL: you@example.com
      PLUME_ADMIN_PASSWORD: change-me
      PLUME_BASE_URL: http://localhost:8080
    depends_on: [db]
  db:
    image: postgres:16
```

## Single binary

Prefer no Docker? Download a release binary and point it at a Postgres connection string. Configuration is by environment variable; running the binary starts the server, runs migrations, and launches the background workers.

```bash
curl -L https://github.com/plume-newsletter/plume/releases/latest/download/plume-linux-amd64 -o plume
chmod +x plume
PLUME_DATABASE_URL=postgres://localhost/plume \
PLUME_COOKIE_SECRET=change-me-to-at-least-32-bytes-long \
PLUME_SECRET_KEY=32-byte-key-exactly-0123456789ab \
  ./plume
```

### Behind a reverse proxy

Terminate TLS at nginx or Caddy and proxy to port 8080. Set `PLUME_BASE_URL` to your public HTTPS URL so tracking links and unsubscribe pages resolve correctly, and set `PLUME_SECURE_COOKIES=true` so session cookies are marked Secure.

## Database

Plume needs PostgreSQL 14 or newer. Migrations are embedded in the binary (goose) and run automatically at startup — there is no separate migrate step or command.

## Upgrading

Pull the new image (or binary) and restart. Migrations are forward-only and run on boot. Always check the [changelog](/docs/changelog/) for breaking notes before a major bump.
