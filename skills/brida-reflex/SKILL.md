---
name: brida-reflex
description: Implement, discover, design, verify, or optimize Brida Reflex decisions in an application, agent, workflow, browser integration, document pipeline, support process, or other product flow. Use when the user names a Reflex use case, asks to add or test Reflex, wants to reduce expensive reasoning with a bounded semantic decision, wants a Custom Reflex, or asks where Reflex fits. If the user already names a use case, implement it directly instead of interviewing them.
---

# Brida Reflex

Use Brida Reflex for small, bounded semantic decisions before expensive reasoning, agent work, or human review.

## Choose the mode first

Do not use one workflow for every request.

### 1. Known use case -> implement directly

Use this mode when the user names a concrete case such as semantic content blocking, AdBlock, model routing, completion verification, support triage, OCR routing, context retention, issue triage, or another catalogued Reflex.

1. Read [references/use-case-index.md](references/use-case-index.md).
2. Resolve the closest canonical use-case ID or focused `brida-reflex-<id>` skill.
3. If that focused skill is installed, use it.
4. Otherwise inspect the canonical public definition/example and implement the same bounded contract.
5. Ask only for information that is actually missing to perform the integration. Do not restart broad discovery.
6. Run the bundled/canonical synthetic fixtures before claiming the integration works.
7. Keep downstream authority outside Reflex.

### 2. Open-ended discovery -> brief audit

Use this mode only when the user asks where Reflex could help or has not identified a decision.

Read [references/discovery.md](references/discovery.md). Ask at most a few high-value questions, then return no more than three strong candidates. Do not turn discovery into a long interview.

### 3. New Custom Reflex -> design the smallest contract

Use this mode when no existing use case or official recipe fits.

Read [references/implementation.md](references/implementation.md). Define the minimum state, Binary/Choice/Score questions, explicit branches, uncertain behavior, deterministic prechecks, fixtures, and authority boundary. Prefer a public use-case pattern when it can be adapted without changing its semantics.

### 4. Verification / benchmark -> test, do not assume

Use this mode when the user asks whether a Reflex works, is ready, or is better than another engine/model.

Read [references/verification.md](references/verification.md). Separate semantic-answer quality from policy/threshold behavior. Never convert third-party benchmark claims into Brida claims.

## Implementation rules

- Use deterministic code first for exact parsing, identifiers, allow/deny rules, permissions, invariants, freshness checks, arithmetic, and schema validation.
- Use Reflex only for the bounded semantic remainder.
- Prefer the current official recipe when its semantics match exactly.
- Prefer the exact public Custom Reflex use case when one exists.
- Keep branches explicit and include review/abstention where uncertainty matters.
- Treat every Reflex result as recommendation-only semantic evidence.
- The application revalidates current state and authorization before any side effect.
- Never let Reflex itself authorize payments, deploys, messages, browser actions, purchases, merges, account changes, or destructive mutations.
- In Developer Preview, default to `non_sensitive` unless the live route explicitly admits another data class.
- Use synthetic or correctly redacted fixtures in public examples.
- Do not put reusable credentials in state, prompts, examples, skills, logs, or browser bundles.

## Integration surface

Choose the smallest surface already available in the user's environment.

- **MCP** — preferred when an agent already supports Brida MCP.
- **SDK** — preferred for application code when the required SDK package/version is actually released.
- **REST** — preferred for direct backend integration or when SDK/MCP is unavailable.

Do not claim a surface is live from source code alone. Check current product truth first.

## Current-product truth

When network access is available, read the live Brida discovery chain before availability claims:

- https://brida.ai/reflex/llms.txt
- https://brida.ai/reflex/agent.md
- https://brida.ai/reflex/agent.json

If those are unavailable, use [references/current-contract.md](references/current-contract.md) and state its revision when availability matters.

## Direct implementation checklist

For a known use case:

1. Resolve the canonical use-case ID.
2. Inspect deterministic prechecks and protected authority.
3. Inspect the exact Custom Reflex definition and fixtures.
4. Check whether an equivalent active definition already exists.
5. Select MCP, SDK, or REST from the actual environment.
6. Implement state normalization and size/data-class checks.
7. Call Reflex and map only declared branches.
8. Fail unknown/error/low-confidence behavior to the documented safe path.
9. Revalidate current state before any effect.
10. Execute synthetic fixture smoke tests.
11. Add a harder holdout/eval before production reliance.
12. Record definition/question/policy version and observed results.

Do not ask the user to redesign a use case that already has a canonical public contract unless their requirements materially differ.

## Catalog

The public registry contains focused scenario skills generated from each canonical use case. Their names follow:

`brida-reflex-<use-case-id>`

Use [references/use-case-index.md](references/use-case-index.md) to map natural-language requests and aliases to those IDs.

## Protected changes

Ask before activation, deployment, credential changes, publication, purchases, money movement, sending external communications, changing production data, or other protected actions.

It is valid to conclude that a candidate is deterministic code, a larger workflow, or not Reflex.
