---
title: Sleep step
description: "Reference for the Flixir Sleep step template."
---

> step_type: **sleep**

Pauses the workflow for a set amount of time before continuing to the next step — without tying up any resources while it waits.

## Configuration

| Field | Type | Required | Description |
|---|---|---|---|
| `duration_value` | number | required | How long to wait, in the unit selected below. Expression-aware. |
| `duration_unit` | string (select) | required | The unit for `duration_value`: `seconds`, `minutes`, `hours`, or `days`. Defaults to `minutes`. |

The maximum wait is 30 days; a duration longer than that is rejected when you save the step.

## When to use it

- Waiting a fixed amount of time before following up — e.g. checking in a day after an abandoned checkout.
- Spacing out a sequence of reminders or notifications.
- Holding fulfillment or a status change for a set number of hours before proceeding.

:::note
While a workflow run is asleep, it isn't actively running — it resumes automatically once the wait is over, so there's no cost or resource use during the delay.
:::