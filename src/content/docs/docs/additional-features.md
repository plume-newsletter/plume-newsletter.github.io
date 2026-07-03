---
title: Beyond the basics
description: A tour of the features that ship in the current Plume release, from the AI assistant to teams and the block editor.
---

These features all ship in the current release. Deeper per-feature guides are coming — this page is a short tour of what's available and where each one lives in the API.

## AI assistant

A Claude-backed assistant woven through the app: rewrite copy, chat about a campaign, get subject-line suggestions, surface campaign insights, and turn natural language into segment rules. Set your Anthropic API key in **Settings**, where it's stored encrypted. Endpoints live under `/api/ai/*`.

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
