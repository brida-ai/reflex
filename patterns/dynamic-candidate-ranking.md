# Dynamic candidate ranking

Many useful workflows start with a candidate set that changes on every request: search results, tools, skills, files, commands, products, browser elements or agents.

That is different from a normal static Choice Reflex, whose allowed categories are part of the versioned question contract.

## Do not fake a dynamic catalog with static Choice criteria

Avoid generating a new Custom Reflex definition every time the candidate set changes merely to place candidate IDs into Choice criteria.

That would mix runtime data with the versioned contract and makes calibration, caching, review and reproducibility much harder.

The durable boundary is:

`deterministic candidate generation -> bounded semantic relevance/ranking -> host policy -> optional action`.

## What works today

When the candidate set is small enough to evaluate item-by-item, compose existing bounded decisions:

1. deterministically retrieve and authorize candidates;
2. run exact filters and hard exclusions;
3. evaluate each candidate with a stable relevance/fit Reflex;
4. keep abstained/review candidates explicit;
5. rank or threshold the resulting semantic evidence in host code;
6. revalidate the selected candidate before any action.

Examples include:

- `retrieval-relevance-gate` for one retrieved passage;
- `semantic-record-match` for one pair of records;
- `marketplace-job-fit` for one bounded opportunity;
- official routing/risk recipes when their static semantic classes fit the workflow.

The host owns batching, concurrency, deduplication, ranking arithmetic and maximum-candidate limits.

## First-class future capability

A first-class dynamic-candidate Reflex would need more than a normal static Choice question.

At minimum, a mature contract should define:

- a bounded host-authorized candidate array;
- stable candidate identifiers that are data, not schema;
- per-candidate size/count limits;
- explicit no-match/abstention behavior;
- deterministic protected-candidate rules;
- ranking or selection semantics;
- calibration/selective-risk evidence for changing candidate counts;
- stale-candidate handling;
- reproducible batch/concurrency behavior.

Until those semantics are part of the public contract, document dynamic ranking as a workflow capability rather than pretending a static template already provides it.

## Authority boundary

Candidate ranking never grants permission to use the winner.

The application must still verify:

- current authorization and visibility;
- candidate freshness and existence;
- tool/input schemas;
- protected-action policy;
- quotas and rate limits;
- any required human approval.

A high semantic score can rank evidence. It cannot manufacture authority.
