---
title: Sending email
description: Configure SMTP or Amazon SES in Settings → Mail so Plume can send campaigns.
---

Plume sends every campaign and confirmation email through **your own** mail credentials — nothing
routes through a third-party service you don't control. Configure this once in
**Settings → Mail**.

## Fields

| Field | Notes |
|---|---|
| Provider | `SMTP` or `Amazon SES (SMTP)` |
| Host | Your SMTP host. For SES, use `email-smtp.<region>.amazonaws.com`. |
| Port | Typically `587` (STARTTLS) or `465` (implicit TLS). |
| Username | Your SMTP username (for SES, the SMTP username from your SES SMTP credentials, not your AWS access key). |
| Password | Your SMTP password. Leave blank when editing to keep the currently saved password. |
| From address | The email address campaigns and confirmations send from. |
| From name | The display name recipients see. |

## Amazon SES

SES doesn't use your AWS access keys directly — generate a dedicated set of **SMTP credentials**
from the SES console and enter those as the username and password above, with host
`email-smtp.<region>.amazonaws.com`.

## Send a test

After saving, use the **Send a test email** box on the same page to confirm delivery end to end
before you send anything to real subscribers.

## Match your from-address domain

Whichever provider you use, make sure the domain in your **From address** matches the domain
you've verified and set up SPF/DKIM for at that provider. A mismatched domain is the most common
reason mail lands in spam or gets rejected outright — check your provider's domain verification
settings if deliverability looks off.
