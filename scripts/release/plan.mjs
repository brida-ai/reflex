#!/usr/bin/env node
import { execFileSync } from 'node:child_process'

import { nextRelease } from './version.mjs'

function git(...args) {
  return execFileSync('git', args, { encoding: 'utf8' }).trim()
}

const impact = process.argv[2] ?? ''
const tags = git('tag', '--list').split('\n').filter(Boolean)
process.stdout.write(`${JSON.stringify(nextRelease(tags, impact))}\n`)
