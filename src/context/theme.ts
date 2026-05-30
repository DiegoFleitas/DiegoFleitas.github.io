import { createContext, useContext } from 'react'

export type Theme = 'light' | 'dark'

export function getStoredTheme(): Theme | null {
  if (globalThis.window === undefined) return null
  const stored = localStorage.getItem('theme') as Theme | null
  return stored === 'light' || stored === 'dark' ? stored : null
}

export function getSystemTheme(): Theme {
  if (globalThis.window === undefined) return 'dark'
  return globalThis.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark'
  const attr = document.documentElement.dataset.theme as Theme | undefined
  return attr === 'light' || attr === 'dark' ? attr : getStoredTheme() ?? 'dark'
}

export type ThemeContextValue = { theme: Theme; setTheme: (theme: Theme) => void }

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
