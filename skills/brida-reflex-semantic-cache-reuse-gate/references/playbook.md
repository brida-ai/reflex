# Semantic cache reuse gate playbook

Canonical use-case ID: `semantic-cache-reuse-gate`
Version: `1`
Question type: `binary`
Data class: `non_sensitive`

## Natural-language aliases

- semantic cache
- cache reuse
- semantic caching

## Decision

decide whether an already-authorized cached answer is semantically applicable to a new request after exact cache-safety checks have passed.

## Primary semantic question

Is the supplied cached answer materially applicable to the current request, given that the listed deterministic cache-safety checks already passed?

## Declared branches

- `reuse_candidate`
- `miss`
- `review`

## Canonical public guidance

# Semantic cache reuse gate

**Decision:** decide whether an already-authorized cached answer is semantically applicable to a new request after exact cache-safety checks have passed.

Run deterministic checks first: tenant and principal binding, data-class compatibility, TTL, policy/model/schema version, revocation state, cache namespace, and exact invalidation rules remain authoritative. Reflex handles only the residual semantic-equivalence question.

## State

Supply only non-sensitive comparison context, for example:

- the current request;
- the cached request;
- a short cached-answer summary;
- the exact deterministic precheck results.

## Branches

- `reuse_candidate` — the cached answer appears materially applicable to the current request.
- `miss` — the requests differ in a way that makes reuse unsafe or misleading.
- `review` — semantic applicability is ambiguous.

## Authority boundary

This Reflex is recommendation-only. It does not grant cache access, bypass authorization, extend TTL, waive invalidation, or serve a cached response. The application must revalidate current authorization and cache policy before reuse.

## Workflow fit

A typical workflow is:

`exact cache/auth/version checks -> semantic candidate lookup -> Reflex applicability gate -> application revalidation -> reuse or normal computation`.

If exact keys or deterministic rules settle the result, do not call Reflex.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
