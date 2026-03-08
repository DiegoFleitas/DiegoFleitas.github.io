export interface ExperienceEntry {
  company: string
  role: string
  location: string
  date: string
  bullets: string[]
}

export const experience: ExperienceEntry[] = [
  {
    company: 'Technical Upskilling',
    role: '',
    location: '',
    date: 'Aug 2025 — Present',
    bullets: [
      'Modernized legacy full-stack projects by migrating from jQuery to React and TypeScript, while implementing CI/CD automation pipelines',
      'Integrated AI-native tools (Cursor/Copilot) into the development workflow to accelerate code refactoring and diagnostic tasks',
    ],
  },
  {
    company: 'Tarmac.IO',
    role: 'Senior Backend Engineer',
    location: 'Montevideo, Uruguay',
    date: 'Mar 2022 — Aug 2025',
    bullets: [
      'Delivered features for US stakeholders across time zones using asynchronous handoffs, precise documentation, and cross-functional alignment with distributed teams (US, LATAM)',
      'Built backend authentication on serverless (JWT, custom token validation middleware) and implemented RBAC for a high-traffic K-12 platform',
      'Built curriculum ingestion (Node command to process spreadsheets) and analytics endpoints; integrated external services (e.g. product locators) through parallelization, caching, and retry logic (Python)',
      'Automated monitoring, alerting, and CI/CD using AWS Lambda, SQS, and health checks; drove production reliability and proactive incident response',
      'Reduced production incidents through systematic debugging, refactoring of legacy code paths for testability, and defensive programming patterns',
    ],
  },
  {
    company: 'CodigoDelSur',
    role: 'Software Developer',
    location: 'Montevideo, Uruguay',
    date: 'Sep 2021 — Apr 2022',
    bullets: [
      'Developed serverless applications using Node.js, TypeScript, and AWS infrastructure',
      'Shipped features in distributed teams using Scrum and agile practices',
    ],
  },
  {
    company: 'DESIGN-IT GmbH',
    role: 'Software Analyst',
    location: 'Montevideo, Uruguay',
    date: 'Nov 2019 — Sep 2021',
    bullets: [
      'Built and deployed web products for international clients using PHP (Laravel) and Vue/Quasar',
      'Built responsive web applications with Quasar for cross-platform deployment',
    ],
  },
  {
    company: 'TiendaMIA',
    role: 'Technical Support Assistant',
    location: 'Montevideo, Uruguay',
    date: 'Mar 2018 — Jul 2019',
    bullets: [
      'Resolved production issues and maintained PHP/Magento e-commerce applications with high quality standards',
    ],
  },
]
