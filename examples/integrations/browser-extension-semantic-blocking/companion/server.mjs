import http from 'node:http'
import { pathToFileURL } from 'node:url'

const DEFAULT_API_BASE_URL = 'https://api.brida.ai'
const DEFAULT_PORT = 8787
const REFLEX_ID = 'semantic-content-blocking'
const MAX_BODY_BYTES = 16_384
const ALLOWED_BRANCHES = new Set(['keep_candidate', 'hide_candidate', 'review'])

export function validateExtensionOrigin(origin) {
  if (typeof origin !== 'string' || !/^chrome-extension:\/\/[a-p]{32}$/u.test(origin)) {
    throw new TypeError('BRIDA_EXTENSION_ORIGIN must be one exact Chrome extension origin')
  }
  return origin
}

export function isAllowedExtensionOrigin(origin, allowedOrigin) {
  return typeof origin === 'string' && origin === allowedOrigin
}

export function validateCandidateState(state) {
  if (state === null || typeof state !== 'object' || Array.isArray(state)) {
    throw new TypeError('state must be an object')
  }

  const allowedKeys = new Set([
    'visibleText',
    'elementRole',
    'nearbyLabel',
    'destinationClass',
    'pageContext',
    'deterministicSignals',
  ])
  for (const key of Object.keys(state)) {
    if (!allowedKeys.has(key)) throw new TypeError('unexpected state field: ' + key)
  }

  const encoded = Buffer.from(JSON.stringify(state))
  if (encoded.byteLength === 0 || encoded.byteLength > 12_288) {
    throw new TypeError('state is outside the Custom Reflex byte bound')
  }

  const boundedStrings = {
    visibleText: 700,
    elementRole: 80,
    nearbyLabel: 160,
    destinationClass: 80,
    pageContext: 120,
  }
  for (const [key, maxLength] of Object.entries(boundedStrings)) {
    const value = state[key]
    if (value !== undefined && (typeof value !== 'string' || value.length > maxLength)) {
      throw new TypeError(key + ' is invalid')
    }
  }
  if (typeof state.visibleText !== 'string' || state.visibleText.length === 0) {
    throw new TypeError('visibleText is invalid')
  }

  const signals = state.deterministicSignals
  if (signals !== undefined) {
    if (signals === null || typeof signals !== 'object' || Array.isArray(signals)) {
      throw new TypeError('deterministicSignals must be an object')
    }
    const allowedSignals = new Set(['knownAdNetwork', 'exactAdSelector', 'userBlockedDomain'])
    for (const [key, value] of Object.entries(signals)) {
      if (!allowedSignals.has(key) || typeof value !== 'boolean') {
        throw new TypeError('deterministicSignals is invalid')
      }
    }
  }

  return state
}

export function normalizeBranch(body) {
  const branch = body?.decision?.branch
  return ALLOWED_BRANCHES.has(branch) ? branch : 'review'
}

export function buildUpstreamRequest({ apiBaseUrl, apiKey, state, idempotencyKey }) {
  const base = new URL(apiBaseUrl || DEFAULT_API_BASE_URL)
  if (base.protocol === 'http:' && !['127.0.0.1', 'localhost'].includes(base.hostname)) {
    throw new TypeError('HTTP API base URL is allowed only for loopback development')
  }
  if (!['http:', 'https:'].includes(base.protocol)) throw new TypeError('unsupported API protocol')

  const url = new URL('/v1/reflexes/' + encodeURIComponent(REFLEX_ID) + '/runs', base)
  return {
    url,
    init: {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'idempotency-key': idempotencyKey,
      },
      body: JSON.stringify({ state }),
      signal: AbortSignal.timeout(6000),
    },
  }
}

async function readJsonBody(request) {
  const chunks = []
  let size = 0
  for await (const chunk of request) {
    size += chunk.length
    if (size > MAX_BODY_BYTES) throw new TypeError('request body too large')
    chunks.push(chunk)
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

function writeJson(response, status, body, origin) {
  response.writeHead(status, {
    'content-type': 'application/json',
    'cache-control': 'no-store',
    ...(origin === undefined ? {} : { 'access-control-allow-origin': origin, vary: 'Origin' }),
  })
  response.end(JSON.stringify(body))
}

export function createServer({
  apiKey,
  apiBaseUrl = DEFAULT_API_BASE_URL,
  fetchImpl = globalThis.fetch,
  extensionOrigin,
} = {}) {
  if (typeof apiKey !== 'string' || apiKey.trim() === '') throw new TypeError('BRIDA_API_KEY is required')
  const allowedExtensionOrigin = validateExtensionOrigin(extensionOrigin)

  return http.createServer(async (request, response) => {
    const origin = request.headers.origin
    if (!isAllowedExtensionOrigin(origin, allowedExtensionOrigin)) {
      writeJson(response, 403, { error: 'extension_origin_required' })
      return
    }

    if (request.method === 'OPTIONS') {
      response.writeHead(204, {
        'access-control-allow-origin': origin,
        'access-control-allow-methods': 'POST, OPTIONS',
        'access-control-allow-headers': 'content-type',
        vary: 'Origin',
      })
      response.end()
      return
    }

    if (request.method !== 'POST' || request.url !== '/classify') {
      writeJson(response, 404, { error: 'not_found' }, origin)
      return
    }

    try {
      const payload = await readJsonBody(request)
      const state = validateCandidateState(payload?.state)
      const upstream = buildUpstreamRequest({
        apiBaseUrl,
        apiKey,
        state,
        idempotencyKey: 'brida_' + crypto.randomUUID(),
      })
      const upstreamResponse = await fetchImpl(upstream.url, upstream.init)
      if (!upstreamResponse.ok) {
        writeJson(response, upstreamResponse.status === 429 ? 503 : 502, { error: 'reflex_unavailable' }, origin)
        return
      }
      const body = await upstreamResponse.json()
      writeJson(response, 200, { branch: normalizeBranch(body) }, origin)
    } catch {
      writeJson(response, 400, { error: 'invalid_candidate' }, origin)
    }
  })
}

export function startFromEnvironment() {
  const server = createServer({
    apiKey: process.env.BRIDA_API_KEY,
    apiBaseUrl: process.env.BRIDA_API_BASE_URL || DEFAULT_API_BASE_URL,
    extensionOrigin: process.env.BRIDA_EXTENSION_ORIGIN,
  })
  const port = Number(process.env.PORT || DEFAULT_PORT)
  server.listen(port, '127.0.0.1', () => {
    process.stdout.write('Reflex semantic content companion listening on 127.0.0.1:' + port + '\n')
  })
  return server
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  startFromEnvironment()
}
