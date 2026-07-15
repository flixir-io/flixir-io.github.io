---
title: Scheduled trigger
description: "Run a Flixir workflow on a cron schedule, with ready-made presets."
---
# Scheduled trigger

> trigger_type: **cron**

Runs a workflow on a recurring schedule, defined as a cron expression. No external event needed — Flixir fires the trigger itself at the configured times.

## Configuration

| Field | Type | Required | Description |
|---|---|---|---|
| `schedule` | string | required | Standard 5-field cron expression (minute hour day month weekday). E.g. `0 9 * * 1` = every Monday at 9:00. |
| `timezone` | string | optional | IANA timezone the schedule is evaluated in, e.g. `Europe/Berlin`. Defaults to UTC. |

## Presets

Common schedules you can pick from directly, instead of writing a cron expression by hand:

| Preset | Description | Cron expression |
|---|---|---|
| Every hour | Runs at the start of every hour | `0 * * * *` |
| Every day at 9:00 | Runs daily at 9 AM UTC (great for morning reports) | `0 9 * * *` |
| Every Monday at 9:00 | Weekly digest or report on Monday morning | `0 9 * * 1` |
| Every 15 minutes | Frequent polling — inventory checks, sync jobs | `*/15 * * * *` |
| Every day at midnight | Nightly cleanup or data archiving | `0 0 * * *` |
| 1st of every month | Monthly report or billing cycle job | `0 9 1 * *` |

## When to use it

- Daily or weekly reports and digests.
- Periodic sync or cleanup jobs that don't depend on an external event.
- Polling an API on a fixed interval when no webhook is available.
