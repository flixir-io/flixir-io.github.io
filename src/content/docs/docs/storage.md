---
title: Storage
description: "Guide to Flixir's Storage feature — store and query your own structured data inside workflows."
---

Store your own structured data inside Flixir — a product catalog, a list of VIP customers, running counters, anything with custom fields — and read, write, update, or delete it right from a workflow.

## Concepts

- **Storage** — a named container with a schema you define, similar to a lightweight table. Created once, then reused by any workflow.
- **Item** — a single record inside a Storage, matching its schema. Each item gets an auto-generated id.

## Creating a Storage

Under **Settings → Storage**, create a Storage with a name and a list of fields. Each field has:

- a **name**
- a **type**: `string`, `number`, `boolean`, `date`/`datetime`, or `list`
- whether it's **required**

### Schema is append-only

Once a Storage is saved, existing fields can't be renamed, retyped, or removed — you can only add new fields. This keeps previously written items valid against the schema. Plan field names and types with this in mind, or create a new Storage if you need a substantially different structure.

## Using Storage in a workflow

Four steps cover the full CRUD:

- **[Storage: Write](/docs/steps/storage-write/)** — insert a new item.
- **[Storage: Read](/docs/steps/storage-read/)** — look up items, with an optional single-field filter.
- **[Storage: Update](/docs/steps/storage-update/)** — merge new values into an existing item, by id.
- **[Storage: Delete](/docs/steps/storage-delete/)** — permanently remove an item, by id.

Items are identified by their auto-generated id — capture it from Storage: Write's output if you'll need to update or delete that item later.

The **[Storage Changed](/docs/triggers/storage-changed/)** trigger starts a workflow whenever an item in a chosen Storage is created, updated, or deleted.

## Limitations

- Filtering in Storage: Read supports only a single field with an exact match — no multi-field or ranged filters yet.
- Deletes are permanent; there's no restore.
- Storage: Read returns at most 500 items per call (default 50).
- There's no relationship/reference between different Storages.

:::note
Need a threshold like "notify me once a Storage has over 100 items"? Compose it yourself: **Storage Changed** trigger → **Storage: Read** → **Condition** step.
:::