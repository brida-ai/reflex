import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const PR_FILES_FILE = '.pr-files.json'
const ADD_ONLY = [
  /^recipes\/[a-z][a-z0-9]*(?:-[a-z0-9]+)*\/[1-9][0-9]{0,8}\.ya?ml$/u,
  /^fixtures\/[a-z][a-z0-9]*(?:-[a-z0-9]+)*\/[1-9][0-9]{0,8}\.json$/u,
]
const EXAMPLE = /^examples\/[A-Za-z0-9][A-Za-z0-9._/-]*\.(?:md|ya?ml)$/u

export function checkExternalPullRequestFiles(files) {
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

async function runExternalPolicyCheck() {
  const files = JSON.parse(await readFile(PR_FILES_FILE, 'utf8'))
  const result = checkExternalPullRequestFiles(files)
  console.log(`public PR path policy: ${result.checked} files / external / ok`)
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await runExternalPolicyCheck()
}
