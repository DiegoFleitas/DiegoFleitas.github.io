export interface EducationEntry {
  degree: string
  institution: string
  location?: string
  date: string
  duration?: string
  bullets?: string[]
}

export const education: EducationEntry[] = [
  {
    degree: 'Technologist Degree in Computer Science',
    institution: 'Universidad de la República (Udelar)',
    date: '2018',
    bullets: [],
  },
  {
    degree: 'Front End Development Certification',
    institution: 'freeCodeCamp',
    date: '2017',
    bullets: [],
  },
  {
    degree: 'First Certificate in English',
    institution: 'University of Cambridge',
    date: '2014',
    bullets: [],
  },
]
