export interface Project {
  title: string
  description: string
  repoUrl: string
  demoUrl?: string
}

/** User-facing apps and extensions */
export const projectsApps: Project[] = [
  {
    title: 'letterboxd-movie-justwatch',
    description:
      'Streaming availability search by country (multi-provider, JustWatch-style lookup). Includes watchlist ingestion and integration with streaming availability APIs.',
    repoUrl: 'https://github.com/DiegoFleitas/letterboxd-movie-justwatch',
    demoUrl: 'https://movie-justwatch.fly.dev/',
  },
  {
    title: 'dmca-redirect',
    description:
      'Firefox browser extension that detects Google DMCA-blocked search results and lets you seamlessly retry the same query on Yandex.',
    repoUrl: 'https://github.com/DiegoFleitas/dmca-redirect',
    demoUrl: 'https://addons.mozilla.org/en-US/firefox/addon/dmca-redirect/',
  },
]
