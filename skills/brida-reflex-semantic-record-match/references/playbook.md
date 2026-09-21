# Semantic record match playbook

Canonical use-case ID: `semantic-record-match`
Version: `1`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- entity matching
- record matching
- semantic match

## Decision

decide whether two normalized records plausibly refer to the same real-world entity when exact identifiers do not settle the match.

## Primary semantic question

Classify whether the two supplied normalized records plausibly refer to the same entity. Use only the supplied comparison fields and deterministic signals.

## Declared branches

- `match_candidate`
- `different`
- `review`

## Canonical public guidance

# Semantic record match

**Decision:** decide whether two normalized records plausibly refer to the same real-world entity when exact identifiers do not settle the match.

Run deterministic matching first: stable IDs, exact normalized identifiers, explicit aliases, hard exclusions, and domain-specific invariants should win whenever available. Reflex handles only the bounded fuzzy remainder.

## State

Supply non-sensitive normalized comparison fields, for example:

- canonicalized names or labels;
- organization or category;
- coarse location or other non-sensitive disambiguators;
- deterministic-match signals already computed by the application.

## Branches

- `match_candidate` — the records are semantically consistent with the same entity.
- `different` — the supplied evidence materially indicates different entities.
- `review` — the evidence is ambiguous or incomplete.

## Authority boundary

This Reflex is recommendation-only. It does not merge records, rewrite identifiers, grant access, or mutate a knowledge graph. The application must revalidate uniqueness, authorization, protected fields, and merge policy before any side effect.

## Workflow fit

A typical workflow is:

`normalize -> deterministic exact matching/exclusions -> Reflex semantic match -> deterministic merge policy or human review`.

Do not use Reflex where an exact identifier or deterministic business rule already decides the result.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
