import React, { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

type Props = {
  images: string[]
  autoplay?: boolean
  interval?: number
  showDots?: boolean
}

export function ImageCarousel({
  images,
  autoplay = true,
  interval = 4000,
  showDots = true,
}: Props) {
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!autoplay || reduced || images.length <= 1) return

    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, interval)

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [autoplay, interval, reduced, images.length])

  // Scoped keyboard handling: handle arrow keys when carousel is focused
  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (images.length <= 1) return

    if (e.key === 'ArrowLeft') {
      setIndex((i) => (i - 1 + images.length) % images.length)
    }

    if (e.key === 'ArrowRight') {
      setIndex((i) => (i + 1) % images.length)
    }
  }

  if (images.length === 0) return null

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => containerRef.current?.focus()}
      onMouseLeave={() => containerRef.current?.blur()}
      className="group relative w-full overflow-hidden rounded-2xl border border-border/60 bg-[var(--bg-elevated)] shadow-sm"
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="flex h-64 min-w-full flex-shrink-0 items-center justify-center bg-[var(--bg-elevated)] sm:h-80 md:h-96 lg:h-[32rem]"
          >
            <img
              src={src}
              alt={
                i === 0
                  ? 'Group dinner with a client team after a week of on-site collaboration'
                  : 'Team photo'
              }
              className="h-full w-full object-contain"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {showDots && images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
              className={`h-2 w-8 rounded-full transition-colors duration-150 ${
                i === index ? 'bg-foreground' : 'bg-border/50'
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}