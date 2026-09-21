# Meeting utterance triage playbook

Canonical use-case ID: `meeting-utterance-triage`
Version: `1`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- meeting action items
- meeting minutes
- live meeting notes
- action item detection
- meeting triage

## Decision

classify one already-segmented meeting utterance as an action item, decision, open question, risk, ordinary status/chatter, or ambiguous.

## Primary semantic question

Classify the semantic role of this already-segmented meeting utterance. Judge only the supplied utterance in its bounded recent context; do not invent owners, deadlines, decisions or actions that were not stated. Use the criteria tie-breaks: concrete project follow-up work beats a risk explanation; an explicit settled choice beats its rationale; a request to perform project work is an action item rather than an open question; a question seeking information, confirmation, or who knows something remains an open question; meeting facilitation such as greetings, breaks, agenda movement or ending the call is no-note; a bare acknowledgement or agreement without one uniquely identifiable proposition is ambiguous. A follow-up that is explicitly conditional on an unresolved future decision is not yet an action item; route that ambiguous conditional commitment to review.

## Declared branches

- `action_item_candidate`
- `decision_candidate`
- `question_candidate`
- `risk_candidate`
- `no_note`
- `review`

## Canonical public guidance

# Meeting utterance triage

**Decision:** classify one already-segmented meeting utterance as an action item, decision, open question, risk, ordinary status/chatter, or ambiguous.

Run deterministic meeting plumbing first: transcript segmentation, meeting/tenant access, stable participant identifiers, timestamps, exact date arithmetic, deduplication and explicit task/project policy remain host-owned. Reflex handles only the bounded semantic meaning of the supplied utterance.

## State

Supply only non-sensitive normalized context, for example:

- the completed utterance;
- a short meeting topic;
- a generic speaker role or stable non-sensitive label;
- up to a few preceding utterance summaries when they materially disambiguate meaning;
- deterministic signals such as sentence completeness, duplicate detection, or meeting scope.

Do not send raw audio, credentials, private participant identifiers, sensitive transcripts or full meeting history to a non_sensitive Developer Preview Reflex.

## Branches

- action_item_candidate — the utterance creates, accepts or assigns concrete follow-up work.
- decision_candidate — the utterance records a settled choice or explicit agreement.
- question_candidate — the utterance leaves a substantive question unresolved.
- risk_candidate — the utterance identifies a blocker, dependency or material risk worth surfacing.
- no_note — ordinary status reporting, social chatter, or meeting facilitation such as breaks and agenda movement does not warrant one of the note categories above.
- review — the semantic category is genuinely ambiguous or confidence is insufficient.

## Authority boundary

This Reflex is recommendation-only. It does not create a task, assign an owner, set or calculate a due date, notify participants, write final meeting minutes, update a project board, resolve a question, close a risk, or execute any action discussed in the meeting.

The host application revalidates current meeting state and authorization before any downstream mutation.

## Workflow fit

A robust flow is:

speech/transcript -> deterministic sentence segmentation + access/dedup checks -> bounded utterance state -> Reflex semantic triage -> host aggregation/review -> separately authorized note/task workflow.

Keep exact owner resolution and date parsing in code. Treat work that is explicitly conditional on an unresolved future decision as review rather than as a current action item. If later questions depend on the primary category, stage them after this decision rather than speculatively encoding every possible field into one static contract.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
