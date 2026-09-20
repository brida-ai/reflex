# Releasing the public Reflex registry

The public registry is a versioned snapshot of declarative recipes, schemas, synthetic fixtures, Agent Skills and public integration contracts. Hosted tenancy, provider routing, credentials, metering and production activation remain outside this repository.

## Release flow

1. Merge public changes through normal pull requests only after required CI, review and trust-boundary checks pass.
2. Record the exact `main` SHA approved for release.
3. Run **Release public Reflex registry**, choose `patch`, `minor`, or `major`, and provide that exact SHA.
4. The controller refuses to release if `main` moved.
5. It installs from the lockfile and reruns the complete `pnpm check` suite.
6. The next version is computed from immutable stable Git tags. An unreleased registry starts at `0.0.0`, so the first `minor` release is `v0.1.0`.
7. The controller creates an annotated immutable tag on that exact SHA and a GitHub Release with generated notes.

## Invariants

- Never release an unreviewed branch or pull-request head.
- Never move or overwrite an existing release tag.
- Never include private Brida implementation, secrets, customer data or hosted provider credentials in a public release.
- Recipes and fixtures remain declarative and synthetic/redacted.
- Release automation may create tags/releases; it does not bypass `main` review rules.
- A retry is idempotent only when an existing tag already identifies the exact approved SHA.

A P0 security hotfix may use the repository's documented owner-only emergency path, but exact-SHA QA and a follow-up review are still mandatory.
