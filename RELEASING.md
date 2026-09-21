# Releasing the public Reflex registry

The public registry is a versioned snapshot of declarative recipes, schemas, synthetic fixtures, Agent Skills and public integration contracts. Hosted tenancy, provider routing, credentials, metering and production activation remain outside this repository.

## Release flow

1. Merge public changes through normal pull requests only after required CI, review and trust-boundary checks pass.
2. Record the exact `main` SHA approved for release.
3. Run **Release public Reflex registry**, choose `patch`, `minor`, or `major`, and provide that exact SHA.
4. The controller refuses to release if `main` moved.
5. A read-only verifier installs from the lockfile with dependency lifecycle scripts disabled, reruns the complete `pnpm check` suite, and computes the next version from immutable stable Git tags.
6. Only the verified source SHA plus release version/tag identity crosses into the write-capable job; that job installs no dependencies and executes no repository release code.
7. The write-capable job checks out the exact verified SHA, creates or verifies the annotated immutable tag, and creates the GitHub Release with generated notes.

## Invariants

- Never release an unreviewed branch or pull-request head.
- Never move or overwrite an existing release tag.
- Never include private Brida implementation, secrets, customer data or hosted provider credentials in a public release.
- Recipes and fixtures remain declarative and synthetic/redacted.
- Release automation may create tags/releases; it does not bypass `main` review rules. Repository write authority is isolated from dependency installation and registry validation.
- A retry is idempotent only when an existing tag already identifies the exact approved SHA.

A P0 security hotfix may use the repository's documented owner-only emergency path, but exact-SHA QA and a follow-up review are still mandatory.
