# Reflex integration patterns

These patterns show where a bounded Reflex decision belongs inside a larger workflow.

A Reflex is deliberately small:

`deterministic precheck -> typed semantic decision -> application policy/revalidation -> optional side effect`

Only the middle decision is Reflex. The surrounding system remains ordinary code, tools, models, queues and human processes.

## Use cases, templates, recipes and patterns

- **Use case** — a realistic Custom Reflex for one bounded semantic decision.
- **Template** — a reusable Binary / Choice / Score authoring shape.
- **Recipe** — a stable, versioned official Reflex contract with frozen fixtures.
- **Pattern** — guidance for composing Reflex with deterministic code, tools, models and human review. A pattern can include important work that is intentionally **not Reflex**.

## What belongs outside Reflex

Prefer deterministic code for anything exact: parsing, arithmetic, schema validation, authorization, permissions, quotas, TTLs, identifiers, cryptographic checks, policy invariants and known error codes.

Keep open-ended generation and planning outside Reflex. A generative model can run before or after a Reflex when the workflow needs text, code, plans or explanations.

Keep every protected side effect outside Reflex: tool calls, browser actions, messages, purchases, payments, deploys, merges, account changes and other mutations require application-owned authorization and current-state validation.

## Core patterns

- [Deterministic before Reflex](deterministic-before-reflex.md)
- [Authority after Reflex](authority-after-reflex.md)
- [Compose Reflex with tools and models](compose-with-tools-and-models.md)
- [Calibrate policy thresholds per engine and model version](engine-calibration.md)

## Workflow blueprints

These show how larger systems can use Reflex without pretending the whole workflow is a Reflex:

- [Browser and computer use](browser-computer-use.md)
- [Document processing](document-processing.md)
- [Retrieval and RAG](retrieval-rag.md)
- [Agent runtime](agent-runtime.md)
- [Memory and context](memory-context.md)
- [Dataset curation and evaluation](dataset-curation-evaluation.md)
- [Software change review](software-change-review.md)
- [Operations and incident response](operations-incident-response.md)
- [Sales, support and CRM](sales-support-crm.md)
- [Content, advertising and publishing](content-publishing.md)
- [Hierarchical classification](hierarchical-classification.md)

The public Developer Preview examples use `non_sensitive` synthetic state. A pattern does not expand the data class or authority of a recipe or Custom Reflex.
