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
      'Concealment is a property of a page, not a signal of an attack. In 553 rendered job postings, 58.8% hide text from a sighted reader — all of it UI state and accessibility labels — and none of the 149 distinct hidden strings carried an instruction. An earlier pre-registered frame of 290 crawled pages found the same pattern in invisible characters: 11.7% carried them, all benign. Measuring the detector’s own recall (18.8% end-to-end) puts the bound on concealed instructions at 2.9%, not the 0.5% a perfect classifier would suggest; a positive control against InjecAgent and BIPIA payloads shows the instrument catches encoded payloads and not visible ones.',
    links: [
      {
        text: '58.8% hide text from a sighted reader',
        url: 'https://github.com/DiegoFleitas/prompt-injection-base-rate/blob/main/results/render-2026-11-10.md',
      },
      {
        text: '11.7%',
        url: 'https://github.com/DiegoFleitas/prompt-injection-base-rate/blob/main/results/preliminary-2026-10-26.md',
      },
      {
        text: 'positive control against InjecAgent and BIPIA payloads',
        url: 'https://github.com/DiegoFleitas/prompt-injection-base-rate/blob/main/results/sensitivity-report.md',
      },
    ],
    repoUrl: 'https://github.com/DiegoFleitas/prompt-injection-base-rate',
  },
  {
    title: 'Lemon Juice (archived)',
    description:
      'A Firefox and Chrome extension that revealed hidden text and flagged prompt-injection payload shapes on a page. It works as described; the study above showed the threat was real in a different place than the detector looked — the channel it watched was common and vacuous, and the channel that mattered was the instruction. Kept public for the limitations catalogue, the attack-pattern corpus and the evaluation harness.',
    repoUrl: 'https://github.com/DiegoFleitas/lemon-juice',
  },
]
