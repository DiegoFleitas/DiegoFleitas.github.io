import { projectsApps, projectsTooling } from '../data/projects'
import { trackEvent } from '../utils/analytics'
import type { Project } from '../data/projects'

function ProjectCard({ project }: { project: Project }) {
  return (
    <li className="rounded-xl border border-border bg-surface-elevated/80 p-5 transition hover:border-foreground/30">
      <div className="flex items-center gap-3">
        <h3 className="font-semibold text-foreground">{project.title}</h3>
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-muted underline hover:text-foreground transition-colors"
            aria-label={`${project.title} demo`}
            onClick={() => trackEvent('project_click', { type: 'demo', project_title: project.title })}
          >
            <span>Demo</span>
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-muted underline hover:text-foreground transition-colors"
          onClick={() => trackEvent('project_click', { type: 'repo', project_title: project.title })}
        >
          Repository
        </a>
      </div>
    </li>
  )
}

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 border-b border-border px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-foreground">Open source & tooling</h2>

        <h3 className="mt-10 text-sm font-semibold uppercase tracking-wide text-muted">Apps & extensions</h3>
        <ul className="mt-4 grid gap-6 sm:grid-cols-1">
          {projectsApps.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </ul>

        <h3 className="mt-10 text-sm font-semibold uppercase tracking-wide text-muted">Developer environment</h3>
        <ul className="mt-4 grid gap-6 sm:grid-cols-1">
          {projectsTooling.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </ul>
      </div>
    </section>
  )
}
