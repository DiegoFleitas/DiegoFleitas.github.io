import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ImageCarousel } from './ImageCarousel'

describe('ImageCarousel', () => {
  const slides = [
    { src: '/img-a.jpg', alt: 'First slide' },
    { src: '/img-b.jpg', alt: 'Second slide' },
  ]

  it('renders dot navigation and navigates when dot clicked', async () => {
    render(<ImageCarousel slides={slides} autoplay={false} showDots />)

    expect(screen.getAllByRole('img')).toHaveLength(2)
    expect(screen.getByRole('img', { name: 'First slide' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Second slide' })).toBeInTheDocument()

    const dot1 = screen.getByLabelText('Go to slide 1')
    const dot2 = screen.getByLabelText('Go to slide 2')

    expect(dot1).toBeInTheDocument()
    expect(dot2).toBeInTheDocument()

    expect(dot1).toHaveAttribute('aria-current', 'true')
    expect(dot2).not.toHaveAttribute('aria-current')

    fireEvent.click(dot2)

    expect(dot2).toHaveAttribute('aria-current', 'true')
    expect(dot1).not.toHaveAttribute('aria-current')
  })

  it('responds to arrow keys when carousel region is focused', () => {
    render(<ImageCarousel slides={slides} autoplay={false} showDots />)

    const region = screen.getByRole('region', { name: /image carousel/i })
    expect(region).toBeTruthy()

    region.focus()
    fireEvent.keyDown(region, { key: 'ArrowRight' })

    const dot2 = screen.getByLabelText('Go to slide 2')
    expect(dot2).toHaveAttribute('aria-current', 'true')
  })
})
