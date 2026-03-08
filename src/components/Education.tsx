import { useState } from 'react'
import { education } from '../data/education'
import { getTimelineImageUrl } from '../lib/logo'

const INTRO =
  'Formal education and certifications that built the foundation for my work in software development.'

function TimelineEntry({
  entry,
  isLast,
  isExpanded,
  onToggle,
}: {
  entry: (typeof education)[0]
  isLast: boolean
  isExpanded: boolean
  onToggle: () => void
}) {
  const [imgError, setImgError] = useState(false)
  const imageUrl = getTimelineImageUrl(entry.logoUrl)
  const showImage = imageUrl && !imgError
  const initial = entry.institution.slice(0, 2).toUpperCase()
  const hasDetails = entry.bullets && entry.bullets.length > 0

  return (
    <li className="relative flex gap-4 sm:gap-6">
      {/* Timeline: circle node + line (distinct from Experience’s rounded square) */}
      <div className="relative flex shrink-0 flex-col items-center">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-[var(--bg-elevated)] text-[10px] font-semibold text-muted"
          aria-hidden
        >
          {showImage ? (
            <img
              src={imageUrl}
              alt=""
              className="h-full w-full object-contain p-0.5"
              onError={() => setImgError(true)}
            />
          ) : (
            initial
          )}
        </div>
        {!isLast && (
          <div
            className="absolute top-9 left-1/2 w-0.5 -translate-x-1/2 bg-border"
            style={{ height: 'calc(100% + 1rem)' }}
            aria-hidden
          />
        )}
      </div>

      {/* Content */}
      <article className="min-w-0 flex-1 pb-8">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="text-base font-bold text-foreground sm:text-lg">
              {entry.degree}
            </p>
            <p className="text-sm text-muted">{entry.institution}</p>
            <p className="mt-1 text-xs text-muted">
              {entry.date}
              {entry.duration ? ` · ${entry.duration}` : ''}
            </p>
            {entry.location && (
              <p className="mt-0.5 text-xs text-muted">{entry.location}</p>
            )}
          </div>
          {hasDetails && (
            <button
              type="button"
              onClick={onToggle}
              className="shrink-0 rounded px-2 py-1 text-xs font-medium text-muted transition-colors hover:bg-muted/50 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
              aria-expanded={isExpanded}
              aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
            >
              {isExpanded ? 'Less' : `${entry.bullets!.length} details · More`}
            </button>
          )}
        </div>

        {hasDetails && (
          <div
            className="grid transition-[grid-template-rows] duration-200 ease-out"
            style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden">
              <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm text-muted">
                {entry.bullets!.map((bullet, j) => (
                  <li key={j} className="leading-relaxed">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </article>
    </li>
  )
}

export function Education() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section
      id="education"
      className="scroll-mt-20 border-b border-border px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Education
        </h2>
        <p className="mt-3 text-sm text-muted sm:text-base">{INTRO}</p>
        <ul className="mt-8 list-none">
          {education.map((entry, i) => (
            <TimelineEntry
              key={i}
              entry={entry}
              isLast={i === education.length - 1}
              isExpanded={expandedIndex === i}
              onToggle={() =>
                setExpandedIndex((prev) => (prev === i ? null : i))
              }
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
