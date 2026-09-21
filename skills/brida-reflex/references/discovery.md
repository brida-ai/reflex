# Discovery mode

Use this only when the user has not already identified the Reflex they want.

## Goal

Find at most three high-value bounded semantic decisions in the user's real workflow without turning the session into an interview.

## Ask briefly

Ask only questions that materially change the candidates. Usually one short round is enough:

- What recurring event arrives?
- What small decision is made repeatedly?
- What happens after that decision?

If the conversation or connected project already answers these, do not ask again.

## Candidate test

A strong Reflex candidate is:

- repeated;
- semantically fuzzy rather than exactly computable;
- small enough for Binary, Choice, or Score;
- useful before expensive model/agent/human work;
- safe to express as recommendation-only;
- able to fail to review/abstention.

Reject or move outside Reflex when the task is deterministic parsing, exact policy, long-form generation, open-ended planning, authorization, or side-effect execution.

## Output

Return no more than three candidates. For each include:

- event/state;
- bounded decision;
- existing use-case/official fit;
- question type;
- branches;
- deterministic precheck;
- uncertainty path;
- authority boundary;
- validation plan.

Then start implementing the best candidate unless the user asked only for analysis.

Do not require the user to choose among dozens of catalog entries.
