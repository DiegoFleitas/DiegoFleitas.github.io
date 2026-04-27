import { aboutSummary } from '../data/about'
import { ImageCarousel } from './ImageCarousel'

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-b border-border px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-10 lg:flex-row lg:items-start">
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-bold text-foreground">About me</h2>
          <p className="mt-4 leading-relaxed text-muted whitespace-pre-line">
            {aboutSummary}
          </p>
        </div>

        <figure className="w-full">
          <ImageCarousel
            images={['/client-dinner.jpg', '/team-photo1.jpg']}
            autoplay={true}
            interval={4000}
            showDots={true}
          />

          <figcaption className="mt-3 text-xs text-muted">
            Some of the people I’ve had the privilege to build software with.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
