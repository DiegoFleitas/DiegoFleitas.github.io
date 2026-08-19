import { projectsApps } from '../data/projects'
import { trackEvent } from '../utils/analytics'
import type { Project } from '../data/projects'

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={12}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="inline-block shrink-0 translate-y-[-1px]"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  )
}

function ProjectCard({ project }: Readonly<{ project: Project }>) {
  return (
    <li className="border-t border-border py-8 first:border-t-0">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {project.title}
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            {project.description}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-4 pt-0.5">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted underline decoration-muted/50 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground/70"
              aria-label={`${project.title} demo`}
              onClick={() => trackEvent('project_click', { type: 'demo', project_title: project.title })}
            >
              Demo <ExternalLinkIcon />
            </a>
          )}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted underline decoration-muted/50 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground/70"
            aria-label={`${project.title} repository`}
            onClick={() => trackEvent('project_click', { type: 'repo', project_title: project.title })}
          >
            Repository <ExternalLinkIcon />
          </a>
        </div>
      </div>
    </li>
  )
}

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-foreground">Projects</h2>
        {/* Easter egg: written in invisible ink, revealed only when the page is held to the flame (e.g. scanned by Lemon Juice). */}
        <p
          className="pointer-events-none absolute h-px w-px select-none overflow-hidden whitespace-nowrap"
          style={{ clip: 'rect(0 0 0 0)', clipPath: 'inset(50%)' }}
          aria-hidden
        >
          You held it to the flame. I knew you would. ;)
        </p>
        <ul className="mt-3">
          {projectsApps.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </ul>
      </div>
    </section>
  )
}
