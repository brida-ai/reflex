# Software issue triage

**Decision:** recommend the next bounded triage lane for a software issue after deterministic repository policy and metadata checks.

Use deterministic code first for repository permissions, exact labels, duplicate IDs, protected security-report channels, issue-template validation, known ownership rules, and closed/resolved state. Reflex handles the fuzzy semantic remainder: what kind of maintainer attention the supplied issue appears to need.

## State

Supply only non-sensitive normalized issue context, for example:

- title and bounded body/summary;
- repository/component context;
- deterministic template and duplicate signals;
- whether reproducibility or acceptance information is present.

## Questions

This example intentionally uses fan-out:

- `issueKind` describes the issue category;
- `urgency` scores maintainer urgency;
- `nextStep` owns the declarative branch.

The secondary answers are evidence only. They do not create hidden branch logic or authority.

## Branches

- `ask_author_candidate` — the issue appears to need missing information from the author.
- `investigate_candidate` — the supplied evidence is sufficient for technical investigation.
- `decision_review` — a product/maintainer decision appears necessary before implementation.
- `backlog_candidate` — the issue is well-formed but not evidently urgent.
- `close_review` — the supplied context suggests a possible duplicate, unsupported request, or already-resolved item that should be reviewed before closure.
- `human_triage` — the evidence is mixed or confidence is insufficient.

## Authority boundary

This Reflex is recommendation-only. It does not comment, label, assign, close, merge, or otherwise mutate an issue or repository. The host must re-read current issue state, authorization, protected-report policy, and repository rules before any action.

## Workflow fit

A typical flow is:

`repository policy + exact metadata -> bounded issue state -> Reflex fan-out -> maintainer queue/review -> authorized repository action`.

Do not send private security reports, secrets, customer data, or other sensitive repository content to a `non_sensitive` Preview Reflex.
