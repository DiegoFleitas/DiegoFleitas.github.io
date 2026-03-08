import { site } from '../data/site'

export function Hero() {
  return (
    <section className="border-b border-neutral-800 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {site.name}
        </h1>
        <p className="mt-3 text-xl text-neutral-400">{site.tagline}</p>
        {site.subline && (
          <p className="mt-1 text-sm text-neutral-500">{site.subline}</p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-[#0d0d0d] hover:bg-neutral-200 transition-colors"
          >
            Get in touch
          </a>
          {site.cvPdfUrl && (
            <a
              href={site.cvPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-neutral-600 bg-transparent px-5 py-2.5 text-sm font-medium text-neutral-300 hover:border-neutral-500 hover:text-white transition-colors"
            >
              Download CV
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
