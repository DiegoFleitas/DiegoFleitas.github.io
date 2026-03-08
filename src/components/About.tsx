import { aboutSummary } from '../data/about'

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-b border-neutral-200 px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-neutral-900">About</h2>
        <p className="mt-4 leading-relaxed text-neutral-600">{aboutSummary}</p>
      </div>
    </section>
  )
}
