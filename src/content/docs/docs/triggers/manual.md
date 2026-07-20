---
title: Manual Trigger
description: "Manually run a Flixir workflow on demand."
---

> trigger_type: **manual**

Starts a workflow run immediately when you click **Run** in the Flixir editor. There's no external event to configure — it's the fastest way to test a workflow while you're building it.

## Configuration

This trigger has no configurable fields. Attach it to a workflow and press run.

## When to use it

- Testing a workflow while designing it, before wiring up a real trigger.
- One-off or ad-hoc runs that a teammate kicks off by hand.
- Workflows meant to be triggered from another workflow rather than an external event.

:::note
because there's no external payload, downstream steps that expect trigger data (e.g. `trigger.title`) should provide sensible fallbacks when run manually.
:::