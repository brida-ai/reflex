# Catalog listing signals playbook

Canonical use-case ID: `catalog-listing-signals`
Version: `1`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- none

## Decision

classify the primary kind of a bounded catalog listing while collecting independent quality and clarification signals over the same state.

## Primary semantic question

Choose the primary bounded catalog type described by the supplied listing.

## Declared branches

- `physical_candidate`
- `digital_candidate`
- `service_candidate`
- `review`

## Canonical public guidance

# Catalog listing signals

**Decision:** classify the primary kind of a bounded catalog listing while collecting independent quality and clarification signals over the same state.

Run deterministic catalog rules first: seller authorization, SKU/identifier validation, exact category allowlists, required-field checks, price/currency validation and prohibited-item policy remain application code.

## State

Supply only non-sensitive normalized listing context, for example:

- title and short description;
- already-normalized structured attributes;
- deterministic validation results;
- the bounded catalog context.

## Questions

This example demonstrates independent fan-out over one state:

- `listingType` — primary bounded category used by the declarative branch;
- `descriptionQuality` — an advisory rubric score;
- `needsClarification` — an advisory binary signal for semantic ambiguity.

Secondary answers are evidence. They do not silently override the primary policy or grant authority.

## Branches

- `physical_candidate` — the listing semantically describes a physical good.
- `digital_candidate` — the listing describes software or another digital product.
- `service_candidate` — the listing describes a bounded event or delivered service.
- `review` — no supported category fits confidently.

## Authority boundary

This Reflex is recommendation-only. It does not publish a listing, set a price, approve a seller, moderate content, charge a customer, or mutate catalog records. The catalog service must revalidate current state, permissions and policy before any side effect.

## Workflow fit

`schema/identity/catalog rules -> Reflex fan-out signals -> application policy/review -> authorized catalog mutation`.

If a later question depends on the selected category, make a second Reflex call with that category-specific answer space instead of pretending dependent questions are independent fan-out.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
