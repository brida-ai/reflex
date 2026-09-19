# Official recipes

A Brida Reflex recipe is declarative data. It describes a stable semantic decision contract; it is not executable plugin code and does not grant authority to perform a side effect.

The initial registry contains five recipes:

- `agent-wakeup` — decide whether an event can be ignored, batched, escalated, or considered for an authorized worker wake-up.
- `agent-router` — recommend a bounded route class; deterministic application policy still controls which candidate IDs are authorized.
- `context-pruner` — identify removable semantic context; system and pinned context remain protected by deterministic policy.
- `tool-risk` — provide an advisory risk signal; it never grants tool permission.
- `quality-gate` — recommend pass/review/stop-review; it never mutates or delivers protected output.

## Hosted availability

A recipe existing in this repository does **not** mean it is currently available as a hosted Brida API run. Hosted availability is exposed by the Brida API itself and may lag the declarative registry while application adapters and safety review are completed.

## Versioning

`metadata.version`, `questionSetRef`, and `policyRef` are immutable contract identifiers. A semantic change adds a new `recipes/<id>/<version>.yaml` plus matching `fixtures/<id>/<version>.json`; released version files are preserved rather than overwritten.

## Authority

Every current public recipe declares:

```yaml
authority: recommendation_only
```

A recommendation is evidence for an application policy. It is not permission to use tools, spend money, change identity/tenant scope, mutate protected output, or perform any other protected side effect.
