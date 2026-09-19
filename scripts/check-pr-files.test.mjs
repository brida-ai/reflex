import assert from 'node:assert/strict'
import { test } from 'node:test'

import { checkPullRequestFiles } from './check-pr-files.mjs'

const file = (filename, status = 'added') => ({ filename, status })

test('internal maintainer PRs may change control-plane files', () => {
  assert.deepEqual(
    checkPullRequestFiles([file('.github/workflows/public-surface.yml', 'modified')], { external: false }),
    { checked: 1, external: false },
  )
})

test('external PRs may add a versioned recipe+fixture and update an example', () => {
  assert.deepEqual(
    checkPullRequestFiles([
      file('recipes/message-triage/1.yaml'),
      file('fixtures/message-triage/1.json'),
      file('examples/README.md', 'modified'),
    ], { external: true }),
    { checked: 3, external: true },
  )
})

test('external PRs cannot mutate an existing immutable recipe version', () => {
  assert.throws(
    () => checkPullRequestFiles([file('recipes/agent-wakeup/3.yaml', 'modified')], { external: true }),
    /may only add immutable recipe\/fixture versions/u,
  )
})

test('external PRs cannot alter workflows, scripts or governance', () => {
  for (const path of [
    '.github/workflows/public-surface.yml',
    'scripts/validate-registry.mjs',
    '.github/repository-governance.yml',
    'package.json',
  ]) {
    assert.throws(
      () => checkPullRequestFiles([file(path, 'modified')], { external: true }),
      /path is not allowed/u,
    )
  }
})

test('external PRs cannot remove recipe fixtures or examples', () => {
  assert.throws(
    () => checkPullRequestFiles([file('fixtures/agent-router/1.json', 'removed')], { external: true }),
    /may only add immutable recipe\/fixture versions/u,
  )
  assert.throws(
    () => checkPullRequestFiles([file('examples/minimal-reflex.yaml', 'removed')], { external: true }),
    /may not remove\/rename examples/u,
  )
})
