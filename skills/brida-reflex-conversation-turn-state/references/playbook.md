# Conversation turn state playbook

Canonical use-case ID: `conversation-turn-state`
Version: `1`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- none

## Decision

classify the current bounded conversational turn as incomplete, ready for a response, a likely interruption/barge-in, or ambiguous.

## Primary semantic question

Classify the semantic interaction state of the supplied current transcript. Use the assistant state and timing metadata only as context; deterministic timing/freshness policy remains host-owned.

## Declared branches

- `continue_listening`
- `respond_candidate`
- `barge_in_candidate`
- `review`

## Canonical public guidance

# Conversation turn state

**Decision:** classify the current bounded conversational turn as incomplete, ready for a response, a likely interruption/barge-in, or ambiguous.

Timing and transport stay deterministic. The host owns speech recognition, transcript sequencing, silence timers, minimum-pause rules, stale-result rejection, assistant playback state and intent execution. Reflex handles only the small semantic question: what interaction state the supplied transcript represents.

## State

Supply only non-sensitive normalized interaction context, for example:

- the current partial/final transcript;
- milliseconds since the last recognized word;
- whether the assistant is listening or speaking;
- a short non-sensitive summary of what the assistant is currently saying;
- deterministic timing/freshness signals.

Do not send raw audio, credentials, private conversation history or sensitive personal content to a `non_sensitive` Developer Preview Reflex.

## Branches

- `continue_listening` — the utterance appears incomplete or the user is still formulating the request.
- `respond_candidate` — the utterance appears semantically complete enough for the host to consider responding.
- `barge_in_candidate` — while the assistant is speaking, the user appears to be intentionally interrupting/correcting/cancelling.
- `review` — the evidence is ambiguous or insufficient.

## Authority boundary

This Reflex is recommendation-only. It does not stop speech, start recording, execute the detected intent, send a message, place a call, operate a device, or decide whether microphone access is permitted. The host must revalidate transcript sequence, timing, current assistant state and authorization before any action.

## Workflow fit

A robust flow is:

`speech/transcript stream -> deterministic freshness/timing checks -> Reflex turn-state judgment -> host timing policy -> current-state revalidation -> optional response/interruption handling`.

If a deterministic command or explicit UI action already settles the interaction state, use code instead of Reflex.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
