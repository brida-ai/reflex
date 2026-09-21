# Document extraction route playbook

Canonical use-case ID: `document-extraction-route`
Version: `1`
Question type: `choice`
Data class: `non_sensitive`

## Natural-language aliases

- OCR routing
- document OCR
- extraction route

## Decision

recommend the next bounded extraction path when deterministic document checks do not fully settle whether parsed text is usable.

## Primary semantic question

Recommend the bounded extraction path using only the supplied parser, text-layer and validation evidence.

## Declared branches

- `continue_local`
- `try_ocr`
- `review`

## Canonical public guidance

# Document extraction route

**Decision:** recommend the next bounded extraction path when deterministic document checks do not fully settle whether parsed text is usable.

Run exact checks first: file integrity, supported type, parser success/failure, text-layer presence, required-field syntax and known corruption signatures remain deterministic.

## State

Supply only non-sensitive extraction metadata and a bounded synthetic/redacted summary, for example:

- parser status;
- whether a text layer exists;
- extracted-text quality summary;
- expected document structure;
- deterministic validation results.

## Branches

- `continue_local` — the extracted text appears usable for the normal local pipeline.
- `try_ocr` — the evidence is consistent with a scanned/image document where OCR is a reasonable candidate.
- `review` — the extraction state is mixed, ambiguous or insufficient.

## Authority boundary

This Reflex is recommendation-only. It does not open documents, invoke OCR, upload files, accept extracted facts as true, or mutate a record. The application must revalidate document access, current state and downstream authorization before acting.

## Workflow fit

`file/type/integrity checks -> deterministic parser -> Reflex extraction route -> authorized OCR/local path -> deterministic validation -> human review when needed`.

## Verification

The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.

Do not tune engine thresholds on the same holdout later reported as unseen evaluation.
