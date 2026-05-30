import { beforeEach, describe, expect, it, vi } from 'vitest'
import { waitFor } from '@testing-library/react'
import type { MouseEvent as ReactMouseEvent } from 'react'
import { onResumePdfLinkClick, resumePdfShouldUseAnchorNavigation } from './downloadResumePdf'

vi.mock('./analytics', () => ({
  trackEvent: vi.fn(),
}))

function createClick(partial?: Partial<ReactMouseEvent<HTMLAnchorElement>>): ReactMouseEvent<HTMLAnchorElement> {
  return {
    button: 0,
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    preventDefault: vi.fn(),
    ...partial,
  } as unknown as ReactMouseEvent<HTMLAnchorElement>
}

describe('downloadResumePdf / onResumePdfLinkClick', () => {
  beforeEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  it('uses anchor navigation on iPhone UA', () => {
    vi.stubGlobal('navigator', {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
      maxTouchPoints: 5,
    })
    expect(resumePdfShouldUseAnchorNavigation()).toBe(true)
  })

  it('uses anchor navigation for iPadOS desktop-class UA (Macintosh + touch)', () => {
    vi.stubGlobal('navigator', {
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
      maxTouchPoints: 5,
    })
    expect(resumePdfShouldUseAnchorNavigation()).toBe(true)
  })

  it('does not preventDefault on iOS (native PDF flow)', async () => {
    vi.stubGlobal('navigator', {
      userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)',
      maxTouchPoints: 5,
    })
    const { trackEvent } = await import('./analytics')
    const ev = createClick()

    onResumePdfLinkClick(ev)

    expect(trackEvent).toHaveBeenCalled()
    expect(ev.preventDefault).not.toHaveBeenCalled()
  })

  it('uses programmatic save on desktop Mac without touch points', () => {
    vi.stubGlobal('navigator', {
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
      maxTouchPoints: 0,
    })
    expect(resumePdfShouldUseAnchorNavigation()).toBe(false)
  })

  it('allows browser default when opening in new tab (meta+click)', async () => {
    vi.stubGlobal('navigator', {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)',
      maxTouchPoints: 0,
    })
    const ev = createClick({ metaKey: true })

    onResumePdfLinkClick(ev)

    expect(ev.preventDefault).not.toHaveBeenCalled()
  })

  it('programmatic path fetches and clicks a temporary anchor', async () => {
    vi.stubGlobal('navigator', {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0',
      maxTouchPoints: 0,
    })
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(new Blob(['%PDF-1.4'], { type: 'application/pdf' }))
    )
    const anchorClickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined)
    const ev = createClick()

    onResumePdfLinkClick(ev)

    expect(ev.preventDefault).toHaveBeenCalled()
    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith('/Diego-Fleitas-Resume.pdf')
      expect(anchorClickSpy).toHaveBeenCalled()
    })
  })
})
