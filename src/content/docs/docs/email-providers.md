---
title: Email providers
description: Send through Amazon SES, Mailgun, SendGrid, Postmark, Resend, or any SMTP server.
---

Plume sends through one **active email provider**, chosen in **Settings → Email**.
Two provider types are supported:

- **Amazon SES** — the featured option: the cheapest way to send at volume
  ($0.10 per 1,000 emails) and the only provider with automatic
  bounce/complaint suppression today. See [Connecting SES](/docs/connecting-ses/).
- **SMTP** — any SMTP server: Mailgun, SendGrid, Postmark, Resend, a classic
  mail host, or your own relay. No AWS account required.

## Connect an SMTP provider

In **Settings → Email**, open the **SMTP** card and enter:

| Field | Value |
|---|---|
| SMTP host | your provider's SMTP endpoint (table below) |
| Port | 587 (default) or 465 |
| SMTP username | provider-specific (table below) |
| SMTP password | provider-specific API key or SMTP password |

Saving the form makes SMTP the active provider. Your password is stored
encrypted and never displayed.

### Common providers

| Provider | Host | Port | Notes |
|---|---|---|---|
| Mailgun | `smtp.mailgun.org` | 587 | SMTP credentials from the Mailgun dashboard |
| SendGrid | `smtp.sendgrid.net` | 587 | username is literally `apikey`; your API key goes in the password field |
| Postmark | `smtp.postmarkapp.com` | 587 | server API token as both username and password |
| Resend | `smtp.resend.com` | 465 | username `resend`, API key as password |

## Switching providers

Both credential sets can be stored at once; only one is active. Saving either
card's form activates that provider, and a configured-but-inactive card shows
a **Use this provider** button for switching without re-entering credentials.

## Security

- Port 465 uses implicit TLS. Every other port requires STARTTLS — Plume
  refuses to send credentials over an unencrypted connection.
- Emails keep their one-click unsubscribe headers (RFC 8058) on every
  provider, so Gmail/Yahoo bulk-sender compliance is identical to SES.

## Limitations with SMTP providers

Automatic bounce and complaint suppression works with **SES only** (via the
SNS webhook). When sending through SMTP, watch your provider's own
suppression/bounces dashboard — Plume's deliverability page shows only what
it can see. Native Mailgun/SendGrid event webhooks are on the roadmap.
