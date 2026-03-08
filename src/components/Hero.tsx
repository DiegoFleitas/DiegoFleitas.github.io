import { site } from '../data/site'

export function Hero() {
  return (
    <section className="border-b border-neutral-200 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
          {site.name}
        </h1>
        <p className="mt-3 text-xl text-neutral-600">{site.tagline}</p>
        {site.subline && (
          <p className="mt-1 text-sm text-neutral-500">{site.subline}</p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Get in touch
          </a>
          {site.cvPdfUrl && (
            <a
              href={site.cvPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              Download CV
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
