const TAG_PATTERN = /^v(\d+)\.(\d+)\.(\d+)$/u
const IMPACTS = new Set(['patch', 'minor', 'major'])

export function parseVersionTag(tag) {
  const match = TAG_PATTERN.exec(String(tag).trim())
  if (match === null) return null
  return { major: Number(match[1]), minor: Number(match[2]), patch: Number(match[3]) }
}

export function highestVersion(tags = []) {
  const versions = tags.map(parseVersionTag).filter((version) => version !== null)
  if (versions.length === 0) return { major: 0, minor: 0, patch: 0 }
  return versions.sort((left, right) => {
    if (left.major !== right.major) return left.major - right.major
    if (left.minor !== right.minor) return left.minor - right.minor
    return left.patch - right.patch
  }).at(-1)
}

export function nextRelease(tags, impact) {
  if (!IMPACTS.has(impact)) throw new Error('release impact must be patch, minor, or major')
  const current = highestVersion(tags)
  const next = impact === 'patch'
    ? { ...current, patch: current.patch + 1 }
    : impact === 'minor'
      ? { major: current.major, minor: current.minor + 1, patch: 0 }
      : { major: current.major + 1, minor: 0, patch: 0 }
  const version = `${next.major}.${next.minor}.${next.patch}`
  return {
    previousVersion: `${current.major}.${current.minor}.${current.patch}`,
    version,
    tag: `v${version}`,
    impact,
  }
}
