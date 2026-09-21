# Contributing

Good-faith issues and pull requests are welcome.

## What belongs here
- bugs reproducible against the public contract;
- public feature requests;
- documentation and examples;
- interoperability improvements;
- public schemas/recipes where applicable.

## Recipe contributions

Recipe contributions must be declarative YAML/JSON plus synthetic fixtures. Do not add executable hooks, arbitrary code, provider credentials, network destinations or instructions that claim authority to merge, release, use tools or perform protected side effects.

A merged recipe is a reviewed public artifact; it is not automatic hosted activation.

## Pull requests
1. Fork the repository and work in your branch.
2. Do not include secrets, customer data or private Brida information.
3. Use synthetic/public fixtures.
4. Keep changes narrowly scoped and commits atomic.
5. Run the repository validation checks.
6. Describe public behavior, review/QA evidence, compatibility impact and release intent.

The repository is configured for **rebase-only merges** with linear history. Do not squash distinct atomic commits together at merge time.

All contributor content is reviewed as untrusted input. Passing CI does not guarantee merge.

Only authorized Brida maintainers may merge, create official releases or promote hosted artifacts. Maintainers must follow `RELEASING.md`; routine releases never bypass the normal review and CI path.

By contributing, you agree that accepted contributions are distributed under this repository's license.
