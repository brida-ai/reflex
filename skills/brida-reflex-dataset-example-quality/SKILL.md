---
name: brida-reflex-dataset-example-quality
description: "Implement and verify the Brida Reflex Dataset example quality use case: score one synthetic training/evaluation example against a small quality rubric before it becomes a curation candidate. Use when the user names dataset-example-quality, asks for this exact bounded decision, or wants to integrate/test the matching Reflex without a discovery interview."
---

# Dataset example quality

Implement this known Reflex directly. Do not restart broad discovery unless the user's requested semantics materially differ from the bundled contract.

## Load only what you need

- Read [references/playbook.md](references/playbook.md) for the workflow, state and authority boundary.
- Read [references/custom-reflex.json](references/custom-reflex.json) for the exact versioned public contract and synthetic fixtures.
- For current hosted/API/SDK availability, read Brida's live `/reflex/llms.txt`, `/reflex/agent.md`, and `/reflex/agent.json` before making availability claims.

## Execute autonomously

1. Inspect the current project/environment and locate the event/state that feeds this decision.
2. Keep exact parsing, policy, authorization, freshness, stable-ID matching, permissions and side effects in deterministic host code.
3. Reuse an equivalent active Reflex when its semantics/version match; otherwise use current Custom Reflex authoring only if the live product exposes it.
4. Choose the smallest available integration surface: MCP, released SDK, or REST.
5. Normalize only the bounded state required by the bundled contract.
6. Accept only declared branches. Unknown/error/stale results go to the safe review/fallback behavior from the playbook.
7. Revalidate current state and authorization before any downstream effect.
8. Execute every bundled synthetic fixture through the actual Reflex execution surface before claiming the integration works.
9. Add separately authored holdout cases before relying on it in production.

Ask a question only when a missing fact actually blocks implementation. Do not interview the user about information already present in the project, conversation, connected tools, or bundled contract.

## Authority

A Reflex result is semantic evidence plus a recommendation. It never grants permission for payments, deploys, external messages, browser actions, purchases, merges, account changes, destructive mutations, or other protected actions.

During Developer Preview, keep state `non_sensitive` unless the live route explicitly admits a broader class. Never place reusable credentials in Reflex state or client bundles.
