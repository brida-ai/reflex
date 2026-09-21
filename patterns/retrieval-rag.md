# Retrieval and RAG workflow

Reflex can improve retrieval pipelines by judging semantic relevance and evidence quality after deterministic access and retrieval logic has already run.

## Boundary

A typical flow is:

`authorization -> deterministic filters -> retrieval -> Reflex relevance -> Reflex evidence/support check -> generative answer -> optional quality gate`

### Outside Reflex

Keep these outside Reflex:

- identity and document authorization;
- tenant and namespace filtering;
- exact metadata predicates;
- retrieval execution and index access;
- citation fetching;
- answer generation;
- publication or message delivery.

### Good Reflex decisions

Useful bounded decisions include:

- whether a retrieved candidate materially addresses the information need;
- whether supplied evidence supports, contradicts or fails to establish a claim;
- whether a candidate row passes a semantic predicate after exact SQL filters;
- whether retrieved text contains a semantic risk signal before it enters a downstream model.

The public `retrieval-relevance-gate`, `research-claim-verification` and `untrusted-input-risk` examples can be composed here.

## SQL and semantic filters

Use SQL for exact predicates first. A semantic decision can evaluate the remaining qualitative condition on a bounded candidate row, but model output should not become raw SQL and should not expand row-level access.
