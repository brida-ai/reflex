# Game state action

**Decision:** recommend one legal tactical action from a small action set using a bounded synthetic game state.

Deterministic game code first determines legal actions, hard rules and terminal states. Reflex only chooses among the supplied legal semantic options.

## State

Supply compact non-sensitive game state such as objective status, health, resources, nearby pressure and the already-authorized action set.

## Branches

- `advance_candidate` — advancing best fits the current state.
- `defend_candidate` — defending the current position best fits the state.
- `retreat_candidate` — disengaging best fits the state.
- `hold_candidate` — maintaining position without committing best fits the state.
- `review` — the state does not support a confident recommendation.

## Authority boundary

This Reflex is recommendation-only. The game engine revalidates legality and current state before applying any action. Reflex output never becomes arbitrary input, coordinates, code or commands.

## Workflow fit

`legal-action calculation -> Reflex tactical choice -> state revalidation -> game engine action`.
