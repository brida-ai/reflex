# Reflex examples

This directory contains public, synthetic examples for Brida Reflex.

- `minimal-reflex.yaml` — smallest public official-recipe shape.
- `custom-reflex-draft.json` — minimal Organization-private Custom Reflex draft.
- `use-cases/` — realistic, copyable Custom Reflex examples for common workflows.

## Real-world use cases

The initial catalog includes:

- browser/computer-use action risk;
- content quality gates;
- customer-support triage;
- invoice/document review;
- marketplace job fit;
- research claim verification;
- sales lead fit;
- work prioritization.

Each use case contains a `custom-reflex.json` plus a short README explaining the decision boundary and what the Reflex does **not** authorize.

All fixtures are synthetic. Developer Preview examples use `non_sensitive` state only.

## Contribution shape

A new example should include:

1. one bounded semantic decision;
2. explicit branches and uncertainty behavior;
3. synthetic or redacted fixtures;
4. a clear explanation of side-effect authority staying outside Reflex;
5. no secrets, customer data, provider credentials, or unsupported benchmark claims.

Community examples never auto-activate hosted behavior.
