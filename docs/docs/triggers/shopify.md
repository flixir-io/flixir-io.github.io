---
title: Shopify trigger
description: "Trigger a FlowNet workflow from Shopify store events."
---
# Shopify trigger

> trigger_type: **shopify**

Starts a workflow whenever something happens in the connected Shopify store. Pick a specific event via a preset, and the trigger's payload schema is filled in automatically.

## Configuration

| Field | Type | Required | Description |
|---|---|---|---|
| `filter` | string | optional | Optional expression to filter which events actually start a run, evaluated against the incoming event payload. |

## Event presets

Each preset maps to a Shopify webhook topic and comes with its own example payload and schema, used to validate expressions that read from `trigger.payload`:

| Preset | Description | Webhook topic |
|---|---|---|
| New Product | Fires when a new product is created in the connected store. | `products/create` |
| Product Updated | Fires when an existing product is updated — title, price, variants, and more. | `products/update` |
| Inventory Updated | Fires when stock levels change for a product variant at a location. | `inventory_levels/update` |

## When to use it

- Reacting to catalog changes — new products, edits, price changes.
- Keeping inventory in sync with an external system.
- Any automation that should start from something happening in the merchant's store, rather than on a schedule or external webhook.

!!! note
    `has_filter` is enabled for this trigger, so you can narrow down which events reach the workflow before any steps run.
