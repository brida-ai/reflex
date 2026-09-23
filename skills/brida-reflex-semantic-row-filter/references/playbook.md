# Semantic row filter playbook

Canonical use-case ID: `semantic-row-filter`
Version: `1`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- semantic SQL
- semantic filter
- semantic grep
- semantic predicate
- semantic WHERE
- natural language filter
- natural language SQL filter
- row relevance

## Decision

judge whether one already-authorized structured row satisfies one explicit qualitative predicate after exact SQL/database filters have already run.

## Primary semantic question

Classify whether the supplied already-authorized row materially satisfies the stated qualitative predicate, clearly does not satisfy it, or lacks enough semantic evidence to decide reliably.

## Declared branches

- `include_candidate`
- `discard`
- `review`

## Canonical public guidance

# Semantic row filter

**Decision:** judge whether one already-authorized structured row satisfies one explicit qualitative predicate after exact SQL/database filters have already run.

Use ordinary SQL or deterministic code first for exact predicates: tenant/namespace scope, permissions, identifiers, enums, dates, ranges, null checks, numeric comparisons, joins and known business rules remain authoritative. Reflex handles only the bounded semantic remainder that cannot be expressed reliably as an exact predicate.

## State

Supply only non-sensitive normalized row context, for example:

- the qualitative predicate;
- a bounded projection of the already-authorized row;
- a short normalized text/label summary when needed;
- deterministic filter/validation signals already computed by the host.

Do not send an unrestricted row, credentials, sensitive personal data, protected tenant data or fields the caller was not already authorized to read.

## Branches

- `include_candidate` — the supplied row materially satisfies the qualitative predicate.
- `discard` — the supplied row materially does not satisfy the qualitative predicate.
- `review` — the evidence is mixed, underspecified or not sufficient to decide reliably.

## Authority boundary

This Reflex is recommendation-only. It does not generate SQL, broaden a query, bypass row-level security, grant database access, write/update/delete a row, reorder protected records or persist a filter result.

The database/application must apply authorization and exact predicates before Reflex, and must revalidate current row state and policy before any downstream side effect.

## Workflow fit

`authorization / RLS -> exact SQL predicates -> bounded row projection -> Reflex semantic predicate -> host include/discard/review policy`

Use a per-row Binary decision (or bounded fan-out) when the candidate set is already known. For a very large or runtime-defined result set, prefilter deterministically and use bounded batching/ranking rather than placing arbitrary row identities into one static Choice.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
