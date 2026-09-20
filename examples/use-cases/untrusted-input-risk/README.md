# Untrusted input risk

**Decision:** classify whether untrusted text appears routine, attempts to override the host's instructions, or attempts to obtain protected information.

Run deterministic controls first: provenance tagging, input-size limits, parser/schema validation, escaping, tool allowlists, credential isolation, authorization, and protected-context separation remain authoritative. Reflex provides only a bounded semantic risk signal.

## State

Supply only non-sensitive context, for example:

- the untrusted text;
- its source class;
- a short statement of the host boundary that the text must not override;
- deterministic sanitization results.

## Branches

- `continue_candidate` — the input appears routine under the supplied boundary.
- `isolate_review` — the input appears to attempt instruction override or control-flow manipulation.
- `security_review` — the input appears to request protected secrets or hidden privileged context.
- `review` — evidence is ambiguous.

## Authority boundary

This Reflex is recommendation-only. It does not make untrusted text safe, grant tool permission, expose secrets, block a user, or change the system prompt. The application must enforce isolation and authorization independently.

## Workflow fit

A typical workflow is:

`deterministic parsing/isolation -> Reflex semantic risk signal -> application security policy -> normal handling or review`.

Treat all external content as untrusted regardless of the Reflex score.
