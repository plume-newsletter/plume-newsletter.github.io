---
title: Connecting Amazon SES
description: Connect your own Amazon SES account to send mail, verify a domain, leave the sandbox, and wire up feedback.
---

Plume sends through your own SES account using AWS SES v2. This page walks through credentials, domain verification, leaving the sandbox, and feedback.

Not on AWS? Plume also sends through [any SMTP provider](/docs/email-providers/) — Mailgun, SendGrid, Postmark, Resend, and more.

Your SES credentials — region, access key id, and secret — are entered in the app under **Settings**, not as environment variables. Plume stores them AES-encrypted at rest. Until you configure SES, Plume uses a built-in **log provider** that prints emails to stdout instead of sending them, so you can develop and test with zero AWS setup.

## Create IAM credentials

In AWS IAM, create a user with programmatic access and attach a policy scoped to SES send actions. Plume only needs to send mail and read sending statistics.

```json
{
  "Effect": "Allow",
  "Action": ["ses:SendEmail", "ses:SendRawEmail"],
  "Resource": "*"
}
```

Enter the resulting access key id, secret, and region in **Settings**. Plume encrypts them before saving.

## Verify a domain

Add your brand in Plume and it generates the DKIM and SPF records to publish at your DNS provider. Plume polls SES and flips the brand to *verified* automatically — usually within 30 minutes.

## Leave the sandbox

:::note
New SES accounts start in **sandbox mode** — you can only send to verified addresses, capped at 200/day. Request production access from the SES console to lift both limits.
:::

## Configure feedback

Bounce and complaint feedback reaches Plume through an **SNS webhook**. Point an SNS topic at Plume's feedback endpoint:

```text
POST https://your-host/webhook/ses
```

Note that this is a root path (`/webhook/ses`), not under `/api`. Plume processes the SNS notifications and updates suppression automatically — see [Tracking & suppression](/docs/tracking-suppression/).

:::caution[Confirm the SNS subscription]
SNS subscription confirmation is **not** automatic. When you create the subscription, SNS sends a confirmation message containing a `SubscribeURL`. Plume logs that URL — an operator must visit it once to confirm the subscription before feedback starts flowing.
:::
