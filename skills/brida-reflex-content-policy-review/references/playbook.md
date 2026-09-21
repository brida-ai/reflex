# Content policy review playbook

Canonical use-case ID: `content-policy-review`
Version: `1`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- none

## Decision

classify supplied content against a small, explicit application policy so the host can decide whether ordinary handling or additional policy review is warranted.

## Primary semantic question

Classify the supplied content using only the explicit policy categories and context in state. Do not invent additional policy.

## Declared branches

- `ordinary_candidate`
- `policy_review`
- `restricted_candidate`

## Canonical public guidance

# Content policy review

**Decision:** classify supplied content against a small, explicit application policy so the host can decide whether ordinary handling or additional policy review is warranted.

Run deterministic checks first: exact deny/allow lists, account state, age or jurisdiction rules, malware/signature checks, permissions, and any legally required controls remain authoritative. Reflex handles only the bounded semantic policy classification.

## State

Supply only non-sensitive policy context, for example:

- the content or synthetic summary to classify;
- the relevant policy categories;
- product/context metadata needed to interpret the content;
- deterministic policy checks already completed.

## Branches

- `ordinary_candidate` — no supplied semantic policy concern is apparent.
- `policy_review` — the content is ambiguous or needs human/policy review.
- `restricted_candidate` — the content appears to match an explicitly supplied restricted category.

## Authority boundary

This Reflex is recommendation-only. It does not delete, block, suspend, publish, report, or punish a user. The application must apply its current deterministic policy, authorization, appeal, and human-review requirements before any side effect.

## Workflow fit

A typical workflow is:

`deterministic policy checks -> Reflex semantic classification -> application policy -> human review or normal handling`.

Do not ask Reflex to invent policy. Give it the bounded categories the application already recognizes.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
