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
