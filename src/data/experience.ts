export interface ExperienceEntry {
  company: string
  role: string
  location: string
  date: string
  duration?: string // e.g. "3 years" for card subtitle
  bullets: string[]
}

export const experience: ExperienceEntry[] = [
  {
    company: 'Technical Upskilling',
    role: '',
    location: '',
    date: 'August 2025 — Present',
    duration: 'Present',
    bullets: [
      'Modernized legacy full-stack projects by migrating from jQuery to React and TypeScript, while implementing CI/CD automation pipelines',
      'Integrated AI-native tools (Cursor/Copilot) into the development workflow to accelerate code refactoring and diagnostic tasks',
    ],
  },
  {
    company: 'Tarmac.IO',
    role: 'Senior Backend Engineer',
    location: 'Montevideo, Uruguay',
    date: 'March 2022 — August 2025',
    duration: '3 years 5 months',
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
    date: 'September 2021 — April 2022',
    duration: '7 months',
    bullets: [
      'Developed serverless applications using Node.js, TypeScript, and AWS infrastructure',
      'Shipped features in distributed teams using Scrum, agile practices, and CI/CD',
    ],
  },
  {
    company: 'DESIGN-IT GmbH',
    role: 'Software Analyst',
    location: 'Montevideo, Uruguay',
    date: 'November 2019 — September 2021',
    duration: '1 year 10 months',
    bullets: [
      'Built and deployed web products for international clients using PHP (Laravel) and Vue/Quasar',
      'Built responsive web applications with Quasar for cross-platform deployment; deployed iOS apps to the App Store',
    ],
  },
  {
    company: 'TiendaMIA',
    role: 'Technical Support Assistant',
    location: 'Montevideo, Uruguay',
    date: 'March 2018 — July 2019',
    duration: '1 year 4 months',
    bullets: [
      'Resolved production issues and maintained PHP/Magento e-commerce applications; fixed frontend bugs (jQuery)',
      'Used CloudWatch for monitoring and alerting of production systems',
    ],
  },
  {
    company: 'SurTec Software',
    role: 'Intern Developer',
    location: 'San Jose, Uruguay',
    date: 'September 2017 — November 2017',
    duration: '3 months',
    bullets: [
      'Developed desktop and mobile applications using .NET, C#, and WPF (WinForms)',
      'Built cross-platform mobile applications with Xamarin and LiteDB for local data storage',
    ],
  },
]
