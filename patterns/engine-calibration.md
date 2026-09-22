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


## Use a calibration passport

A threshold is meaningful only together with the evidence that produced it. Treat calibration as a versioned artifact, not an unlabeled number in application code.

Record at least:

- Reflex/use-case and question-set version;
- engine, model/checkpoint and runtime/backend version;
- primitive type;
- Choice cardinality bucket or Score rubric size where relevant;
- workload/domain and language slice;
- calibration corpus identity and immutable hash;
- calibration method and artifact/version;
- target branch/error-cost policy;
- evaluation date and hardware/runtime notes when backend conversion can affect outputs.

Two thresholds that happen to have the same numeric value are not interchangeable when their passports differ.

## Keep threshold policy replayable

Store the raw semantic answer and probabilities separately from the host policy that interprets them.

This lets the application:

- replay a new threshold against recorded decisions without paying for fresh inference;
- compare candidate policies before activation;
- audit whether a behavior change came from the engine or from host policy;
- apply different review bands without rewriting the Reflex contract.

For noisy state that crosses a threshold repeatedly, host policy may use hysteresis: for example, one threshold to enter an automated state and a different threshold to leave it. Hysteresis is deterministic application policy, not a new model question.

Version threshold and hysteresis policy independently from the Reflex definition and engine identity.


## Distinguish answer probabilities from probability of correctness

Some engines expose only a distribution over semantic answers. Others may also expose a separate confidence or correctness estimate.

Those signals answer different questions:

- **answer distribution** — which semantic answer the engine currently prefers and how probability mass is distributed among the declared answers;
- **correctness/selective-automation signal** — how likely the selected answer is to be reliable enough for a policy decision.

Do not assume the largest answer probability, distribution concentration, entropy-derived confidence or a vendor-named `confidence` field is automatically a calibrated probability of correctness.

If an engine exposes multiple uncertainty signals:

1. document exactly which signal the host policy uses;
2. calibrate that signal on held-out target-workload data;
3. keep the semantic answer/distribution separately for audit and replay;
4. do not mix signals from different engines or model versions on one implicit scale.

A Reflex contract should remain provider-neutral even when one engine has a richer uncertainty head than another.

## Do not tune away real errors

Lowering a confidence threshold can reduce unnecessary review, but it also converts more model judgments into accepted branches.

Separate:

- **calibration mismatch** — useful ranking or labels, but probability scale does not match the current threshold;
- **semantic error** — the selected answer itself is materially wrong;
- **contract mismatch** — the question/state shape does not fit the engine's supported behavior.

Threshold tuning addresses only the first class.


## Verify runtime and conversion fidelity separately

Running the same checkpoint through a different serving/runtime path can change numerical behavior even when the public Reflex contract is unchanged.

For local, edge or converted runtimes:

1. freeze representative input/question fixtures;
2. compare semantic answers and probability vectors against the admitted reference runtime;
3. measure drift before measuring latency/throughput;
4. record tokenizer/model/conversion/runtime hashes;
5. reject a runtime port that materially changes decision quality, even if it is faster.

Runtime fidelity is a separate gate from model quality. A faster backend is not a new engine identity, and a byte-compatible API is not proof of semantic equivalence.

## Benchmark layers

Keep at least two evaluation layers:

- **public synthetic fixtures** — small examples that prove the declared branches and schema work;
- **private held-out evaluation corpora** — broader boundary, near-miss, uncertainty and adversarial cases used for calibration and regression.

Public fixtures are documentation and activation evidence. They are not a substitute for a held-out benchmark.

## Version the evidence

Record the exact engine/model version, Reflex version, question/policy refs, corpus version and evaluation code version for every calibration decision.

Do not turn third-party benchmark numbers into product claims. Performance claims require Brida-owned, frozen and reproducible evaluation evidence.
