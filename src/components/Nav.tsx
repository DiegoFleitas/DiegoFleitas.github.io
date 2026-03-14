import { useTheme } from '../context/ThemeContext'
import { trackEvent } from '../utils/analytics'

const links = [
  { href: '#about', label: 'About me' },
  { href: '#experience', label: 'Experience' },
  { href: '#education', label: 'Education' },
  { href: '#projects', label: 'Open source' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const { theme, setTheme } = useTheme()

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
              <a
                href={href}
                className="text-sm font-medium text-muted hover:text-foreground transition-colors"
                onClick={() => trackEvent('nav_click', { destination: href.slice(1) })}
              >
                {label}
              </a>
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
