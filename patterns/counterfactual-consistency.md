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
- permutation of Choice-option declaration order while label semantics stay fixed;
- an explicitly non-decision-relevant synthetic attribute;
- equivalent positive/negative framing of the same underlying facts;
- a clearly irrelevant or already-resolved distractor whose presence must not change the current gold decision.

Use this to find brittle decision contracts, hidden correlations and engine-specific instability before admitting an engine/version.

## Choice option-order invariance

For a Choice Reflex, option order is presentation, not semantics. Test that explicitly.

1. Hold state, instructions, criteria text and label meanings constant.
2. Run several deterministic permutations of the declared options.
3. Compare results by label identity, not by option position.
4. If the engine is nondeterministic, run the original order the same number of times as a control so ordinary run-to-run noise is not blamed on permutation.
5. Measure selected-label flips and probability movement for each label.

If permutation-driven instability materially exceeds the fixed-order control, treat the engine/contract pair as not yet stable for that Choice. Do not solve this by choosing the luckiest option order on the same evaluation set.

For a large or runtime-defined candidate set, prefer hierarchical or per-candidate host composition over relying on one very wide static Choice merely because one ordering happened to score well.

## Distractor and salience checks

A second useful pair keeps the gold decision fixed while adding bounded evidence that is true but explicitly irrelevant to the current question, such as an already-resolved prior event.

Measure:

- how often the semantic label changes;
- how often a previously correct answer becomes wrong;
- whether new errors disproportionately move toward the distractor's class rather than the engine's ordinary error distribution;
- confidence/calibration movement even when the branch stays unchanged.

The perturbation must genuinely preserve the gold semantics. If the added fact could reasonably change the correct answer, the pair is not an invariance test.

## Search and tuning hygiene

If you evaluate many question wordings, option orders, thresholds or state projections and keep the best, selection itself can create an apparent gain.

- select/tune only on a development split;
- keep a final frozen holdout unseen by the search;
- keep the unmodified contract as a fixed baseline;
- when useful, run a null/control search of comparable size to estimate how much apparent improvement the selection procedure can create without a real better policy.

Do not report the best development variant as unseen evidence.

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
