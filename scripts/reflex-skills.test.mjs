import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import test from 'node:test'
import YAML from 'yaml'

const root = new URL('../', import.meta.url)
const repoRoot = root.pathname
const skillsRoot = join(repoRoot, 'skills')
const useCasesRoot = join(repoRoot, 'examples', 'use-cases')

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/u)
  assert.ok(match, 'SKILL.md must start with YAML frontmatter')
  return YAML.parse(match[1])
}

test('every Reflex use case has one synchronized focused skill', async () => {
  const useCases = (await readdir(useCasesRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()

  for (const id of useCases) {
    const definitionPath = join(useCasesRoot, id, 'custom-reflex.json')
    let definitionText
    try { definitionText = await readFile(definitionPath, 'utf8') } catch (error) {
      if (error?.code === 'ENOENT') continue
      throw error
    }
    const definition = JSON.parse(definitionText)
    const skillDir = join(skillsRoot, 'brida-reflex-' + id)
    const skill = await readFile(join(skillDir, 'SKILL.md'), 'utf8')
    const frontmatter = parseFrontmatter(skill)
    assert.deepEqual(Object.keys(frontmatter).sort(), ['description', 'name'])
    assert.equal(frontmatter.name, 'brida-reflex-' + id)
    assert.ok(frontmatter.description.length > 40)
    assert.ok(frontmatter.description.length <= 1024)
    assert.ok((await readFile(join(skillDir, 'agents', 'openai.yaml'), 'utf8')).length > 0)
    const bundled = JSON.parse(await readFile(join(skillDir, 'references', 'custom-reflex.json'), 'utf8'))
    assert.deepEqual(bundled, definition)
    const playbook = await readFile(join(skillDir, 'references', 'playbook.md'), 'utf8')
    assert.match(playbook, new RegExp('Canonical use-case ID: `'+ id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +'`'))
    assert.match(skill, /Do not restart broad discovery/u)
  }
})

test('core Reflex skill is intent-first and has progressive references', async () => {
  const core = await readFile(join(skillsRoot, 'brida-reflex', 'SKILL.md'), 'utf8')
  const frontmatter = parseFrontmatter(core)
  assert.equal(frontmatter.name, 'brida-reflex')
  assert.match(frontmatter.description, /If the user already names a use case, implement it directly instead of interviewing them/u)
  assert.match(core, /Known use case -> implement directly/u)
  assert.match(core, /Open-ended discovery -> brief audit/u)
  assert.match(core, /Verification \/ benchmark -> test, do not assume/u)
  for (const file of ['current-contract.md', 'discovery.md', 'implementation.md', 'question-design.md', 'composition.md', 'verification.md', 'use-case-index.md']) {
    assert.ok((await readFile(join(skillsRoot, 'brida-reflex', 'references', file), 'utf8')).length > 0)
  }
})

test('no generated Reflex skill is orphaned', async () => {
  const validIds = new Set((await readdir(useCasesRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name))
  for (const entry of await readdir(skillsRoot, { withFileTypes: true })) {
    if (!entry.isDirectory() || !entry.name.startsWith('brida-reflex-')) continue
    const id = entry.name.slice('brida-reflex-'.length)
    assert.ok(validIds.has(id), 'orphan focused Reflex skill: ' + entry.name)
  }
})

test('Claude plugin metadata exposes the Reflex skill pack', async () => {
  const marketplace = JSON.parse(await readFile(join(repoRoot, '.claude-plugin', 'marketplace.json'), 'utf8'))
  const plugin = JSON.parse(await readFile(join(repoRoot, '.claude-plugin', 'plugin.json'), 'utf8'))
  assert.equal(marketplace.name, 'brida-ai')
  assert.equal(marketplace.plugins.length, 1)
  assert.equal(marketplace.plugins[0].name, 'reflex')
  assert.equal(marketplace.plugins[0].source, './')
  assert.equal(plugin.name, 'reflex')
  assert.equal(plugin.repository, 'https://github.com/brida-ai/reflex')
  assert.equal(plugin.license, 'Apache-2.0')
})
