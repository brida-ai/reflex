# Agent-runtime workflow

An agent loop contains planning, tools, state, budgets, retries and side effects. Reflex can provide fast bounded judgments at several points without becoming the agent.

## Example composition

`event -> wake gate -> route -> generative agent -> tool-risk gate -> authorized tool -> progress gate -> quality gate`

Possible Reflex decisions include:

- whether an event merits waking an authorized worker;
- which bounded work lane or effort tier is a candidate;
- whether a proposed tool action deserves review;
- whether recent steps are making material progress;
- whether produced work meets a bounded acceptance rubric;
- whether bounded evidence establishes completion or still requires work;
- whether a specific test or verification step is relevant to the change.

### Outside Reflex

Keep these outside Reflex:

- open-ended planning and reasoning;
- prompt construction and long-form generation;
- tool execution;
- credentials and capability grants;
- retries, leases and scheduler state;
- budgets and quotas;
- commits, deploys, browser actions and messages.

## Independent semantic supervisor

A useful composition is to keep the worker loop and the semantic supervisor loop separate:

`worker events -> deterministic sampling/debounce -> bounded evidence snapshot -> Reflex signals -> deterministic intervention policy`

The worker can continue planning and using already-authorized tools while the supervisor evaluates a bounded snapshot. The supervisor should not become a second open-ended agent.

A supervisor snapshot can feed several independent signals, for example:

| Signal | Existing Reflex shape | What the host may do with it |
| --- | --- | --- |
| recent work made material progress | `agent-progress-gate` | decide whether another deterministic inspection/retry policy should run |
| required evidence establishes completion | `completion-evidence-gate` | consider finishing only after exact required checks are re-read |
| a verification/test target is relevant | `test-relevance-gate` | schedule an already-authorized verifier/test |
| an artifact meets a bounded rubric | `quality-gate` or a Custom Score/Choice | continue, request revision, or send to review under host policy |
| a tool/action appears risky | `tool-risk` | require the host's normal review/authorization path |
| an execution result represents a known failure class | `execution-failure-classification` | select a deterministic retry/fix/review policy; never perform it automatically |

Use a fan-out contract when multiple independent questions need the same bounded state. Keep each question narrow. The host combines answers; one Reflex answer should not recursively invent or rewrite the next question.

### Deterministic intervention policy

Reflex signals are evidence, not commands. A deterministic policy should decide whether any intervention is allowed.

For example:

- a completion candidate cannot finish work unless required builds/tests/artifacts are deterministically present and current;
- a stalled-progress signal cannot grant another retry or more budget;
- a verification-needed signal cannot create new tool permissions;
- a tool-risk score cannot turn a denied action into an allowed action;
- an unavailable/failed supervisor must not increase worker authority.

Prefer conservative defaults for protected transitions. If completion evidence is ambiguous, keep working or review. If a protected action is ambiguous, follow the host's review policy.

### Sampling and bounded state

Do not send every token, tool event or raw log to a supervisor by default. The host should deterministically:

1. select the event classes worth evaluating;
2. debounce or sample high-frequency events;
3. cap the evidence window;
4. remove or summarize fields that are not needed for the bounded decision;
5. enforce the Reflex data class before transmission.

For a `non_sensitive` Preview workflow, raw secrets, credentials, private source contents, sensitive customer data and unrestricted transcripts must not be introduced just because the supervisor would find them useful.

### Revalidation before intervention

Supervisor decisions can race with an active worker. Before stopping, steering, retrying, verifying or finishing anything, the orchestrator should re-read the current worker/run state and confirm the evidence is still current.

A stale progress or completion judgment must not mutate a newer run.

## Avoid semantic loops with no deterministic anchor

A Reflex should consume a bounded state snapshot and return typed evidence. It should not recursively decide what to decide next without an application-owned stopping condition.

Avoid loops such as:

`Reflex decides to ask another Reflex what to do -> that Reflex decides to ask another Reflex -> ...`

The orchestrator owns:

- when evaluation runs;
- which stable questions exist;
- retry/timeout ceilings;
- which state transition is legal;
- when the loop stops.

## Revalidation

Any state that can change between judgment and action must be re-read before the protected side effect. The agent's authority is never increased by a Reflex score.
