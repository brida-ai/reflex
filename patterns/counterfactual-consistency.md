# Counterfactual consistency evaluation

A semantic decision should not change merely because an irrelevant field, framing detail or non-material attribute changes.

Counterfactual evaluation tests that property by comparing the same versioned Reflex contract on paired synthetic states.

## Evaluation shape

Start with one labeled base case, then create one or more controlled variants where only the field under test changes.

`base synthetic state -> Reflex`

`paired state with one non-material change -> same Reflex`

The evaluation harness compares the semantic answer, operational branch and confidence/calibration behavior. The comparison itself is ordinary evaluation code, not another Reflex.

## Good uses

Counterfactual pairs can test:

- irrelevant display or formatting changes;
- equivalent paraphrases;
- non-material metadata;
- ordering of independent fields;
- an explicitly non-decision-relevant synthetic attribute;
- equivalent positive/negative framing of the same underlying facts.

Use this to find brittle decision contracts, hidden correlations and engine-specific instability before admitting an engine/version.

## Do not use a protected attribute casually

Real protected, sensitive or regulated attributes raise privacy, legal, fairness and data-governance questions that a public `non_sensitive` Preview example cannot authorize.

For public fixtures, prefer synthetic non-sensitive perturbations. A real fairness audit involving protected attributes needs an approved data class, representative populations, domain expertise and appropriate legal/governance review.

Do not infer broad fairness from a few synthetic pairs.

## Deterministic invariants first

If policy says a field must never influence an outcome, enforce that fact structurally when possible:

- exclude it from the state;
- normalize it away;
- separate authorization/policy from semantic evidence;
- add deterministic invariant tests.

Counterfactual evaluation is a regression detector. It is not a substitute for deterministic architecture.

## What to measure

Record at least:

- selected semantic answer;
- operational branch after policy thresholds;
- probability/confidence movement;
- abstention/review rate;
- pairwise consistency rate;
- false-positive and false-negative changes on labeled pairs;
- engine/model/question-set versions.

A pair can remain branch-consistent while confidence changes materially, so branch equality alone is not enough for calibration-sensitive Reflexes.

## Relationship to engine calibration

Run counterfactual suites separately for every admitted engine/model version. A contract that is stable on one engine may be sensitive to framing or irrelevant metadata on another.

Do not tune on the same counterfactual holdout and then report that holdout as unseen evidence.

## Authority boundary

Counterfactual consistency is evaluation evidence only. It does not certify legal compliance, nondiscrimination, safety or fitness for a regulated decision. Those conclusions require a broader domain-specific validation process.
