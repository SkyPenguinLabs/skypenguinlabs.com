---
title: phishlens
purpose: Message triage helper for rapidly extracting indicators, suspicious routing traits, and analyst notes from email artifacts.
category: Cybersecurity
stack: Python · HTML parsing
platform: Cross-platform
status: Analyst utility
usage: phishlens inspect sample.eml --emit summary
related:
  - tracevault
  - yara-lab
capabilities:
  - Pulls indicators and routing metadata from suspicious messages.
  - Normalizes message artifacts into a compact analyst-ready summary.
  - Speeds first-pass review without forcing a full mail-client workflow.
summary: phishlens exists to shorten the first-pass analyst workflow around suspicious messages by turning raw mail artifacts into a cleaner triage surface.
---
## Operational summary

phishlens focuses on extracting useful routing, sender, link, and content indicators from raw message artifacts. It is intentionally aimed at rapid classification and note capture rather than full case management.

## Workflow

- Load a suspicious message artifact such as an `.eml` file.
- Extract routing traits, message headers, and obvious indicators.
- Normalize the result into a reviewable analyst summary.
- Hand off indicators or notes into downstream investigation tooling.

## Documentation notes

The value is speed with structure. Analysts can inspect the message as data first, then decide whether a deeper client-side or environment-side review is warranted.
