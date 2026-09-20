# Browser action risk gate

**Decision:** classify a proposed browser/computer-use action as an automation candidate, review-required, or blocked.

Use this gate before a browser/computer-use worker performs a potentially consequential action. A Reflex result never bypasses the browser tool's own authorization or user-confirmation policy.

Use structured action metadata when possible. Do not send screenshots containing sensitive data during the non-sensitive Preview.
