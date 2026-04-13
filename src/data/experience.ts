export interface ExperienceEntry {
  company: string
  role: string
  location: string
  date: string
  duration?: string // e.g. "3 years" for card subtitle
  bullets: string[]
  /** Local logo path for timeline node (e.g. /logos/tarmac.png). */
  logoUrl?: string
  /** When true, omitted from the public timeline (kept in data for CV / optional restore). */
  hidden?: boolean
}

export const experience: ExperienceEntry[] = [
  {
    company: 'Independent — professional development',
    role: 'Full-stack modernization & developer tooling',
    location: '',
    date: 'August 2025 — Present',
    duration: 'Present',
    logoUrl: '/logos/cursor.png',
    hidden: true,
    bullets: [
      'Modernized 2 legacy full-stack projects by migrating from jQuery to React and TypeScript, while implementing CI/CD automation pipelines and automated quality checks',
      'Integrated AI-native tools (Cursor/Copilot) into the development workflow to accelerate code refactoring and diagnostic tasks',
      'Built and iterated on a custom Joplin MCP integration to turn personal notes into a searchable documentation hub for day-to-day development, accessible directly from the editor',
    ],
  },
  {
    company: 'Tarmac.IO',
    role: 'Software Engineer',
    location: 'Montevideo, Uruguay',
    date: 'March 2022 — August 2025',
    duration: '3 years 5 months',
    logoUrl: '/logos/tarmac.png',
    bullets: [
      'Delivered features for US stakeholders across time zones using asynchronous handoffs, precise documentation, and cross-functional alignment with distributed teams across 2 regions (US, LATAM)',
      'Designed and implemented user entitlement model (org-role, access windows) for a K-12 education platform, including 2 migrations, a user profile endpoint, and navigation-flow design with frontend coordination',
      'Built backend authentication on serverless (JWT, custom token validation) and role-based access control; delivered single sign-on and roster integration (Clever) for a K-12 platform—supported rollout for 2,000+ students and 150+ teachers across 3 districts',
      'Designed a 3-stage deployment and release workflow from development to production; automated monitoring/alerting (AWS Lambda, Amazon SQS, health checks) for production reliability',
      'Built curriculum ingestion and analytics endpoints; integrated external services (e.g. product-locator platform) with parallelization, caching, and retry logic, reducing production incidents through systematic debugging and defensive programming',
    ],
  },
  {
    company: 'CodigoDelSur',
    role: 'Software Developer',
    location: 'Montevideo, Uruguay',
    date: 'September 2021 — April 2022',
    duration: '7 months',
    logoUrl: '/logos/codigodelsur.png',
    bullets: [
      'Developed serverless applications using Node.js, TypeScript, and AWS for Solstice Innovations\' Equinox flood and home insurance platform, focusing on coastal property coverage',
      'Shipped features in distributed teams using Scrum, agile practices, and CI/CD',
    ],
  },
  {
    company: 'DESIGN-IT GmbH',
    role: 'Software Analyst',
    location: 'Montevideo, Uruguay',
    date: 'November 2019 — September 2021',
    duration: '1 year 10 months',
    logoUrl: '/logos/design-it.png',
    bullets: [
      'Built responsive web applications with Quasar for cross-platform deployment; deployed iOS apps to the App Store',
      'Migrated parts of DB Klassenfahrten\'s group and school trip booking portal from legacy PHP to Vue.js, improving maintainability and UX for teachers and trip organizers',
      'Used Laravel Debugbar to profile a multi-step booking wizard, identified repeated queries on non-indexed tables, and collaborated on indexing changes that significantly reduced page load times',
    ],
  },
  {
    company: 'TiendaMIA',
    role: 'Technical Support Assistant',
    location: 'Montevideo, Uruguay',
    date: 'March 2018 — July 2019',
    duration: '1 year 4 months',
    logoUrl: '/logos/tiendamia.png',
    bullets: [
      'Resolved production issues and maintained PHP/Magento e-commerce applications; fixed frontend bugs (jQuery)',
      'Implemented a cron-based internal email report that proactively notified logistics about orders requiring URSEC review, reducing manual checks for regulated telecom imports',
      'Extended blacklist and keyword rules so Wi-Fi/Bluetooth products were automatically flagged as requiring URSEC/VUCE clearance, improving regulatory compliance and reducing shipping delays',
      'Used CloudWatch for monitoring and alerting of production systems',
    ],
  },
  {
    company: 'SurTec Software',
    role: 'Intern Developer',
    location: 'San Jose, Uruguay',
    date: 'September 2017 — November 2017',
    duration: '3 months',
    logoUrl: '/logos/surtec.png',
    hidden: true,
    bullets: [
      'Developed desktop and mobile applications using .NET, C#, and WPF (WinForms)',
      'Built cross-platform mobile applications with Xamarin and LiteDB for local data storage (including an event app for Expo Prado 2017 published in an early version to Google Play)',
    ],
  },
]
