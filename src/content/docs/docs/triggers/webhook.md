---
title: Webhook
description: "Trigger a Flixir workflow via an HTTP request."
---

> trigger_type: **webhook**

Gives every workflow a unique HTTP endpoint. Sending a request to that URL starts a run, with the request body available as trigger data to every downstream step.

## Configuration

No fields to fill in — the webhook URL is generated automatically once the trigger is attached to a workflow.

## When to use it

- Receiving events from a third-party system that isn't Shopify.
- Connecting a custom app, form, or internal tool to a Flixir workflow.
- Chaining workflows together by calling one workflow's webhook from another.

:::note
the incoming request body is exposed to later steps and conditions as `trigger.payload`.
:::