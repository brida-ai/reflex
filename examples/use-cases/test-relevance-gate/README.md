# Test relevance gate

**Decision:** decide whether one optional test candidate is semantically relevant to a bounded software change after deterministic dependency and required-suite rules have already run.

This Reflex is intentionally conservative. It must not be used to waive required CI, protected-path suites, tests that deterministically depend on changed code, or repository policy. It is useful for prioritizing additional expensive tests when exact dependency information does not settle the question.

## State

Supply only non-sensitive normalized test/change context, for example:

- a bounded change summary;
- component/path classes;
- a test name and bounded purpose summary;
- deterministic dependency/path signals already computed by the host.

Do not send private source contents, secrets, credentials, customer data, or large raw diffs to a `non_sensitive` Preview Reflex.

## Branches

- `run_candidate` — the optional test plausibly exercises behavior affected by the change.
- `low_priority_candidate` — the supplied evidence strongly indicates the optional test is unrelated to the change.
- `review` — relevance is mixed or insufficiently established.

## Authority boundary

This Reflex is recommendation-only. A `low_priority_candidate` branch is **not permission to skip a required test**. Required suites, deterministic dependencies, security/compatibility gates and protected-path policy remain authoritative. The host decides scheduling and must fail open when policy requires execution.

## Workflow fit

A safe flow is:

`Git/diff resolution -> required-suite + dependency/path rules -> optional candidate -> Reflex relevance -> host scheduling policy -> normal test runner`.

Use shadow mode when evaluating a new engine or threshold: run the full suite while recording what the Reflex would have prioritized.
