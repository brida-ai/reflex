# Custom Reflex templates

Copy one of these bounded starters when you need an Organization-private Custom Reflex.

- `binary.json` — yes/no semantic judgment with an explicit uncertain branch.
- `choice.json` — choose one bounded category with an explicit uncertain branch.
- `score.json` — score against a small rubric and map thresholds to branches.

All templates are `non_sensitive` for the Developer Preview and are recommendation-only. Replace the placeholder IDs, instructions, policy references and synthetic fixtures before activation.

For `score` questions, the returned score is the probability-weighted expected **zero-based rubric index**: a five-entry rubric spans `0` through `4`. Set score-policy thresholds on that numeric range rather than on human-facing labels such as “1–5”.
