# Portfolio

[![Deploy to GitHub Pages](https://github.com/DiegoFleitas/DiegoFleitas.github.io/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/DiegoFleitas/DiegoFleitas.github.io/actions/workflows/deploy-pages.yml)

Personal portfolio site for Diego Fleitas. It is a single-page, scroll-based app (no router) built with React 19, TypeScript, Vite, and Tailwind CSS v4, deployed to GitHub Pages.

## Tech stack

- React 19 + TypeScript
- Vite 8 (dev server and build)
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- Motion (Framer Motion v12) for entry animations
- Three.js for the animated background
- Swiper for the image carousel
- Vitest + Testing Library for unit tests, Playwright for analytics e2e
- ESLint (flat config) with `typescript-eslint`

## Prerequisites

- Node.js 24 (see `.nvmrc`)
- pnpm 11.5.0 (pinned via the `packageManager` field; `corepack enable` will provide it)

## Getting started

```bash
pnpm install
pnpm dev
```

The dev server runs at `http://localhost:5173`. It binds to all interfaces (`server.host` is `true` in `vite.config.ts`), so on WSL you can reach it from a Windows browser via the WSL IP.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Start the Vite dev server (port 5173) |
| `pnpm build` | Type-check (`tsc -b`) then build to `dist/` |
| `pnpm preview` | Serve the production build locally |
| `pnpm test` | Run unit tests once (Vitest) |
| `pnpm test:watch` | Run unit tests in watch mode |
| `pnpm test:analytics:e2e` | Run the Playwright analytics e2e suite |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Run ESLint with `--fix` |

Run a single unit test file:

```bash
pnpm vitest run src/utils/analytics.test.ts
```

## Project structure

```
src/
  data/         Site content as plain TypeScript constants (see below)
  components/   One component per section (Hero, About, Experience, etc.)
  context/      ThemeContext / theme state
  lib/          Shared helpers (motion presets, logo helper)
  utils/        analytics.ts (GA4 helper), downloadResumePdf.ts
  e2e/          Playwright analytics spec
  test/         Vitest setup
  App.tsx       Composes sections, fires view_section analytics events
  main.tsx      Entry point; initializes analytics
public/         Static assets, including the resume PDF
```

## Editing content

All site content is plain data in `src/data/`. No API calls, no CMS.

- `site.ts`: name, tagline, contact links, resume PDF filename
- `about.ts`: the About section paragraph
- `experience.ts`: work history (`hidden: true` entries are not rendered)
- `education.ts`: education entries
- `projects.ts`: the projects shown in the Projects section

The resume PDF lives in `public/` (`Diego-Fleitas-Resume.pdf`); its filename is referenced from `src/data/site.ts`.

## Theming

Dark and light themes are toggled via a `data-theme` attribute on `<html>`. State is managed by `ThemeContext`, palettes are defined as CSS variables in `src/index.css`, and the preference is persisted to `localStorage`. An inline script in `index.html` applies the saved theme before paint to avoid a flash.

## Analytics

Analytics use GA4 through a hand-rolled gtag helper (`src/utils/analytics.ts`). The Measurement ID comes from the `VITE_GA_ID` environment variable. Without it the helper is a no-op, so local development needs no setup. To enable it locally, create a `.env` file:

```bash
VITE_GA_ID=G-XXXXXXXXXX
```

In CI, `VITE_GA_ID` is injected at build time from the `github-pages` environment variables.

## Testing

- Unit tests run under Vitest in a jsdom environment (`pnpm test`).
- The analytics e2e suite (`pnpm test:analytics:e2e`) uses Playwright. Its config (`playwright.analytics.config.ts`) starts its own Vite server on `http://127.0.0.1:4173`, so you do not need to start one yourself. First-time runs may require installing the Playwright browsers with `pnpm exec playwright install`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy-pages.yml`, which installs dependencies with a frozen lockfile, runs lint, runs tests, builds, and deploys `dist/` to GitHub Pages. The workflow can also be run manually via `workflow_dispatch`. Enable Pages once under **Settings > Pages > Source > GitHub Actions**.

## License

[MIT](LICENSE)
