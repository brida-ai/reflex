# Model effort routing

**Decision:** recommend the smallest abstract model/agent effort tier that appears sufficient for one bounded task after deterministic routing policy has already run.

This is intentionally different from the official `agent-router` recipe. `agent-router` classifies the kind of work; this Custom Reflex classifies the apparent **effort/depth** required for a task.

## State

Supply only non-sensitive normalized task context, for example:

- a short task summary;
- whether the work is local or cross-component;
- whether it requires multi-step reasoning or long-horizon planning;
- whether code generation, external research or verification is expected;
- coarse ambiguity and dependency signals.

Explicit user model/tier choices, allowed-model catalogs, provider availability, budget limits, context-window limits, prompt-cache policy and minimum safety/quality floors should be resolved in deterministic host code before or after the Reflex as appropriate.

## Branches

- `fast_candidate` — a local, mechanical or shallow task appears sufficient for the lowest admitted effort tier.
- `balanced_candidate` — the task needs material reasoning or implementation work but remains bounded and well-scoped.
- `deep_candidate` — the task requires broad cross-component reasoning, long-horizon planning, difficult synthesis or substantial verification.
- `review` — the supplied evidence is mixed or insufficient to choose a tier reliably.

## Authority boundary

This Reflex is recommendation-only. It does not choose a provider account, grant access to a model, override a user-selected tier, bypass a minimum tier, spend budget, change tools, or execute the task. The application maps abstract tiers to currently allowed models and revalidates availability, capability, policy and cost before dispatch.

A semantic recommendation may increase or decrease suggested effort only within host policy. Deterministic floors and explicit user choices remain authoritative.

## Workflow fit

A robust flow is:

`explicit override / hard policy -> bounded Reflex effort recommendation -> deterministic tier floor/cap + availability mapping -> dispatch`.

Tool-loop continuations, already-pinned sessions and other states where changing tiers would violate host invariants should normally bypass this Reflex.
