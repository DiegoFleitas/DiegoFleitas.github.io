import { experience } from '../data/experience'
import { site } from '../data/site'

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-b border-border px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-2xl font-bold text-foreground">Experience</h2>
          {site.cvPdfUrl && (
            <a
              href={site.cvPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              Download CV →
            </a>
          )}
        </div>
        <ul className="mt-8 space-y-10">
          {experience.map((entry, i) => (
            <li key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-muted">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <span className="font-semibold text-foreground">
                    {entry.role ? `${entry.role}, ` : ''}{entry.company}
                  </span>
                  {entry.location && (
                    <span className="text-muted"> — {entry.location}</span>
                  )}
                </div>
                <span className="text-sm text-muted">{entry.date}</span>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-muted">
                {entry.bullets.map((bullet, j) => (
                  <li key={j} className="leading-relaxed">
                    {bullet}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
