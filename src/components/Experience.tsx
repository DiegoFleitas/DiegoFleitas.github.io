import { useState } from 'react'
import { experience } from '../data/experience'
import { site } from '../data/site'
import { getTimelineImageUrl } from '../lib/logo'

const INTRO =
  "Throughout my career, I've taken on different roles that have shaped my skills and perspective. Each position brought new challenges and learning experiences."

function TimelineEntry({
  entry,
  isLast,
  isExpanded,
  onToggle,
}: {
  entry: (typeof experience)[0]
  isLast: boolean
  isExpanded: boolean
  onToggle: () => void
}) {
  const [imgError, setImgError] = useState(false)
  const imageUrl = getTimelineImageUrl(entry.logoUrl)
  const showImage = imageUrl && !imgError
  const initial = entry.company.slice(0, 2).toUpperCase()
  const displayRole = entry.role || entry.company
  const displayCompany = entry.role ? entry.company : ''
  const hasDetails = entry.bullets.length > 0

  return (
    <li className="relative flex gap-4 sm:gap-6">
      {/* Timeline line + node */}
      <div className="relative flex shrink-0 flex-col items-center">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 border-border bg-[var(--bg-elevated)] text-xs font-semibold text-muted"
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
            className="absolute top-10 left-1/2 w-0.5 -translate-x-1/2 bg-border"
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
              {displayRole}
            </p>
            {displayCompany && (
              <p className="text-sm text-muted">{displayCompany}</p>
            )}
            <p className="mt-1 text-xs text-muted">
              {entry.date}
              {entry.duration && entry.duration.toLowerCase() !== 'present'
                ? ` · ${entry.duration}`
                : ''}
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
              {isExpanded ? 'Less' : `${entry.bullets.length} details · More`}
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
                {entry.bullets.map((bullet, j) => (
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

export function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section
      id="experience"
      className="scroll-mt-20 border-b border-border px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Experience
          </h2>
          {site.cvPdfUrl && (
            <a
              href={site.cvPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              Download CV →
            </a>
          )}
        </div>
        <p className="mt-3 text-sm text-muted sm:text-base">
          {INTRO}
        </p>
        <ul className="mt-8 list-none">
          {experience.map((entry, i) => (
            <TimelineEntry
              key={i}
              entry={entry}
              isLast={i === experience.length - 1}
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
