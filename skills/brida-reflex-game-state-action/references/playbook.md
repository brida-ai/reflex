# Game state action playbook

Canonical use-case ID: `game-state-action`
Version: `1`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- gameplay decision
- game state
- simulation action

## Decision

recommend one legal tactical action from a small action set using a bounded synthetic game state.

## Primary semantic question

Choose the tactical action that best fits the supplied game state and objective. All listed options are legal; do not invent another action.

## Declared branches

- `advance_candidate`
- `defend_candidate`
- `retreat_candidate`
- `hold_candidate`

## Canonical public guidance

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

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
