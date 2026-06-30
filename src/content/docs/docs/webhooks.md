---
title: Outbound webhooks
description: Have Plume POST signed JSON event payloads to your own URL — no code required.
---

Outbound webhooks let Plume notify an external service over HTTP when something happens. Unlike the [Go hook system](/docs/hooks/), webhooks need **no code** — you configure an endpoint in the UI (or via the API) and Plume POSTs JSON to it.

:::note
Webhook event names intentionally differ from the internal Go [hook](/docs/hooks/) names. Webhooks are the no-code, any-language integration path; hooks are for extending Plume in Go.
:::

## Configuring an endpoint

Add a webhook endpoint in the app, or manage endpoints through the [REST API](/docs/rest-api/) at `/api/webhooks`. Each endpoint has a URL, the events it subscribes to, and a **signing secret** used to authenticate deliveries.

## How delivery works

When a subscribed event fires, Plume sends a `POST` with a JSON body to your URL. Two headers describe the delivery:

- `X-Plume-Event` — the event name (for example, `campaign.sent`).
- `X-Plume-Signature` — an HMAC-SHA256 signature of the raw request body, keyed with the endpoint's signing secret.

:::caution[No retries]
Delivery is **best-effort and fire-and-forget**. There is no retry, no queue, and no delivery log — if your endpoint is down or returns an error, that event is gone. Make your handler fast and idempotent, and don't rely on webhooks for anything that must never be missed.
:::

## Event catalog

| Event | Fires when |
|---|---|
| `subscriber.created` | A subscriber is created |
| `subscriber.confirmed` | A subscriber confirms double opt-in |
| `campaign.sent` | A campaign finishes sending |

## Verifying the signature

Compute the HMAC-SHA256 of the **raw request body** using your endpoint's signing secret, then compare it to the `X-Plume-Signature` header. Use a constant-time comparison.

```js
import crypto from "node:crypto";

function verify(rawBody, signature, secret) {
  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(expected),
    Buffer.from(signature),
  );
}

app.post("/plume-webhook", (req, res) => {
  if (!verify(req.rawBody, req.get("X-Plume-Signature"), SECRET)) {
    return res.sendStatus(401);
  }
  const event = req.get("X-Plume-Event");
  // handle event...
  res.sendStatus(200);
});
```

Always verify the signature before trusting a payload — it's the only thing proving the request came from your Plume install.
