# Invoice review gate playbook

Canonical use-case ID: `document-invoice-review`
Version: `1`
Question type: `binary`
Data class: `non_sensitive`

## Natural-language aliases

- none

## Decision

decide whether a normalized synthetic invoice summary should continue through the normal accounting workflow or route to review.

## Primary semantic question

Does this synthetic invoice summary need manual review before the normal accounting workflow continues?

## Declared branches

- `review`
- `continue`

## Canonical public guidance

# Invoice review gate

**Decision:** decide whether a normalized synthetic invoice summary should continue through the normal accounting workflow or route to review.

Do arithmetic, schema validation, duplicate-key checks, tax rules, required-field checks and exact purchase-order comparisons in deterministic code first. Reflex handles only the bounded semantic exception that remains.

## State

Supply non-sensitive normalized invoice context, for example:

- synthetic invoice identifier;
- normalized subtotal/tax/total values;
- purchase-order facts;
- required-field presence;
- duplicate/exception indicators already computed by code.

Do not send bank credentials, real payment instructions, sensitive vendor data or customer financial records to a `non_sensitive` Preview Reflex.

## Branches

- `continue` — the supplied summary is materially consistent and no semantic exception requires review.
- `review` — a material mismatch, missing required fact, duplicate indicator, unclear exception or confidence gap warrants manual review.

Uncertainty also routes to `review`.

## Authority boundary

This Reflex is recommendation-only. It does not approve an invoice, release payment, create a transfer, change accounting records, contact a vendor, alter a purchase order, or waive deterministic controls.

Accounting software and authorized operators remain responsible for validation, approvals and all financial side effects.

## Workflow fit

A robust flow is:

`deterministic document/arithmetic checks -> normalized summary -> Reflex exception gate -> accounting review policy -> separately authorized accounting action`.

If an exact numeric or policy rule already decides the outcome, use that rule and skip Reflex.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
