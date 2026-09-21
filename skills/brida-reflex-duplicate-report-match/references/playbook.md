# Duplicate report match playbook

Canonical use-case ID: `duplicate-report-match`
Version: `1`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- duplicate issue
- duplicate ticket
- duplicate report

## Decision

decide whether two bounded reports most likely describe the same underlying problem, clearly different problems, or an ambiguous relationship after exact identifiers and known duplicate links have already been checked.

## Primary semantic question

Judge whether the two supplied reports describe the same underlying problem, distinct problems, or an ambiguous relationship. Use only the bounded evidence supplied after exact duplicate identifiers and hard conflicts have already been checked.

## Declared branches

- `duplicate_candidate`
- `distinct`
- `review`

## Canonical public guidance

# Duplicate report match

**Decision:** decide whether two bounded reports most likely describe the same underlying problem, clearly different problems, or an ambiguous relationship after exact identifiers and known duplicate links have already been checked.

This is not entity matching. Two reports can use different wording, users, timestamps, or reproduction details and still describe the same underlying defect. Conversely, reports on the same product surface can describe distinct failure modes.

Use deterministic code first for exact issue IDs, explicit duplicate links, normalized external references, hard version/environment conflicts, authorization and repository/workflow state.

## State

Supply only non-sensitive normalized report evidence, for example:

- short summaries of the observed behavior;
- coarse product/component or surface classes;
- bounded reproduction/outcome descriptions;
- deterministic exact-match/conflict signals.

Do not send private customer data, secrets, credentials, or unrestricted issue bodies to a `non_sensitive` Preview Reflex.

## Branches

- `duplicate_candidate` — the reports plausibly describe the same underlying problem.
- `distinct` — the supplied evidence clearly points to different underlying problems.
- `review` — overlap exists but the evidence is mixed or insufficient.

## Authority boundary

This Reflex is recommendation-only. It does not close, label, merge, comment on, assign, or mutate either report. The host workflow owns duplicate policy and any repository/ticketing action.

## Workflow fit

A safe flow is:

`exact IDs/links + hard conflicts -> bounded report pair -> Reflex duplicate judgment -> authorized triage workflow`.

Use retrieval or deterministic candidate generation before Reflex when comparing one new report against a large backlog.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
