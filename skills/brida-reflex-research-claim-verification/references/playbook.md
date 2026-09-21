# Research claim verification gate playbook

Canonical use-case ID: `research-claim-verification`
Version: `1`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- claim verification
- citation check
- evidence verification

## Decision

decide whether a claim is supported enough to continue, contradicted enough to stop, or needs more verification.

## Primary semantic question

Given only the supplied claim and short source summaries, classify whether the evidence is sufficiently supportive, materially contradictory, or still unclear.

## Declared branches

- `continue`
- `stop`
- `verify`

## Canonical public guidance

# Research claim verification

**Decision:** decide whether a claim is supported enough to continue, contradicted enough to stop, or needs more verification.

This does not replace source retrieval or fact checking. Reflex sees the bounded state you provide; your research system is responsible for obtaining trustworthy, current sources.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
