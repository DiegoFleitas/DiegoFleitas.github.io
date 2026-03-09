import { site } from '../data/site'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 text-sm text-muted">
        <span>
          © {year} {site.name}
        </span>
        <div className="flex gap-6">
          <a href={`mailto:${site.email}`} className="hover:text-foreground transition-colors">
            Email
          </a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
