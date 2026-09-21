# Semantic response health playbook

Canonical use-case ID: `semantic-response-health`
Version: `1`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- none

## Decision

classify whether a transport-successful response confirms completion, semantically reports failure, or leaves the requested operation unresolved.

## Primary semantic question

Classify what the normalized transport-successful payload establishes about the requested operation. Distinguish explicit completion from explicit semantic failure and from an unresolved acknowledgement or queued state.

## Declared branches

- `continue_candidate`
- `failure_review`
- `review`

## Canonical public guidance

# Semantic response health

**Decision:** classify whether a transport-successful response confirms completion, semantically reports failure, or leaves the requested operation unresolved.

Use deterministic transport and protocol checks first. This Reflex handles the residual case where a syntactically valid success envelope may contain an application-level failure or may only acknowledge/queue work without proving completion.

## State

Supply only the non-sensitive response summary needed for the judgment, for example:

- transport status class;
- operation type;
- normalized response status or message;
- deterministic protocol-validation result.

## Branches

- `continue_candidate` — the response explicitly confirms the requested operation completed normally.
- `failure_review` — the response semantically reports failure, rejection or unavailability.
- `review` — the response is valid but does not establish either completion or failure.

## Authority boundary

This Reflex is recommendation-only. It does not open or close a circuit breaker, retry a request, fail over providers, mutate state, or declare an upstream system healthy. Application code owns those actions, thresholds and current-state checks.

## Workflow fit

`transport/protocol checks -> Reflex semantic health -> resilience policy -> optional retry/failover/human review`.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
