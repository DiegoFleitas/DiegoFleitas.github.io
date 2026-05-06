import { useState } from 'react'
import { experience, type ExperienceEntry } from '../data/experience'
import { site } from '../data/site'
import { getTimelineImageUrl } from '../lib/logo'

const INTRO =
  "Over the years I've taken on different roles that have shaped my skills and perspective, each bringing new challenges and learning experiences."

type TimelineEntryProps = Readonly<{
  entry: ExperienceEntry
  isLast: boolean
  isExpanded: boolean
  onToggle: () => void
}>

function timelineEntryKey(entry: ExperienceEntry) {
  return `${entry.company}::${entry.date}::${entry.role ?? ''}`
}

function TimelineEntry({
  entry,
  isLast,
  isExpanded,
  onToggle,
}: TimelineEntryProps) {
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
        {isLast && (
          <>
            <div className="h-3 w-0.5 shrink-0 bg-border" aria-hidden />
            <div
              className="h-2 w-2 shrink-0 rounded-full border-2 border-border bg-[var(--bg-elevated)]"
              aria-hidden
            />
          </>
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
                {entry.bullets.map((bullet) => (
                  <li
                    key={`${timelineEntryKey(entry)}::${bullet}`}
                    className="leading-relaxed"
                  >
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
  const [expandedIndices, setExpandedIndices] = useState<number[]>([])
  const visible = experience.filter((entry) => !entry.hidden)
  const expandableIndices = visible
    .map((entry, index) => ({ entry, index }))
    .filter(({ entry }) => entry.bullets.length > 0)
    .map(({ index }) => index)
  const allExpanded =
    expandableIndices.length > 0 &&
    expandableIndices.every((index) => expandedIndices.includes(index))

  function toggleAllDetails() {
    setExpandedIndices((prev) =>
      prev.length === expandableIndices.length ? [] : expandableIndices
    )
  }

  function toggleDetailsAt(index: number) {
    setExpandedIndices((prev) =>
      prev.includes(index)
        ? prev.filter((existingIndex) => existingIndex !== index)
        : [...prev, index]
    )
  }

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
        <div className="mt-3 flex items-start gap-3">
          <p className="text-sm text-muted sm:text-base">{INTRO}</p>
          {expandableIndices.length > 0 && (
            <button
              type="button"
              onClick={toggleAllDetails}
              className="ml-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded text-muted transition-colors hover:bg-muted/50 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
              aria-label={allExpanded ? 'Collapse all details' : 'Expand all details'}
              title={allExpanded ? 'Collapse all' : 'Expand all'}
            >
              {allExpanded ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                  aria-hidden
                >
                  <path d="M7 15l5-5 5 5" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                  aria-hidden
                >
                  <path d="M7 9l5 5 5-5" />
                </svg>
              )}
            </button>
          )}
        </div>
        <ul className="mt-8 list-none">
          {visible.map((entry, i) => (
            <TimelineEntry
              key={timelineEntryKey(entry)}
              entry={entry}
              isLast={i === visible.length - 1}
              isExpanded={expandedIndices.includes(i)}
              onToggle={() => toggleDetailsAt(i)}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
