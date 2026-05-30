export interface ExperienceEntry {
  company: string
  role: string
  date: string
  logoUrl?: string
  hidden?: boolean
}

export const experience: ExperienceEntry[] = [
  {
    company: 'Independent',
    role: 'Full-stack modernization & developer tooling',
    date: 'August 2025 — Present',
    logoUrl: '/logos/cursor.png',
    hidden: true,
  },
  {
    company: 'Tarmac.IO',
    role: 'Software Engineer',
    date: 'March 2022 — August 2025',
    logoUrl: '/logos/tarmac-purple.png',
  },
  {
    company: 'CodigoDelSur',
    role: 'Software Developer',
    date: 'September 2021 — April 2022',
    logoUrl: '/logos/codigodelsur.png',
  },
  {
    company: 'DESIGN-IT GmbH',
    role: 'Software Analyst',
    date: 'November 2019 — September 2021',
    logoUrl: '/logos/design-it.png',
  },
  {
    company: 'TiendaMIA',
    role: 'Technical Support Assistant',
    date: 'March 2018 — July 2019',
    logoUrl: '/logos/tiendamia.png',
  },
  {
    company: 'SurTec Software',
    role: 'Intern Developer',
    date: 'September 2017 — November 2017',
    logoUrl: '/logos/surtec.png',
    hidden: true,
  },
]
