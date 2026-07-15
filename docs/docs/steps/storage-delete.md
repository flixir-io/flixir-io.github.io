---
title: Storage: Delete step
description: "Reference for the Flixir Storage: Delete step template."
---
# Storage: Delete step

> step_type: **storage_delete**

Permanently deletes an item from a [Storage](../storage.md) by id.

## Configuration

| Field | Type | Required | Description |
|---|---|---|---|
| `storage` | string | required | The Storage the item belongs to, identified by its machine name. |
| `item_id` | string | required | The id of the item to delete. |

## When to use it

- Cleaning up records that are no longer needed — expired entries, processed queue items, and so on.
- Removing a record as part of an undo/rollback path in a workflow.

!!! warning
    Deletion is permanent — there's no soft delete or restore. Double-check `item_id` before wiring this step into a workflow, especially if it's driven by expression-based data.
