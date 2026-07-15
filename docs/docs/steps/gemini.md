---
title: Gemini step
description: "Reference for the FlowNet Gemini step template."
---
# Gemini step

> step_type: **gemini**

Generates text with Google Gemini directly inside a workflow — write a prompt, optionally set a system instruction, and reference workflow data via expressions.

## Configuration

| Field | Type | Required | Description |
|---|---|---|---|
| `api_key` | string | optional | Gemini API key. Use a workspace secret, e.g. `secrets.GEMINI_KEY`, rather than a literal key. |
| `prompt` | string | required | The user message sent to Gemini. Supports expressions — reference trigger or step output data. |
| `system` | string | optional | Optional system instruction to set the assistant's tone, role, or output format. |
| `model` | enum | optional | Gemini model to use: `gemini-2.0-flash` (default), `gemini-2.0-flash-lite`, `gemini-2.5-flash-preview-05-20`, or `gemini-2.5-pro-preview-06-05`. |
| `temperature` | number | optional | Controls randomness, from 0 (deterministic) to 2 (very creative). Default 1.0. |
| `max_tokens` | integer | optional | Maximum tokens in the generated response, from 1 to 8192. Default 1024. |

## When to use it

- Summarizing an order, product description, or support message mid-workflow.
- Classifying or tagging incoming data before branching with a Condition step.
- Drafting content — email copy, product descriptions — from structured trigger data.

!!! note
    `prompt` is expression-aware, so it can pull in live values like `trigger.payload.title`; `system` is treated as static text.
