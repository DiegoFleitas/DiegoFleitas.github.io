import { useCallback, useEffect, useMemo, useState } from 'react'
import { ThemeContext, getInitialTheme, Theme } from './theme'

export { useTheme } from './theme'

export function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const changeTheme = useCallback((next: Theme) => setTheme(next), [])

  const value = useMemo(() => ({ theme, setTheme: changeTheme }), [theme, changeTheme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
