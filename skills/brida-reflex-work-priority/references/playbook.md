# Work priority reflex playbook

Canonical use-case ID: `work-priority`
Version: `2`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- task priority
- work routing
- run now or defer

## Decision

classify a bounded task as run now, defer, escalate for human attention, or review when scheduling evidence is insufficient.

## Primary semantic question

Choose the scheduling class from urgency, deadline, blocker status and stated impact. Treat materially blocked or high-consequence work as escalation rather than ordinary run-now work; use unclear when the evidence is insufficient.

## Declared branches

- `run_now`
- `defer`
- `human_attention`
- `review`

## Canonical public guidance

# Work priority reflex

**Decision:** classify a bounded task as run now, defer, escalate for human attention, or review when scheduling evidence is insufficient.

Use deterministic scheduler rules first for fixed SLAs, explicit queue ownership, hard deadlines, disabled work classes, dependency state, maintenance windows and other exact constraints. Reflex handles the semantic scheduling judgment that remains.

## State

Supply only non-sensitive normalized scheduling context, for example:

- short task summary;
- deadline or urgency class;
- whether the task is materially blocked;
- stated business/user impact;
- whether a human decision is already required;
- deterministic scheduler signals already computed by the host.

## Branches

- `run_now` — time-sensitive and actionable work should enter the active queue now, with no supplied condition requiring human escalation.
- `defer` — useful work has no immediate deadline, blocker or material consequence requiring active attention.
- `human_attention` — work is overdue, materially blocked, or carries a consequence that warrants human attention before or alongside scheduling.
- `review` — the supplied scheduling evidence is mixed or insufficient to choose reliably.

## Authority boundary

This Reflex is recommendation-only. It does not start a worker, consume budget, grant tool permissions, cancel other work, change a deadline, page a person, or mutate queue state. The scheduler/operator revalidates current dependencies, capacity, authorization and policy before any side effect.

## Workflow fit

A robust flow is:

`deterministic scheduler policy -> bounded Reflex priority class -> queue/human policy -> current-state revalidation -> optional scheduling action`.

When a task is both urgent and materially blocked, the blocker/consequence should take precedence over ordinary `run_now` scheduling and route to human attention.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
