import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from '../context/ThemeContext'
import { Nav } from './Nav'
import { Projects } from './Projects'
import { Contact } from './Contact'

vi.mock('../utils/analytics', () => ({
  trackEvent: vi.fn(),
}))

import { trackEvent } from '../utils/analytics'

function clickWithoutNavigation(element: HTMLElement) {
  element.addEventListener('click', (event) => event.preventDefault(), { once: true })
  fireEvent.click(element)
}

describe('analytics event wiring', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('tracks nav link clicks and theme toggle', () => {
    render(
      <ThemeProvider>
        <Nav />
      </ThemeProvider>
    )

    fireEvent.click(screen.getByRole('link', { name: 'About me' }))
    expect(trackEvent).toHaveBeenCalledWith('nav_click', { destination: 'about' })

    const toggleButton = screen.getByRole('button', { name: /switch to/i })
    fireEvent.click(toggleButton)
    expect(trackEvent).toHaveBeenCalledWith(
      'theme_toggle',
      expect.objectContaining({ theme: expect.stringMatching(/light|dark/) })
    )
  })

  it('tracks project demo and repository clicks', () => {
    render(<Projects />)

    clickWithoutNavigation(screen.getAllByText('Demo')[0])
    expect(trackEvent).toHaveBeenCalledWith(
      'project_click',
      expect.objectContaining({ type: 'demo', project_title: expect.any(String) })
    )

    clickWithoutNavigation(screen.getAllByText('Repository')[0])
    expect(trackEvent).toHaveBeenCalledWith(
      'project_click',
      expect.objectContaining({ type: 'repo', project_title: expect.any(String) })
    )
  })

  it('tracks contact link clicks', () => {
    render(<Contact />)

    clickWithoutNavigation(screen.getByLabelText(/^Email:/i))
    expect(trackEvent).toHaveBeenCalledWith('contact_click', { type: 'email' })

    clickWithoutNavigation(screen.getByLabelText(/^GitHub:/i))
    expect(trackEvent).toHaveBeenCalledWith('contact_click', { type: 'github' })

    clickWithoutNavigation(screen.getByLabelText(/^LinkedIn:/i))
    expect(trackEvent).toHaveBeenCalledWith('contact_click', { type: 'linkedin' })
  })
})
