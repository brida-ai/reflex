# Policy change impact playbook

Canonical use-case ID: `policy-change-impact`
Version: `1`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- none

## Decision

judge whether a bounded policy change materially affects a specified component or workflow after exact version and scope checks have run.

## Primary semantic question

Classify whether the supplied policy change materially affects the specified component responsibilities after the listed exact scope checks. Treat missing or undocumented ownership of the affected responsibility as unclear rather than assuming the component is unaffected.

## Declared branches

- `no_change_candidate`
- `impact_review`
- `review`

## Canonical public guidance

# Policy change impact

**Decision:** judge whether a bounded policy change materially affects a specified component or workflow after exact version and scope checks have run.

Run deterministic checks first: policy version ordering, explicit component allow/deny lists, exact ownership, jurisdiction flags, effective dates and machine-readable requirements remain authoritative. Reflex handles only the semantic relationship between the policy change and the supplied component responsibilities.

## State

Supply non-sensitive bounded context, for example:

- a concise policy-change summary;
- the component or workflow responsibility;
- deterministic scope/version checks;
- any explicit exclusions already applied.

## Branches

- `no_change_candidate` — the supplied change does not materially affect the component responsibilities.
- `impact_review` — the change materially affects the component and warrants implementation/review work.
- `review` — impact is ambiguous or the supplied scope is incomplete.

## Authority boundary

This Reflex is recommendation-only. It does not modify policy, create work, deploy changes, change permissions, waive compliance obligations or decide legal applicability. The application and authorized reviewers retain those decisions.

## Workflow fit

`version/scope checks -> Reflex semantic impact judgment -> authorized policy/change workflow`.

Use deterministic policy-as-code whenever the requirement is already machine-readable.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
