import type { TextLink } from '../components/LinkedText'

export interface Project {
  title: string
  description: string
  repoUrl: string
  demoUrl?: string
  tryUrl?: string
  /** Phrases inside `description` that become anchors (first match wins). */
  links?: readonly TextLink[]
}

/** Research and user-facing apps */
export const projectsApps: Project[] = [
  {
    title: 'Concealed prompt injection: a base-rate study',
    description:
      'How often does real ingested web text actually carry a concealed instruction addressed to a model — and is that rarer than a detector’s false-positive rate? A pre-registered protocol, 290 pages of agent-ingest text, one measurement: 11.7% contained invisible characters, almost all benign (BOMs, emoji selectors, CJK line-breaking), and in every one of those documents the concealment channel carried no instruction. A positive control against published attack corpora (InjecAgent, BIPIA) shows what the detector can see: 30/30 when the payload is encoded into a channel, 0/30 when it is visible text.',
    links: [
      {
        text: '11.7%',
        url: 'https://github.com/DiegoFleitas/prompt-injection-base-rate/blob/main/results/preliminary-2026-10-26.md',
      },
      {
        text: '30/30 when the payload is encoded into a channel, 0/30 when it is visible text',
        url: 'https://github.com/DiegoFleitas/prompt-injection-base-rate/blob/main/results/sensitivity-report.md',
      },
    ],
    repoUrl: 'https://github.com/DiegoFleitas/prompt-injection-base-rate',
  },
  {
    title: 'Lemon Juice (archived)',
    description:
      'A Firefox and Chrome extension that revealed hidden text and flagged prompt-injection payload shapes on a page. It works as described; the study above is what showed its premise did not survive the base rate. Kept public for the limitations catalogue, the attack-pattern corpus and the evaluation harness.',
    repoUrl: 'https://github.com/DiegoFleitas/lemon-juice',
  },
]
