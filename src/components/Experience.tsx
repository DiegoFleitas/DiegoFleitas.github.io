import { experience } from '../data/experience'
import { site } from '../data/site'

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-b border-neutral-800 px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-2xl font-bold text-white">Experience</h2>
          {site.cvPdfUrl && (
            <a
              href={site.cvPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Download CV →
            </a>
          )}
        </div>
        <ul className="mt-8 space-y-10">
          {experience.map((entry, i) => (
            <li key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-neutral-500">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <span className="font-semibold text-white">
                    {entry.role ? `${entry.role}, ` : ''}{entry.company}
                  </span>
                  {entry.location && (
                    <span className="text-neutral-500"> — {entry.location}</span>
                  )}
                </div>
                <span className="text-sm text-neutral-500">{entry.date}</span>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-neutral-400">
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
