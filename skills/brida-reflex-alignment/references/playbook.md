# Reflex Alignment playbook

Canonical use-case ID: `alignment`
Version: `1`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- none

## Decision

classify one proposed agent action against explicit execution principles before the host performs the side effect.

## Primary semantic question

Judge only whether the proposed action is materially consistent with the explicit execution principles supplied in state. Do not invent additional policy. Treat missing, conflicting or insufficient evidence as unclear. Exact authorization, capability, budget, schema, allow/deny-list and protected-action controls remain host-owned.

## Declared branches

- `aligned_candidate`
- `review`
- `misaligned_candidate`

## Canonical public guidance

# Reflex Alignment

**A practical alignment layer for agentic AI execution.**

**Decision:** classify one proposed agent action against explicit execution principles before the host performs the side effect.

Modern AI systems can reason, call tools, modify software, browse the web, send messages, move through interfaces and trigger real-world side effects. The harder problem is no longer only *what the model says*, but **whether the action it is about to execute is consistent with the rules, intent and constraints of the system operating it**.

Reflex Alignment is a Brida Reflex use case for that boundary.

## The problem

An agent proposes an action:

`model -> proposed action -> tool execution`

If the same model that generated the action is also the only component deciding whether it is acceptable, generation and supervision collapse into the same failure domain.

## The pattern

Insert an independent Reflex before execution:

`model -> proposed action -> Reflex Alignment -> host policy -> execution`

The Reflex receives a bounded description of the proposed action plus an explicit execution policy and classifies it as:

- `aligned_candidate` — materially consistent with the supplied policy;
- `review` — ambiguous, incomplete or consequential enough to require another gate;
- `misaligned_candidate` — materially conflicts with the supplied policy.

The application, not Reflex, retains authority over the action.

## How it works

1. Define the principles that matter for this execution boundary.
2. Keep exact controls in code: permissions, capabilities, budgets, schemas, allow/deny lists and protected actions.
3. Before a consequential tool call, serialize only the bounded semantic context Reflex needs.
4. Run the `reflex-alignment` decision.
5. Map the result to deterministic host policy.
6. Revalidate current state and authorization immediately before executing.
7. Record the decision when auditability matters.

## Configuration

The example configuration contains one semantic question: whether the proposed action is consistent with the supplied execution principles.

Typical state:

```json
{
  "action": "Publish the prepared release to production",
  "purpose": "Ship version 1.4 after validation",
  "effect": "Changes the production application",
  "reversible": true,
  "principles": [
    "Production deploys require passing CI",
    "Do not deploy when a required approval is missing",
    "Do not bypass protected-environment controls"
  ],
  "deterministicChecks": {
    "ciPassed": true,
    "requiredApprovalPresent": false
  }
}
```

Known hard failures should be rejected deterministically before Reflex. The semantic gate is for the remainder that requires interpretation.

## What this is — and is not

Reflex Alignment is an **inference-time supervision and execution-control pattern**. It can help make autonomous systems more observable, reviewable and controllable at the moment they act.

It is **not** a claim that Brida Reflex solves the general AI alignment problem, proves a model has safe internal objectives, or guarantees safety under arbitrary conditions.

The useful claim is narrower and testable:

> Every consequential AI action can pass through an independent, explicit and measurable semantic control layer before execution.

## Measuring alignment behavior

Use [ReflexBench](https://github.com/brida-ai/reflexbench) to evaluate the **Reflex decision engine** on false allows, false blocks, review/abstention, calibration, wording invariance, adversarial framing, latency and cost.

Use [AlignmentBench](https://github.com/brida-ai/alignmentbench) to evaluate the **target model or checkpoint** under explicit operational policy. It tests authority boundaries, instruction conflicts, uncertainty/escalation, reversibility/impact, scope integrity, interruptibility/oversight and trajectory integrity. AlignmentBench can also emit each proposed action as a Reflex Alignment state for an independent semantic audit.

For training or post-training, treat the public AlignmentBench suite as a reproducible regression set and pair it with private, rotating holdouts rather than optimizing directly against a fixed public exam.

Together, the layers are intentionally separate:

```text
AlignmentBench -> target behavior
ReflexBench -> decision-engine quality
Reflex Alignment -> execution-time semantic supervision
```

This turns "alignment" from a purely abstract promise into a concrete execution boundary and a measurable behavioral evaluation loop.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
