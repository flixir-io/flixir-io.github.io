---
title: Base templates
description: "Reference for every built-in Flixir trigger and step template."
---
# Base templates

Every Flixir workflow is built from two kinds of blocks: **triggers**, which start a run, and **steps**, which do the work. These are the built-in templates that ship with the `core` and `ai` integrations — available in every workflow, no setup required.

## Guides

How parameter fields work under the hood.

- **[Expressions](expressions.md)** — Reference and paths, JSONPath, and built-in functions for expression-aware fields.
- **[Storage](storage.md)** — Store and query your own structured data inside workflows.

## Triggers

A workflow starts with exactly one trigger. It defines the event that kicks off a run and the data available to the rest of the workflow.

- **[Manual Trigger](triggers/manual.md)** — Runs a workflow on demand, straight from the Flixir editor. No external event required.
- **[Webhook](triggers/webhook.md)** — Fires a workflow whenever Flixir receives an HTTP request on the workflow's unique webhook URL.
- **[Scheduled](triggers/cron.md)** — Runs a workflow on a recurring schedule using a standard cron expression, with ready-made presets.
- **[Shopify](triggers/shopify.md)** — Fires a workflow from Shopify store events — new products, updates, inventory changes, and more.
- **[Storage Changed](triggers/storage-changed.md)** — Fires a workflow whenever an item in a Storage is created, updated, or deleted.

## Steps

Steps are chained after a trigger to process data, call external services, branch logic, or run custom code.

- **[Debug](steps/debug.md)** — Outputs the current state or specified variables to the run log, for inspecting a workflow mid-flight.
- **[HTTP Request](steps/http-request.md)** — Makes an HTTP request to any URL with a configurable method, query params, headers, and body.
- **[Lua script](steps/lua-script.md)** — Executes a custom Lua script with access to workflow variables, for logic no built-in step covers.
- **[Condition](steps/condition.md)** — Evaluates a boolean expression and branches the workflow down a true or false path.
- **[Loop](steps/loop.md)** — Iterates over a list, running the downstream branch once per item.
- **[Shopify GraphQL](steps/shopify-graphql.md)** — Executes any Shopify Admin GraphQL query or mutation directly against the connected store.
- **[Gemini](steps/gemini.md)** — Generates text with Google Gemini — summarize, classify, or draft content mid-automation.
- **[Storage: Write](steps/storage-write.md)** — Inserts a new item into a Storage.
- **[Storage: Read](steps/storage-read.md)** — Looks up items in a Storage, with an optional single-field filter.
- **[Storage: Update](steps/storage-update.md)** — Merges new values into an existing Storage item, by id.
- **[Storage: Delete](steps/storage-delete.md)** — Permanently removes an item from a Storage, by id.
