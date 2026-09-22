# Authority after Reflex

A Reflex result is evidence for application policy, not permission.

## Recommended flow

1. Receive the typed branch and evidence.
2. Re-read any state that may have changed since the decision.
3. Re-check authorization, tenant scope, limits and protected policy.
4. Apply application-owned branch policy.
5. Ask for human review when required.
6. Only then perform an authorized side effect.

A branch such as `reuse_candidate`, `publish_candidate`, `auto_candidate` or `qualified` deliberately says **candidate**. It is not an executable command.

## Never derive authority from confidence

A probability or confidence score can help choose between normal handling and review. It cannot create permissions the principal did not already have.

The same rule applies to low-risk classifications: “low risk” is not an approval token.

## Fail safely

If the semantic evidence is missing, malformed or below the workflow's confidence requirement, route to an explicit review/fallback branch. Do not silently infer permission.

## Persistent governance state belongs to the host

Some systems accumulate evidence over time: repeated risk signals can reduce trust, require narrower delegation or trigger human review.

Reflex may contribute one bounded piece of semantic evidence to that process. The application must own the durable governance state and its transitions.

In particular:

- do not let one high-confidence result create or restore permission;
- record which evidence caused a deterministic policy transition;
- define how human override or remediation changes the stored state;
- re-check the current stored state before every protected action;
- keep authorization, trust and delegation transitions replayable without rerunning the model.

This keeps a probabilistic judgment from becoming an implicit capability token.
