# Marketplace job fit playbook

Canonical use-case ID: `marketplace-job-fit`
Version: `2`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- none

## Decision

classify whether a bounded automation opportunity is a credible fit, clearly not a fit, or needs clarification before any bid/review effort is spent.

## Primary semantic question

Classify whether the supplied automation capability and marketplace brief are a credible fit, clearly not a fit, or need clarification. Judge semantic fit only after deterministic eligibility checks. Treat explicit state saying inputs are available and deliverables are known as supplied facts; do not invent missing details. Do not infer permission to bid or contact anyone.

## Declared branches

- `bid_candidate`
- `skip`
- `review`

## Canonical public guidance

# Marketplace job fit

**Decision:** classify whether a bounded automation opportunity is a credible fit, clearly not a fit, or needs clarification before any bid/review effort is spent.

Use deterministic checks first for blocked categories, account permissions, geographic/legal constraints, required certifications, explicit budget rules, and other exact eligibility criteria. Reflex handles the semantic remainder: whether the brief and the stated capability materially line up.

## State

Supply only non-sensitive normalized context, for example:

- the automation's bounded capability;
- a short marketplace brief;
- whether required inputs are already available;
- known deliverables/constraints;
- whether the work would require protected actions;
- any exact eligibility checks already performed by code.

Do not send credentials, private client files, payment data, or confidential marketplace messages to a `non_sensitive` Preview Reflex.

## Branches

- `bid_candidate` — the brief is specific enough and materially fits the stated capability.
- `skip` — the request clearly requires unsupported/prohibited work or conflicts with the capability.
- `review` — the opportunity appears plausibly compatible, but material scope, inputs or deliverables still need clarification.

## Authority boundary

This Reflex is recommendation-only. A `bid_candidate` result does not place a bid, accept work, set pricing, promise an outcome, contact a client, purchase anything, access an account, or grant tool permissions. A `skip` result does not blacklist a client or mutate marketplace state.

The host application must revalidate exact eligibility, current scope, authorization and commercial policy before any external action.

## Workflow fit

A robust flow is:

`deterministic eligibility -> bounded Reflex fit class -> host policy -> human/agent review -> separately authorized marketplace action`.

If the brief is plausibly in-scope but incomplete, prefer `review` over silently treating missing clarification as a definitive non-fit.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
