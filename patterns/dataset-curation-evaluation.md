# Dataset curation and evaluation workflow

Dataset work includes deterministic validation, semantic curation, labeling policy, sampling, training and evaluation. Only the bounded semantic judgment belongs in Reflex.

## Boundary

A typical flow is:

`schema/privacy checks -> deterministic deduplication -> Reflex example quality -> curator policy -> frozen dataset/eval action`

### Outside Reflex

Keep these outside Reflex:

- data licensing and collection permission;
- PII, secret and forbidden-data handling;
- schema and encoding validation;
- duplicate IDs and exact label invariants;
- train/test splitting;
- dataset publication;
- training or fine-tuning;
- benchmark scoring and claim publication.

### Good Reflex decisions

Useful bounded judgments include:

- whether an otherwise valid example is coherent and unambiguous;
- whether a proposed label semantically conflicts with the supplied example;
- whether an evaluation item is too ambiguous to function as a useful hard label;
- whether a candidate should be sent to a curator for review.

The public `dataset-example-quality` example covers one semantic curation point.

## Evaluation discipline

Public synthetic fixtures prove the declared contract can execute. They are not a benchmark. Accuracy, calibration and engine admission require frozen held-out corpora that are not tuned on the evaluation split.
