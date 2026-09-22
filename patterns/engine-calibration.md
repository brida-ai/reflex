# Calibrate policy thresholds per engine and model version

A Reflex contract can remain semantically stable while different admitted engines produce different probability distributions.

Do not assume a threshold fitted for one engine or model version transfers unchanged to another.

## Keep semantics stable

The durable contract is:

- the bounded question;
- its answer space or rubric;
- branch meanings;
- uncertainty/review behavior;
- authority boundaries.

An engine is replaceable implementation supply. Changing engines should not rename public Reflex IDs or redefine what a branch means merely to preserve a benchmark number.

## Calibrate before admission

Before an engine/model version is admitted for a Reflex:

1. freeze a representative labeled evaluation corpus;
2. run the exact question and state contract;
3. measure branch accuracy and probability calibration, not only top-label accuracy;
4. inspect false-positive and false-negative cost for each protected branch;
5. select thresholds on a calibration split, not the evaluation/test split;
6. keep an explicit abstention/review region;
7. re-run the frozen corpus after any model, question, policy or state-shape change.

A model that chooses the expected top label but remains below the policy threshold is not operationally equivalent to a model whose probabilities are calibrated for that threshold.

## Calibrate the slices you will actually serve

A threshold can look acceptable in aggregate while failing on one language, domain, question type, option count or other recurring workload slice.

Before sharing one threshold across slices, measure them separately. Useful slices include:

- Binary, Choice and Score primitives;
- Choice cardinality or nearby Score rubric sizes;
- input language when multilingual traffic is expected;
- materially different domains or task families;
- short versus long or sparse versus evidence-rich state shapes.

Pool slices only when held-out evidence supports doing so. A threshold calibrated on one language, domain, primitive or candidate-count distribution is not evidence for another.

Changing the primitive also changes the measurement contract. A Binary formulation and a two-option Choice may express similar prose, but their probability behavior must be evaluated independently rather than assumed interchangeable.

## Keep threshold policy replayable

Store the raw semantic answer and probabilities separately from the host policy that interprets them.

This lets the application:

- replay a new threshold against recorded decisions without paying for fresh inference;
- compare candidate policies before activation;
- audit whether a behavior change came from the engine or from host policy;
- apply different review bands without rewriting the Reflex contract.

For noisy state that crosses a threshold repeatedly, host policy may use hysteresis: for example, one threshold to enter an automated state and a different threshold to leave it. Hysteresis is deterministic application policy, not a new model question.

Version threshold and hysteresis policy independently from the Reflex definition and engine identity.

## Do not tune away real errors

Lowering a confidence threshold can reduce unnecessary review, but it also converts more model judgments into accepted branches.

Separate:

- **calibration mismatch** — useful ranking or labels, but probability scale does not match the current threshold;
- **semantic error** — the selected answer itself is materially wrong;
- **contract mismatch** — the question/state shape does not fit the engine's supported behavior.

Threshold tuning addresses only the first class.

## Benchmark layers

Keep at least two evaluation layers:

- **public synthetic fixtures** — small examples that prove the declared branches and schema work;
- **private held-out evaluation corpora** — broader boundary, near-miss, uncertainty and adversarial cases used for calibration and regression.

Public fixtures are documentation and activation evidence. They are not a substitute for a held-out benchmark.

## Version the evidence

Record the exact engine/model version, Reflex version, question/policy refs, corpus version and evaluation code version for every calibration decision.

Do not turn third-party benchmark numbers into product claims. Performance claims require Brida-owned, frozen and reproducible evaluation evidence.
