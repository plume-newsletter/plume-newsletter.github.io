---
title: Changelog
description: What shipped in each Plume release.
---

All notable changes to Plume are documented here. This project follows
[Keep a Changelog](https://keepachangelog.com/) and [Semantic Versioning](https://semver.org/).

## 1.0.0

Initial release. A complete self-hosted newsletter & email-marketing app for PHP 8.2+ / MySQL 8,
shared-hosting friendly (one cron, no Redis/daemon).

### Added

- Single-admin authentication (no public registration) and a guided, self-locking web installer.
- Multi-brand support with a brand switcher; per-brand sender identity and full tenant isolation.
- Lists and subscribers with custom fields, search/filter, and CSV import (including Ghost member exports).
- Segments from status + list-membership rules (match all/any) with a live count preview.
- Drag-and-drop campaign builder with a live email preview, a template gallery, and sanitized email-safe HTML output.
- Sending to a list or segment via your own SMTP / Amazon SES, drained off the cron with automatic retries and post-send locking.
- Open/click tracking, per-campaign reports (open/click/unsubscribe rates, top links), and dashboard performance tiles.
- Public double-opt-in signup forms per list (hosted + embeddable, no API key), email confirmation, one-click unsubscribe (RFC 8058), and a resubscribe path.
- Optional AI copilot (bring your own Anthropic key): conversational campaign drafting with apply/undo, audience suggestions and send-time advice, plus inline copy rewrite and subject-line suggestions.
- Autoresponders / email automations: trigger-based multi-step sequences (list-join welcome series, segment-entry drips, signup-anniversary sends) with per-step open/click tracking, driven off the same one-minute cron.
- Encrypted storage for SMTP and API credentials; Docker option alongside shared hosting.
- Charts: campaign open-over-time and top-links, dashboard subscriber-growth and send-volume, and open/click rate bars across the dashboard and campaigns list.
