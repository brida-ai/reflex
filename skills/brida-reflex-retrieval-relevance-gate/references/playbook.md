# Retrieval relevance gate playbook

Canonical use-case ID: `retrieval-relevance-gate`
Version: `1`
Question type: `binary`
Data class: `non_sensitive`

## Natural-language aliases

- RAG relevance
- retrieval gate
- search relevance

## Decision

decide whether a retrieved candidate is semantically relevant enough to remain in a downstream evidence set.

## Primary semantic question

Does the supplied candidate materially address the stated information need, based only on the supplied query and candidate content?

## Declared branches

- `include_candidate`
- `discard`
- `review`

## Canonical public guidance

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

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
