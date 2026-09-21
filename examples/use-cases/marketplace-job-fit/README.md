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
