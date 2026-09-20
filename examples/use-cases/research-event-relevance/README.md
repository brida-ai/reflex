# Research event relevance

**Decision:** classify whether a new event is relevant enough to an explicit research question to ignore, investigate, or surface for prompt human review.

Exact source allowlists, access control, duplicate detection, timestamps, hard compliance rules and known identifiers should remain deterministic.

## State

Supply non-sensitive bounded research context, for example:

- research question;
- event summary;
- source class;
- known relationship to the subject;
- deterministic freshness/deduplication results.

## Branches

- `ignore` — event does not materially affect the research question.
- `research_candidate` — event is materially relevant and worth investigation.
- `human_attention` — event is both directly relevant and described as high-consequence or time-sensitive.
- `review` — relevance or consequence is ambiguous.

## Authority boundary

This Reflex is recommendation-only. It does not trade, publish, contact anyone, change a portfolio, make a purchase or assert that the event is true. The application must verify the source and current authorization before downstream action.

## Workflow fit

`ingest -> deterministic freshness/dedup/access checks -> Reflex event relevance -> verification/research -> authorized downstream workflow`.
