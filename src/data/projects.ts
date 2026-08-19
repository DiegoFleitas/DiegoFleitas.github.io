export interface Project {
  title: string
  description: string
  repoUrl: string
  demoUrl?: string
}

/** User-facing apps and extensions */
export const projectsApps: Project[] = [
  {
    title: 'Lemon Juice',
    description:
      'Firefox extension that holds a web page up to the flame: it reveals hidden text and flags prompt-injection payloads (invisible Unicode, ASCII smuggling, encoded blobs, instruction-like phrases) before you hand the page to ChatGPT, Claude, Gemini, or a browser agent.',
    repoUrl: 'https://github.com/DiegoFleitas/lemon-juice',
  },
]
