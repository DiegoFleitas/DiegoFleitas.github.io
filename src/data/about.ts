export const aboutSummary =
  "I've spent seven years working on production systems, mostly on the backend but moving across the stack when needed. Lately I've been focused on evaluating small local models and studying indirect prompt injection — most recently a pre-registered study of how often concealed injection actually appears in real ingested web text. It found invisible characters in 11.7% of the documents it sampled, mostly BOMs and emoji selectors; none of them used concealment to carry an instruction."

/**
 * Phrases inside `aboutSummary` that link out. First match wins; the phrase
 * disappears from the plain text and comes back as an anchor.
 */
export const aboutLinks = [
  {
    text: 'pre-registered study',
    url: 'https://github.com/DiegoFleitas/prompt-injection-base-rate',
  },
] as const
