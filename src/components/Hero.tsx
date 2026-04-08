import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { createActionAnimation, createFadeUpReveal } from '../lib/motion'
import { site } from '../data/site'
import { ContactModal } from './ContactModal'

function MailIcon({ className }: { className?: string }) {
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
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <path d="M22 7 12 13 2 7" />
    </svg>
  )
}

function DocumentIcon({ className }: { className?: string }) {
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
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
  const [contactOpen, setContactOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion() ?? false
  const headingAnimation = createFadeUpReveal(shouldReduceMotion, 0.05)
  const taglineAnimation = createFadeUpReveal(shouldReduceMotion, 0.12)
  const pitchAnimation = createFadeUpReveal(shouldReduceMotion, 0.2)
  const sublineAnimation = createFadeUpReveal(shouldReduceMotion, 0.26)
  const actionsAnimation = createFadeUpReveal(shouldReduceMotion, 0.32)
  const actionAnimation = createActionAnimation(shouldReduceMotion)

  return (
    <section id="hero" className="border-b border-border px-4 py-16 sm:px-6 sm:py-24">
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <div className="mx-auto max-w-4xl text-center">
        <motion.h1
          {...headingAnimation}
          className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        >
          {site.name}
        </motion.h1>
        <motion.p {...taglineAnimation} className="mt-3 text-xl text-muted">
          {site.tagline}
        </motion.p>
        {site.heroPitch && (
          <motion.p {...pitchAnimation} className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {site.heroPitch}
          </motion.p>
        )}
        {site.subline && (
          <motion.p {...sublineAnimation} className="mt-1 text-sm text-muted">
            {site.subline}
          </motion.p>
        )}
        <motion.div {...actionsAnimation} className="mt-8 flex flex-wrap justify-center gap-4">
          <motion.button
            {...actionAnimation}
            type="button"
            onClick={() => setContactOpen(true)}
            className="inline-flex items-center rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-surface hover:opacity-90 transition-opacity"
          >
            <MailIcon className="mr-2 h-5 w-5" />
            Contact for opportunities
          </motion.button>
          {site.cvPdfUrl && (
            <motion.a
              {...actionAnimation}
              href={site.cvPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-muted hover:border-foreground hover:text-foreground transition-colors"
            >
              <DocumentIcon className="mr-2 h-5 w-5" />
              View CV
            </motion.a>
          )}
          <motion.a
            {...actionAnimation}
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-border bg-transparent px-5 py-2.5 text-sm font-medium text-muted hover:border-foreground hover:text-foreground transition-colors"
          >
            <LinkedInIcon className="mr-2 h-5 w-5" />
            Connect on LinkedIn
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
