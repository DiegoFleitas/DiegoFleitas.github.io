import { aboutSummary } from '../data/about'

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 border-b border-border px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-10 lg:flex-row lg:items-start">
        <div className="lg:w-1/2">
          <h2 className="text-2xl font-bold text-foreground">About me</h2>
          <p className="mt-4 leading-relaxed text-muted whitespace-pre-line">
            {aboutSummary}
          </p>
        </div>

        <figure className="lg:w-1/2 group">
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-[var(--bg-elevated)] shadow-sm">
            {/* Base image that blurs on hover */}
            <img
              src="/client-dinner.jpg"
              alt="Group dinner with a client team after a week of on-site collaboration"
              className="h-full w-full object-cover transition duration-200 group-hover:blur-sm"
              loading="lazy"
            />

            {/* Sharp circular window using clip-path */}
            <img
              src="/client-dinner.jpg"
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{ clipPath: 'circle(7% at 12% 34%)' }}
            />

            {/* Matching blue ring */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <div
                className="absolute inset-0 rounded-full border-2 border-sky-400 shadow-[0_0_0_2px_rgba(15,23,42,0.7)]"
                style={{ clipPath: 'circle(7% at 12% 34%)' }}
              />
            </div>
          </div>
          <figcaption className="mt-3 text-xs text-muted">
            Some of the people I’ve had the privilege to build software with.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
