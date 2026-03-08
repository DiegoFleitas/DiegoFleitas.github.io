import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ThemeProvider } from './context/ThemeContext'
import App from './App'

function AppWithProviders() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}

describe('App', () => {
  it('renders the app', () => {
    render(<AppWithProviders />)
    expect(document.querySelector('.min-h-screen')).toBeInTheDocument()
  })
})
