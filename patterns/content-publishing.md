# Content, advertising and publishing workflow

Content systems combine generation, policy, quality review, campaign configuration and publication. Reflex can judge bounded semantic properties; it does not create or publish the content.

## Boundary

A typical flow is:

`draft or candidate -> deterministic format/policy checks -> Reflex quality/policy judgment -> human/application policy -> optional publication`

### Outside Reflex

Keep these outside Reflex:

- long-form copy or creative generation;
- exact platform policy and legal rules;
- asset rendering and media processing;
- campaign budgets, bids and targeting;
- publication, posting or message delivery;
- account permissions and spend authorization.

### Good Reflex decisions

Reflex can help judge:

- whether a draft meets an explicit audience and acceptance rubric;
- whether supplied content falls into one of a small application-defined policy classes;
- whether an ad/post candidate needs revision or human policy review;
- whether semantic quality is too ambiguous for an automatic branch.

The public `content-quality-gate` and `content-policy-review` examples cover these bounded decisions.

## Claims

Do not turn third-party performance claims into Reflex claims. Publish performance only from Brida-owned frozen evaluations that exercise the exact public contract.
