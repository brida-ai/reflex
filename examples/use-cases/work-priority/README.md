# Work priority reflex

**Decision:** run now, defer, or escalate a task from bounded scheduling context.

This captures the human-reflex pattern: make a cheap scheduling decision before waking a more expensive agent. It can also revisit deferred work when deadlines become urgent.

The scheduler or operator owns execution. Reflex only recommends the queue branch.
