export interface EducationEntry {
  degree: string
  institution: string
  location?: string
  date: string
  duration?: string
  bullets?: string[]
  /** Local logo path for timeline node (e.g. /logos/udelar.png). */
  logoUrl?: string
  /** When true, omitted from the public timeline. */
  hidden?: boolean
}

export const education: EducationEntry[] = [
  {
    degree: 'Technologist Degree in Computer Science',
    institution: 'Universidad de la República (UdelaR) · UTEC · DGETP-UTU',
    date: '2018',
    logoUrl: '/logos/udelar.png',
    bullets: [],
  },
  {
    degree: 'Front End Development Certification',
    institution: 'freeCodeCamp',
    date: '2017',
    logoUrl: '/logos/freecodecamp.png',
    bullets: [],
    hidden: true,
  },
  {
    degree: 'Cambridge English: B2 First (FCE)',
    institution: 'University of Cambridge',
    date: '2014',
    logoUrl: '/logos/cambridge.png',
    bullets: [],
  },
]
