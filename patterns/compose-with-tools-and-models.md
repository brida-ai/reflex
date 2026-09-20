# Compose Reflex with tools and models

Reflex can sit between deterministic code, generative models, tools and human workflows without owning any of them.

## Reflex before an expensive model

Use a bounded decision to decide whether expensive reasoning is warranted, which authorized model tier is a candidate, or which bounded specialist lane fits the request.

The application still controls model availability, privacy policy, budget and routing admission.

## Reflex after retrieval

Retrieve with deterministic authorization and filters first. Reflex can then judge relevance, support, contradiction or semantic fit before evidence reaches a downstream model.

Reflex does not grant access to a document and does not make a source true.

## Reflex before a tool

The application constructs the authorized candidate action set. Reflex can classify intent or risk, but the tool layer revalidates arguments, state and permission immediately before execution.

Never execute a raw model output as shell, SQL, browser JavaScript, payment instruction or tool call.

## Reflex after generation

A bounded quality or policy gate can score a generated artifact against explicit acceptance criteria. The host decides whether to revise, review, deliver or discard it.

Long-form generation itself is not Reflex.

## Human escalation

An explicit uncertainty/review branch is part of a robust decision contract. Human review is not a failure mode; it is how the application handles cases outside the calibrated automatic region.
