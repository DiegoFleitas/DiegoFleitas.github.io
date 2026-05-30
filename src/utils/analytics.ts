/**
 * Google Analytics 4 helper.
 * Uses the GA4 Measurement ID provided by VITE_GA_ID.
 *
 * For breakdowns on shared params (e.g. referrer_host, utm_*, file_download fields), register
 * event-scoped custom dimensions in GA4 Admin → Custom definitions.
 * Do not add PII (names, emails, raw referrer); referrer is hostname-only by design.
 */

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined
let hasWarnedMissingId = false

const ATTRIBUTION_STORAGE_KEY = 'portfolio_attribution_v1'

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

type SharedParamValue = string | number | boolean

function appendReferrerHost(out: Record<string, SharedParamValue>): void {
  try {
    if (typeof document !== 'undefined' && document.referrer) {
      out.referrer_host = new URL(document.referrer).hostname
      return
    }
  } catch {
    // invalid referrer URL
  }
  out.referrer_host = ''
}

function mergeSessionAttribution(out: Record<string, SharedParamValue>): void {
  try {
    if (globalThis.sessionStorage === undefined) return
    const raw = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY)
    if (!raw) return
    const parsed = JSON.parse(raw) as Record<string, unknown>
    for (const [k, v] of Object.entries(parsed)) {
      if (typeof v === 'string') out[k] = v
    }
  } catch {
    // ignore invalid JSON or blocked storage
  }
}

/** First landing URL in the tab wins; persists for the session. Call from initAnalytics only. */
export function captureAttributionOnce(): void {
  if (globalThis.window === undefined || globalThis.sessionStorage === undefined) return
  try {
    if (sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY)) return
    const params = new URLSearchParams(globalThis.window.location.search)
    const attribution: Record<string, string> = {}
    for (const key of UTM_KEYS) {
      const v = params.get(key)
      if (v) attribution[key] = v
    }
    if (Object.keys(attribution).length === 0) return
    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution))
  } catch {
    // sessionStorage may be unavailable (e.g. private mode)
  }
}

/** Non-PII context merged into every tracked event; caller `params` override on key collision. */
export function getSharedEventParams(): Record<string, SharedParamValue> {
  const out: Record<string, SharedParamValue> = {
    page_language: globalThis.navigator === undefined ? '' : globalThis.navigator.language,
  }
  appendReferrerHost(out)
  mergeSessionAttribution(out)
  return out
}

/**
 * One gtag call queued as in Google's snippet: `function gtag(){ dataLayer.push(arguments); }`.
 * This is an `Arguments` object — not a normal `Array`. gtag.js relies on that for `/g/collect`.
 */
export type GtagQueuedCommand = IArguments

/** Object-shaped messages some tag setups push (e.g. GTM-style `{ event: ... }`). */
export type DataLayerObjectMessage = Record<string, unknown>

export type DataLayerEntry = GtagQueuedCommand | DataLayerObjectMessage

/** Public `gtag` surface (callers always invoke with discrete args). */
export type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer: DataLayerEntry[]
    gtag: Gtag
  }
}

/** Narrow `globalThis` to `Window` for gtag/dataLayer (see global augmentation above). */
function domWindow(): Window {
  return globalThis as unknown as Window
}

function hasGtag(): boolean {
  return globalThis.window !== undefined && typeof domWindow().gtag === 'function'
}

function logAnalyticsDebugState(phase: string): void {
  // Avoid noisy logs during Vitest (MODE is usually "test" while DEV may be true).
  if (import.meta.env.DEV && import.meta.env.MODE !== 'test') {
    const dl = globalThis.window === undefined ? undefined : domWindow().dataLayer
    const mode = import.meta.env.MODE
    console.info(
      `[analytics] ${phase} mode=${mode}`,
      typeof domWindow().gtag,
      dl?.length ?? 0
    )
  }
}

/**
 * Load gtag script and config. Call once at app startup (e.g. from main.tsx).
 * In development (import.meta.env.DEV), enables debug_mode so events show in GA4 DebugView.
 */
export function initAnalytics(): void {
  if (!GA_ID) {
    if (import.meta.env.DEV && !hasWarnedMissingId) {
      hasWarnedMissingId = true
      console.warn('[analytics] VITE_GA_ID is missing; analytics is disabled.')
    }
    return
  }

  const win = domWindow()
  win.dataLayer = win.dataLayer ?? []
  // Must match Google's stub: push(arguments), not push([...args]).
  win.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params -- Google gtag stub uses push(arguments), not rest args
    win.dataLayer.push(arguments)
  }

  captureAttributionOnce()

  win.gtag('js', new Date())

  const debugMode = import.meta.env.DEV
  win.gtag('config', GA_ID, { debug_mode: debugMode })

  logAnalyticsDebugState('after init (queue + config; gtag.js may still be loading)')

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  script.onload = () => {
    logAnalyticsDebugState('after gtag.js loaded')
  }
  script.onerror = () => {
    if (import.meta.env.DEV && import.meta.env.MODE !== 'test') {
      console.warn('[analytics] Failed to load gtag.js (blocked network, CSP, or ad blocker?)')
    }
  }
  document.head.appendChild(script)
}

/**
 * Send a custom event to GA4. No-op if gtag isn't loaded yet.
 */
export function trackEvent(eventName: string, params?: Record<string, SharedParamValue>): void {
  if (!hasGtag()) return
  const merged = { ...getSharedEventParams(), ...params }
  domWindow().gtag('event', eventName, merged)
}
