# Research event relevance playbook

Canonical use-case ID: `research-event-relevance`
Version: `1`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- none

## Decision

classify whether a new event is relevant enough to an explicit research question to ignore, investigate, or surface for prompt human review.

## Primary semantic question

Classify the supplied event by its material relevance and stated consequence for the explicit research question.

## Declared branches

- `ignore`
- `research_candidate`
- `human_attention`

## Canonical public guidance

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

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
