import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const ADD_ONLY = [
  /^recipes\/[a-z][a-z0-9]*(?:-[a-z0-9]+)*\/[1-9][0-9]{0,8}\.ya?ml$/u,
  /^fixtures\/[a-z][a-z0-9]*(?:-[a-z0-9]+)*\/[1-9][0-9]{0,8}\.json$/u,
]
const EXAMPLE = /^examples\/[A-Za-z0-9][A-Za-z0-9._/-]*\.(?:md|ya?ml)$/u

export function checkPullRequestFiles(files, { external }) {
  if (!external) return Object.freeze({ checked: files.length, external: false })

  for (const file of files) {
    if (ADD_ONLY.some((pattern) => pattern.test(file.filename))) {
      if (file.status !== 'added') {
        throw new Error(`external PR may only add immutable recipe/fixture versions: ${file.filename} (${file.status})`)
      }
      continue
    }
    if (EXAMPLE.test(file.filename)) {
      if (file.status !== 'added' && file.status !== 'modified') {
        throw new Error(`external PR may not remove/rename examples: ${file.filename} (${file.status})`)
      }
      continue
    }
    throw new Error(`external PR path is not allowed: ${file.filename}`)
  }

  return Object.freeze({ checked: files.length, external: true })
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const path = process.argv[2]
  if (path === undefined) throw new Error('usage: check-pr-files.mjs <files.json> [--external]')
  const files = JSON.parse(await readFile(path, 'utf8'))
  const result = checkPullRequestFiles(files, { external: process.argv.includes('--external') })
  console.log(`public PR path policy: ${result.checked} files / ${result.external ? 'external' : 'internal'} / ok`)
}
