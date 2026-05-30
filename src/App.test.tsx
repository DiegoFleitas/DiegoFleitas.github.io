import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import { ThemeProvider } from './context/ThemeContext'

vi.mock('./utils/analytics', () => ({
  trackEvent: vi.fn(),
}))

import App from './App'
import { trackEvent } from './utils/analytics'

function AppWithProviders() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the app shell', () => {
    render(<AppWithProviders />)
    expect(document.querySelector('.min-h-screen')).toBeInTheDocument()
  })

  it('tracks section visibility events', () => {
    render(<AppWithProviders />)

    const calls = vi.mocked(trackEvent).mock.calls
      .filter(([eventName]) => eventName === 'view_section')
      .map(([, payload]) => payload)

    expect(calls).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ section_name: 'hero' }),
        expect.objectContaining({ section_name: 'about' }),
        expect.objectContaining({ section_name: 'experience' }),
        expect.objectContaining({ section_name: 'education' }),
        expect.objectContaining({ section_name: 'projects' }),
      ])
    )
  })
})
