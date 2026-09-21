# Marketplace job fit playbook

Canonical use-case ID: `marketplace-job-fit`
Version: `1`
Question type: `binary`
Data class: `non_sensitive`

## Natural-language aliases

- none

## Decision

determine whether a bounded automation can realistically fulfill a marketplace brief.

## Primary semantic question

Can the supplied automation capability reliably fulfill this synthetic marketplace brief within the explicit scope and constraints?

## Declared branches

- `bid_candidate`
- `skip`
- `review`

## Canonical public guidance

# Marketplace job fit

**Decision:** determine whether a bounded automation can realistically fulfill a marketplace brief.

Use this gate to decide whether a job is a credible fit before expensive generation or human review. The Reflex remains a bounded decision, not an autonomous business process.

A `bid_candidate` result does not place a bid, accept work, set a price, promise an outcome, or contact a client.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
