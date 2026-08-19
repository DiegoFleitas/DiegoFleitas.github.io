/**
 * Resume PDF is deployed from `public/` with the site (GitHub Pages). Filename must match the file in `public/`.
 */
export const cvPdfDownloadFilename = 'Diego-Fleitas-Resume.pdf'

export const cvPdfUrl = `/${cvPdfDownloadFilename}` as const

export const site = {
  name: 'Diego Fleitas',
  tagline: 'Software developer transitioning to AI safety',
  subline: 'Montevideo, Uruguay',
  email: 'diego.fleitas68@gmail.com',
  github: 'https://github.com/DiegoFleitas',
  githubHandle: 'DiegoFleitas',
  linkedin: 'https://www.linkedin.com/in/diego-fleitas/',
  linkedinHandle: 'diego-fleitas',
  cvPdfUrl,
} as const
