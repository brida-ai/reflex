# Semantic rule check

**Decision:** judge whether a bounded artifact satisfies, violates, or cannot be reliably judged against one explicit qualitative rule after exact linting has already run.

Use deterministic linters, parsers, regexes, AST checks, schema validation, type systems, and known policy rules first. Reflex handles only requirements whose meaning depends on semantics rather than exact syntax.

## State

Supply a small non-sensitive artifact excerpt plus:

- one explicit qualitative rule;
- artifact/context type;
- any deterministic checks already completed;
- optional bounded context needed to interpret the rule.

Do not send a whole protected repository or sensitive source tree to a `non_sensitive` Reflex.

## Branches

- `pass_candidate` — the artifact materially satisfies the supplied qualitative rule.
- `violation_candidate` — the artifact materially violates the supplied qualitative rule.
- `review` — the evidence or rule application is ambiguous.

## Authority boundary

This Reflex is recommendation-only. It does not fail CI, block a commit, modify source, waive a required check, or prove that an implementation is correct. Repository governance and authorized reviewers remain controlling.

## Workflow fit

A useful flow is:

`exact lint/type/schema checks -> host selects one semantic rule + bounded excerpt -> Reflex semantic rule check -> CI/reviewer policy`.

Keep each Reflex focused on one rule. If several independent semantic observations are needed over the same state, use bounded fan-out and let application code compose them.
