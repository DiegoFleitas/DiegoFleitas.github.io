import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ThemeProvider } from '../context/ThemeContext'
import { Nav } from './Nav'
import { Projects } from './Projects'
import { Footer } from './Footer'
import { Hero } from './Hero'

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

    fireEvent.click(screen.getByRole('link', { name: 'About' }))
    expect(trackEvent).toHaveBeenCalledWith('nav_click', { destination: 'about' })

    const toggleButton = screen.getByRole('button', { name: /switch to/i })
    fireEvent.click(toggleButton)
    expect(trackEvent).toHaveBeenCalledWith(
      'theme_toggle',
      expect.objectContaining({ theme: expect.stringMatching(/light|dark/) })
    )
  })

  it('marks current section link as active based on hash', () => {
    globalThis.history.pushState({}, '', '#projects')

    render(
      <ThemeProvider>
        <Nav />
      </ThemeProvider>
    )

    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current')
  })

  it('tracks project demo and repository clicks', () => {
    render(<Projects />)

    // Demo links are optional per project; only assert the wiring when one is rendered.
    const demoLinks = screen.queryAllByRole('link', { name: /demo/i })
    if (demoLinks.length > 0) {
      clickWithoutNavigation(demoLinks[0])
      expect(trackEvent).toHaveBeenCalledWith(
        'project_click',
        expect.objectContaining({ type: 'demo', project_title: expect.any(String) })
      )
    }

    clickWithoutNavigation(screen.getAllByText('Repository')[0])
    expect(trackEvent).toHaveBeenCalledWith(
      'project_click',
      expect.objectContaining({ type: 'repo', project_title: expect.any(String) })
    )
  })

  it('tracks contact link clicks', () => {
    render(<Footer />)

    clickWithoutNavigation(screen.getByLabelText(/^Email:/i))
    expect(trackEvent).toHaveBeenCalledWith('contact_click', { type: 'email' })

    clickWithoutNavigation(screen.getByLabelText(/^GitHub:/i))
    expect(trackEvent).toHaveBeenCalledWith('contact_click', { type: 'github' })

    clickWithoutNavigation(screen.getByLabelText(/^LinkedIn:/i))
    expect(trackEvent).toHaveBeenCalledWith('contact_click', { type: 'linkedin' })
  })

  it('tracks resume PDF download link click', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(new Blob(['%PDF-1.4'], { type: 'application/pdf' }))
    )
    const anchorClickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined)

    render(<Hero />)

    fireEvent.click(screen.getByRole('link', { name: /download resume/i }))

    expect(trackEvent).toHaveBeenCalledWith(
      'file_download',
      expect.objectContaining({
        file_name: 'Diego-Fleitas-Resume.pdf',
        link_url: '/Diego-Fleitas-Resume.pdf',
        file_extension: 'pdf',
      })
    )

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith('/Diego-Fleitas-Resume.pdf')
    })

    fetchSpy.mockRestore()
    anchorClickSpy.mockRestore()
  })
})
