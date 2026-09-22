# Incoming message triage

**Decision:** classify one already-admitted non-sensitive incoming message by the kind of attention it appears to need after exact transport, security, sender-policy and channel rules have already run.

Use deterministic code first for spam/blocklists, authentication, known automation, explicit SLA/deadline rules, security/phishing policy, sender/account permissions, thread ownership and other exact routing conditions. Reflex handles only the semantic handling class that remains.

## State

Supply only bounded non-sensitive message context, for example:

- channel class;
- sender relationship class, not a private address;
- short synthetic/redacted message excerpt;
- optional bounded thread/context summary;
- deterministic admission and security signals already computed by the host.

Do not send private mailbox histories, credentials, authentication tokens, payment data, regulated personal information or sensitive customer content during the `non_sensitive` Preview.

## Branches

- `attention_candidate` — the message clearly asks for a response, decision, follow-up or other recipient action.
- `normal_queue` — the message is materially informational/contextual and does not clearly ask the recipient to act.
- `low_priority_candidate` — the message is routine bulk/automated informational traffic with no individual action evident.
- `review` — the message mixes handling signals or the supplied context is insufficient.

## Authority boundary

This Reflex is recommendation-only. It does not mark mail read, move/archive/delete messages, change priority, assign an owner, send a reply, click a link, open an attachment, create a task, page a person or authorize any account action.

The host revalidates message state, permissions, security policy and current thread context before any downstream action.

## Workflow fit

`transport/security/exact routing -> bounded message context -> Reflex handling class -> host queue/review policy -> separately authorized action`

Use `incoming-message-risk` for phishing/social-engineering risk. Use `customer-support-ticket-triage` when the object is specifically a support ticket with support-domain routing semantics. Use `work-priority` after a message has already become a task and the remaining decision is scheduling.
