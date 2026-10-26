export const aboutSummary =
  "I've spent seven years working on production systems, mostly on the backend but moving across the stack when needed. Lately I've focused on evaluating small local models and on indirect prompt injection — most recently a pre-registered study of how often concealment actually shows up in real agent-ingest text."

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
