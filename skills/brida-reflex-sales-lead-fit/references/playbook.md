# Sales lead fit playbook

Canonical use-case ID: `sales-lead-fit`
Version: `1`
Question type: `binary`
Data class: `non_sensitive`

## Natural-language aliases

- none

## Decision

decide whether supplied non-sensitive lead facts materially match an explicit ideal-customer profile, clearly do not match, or need review.

## Primary semantic question

Does this lead match the explicitly supplied ideal-customer profile closely enough to justify a sales follow-up?

## Declared branches

- `qualified`
- `ignore`
- `review`

## Canonical public guidance

# Sales lead fit

**Decision:** decide whether supplied non-sensitive lead facts materially match an explicit ideal-customer profile, clearly do not match, or need review.

Run exact consent, suppression-list, geography, account ownership, duplicate-record and outreach-policy checks in deterministic code first. Reflex handles only the bounded semantic ICP-fit judgment.

## State

Supply non-sensitive normalized context, for example:

- explicit ICP;
- company/category facts;
- coarse company size or segment;
- stated use case;
- deterministic eligibility/suppression signals already computed by the CRM.

Keep the ICP explicit in state so the decision is auditable rather than hidden in a prompt. Do not send personal secrets, sensitive profiling attributes or private correspondence to a `non_sensitive` Preview Reflex.

## Branches

- `qualified` — the supplied company/use-case facts materially match the stated ICP.
- `ignore` — the supplied facts materially conflict with the ICP or show no credible use case.
- `review` — the fit is ambiguous or below the frozen confidence thresholds.

## Authority boundary

This Reflex is recommendation-only. It does not enrich a person, buy data, send outreach, change CRM ownership, set pricing, create a commercial commitment, or decide whether contacting someone is legally permitted.

The CRM/sales workflow remains responsible for consent, suppression, authorization and every external action.

## Workflow fit

A robust flow is:

`deterministic CRM/consent policy -> bounded lead + explicit ICP -> Reflex fit -> review/queue policy -> separately authorized sales workflow`.

Use deterministic filters for exact eligibility; use Reflex only for semantic fit that cannot be expressed reliably as an exact rule.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
