import { aboutSummary } from '../data/about'
import { ImageCarousel } from './ImageCarousel'

const aboutCarouselSlides = [
  {
    src: '/tmia-team-photo1.jpg',
    alt: 'Team photo',
  },
  {
    src: '/cds-photo2.jpg',
    alt: 'Team at Código del Sur',
  },
  {
    src: '/tarmac-client-dinner.jpg',
    alt: 'Group dinner with a client team after a week of on-site collaboration',
    coverObjectPosition: 'top',
  },
] as const

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-b border-border px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
        <div className="lg:col-span-5">
          <h2 className="text-2xl font-bold text-foreground">About me</h2>
          <div className="mt-4 max-w-prose">
            <p className="leading-7 text-muted whitespace-pre-line">{aboutSummary}</p>
          </div>
        </div>

        <figure className="w-full lg:col-span-7">
          <ImageCarousel
            slides={aboutCarouselSlides}
            imageFit="cover"
            autoplay={true}
            interval={4000}
            showDots={true}
          />

          <figcaption className="mt-3 max-w-prose text-sm leading-relaxed text-foreground/70">
            Some of the people I’ve had the privilege to build software with.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
