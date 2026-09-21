# Implementation guide

## Reuse before inventing

1. Check the focused use-case catalog.
2. Check current official recipes and hosted availability.
3. Reuse the exact semantics when they fit.
4. Create a Custom Reflex only when the user's bounded decision is materially different.

Before authoring a new contract, use [question-design.md](question-design.md) for question semantics and [composition.md](composition.md) when the workflow needs multiple independent judgments, retrieval/ranking, fan-out, cascades, or changing state.

## Contract

A Custom Reflex must keep:

- bounded state;
- Binary, Choice, or Score questions;
- explicit branch policy;
- explicit uncertainty/default behavior;
- a data class;
- recommendation-only authority;
- synthetic/redacted fixtures;
- immutable/versioned semantics once activated.

Do not add arbitrary executable hooks, provider credentials, network destinations, or tool authority to the definition.

## Deterministic before Reflex

Keep exact logic outside Reflex:

- stable IDs and exact matching;
- syntax/schema validation;
- authentication/authorization;
- allow/deny lists;
- freshness/staleness;
- hard safety invariants;
- numerical thresholds that are already exact;
- file/network/browser permissions;
- side-effect execution.

Reflex receives only the fuzzy semantic remainder.

## Integration

Prefer the surface already available:

- MCP for agent environments;
- SDK for released application integrations;
- REST for direct backend calls.

List/check current hosted capabilities before assuming an official or Custom Reflex can run.

Keep API keys in trusted backend/agent secret storage. Never embed a Brida key in browser/mobile/client bundles.

## Known use case

When the user names a catalogued case:

1. load its focused skill or canonical definition;
2. preserve its branch semantics;
3. adapt only state normalization and host integration;
4. run every synthetic fixture;
5. add user-specific holdout cases;
6. integrate downstream behavior only after branch validation.

Do not reopen broad product discovery unless the requested semantics do not match.

## Errors and uncertainty

Unknown branches, malformed output, stale state, provider/runtime errors, and insufficient confidence must map to the documented safe path rather than silently authorizing an action.
