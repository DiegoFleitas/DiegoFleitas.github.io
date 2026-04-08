import { useEffect } from 'react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Background } from './components/Background'
import { trackEvent } from './utils/analytics'

const SECTION_IDS = ['hero', 'about', 'experience', 'education', 'projects'] as const

function App() {
  useEffect(() => {
    const sent = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const id = entry.target.id
          if (!id || sent.has(id)) continue
          sent.add(id)
          trackEvent('view_section', { section_name: id })
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.25, rootMargin: '0px' }
    )
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen bg-surface text-foreground">
      <Background />
      <div className="relative z-10">
        <Nav />
        <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
      </main>
      <Footer />
      </div>
    </div>
  )
}

export default App
