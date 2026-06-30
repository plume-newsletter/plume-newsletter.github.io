---
title: Running Plume
description: Plume is a single server process with no subcommands — run it and it does everything.
---

Plume is a **single server process**. There are no subcommands: running the binary starts the HTTP server, and everything else happens inside that one process. There is no `plume serve`, `plume migrate`, `plume import`, or `plume worker`.

## What happens on startup

When you run Plume (the binary or `docker compose up`), it:

- Starts the HTTP server on port `8080`.
- Auto-runs the embedded [goose](https://github.com/pressly/goose) database migrations.
- Bootstraps the admin user from the environment (see [Configuration](/docs/configuration/)).
- Launches the **send worker** and the **automation worker** as in-process goroutines.

CSV import is **not** a command — it's the API endpoint `POST /api/lists/{listId}/import` (or the importer in the UI). See the [REST API reference](/docs/rest-api/).

## How to run it

### Docker (recommended)

```bash
docker compose up -d
```

### Prebuilt binary

Download a release binary, set the [environment variables](/docs/configuration/), and run it:

```bash
./plume
```

### From source (development)

```bash
go run ./cmd/plume
```

## Configuration

All configuration is through environment variables — there is no config file and no `.env.example`. See [Configuration](/docs/configuration/) for the full list of `PLUME_*` variables.

## Health check

Plume serves a health endpoint at `GET /health`, suitable for load-balancer and container health probes.
