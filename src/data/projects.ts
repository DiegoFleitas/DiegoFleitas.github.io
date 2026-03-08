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
    title: 'letterboxd-movie-justwatch',
    description:
      'Movie streaming search and country-level availability (JustWatch clone); watchlist ingestion tool with JustWatch API integration for streaming availability lookup.',
    repoUrl: 'https://github.com/DiegoFleitas/letterboxd-movie-justwatch',
  },
  {
    title: 'censor-pdf-demo-poc',
    description:
      'Browser-based OCR redaction pipeline using Tesseract.js for text recognition; PDF parsing and manipulation for automated document censorship.',
    repoUrl: 'https://github.com/DiegoFleitas/censor-pdf-demo-poc',
  },
]
