---
title: Storage Write step
description: "Reference for the Flixir Storage: Write step template."
---

> step_type: **storage_write**

Inserts a new item into a [Storage](/docs/storage/). The values you provide are validated against that Storage's schema before the item is created.

## Configuration

| Field | Type | Required | Description |
|---|---|---|---|
| `storage` | string | required | The Storage to write into, identified by its machine name. |
| `values` | object | required | The item's field values. The available fields — and their types — match the selected Storage's schema, and are shown once `storage` is set. |

## Output

The step's output includes the new item's `id` and its saved `data`, so later steps (or a Storage: Update / Storage: Delete step) can reference it — e.g. `steps.storage_write_1.id`.

## When to use it

- Saving a custom record — an order note, a catalog entry, a log — as part of a workflow run.
- Building up your own dataset from incoming trigger data over time.

:::note
Required fields must be present in `values`, or the step fails validation. Field values are expression-aware, so you can populate them from trigger or step data — e.g. `trigger.payload.title`. See the [Expressions guide](/docs/expressions/).
:::