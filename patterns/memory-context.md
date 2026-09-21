# Memory and context workflow

Memory systems combine privacy policy, retention, retrieval, persistence and semantic usefulness. Reflex can judge a bounded relevance question, but it does not own memory storage.

## Boundary

A robust flow is:

`privacy / no-store / tenant checks -> deterministic normalization -> Reflex relevance -> retention policy -> optional authorized persistence`

### Outside Reflex

Keep these outside Reflex:

- user privacy and no-store controls;
- secret and sensitive-data detection;
- tenant and identity scope;
- retention periods and deletion;
- encryption and storage;
- retrieval and namespace access;
- memory mutation or compaction execution.

### Good Reflex decisions

Reflex can help decide:

- whether a policy-eligible observation is likely to have durable future utility;
- whether a previously authorized memory is relevant to the current bounded task;
- whether a context item is likely removable after deterministic pinned/system context is protected;
- whether ambiguity should route to review instead of persistence.

The public `memory-relevance-gate` demonstrates durable-vs-transient candidacy. Official context-pruning contracts can be composed at a different point in the workflow.

## Authority

A `store_candidate` branch never creates retention authority. The host revalidates current privacy settings, data class, scope and retention policy before any write.
