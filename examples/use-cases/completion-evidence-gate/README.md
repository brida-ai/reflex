# Completion evidence gate

**Decision:** classify whether the supplied bounded evidence establishes that required work is complete, incomplete, or still unverified.

Run deterministic evidence collection first: changed-state detection, required test/build checks, artifact existence, exact acceptance checks and known blockers should remain ordinary code. Reflex judges whether the supplied completion claim is semantically consistent with that bounded evidence.

## State

Supply non-sensitive task evidence such as:

- the bounded objective;
- a short completion claim;
- explicit required checks and their deterministic results;
- unresolved blockers.

## Branches

- `completion_candidate` — every supplied required check is explicitly satisfied and no blocker remains.
- `resume_work` — at least one supplied required check fails, a required outcome is absent, or a blocker remains.
- `review` — required evidence is missing, unknown, not run, indirect or otherwise insufficient.

## Authority boundary

This Reflex is recommendation-only. It does not mark work complete, stop an agent, accept code, merge changes, waive checks, or publish an artifact. The host owns completion state and revalidates every required deterministic check before changing it.

## Workflow fit

`deterministic evidence collection -> Reflex completion evidence -> host completion policy -> continue/review/finish`.
