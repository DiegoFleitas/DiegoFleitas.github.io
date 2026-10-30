export const aboutSummary =
  "I've spent seven years working on production systems, mostly on the backend but moving across the stack when needed. Lately I've been evaluating small language models and studying indirect prompt injection — most recently with a pre-registered study of how often text that agents ingest actually carries a hidden instruction."

/**
 * Phrases inside `aboutSummary` that link out. First match wins; the phrase
 * disappears from the plain text and comes back as an anchor.
 */
export const aboutLinks = [
  {
    text: 'pre-registered study',
    url: '#projects',
  },
] as const
