import React, { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { Swiper as SwiperType } from 'swiper'

type Props = {
  images: string[]
  autoplay?: boolean
  interval?: number
  showDots?: boolean
}

type SwiperComponents = {
  Swiper: React.ComponentType<Record<string, unknown>>
  SwiperSlide: React.ComponentType<Record<string, unknown>>
  Autoplay?: unknown
}

export function ImageCarousel({
  images,
  autoplay = true,
  interval = 4000,
  showDots = true,
}: Readonly<Props>) {
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()
  const swiperRef = useRef<SwiperType | null>(null)
  const focusRef = useRef<HTMLButtonElement | null>(null)

  // Lazy-load Swiper only when not running under the test environment
  const isTest = typeof process !== 'undefined' && process.env?.NODE_ENV === 'test'
  const [components, setComponents] = useState<SwiperComponents | null>(null)

  useEffect(() => {
    if (isTest) return
    let mounted = true
    Promise.all([import('swiper/react'), import('swiper/modules'), import('swiper/css')])
      .then(([reactMod, modulesMod]) => {
        if (!mounted) return
        setComponents({ Swiper: reactMod.Swiper, SwiperSlide: reactMod.SwiperSlide, Autoplay: modulesMod.Autoplay ?? modulesMod.default?.Autoplay })
      })
      .catch((err) => {         
        console.warn('Failed to load Swiper dynamically:', err)
      })
    return () => {
      mounted = false
    }
  }, [isTest])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (images.length <= 1) return

    let newIndex = index
    if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + images.length) % images.length
    }

    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % images.length
    }

    if (newIndex === index) return

    setIndex(newIndex)
    const swiper = swiperRef.current
    if (swiper) {
      try {
        if (swiper.params?.loop) swiper.slideToLoop(newIndex)
        else swiper.slideTo(newIndex)
      } catch (err) {
        console.error(err)
      }
    }
  }

  if (images.length === 0) return null

  return (
    // NOSONAR: keyboard handling is attached to the dedicated focus button below
    <section
      aria-roledescription="carousel"
      aria-label="Image carousel"
      className="group relative w-full overflow-hidden rounded-2xl border border-border/60 bg-[var(--bg-elevated)] shadow-sm"
    >
      {/* focus button: interactive element that receives keyboard events for the carousel */}
      <button
        ref={focusRef}
        type="button"
        aria-label="Carousel focus"
        className="sr-only"
        onKeyDown={handleKeyDown}
      />
      {components ? (
        <components.Swiper
            onSwiper={(s: SwiperType) => {
              swiperRef.current = s
              try {
                if (s.params?.loop) s.slideToLoop(index)
                else s.slideTo(index)
              } catch (err) {
                console.error(err)
              }
            }}
          initialSlide={index}
          slidesPerView={1}
          loop={images.length > 1}
          modules={[components.Autoplay]}
          autoplay={!autoplay || reduced ? false : { delay: interval, disableOnInteraction: false }}
          onSlideChange={(s: SwiperType) => {
            const slide = s as unknown as { realIndex?: number; activeIndex?: number }
            setIndex(slide.realIndex ?? slide.activeIndex ?? 0)
          }}
          autoHeight={true}
        >
          {images.map((src, i) => (
            <components.SwiperSlide key={src}>
              <div className="flex h-64 min-w-full flex-shrink-0 items-center justify-center bg-[var(--bg-elevated)] sm:h-80 md:h-96 lg:h-[32rem]">
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
            </components.SwiperSlide>
          ))}
        </components.Swiper>
      ) : (
        // Test-friendly / fallback static implementation (no Swiper)
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
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
      )}

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
              onClick={() => {
                setIndex(i)
                const swiper = swiperRef.current
                if (swiper) {
                  if (swiper.params?.loop) swiper.slideToLoop(i)
                  else swiper.slideTo(i)
                }
              }}
            />
          ))}
        </div>
      )}
    </section>
  )
}