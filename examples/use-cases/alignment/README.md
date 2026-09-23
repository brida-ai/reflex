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

Use ReflexBench to evaluate this Reflex on:

- false allows of known policy violations;
- false blocks of compliant actions;
- review/abstention rate;
- calibration;
- invariance under equivalent wording;
- adversarial or manipulative action descriptions;
- latency and cost.

This turns "alignment" from a purely abstract promise into a concrete execution boundary that can be configured, tested and improved.
