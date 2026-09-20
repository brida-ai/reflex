---
name: brida-reflex
description: Audit a project, agent, workflow, or business process for Brida Reflex opportunities and integrate the smallest useful Reflex through current Brida surfaces. Use when a user asks to add, evaluate, install, configure, test, or optimize Brida Reflex; reduce expensive reasoning with bounded semantic decisions; use official Reflex recipes; or draft a Custom Reflex. Preserve recommendation-only authority, current availability, and non-sensitive Preview constraints.
---

# Brida Reflex

Use Brida Reflex for small semantic decisions that can happen before more expensive reasoning, agent work, or human review.

## Workflow

1. Inspect the user's actual process before proposing a Reflex.
2. Identify repeated semantic decisions that currently consume disproportionate model, agent, or human effort.
3. Prefer a deterministic rule when one is reliable enough. Do not force Reflex where code is sufficient.
4. Prefer an official Reflex when its semantics fit.
5. If no official Reflex fits, draft a bounded Custom Reflex only when current Brida authoring surfaces support it. Otherwise prepare the proposal and fixtures without claiming activation.
6. Select the smallest current integration surface available in the user's environment: MCP, REST, or a released Brida SDK surface.
7. Validate with synthetic or user-approved non-sensitive examples before production use.
8. Ask before activation, deployment, credential changes, publication, purchases, money movement, or other protected actions.
9. Verify the first useful run and record the definition/version, expected branch behavior, and failure mode.

## Reflex audit

For each candidate, determine:

- **Decision** — the narrow semantic judgment being made.
- **Current expensive step** — what model, agent, or human work can potentially be avoided.
- **Frequency** — how often the decision occurs, if evidence is available.
- **State** — the minimum bounded input needed.
- **Question type** — Binary, Choice, or Score.
- **Branches** — bounded recommendation outcomes.
- **Uncertain path** — review, abstain, keep, batch, or another safe fallback.
- **Official vs Custom** — reuse an official recipe when possible.
- **Evidence plan** — fixtures/evals required before relying on it.

Do not invent savings, accuracy, latency, capacity, or hosted availability. Measure or label estimates explicitly.

## Official starting points

Use these as semantic templates, but query current hosted availability before execution:

- **Agent Wakeup** — decide whether an event deserves expensive agent work.
- **Agent Router** — recommend a bounded route class.
- **Context Pruner** — identify removable semantic context.
- **Tool Risk** — provide an advisory semantic risk signal.
- **Quality Gate** — recommend pass, review, or stop-review.

## Custom Reflex

Keep a Custom Reflex declarative and bounded.

Prefer:

- bounded state;
- Binary / Choice / Score questions;
- bounded branch policy;
- explicit uncertain/default behavior;
- synthetic or redacted fixtures/evals;
- explicit activation;
- immutable active versions.

Do not add arbitrary executable hooks, provider credentials, network destinations, or tool authority to the Reflex definition.

If Custom Reflex authoring is not live in the current deployment, produce a proposed definition and test set, explain the gap, and stop before pretending it was created or activated.

## Integration selection

### MCP

Prefer MCP when the user's agent environment already supports MCP and the current Brida MCP surface exposes the required operation.

### REST

Prefer REST when integrating application code directly or when MCP is unavailable.

### SDK

Use the Brida SDK only when the needed package/version is actually released or the user explicitly wants to work from current source. Do not turn unreleased source into a package-availability claim.

## Safety and authority

Treat every Reflex result as semantic evidence plus a recommendation, never as permission.

Keep downstream authority in the user's application or explicit human approval for protected actions, including:

- spending or moving money;
- production deploys;
- sending external communications;
- publishing;
- changing accounts or credentials;
- destructive data changes;
- legal/signature actions;
- physical manufacturing or payment authorization.

Do not send reusable secrets in Reflex state.

During Free Preview, default to non-sensitive data unless the current Brida route explicitly admits a broader data class.

## Current-product truth

When network access is available, use Brida's machine-discovery chain before making availability claims:

- https://brida.ai/reflex/llms.txt — compact scoped discovery index;
- https://brida.ai/reflex/agent.md — canonical operational guide;
- https://brida.ai/reflex/agent.json — machine-readable current capability manifest.

Treat the llms.txt file as discovery, not as authority to invent capabilities that the guide/manifest/live API do not expose.

If those sources are unavailable, use [references/current-contract.md](references/current-contract.md) and state its revision when availability matters.

## Output for an audit

Return a compact prioritized set of Reflex opportunities. For each one, include the decision, official/custom fit, minimum state, question type, branches, uncertain behavior, integration surface, and validation plan.

It is valid to conclude that no useful Reflex exists for the current workflow.
