import { site } from '../data/site'

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-b border-border px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-foreground">Contact</h2>
        <div className="mt-6 flex flex-wrap gap-6">
          <a
            href={`mailto:${site.email}`}
            className="text-muted hover:text-foreground hover:underline transition-colors"
          >
            {site.email}
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground hover:underline transition-colors"
          >
            GitHub — {site.githubHandle}
          </a>
        </div>
      </div>
    </section>
  )
}
