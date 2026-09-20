import assert from 'node:assert/strict'
import test from 'node:test'

import { highestVersion, nextRelease, parseVersionTag } from './version.mjs'

test('parses only stable public release tags', () => {
  assert.deepEqual(parseVersionTag('v0.1.0'), { major: 0, minor: 1, patch: 0 })
  assert.equal(parseVersionTag('v0.1.0-rc.1'), null)
  assert.equal(parseVersionTag('backup/pre-release'), null)
})

test('starts an unreleased registry from zero', () => {
  assert.deepEqual(highestVersion([]), { major: 0, minor: 0, patch: 0 })
  assert.equal(nextRelease([], 'minor').tag, 'v0.1.0')
})

test('uses numeric tag ordering', () => {
  assert.deepEqual(highestVersion(['v0.1.9', 'v0.1.10']), { major: 0, minor: 1, patch: 10 })
})

test('advances patch, minor, and major', () => {
  assert.equal(nextRelease(['v0.1.0'], 'patch').tag, 'v0.1.1')
  assert.equal(nextRelease(['v0.1.7'], 'minor').tag, 'v0.2.0')
  assert.equal(nextRelease(['v0.9.9'], 'major').tag, 'v1.0.0')
})

test('rejects unknown impact', () => {
  assert.throws(() => nextRelease([], 'banana'), /patch, minor, or major/u)
})
