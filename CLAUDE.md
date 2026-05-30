# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # start dev server at localhost:5173
pnpm build        # type-check + production build
pnpm preview      # preview production build
pnpm test         # run unit tests (vitest, single run)
pnpm test:watch   # run unit tests in watch mode
pnpm lint         # ESLint
pnpm lint:fix     # ESLint with auto-fix
pnpm test:analytics:e2e  # Playwright e2e for analytics (requires running dev server)
```

Run a single test file: `pnpm vitest run src/utils/analytics.test.ts`

## Architecture

**Stack:** React 19 + TypeScript + Vite + Tailwind CSS v4. No router — single-page, scroll-based.

**Data layer** (`src/data/`): plain TypeScript constants — no API calls. All site content lives here:
- `site.ts` — name, tagline, contact links, CV PDF filename
- `about.ts` — about section paragraph
- `experience.ts` — work history (`hidden: true` entries are not rendered)
- `education.ts` — education entries
- `projects.ts` — `projectsApps` array rendered in the Projects section

**Components** (`src/components/`): one file per section (`Hero`, `About`, `Experience`, `Education`, `Projects`, `Nav`, `Footer`, `Background`). Each section component imports directly from `src/data/`.

**Theme:** dark/light toggle via `data-theme` attribute on `<html>`. `ThemeContext` + `ThemeProvider` (in `src/context/`) manage state; CSS variables in `src/index.css` define the palette per theme. Theme preference is persisted to `localStorage`; initial value is read via an inline script in `index.html` to prevent flash.

**Analytics:** GA4 via a hand-rolled gtag helper (`src/utils/analytics.ts`). Requires `VITE_GA_ID` env var — no-op without it. `initAnalytics()` is called in `main.tsx`; `trackEvent()` is called from components. `App.tsx` uses `IntersectionObserver` to fire `view_section` events once per section.

**Motion:** `motion` (Framer Motion v12) is used in `Hero.tsx` and `src/lib/motion.ts` for entry animations. `useReducedMotion` gates all animations.

**Resume PDF:** placed in `public/` as `Diego_Fleitas_Resume.pdf`. The filename is referenced in `src/data/site.ts` (`cvPdfDownloadFilename`).

**Deployment:** GitHub Actions → GitHub Pages on push to `main`. Runs lint, tests, build, then deploys `dist/`.
