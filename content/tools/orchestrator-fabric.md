---
title: orchestrator-fabric
purpose: Distributed job runner for scheduled automation, task fan-out, and operator-visible execution state.
category: Automation
stack: Python · Bash
platform: Linux / Hybrid
status: Production-minded
usage: orchestrator-fabric run nightly-patch --targets fleet-a
related:
  - endpoint-bootstrap
  - ops-scheduler
capabilities:
  - Dispatches repeatable workflows across nodes or utility hosts.
  - Normalizes job logs into one operator-readable execution stream.
  - Supports safe reruns, targeted retries, and audit-friendly task naming.
summary: orchestrator-fabric is built for repeatable multi-host operations where execution state needs to stay visible to an operator instead of disappearing into detached cron or ad hoc shell history.
---
## Operational summary

orchestrator-fabric acts as a control surface for scheduled or manually triggered jobs that need a clear target set, visible status, and restart discipline. It is meant for environments where a lightweight runner is better than introducing a full orchestration stack.

## Workflow

- Define a named job with targets, runtime arguments, and retry policy.
- Launch the run from an operator shell or a scheduler entry.
- Stream normalized output back into one readable execution view.
- Re-run only the failed segment when a target or step needs follow-up.

## Documentation notes

The useful property here is traceability. The tool keeps naming, logging, and retry behavior constrained enough that operators can answer what ran, where it ran, and what failed without reconstructing the workflow from multiple systems.
