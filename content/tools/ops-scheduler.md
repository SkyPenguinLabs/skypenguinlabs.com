---
title: ops-scheduler
purpose: A compact operator scheduler for maintenance windows, recurring tasks, and dependency-aware IT routines.
category: Automation
stack: Go
platform: Cross-platform
status: Stable core
usage: ops-scheduler plan --window patching-q2
related:
  - orchestrator-fabric
capabilities:
  - Models recurring jobs without a heavy orchestration platform.
  - Captures dependency ordering and maintenance windows directly in config.
  - Surfaces next-run, drift, and failure state with minimal noise.
summary: ops-scheduler focuses on readable maintenance intent instead of large scheduler ergonomics, making it suitable for compact infrastructure and repeatable operations windows.
---
## Operational summary

ops-scheduler is a narrow scheduling layer for maintenance-oriented routines. It keeps recurrence, ordering, and windowing close to the actual job definition so operators can see why something is allowed to run and when it will run next.

## Workflow

- Define a maintenance window and one or more recurring jobs.
- Express upstream dependencies directly in config.
- Generate a run plan before execution to inspect timing and drift.
- Hand off the planned or resolved schedule to execution tooling.

## Documentation notes

The main goal is legibility. Schedules become easier to review when cadence and dependency data are close to the job itself rather than split across multiple systems.
