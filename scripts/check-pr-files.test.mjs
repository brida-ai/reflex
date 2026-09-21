import assert from 'node:assert/strict'
import { test } from 'node:test'

import { checkExternalPullRequestFiles } from './check-pr-files.mjs'

const file = (filename, status = 'added') => ({ filename, status })

test('external PRs may add a versioned recipe+fixture and update an example', () => {
  assert.deepEqual(
    checkExternalPullRequestFiles([
      file('recipes/message-triage/1.yaml'),
      file('fixtures/message-triage/1.json'),
      file('examples/README.md', 'modified'),
    ]),
    { checked: 3, external: true },
  )
})

test('external PRs cannot mutate an existing immutable recipe version', () => {
  assert.throws(
    () => checkExternalPullRequestFiles([file('recipes/agent-wakeup/3.yaml', 'modified')]),
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
      () => checkExternalPullRequestFiles([file(path, 'modified')]),
      /path is not allowed/u,
    )
  }
})

test('external PRs cannot remove recipe fixtures or examples', () => {
  assert.throws(
    () => checkExternalPullRequestFiles([file('fixtures/agent-router/1.json', 'removed')]),
    /may only add immutable recipe\/fixture versions/u,
  )
  assert.throws(
    () => checkExternalPullRequestFiles([file('examples/minimal-reflex.yaml', 'removed')]),
    /may not remove\/rename examples/u,
  )
})
