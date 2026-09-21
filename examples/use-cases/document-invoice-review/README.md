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
