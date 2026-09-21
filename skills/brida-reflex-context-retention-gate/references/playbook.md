# Context retention gate playbook

Canonical use-case ID: `context-retention-gate`
Version: `1`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- context compaction
- context compression
- context pruning
- memory cleanup

## Decision

classify one already-authorized context item as worth keeping verbatim, suitable for semantic compaction, safely low-value for the current bounded task, or ambiguous.

## Primary semantic question

Classify how one already-authorized context item should be retained for the supplied bounded task. System/policy/pinned/secret protections have already been applied by deterministic code.

## Declared branches

- `keep_candidate`
- `compact_candidate`
- `drop_candidate`
- `review`

## Canonical public guidance

# Context retention gate

**Decision:** classify one already-authorized context item as worth keeping verbatim, suitable for semantic compaction, safely low-value for the current bounded task, or ambiguous.

This Reflex does not summarize text and does not mutate context. It only provides a bounded retention recommendation after deterministic protections have already run.

Use deterministic code first for system/developer instructions, pinned turns, secrets, privacy/tenant rules, required audit evidence, tool-call/result pairing, active commitments, exact identifiers and explicit retention policy. Protected items should never reach this gate as drop candidates.

## State

Supply only non-sensitive normalized context evidence, for example:

- the current bounded task or objective;
- item kind and a bounded item summary;
- whether the item is recent/old;
- deterministic protection and persistence signals.

Do not send credentials, secrets, private customer content or unrestricted transcripts to a `non_sensitive` Preview Reflex.

## Branches

- `keep_candidate` — exact wording/details are likely still useful to the task and should remain available verbatim.
- `compact_candidate` — the item's semantic substance is useful, but exact wording/detail is probably unnecessary; the host may summarize or otherwise compact it.
- `drop_candidate` — the item is clearly superseded, transient, or unrelated enough that retaining it is low-value for the bounded task.
- `review` — usefulness or exact-detail requirements are unclear.

## Authority boundary

This Reflex is recommendation-only. It never deletes history, writes summaries, mutates memory, removes audit evidence, or overrides pinned/system/policy context. The host owns compaction, retention budgets and fail-open behavior.

## Workflow fit

A safe flow is:

`privacy + pinned/system + audit protections -> bounded context item -> Reflex retention class -> host retention/compaction policy -> optional summarizer`.

If the engine is unavailable or uncertain, keep the item rather than silently discarding it.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
