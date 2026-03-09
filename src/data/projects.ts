export interface Project {
  title: string
  description: string
  repoUrl: string
  demoUrl?: string
}

export const projects: Project[] = [
  {
    title: 'dotfiles',
    description:
      'Automated developer environment setup for Linux/macOS using chezmoi and shell scripts for dotfiles and reproducible configuration.',
    repoUrl: 'https://github.com/DiegoFleitas/dotfiles',
  },
  {
    title: 'dmca-redirect',
    description:
      'Firefox browser extension that detects Google DMCA-blocked search results and lets you seamlessly retry the same query on Yandex.',
    repoUrl: 'https://github.com/DiegoFleitas/dmca-redirect',
    demoUrl: 'https://addons.mozilla.org/en-US/firefox/addon/dmca-redirect/',
  },
  {
    title: 'letterboxd-movie-justwatch',
    description:
      'Movie streaming search and country-level availability (JustWatch clone); watchlist ingestion tool with JustWatch API integration for streaming availability lookup.',
    repoUrl: 'https://github.com/DiegoFleitas/letterboxd-movie-justwatch',
    demoUrl: 'https://movie-justwatch.fly.dev/',
  },
]
