# Browser extension semantic content filter

This is a small Manifest V3 demo showing how a browser extension can use the public `semantic-content-blocking` Custom Reflex without putting Brida credentials in the browser.

## Boundary

The extension owns:

- DOM observation and candidate extraction;
- exact selector/filter rules;
- the local hide/show side effect;
- current-DOM revalidation;
- user/browser permissions.

Reflex owns only the bounded semantic classification:

`ordinary | promotional | ambiguous -> keep_candidate | hide_candidate | review`.

A Reflex branch is recommendation-only. The extension decides whether to hide a still-current element after local policy checks.

## Architecture

`user click -> activeTab -> page DOM -> deterministic filters -> semantic candidate -> extension service worker -> loopback companion -> Brida Reflex -> branch -> DOM fingerprint recheck -> optional hide`

The extension never stores or receives `BRIDA_API_KEY`. The companion process is trusted server-side code, binds only to `127.0.0.1`, and accepts requests only from one explicitly configured Chrome extension origin.

The demo is deliberately user initiated. It does not register a content script across every HTTP/HTTPS page, which avoids silently sending arbitrary browsing content into a `non_sensitive` Preview workflow.

## Run the local demo

1. Create and activate an Organization Custom Reflex from `examples/use-cases/semantic-content-blocking/custom-reflex.json`.
2. Open `chrome://extensions`, enable Developer mode, choose **Load unpacked**, select the `extension/` directory, and copy the extension ID.
3. Start the companion from this directory with the exact extension origin:

   ```bash
   BRIDA_API_KEY=... BRIDA_EXTENSION_ORIGIN=chrome-extension://<extension-id> node companion/server.mjs
   ```

   `BRIDA_API_BASE_URL` may be set to an authorized Brida deployment. HTTP is accepted only for loopback development endpoints.

4. On a page whose candidate text is safe for the Custom Reflex's `non_sensitive` data class, click the extension action to scan the current tab.

The demo does not block network requests or trackers. Exact ad/tracker blocking belongs in normal filter lists and browser/network policy; this example demonstrates the semantic remainder.

## Safety notes

- Never add a Brida API key to extension source, storage, options, sync storage, logs, or analytics.
- The companion accepts one exact configured Chrome-extension origin and returns only a normalized branch.
- The extension requires an explicit user click and temporary `activeTab` access instead of persistent all-site content-script access.
- Candidate text is bounded and the scan has a per-page cap.
- Exact ad selectors are handled locally before Reflex.
- `review` leaves the element visible.
- Before hiding, the content script checks that the element is still connected and its text fingerprint is unchanged.
- A production integration should use an authenticated backend/session rather than treating this loopback demo as deployment architecture.

## Verify

From the registry root:

```bash
node --test scripts/browser-extension-semantic-blocking.test.mjs
node --check examples/integrations/browser-extension-semantic-blocking/extension/content.js
node --check examples/integrations/browser-extension-semantic-blocking/extension/service-worker.js
node --check examples/integrations/browser-extension-semantic-blocking/companion/server.mjs
```
