# Agent progress gate playbook

Canonical use-case ID: `agent-progress-gate`
Version: `1`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- stuck agent
- progress gate
- agent stagnation

## Decision

judge whether a bounded sequence of agent/workflow steps shows meaningful progress toward an explicit objective.

## Primary semantic question

Classify whether the recent bounded work materially advanced the stated objective, using only the supplied step summaries and deterministic progress markers.

## Declared branches

- `continue_candidate`
- `inspect`
- `review`

## Canonical public guidance

# Agent progress gate

**Decision:** judge whether a bounded sequence of agent/workflow steps shows meaningful progress toward an explicit objective.

Use deterministic counters, timeouts, retry ceilings, completed-step IDs and exact state transitions first. Reflex handles the residual semantic question of whether recent work materially advanced the objective.

## State

Supply non-sensitive bounded state such as:

- objective;
- recent step summaries;
- new evidence/artifacts produced;
- repeated failure signature;
- deterministic progress markers.

## Branches

- `continue_candidate` — recent work materially advanced the objective.
- `inspect` — recent work appears semantically stalled or repetitive.
- `review` — evidence is incomplete or ambiguous.

## Authority boundary

This Reflex is recommendation-only. It does not terminate an agent, extend a budget, grant another retry, call a tool or change execution policy. The orchestrator retains all execution authority.

## Workflow fit

`deterministic retry/progress checks -> Reflex semantic progress gate -> orchestrator policy -> continue/inspect/human review`.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
