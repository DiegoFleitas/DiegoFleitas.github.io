import { useState } from 'react'
import { experience, type ExperienceEntry } from '../data/experience'
import { cvPdfDownloadFilename, site } from '../data/site'
import { onResumePdfLinkClick } from '../utils/downloadResumePdf'
import { getTimelineImageUrl } from '../lib/logo'

function timelineEntryKey(entry: ExperienceEntry) {
  return `${entry.company}::${entry.date}`
}

type TimelineEntryProps = Readonly<{
  entry: ExperienceEntry
  isLast: boolean
}>

function TimelineEntry({ entry, isLast }: TimelineEntryProps) {
  const [imgError, setImgError] = useState(false)
  const imageUrl = getTimelineImageUrl(entry.logoUrl)
  const showImage = imageUrl && !imgError
  const initial = entry.company.slice(0, 2).toUpperCase()

  return (
    <li className="relative flex gap-4 sm:gap-6">
      <div className="relative flex shrink-0 flex-col items-center">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border-2 border-border bg-surface-elevated text-[10px] font-semibold text-muted"
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
              className="h-2 w-2 shrink-0 rounded-full border-2 border-border bg-surface-elevated"
              aria-hidden
            />
          </>
        )}
      </div>

      <article className="min-w-0 flex-1 pb-8">
        <p className="text-base font-bold text-foreground sm:text-lg">{entry.role}</p>
        <p className="text-sm text-muted">{entry.company}</p>
        <p className="mt-1 text-xs text-muted">{entry.date}</p>
      </article>
    </li>
  )
}

export function Experience() {
  const visible = experience.filter((entry) => !entry.hidden)
  const hasCv = site.cvPdfUrl.trim().length > 0

  return (
    <section
      id="experience"
      className="scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Work experience
            </h2>
          </div>
          {hasCv ? (
            <a
              href={site.cvPdfUrl}
              download={cvPdfDownloadFilename}
              onClick={onResumePdfLinkClick}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              Download resume (PDF) →
            </a>
          ) : null}
        </div>
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
