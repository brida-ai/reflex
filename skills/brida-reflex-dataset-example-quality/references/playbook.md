# Dataset example quality playbook

Canonical use-case ID: `dataset-example-quality`
Version: `1`
Question type: `score`
Data class: `non_sensitive`

## Natural-language aliases

- training data screening
- dataset curation

## Decision

score one synthetic training/evaluation example against a small quality rubric before it becomes a curation candidate.

## Primary semantic question

Score whether the supplied synthetic example is coherent, unambiguous and useful for the stated task after deterministic validation has passed.

## Declared branches

- `keep_candidate`
- `review`
- `drop_candidate`

## Canonical public guidance

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

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
