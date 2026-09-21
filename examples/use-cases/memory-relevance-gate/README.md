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
