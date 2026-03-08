import { projects } from '../data/projects'

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 border-b border-neutral-200 px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-bold text-neutral-900">Projects</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-1">
          {projects.map((project, i) => (
            <li
              key={i}
              className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-neutral-300 hover:shadow"
            >
              <h3 className="font-semibold text-neutral-900">{project.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-neutral-700 underline hover:text-neutral-900"
                >
                  Repository
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-neutral-700 underline hover:text-neutral-900"
                  >
                    Demo
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
