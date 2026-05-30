import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { createActionAnimation, createFadeUpReveal } from '../lib/motion'
import { cvPdfDownloadFilename, site } from '../data/site'
import { onResumePdfLinkClick } from '../utils/downloadResumePdf'

type IconProps = Readonly<{
  className?: string
}>

function DownloadCloudIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M20 16.5a4.5 4.5 0 0 0-1.1-8.86A6 6 0 1 0 6 14H7.5" />
      <path d="M12 12v9" />
      <path d="m8.5 17.5 3.5 3.5 3.5-3.5" />
    </svg>
  )
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6 1.12 6 0 4.88 0 3.5 0 2.12 1.12 1 2.5 1 3.88 1 4.98 2.12 4.98 3.5zM0 8.25h5v15.75H0V8.25zM8.75 8.25h4.8v2.15h.07c.67-1.27 2.3-2.6 4.73-2.6 5.06 0 6 3.33 6 7.67v8.53h-5v-7.56c0-1.8-.03-4.1-2.5-4.1-2.5 0-2.88 1.95-2.88 3.97v7.69h-5V8.25z" />
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
    <section id="hero" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto flex max-w-5xl flex-col-reverse items-center justify-center gap-10 md:flex-row md:items-center md:gap-12 lg:gap-16">
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
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold leading-none transition-all duration-200 ${
                hasCv
                  ? 'bg-[#e04657] text-white shadow-sm hover:-translate-y-0.5 hover:bg-[#cd3c4c] hover:shadow-md'
                  : 'cursor-not-allowed border border-border bg-surface-elevated text-muted opacity-50'
              }`}
            >
              <span className="inline-flex h-5 w-5 items-center justify-center">
                <DownloadCloudIcon className="h-[18px] w-[18px] shrink-0" />
              </span>
              <span className="leading-none">Download Resume</span>
            </motion.a>
            <motion.a
              {...actionAnimation}
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-6 py-3 text-sm font-medium leading-none text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground hover:text-foreground"
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
            src="/me.jpg"
            alt={`Portrait of ${site.name}`}
            width={256}
            height={256}
            className="aspect-square h-44 w-44 rounded-full border border-border object-cover shadow-lg ring-1 ring-border/60 sm:h-52 sm:w-52 md:h-64 md:w-64"
            decoding="async"
            fetchPriority="high"
          />
        </motion.div>
      </div>
    </section>
  )
}
