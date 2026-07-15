---
title: Storage Changed trigger
description: "Trigger a FlowNet workflow when an item in a Storage is created, updated, or deleted."
---
# Storage Changed trigger

> trigger_type: **storage_changed**

Starts a workflow whenever an item in a chosen [Storage](../storage.md) is created, updated, or deleted — whether that change came from a Storage: Write/Update/Delete step in another workflow, or the same one.

## Configuration

| Field | Type | Required | Description |
|---|---|---|---|
| `storage` | string | required | The Storage to watch, identified by its machine name. |
| `action_filter` | enum | optional | Restrict to one kind of change: `created`, `updated`, or `deleted`. Leave unset to fire on all three. |

## Payload

The triggered run's `trigger.payload` includes:

| Field | Description |
|---|---|
| `storage_machine_name` | The Storage the change happened in. |
| `action` | Which change fired the run: `created`, `updated`, or `deleted`. |
| `item_id` | The id of the affected item. |
| `data` | The item's field values at the time of the change. |

## When to use it

- Reacting whenever a record is added to a catalog or list you maintain in Storage.
- Chaining workflows together — one workflow writes to Storage, another reacts to that change.
- Keeping an external system in sync with data you store in FlowNet.

!!! note
    There's no built-in threshold trigger (e.g. "fire once a Storage passes 100 items") — each change fires the trigger once. Build thresholds yourself with **Storage Changed** → **[Storage: Read](../steps/storage-read.md)** → **Condition**.
