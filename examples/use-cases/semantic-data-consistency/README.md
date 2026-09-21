# Semantic data consistency

**Decision:** judge whether a structured record is semantically consistent after exact schema and invariant checks have already passed.

Run deterministic validation first: parsing, required fields, types, ranges, enums, identifiers, arithmetic, timestamps and known cross-field invariants remain ordinary code. Reflex handles only contradictions that require interpreting the meaning of supplied text or labels.

## State

Supply non-sensitive bounded record context, for example:

- normalized structured fields;
- a short semantic summary;
- the exact deterministic validation results;
- the intended record type or workflow.

## Branches

- `continue_candidate` — the supplied semantic fields are materially consistent.
- `exception_review` — the supplied fields materially contradict one another.
- `review` — the state is too sparse or ambiguous to judge reliably.

## Authority boundary

This Reflex is recommendation-only. It does not accept, reject, quarantine, rewrite or persist a record. The data pipeline must apply its own current validation, authorization and mutation policy after the recommendation.

## Workflow fit

`parse/schema/invariant checks -> Reflex semantic consistency -> application policy -> continue/exception review`.

If an exact rule can detect the contradiction, keep it deterministic and do not send it to Reflex.
