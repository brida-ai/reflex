# Content quality gate

**Decision:** score a bounded draft against explicit acceptance criteria before spending another expensive generation/review cycle.

Use deterministic checks first for exact facts, required strings, formatting, links, schema and prohibited content. Reflex handles the semantic quality judgment that remains.

## State

Supply only non-sensitive bounded context, for example:

- target audience;
- required facts;
- explicit acceptance criteria;
- draft text or a bounded excerpt;
- deterministic validation results already computed by code.

## Branches

- `publish_candidate` — the Score clears the contract's publish threshold.
- `revise` — the draft is usable but needs meaningful revision before publication.
- `reject` — the Score falls below the minimum usable band.

This Score contract has no separate confidence-abstention branch. Borderline/uncertain quality should remain in `revise` or be routed by the host to human review rather than being treated as publication authority.

## Authority boundary

This Reflex is recommendation-only. A `publish_candidate` result does not publish, post, send, approve claims, waive legal/policy review, or grant access to a content system. Deterministic fact checks and any required human approvals remain controlling.

## Workflow fit

A robust flow is:

`deterministic validation -> bounded Reflex quality score -> revise/review policy -> final deterministic/human checks -> separately authorized publish action`.

Use exact code for facts or formatting that can be checked exactly; use Reflex only for the limited semantic rubric.
