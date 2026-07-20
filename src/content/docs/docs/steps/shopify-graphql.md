---
title: Shopify GraphQL step
description: "Reference for the Flixir Shopify GraphQL step template."
---

> step_type: **shopify_graphql**

Runs any Shopify Admin GraphQL query or mutation against the connected store, for reads or writes the built-in steps don't cover.

## Configuration

| Field | Type | Required | Description |
|---|---|---|---|
| `query` | string (code, graphql) | required | The GraphQL query or mutation to execute against the Shopify Admin API. |
| `variables` | array<object> | optional | Key/value pairs passed in as GraphQL variables. |

## When to use it

- Reading store data that isn't already exposed via the trigger payload.
- Writing back to Shopify — updating a product, adjusting inventory, tagging an order.
- Any Admin API capability not (yet) wrapped in its own dedicated step.

:::note
the query runs with the access scopes granted at install time, so mutations outside those scopes will fail — check the store's granted scopes if a call is rejected.
:::