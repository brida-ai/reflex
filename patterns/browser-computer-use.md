# Browser and computer-use workflow

A browser or computer-use agent is a larger system. Reflex can own bounded semantic judgments inside it, but it does not become the browser executor.

## Boundary

A robust flow is:

`observe -> deterministic candidate construction -> Reflex judgment -> state/authority revalidation -> executor -> verify outcome`

### Outside Reflex

Keep these deterministic or tool-owned:

- DOM/accessibility-tree or screen observation;
- candidate element indexing;
- supported-operation filtering;
- permissions and user-confirmation policy;
- coordinates, selectors and executable commands;
- stale-page and occlusion checks;
- click/type/scroll execution;
- purchase, message, permission and credential side effects;
- outcome verification.

### Good Reflex decisions

Reflex can help with small bounded questions such as:

- classify a proposed action's semantic risk;
- choose a candidate operation from a host-supplied legal set when the contract supports that set;
- judge whether observed state means the goal is complete;
- decide whether ambiguity requires human review.

The current public `browser-action-risk` example demonstrates the risk-gate part. Dynamic action spaces are a separate capability and should not be faked by turning model text into selectors or commands.

## Authority

A low-risk or high-confidence answer is never permission to execute. The host must re-read current state and re-check authority immediately before the side effect.
