# Semantic features

Reflex can produce small typed semantic signals that ordinary software, ranking systems, analytics or machine-learning pipelines consume as **features**. The surrounding pipeline is not itself a Reflex.

## Good fit

A bounded state snapshot can yield independent signals such as:

- one Choice category;
- one or more Binary probabilities;
- one small rubric Score;
- an explicit abstention/review signal.

When the questions are independent over the same state, they may be evaluated together as fan-out.

For example:

`deterministic normalization -> Reflex semantic signals -> calibrated feature transform -> downstream model/ranker -> application policy`

The public `templates/fan-out.json` starter shows how several independent typed questions can share one state while one primary question owns the declarative branch.

## Keep exact features deterministic

Do not replace exact features with semantic judgment.

Compute ordinary code features first when the value is known exactly, including:

- lengths, counts and dates;
- identifiers and exact categories;
- prices, totals and arithmetic;
- schema/invariant results;
- allowlist or ownership facts;
- permissions and tenant scope.

Reflex should add only the fuzzy semantic remainder that exact code does not already know.

## Probabilities are evidence, not universal numbers

An engine probability is tied to the engine/model version, question contract and evaluation distribution.

Do not assume:

- a `0.8` from one engine means the same thing as `0.8` from another;
- a threshold calibrated for one use case transfers to another;
- changing question wording leaves feature calibration unchanged.

Version the question set and engine admission evidence. Re-run a frozen labeled corpus after any engine, question, state-shape or calibration change.

## Downstream models and ranking

A downstream classifier or ranker may consume Reflex outputs as features, but the host owns:

- feature normalization;
- missing/abstained-value handling;
- training and evaluation splits;
- drift monitoring;
- ranking or prediction logic;
- final application policy.

Do not use a Reflex probability as a hidden authorization score. A downstream model also cannot create permissions that the principal did not already have.

## Dependent features

If answer A changes the legal options, state or meaning of question B, do not speculative-fan-out every possible B.

Use staged evaluation instead:

`Reflex A -> host constructs next bounded state/options -> Reflex B`.

See `patterns/hierarchical-classification.md` for dependent category trees.

## Batch and analytics

Evaluating many candidates can be a useful pipeline pattern, but first-class batch execution, calibration dashboards and analytics are separate product capabilities. Do not imply that a single Custom Reflex document provides a batch-processing or model-training system.

## Authority boundary

Semantic features are recommendation/evidence only. They do not authorize messages, purchases, payments, browser actions, tool calls, deploys, account changes or other protected side effects.
