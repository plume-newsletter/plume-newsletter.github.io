---
title: WordPress signup form
description: Add a Plume signup form to your WordPress site with a shortcode or widget — subscribers confirm by email (double opt-in). No API key needed.
---

The Plume WordPress plugin adds a signup form to your site. Submissions go to your Plume instance's double-opt-in subscribe endpoint, so every subscriber confirms by email before they're active. The plugin stores no API key — just your Plume base URL and a list ID.

## Install

For now the plugin is distributed as a zip on GitHub (the wordpress.org directory listing comes later):

1. Download the latest `plume-newsletter.zip` from the [releases page](https://github.com/plume-newsletter/wordpress-plugin/releases).
2. In WordPress, go to **Plugins → Add New → Upload Plugin**, choose the zip, install, and activate.

## Connect it to Plume

1. Go to **Settings → Plume**.
2. Enter your **Plume base URL** (for example `https://app.yourplume.com`).
3. Enter a **list ID** — copy it from your Plume dashboard under **Lists**.

## Add the form

- **Shortcode:** put `[plume_signup]` in any page or post. Options: `[plume_signup list="LIST_ID" button="Join" name="true"]` (a `list` here overrides the default; `name="true"` shows a name field).
- **Widget:** add the **Plume Signup** widget to a sidebar or footer.

## How subscribers are added

Submitting the form creates a **pending** subscriber in Plume and sends them a confirmation email. They become **active** only after clicking the link — standard double opt-in. Spam is filtered with a honeypot and a timing check; there's no CAPTCHA and no tracking.
