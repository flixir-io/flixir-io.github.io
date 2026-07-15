---
title: Debug step
description: "Reference for the FlowNet Debug step template."
---
# Debug step

> step_type: **debug**

Writes the current state, or any variables you choose, to the workflow run log. It doesn't call anything external — it's a pure inspection tool.

## Configuration

| Field | Type | Required | Description |
|---|---|---|---|
| `state` | string | required | Free-text label for the returned step state, shown in the run log. |
| `variables` | array<object> | optional | List of `key` / `value` pairs to output alongside the state. Defaults to an empty list. |

## When to use it

- Checking what a previous step or the trigger actually produced, while building a workflow.
- Marking a branch outcome — e.g. logging `outcome: true` after a condition step.
- Leaving lightweight breadcrumbs in longer workflows without wiring up an HTTP call.
