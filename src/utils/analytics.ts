/**
 * Google Analytics 4 helper.
 * Uses the GA4 Measurement ID provided by VITE_GA_ID.
 */

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined
let hasWarnedMissingId = false

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

function hasGtag(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

function logAnalyticsDebugState(phase: string): void {
  // Avoid noisy logs during Vitest (MODE is usually "test" while DEV may be true).
  if (!import.meta.env.DEV || import.meta.env.MODE === 'test') return
  const dl = typeof window !== 'undefined' ? window.dataLayer : undefined
  const mode = import.meta.env.MODE
  console.info(
    `[analytics] ${phase} mode=${mode}`,
    typeof window.gtag,
    dl?.length ?? 0
  )
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

  window.dataLayer = window.dataLayer ?? []
  // Must match Google's stub: push(arguments), not push([...args]).
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params -- Google gtag stub uses push(arguments), not rest args
    window.dataLayer.push(arguments)
  }

  window.gtag('js', new Date())

  const debugMode = import.meta.env.DEV
  window.gtag('config', GA_ID, { debug_mode: debugMode })

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
export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>): void {
  if (!hasGtag()) return
  window.gtag('event', eventName, params)
}
