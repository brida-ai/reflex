# Custom Reflex templates

Copy one of these bounded starters when you need an Organization-private Custom Reflex.

- `binary.json` — yes/no semantic judgment with an explicit uncertain branch.
- `choice.json` — choose one bounded category with an explicit uncertain branch.
- `score.json` — score against a small rubric and map thresholds to branches.
- `abstaining-choice.json` — bounded Choice with an explicit `none_of_above` category as well as probability-based uncertainty.
- `fan-out.json` — ask several independent typed questions over the same state in one evaluation while one primary question owns the declarative branch.

All templates are `non_sensitive` for the Developer Preview and are recommendation-only. Replace the placeholder IDs, instructions, policy references and synthetic fixtures before activation.

## Fan-out boundary

The fan-out template is useful when the same state needs several independent observations, such as a route, a risk signal and a severity score. The current declarative policy still branches on one primary question. Secondary answers are evidence for application logic and review; they do not silently compose new authority or side effects.

If one answer changes the state or answer space needed by the next question, use a second Reflex call instead of speculative fan-out.
