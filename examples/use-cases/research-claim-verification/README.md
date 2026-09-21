# Research claim verification

**Decision:** decide whether a bounded claim is supported enough to continue, materially contradicted enough to stop, or still needs verification.

Source discovery, freshness checks, access control, citation parsing and exact provenance validation should run outside Reflex. Reflex only judges the supplied claim/evidence relationship.

## State

Supply only non-sensitive bounded research context, for example:

- one claim;
- short summaries of already-retrieved sources;
- source class/authority metadata if relevant;
- deterministic freshness/provenance checks already performed by the research system.

Do not treat a source summary as trustworthy merely because Reflex classifies it as supportive.

## Branches

- `continue` — the supplied evidence materially supports the claim without a supplied contradiction.
- `stop` — an authoritative supplied source materially contradicts the claim.
- `verify` — evidence is incomplete, indirect, mixed, insufficient, or the decision is below threshold.

Uncertainty routes to `verify`.

## Authority boundary

This Reflex is recommendation-only. It does not retrieve sources, declare a claim true, publish research, alter citations, suppress contradictory evidence, or grant access to restricted material.

The research system remains responsible for source quality, currentness, provenance and any final factual assertion.

## Workflow fit

A robust flow is:

`retrieval + provenance/freshness checks -> bounded claim/evidence state -> Reflex support class -> verify/continue policy -> final research/human validation`.

For exact facts that can be deterministically checked against an authoritative structured source, prefer the exact check.
