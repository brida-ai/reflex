# Hierarchical classification

Large taxonomies should not become one enormous Reflex question.

When the available fine-grained choices depend on a broader category, use staged bounded decisions and let application code construct the next legal answer space.

## Dependent classification

A typical flow is:

`deterministic scope -> broad Reflex Choice -> application builds allowed child set -> child Reflex Choice -> application policy`

For example, a first decision may choose among a few product domains. Only after that branch is known does the application build the valid subcategories for the selected domain.

Keep an explicit `other` or review path at every level. Do not force a leaf when the state does not support one.

## Independent questions are different

If several questions can all be answered from the same original state and none changes the others' answer space, they may be evaluated together as fan-out.

Use `templates/fan-out.json` for that shape.

If answer A changes the state, criteria or legal candidates for question B, evaluate B in a later Reflex call. Do not speculate over every possible child question and discard most of the answers afterward.

## High-cardinality taxonomies

Before semantic classification:

- apply exact identifiers and metadata filters;
- remove candidates the caller is not allowed to see;
- narrow the taxonomy deterministically where possible;
- keep each semantic choice bounded.

Dynamic high-cardinality candidate ranking is a separate capability. Do not encode arbitrary runtime catalogs as executable model output.

## Authority boundary

A classification result is recommendation-only. It does not grant access to a category, tool, record or action. The application owns candidate construction, authorization, threshold calibration and every resulting side effect.
