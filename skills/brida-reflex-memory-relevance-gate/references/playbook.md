# Memory relevance gate playbook

Canonical use-case ID: `memory-relevance-gate`
Version: `1`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- memory relevance
- remember this
- memory gate

## Decision

decide whether a non-sensitive observation has enough durable future utility to become a memory candidate.

## Primary semantic question

Classify the future usefulness of this policy-eligible, non-sensitive observation. Judge durability and likely reuse, not whether storage is authorized.

## Declared branches

- `store_candidate`
- `ignore`
- `review`

## Canonical public guidance

# Memory relevance gate

**Decision:** decide whether a non-sensitive observation has enough durable future utility to become a memory candidate.

Run deterministic privacy, secret, tenant, retention and explicit no-store checks first. Reflex only judges the fuzzy remainder: whether the supplied observation is likely to remain useful beyond the current interaction.

## State

Supply only non-sensitive, policy-eligible fields such as:

- the observation;
- its scope and expected lifetime;
- evidence of repetition or durable preference;
- the future tasks for which it could matter.

## Branches

- `store_candidate` — durable, reusable information that may be worth persisting.
- `ignore` — transient or one-off state with little future utility.
- `review` — the evidence is mixed or insufficient.

## Authority boundary

This Reflex is recommendation-only. It does not write memory, expand retention, override a no-store request, bypass privacy rules, or grant access to protected context. The host must revalidate data class, retention policy, user controls and current authorization before any persistence.

## Workflow fit

`privacy/retention prechecks -> Reflex memory relevance -> host retention policy -> optional authorized persistence`.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
