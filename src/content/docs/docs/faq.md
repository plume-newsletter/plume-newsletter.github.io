---
title: FAQ & troubleshooting
description: Quick answers to the things people hit most when running Plume.
---

Quick answers to the things people hit most. Still stuck? Open a discussion on [GitHub](https://github.com/plume-newsletter/plume).

## Common errors

### "Email address not verified"

Amazon SES is still in sandbox mode. Verify the recipient or request production access — see [Connecting Amazon SES](/docs/connecting-ses/). SES credentials are entered in the app UI under **Settings**, not as environment variables.

### "Database connection refused"

Check `PLUME_DATABASE_URL` and that Postgres is reachable from the container or host. Plume exits at startup if the database URL is unset, and it runs its embedded migrations automatically on every boot — there's no separate migrate step.

### Tracking links point to localhost

Set `PLUME_BASE_URL` to your public HTTPS URL so rewritten tracking and unsubscribe links resolve for recipients.

## Deliverability

Keep your bounce rate under 5% and complaints under 0.1% — Plume's auto-suppression handles most of this for you. Always authenticate your sending domain with DKIM, SPF, and DMARC.

## Performance

Plume runs as a **single process** with the send worker and automation worker as in-process goroutines. One instance comfortably handles lists in the hundreds of thousands; the send worker drips to SES within your configured rate so you never burst past your quota. There is no separate worker process to run or scale — sending throughput is governed by your SES rate limit, not by Plume.
