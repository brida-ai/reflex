# Retrieval relevance gate

**Decision:** decide whether a retrieved candidate is semantically relevant enough to remain in a downstream evidence set.

Run deterministic retrieval, access-control, source allowlist, deduplication, and exact-filter checks first. Reflex only judges the bounded semantic question that remains: whether the supplied candidate materially addresses the supplied information need.

## State

Supply only the non-sensitive fields needed for the judgment, for example:

- the information need or query;
- a short candidate passage or synthetic summary;
- source class;
- optional retrieval metadata that is not itself an authority signal.

## Branches

- `include_candidate` — the candidate materially addresses the information need.
- `discard` — the candidate is clearly irrelevant.
- `review` — relevance is ambiguous or evidence is insufficient.

## Authority boundary

This Reflex is recommendation-only. It does not grant document access, alter retrieval permissions, assert that a source is true, or authorize publication. The application must still verify authorization, provenance, freshness, and any claim-support requirements before using the material.

## Workflow fit

A typical workflow is:

`deterministic retrieval -> access/filter checks -> Reflex relevance gate -> claim/evidence verification -> downstream model or human`.

Use deterministic similarity or exact metadata rules when they fully solve the problem. Use Reflex only for the semantic relevance judgment that cannot be expressed reliably as an exact rule.
