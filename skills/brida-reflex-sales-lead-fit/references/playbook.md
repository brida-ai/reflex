# Sales lead fit playbook

Canonical use-case ID: `sales-lead-fit`
Version: `1`
Question type: `binary`
Data class: `non_sensitive`

## Natural-language aliases

- none

## Decision

decide whether the supplied non-sensitive lead facts match a stated ICP.

## Primary semantic question

Does this lead match the explicitly supplied ideal-customer profile closely enough to justify a sales follow-up?

## Declared branches

- `qualified`
- `ignore`
- `review`

## Canonical public guidance

# Sales lead fit

**Decision:** decide whether the supplied non-sensitive lead facts match a stated ICP.

The Reflex does not send outreach, enrich a person, purchase data, or decide commercial terms. A `qualified` result is only a recommendation to enter the normal sales workflow.

Keep the ICP explicit in state so the decision is auditable rather than hidden in a prompt.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
