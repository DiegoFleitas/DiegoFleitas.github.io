import { useState } from 'react'
import { education, type EducationEntry } from '../data/education'
import { getTimelineImageUrl } from '../lib/logo'

type TimelineEntryProps = Readonly<{
  entry: EducationEntry
  isLast: boolean
}>

function timelineEntryKey(entry: EducationEntry) {
  return `${entry.institution}::${entry.degree}::${entry.date}`
}

function TimelineEntry({
  entry,
  isLast,
}: TimelineEntryProps) {
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
        </div>

        {hasDetails && (
          <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm text-muted">
            {entry.bullets!.map((bullet) => (
              <li
                key={`${timelineEntryKey(entry)}::${bullet}`}
                className="leading-relaxed"
              >
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </article>
    </li>
  )
}

export function Education() {
  const visible = education.filter((entry) => !entry.hidden)

  return (
    <section
      id="education"
      className="scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Education
        </h2>
        <ul className="mt-8 list-none">
          {visible.map((entry, i) => (
            <TimelineEntry
              key={timelineEntryKey(entry)}
              entry={entry}
              isLast={i === visible.length - 1}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
