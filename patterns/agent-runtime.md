# Agent-runtime workflow

An agent loop contains planning, tools, state, budgets, retries and side effects. Reflex can provide fast bounded judgments at several points without becoming the agent.

## Example composition

`event -> wake gate -> route -> generative agent -> tool-risk gate -> authorized tool -> progress gate -> quality gate`

Possible Reflex decisions include:

- whether an event merits waking an authorized worker;
- which bounded model/worker lane is a candidate;
- whether a proposed tool action deserves review;
- whether recent steps are making material progress;
- whether produced work meets a bounded acceptance rubric.

### Outside Reflex

Keep these outside Reflex:

- open-ended planning and reasoning;
- prompt construction and long-form generation;
- tool execution;
- credentials and capability grants;
- retries, leases and scheduler state;
- budgets and quotas;
- commits, deploys, browser actions and messages.

## Avoid semantic loops with no deterministic anchor

A Reflex should consume a bounded state snapshot and return typed evidence. It should not recursively decide what to decide next without an application-owned stopping condition.

## Revalidation

Any state that can change between judgment and action must be re-read before the protected side effect. The agent's authority is never increased by a Reflex score.
