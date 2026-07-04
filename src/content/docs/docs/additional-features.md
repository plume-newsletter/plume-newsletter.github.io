---
title: Beyond the basics
description: A tour of the features that ship in the current Plume release, from the AI assistant to teams and the block editor.
---

These features all ship in the current release. Deeper per-feature guides are coming — this page is a short tour of what's available and where each one lives in the API.

## AI assistant

A Claude-backed assistant woven through the app: rewrite copy, chat about a campaign, get subject-line suggestions, surface campaign insights, and turn natural language into segment rules. Set your Anthropic API key in **Settings**, where it's stored encrypted. Endpoints live under `/api/ai/*`. Like the rest of Plume's AI features, it's entirely optional — nothing here runs, and no key ever leaves your workspace's config, unless you set one.

### Campaign copilot

Instead of starting from a blank campaign, describe what you want in the "New campaign" dialog — "✨ Or describe it and let AI draft everything" — and the editor opens straight into the copilot panel with a full draft already applied: subject and body blocks written, ready to review.

From there it's conversational: keep chatting in the panel to refine the draft ("make it shorter", "add a discount code", "more casual tone") and each reply replaces the draft in the editor, with a single-step **Undo** if a change misses the mark. When your request implies a target audience — "send this to people who haven't opened in 30 days" — the panel proposes one as a plain-language summary and a subscriber count, with a **Save audience** button that turns it into a segment you can pick when you send. It can also surface **send-time advice** grounded in your own analytics, not a generic heuristic.

The copilot only ever hands you a draft — it never sends a campaign itself; sending is still a deliberate, separate step you take from the send dialog. See [`POST /ai/campaign`](/docs/rest-api/) for the underlying contract.

## Analytics

An owner-level overview of your sending: subscriber totals, engagement rates, estimated sending cost, growth and volume over time, best send times, and per-campaign metrics. Endpoints live under `/api/analytics/*`.

## Automations

Linear, trigger-based journeys built from an ordered sequence of send and wait steps. Subscribers enroll on `subscriber.confirmed` and are advanced through the steps by a background worker. Endpoints live under `/api/automations*`.

## A/B tests

Subject-line tests: split a list, send two competing subjects to the split, then send the winning subject to the remaining holdout. Endpoints live under `/api/ab-tests*`.

## Segments

Saved filters compiled from JSON conditions down to SQL. A live preview shows the matching count and a sample as you build. Endpoints live under `/api/segments*`.

## Signup forms

Hosted subscribe forms with a public landing page at `/f/{id}`. Manage them under `/api/signup-forms*`.

## Templates

Reusable email layouts — both starter templates and your own saved designs. Hitting "Use" spins up a draft campaign from the template. Endpoints live under `/api/templates*`.

## Teams & workspaces

A multi-user workspace with roles, invites, and member management. Endpoints span `/api/team*`, `/api/workspace`, and `/api/invites/*`.

## API keys

Workspace-scoped keys for the REST API. Create and manage them under `/api/api-keys*`, then use them with the [REST API](/docs/rest-api/).

## Block editor

Campaigns are authored as an array of blocks that Plume renders to email-safe HTML plus a plain-text alternative. Render a block array with `POST /api/blocks/render`.
