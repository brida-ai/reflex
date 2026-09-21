# Sales, support and CRM workflow

CRM workflows combine customer records, consent, routing, human communication and business actions. Reflex can provide bounded semantic evidence without owning outreach or customer state.

## Boundary

A representative flow is:

`identity / consent / exact account rules -> Reflex fit or triage -> application policy -> authorized human / CRM action`

### Outside Reflex

Keep these outside Reflex:

- contact consent and channel eligibility;
- customer identity and account access;
- ownership and territory rules;
- pricing and discount authorization;
- CRM writes;
- sending email, SMS or chat messages;
- refunds, credits and contractual commitments.

### Good Reflex decisions

Reflex can help judge:

- whether supplied lead facts match an explicit ICP;
- which bounded support lane best fits a ticket;
- whether a message or account state contains a semantic escalation signal;
- whether evidence is too ambiguous for automatic handling.

The public `sales-lead-fit` and `customer-support-ticket-triage` examples cover two points in this workflow.

## Authority

A qualified lead is only a follow-up candidate. A support route is only a recommendation. Current authorization and communication policy are revalidated before any CRM or messaging side effect.
