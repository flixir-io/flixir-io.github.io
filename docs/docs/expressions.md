---
title: Expressions
description: "Reference for Flixir's parameter expression language: literals, references, JSONPath, and built-in functions."
---
# Expressions

> used in fields marked **expression-aware**

Expressions let a field pull in live data instead of a fixed value — the trigger payload, a previous step's output, a secret, or the result of a function. They show up in fields like `expression` (Condition), `prompt` (Gemini), `list` (Loop), request bodies, and Shopify GraphQL queries and variables.

## Literals

The basic building blocks an expression can be made of:

| Reference | Example | Description |
|---|---|---|
| `string` | `"Hello, world"` | Double-quoted text. Use two double quotes with nothing between them for an empty string. |
| `number` | `42` | Integers only — decimals aren't supported yet. |
| `boolean` | `true / false` | Boolean literals, unquoted. |

## References

Dotted paths that resolve to a value at runtime:

| Reference | Example | Description |
|---|---|---|
| `trigger` | `trigger` | The entire trigger payload, unresolved. |
| `trigger.<path>` | `trigger.payload.title` | A specific field inside the trigger payload. |
| `steps.<name>` | `steps.debug_a` | The entire output of an upstream step, addressed by its machine name. |
| `tenant.<path>` | `tenant.id / tenant.name` | The current tenant's ID or name. |
| `env.<path>` | `env.API_KEY` | An environment-level value. |
| `workflow.<path>` | `workflow.id / workflow.name` | The ID or name of the running workflow. |
| `loop.item / loop.index` | `loop.item` | The current item and zero-based index — only inside a branch downstream of a Loop step. |
| `secrets.<KEY>` | `secrets.SHOPIFY_API_KEY` | A workspace secret. Key must be UPPER_SNAKE_CASE. Never shown in logs. |
| `vars.<KEY>` | `vars.STORE_NAME` | A workspace variable. Key must be UPPER_SNAKE_CASE. Logged as-is. |

!!! note
    `trigger`, `tenant`, `env`, `workflow`, and `loop` are reserved namespaces — typing one of these names by itself (no dot) resolves to its entire payload, where applicable.

!!! note
    `steps.<name>` only resolves the step's *entire* output — you can't chain a field path onto it directly (e.g. `steps.debug_a.variables.0.value` does **not** work). To reach into a field, nested object, or array inside a step's output, wrap the bare step reference in `jsonpath(...)` with the full path in the JSONPath string instead — see below.

## JSONPath

For reaching into a field, nested object, or array inside a JSON value, use a JSONPath string starting with `$` as an argument to `jsonpath(...)`. Only basic paths are supported — no filter expressions like `[?(@.price>10)]`.

The **source** argument (first argument) should be a bare reference — the whole trigger payload or the whole output of a step — and the **entire** path, including any array indices, goes inside the JSONPath string. Don't chain a field path onto `steps.<name>` before passing it in.

```
jsonpath(trigger.payload, "$.items[0].name")
jsonpath(steps.http_call_a, "$.response.data.id")
jsonpath(steps.debug_a, "$.variables[0].value")
```

## Functions

Functions can be nested inside one another and take other expressions as arguments.

### JSON

| Function | Signature | Description |
|---|---|---|
| `jsonpath` | `jsonpath(source, "$.path")` | Extracts a value from JSON using a JSONPath expression. |

### Date

| Function | Signature | Description |
|---|---|---|
| `date.now` | `date.now()` | Returns the current datetime in ISO 8601 format. |
| `date.add` | `date.add(datetime, amount, "unit")` | Shifts a datetime by an amount. Units: minutes, hours, days, months. |
| `date.format` | `date.format(datetime, "YYYY-MM-DD")` | Formats a datetime using tokens like YYYY-MM-DD or DD.MM.YYYY HH:mm. |

### String

| Function | Signature | Description |
|---|---|---|
| `str.concat` | `str.concat(a, b)` | Concatenates two or more strings. |
| `str.trim` | `str.trim(value)` | Trims whitespace from both sides of a string. |
| `str.lower` | `str.lower(value)` | Converts a string to lowercase. |
| `str.upper` | `str.upper(value)` | Converts a string to uppercase. |

### Math

| Function | Signature | Description |
|---|---|---|
| `math.add` | `math.add(a, b)` | Adds two numbers. |
| `math.sub` | `math.sub(a, b)` | Subtracts b from a. |
| `math.mul` | `math.mul(a, b)` | Multiplies two numbers. |
| `math.div` | `math.div(a, b)` | Divides a by b. |

### Boolean & conditions

| Function | Signature | Description |
|---|---|---|
| `eq` | `eq(a, b)` | True if a equals b. |
| `gt` | `gt(a, b)` | True if a is greater than b. |
| `lt` | `lt(a, b)` | True if a is less than b. |
| `and` | `and(a, b)` | Logical AND. |
| `or` | `or(a, b)` | Logical OR. |
| `not` | `not(a)` | Logical NOT. |

## Nesting functions

Arguments can themselves be function calls, references, or literals, nested as deep as you need:

```
and(
  eq(trigger.title, "Product Updated"),
  gt(jsonpath(steps.http_call_a, "$.response.status"), 199)
)

str.upper(str.trim(trigger.payload.title))

date.format(date.add(date.now(), 7, "days"), "YYYY-MM-DD")
```

## Editor support

Expression fields use a Monaco-based editor with:

- **Syntax highlighting** for functions, `steps.*`, `secrets.*`, `vars.*`, context references, and JSONPath.
- **Autocomplete** for every function, the machine names of upstream steps, trigger payload fields (from the trigger's schema), and workspace secrets and variables.
- Inside a Loop step's downstream branch, `loop.item` and `loop.index` are also suggested.
