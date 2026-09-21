# Change review risk playbook

Canonical use-case ID: `change-review-risk`
Version: `1`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- code review triage
- review depth
- change risk

## Decision

classify the semantic review depth a code or configuration change appears to require after deterministic checks have already run.

## Primary semantic question

Classify the review depth warranted by the supplied change summary after the listed deterministic checks. Judge only semantic risk and review needs, not merge eligibility.

## Declared branches

- `routine_review`
- `focused_review`
- `specialist_review`

## Canonical public guidance

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

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
