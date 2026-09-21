# Execution failure classification

**Decision:** classify the semantic failure class represented by one bounded execution/tool/build output after deterministic error handling has already run.

Use ordinary code first for typed exceptions, known error codes, HTTP status policy, exit-status rules, parser/schema failures and exact retry contracts. Reflex handles the residual case where the available output is unstructured or mixed and the host still needs a small semantic failure label.

## State

Supply only non-sensitive normalized context, for example:

- operation class;
- a bounded output/error summary;
- whether the process/transport completed;
- deterministic signals such as exit code, known typed error availability and whether an exact rule already matched.

Do not send credentials, raw secret-bearing logs, private source code or sensitive customer output to a `non_sensitive` Developer Preview Reflex.

## Branches

- `no_failure_candidate` — the supplied output does not materially indicate failure.
- `transient_candidate` — the failure appears temporary or retry-like, such as a short-lived network/service interruption.
- `environment_candidate` — the failure appears caused by runtime/environment/configuration state rather than the program's intended logic.
- `code_candidate` — the output materially indicates a defect in the executed code or implementation.
- `permission_candidate` — the failure materially indicates denied authorization, access or filesystem/service permission.
- `input_candidate` — the operation appears invalid because required input, arguments or invocation shape are wrong.
- `review` — the evidence is mixed or insufficient to assign a reliable failure class.

## Authority boundary

This Reflex is recommendation-only. It does not retry an operation, edit code, change permissions, install dependencies, modify configuration, restart services, suppress an error, or mark work healthy. The host maps the semantic class to its own deterministic retry/review/escalation policy and revalidates current state before any action.

## Workflow fit

A robust flow is:

`typed error / exact rule -> bounded unstructured output -> Reflex failure class -> deterministic host policy -> optional retry/fix/review`.

If the runtime already provides an authoritative typed failure code, prefer that code and skip Reflex.
