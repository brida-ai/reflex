# Semantic content blocking

**Decision:** classify a host-selected page/content candidate as ordinary content, promotional content, or ambiguous content after exact blocking rules have already run.

Use deterministic code first for known tracker domains, explicit blocklists, exact selectors, user allowlists/denylists, and security policy. Reflex handles only the fuzzy semantic remainder: whether the supplied candidate is materially promotional or advertising content.

## State

Supply only non-sensitive normalized candidate context, for example:

- visible text;
- element role or coarse DOM class;
- nearby disclosure/label text;
- destination class;
- page context;
- deterministic signals already computed by the host.

Do not send cookies, credentials, private page content, account identifiers, or full browsing history.

## Branches

- `keep_candidate` — the candidate appears to be ordinary page/editorial/product content.
- `hide_candidate` — the candidate is materially advertising, sponsored, affiliate or promotional content.
- `review` — the supplied evidence is mixed or insufficient.

## Authority boundary

This Reflex is recommendation-only. It does not remove DOM nodes, modify a page, block a network request, grant extension permissions, or decide tracking/security policy. A browser extension or host application owns the final hide/show action and should re-check current DOM state before mutation.

## Workflow fit

A robust browser flow is:

`user policy + deterministic filter lists -> candidate extraction -> Reflex semantic classification -> host policy -> DOM revalidation -> optional hide`.

The deterministic layer should resolve known ads cheaply. Reflex is useful for ad-shaped or promotional content that survives exact rules.
