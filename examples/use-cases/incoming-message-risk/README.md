# Incoming message risk

**Decision:** classify the semantic risk of an incoming non-sensitive message after deterministic transport, authentication, reputation and attachment checks have already run.

Use deterministic code first for SPF/DKIM/DMARC results, exact sender/domain policy, known malicious URLs, attachment scanning, blocklists, account authorization and protected-channel rules. Reflex handles only the fuzzy semantic remainder: whether the supplied message appears routine, suspicious enough for security review, or strongly consistent with social engineering or credential theft.

## State

Supply only bounded non-sensitive context, for example:

- subject and a short synthetic/redacted message excerpt;
- sender relationship class, not a private address;
- coarse link/destination class;
- deterministic authentication/reputation signals already computed by the host;
- whether the message requests credentials, secrets, money, permission changes, or another protected action.

Do not send real credentials, private mailbox contents, authentication tokens, sensitive customer data, or regulated personal information.

## Branches

- `routine_candidate` — no material social-engineering or deceptive risk is evident in the supplied semantic context.
- `security_review` — the evidence is mixed, unusual, or insufficient and should receive security/human review.
- `high_risk_candidate` — the supplied message strongly exhibits credential theft, impersonation, coercive social engineering, or another explicit protected-action lure.

## Authority boundary

This Reflex is recommendation-only. It does not deliver, quarantine, delete, open links, download attachments, reset accounts, transfer money, reveal credentials, or authorize any protected action. The mail/security application owns those decisions and must revalidate current transport and account state before acting.

## Workflow fit

A typical flow is:

`mail authentication + reputation + attachment scan -> bounded message state -> Reflex semantic risk -> security policy/review -> authorized mail action`.

Known malicious indicators should be handled deterministically without waiting for Reflex. A high semantic risk branch is evidence for policy, not an authorization token.
