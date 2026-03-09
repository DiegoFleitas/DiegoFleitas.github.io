import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Background } from './components/Background'

function App() {
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
        <Contact />
      </main>
      <Footer />
      </div>
    </div>
  )
}

export default App
