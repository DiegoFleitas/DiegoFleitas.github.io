import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import type { Swiper as SwiperType } from 'swiper'

export type CarouselSlide = {
  src: string
  alt: string
  /**
   * When `imageFit` is `cover`, anchors vertical cropping. Use `top` for wide group shots
   * where faces sit high in the frame so `center` would clip heads.
   */
  coverObjectPosition?: 'center' | 'top' | 'bottom'
  /** Small company logo overlay (e.g. aligned with experience timeline). */
  badgeLogo?: { src: string; alt: string }
}

type Props = {
  slides: readonly CarouselSlide[]
  /** `cover` fills a fixed aspect frame (may crop). `contain` shows the full image (may letterbox). */
  imageFit?: 'contain' | 'cover'
  autoplay?: boolean
  interval?: number
  showDots?: boolean
}

type SwiperComponents = {
  Swiper: React.ComponentType<Record<string, unknown>>
  SwiperSlide: React.ComponentType<Record<string, unknown>>
  Autoplay?: unknown
}

function coverObjectPositionClass(slide: CarouselSlide): string {
  switch (slide.coverObjectPosition) {
    case 'top':
      return 'object-top'
    case 'bottom':
      return 'object-bottom'
    default:
      return 'object-center'
  }
}

function SlideBadgeLogo({
  badge,
  loading,
}: Readonly<{
  badge: NonNullable<CarouselSlide['badgeLogo']>
  loading: 'eager' | 'lazy'
}>) {
  return (
    <div
      className="pointer-events-none absolute right-2 bottom-2 z-10 sm:right-3 sm:bottom-3"
      title={badge.alt}
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-md border border-border/80 bg-[var(--bg-elevated)]/95 p-0.5 shadow-sm backdrop-blur-[2px] sm:h-7 sm:w-7 sm:p-1">
        <img src={badge.src} alt={badge.alt} className="h-full w-full object-contain" loading={loading} />
      </div>
    </div>
  )
}

export function ImageCarousel({
  slides,
  imageFit = 'contain',
  autoplay = true,
  interval = 4000,
  showDots = true,
}: Readonly<Props>) {
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()
  const swiperRef = useRef<SwiperType | null>(null)
  const carouselRef = useRef<HTMLElement | null>(null)
  const indexRef = useRef(index)

  const isTest = typeof process !== 'undefined' && process.env?.NODE_ENV === 'test'
  const [components, setComponents] = useState<SwiperComponents | null>(null)

  useEffect(() => {
    if (isTest) return
    let mounted = true
    Promise.all([import('swiper/react'), import('swiper/modules'), import('swiper/css')])
      .then(([reactMod, modulesMod]) => {
        if (!mounted) return
        const Autoplay = modulesMod.Autoplay
        setComponents({
          Swiper: reactMod.Swiper,
          SwiperSlide: reactMod.SwiperSlide,
          Autoplay,
        })
      })
      .catch((err) => {
        console.warn('Failed to load Swiper dynamically:', err)
      })
    return () => {
      mounted = false
    }
  }, [isTest])

  useEffect(() => {
    indexRef.current = index
  }, [index])

  useEffect(() => {
    const el = carouselRef.current
    if (!el || slides.length <= 1) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return

      const i = indexRef.current
      const delta = e.key === 'ArrowLeft' ? -1 : 1
      const newIndex = (i + delta + slides.length) % slides.length

      e.preventDefault()
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

    el.addEventListener('keydown', onKeyDown)
    return () => {
      el.removeEventListener('keydown', onKeyDown)
    }
  }, [slides.length])

  if (slides.length === 0) return null

  const autoplayModule = components?.Autoplay
  const swiperAutoplayEnabled = Boolean(autoplay && !reduced && autoplayModule)
  const useCover = imageFit === 'cover'

  const slideInner = (slide: CarouselSlide, i: number) => {
    const imgLoading = i === 0 ? 'eager' : 'lazy'
    return useCover ? (
      <div className="relative aspect-[16/10] w-full min-w-full flex-shrink-0 overflow-hidden bg-[var(--bg-elevated)]">
        <img
          src={slide.src}
          alt={slide.alt}
          className={`absolute inset-0 h-full w-full object-cover ${coverObjectPositionClass(slide)}`}
          loading={imgLoading}
        />
        {slide.badgeLogo ? <SlideBadgeLogo badge={slide.badgeLogo} loading={imgLoading} /> : null}
      </div>
    ) : (
      <div className="relative flex h-64 min-w-full flex-shrink-0 items-center justify-center bg-[var(--bg-elevated)] sm:h-80 md:h-96 lg:h-[32rem]">
        <img
          src={slide.src}
          alt={slide.alt}
          className="h-full w-full object-contain"
          loading={imgLoading}
        />
        {slide.badgeLogo ? <SlideBadgeLogo badge={slide.badgeLogo} loading={imgLoading} /> : null}
      </div>
    )
  }

  return (
    <section
      ref={carouselRef}
      aria-roledescription="carousel"
      aria-label="Image carousel"
      tabIndex={0} // NOSONAR - focusable carousel landmark; key handling on ref (native listener), not on non-interactive handler prop
      className="group relative w-full overflow-hidden rounded-2xl border border-border/60 bg-[var(--bg-elevated)] shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-elevated)]"
    >
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
          loop={slides.length > 1}
          modules={autoplayModule ? [autoplayModule] : []}
          autoplay={
            swiperAutoplayEnabled
              ? { delay: interval, disableOnInteraction: false }
              : false
          }
          onSlideChange={(s: SwiperType) => {
            const slide = s as unknown as { realIndex?: number; activeIndex?: number }
            setIndex(slide.realIndex ?? slide.activeIndex ?? 0)
          }}
          autoHeight={!useCover}
        >
          {slides.map((slide, i) => (
            <components.SwiperSlide key={`${slide.src}::${slide.alt}`}>
              {slideInner(slide, i)}
            </components.SwiperSlide>
          ))}
        </components.Swiper>
      ) : (
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={`${slide.src}::${slide.alt}`}
              className="min-w-full flex-shrink-0"
            >
              {slideInner(slide, i)}
            </div>
          ))}
        </div>
      )}

      {showDots && slides.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((slide, i) => (
            <button
              key={`dot::${slide.src}::${slide.alt}`}
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
