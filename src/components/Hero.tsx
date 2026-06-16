import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { createActionAnimation, createFadeUpReveal } from '../lib/motion'
import { cvPdfDownloadFilename, site } from '../data/site'
import { onResumePdfLinkClick } from '../utils/downloadResumePdf'

type IconProps = Readonly<{
  className?: string
}>

function DownloadIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
    </svg>
  )
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016c.005-.008.011-.016.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
    </svg>
  )
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion() ?? false
  const [sublinePrimary, sublineSecondary] = site.subline.split(' · ')
  const fullTagline = site.tagline
  const [typedTagline, setTypedTagline] = useState('')

  useEffect(() => {
    if (shouldReduceMotion) return

    let index = 0
    let timeoutId: ReturnType<typeof globalThis.setTimeout> | null = null

    const tick = () => {
      index += 1
      setTypedTagline(fullTagline.slice(0, index))
      if (index < fullTagline.length) {
        timeoutId = globalThis.setTimeout(tick, 55)
      }
    }

    timeoutId = globalThis.setTimeout(tick, 120)
    return () => { if (timeoutId !== null) globalThis.clearTimeout(timeoutId) }
  }, [fullTagline, shouldReduceMotion])

  const displayedTagline = shouldReduceMotion ? fullTagline : typedTagline

  const headingAnimation = createFadeUpReveal(shouldReduceMotion, 0.05)
  const taglineAnimation = createFadeUpReveal(shouldReduceMotion, 0.12)
  const sublineAnimation = createFadeUpReveal(shouldReduceMotion, 0.26)
  const actionsAnimation = createFadeUpReveal(shouldReduceMotion, 0.32)
  const photoAnimation = createFadeUpReveal(shouldReduceMotion, 0.02)
  const actionAnimation = createActionAnimation(shouldReduceMotion)
  const hasCv = site.cvPdfUrl.trim().length > 0

  return (
    <section id="hero" className="flex items-center px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto flex w-full max-w-5xl flex-col-reverse items-center justify-center gap-10 md:flex-row md:items-center md:gap-12 lg:gap-16">
        <div className="w-full min-w-0 text-center md:max-w-xl md:text-left">
          <motion.h1
            {...headingAnimation}
            className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            Hello, I'm {site.name}
          </motion.h1>
          <motion.p {...taglineAnimation} className="mt-3 text-xl text-muted">
            <span>{displayedTagline}</span>
            {!shouldReduceMotion && displayedTagline.length < fullTagline.length && (
              <span
                aria-hidden
                className="ml-0.5 inline-block h-[1.05em] w-[1.5px] translate-y-[2px] animate-pulse bg-current align-bottom opacity-80"
              />
            )}
          </motion.p>
          {site.subline && (
            <motion.p
              {...sublineAnimation}
              className="mx-auto mt-1 max-w-[34ch] text-sm leading-relaxed text-muted sm:max-w-none md:mx-0"
            >
              <span className="block sm:inline">{sublinePrimary}</span>
              {sublineSecondary && (
                <>
                  <span className="hidden sm:inline"> · </span>
                  <span className="block sm:inline">{sublineSecondary}</span>
                </>
              )}
            </motion.p>
          )}
          <motion.div {...actionsAnimation} className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
            <motion.a
              {...actionAnimation}
              href={hasCv ? site.cvPdfUrl : undefined}
              download={hasCv ? cvPdfDownloadFilename : undefined}
              onClick={hasCv ? onResumePdfLinkClick : (e) => e.preventDefault()}
              aria-disabled={!hasCv}
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold leading-none transition-all duration-200 ${hasCv
                ? 'bg-[#e04657] text-white shadow-sm hover:-translate-y-0.5 hover:bg-[#cd3c4c] hover:shadow-md'
                : 'cursor-not-allowed border border-border bg-surface-elevated text-muted opacity-50'
                }`}
            >
              <span className="inline-flex h-5 w-5 items-center justify-center">
                <DownloadIcon className="h-[18px] w-[18px] shrink-0" />
              </span>
              <span className="leading-none">Download Resume</span>
            </motion.a>
            <motion.a
              {...actionAnimation}
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-transparent px-6 py-3 text-sm font-medium leading-none text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/45 hover:text-foreground"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center">
                <LinkedInIcon className="h-5 w-5 shrink-0 translate-y-[0.5px]" />
              </span>
              <span className="leading-none">Message me on LinkedIn</span>
            </motion.a>
          </motion.div>
        </div>
        <motion.div {...photoAnimation} className="shrink-0">
          <img
            src="/closeup_pale_green.png"
            alt={`Portrait of ${site.name}`}
            width={256}
            height={256}
            className="aspect-square h-44 w-44 rounded-full border border-border object-cover shadow-lg ring-1 ring-border/60 sm:h-52 sm:w-52 md:h-64 md:w-64"
            style={{ filter: 'var(--photo-filter)' }}
            decoding="async"
            fetchPriority="high"
          />
        </motion.div>
      </div>
    </section>
  )
}
