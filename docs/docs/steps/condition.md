---
title: Condition step
description: "Reference for the FlowNet Condition step template."
---
# Condition step

> step_type: **condition**

Evaluates a boolean expression and splits the workflow into a **true** branch and a **false** branch, so downstream steps only run down the matching path.

## Configuration

| Field | Type | Required | Description |
|---|---|---|---|
| `expression` | string | required | A boolean expression evaluated against workflow data. Supports literals, `trigger.*` / `steps.*` / `env.*` references, `jsonpath(...)`, and nested functions like `math.add`, `str.upper`, `and`, `not`. |

## Example expressions

```
eq(trigger.title, "Product Updated")
gt(trigger.variants_count, 0)
eq(jsonpath(steps.condition_a, "$.result"), true)
and(eq(1, 1), not(false))
```

## When to use it

- Branching a workflow based on trigger data — e.g. only continue for products above a price threshold.
- Gating a step behind an environment or account flag.
- Combining outputs from earlier steps with boolean logic before acting on them.
