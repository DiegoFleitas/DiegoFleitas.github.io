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
    institution: 'Universidad de la República (Udelar)',
    date: '2018',
    logoUrl: '/logos/utec.png',
    bullets: [],
  },
  {
    degree: 'Front End Development Certification',
    institution: 'freeCodeCamp',
    date: '2017',
    logoUrl: '/logos/freecodecamp.png',
    bullets: [],
  },
  {
    degree: 'First Certificate in English',
    institution: 'University of Cambridge',
    date: '2014',
    logoUrl: '/logos/cambridge.png',
    bullets: [],
  },
]
