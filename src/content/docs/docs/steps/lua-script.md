---
title: Lua script step
description: "Reference for the Flixir Lua script step template."
---

> step_type: **lua_script**

Runs a custom Lua script for logic that doesn't fit a built-in step — custom parsing, formatting, or calculations against workflow data.

## Configuration

| Field | Type | Required | Description |
|---|---|---|---|
| `code` | string (code, lua) | required | The Lua script to run, with access to the workflow's variables. |
| `variables` | array<object> | optional | Key/value pairs passed into the script's execution context. Defaults to an empty list. |

## When to use it

- Transforming data in a way expressions alone can't express.
- Custom validation or formatting logic before an HTTP call.
- Prototyping logic quickly without adding a new built-in step type.

:::note
the code editor uses the `lua` language mode; declared `variables` are injected into scope before the script runs.
:::