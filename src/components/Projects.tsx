import { projectsApps } from '../data/projects'
import { trackEvent } from '../utils/analytics'
import type { Project } from '../data/projects'

function ProjectCard({ project }: Readonly<{ project: Project }>) {
  return (
    <li className="py-6">
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
              Demo ↗
            </a>
          )}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted underline decoration-muted/50 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground/70"
            onClick={() => trackEvent('project_click', { type: 'repo', project_title: project.title })}
          >
            Repository
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
        <ul className="mt-3">
          {projectsApps.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </ul>
      </div>
    </section>
  )
}
