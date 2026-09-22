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
