---
title: Hook system
description: Extend Plume from Go with a WordPress-style in-process kernel of actions and filters.
---

Plume ships with a WordPress-style hook kernel (`internal/hooks`) that lets you run your own code on key events — without forking. Hooks are written in **Go**, compiled into your build, and registered in code. There is no configuration file or UI for them.

:::note
Hooks are for people **extending Plume in Go**. If you just want Plume to notify an external service over HTTP — in any language, with no code changes — use [outbound webhooks](/docs/webhooks/) instead. The two systems are distinct, and their event names intentionally differ.
:::

## What hooks are

A hook is a function you register against a named event. When Plume reaches that event it calls every handler that was registered for it. You bind handlers on the hook kernel — the `*hooks.Hooks` instance created with `hooks.New()` in `cmd/plume` — using `h.AddAction(...)` or `h.AddFilter(...)`, during startup wiring. There are two kinds.

## Actions

An **action** reacts to something that happened — a subscriber joins, a campaign finishes, an address bounces. Handlers run in ascending **priority** order, and the chain **stops on the first error**.

| Event | Fires when |
|---|---|
| `subscriber.added` | A subscriber is added |
| `subscriber.import_row` | A row is processed during CSV import |
| `subscriber.confirmed` | A subscriber confirms double opt-in |
| `subscriber.unsubscribed` | A subscriber opts out |
| `email.opened` | An open is recorded |
| `link.clicked` | A tracked link is clicked |
| `email.bounced` | An address bounces |
| `email.complained` | A recipient files a spam complaint |
| `campaign.sending` | A campaign starts sending |
| `campaign.sent` | A campaign finishes sending |

## Filters

A **filter** transforms a value and returns it. The handler receives the current value and must return a (possibly modified) value, which is passed to the next filter in the chain.

The only filter is **`render.email_html`**, which rewrites outgoing email HTML before it's sent. Plume's own built-in behaviors — the tracking pixel, the unsubscribe link, and click-tracking link rewriting — are themselves implemented as filters on `render.email_html`.

## Writing and registering a hook

Register your handlers at startup, where the kernel is wired up. Every handler has the same signature — it receives the payload as `any`, which you type-assert to the event's payload struct. An action handler returns an `error`; returning one stops the chain for that event.

```go
import (
	"context"

	"github.com/plume-newsletter/plume/internal/hooks"
	"github.com/plume-newsletter/plume/internal/signup"
)

// h is the *hooks.Hooks instance (hooks.New()) from cmd/plume.
func registerHooks(h *hooks.Hooks) {
	// priority 50 — lower numbers run earlier; the chain stops on the first error.
	h.AddAction(signup.HookConfirmed, 50, func(ctx context.Context, p any) error {
		sub := p.(signup.ConfirmedPayload).Subscriber // runs after double opt-in
		return crm.Upsert(ctx, sub.Email)
	})
}
```

A filter handler receives the current value (also as `any`) and returns the transformed value. For `render.email_html` the value is the email's HTML string:

```go
h.AddFilter(render.HookName, 50, func(ctx context.Context, value any) (any, error) {
	html := value.(string)
	return strings.ReplaceAll(html, "{{year}}", "2026"), nil
})
```

## Example: Slack notification

Post to Slack whenever a campaign finishes sending — a real Go handler on the `campaign.sent` **action**, whose payload is `sending.SendingPayload`:

```go
h.AddAction(sending.HookCampaignSent, 50, func(ctx context.Context, p any) error {
	c := p.(sending.SendingPayload).Campaign
	return slack.Post(ctx, fmt.Sprintf("📨 %s finished sending", c.Name))
})
```

Because the handler returns an `error`, a failed Slack call surfaces through the action chain rather than being silently dropped.
