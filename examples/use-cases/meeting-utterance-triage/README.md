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
