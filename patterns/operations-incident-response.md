# Operations and incident-response workflow

Operational response mixes telemetry, exact alert rules, incident state, semantic triage, communication and remediation. Reflex can classify the fuzzy remainder without becoming the incident controller.

## Boundary

A typical flow is:

`telemetry -> deterministic SLO / known-signature checks -> Reflex signal triage -> incident policy -> human or authorized automation`

### Outside Reflex

Keep these outside Reflex:

- metrics collection and log parsing;
- exact SLO and threshold rules;
- known error-code routing;
- paging and notification delivery;
- incident ownership;
- rollback, restart and remediation commands;
- production credentials and tool execution.

### Good Reflex decisions

Reflex can help judge:

- whether a noisy operational signal looks routine, investigative or materially consequential;
- whether several normalized observations describe a meaningful anomaly;
- whether a signal warrants specialist attention after exact rules remain inconclusive;
- whether the evidence is insufficient and should remain in review.

The public `incident-signal-triage` example covers the advisory triage step.

## Authority

An escalation branch can request attention; it does not grant remediation authority or execute a production action.
