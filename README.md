# Brida Reflex

[![skills.sh](https://skills.sh/b/brida-ai/reflex)](https://skills.sh/brida-ai/reflex)

Open declarative schemas, official recipes and synthetic fixtures for Brida Reflex.

Reflex is a programmable semantic decision capability for making small, typed decisions before more expensive reasoning or action. A Reflex result is a **recommendation**, not authority to perform a protected side effect.

> **Developer Preview source:** this registry repository is public. Hosted Brida Reflex customer traffic remains activation-gated until the route, email, funding and exact-SHA release gates are complete. Publishing or merging a recipe here never activates hosted execution.

## What is here

- `schema/reflex.schema.json` — public `brida.ai/reflex/v1alpha1` recipe schema.
- `schema/fixture.schema.json` — synthetic fixture-set schema.
- `schema/custom-reflex-draft.schema.json` — portable Organization-private Custom Reflex draft contract.
- `recipes/<id>/<version>.yaml` — immutable official declarative recipe versions.
- `fixtures/<id>/<version>.json` — synthetic examples and policy fixtures aligned to one immutable recipe version.
- `examples/` — official recipe, Custom Reflex authoring examples, and real-world synthetic use cases.
- `templates/` — copyable Binary / Choice / Score Custom Reflex starters.
- `patterns/` — provider-neutral integration patterns showing what belongs before, inside and after a Reflex decision.

## What is not here

This repository does not contain hosted control-plane code, tenant authorization, metering, provider credentials/routing, customer data, private evaluation corpora, or automatic production activation.

A repository merge does not make a recipe executable in the hosted Brida API. Query the Brida API/SDK for current hosted availability.

The open-source TypeScript SDK lives at [`brida-ai/sdk`](https://github.com/brida-ai/sdk). The registry and SDK are Apache-2.0; the hosted Brida Reflex service remains a separately operated product.

## Evaluation with ReflexBench

[ReflexBench](https://github.com/brida-ai/reflexbench) is Brida's open, provider-neutral benchmark and reproducible evaluation harness for System One models and typed decision engines. It evaluates Binary/Noul, Choice and Score quality, calibration, multilingual consistency, option-order robustness, cardinality/capability and same-response workflow-policy value without collapsing them into one global score.

Benchmark v1 is frozen for reproducibility; new engine/checkpoint results can be added against the unchanged protocol.

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

`examples/custom-reflex-draft.json` shows the smallest portable draft body used by the public REST/SDK authoring surface. For copyable starters see `templates/`; for realistic patterns see `examples/use-cases/`. It is deliberately bounded:

- Organization-private by hosted authorization; the tenant identifier never belongs in the portable document.
- `non_sensitive` during Free Preview.
- Binary / Choice / Score semantic questions only.
- Declarative branch policy only.
- 1–32 synthetic or redacted fixtures, each with an explicit expected branch.
- No executable hooks, tools, network destinations, provider credentials, or side-effect authority.

A draft is not executable merely because it validates here. Hosted activation is a separate authenticated operation and may perform additional fixture evaluation, capacity, route-admission, and release checks.

## Agent Skills

The repository ships an intent-first Brida Reflex Skill plus focused skills generated from every canonical Custom Reflex use case.

Use the general skill when you want the agent to choose or design the right Reflex:

```bash
npx skills add brida-ai/reflex@brida-reflex
```

If the use case is already known, install the focused skill directly. For example, semantic AdBlock/content blocking:

```bash
npx skills add brida-ai/reflex@brida-reflex-semantic-content-blocking
```

For Claude Code, the repository is also a plugin marketplace:

```bash
claude plugin marketplace add brida-ai/reflex
claude plugin install reflex@brida-ai
```

The general skill is **intent-first**: a concrete request goes straight to implementation; discovery questions are used only when the user has not identified the decision yet. Focused skills bundle the exact public Custom Reflex contract, playbook and synthetic fixtures for that use case.

Focused skills are generated from `examples/use-cases/` and checked in CI, so changing a public use-case contract without regenerating its skill fails validation. Reflex output remains recommendation-only and downstream authority stays in host code or an authorized human.

## Data class

A recipe's `dataClass` is part of its immutable contract. Do not send data outside that declared class. In particular, `non_sensitive` recipes are not an approved channel for sensitive personal or regulated data.

## Contributing

Community contributions are welcome as declarative proposals. They remain untrusted until reviewed, and merge never grants hosted execution or release authority. See `CONTRIBUTING.md`, `SECURITY.md`, `GUIDELINES.md` and `AGENTS.md`.

## License

Apache-2.0.
