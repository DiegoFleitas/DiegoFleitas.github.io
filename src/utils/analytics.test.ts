import { beforeEach, describe, expect, it, vi } from 'vitest'

async function loadAnalyticsModule() {
  vi.resetModules()
  return import('./analytics')
}

describe('analytics', () => {
  beforeEach(() => {
    vi.unstubAllEnvs()
    document.head.innerHTML = ''
    const testWindow = window as unknown as {
      gtag?: (...args: unknown[]) => void
      dataLayer?: unknown[]
    }
    delete testWindow.gtag
    delete testWindow.dataLayer
  })

  it('warns and stays disabled when VITE_GA_ID is missing', async () => {
    vi.stubEnv('VITE_GA_ID', '')
    const { initAnalytics, trackEvent } = await loadAnalyticsModule()
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

    initAnalytics()
    trackEvent('nav_click', { destination: 'about' })
    expect(warnSpy).toHaveBeenCalledWith('[analytics] VITE_GA_ID is missing; analytics is disabled.')
    expect(document.querySelector('script[src*="googletagmanager.com/gtag/js"]')).toBeNull()
    expect((window as Window & { dataLayer?: unknown[] }).dataLayer).toBeUndefined()
  })

  it('initializes gtag and sends events', async () => {
    vi.stubEnv('VITE_GA_ID', 'G-TEST123')
    const { initAnalytics, trackEvent } = await loadAnalyticsModule()

    initAnalytics()
    trackEvent('nav_click', { destination: 'about' })

    const script = document.querySelector(
      'script[src="https://www.googletagmanager.com/gtag/js?id=G-TEST123"]'
    )
    expect(script).toBeInTheDocument()

    const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer
    expect(dataLayer).toBeDefined()
    expect(Array.from(dataLayer?.[0] as ArrayLike<unknown>)[0]).toBe('js')
    expect(Array.from(dataLayer?.[1] as ArrayLike<unknown>)).toEqual([
      'config',
      'G-TEST123',
      { debug_mode: expect.any(Boolean) },
    ])
    expect(Array.from(dataLayer?.[2] as ArrayLike<unknown>)).toEqual([
      'event',
      'nav_click',
      { destination: 'about' },
    ])
  })

  /**
   * Regression: gtag must queue commands with `dataLayer.push(arguments)` (Google's stub).
   * Using `(...args) => dataLayer.push(args)` pushes a real Array; gtag.js then loads but may
   * never send /g/collect requests — dataLayer looks fine in DevTools but Network stays empty.
   */
  it('queues gtag commands as Arguments objects, not Arrays', async () => {
    vi.stubEnv('VITE_GA_ID', 'G-TEST123')
    const { initAnalytics, trackEvent } = await loadAnalyticsModule()

    initAnalytics()
    trackEvent('nav_click', { destination: 'about' })

    const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer
    expect(dataLayer).toBeDefined()
    for (const entry of dataLayer ?? []) {
      expect(Array.isArray(entry), 'dataLayer entries must not be Arrays (use push(arguments))').toBe(
        false
      )
      expect(Object.prototype.toString.call(entry)).toBe('[object Arguments]')
    }
  })
})
