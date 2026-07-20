---
title: Base templates
description: "Reference for every built-in Flixir trigger and step template."
---

Every Flixir workflow is built from two kinds of blocks: **triggers**, which start a run, and **steps**, which do the work. These are the built-in templates that ship with the `core` and `ai` integrations — available in every workflow, no setup required.

## Guides

How parameter fields work under the hood.

- **[Expressions](/docs/expressions/)** — Reference and paths, JSONPath, and built-in functions for expression-aware fields.
- **[Storage](/docs/storage/)** — Store and query your own structured data inside workflows.

## Triggers

A workflow starts with exactly one trigger. It defines the event that kicks off a run and the data available to the rest of the workflow.

- **[Manual Trigger](/docs/triggers/manual/)** — Runs a workflow on demand, straight from the Flixir editor. No external event required.
- **[Webhook](/docs/triggers/webhook/)** — Fires a workflow whenever Flixir receives an HTTP request on the workflow's unique webhook URL.
- **[Scheduled](/docs/triggers/cron/)** — Runs a workflow on a recurring schedule using a standard cron expression, with ready-made presets.
- **[Shopify](/docs/triggers/shopify/)** — Fires a workflow from Shopify store events — new products, updates, inventory changes, and more.
- **[Storage Changed](/docs/triggers/storage-changed/)** — Fires a workflow whenever an item in a Storage is created, updated, or deleted.

## Steps

Steps are chained after a trigger to process data, call external services, branch logic, or run custom code.

- **[Debug](/docs/steps/debug/)** — Outputs the current state or specified variables to the run log, for inspecting a workflow mid-flight.
- **[HTTP Request](/docs/steps/http-request/)** — Makes an HTTP request to any URL with a configurable method, query params, headers, and body.
- **[Lua script](/docs/steps/lua-script/)** — Executes a custom Lua script with access to workflow variables, for logic no built-in step covers.
- **[Condition](/docs/steps/condition/)** — Evaluates a boolean expression and branches the workflow down a true or false path.
- **[Loop](/docs/steps/loop/)** — Iterates over a list, running the downstream branch once per item.
- **[Sleep](/docs/steps/sleep/)** — Pauses the workflow for a set amount of time before continuing.
- **[Shopify GraphQL](/docs/steps/shopify-graphql/)** — Executes any Shopify Admin GraphQL query or mutation directly against the connected store.
- **[Gemini](/docs/steps/gemini/)** — Generates text with Google Gemini — summarize, classify, or draft content mid-automation.
- **[Storage: Write](/docs/steps/storage-write/)** — Inserts a new item into a Storage.
- **[Storage: Read](/docs/steps/storage-read/)** — Looks up items in a Storage, with an optional single-field filter.
- **[Storage: Update](/docs/steps/storage-update/)** — Merges new values into an existing Storage item, by id.
- **[Storage: Delete](/docs/steps/storage-delete/)** — Permanently removes an item from a Storage, by id.
