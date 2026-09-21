# Sponsor segment detection

**Decision:** classify a bounded transcript or media segment as primary content, sponsorship/promotion, or ambiguous after deterministic timing and playback rules have already run.

Use deterministic code first for timestamps, transcript availability, exact sponsor markers, user preferences, minimum segment length, playback state, and seek capability. Reflex only judges the semantic role of the supplied segment.

## State

Supply a short non-sensitive segment summary or transcript window plus:

- coarse media context;
- nearby disclosure text;
- segment position metadata;
- deterministic playback/transcript checks.

Do not send private media, account tokens, or an entire sensitive transcript to a `non_sensitive` Reflex.

## Branches

- `keep_candidate` — the segment is primary editorial/program content.
- `skip_candidate` — the segment is materially sponsorship, advertising, affiliate, or promotional content.
- `review` — the segment is mixed or cannot be classified reliably.

## Authority boundary

This Reflex is recommendation-only. It does not seek playback, mute audio, edit a file, remove content, or grant media permissions. The player/editor revalidates current timing, user policy, and segment boundaries before any action.

## Workflow fit

A typical flow is:

`transcript/timing extraction -> exact markers and user rules -> Reflex segment classification -> host policy -> boundary verification -> optional seek/edit`.

The semantic decision should operate on a bounded segment, not generate timestamps or control the player directly.
