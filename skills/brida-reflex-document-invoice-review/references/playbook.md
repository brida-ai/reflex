# Invoice review gate playbook

Canonical use-case ID: `document-invoice-review`
Version: `1`
Question type: `binary`
Data class: `non_sensitive`

## Natural-language aliases

- none

## Decision

decide whether a normalized, synthetic invoice summary needs a human review.

## Primary semantic question

Does this synthetic invoice summary need manual review before the normal accounting workflow continues?

## Declared branches

- `review`
- `continue`

## Canonical public guidance

# Invoice review gate

**Decision:** decide whether a normalized, synthetic invoice summary needs a human review.

Do arithmetic and deterministic validation in code first. Use Reflex for the bounded semantic exception that remains. The Reflex does not approve payment or move money.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
