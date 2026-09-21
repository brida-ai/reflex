# Customer support ticket triage

**Decision:** choose whether a bounded synthetic support ticket should be escalated, queued normally, served with an existing answer, or reviewed when routing is uncertain.

Run exact entitlement, account state, known incident IDs, SLA rules and security/payment policy in deterministic code first.

## State

Supply only non-sensitive normalized ticket context, for example:

- product area;
- short issue summary;
- declared customer/business impact;
- urgency;
- optional known-resolution context;
- deterministic routing signals already computed by the support system.

Avoid credentials, payment details, health data, private customer identifiers or full customer transcripts during the `non_sensitive` Preview.

## Branches

- `escalate` — material outage, security concern, payment lockout or severe stated business impact warrants prompt human attention.
- `queue` — legitimate support work belongs in the normal support workflow.
- `self_serve` — the supplied known-resolution context clearly answers an informational request.
- `review` — the semantic route is ambiguous or below the contract confidence threshold.

## Authority boundary

This Reflex is recommendation-only. It does not answer the customer, change ticket priority, assign an agent, close a ticket, refund a payment, alter an account, send a message, or grant support permissions.

The support system revalidates entitlement, incident state and authorization before any action.

## Workflow fit

A robust flow is:

`deterministic support policy -> bounded ticket summary -> Reflex route -> queue/review policy -> separately authorized support action`.

Use exact routing for known incidents or explicit policy conditions; use Reflex for the fuzzy semantic route that remains.
