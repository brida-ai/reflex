const COMPANION_URL = 'http://127.0.0.1:8787/classify'

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type !== 'reflex_semantic_content_candidate') return false
  if (!sender.tab?.id) {
    sendResponse({ branch: 'review', error: 'missing_tab' })
    return false
  }

  classify(message.state)
    .then((branch) => sendResponse({ branch }))
    .catch(() => sendResponse({ branch: 'review', error: 'companion_unavailable' }))

  return true
})

async function classify(state) {
  const response = await fetch(COMPANION_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ state }),
    signal: AbortSignal.timeout(6500),
  })

  if (!response.ok) return 'review'
  const body = await response.json()
  return ['keep_candidate', 'hide_candidate', 'review'].includes(body?.branch)
    ? body.branch
    : 'review'
}
