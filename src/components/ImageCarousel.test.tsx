import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ImageCarousel } from './ImageCarousel'

describe('ImageCarousel', () => {
  const images = ['/img-a.jpg', '/img-b.jpg']

  it('renders dot navigation and navigates when dot clicked', async () => {
    render(<ImageCarousel images={images} autoplay={false} showDots />)

    // both images present in the DOM
    expect(screen.getAllByRole('img')).toHaveLength(2)

    const dot1 = screen.getByLabelText('Go to slide 1')
    const dot2 = screen.getByLabelText('Go to slide 2')

    expect(dot1).toBeInTheDocument()
    expect(dot2).toBeInTheDocument()

    // initial state: first dot current
    expect(dot1).toHaveAttribute('aria-current', 'true')
    expect(dot2).not.toHaveAttribute('aria-current')

    fireEvent.click(dot2)

    // after clicking second dot
    expect(dot2).toHaveAttribute('aria-current', 'true')
    expect(dot1).not.toHaveAttribute('aria-current')
  })

  it('responds to arrow keys when focused', () => {
    const { container } = render(
      <ImageCarousel images={images} autoplay={false} showDots />
    )

    const root = container.querySelector('div[tabindex="0"]') as HTMLElement
    expect(root).toBeTruthy()

    root.focus()
    fireEvent.keyDown(root, { key: 'ArrowRight' })

    const dot2 = screen.getByLabelText('Go to slide 2')
    expect(dot2).toHaveAttribute('aria-current', 'true')
  })
})
