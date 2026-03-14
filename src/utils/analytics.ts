/**
 * Google Analytics 4 helper.
 * Only loads and sends when VITE_GA_ID is set. Use a separate "Dev" property
 * in .env.development to test without polluting production.
 */

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

function hasGtag(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function' && Boolean(GA_ID)
}

/**
 * Load gtag script and config. Call once at app startup (e.g. from main.tsx).
 * In development (import.meta.env.DEV), enables debug_mode so events show in GA4 DebugView.
 */
export function initAnalytics(): void {
  if (!GA_ID) return

  window.dataLayer = window.dataLayer ?? []
  const gtag = (...args: unknown[]) => window.dataLayer.push(args)
  window.gtag = gtag

  gtag('js', new Date())

  const debugMode = import.meta.env.DEV
  gtag('config', GA_ID, { debug_mode: debugMode })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)
}

/**
 * Send a custom event to GA4. No-op if VITE_GA_ID is unset or gtag isn't loaded yet.
 */
export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>): void {
  if (!hasGtag()) return
  window.gtag('event', eventName, params)
}
