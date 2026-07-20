---
title: Storage Update step
description: "Reference for the Flixir Storage: Update step template."
---

> step_type: **storage_update**

Updates an existing item in a [Storage](/docs/storage/) by id. Only the fields you provide are changed — everything else on the item is left as-is.

## Configuration

| Field | Type | Required | Description |
|---|---|---|---|
| `storage` | string | required | The Storage the item belongs to, identified by its machine name. |
| `item_id` | string | required | The id of the item to update — e.g. from a previous Storage: Write or Storage: Read step. |
| `values` | object | required | The fields to change, merged into the existing item. Any fields left out keep their current value. Fields and types match the selected Storage's schema. |

## Output

The step's output includes the updated item's `id` and its full `data` after the merge.

## When to use it

- Updating a status or counter field on a record created earlier in a workflow (or a previous run).
- Applying a partial change — e.g. bumping a stock count — without needing to resend the whole item.

:::note
This is a partial merge, not a full replace — you don't need to repeat unchanged fields in `values`. Values are expression-aware, same as Storage: Write.
:::