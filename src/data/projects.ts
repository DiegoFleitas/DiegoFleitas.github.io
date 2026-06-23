export interface Project {
  title: string
  description: string
  repoUrl: string
  demoUrl?: string
}

/** User-facing apps and extensions */
export const projectsApps: Project[] = [
  {
    title: 'Letterboxd × JustWatch',
    description:
      'A JustWatch-style tool that checks where the films on your Letterboxd watchlist are available to stream, by country and across multiple providers.',
    repoUrl: 'https://github.com/DiegoFleitas/letterboxd-movie-justwatch',
    demoUrl: 'https://movie-justwatch.fly.dev/',
  },
  {
    title: 'DMCA Redirect',
    description:
      'Firefox extension that detects when Google has DMCA-blocked a search result and lets you retry the same query on Yandex in one click.',
    repoUrl: 'https://github.com/DiegoFleitas/dmca-redirect',
    demoUrl: 'https://addons.mozilla.org/en-US/firefox/addon/dmca-redirect/',
  },
]
