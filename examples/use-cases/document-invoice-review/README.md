# Invoice review gate

**Decision:** decide whether a normalized, synthetic invoice summary needs a human review.

Do arithmetic and deterministic validation in code first. Use Reflex for the bounded semantic exception that remains. The Reflex does not approve payment or move money.
