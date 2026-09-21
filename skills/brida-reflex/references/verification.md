# Verification and benchmarking

A valid JSON definition is not proof that a Reflex works.

## Minimum verification

For every implemented use case:

1. validate the definition against the current public schema;
2. run its synthetic fixtures through the actual execution surface;
3. compare expected vs observed branches;
4. test error/unknown output handling;
5. test stale-state or authorization revalidation where relevant;
6. add a small separately authored holdout before production reliance.

Record:

- use-case ID;
- definition/question/policy version;
- engine/model when observable;
- corpus/fixture version;
- semantic answer;
- operational branch;
- latency;
- errors/coverage.

## Engine comparison

Do not compare engines only by final branch accuracy when thresholds differ.

Measure separately:

- raw semantic-label accuracy;
- policy/branch accuracy under the chosen thresholds;
- abstention/review rate;
- calibration (for example ECE/Brier where appropriate);
- selective accuracy at admitted coverage;
- latency distribution;
- error/timeout coverage;
- per-use-case results.

Calibrate on train/dev data and report holdout separately. Never tune thresholds on the same holdout later reported as unseen evidence.

## Claims

Third-party benchmark numbers are research inputs, not Brida claims.

Only publish Reflex performance claims from Brida-owned, frozen, reproducible evaluations with the relevant contract/model/version identified.
