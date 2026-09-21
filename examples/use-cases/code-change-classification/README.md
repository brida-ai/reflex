# Code change classification

**Decision:** classify the primary semantic type of one bounded software change after deterministic Git, path and static-analysis checks.

This is different from `change-review-risk`: this Reflex describes **what kind of change the supplied evidence represents**. Review depth, merge eligibility, ownership and release policy remain separate concerns.

Use deterministic code first for Git object resolution, exact changed paths, generated-file detection, protected-path rules, secret scanning, static analysis, schema validation, tests and known labels.

## State

Supply only non-sensitive normalized change context, for example:

- a bounded commit/diff summary;
- component classes and changed-path categories;
- commit or PR description;
- deterministic security/protected-path signals already computed by the host.

Do not send secrets, private source contents, credentials or customer data to a `non_sensitive` Preview Reflex.

## Branches

- `bugfix_candidate` — the change primarily repairs behavior that was already expected to work.
- `feature_candidate` — the change primarily adds or materially expands product behavior.
- `maintenance_candidate` — the change primarily concerns documentation, refactoring, dependencies, cleanup, tooling or internal maintenance without a new product behavior.
- `security_review` — the change materially affects authentication, authorization, permissions, cryptographic/security boundaries or another explicitly supplied protected security behavior.
- `review` — the change is mixed, ambiguous or insufficiently described.

## Authority boundary

This Reflex is recommendation-only. It does not label a PR, assign reviewers, claim a vulnerability exists, merge, release, deploy, waive CI or alter branch protection. Repository governance and authorized reviewers remain controlling.

## Workflow fit

A typical flow is:

`Git/diff parsing + protected-path policy + CI -> Reflex change category -> optional review-routing policy -> authorized repository action`.

A security-sensitive classification should increase review attention; it is not a vulnerability verdict.
