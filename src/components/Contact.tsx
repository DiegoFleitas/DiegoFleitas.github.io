import { site } from '../data/site'

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-b border-neutral-200 px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-neutral-900">Contact</h2>
        <div className="mt-6 flex flex-wrap gap-6">
          <a
            href={`mailto:${site.email}`}
            className="text-neutral-600 hover:text-neutral-900 hover:underline"
          >
            {site.email}
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-neutral-900 hover:underline"
          >
            GitHub — {site.githubHandle}
          </a>
        </div>
      </div>
    </section>
  )
}
