export interface EducationEntry {
  degree: string
  institution: string
  location?: string
  date: string
  duration?: string
  bullets?: string[]
  /** Local logo path for timeline node (e.g. /logos/utec.png). */
  logoUrl?: string
}

export const education: EducationEntry[] = [
  {
    degree: 'Technologist Degree in Computer Science',
    institution: 'UTEC · DGETP‑UTU · Universidad de la República (UdelaR)',
    date: '2018',
    logoUrl: '/logos/utec.png',
    bullets: [
      'Joint technologist program focused on development, implementation, maintenance, and management of computer systems.',
      'Emphasis on practical classes and active learning; jointly managed and awarded by UTEC, DGETP‑UTU, and UdelaR.',
    ],
  },
  {
    degree: 'Front End Development Certification',
    institution: 'freeCodeCamp',
    date: '2017',
    logoUrl: '/logos/freecodecamp.png',
    bullets: [],
  },
  {
    degree: 'Cambridge English: B2 First (FCE)',
    institution: 'University of Cambridge',
    date: '2014',
    logoUrl: '/logos/cambridge.png',
    bullets: [],
  },
]
