import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = fileURLToPath(new URL('../', import.meta.url))
const examplesRoot = join(repoRoot, 'examples', 'use-cases')
const skillsRoot = join(repoRoot, 'skills')
const coreReferences = join(skillsRoot, 'brida-reflex', 'references')
const checkOnly = process.argv.includes('--check')

const aliases = {
  'agent-progress-gate': ['stuck agent', 'progress gate', 'agent stagnation'],
  'browser-action-risk': ['browser action', 'computer use risk', 'DOM action risk'],
  'change-review-risk': ['code review triage', 'review depth', 'change risk'],
  'code-change-classification': ['commit classification', 'diff classification', 'change type'],
  'completion-evidence-gate': ['completion verification', 'done gate', 'completion check'],
  'context-retention-gate': ['context compaction', 'context compression', 'context pruning', 'memory cleanup'],
  'customer-support-ticket-triage': ['support triage', 'ticket routing', 'support queue'],
  'dataset-example-quality': ['training data screening', 'dataset curation'],
  'document-extraction-route': ['OCR routing', 'document OCR', 'extraction route'],
  'duplicate-report-match': ['duplicate issue', 'duplicate ticket', 'duplicate report'],
  'execution-failure-classification': ['failure classification', 'error triage', 'runtime failure'],
  'game-state-action': ['gameplay decision', 'game state', 'simulation action'],
  'incoming-message-risk': ['phishing', 'spam risk', 'inbound message risk'],
  'memory-relevance-gate': ['memory relevance', 'remember this', 'memory gate'],
  'meeting-utterance-triage': ['meeting action items', 'meeting minutes', 'live meeting notes', 'action item detection', 'meeting triage'],
  'model-effort-routing': ['model routing', 'effort routing', 'model tier'],
  'outbound-message-risk': ['send guard', 'outbound message review', 'message risk'],
  'page-clutter-relevance': ['unclutter', 'page clutter', 'reading cleanup'],
  'research-claim-verification': ['claim verification', 'citation check', 'evidence verification'],
  'retrieval-relevance-gate': ['RAG relevance', 'retrieval gate', 'search relevance', 'semantic search', 'repo navigation'],
  'semantic-cache-reuse-gate': ['semantic cache', 'cache reuse', 'semantic caching'],
  'semantic-content-blocking': ['adblock', 'ad blocker', 'semantic blocking', 'promotional DOM'],
  'semantic-record-match': ['entity matching', 'record matching', 'semantic match'],
  'semantic-rule-check': ['semantic lint', 'qualitative lint', 'rule check'],
  'software-issue-triage': ['GitHub issue triage', 'bug triage', 'issue routing'],
  'sponsor-segment-detection': ['sponsor skip', 'sponsor detection', 'video sponsor'],
  'test-relevance-gate': ['test selection', 'test relevance', 'which tests to run'],
  'untrusted-input-risk': ['prompt injection risk', 'untrusted text', 'input isolation'],
  'work-priority': ['task priority', 'work routing', 'run now or defer'],
}

function clean(text) {
  return text
    .replaceAll('`', '')
    .replaceAll('*', '')
    .replace(/\[(.*?)\]\([^)]*\)/gu, '$1')
    .replace(/\s+/gu, ' ')
    .trim()
}

function decisionFromReadme(readme) {
  const match = readme.match(/^\*\*Decision:\*\*\s*(.+)$/mu)
  if (!match) throw new Error('Missing **Decision:** line')
  return clean(match[1])
}

function branchesOf(policy) {
  if (policy.type === 'choice') return [...new Set(Object.values(policy.branches))]
  if (policy.type === 'binary') return [...new Set([policy.trueBranch, policy.falseBranch, policy.uncertainBranch].filter(Boolean))]
  if (policy.type === 'score') return [...new Set([...policy.thresholds.map((item) => item.branch), policy.belowBranch, policy.uncertainBranch].filter(Boolean))]
  return []
}

function descriptionFor(definition, decision, id) {
  const trigger = aliases[id]?.length ? ' Triggers include: ' + aliases[id].join(', ') + '.' : ''
  return clean('Implement and verify the Brida Reflex ' + definition.name + ' use case: ' + decision + ' Use when the user names ' + id + ', asks for this exact bounded decision, or wants to integrate/test the matching Reflex without a discovery interview.' + trigger)
}

function scenarioSkill(definition, decision, id) {
  return [
    '---',
    'name: brida-reflex-' + id,
    'description: ' + JSON.stringify(descriptionFor(definition, decision, id)),
    '---',
    '',
    '# ' + definition.name,
    '',
    'Implement this known Reflex directly. Do not restart broad discovery unless the user\'s requested semantics materially differ from the bundled contract.',
    '',
    '## Load only what you need',
    '',
    '- Read [references/playbook.md](references/playbook.md) for the workflow, state and authority boundary.',
    '- Read [references/custom-reflex.json](references/custom-reflex.json) for the exact versioned public contract and synthetic fixtures.',
    '- For current hosted/API/SDK availability, read Brida\'s live `/reflex/llms.txt`, `/reflex/agent.md`, and `/reflex/agent.json` before making availability claims.',
    '',
    '## Execute autonomously',
    '',
    '1. Inspect the current project/environment and locate the event/state that feeds this decision.',
    '2. Keep exact parsing, policy, authorization, freshness, stable-ID matching, permissions and side effects in deterministic host code.',
    '3. Reuse an equivalent active Reflex when its semantics/version match; otherwise use current Custom Reflex authoring only if the live product exposes it.',
    '4. Choose the smallest available integration surface: MCP, released SDK, or REST.',
    '5. Normalize only the bounded state required by the bundled contract.',
    '6. Accept only declared branches. Unknown/error/stale results go to the safe review/fallback behavior from the playbook.',
    '7. Revalidate current state and authorization before any downstream effect.',
    '8. Execute every bundled synthetic fixture through the actual Reflex execution surface before claiming the integration works.',
    '9. Add separately authored holdout cases before relying on it in production.',
    '',
    'Ask a question only when a missing fact actually blocks implementation. Do not interview the user about information already present in the project, conversation, connected tools, or bundled contract.',
    '',
    '## Authority',
    '',
    'A Reflex result is semantic evidence plus a recommendation. It never grants permission for payments, deploys, external messages, browser actions, purchases, merges, account changes, destructive mutations, or other protected actions.',
    '',
    'During Developer Preview, keep state `non_sensitive` unless the live route explicitly admits a broader class. Never place reusable credentials in Reflex state or client bundles.',
    '',
  ].join('\n')
}

function playbook(definition, readme, id) {
  const policy = definition.declarative_policy
  const branches = branchesOf(policy)
  const question = definition.questions[policy.questionId]
  const aliasLines = aliases[id]?.length ? aliases[id].map((item) => '- ' + item) : ['- none']
  return [
    '# ' + definition.name + ' playbook',
    '',
    'Canonical use-case ID: `' + id + '`',
    'Version: `' + definition.version + '`',
    'Question type: `' + policy.type + '`',
    'Data class: `' + definition.data_class + '`',
    '',
    '## Natural-language aliases',
    '',
    ...aliasLines,
    '',
    '## Decision',
    '',
    decisionFromReadme(readme),
    '',
    '## Primary semantic question',
    '',
    clean(question.instructions),
    '',
    '## Declared branches',
    '',
    ...branches.map((branch) => '- `' + branch + '`'),
    '',
    '## Canonical public guidance',
    '',
    readme.trim(),
    '',
    '## Verification',
    '',
    'The bundled `custom-reflex.json` is the exact public contract for this skill. Run all of its synthetic fixtures through the actual integration surface before claiming success. Keep harder evaluation/holdout examples separate from the public fixtures.',
    '',
    'Do not tune engine thresholds on the same holdout later reported as unseen evaluation.',
    '',
  ].join('\n')
}

function agentYaml(definition) {
  return [
    'interface:',
    '  display_name: "Reflex: ' + definition.name.replaceAll('"', '') + '"',
    '  short_description: "Implement the ' + definition.id + ' Reflex use case"',
    '',
  ].join('\n')
}

async function desiredFiles() {
  const dirs = (await readdir(examplesRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
  const files = new Map()
  const indexRows = []

  for (const dir of dirs) {
    let definition
    let readme
    try {
      definition = JSON.parse(await readFile(join(examplesRoot, dir, 'custom-reflex.json'), 'utf8'))
      readme = await readFile(join(examplesRoot, dir, 'README.md'), 'utf8')
    } catch {
      continue
    }
    if (definition.id !== dir) throw new Error('Use-case directory/id mismatch: ' + dir + ' != ' + definition.id)
    const decision = decisionFromReadme(readme)
    const skillDir = join(skillsRoot, 'brida-reflex-' + definition.id)
    files.set(join(skillDir, 'SKILL.md'), scenarioSkill(definition, decision, definition.id))
    files.set(join(skillDir, 'agents', 'openai.yaml'), agentYaml(definition))
    files.set(join(skillDir, 'references', 'playbook.md'), playbook(definition, readme, definition.id))
    files.set(join(skillDir, 'references', 'custom-reflex.json'), JSON.stringify(definition, null, 2) + '\n')
    indexRows.push({ id: definition.id, name: definition.name, decision, aliases: aliases[definition.id] ?? [], skill: 'brida-reflex-' + definition.id })
  }

  const index = [
    '# Brida Reflex use-case skill index',
    '',
    'Generated from the canonical public files in `examples/use-cases/`. Do not edit this file by hand.',
    '',
    'For a known use case, load only the matching focused skill/playbook instead of starting discovery.',
    '',
    '| Use case | Focused skill | Decision | Useful aliases |',
    '| --- | --- | --- | --- |',
    ...indexRows.map((row) => '| `' + row.id + '` | `' + row.skill + '` | ' + row.decision.replaceAll('|', '\\|') + ' | ' + ((row.aliases.join(', ') || '—').replaceAll('|', '\\|')) + ' |'),
    '',
  ].join('\n')
  files.set(join(coreReferences, 'use-case-index.md'), index)
  return { files, skillCount: indexRows.length }
}

async function main() {
  const { files, skillCount } = await desiredFiles()
  const prefix = 'brida-reflex-'

  if (!checkOnly) {
    for (const entry of await readdir(skillsRoot, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue
      if (!entry.name.startsWith(prefix) || entry.name === 'brida-reflex') continue
      await rm(join(skillsRoot, entry.name), { recursive: true, force: true })
    }
    for (const [path, content] of files) {
      await mkdir(join(path, '..'), { recursive: true })
      await writeFile(path, content)
    }
    console.log('generated ' + skillCount + ' focused Reflex skills')
    return
  }

  const mismatches = []
  for (const [path, expected] of files) {
    let actual
    try { actual = await readFile(path, 'utf8') } catch { mismatches.push('missing ' + relative(repoRoot, path)); continue }
    if (actual !== expected) mismatches.push('stale ' + relative(repoRoot, path))
  }

  const expectedSkillDirs = new Set([...files.keys()]
    .map((path) => relative(skillsRoot, path).split('/')[0])
    .filter((name) => name.startsWith(prefix) && name !== 'brida-reflex'))
  for (const entry of await readdir(skillsRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    if (!entry.name.startsWith(prefix) || entry.name === 'brida-reflex') continue
    if (!expectedSkillDirs.has(entry.name)) mismatches.push('orphan skill ' + entry.name)
  }
  if (mismatches.length) throw new Error('Focused Reflex skills are out of sync:\n- ' + mismatches.join('\n- ') + '\nRun: node scripts/generate-use-case-skills.mjs')
  console.log('focused Reflex skills: ' + skillCount + ' / synchronized')
}

await main()
