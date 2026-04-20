---
title: endpoint-bootstrap
purpose: Provisioning toolkit for bringing endpoints into a known-good baseline with repeatable package, config, and policy setup.
category: Automation
stack: PowerShell · Bash
platform: Windows / Linux
status: Field-ready
usage: endpoint-bootstrap apply --profile workstation-secure
related:
  - orchestrator-fabric
  - pwsh-entra-kit
capabilities:
  - Applies baseline configuration to fresh or rebuilt endpoints.
  - Pins package and service setup into a repeatable bootstrap sequence.
  - Produces a concise completion summary for handoff or review.
summary: endpoint-bootstrap exists to make workstation and server onboarding deterministic enough that rebuilds, rotations, and emergency restores do not drift immediately from the baseline.
---
## Operational summary

endpoint-bootstrap is a profile-driven setup surface for packages, services, policies, and initial machine posture. It is useful when a team needs one command path that can be reviewed and repeated rather than a pile of one-off endpoint notes.

## Workflow

- Select a bootstrap profile mapped to the target role.
- Apply package, service, and policy steps in one ordered run.
- Emit a concise status summary at the end of the operation.
- Re-run the profile safely when a host is rebuilt or handed off.

## Documentation notes

This tool is intentionally opinionated around baseline enforcement. It trades open-ended flexibility for the ability to make endpoint state legible and repeatable.
