# Deterministic before Reflex

Use exact code before semantic judgment whenever the application already knows how to decide something reliably.

## Order of operations

1. Parse and validate the input.
2. Enforce identity, tenant, authorization and data-class boundaries.
3. Apply exact rules, invariants, allowlists/denylists, versions and hard exclusions.
4. Stop if deterministic code already settles the outcome.
5. Send only the remaining bounded semantic question to Reflex.

Examples:

- exact document identifiers before fuzzy record matching;
- cache namespace, TTL and version checks before semantic reuse;
- file type and text-layer checks before an extraction-quality judgment;
- protected-path and CI rules before semantic review-depth classification;
- tool authorization before an advisory tool-risk judgment.

## Why

Reflex is useful for the fuzzy remainder. It should not replace exact logic with probabilistic logic.

The deterministic layer also reduces state size, narrows the answer space and prevents a high-confidence semantic answer from bypassing an invariant the application already knows.
