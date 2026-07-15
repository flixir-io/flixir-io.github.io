---
title: Storage Read step
description: "Reference for the Flixir Storage: Read step template."
---
# Storage: Read step

> step_type: **storage_read**

Looks up items in a [Storage](../storage.md), optionally filtered by a single field, and returns the matching items to the workflow.

## Configuration

| Field | Type | Required | Description |
|---|---|---|---|
| `storage` | string | required | The Storage to read from, identified by its machine name. |
| `filter_field` | string | optional | A single field to filter on. The available fields match the selected Storage's schema. Leave unset to return items without filtering. |
| `filter_value` | — | optional | The value `filter_field` must exactly match. Its type follows the selected field's type. |
| `limit` | integer | optional | Maximum number of items to return. Defaults to 50, hard capped at 500. |

## Output

Returns the matching `items` (each with its `id` and `data`) and a `count` of how many were returned.

## When to use it

- Looking up a record by a known field before acting on it — e.g. find the catalog item matching an incoming SKU.
- Pulling a list of items to loop over with a Loop step.
- Checking whether something exists before writing a new item, to avoid duplicates.

!!! note
    Only one field can be filtered at a time, with an exact match — there's no support yet for multiple conditions or ranged/partial matches. `filter_value` is expression-aware, so it can come from trigger or step data.
