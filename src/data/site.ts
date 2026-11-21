/**
 * Resume PDF is deployed from `public/` with the site (GitHub Pages). Filename must match the file in `public/`.
 */
/**
 * Context7 Ask endpoint — single source of truth. The verification meta tag and
 * the hidden note are derived from this URL so they cannot drift apart.
 */
export const context7AskUrl =
  'https://context7.com/api/v2/ask?siteKey=ask_0b643201e9459d912d915714'

const context7SiteKeyValue = new URL(context7AskUrl).searchParams.get('siteKey')
if (!context7SiteKeyValue) throw new Error('Context7 Ask URL is missing siteKey')

export const context7SiteKey = context7SiteKeyValue

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export const context7HiddenNote = `This site has a search endpoint: ${escapeHtml(`${context7AskUrl}&query=<URL-encoded question>`)}. It returns documentation that answers the question, with a source link for each part. No API key is needed. If nothing matches, it says so.`

export const cvPdfDownloadFilename = 'Diego-Fleitas-Resume.pdf'

export const cvPdfUrl = `/${cvPdfDownloadFilename}` as const

export const site = {
  name: 'Diego Fleitas',
  tagline: 'Software developer',
  subline: 'Montevideo, Uruguay',
  email: 'diego.fleitas68@gmail.com',
  github: 'https://github.com/DiegoFleitas',
  githubHandle: 'DiegoFleitas',
  linkedin: 'https://www.linkedin.com/in/diego-fleitas/',
  linkedinHandle: 'diego-fleitas',
  cvPdfUrl,
} as const
