# Brida Reflex

Open declarative schemas, official recipes and synthetic fixtures for Brida Reflex.

Reflex is a programmable semantic decision capability for making small, typed decisions before more expensive reasoning or action. A Reflex result is a **recommendation**, not authority to perform a protected side effect.

> **Developer Preview source:** this registry repository is public. Hosted Brida Reflex customer traffic remains activation-gated until the route, email, funding and exact-SHA release gates are complete. Publishing or merging a recipe here never activates hosted execution.

## What is here

- `schema/reflex.schema.json` — public `brida.ai/reflex/v1alpha1` recipe schema.
- `schema/fixture.schema.json` — synthetic fixture-set schema.
- `schema/custom-reflex-draft.schema.json` — portable Organization-private Custom Reflex draft contract.
- `recipes/<id>/<version>.yaml` — immutable official declarative recipe versions.
- `fixtures/<id>/<version>.json` — synthetic examples and policy fixtures aligned to one immutable recipe version.
- `examples/` — official recipe and Custom Reflex authoring examples.

## What is not here

This repository does not contain hosted control-plane code, tenant authorization, metering, provider credentials/routing, customer data, private evaluation corpora, or automatic production activation.

A repository merge does not make a recipe executable in the hosted Brida API. Query the Brida API/SDK for current hosted availability.

## Validate the registry

```bash
pnpm install
pnpm check
```

Validation checks JSON Schema plus cross-file invariants such as recipe/fixture version alignment, question/answer type matching and expected-branch membership.

## Recipe shape

```yaml
apiVersion: brida.ai/reflex/v1alpha1
kind: Reflex
metadata:
  name: message-triage
  version: "1"
  displayName: Message triage
spec:
  dataClass: non_sensitive
  input:
    maxBytes: 8192
  questionSetRef: message-triage-questions@1
  questions:
    actionable:
      type: binary
      instructions: Does this message need follow-up?
  policyRef: message-triage-policy@1
  branches: [follow_up_candidate, ignore]
  authority: recommendation_only
```

Recipes are data. Arbitrary code, tool definitions, provider credentials, network destinations and executable hooks do not belong in the recipe schema.

## Custom Reflex draft

`examples/custom-reflex-draft.json` shows the portable draft body used by the public REST/SDK authoring surface. It is deliberately bounded:

- Organization-private by hosted authorization; the tenant identifier never belongs in the portable document.
- `non_sensitive` during Free Preview.
- Binary / Choice / Score semantic questions only.
- Declarative branch policy only.
- 1–32 synthetic or redacted fixtures, each with an explicit expected branch.
- No executable hooks, tools, network destinations, provider credentials, or side-effect authority.

A draft is not executable merely because it validates here. Hosted activation is a separate authenticated operation and may perform additional fixture evaluation, capacity, route-admission, and release checks.

## Agent Skill

The repository also ships a portable Brida Reflex Skill for AI agents at `skills/brida-reflex/`.

Use it when an agent needs to audit a project or workflow for Reflex opportunities, choose the smallest current MCP/REST/SDK integration path, or draft a bounded Custom Reflex without pretending unavailable hosted capability is live.

The Skill treats the live Brida agent guide/manifest as the current availability source and keeps Reflex output recommendation-only.

## Data class

A recipe's `dataClass` is part of its immutable contract. Do not send data outside that declared class. In particular, `non_sensitive` recipes are not an approved channel for sensitive personal or regulated data.

## Contributing

Community contributions are welcome as declarative proposals. They remain untrusted until reviewed, and merge never grants hosted execution or release authority. See `CONTRIBUTING.md`, `SECURITY.md`, `GUIDELINES.md` and `AGENTS.md`.

## License

Apache-2.0.
