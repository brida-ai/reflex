# Verification and benchmarking

A valid JSON definition is not proof that a Reflex works.

## Minimum verification

For every implemented use case:

1. validate the definition against the current public schema;
2. run its synthetic fixtures through the actual execution surface;
3. compare expected vs observed branches;
4. test error/unknown output handling;
5. test stale-state or authorization revalidation where relevant;
6. for Choice, test option-order permutations and compare them with a fixed-order repeat control when the engine is nondeterministic;
7. add a small separately authored holdout before production reliance.

Record:

- use-case ID;
- definition/question/policy version;
- engine/model plus runtime/backend when observable;
- calibration-profile/passport identity when policy uses calibrated thresholds;
- corpus/fixture version;
- semantic answer;
- operational branch;
- latency;
- errors/coverage.

## Invariance checks

Typed output can still be brittle. Before production reliance, test controlled perturbations that should preserve the same gold answer:

- Choice-option order permutations;
- irrelevant structured fields and field ordering;
- equivalent paraphrases;
- bounded irrelevant/resolved distractors;
- removal of context that is truly unnecessary.

Keep each perturbation single-purpose so a failure is interpretable. Compare semantic-label flips, operational-branch flips and probability movement.

For option-order tests, compare against repeated runs of the original order when the engine itself is nondeterministic. Do not confuse baseline noise with order sensitivity.

If many candidate variants are searched, select on development data and verify the winner once on a frozen holdout. Do not tune on the final holdout or publish the best development score as unseen evidence.

## Engine comparison

Do not compare engines only by final branch accuracy when thresholds differ.

Measure separately:

- raw semantic-label accuracy;
- policy/branch accuracy under the chosen thresholds;
- abstention/review rate;
- calibration (for example ECE/Brier where appropriate), sliced by primitive/cardinality/workload when needed;
- which uncertainty signal is being calibrated (answer distribution vs separate correctness/selective-automation signal);
- selective accuracy at admitted coverage;
- runtime/backend semantic fidelity before comparing runtime performance;
- latency distribution;
- error/timeout coverage;
- per-use-case results.

Calibrate on train/dev data and report holdout separately. Never tune thresholds on the same holdout later reported as unseen evidence.


## Calibration passport

When a branch threshold depends on engine probabilities, record the evidence tuple that makes that threshold interpretable:

`Reflex/question version + engine/checkpoint + runtime/backend + primitive/cardinality + workload slice + calibration corpus/hash + calibration artifact/version`.

Do not copy a threshold to another engine, model version, primitive, option-count bucket or converted runtime just because the public request/response schema matches.

If the engine exposes both answer probabilities and a separate confidence/correctness signal, preserve both. Document which one host policy consumes and validate it independently.

## Claims

Third-party benchmark numbers are research inputs, not Brida claims.

Only publish Reflex performance claims from Brida-owned, frozen, reproducible evaluations with the relevant contract/model/version identified.
