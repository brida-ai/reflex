# Page clutter relevance playbook

Canonical use-case ID: `page-clutter-relevance`
Version: `1`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- unclutter
- page clutter
- reading cleanup

## Decision

decide whether one host-selected page element is useful to the supplied browsing/reading goal, nonessential visual clutter, or ambiguous.

## Primary semantic question

Classify the supplied page element only by how useful it is to the stated browsing or reading goal, after deterministic protected-element checks have already run.

## Declared branches

- `keep_candidate`
- `hide_candidate`
- `review`

## Canonical public guidance

# Page clutter relevance

**Decision:** decide whether one host-selected page element is useful to the supplied browsing/reading goal, nonessential visual clutter, or ambiguous.

This is intentionally different from `semantic-content-blocking`. An element can be non-promotional and still be clutter for the current goal; advertising/sponsorship classification is a separate question.

Use deterministic code first for structural safety: never send protected form fields, credentials, hidden values, user-pinned elements, required navigation, or other elements that host policy already knows must remain available.

## State

Supply only non-sensitive normalized candidate context, for example:

- the current reading/browsing goal;
- bounded visible text;
- a coarse element role;
- where the candidate sits relative to primary content;
- deterministic safety/interaction signals computed by the host.

Do not send cookies, credentials, private page contents, account identifiers, or full browsing history.

## Branches

- `keep_candidate` — the element materially helps the supplied page goal or is useful supporting context.
- `hide_candidate` — the element is clearly nonessential to the supplied goal and is a candidate for visual simplification.
- `review` — usefulness is mixed, context-dependent, or insufficiently established.

## Authority boundary

This Reflex is recommendation-only. It does not remove DOM nodes, click consent controls, change browser permissions, persist rules, or decide network policy. The host must re-check current DOM state and its own safety policy before hiding anything.

## Workflow fit

A robust flow is:

`DOM + user policy -> deterministic protected-element checks -> bounded candidate -> Reflex relevance -> host policy -> current-DOM revalidation -> optional visual hide`.

Use a fresh semantic decision only when deterministic/template rules do not already settle the candidate.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
