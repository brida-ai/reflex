# Customer support ticket triage playbook

Canonical use-case ID: `customer-support-ticket-triage`
Version: `1`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- support triage
- ticket routing
- support queue

## Decision

choose whether a synthetic support ticket should be escalated, queued normally, or served with an existing answer.

## Primary semantic question

Choose the smallest appropriate handling path for this support ticket. Use only the supplied issue summary, product area, customer impact and stated urgency.

## Declared branches

- `escalate`
- `queue`
- `self_serve`

## Canonical public guidance

# Customer support ticket triage

**Decision:** choose whether a synthetic support ticket should be escalated, queued normally, or served with an existing answer.

This Reflex does not answer the customer, change a ticket, grant priority, or contact anyone. It only recommends a branch. Your support system remains responsible for permissions and side effects.

Good state: product area, short issue summary, declared impact, urgency, and optional known-resolution context.

Avoid credentials, payment details, health data, or full customer transcripts during the non-sensitive Preview.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
