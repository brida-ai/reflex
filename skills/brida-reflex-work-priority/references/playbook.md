# Work priority reflex playbook

Canonical use-case ID: `work-priority`
Version: `1`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- task priority
- work routing
- run now or defer

## Decision

run now, defer, or escalate a task from bounded scheduling context.

## Primary semantic question

Choose the appropriate scheduling class for this task from urgency, deadline, blocker status and stated business impact.

## Declared branches

- `run_now`
- `defer`
- `human_attention`

## Canonical public guidance

# Work priority reflex

**Decision:** run now, defer, or escalate a task from bounded scheduling context.

This captures the human-reflex pattern: make a cheap scheduling decision before waking a more expensive agent. It can also revisit deferred work when deadlines become urgent.

The scheduler or operator owns execution. Reflex only recommends the queue branch.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
