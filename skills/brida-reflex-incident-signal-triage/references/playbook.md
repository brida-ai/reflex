# Incident signal triage playbook

Canonical use-case ID: `incident-signal-triage`
Version: `2`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- none

## Decision

classify the handling depth suggested by a bounded operational signal after deterministic monitoring rules have run.

## Primary semantic question

Classify the handling depth warranted by the supplied operational signal after deterministic monitoring rules. Do not infer missing scope, recovery or user impact. Select unclear when material impact/recovery evidence is missing, conflicting or too sparse to distinguish routine observation from investigation.

## Declared branches

- `observe`
- `investigate`
- `human_attention`
- `review`

## Canonical public guidance

# Incident signal triage

**Decision:** classify the handling depth suggested by a bounded operational signal after deterministic monitoring rules have run.

Known signatures, hard severity thresholds, SLO math, alert suppression, ownership and paging policy should remain deterministic. Do not force a semantic class when scope, recovery or user-impact evidence is materially missing or conflicting; that belongs on the explicit review path.

## State

Supply non-sensitive operational summaries such as:

- affected capability;
- scope of observed impact;
- recovery state;
- user-impact summary;
- deterministic alert/check results.

## Branches

- `observe` — routine or already-recovered signal that can remain in normal observation.
- `investigate` — meaningful anomaly that warrants investigation.
- `human_attention` — material active impact that warrants prompt human attention.
- `review` — scope, recovery or impact evidence is materially missing, conflicting or insufficient.

## Authority boundary

This Reflex is recommendation-only. It does not page a person, restart a service, deploy, rollback, change traffic, close an incident or suppress an alert. Operational policy and authorized systems retain those controls.

## Workflow fit

`metrics/log parsing -> deterministic alert policy -> Reflex semantic triage -> authorized incident workflow`.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
