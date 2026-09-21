# Document-processing workflow

Document processing usually combines deterministic parsers, OCR, validation, semantic judgment and human review.

## Boundary

A typical flow is:

`file validation -> parser -> Reflex extraction-route judgment -> optional OCR -> deterministic field validation -> exception review`

### Outside Reflex

Keep these outside Reflex:

- file integrity and MIME checks;
- text extraction itself;
- OCR execution;
- exact totals, checksums and arithmetic;
- schema validation;
- document access control;
- database writes and accounting actions.

### Good Reflex decisions

Reflex can judge the fuzzy remainder:

- whether parser output is coherent enough to continue;
- whether a page looks like an OCR candidate after deterministic text-layer checks;
- whether a normalized document summary contains a semantic exception that deserves review;
- which bounded document class best fits an ambiguous item.

The public `document-extraction-route` and `document-invoice-review` examples cover two different points in this workflow.

## Authority

A recommendation to try OCR does not authorize access to a document or a third-party service. A clean invoice judgment does not authorize payment or posting.
