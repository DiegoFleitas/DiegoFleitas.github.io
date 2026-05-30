import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useTheme } from '../context/ThemeContext'
import { createActionAnimation } from '../lib/motion'
import { trackEvent } from '../utils/analytics'

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Work' },
  { href: '#education', label: 'Education' },
  { href: '#projects', label: 'Projects' },
]

export function Nav() {
  const { theme, setTheme } = useTheme()
  const shouldReduceMotion = useReducedMotion() ?? false
  const actionAnimation = createActionAnimation(shouldReduceMotion)
  const defaultHref = links[0]?.href ?? '#about'
  const [activeHref, setActiveHref] = useState(defaultHref)

  useEffect(() => {
    const nextActiveFromHash = () => {
      const hash = globalThis.location.hash
      const match = links.find((link) => link.href === hash)
      setActiveHref(match?.href ?? defaultHref)
    }

    nextActiveFromHash()
    globalThis.addEventListener('hashchange', nextActiveFromHash)
    return () => globalThis.removeEventListener('hashchange', nextActiveFromHash)
  }, [defaultHref])

  const linkClassName = 'relative inline-flex whitespace-nowrap rounded px-1 py-0.5 text-sm font-medium transition-colors'

  const handleThemeToggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    trackEvent('theme_toggle', { theme: next })
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="mx-auto max-w-4xl overflow-x-auto px-2 py-3 sm:px-6">
        <ul className="flex min-w-max items-center justify-start gap-4 sm:justify-end sm:gap-6">
          {links.map(({ href, label }) => (
            <li key={href}>
              <motion.a
                {...actionAnimation}
                href={href}
                aria-current={activeHref === href ? 'page' : undefined}
                className={`${linkClassName} text-xs sm:text-sm ${activeHref === href ? 'text-foreground' : 'text-muted hover:text-foreground'}`}
                onClick={() => {
                  setActiveHref(href)
                  trackEvent('nav_click', { destination: href.slice(1) })
                }}
              >
                {activeHref === href && (
                  <motion.span
                    layoutId="nav-active-link"
                    className="absolute inset-0 -z-10 rounded bg-surface-elevated"
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                {label}
              </motion.a>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={handleThemeToggle}
              className="rounded-lg p-2 text-muted hover:bg-surface-elevated hover:text-foreground transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
