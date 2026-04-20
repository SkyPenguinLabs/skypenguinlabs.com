---
title: tracevault
purpose: Incident evidence organizer for logs, timelines, extracted indicators, and operator comments across an investigation.
category: Cybersecurity
stack: Go · SQLite
platform: Cross-platform
status: Investigation core
usage: tracevault case open --name vpn-anomaly-0418
related:
  - phishlens
  - cred-sentry
capabilities:
  - Collects trace fragments, timeline notes, and evidence references in one place.
  - Makes incident reconstruction easier to review and continue later.
  - Preserves structured notes without forcing a heavy case-management suite.
summary: tracevault is an investigation workspace for evidence and notes that need to stay organized across time without forcing a large ticketing or case-management product into the loop.
---
## Operational summary

tracevault keeps evidence fragments, extracted indicators, and operator commentary in one small case-oriented surface. It is meant for investigations where continuity matters more than heavyweight workflow enforcement.

## Workflow

- Open a case and assign a stable case name.
- Attach traces, evidence paths, and timeline notes as they are discovered.
- Reconstruct the incident with structured evidence references instead of loose text files.
- Resume the case later without losing context across operators.

## Documentation notes

This tool is strongest when investigations span several collection passes. It reduces the chance that evidence context fragments across local directories, chat history, and temporary notes.
