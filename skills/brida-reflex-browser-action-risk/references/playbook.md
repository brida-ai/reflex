# Browser action risk gate playbook

Canonical use-case ID: `browser-action-risk`
Version: `1`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- browser action
- computer use risk
- DOM action risk

## Decision

classify a proposed browser/computer-use action as an automation candidate, review-required, or blocked.

## Primary semantic question

Classify the proposed browser action using only the supplied action description, destination class, reversibility, consequence summary, and whether it writes externally visible state.

## Declared branches

- `auto_candidate`
- `review`
- `block`

## Canonical public guidance

# Browser action risk gate

**Decision:** classify a proposed browser/computer-use action as an automation candidate, review-required, or blocked.

Use deterministic authorization and tool policy first. Reflex handles only the bounded semantic risk judgment that remains.

## State

Supply non-sensitive structured action metadata when possible, for example:

- proposed action;
- destination/surface class;
- reversibility;
- consequence summary;
- whether the action writes externally visible state.

Do not send screenshots containing sensitive data during the `non_sensitive` Preview.

## Branches

- `auto_candidate` — low-risk, read-only or local/reversible action with no protected side effect.
- `review` — mutable, externally visible, consequential or ambiguous action that needs normal human/policy review.
- `block` — financial, credential, destructive, permission-changing, security-sensitive or otherwise protected action.

Low semantic risk is not authorization.

## Authority boundary

This Reflex is recommendation-only. It does not click, type, submit, purchase, send, change permissions, grant browser/tool access, or bypass user confirmation. A `block` result is also only policy evidence; the host owns enforcement.

The browser/computer-use runtime must revalidate current page state, authorization and tool policy before any action.

## Workflow fit

A robust flow is:

`deterministic authorization/policy -> proposed action snapshot -> Reflex risk class -> host review policy -> current-state revalidation -> separately authorized action`.

Use exact rules for known protected actions whenever possible; use Reflex for the semantic remainder.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
