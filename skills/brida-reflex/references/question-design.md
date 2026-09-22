# Question design

Use this when designing a new Custom Reflex or materially changing a question set.

## Work backward from behavior

Start from what the host application must decide, display, rank, hand off, or review. Then define only the semantic evidence Reflex must supply.

Do not start from “what can the model answer?” and invent a workflow around it.

## Pick the question type by answer semantics

- **Binary** — whether one bounded condition holds.
- **Choice** — one category from a stable, declared closed set.
- **Score** — position on a small ordered rubric.

Do not encode runtime candidate IDs as a versioned Choice schema. Dynamic candidate generation/ranking stays a host workflow until Reflex has a first-class dynamic-candidate contract.

## Do not assume equivalent-looking primitives behave the same

A Binary question and a two-option Choice can describe similar semantics, but they are different measurement contracts. The same applies when a Score is replaced with categorical buckets.

Choose the primitive from the meaning the application needs, then evaluate and calibrate that exact primitive. If you change question type later, treat the change like a contract change and re-run held-out evidence rather than carrying thresholds forward.

## State must contain the evidence

Reflex does not inherit the host agent's hidden context.

Supply the minimum bounded evidence needed to answer correctly:

- source text or normalized facts;
- relevant identities/relationships;
- explicit criteria/policy definitions;
- known exceptions;
- freshness/current-state signals;
- candidate metadata when evaluating one candidate.

Prefer named structured fields when several pieces of context have different meanings.

Do not send unrelated history, reusable secrets, or data outside the admitted data class.

## One coherent judgment per question

A question should have one interpretable semantic meaning.

Split dimensions when the answers are independently useful. Keep them together only when splitting destroys the relationship being judged.

Examples:

- quality and policy compliance are separate signals;
- relevance and factual support are separate signals;
- one multi-label record should use independent Binary questions rather than forcing one Choice;
- an exclusive queue/category can use Choice.

## Criteria are part of the contract

Criteria should make labels distinguishable without relying on label names alone.

Use:

- positive inclusion conditions;
- important exclusions;
- contrasts between neighboring labels;
- concrete ordered situations for Score levels.

Include a no-match/ambiguous outcome when the real world can fall outside the declared labels.

## Preserve raw judgments

Keep semantic answers/probabilities separate from deterministic policy.

Do not hide business authority inside question wording. Let host policy own thresholds, allowed routes, budgets and protected actions.

Confidence is not accuracy and never grants permission.

## Verify question quality

Test:

- clear positive cases;
- clear negative/alternate cases;
- near-boundary cases;
- missing-evidence cases;
- irrelevant-field perturbations;
- Choice-option order permutations;
- equivalent paraphrases;
- clearly irrelevant/resolved distractor perturbations.

A typed answer proves interface shape, not truth.
