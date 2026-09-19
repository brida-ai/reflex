import { lstat, readFile, readdir } from 'node:fs/promises'
import { basename, join, resolve } from 'node:path'
import { pathToFileURL, fileURLToPath } from 'node:url'

import Ajv2020 from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'
import YAML from 'yaml'

const DEFAULT_ROOT = fileURLToPath(new URL('..', import.meta.url))
const MAX_RECIPE_BYTES = 64 * 1024
const MAX_FIXTURE_BYTES = 256 * 1024
const MAX_JSON_DEPTH = 32

export async function validateRegistry(rootDirectory = DEFAULT_ROOT) {
  const root = resolve(rootDirectory)
  const schemaDir = join(root, 'schema')
  const recipeDir = join(root, 'recipes')
  const fixtureDir = join(root, 'fixtures')
  const exampleDir = join(root, 'examples')

  const recipeSchema = JSON.parse(await readBounded(join(schemaDir, 'reflex.schema.json'), MAX_RECIPE_BYTES, root))
  const fixtureSchema = JSON.parse(await readBounded(join(schemaDir, 'fixture.schema.json'), MAX_RECIPE_BYTES, root))

  const ajv = new Ajv2020({ allErrors: true, strict: true })
  addFormats(ajv)
  const validateRecipeSchema = ajv.compile(recipeSchema)
  const validateFixtureSchema = ajv.compile(fixtureSchema)

  const recipes = new Map()
  for (const relativePath of await versionedFiles(recipeDir, '.yaml')) {
    const recipe = await parseRecipe(join(recipeDir, relativePath), root)
    assertSchema(validateRecipeSchema, recipe, `recipes/${relativePath}`)
    const expectedPath = `${recipe.metadata.name}/${recipe.metadata.version}.yaml`
    assert(relativePath === expectedPath, `recipes/${relativePath}: path must be recipes/${expectedPath}`)
    const key = recipeKey(recipe.metadata.name, recipe.metadata.version)
    assert(!recipes.has(key), `recipes/${relativePath}: duplicate recipe version ${key}`)
    recipes.set(key, recipe)
  }
  assert(recipes.size > 0, 'registry must contain at least one recipe')

  const fixtureKeys = new Set()
  for (const relativePath of await versionedFiles(fixtureDir, '.json')) {
    const raw = await readBounded(join(fixtureDir, relativePath), MAX_FIXTURE_BYTES, root)
    const fixture = JSON.parse(raw)
    assertJsonDepth(fixture, `fixtures/${relativePath}`)
    assertSchema(validateFixtureSchema, fixture, `fixtures/${relativePath}`)
    const expectedPath = `${fixture.recipe.name}/${fixture.recipe.version}.json`
    assert(relativePath === expectedPath, `fixtures/${relativePath}: path must be fixtures/${expectedPath}`)
    const key = recipeKey(fixture.recipe.name, fixture.recipe.version)
    assert(!fixtureKeys.has(key), `fixtures/${relativePath}: duplicate fixture set ${key}`)
    fixtureKeys.add(key)

    const recipe = recipes.get(key)
    assert(recipe !== undefined, `fixtures/${relativePath}: recipe version ${key} does not exist`)
    validateFixtureCoherence(relativePath, fixture, recipe)
  }

  for (const key of recipes.keys()) {
    const [name, version] = key.split('@')
    assert(fixtureKeys.has(key), `recipe ${key}: missing fixtures/${name}/${version}.json`)
  }

  let examples = 0
  for (const file of await files(exampleDir, '.yaml')) {
    const example = await parseRecipe(join(exampleDir, file), root)
    assertSchema(validateRecipeSchema, example, `examples/${file}`)
    examples += 1
  }

  return Object.freeze({ recipeVersions: recipes.size, fixtureSets: fixtureKeys.size, examples })
}

async function parseRecipe(path, root) {
  const raw = await readBounded(path, MAX_RECIPE_BYTES, root)
  if (/(^|[\s[{,])&[A-Za-z0-9_-]+/mu.test(raw) || /(^|[\s[{,])\*[A-Za-z0-9_-]+/mu.test(raw) || /(^|\s)<<\s*:/mu.test(raw)) {
    throw new Error(`${relative(path, root)}: YAML anchors, aliases and merge keys are not allowed`)
  }
  const document = YAML.parseDocument(raw, {
    maxAliasCount: 0,
    strict: true,
    uniqueKeys: true,
  })
  if (document.errors.length > 0) {
    throw new Error(`${relative(path, root)}: invalid YAML: ${document.errors.map((item) => item.message).join('; ')}`)
  }
  const value = document.toJS({ maxAliasCount: 0 })
  assertJsonDepth(value, relative(path, root))
  return value
}

function validateFixtureCoherence(file, fixture, recipe) {
  const branchSet = new Set(recipe.spec.branches)
  const caseIds = new Set()
  for (const item of fixture.cases) {
    assert(!caseIds.has(item.id), `fixtures/${file}: duplicate case id ${item.id}`)
    caseIds.add(item.id)
    assert(branchSet.has(item.expected.branch), `fixtures/${file}#${item.id}: expected branch is not declared by recipe`)
    if (item.mode !== 'policy') continue

    assert(typeof item.expected.evidenceStatus === 'string', `fixtures/${file}#${item.id}: policy case requires expected.evidenceStatus`)
    assert(typeof item.expected.reason === 'string', `fixtures/${file}#${item.id}: policy case requires expected.reason`)

    for (const [questionId, answer] of Object.entries(item.answers)) {
      const question = recipe.spec.questions[questionId]
      assert(question !== undefined, `fixtures/${file}#${item.id}: answer references unknown question ${questionId}`)
      assert(answer.type === question.type, `fixtures/${file}#${item.id}: answer type for ${questionId} does not match recipe`)
      if (answer.type === 'choice') {
        assert(
          Object.hasOwn(question.criteria, answer.choice),
          `fixtures/${file}#${item.id}: choice ${answer.choice} is not declared by ${questionId}`,
        )
        const probabilities = answer.probabilities ?? {}
        if (Object.keys(probabilities).length > 0) {
          assert(Object.hasOwn(probabilities, answer.choice), `fixtures/${file}#${item.id}: selected choice probability is missing`)
        }
        let probabilitySum = 0
        for (const [key, probability] of Object.entries(probabilities)) {
          assert(
            Object.hasOwn(question.criteria, key),
            `fixtures/${file}#${item.id}: probability ${key} is not declared by ${questionId}`,
          )
          probabilitySum += probability
        }
        assert(probabilitySum <= 1.000001, `fixtures/${file}#${item.id}: choice probabilities exceed 1`)
      }
    }
  }
}

function assertSchema(validate, value, label) {
  if (validate(value)) return
  const errors = validate.errors?.map((error) => `${error.instancePath || '/'} ${error.message}`).join('; ') ?? 'unknown schema error'
  throw new Error(`${label}: ${errors}`)
}

async function files(dir, suffix) {
  return (await readdir(dir)).filter((file) => file.endsWith(suffix)).sort()
}

async function versionedFiles(dir, suffix) {
  const result = []
  for (const name of (await readdir(dir)).sort()) {
    const child = join(dir, name)
    const info = await lstat(child)
    assert(!info.isSymbolicLink(), `${name}: symlinks are not allowed`)
    if (info.isFile()) {
      assert(!name.endsWith(suffix), `${name}: recipe/fixture files must live under <id>/<version>${suffix}`)
      continue
    }
    assert(info.isDirectory(), `${name}: recipe/fixture namespace must be a real directory`)
    for (const file of (await readdir(child)).sort()) {
      const versionPath = join(child, file)
      const versionInfo = await lstat(versionPath)
      assert(versionInfo.isFile() && !versionInfo.isSymbolicLink(), `${name}/${file}: expected a regular version file`)
      if (file.endsWith(suffix)) result.push(`${name}/${file}`)
    }
  }
  return result
}

function recipeKey(name, version) {
  return `${name}@${version}`
}


async function readBounded(path, maximumBytes, root) {
  const info = await lstat(path)
  assert(info.isFile() && !info.isSymbolicLink(), `${relative(path, root)}: expected a regular non-symlink file`)
  assert(info.size <= maximumBytes, `${relative(path, root)}: file exceeds ${maximumBytes} bytes`)
  return readFile(path, 'utf8')
}

function assertJsonDepth(value, label, depth = 0) {
  assert(depth <= MAX_JSON_DEPTH, `${label}: JSON/YAML nesting exceeds ${MAX_JSON_DEPTH}`)
  if (Array.isArray(value)) {
    for (const item of value) assertJsonDepth(item, label, depth + 1)
    return
  }
  if (value !== null && typeof value === 'object') {
    for (const item of Object.values(value)) assertJsonDepth(item, label, depth + 1)
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function relative(path, root) {
  return path.startsWith(`${root}/`) ? path.slice(root.length + 1) : basename(path)
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const result = await validateRegistry(process.argv[2] ?? DEFAULT_ROOT)
  console.log(`registry validation: ${result.recipeVersions} recipe versions / ${result.fixtureSets} fixture sets / ${result.examples} examples / ok`)
}
