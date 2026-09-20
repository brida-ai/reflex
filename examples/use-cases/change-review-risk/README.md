# Change review risk

**Decision:** classify the semantic review depth a code or configuration change appears to require after deterministic checks have already run.

Run deterministic policy first: protected-path rules, generated-file detection, schema validation, static analysis, tests, signature checks, dependency policy and exact ownership rules should remain authoritative. Reflex handles only the residual semantic review question.

## State

Supply only non-sensitive review context, for example:

- a bounded change summary or synthetic diff summary;
- affected component classes;
- whether tests changed;
- deterministic check results;
- stated compatibility or security impact.

## Branches

- `routine_review` — normal review appears sufficient.
- `focused_review` — the change warrants targeted human review in a bounded specialty.
- `specialist_review` — the change has material security, compatibility, reliability or data-handling implications that warrant specialist attention.
- `review` — evidence is ambiguous or incomplete.

## Authority boundary

This Reflex is recommendation-only. It does not approve, merge, deploy, waive CI, modify branch protection, or prove a defect exists. Deterministic repository governance and authorized human review remain controlling.

## Workflow fit

A typical workflow is:

`deterministic repo policy + CI -> Reflex review-depth recommendation -> authorized reviewer assignment -> normal merge/deploy controls`.

Use exact repository rules whenever they settle the outcome. Reflex should not replace static analyzers, tests or ownership policy.
