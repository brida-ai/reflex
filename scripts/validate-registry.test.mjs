import assert from 'node:assert/strict'
import { cp, mkdtemp, readFile, rm, unlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'

import { validateRegistry } from './validate-registry.mjs'

const sourceRoot = new URL('..', import.meta.url).pathname

async function sandbox() {
  const root = await mkdtemp(join(tmpdir(), 'brida-reflex-registry-'))
  for (const directory of ['schema', 'recipes', 'fixtures', 'examples', 'templates']) {
    await cp(join(sourceRoot, directory), join(root, directory), { recursive: true })
  }
  return root
}

async function withSandbox(run) {
  const root = await sandbox()
  try {
    await run(root)
  } finally {
    await rm(root, { recursive: true, force: true })
  }
}

test('validates the current public registry', async () => {
  const result = await validateRegistry(sourceRoot)
  assert.deepEqual(result, { recipeVersions: 5, fixtureSets: 5, examples: 1, customDraftExamples: 31 })
})

test('rejects a Custom Reflex fixture branch that its policy cannot produce', async () => {
  await withSandbox(async (root) => {
    const path = join(root, 'examples', 'custom-reflex-draft.json')
    const draft = JSON.parse(await readFile(path, 'utf8'))
    draft.fixtures[0].expectedBranch = 'ship_to_production'
    await writeFile(path, JSON.stringify(draft, null, 2))
    await assert.rejects(() => validateRegistry(root), /expected branch is not reachable by policy/u)
  })
})

test('rejects a Custom Reflex policy whose question type does not match', async () => {
  await withSandbox(async (root) => {
    const path = join(root, 'examples', 'custom-reflex-draft.json')
    const draft = JSON.parse(await readFile(path, 'utf8'))
    draft.declarative_policy.type = 'score'
    draft.declarative_policy.thresholds = [{ atLeast: 0.5, branch: 'qualified' }]
    draft.declarative_policy.belowBranch = 'ignore'
    delete draft.declarative_policy.trueBranch
    delete draft.declarative_policy.falseBranch
    delete draft.declarative_policy.uncertainBranch
    delete draft.declarative_policy.trueWhenProbabilityAtLeast
    delete draft.declarative_policy.falseWhenProbabilityAtMost
    await writeFile(path, JSON.stringify(draft, null, 2))
    await assert.rejects(() => validateRegistry(root), /policy question type does not match/u)
  })
})

test('rejects a fixture branch that its recipe does not declare', async () => {
  await withSandbox(async (root) => {
    const path = join(root, 'fixtures', 'quality-gate', '1.json')
    const fixture = JSON.parse(await readFile(path, 'utf8'))
    fixture.cases[0].expected.branch = 'ship_to_production'
    await writeFile(path, JSON.stringify(fixture, null, 2))
    await assert.rejects(() => validateRegistry(root), /expected branch is not declared/u)
  })
})

test('rejects a policy answer whose type disagrees with the recipe question', async () => {
  await withSandbox(async (root) => {
    const path = join(root, 'fixtures', 'tool-risk', '1.json')
    const fixture = JSON.parse(await readFile(path, 'utf8'))
    fixture.cases[0].answers.irreversible = { type: 'choice', choice: 'low' }
    await writeFile(path, JSON.stringify(fixture, null, 2))
    await assert.rejects(() => validateRegistry(root), /answer type for irreversible does not match recipe/u)
  })
})

test('rejects YAML anchors and aliases', async () => {
  await withSandbox(async (root) => {
    const path = join(root, 'recipes', 'agent-router', '1.yaml')
    const recipe = await readFile(path, 'utf8')
    await writeFile(path, `x: &shared value\ny: *shared\n${recipe}`)
    await assert.rejects(() => validateRegistry(root), /anchors, aliases and merge keys are not allowed/u)
  })
})

test('requires one fixture set for every recipe', async () => {
  await withSandbox(async (root) => {
    await unlink(join(root, 'fixtures', 'context-pruner', '1.json'))
    await assert.rejects(() => validateRegistry(root), /missing fixtures\/context-pruner\/1\.json/u)
  })
})


test('allows immutable recipe versions to coexist as separate files', async () => {
  await withSandbox(async (root) => {
    const recipeOne = join(root, 'recipes', 'quality-gate', '1.yaml')
    const recipeTwo = join(root, 'recipes', 'quality-gate', '2.yaml')
    const fixtureOne = join(root, 'fixtures', 'quality-gate', '1.json')
    const fixtureTwo = join(root, 'fixtures', 'quality-gate', '2.json')
    await cp(recipeOne, recipeTwo)
    await cp(fixtureOne, fixtureTwo)
    await writeFile(recipeTwo, (await readFile(recipeTwo, 'utf8')).replace('version: "1"', 'version: "2"'))
    const fixture = JSON.parse(await readFile(fixtureTwo, 'utf8'))
    fixture.recipe.version = '2'
    await writeFile(fixtureTwo, JSON.stringify(fixture, null, 2))

    const result = await validateRegistry(root)
    assert.equal(result.recipeVersions, 6)
    assert.equal(result.fixtureSets, 6)
  })
})

test('rejects unversioned recipe files at the recipes root', async () => {
  await withSandbox(async (root) => {
    await cp(
      join(root, 'recipes', 'agent-router', '1.yaml'),
      join(root, 'recipes', 'unversioned.yaml'),
    )
    await assert.rejects(() => validateRegistry(root), /must live under <id>\/<version>\.yaml/u)
  })
})
