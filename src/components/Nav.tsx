import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useTheme } from '../context/ThemeContext'
import { createActionAnimation } from '../lib/motion'
import { trackEvent } from '../utils/analytics'

const links = [
  { href: '#about', label: 'About me' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#projects', label: 'Open source' },
]

export function Nav() {
  const { theme, setTheme } = useTheme()
  const shouldReduceMotion = useReducedMotion() ?? false
  const actionAnimation = createActionAnimation(shouldReduceMotion)
  const defaultHref = links[0]?.href ?? '#about'
  const [activeHref, setActiveHref] = useState(defaultHref)

  useEffect(() => {
    const nextActiveFromHash = () => {
      const hash = window.location.hash
      const match = links.find((link) => link.href === hash)
      setActiveHref(match?.href ?? defaultHref)
    }

    nextActiveFromHash()
    window.addEventListener('hashchange', nextActiveFromHash)
    return () => window.removeEventListener('hashchange', nextActiveFromHash)
  }, [defaultHref])

  const linkClassName = useMemo(
    () => 'relative inline-flex rounded px-1 py-0.5 text-sm font-medium transition-colors',
    []
  )

  const handleThemeToggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    trackEvent('theme_toggle', { theme: next })
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="mx-auto flex max-w-4xl items-center justify-end px-4 py-3 sm:px-6">
        <ul className="flex items-center gap-6">
          {links.map(({ href, label }) => (
            <li key={href}>
              <motion.a
                {...actionAnimation}
                href={href}
                aria-current={activeHref === href ? 'page' : undefined}
                className={`${linkClassName} ${activeHref === href ? 'text-foreground' : 'text-muted hover:text-foreground'}`}
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
                <span className="text-lg" title="Day mode">☀️</span>
              ) : (
                <span className="text-lg" title="Night mode">🌙</span>
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
