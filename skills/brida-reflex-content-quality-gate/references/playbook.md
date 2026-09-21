# Content quality gate playbook

Canonical use-case ID: `content-quality-gate`
Version: `1`
Question type: `score`
Data class: `non_sensitive`

## Natural-language aliases

- none

## Decision

score a draft against explicit acceptance criteria before spending another expensive generation/review cycle.

## Primary semantic question

Score the supplied draft against the explicit audience, required facts and acceptance criteria. Judge fitness for the stated purpose, not writing style preference.

## Declared branches

- `publish_candidate`
- `revise`
- `reject`

## Canonical public guidance

# Content quality gate

**Decision:** score a draft against explicit acceptance criteria before spending another expensive generation/review cycle.

Use deterministic checks first for exact facts, formatting, links, and prohibited strings. Use Reflex for the bounded semantic quality judgment that remains.

A `publish_candidate` result is not publication authority.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
