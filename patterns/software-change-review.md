# Software change-review workflow

Code review combines exact repository policy, static analysis, tests, semantic risk assessment and authorized human decisions.

## Boundary

A typical flow is:

`protected-path policy -> static analysis / tests -> Reflex review-depth judgment -> authorized reviewers -> merge controls`

### Outside Reflex

Keep these outside Reflex:

- branch protection and repository permissions;
- compiler and type errors;
- lint and static-analysis findings;
- test execution;
- CODEOWNERS and protected-path rules;
- commit signing;
- merge, release and deploy actions.

### Good Reflex decisions

Reflex can help judge:

- whether a change summary appears routine, focused or specialist-review worthy;
- whether supplied evidence suggests a compatibility or security review lane;
- whether a generated change appears to need deeper review despite passing exact checks;
- whether the available evidence is too incomplete to classify confidently.

The public `change-review-risk` example demonstrates semantic review-depth recommendation.

## Authority

A routine classification is not approval. Repository governance and authorized reviewers remain controlling.
