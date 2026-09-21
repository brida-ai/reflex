# Dataset example quality

**Decision:** score one synthetic training/evaluation example against a small quality rubric before it becomes a curation candidate.

Run deterministic schema, duplicate-ID, encoding, length, forbidden-data and exact-label checks first. Reflex evaluates only the semantic quality that remains.

## State

Supply non-sensitive synthetic fields such as the example input, proposed label, short rationale and deterministic validation results.

## Branches

- `keep_candidate` — semantically coherent and useful under the stated rubric.
- `review` — potentially useful but materially ambiguous or imperfect.
- `drop_candidate` — semantically contradictory, meaningless or clearly unsuitable.

## Authority boundary

This Reflex is recommendation-only. It does not delete data, publish datasets, start training, alter labels, or expand allowed data classes. The curation pipeline owns those actions and revalidates policy before any mutation.

## Workflow fit

`deterministic data checks -> Reflex quality score -> curator/pipeline policy -> optional dataset mutation`.
