# Outbound message risk

**Decision:** classify whether one bounded outgoing draft is suitable to send as written, needs human review, or contains a material semantic risk that should be blocked by host policy.

Run deterministic checks first. Exact secret/credential detection, known personal-data patterns, recipient authorization, blocked destinations, attachment presence, channel membership and other exact policy rules stay in ordinary code. Reflex handles only the semantic remainder: whether the draft makes a risky commitment, is inappropriate for its audience, discloses confidential context, or is otherwise materially unsafe to send as written.

## State

Supply only non-sensitive normalized context, for example:

- the bounded draft text;
- audience class such as internal, customer, partner or public;
- relationship/context class;
- whether the message is a reply or new outbound message;
- deterministic signals already computed by the host.

Do not send credentials, real customer personal data, private mailbox history, attachments or other sensitive material to a `non_sensitive` Developer Preview Reflex.

## Branches

- `send_candidate` — no material semantic risk is evident in the supplied non-sensitive context.
- `review` — the message is ambiguous, makes a consequential commitment, is incomplete, or otherwise warrants human review.
- `block_candidate` — the supplied context materially indicates confidential disclosure, hostile/prohibited audience mismatch, or another protected semantic risk.

## Authority boundary

This Reflex is recommendation-only. It never sends a message, changes recipients, edits content, grants disclosure permission, overrides DLP/policy, or proves that a message is legally compliant. The application must revalidate current recipients, authorization, deterministic DLP/security checks and message state before any send action.

## Workflow fit

A robust workflow is:

`deterministic DLP/recipient checks -> bounded Reflex semantic risk -> human/application policy -> current-state revalidation -> optional send`.

If an exact rule already decides the outcome, do not call Reflex.
