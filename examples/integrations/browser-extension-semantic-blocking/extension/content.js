(() => {
  const MAX_CANDIDATES = 20
  const MAX_TEXT = 700
  const HARD_HIDE_SELECTORS = [
    'ins.adsbygoogle',
    '[data-ad-slot]',
    '[data-ad-unit]',
    '[aria-label="Advertisement"]',
    '[aria-label="Sponsored"]',
  ]
  const SEMANTIC_SELECTORS = [
    'aside',
    '[role="complementary"]',
    'main section',
    'article section',
  ]
  const CTA = /\b(buy|shop|save|sale|deal|offer|trial|subscribe|upgrade|sponsor|partner)\b/i
  const visited = new WeakSet()
  let scheduled = false

  function hide(element) {
    element.style.setProperty('display', 'none', 'important')
    element.dataset.reflexSemanticContentHidden = 'true'
  }

  function hardFilter() {
    for (const selector of HARD_HIDE_SELECTORS) {
      for (const element of document.querySelectorAll(selector)) {
        if (element instanceof HTMLElement) hide(element)
      }
    }
  }

  function normalizedText(element) {
    return (element.innerText || element.textContent || '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, MAX_TEXT)
  }

  function fingerprint(element) {
    return normalizedText(element)
  }

  function isSemanticCandidate(element) {
    if (!(element instanceof HTMLElement) || visited.has(element)) return false
    if (element.dataset.reflexSemanticContentHidden === 'true') return false

    const text = normalizedText(element)
    if (text.length < 24) return false

    const links = [...element.querySelectorAll('a[href]')]
    const hasExternalLink = links.some((link) => {
      try {
        return new URL(link.href, location.href).hostname !== location.hostname
      } catch {
        return false
      }
    })

    return hasExternalLink || CTA.test(text)
  }

  function snapshot(element) {
    const text = normalizedText(element)
    const link = element.querySelector('a[href]')
    let destinationClass = 'no_link'
    if (link) {
      try {
        destinationClass = new URL(link.href, location.href).hostname === location.hostname
          ? 'same_site'
          : 'external'
      } catch {
        destinationClass = 'unknown_link'
      }
    }

    return {
      visibleText: text,
      elementRole: element.getAttribute('role') || element.tagName.toLowerCase(),
      nearbyLabel: (element.getAttribute('aria-label') || '').slice(0, 160),
      destinationClass,
      pageContext: element.closest('article') ? 'article_context' : 'general_page_context',
      deterministicSignals: {
        knownAdNetwork: false,
        exactAdSelector: false,
        userBlockedDomain: false,
      },
    }
  }

  async function classifyAndApply(element) {
    visited.add(element)
    const before = fingerprint(element)
    if (!before) return

    const state = snapshot(element)
    let response
    try {
      response = await chrome.runtime.sendMessage({
        type: 'reflex_semantic_content_candidate',
        state,
      })
    } catch {
      return
    }

    if (response?.branch !== 'hide_candidate') return
    if (!element.isConnected) return
    if (fingerprint(element) !== before) return
    hide(element)
  }

  async function scan() {
    scheduled = false
    hardFilter()

    const candidates = []
    for (const selector of SEMANTIC_SELECTORS) {
      for (const element of document.querySelectorAll(selector)) {
        if (candidates.length >= MAX_CANDIDATES) break
        if (isSemanticCandidate(element)) candidates.push(element)
      }
      if (candidates.length >= MAX_CANDIDATES) break
    }

    for (const element of candidates) {
      await classifyAndApply(element)
    }
  }

  function scheduleScan() {
    if (scheduled) return
    scheduled = true
    setTimeout(scan, 400)
  }

  scheduleScan()
  new MutationObserver(scheduleScan).observe(document.documentElement, {
    childList: true,
    subtree: true,
  })
})()
