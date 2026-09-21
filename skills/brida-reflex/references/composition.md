# Composition patterns

Use these patterns when one Reflex question is not enough. Keep each semantic judgment bounded and let host code compose the result.

## Route and precompute independent signals

If several questions depend on the same state but not on each other's answers, evaluate them together.

Examples:

- route class + risk signal;
- listing type + quality score;
- support lane + escalation signal;
- content class + policy signal.

The host consumes only the signals relevant to the selected path.

If question B needs evidence fetched because of answer A, run a second request after that evidence exists.

## Select instead of generate

When the desired output must come from known source data:

1. deterministically find/parse candidate values or spans;
2. ask Reflex which candidate fits the bounded semantic role;
3. copy/normalize the selected source value in code.

Do not ask Reflex to invent a quotation, identifier, path, price, or extracted field that already exists in source data.

## Find and judge evidence

A robust retrieval flow is:

`deterministic retrieval -> authorization/filtering -> per-candidate relevance -> host ranking -> claim/evidence verification`.

Relative ranking does not prove that any candidate is actually good. Preserve a no-match/review path.

## Fan-out

When branch-specific semantic questions are independent and cheap enough, evaluate them speculatively over the same state and let deterministic code consume the answers needed by the selected route.

Do not fan out protected actions. Fan-out produces evidence, not authority.

Measure the real cost/latency budget before scaling the number of speculative questions.

## Composite scoring

Collect stable semantic dimensions once, then let code apply explicit weights/thresholds.

Use this when preferences can compensate for one another.

Do not compress “any severe violation blocks” into a weighted average. Keep hard/protected conditions separate.

Changing weights should not require new semantic inference when the underlying evidence and question meanings have not changed.

## Cascades

Use cheap deterministic checks first, then Reflex, then a larger reasoning model or human only for uncertain/high-consequence cases.

Typical shape:

`exact rules -> Reflex -> review/reasoning fallback`.

A cascade should make the expensive stage rarer, not hide failures.

## Changing state

For agents, browser/computer use, games and interactive systems:

- distinguish observed facts from inferred semantic state;
- include state/version/freshness identifiers;
- reject stale results before acting;
- re-observe after material side effects;
- never let an old Reflex result authorize an action against new state.

## Dynamic candidate ranking

For tools, skills, files, commands, products, graph nodes, search results or agents whose candidate set changes at runtime:

1. generate and authorize candidates deterministically;
2. hard-filter invalid candidates;
3. evaluate each candidate with a stable Reflex contract;
4. rank/threshold in host code;
5. preserve no-match/review;
6. revalidate the chosen candidate before use.

Do not generate a new static Choice schema for every runtime candidate set.

## Verification composition

Separate:

- semantic answer quality;
- deterministic policy correctness;
- end-to-end workflow outcome.

A correct semantic answer can still be turned into a wrong action by bad policy or stale state.
