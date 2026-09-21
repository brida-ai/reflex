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

Use this gate before a browser/computer-use worker performs a potentially consequential action. A Reflex result never bypasses the browser tool's own authorization or user-confirmation policy.

Use structured action metadata when possible. Do not send screenshots containing sensitive data during the non-sensitive Preview.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
