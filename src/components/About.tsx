import { aboutSummary, aboutLab } from '../data/about'
import { ImageCarousel, type CarouselSlide } from './ImageCarousel'

function companyBadge(src: string, alt: string): CarouselSlide['badgeLogo'] {
  if (!src) return undefined
  return { src, alt }
}

const aboutCarouselSlides: readonly CarouselSlide[] = [
  {
    src: '/tmia-team-photo1.jpg',
    alt: 'Team photo',
    badgeLogo: companyBadge('/logos/tiendamia.png', 'TiendaMIA'),
  },
  {
    src: '/cds-photo2.jpg',
    alt: 'Team at Código del Sur',
    badgeLogo: companyBadge('/logos/codigodelsur.png', 'CodigoDelSur'),
  },
  {
    src: '/tarmac-client-dinner.jpg',
    alt: 'Group dinner with a client team after a week of on-site collaboration',
    coverObjectPosition: 'top',
    badgeLogo: companyBadge('/logos/tarmac-purple.png', 'Tarmac.IO'),
  },
]

// Renders about paragraphs, linking the named lab (if present) to its site.
function renderAboutParagraph(text: string, index: number) {
  const { name, url } = aboutLab
  const at = text.indexOf(name)
  if (at === -1) {
    return <p key={index} className="leading-7 text-muted">{text}</p>
  }
  return (
    <p key={index} className="leading-7 text-muted">
      {text.slice(0, at)}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted underline decoration-muted/50 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground/70"
      >
        {name}
      </a>
      {text.slice(at + name.length)}
    </p>
  )
}

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-10 lg:gap-y-0">
        <div className="order-2 lg:order-none lg:col-span-5">
          <h2 className="text-2xl font-bold text-foreground">About me</h2>
          <div className="mt-4 max-w-prose space-y-4">
            {aboutSummary.split(/\n{2,}/).map((paragraph, index) =>
              renderAboutParagraph(paragraph, index)
            )}
          </div>
        </div>

        <figure className="order-1 w-full lg:order-none lg:col-span-7">
          <ImageCarousel
            slides={aboutCarouselSlides}
            imageFit="cover"
            autoplay={true}
            interval={4000}
            showDots={true}
          />

          <figcaption className="mt-3 max-w-prose text-sm leading-relaxed text-foreground/70">
            Some of the people I'm grateful to have crossed paths with
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
