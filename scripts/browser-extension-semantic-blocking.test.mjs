import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

import {
  buildUpstreamRequest,
  isAllowedExtensionOrigin,
  normalizeBranch,
  validateCandidateState,
  validateExtensionOrigin,
} from '../examples/integrations/browser-extension-semantic-blocking/companion/server.mjs'

const EXTENSION_ORIGIN = 'chrome-extension://abcdefghijklmnopabcdefghijklmnop'

test('semantic content extension is user initiated and exposes no Brida credential', () => {
  const manifest = JSON.parse(fs.readFileSync(
    new URL('../examples/integrations/browser-extension-semantic-blocking/extension/manifest.json', import.meta.url),
    'utf8',
  ))

  assert.deepEqual(manifest.permissions, ['activeTab', 'scripting'])
  assert.deepEqual(manifest.host_permissions, ['http://127.0.0.1:8787/*'])
  assert.equal(manifest.content_scripts, undefined)
  assert.equal(JSON.stringify(manifest).includes('api.brida.ai'), false)
  assert.equal(JSON.stringify(manifest).includes('BRIDA_API_KEY'), false)
})

test('loopback companion is bound to one configured Chrome extension origin', () => {
  assert.equal(validateExtensionOrigin(EXTENSION_ORIGIN), EXTENSION_ORIGIN)
  assert.throws(() => validateExtensionOrigin('https://example.com'))
  assert.equal(isAllowedExtensionOrigin(EXTENSION_ORIGIN, EXTENSION_ORIGIN), true)
  assert.equal(
    isAllowedExtensionOrigin('chrome-extension://ponmlkjihgfedcbaponmlkjihgfedcba', EXTENSION_ORIGIN),
    false,
  )
  assert.equal(isAllowedExtensionOrigin('https://example.com', EXTENSION_ORIGIN), false)
})

test('candidate state is bounded before a Reflex request', () => {
  assert.doesNotThrow(() => validateCandidateState({
    visibleText: 'Try Example Cloud free for 30 days.',
    elementRole: 'aside',
    destinationClass: 'external',
  }))
  assert.throws(() => validateCandidateState({ visibleText: 'x'.repeat(701) }))
})

test('upstream request keeps the Brida credential server-side', () => {
  const request = buildUpstreamRequest({
    apiBaseUrl: 'https://api.brida.ai',
    apiKey: 'test-placeholder',
    state: { visibleText: 'Partner offer', elementRole: 'aside' },
    idempotencyKey: 'brida_test',
  })

  assert.equal(request.url.pathname, '/v1/reflexes/semantic-content-blocking/runs')
  assert.equal(request.init.headers['x-api-key'], 'test-placeholder')
  assert.equal(request.init.body.includes('test-placeholder'), false)
})

test('unknown hosted branch fails to review', () => {
  assert.equal(normalizeBranch({ decision: { branch: 'hide_candidate' } }), 'hide_candidate')
  assert.equal(normalizeBranch({ decision: { branch: 'unexpected_branch' } }), 'review')
})
