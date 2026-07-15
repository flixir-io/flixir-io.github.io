---
title: Loop step
description: "Reference for the FlowNet Loop step template."
---
# Loop step

> step_type: **loop**

Iterates over a list — products, order line items, or any array from trigger or step data — running its downstream branch once per item.

## Configuration

| Field | Type | Required | Description |
|---|---|---|---|
| `list` | string | required | Expression resolving to the list to iterate over. Each downstream branch runs once per item. |

## When to use it

- Processing every line item in an order, or every variant of a product.
- Sending a notification or API call once per item in a list from a previous step.
- Batch operations that need the same set of steps repeated per record.
