# Semantic data consistency playbook

Canonical use-case ID: `semantic-data-consistency`
Version: `2`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- none

## Decision

judge whether a structured record is semantically consistent after exact schema and invariant checks have already passed.

## Primary semantic question

Classify whether the supplied normalized record is semantically consistent after exact schema and invariant checks. Use only supplied evidence: do not infer completion, health, approval or other missing state. If sources are tentative, materially mixed, or required semantic evidence is absent and structured fields do not resolve it, select unclear.

## Declared branches

- `continue_candidate`
- `exception_review`
- `review`

## Canonical public guidance

# Semantic data consistency

**Decision:** judge whether a structured record is semantically consistent after exact schema and invariant checks have already passed.

Run deterministic validation first: parsing, required fields, types, ranges, enums, identifiers, arithmetic, timestamps and known cross-field invariants remain ordinary code. Reflex handles only contradictions or evidence sufficiency questions that require interpreting the meaning of supplied text or labels. Do not infer missing completion, health or approval evidence.

## State

Supply non-sensitive bounded record context, for example:

- normalized structured fields;
- a short semantic summary;
- the exact deterministic validation results;
- the intended record type or workflow.

## Branches

- `continue_candidate` — the supplied evidence supports one materially coherent state without unresolved tentative or conflicting claims.
- `exception_review` — the supplied fields materially contradict one another.
- `review` — evidence is materially sparse, tentative or mixed and the structured fields do not resolve it.

## Authority boundary

This Reflex is recommendation-only. It does not accept, reject, quarantine, rewrite or persist a record. The data pipeline must apply its own current validation, authorization and mutation policy after the recommendation.

## Workflow fit

`parse/schema/invariant checks -> Reflex semantic consistency -> application policy -> continue/exception review`.

If an exact rule can detect the contradiction, keep it deterministic and do not send it to Reflex.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
