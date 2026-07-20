---
title: HTTP Request step
description: "Reference for the Flixir HTTP Request step template."
---

> step_type: **http_call**

Calls any HTTP endpoint with a configurable method, query string, headers, and body. The response is made available to downstream steps.

## Configuration

| Field | Type | Required | Description |
|---|---|---|---|
| `method` | enum | required | HTTP method: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, or `HEAD`. Defaults to `GET`. |
| `url` | string (uri) | required | The request URL. |
| `query` | array<object> | optional | Query string parameters, as key/value pairs. |
| `headers` | array<object> | optional | Request headers, as key/value pairs. |
| `body` | object | optional | Request body. `content_type` is `application/json` or `text/plain`; `fields` is a list of key/value pairs assembled into the body, with values resolved as expressions. |

## When to use it

- Calling a third-party API that doesn't have a dedicated Flixir step.
- Posting workflow data to an internal service, spreadsheet backend, or notification tool.
- Fetching extra data mid-workflow before a later step acts on it.

:::note
body `fields` values support expressions, so you can reference trigger and step data directly — e.g. `trigger.payload.title`, or `jsonpath(steps.debug_a, "$.variables[0].value")` to reach into a step's output. See the [Expressions guide](/docs/expressions/) for the full syntax.
:::