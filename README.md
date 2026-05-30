# Portfolio

[![Deploy to GitHub Pages](https://github.com/DiegoFleitas/DiegoFleitas.github.io/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/DiegoFleitas/DiegoFleitas.github.io/actions/workflows/deploy-pages.yml)

Personal portfolio site. Built with React, TypeScript, Vite, and Tailwind CSS.

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command           | Description                    |
|-------------------|--------------------------------|
| `pnpm dev`        | Start dev server               |
| `pnpm build`      | Type-check and production build|
| `pnpm preview`    | Preview production build       |
| `pnpm test`       | Run tests                      |
| `pnpm test:watch` | Run tests in watch mode        |
| `pnpm lint`       | Run ESLint                     |
| `pnpm lint:fix`   | Run ESLint with auto-fix       |

## Deploy

Deployment is via **GitHub Actions** to **GitHub Pages**. On push to `main`, the workflow runs lint, tests, builds the app, and deploys the `dist` output to Pages.

**One-time setup:** In the repo go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.

## Repo setup (one-time)

1. Create a new GitHub repo (e.g. `portfolio` or `username.github.io` for a user site).
2. Push this project to the repo. For a **user/org site** (`username.github.io`), the app is served from the root; `vite.config.ts` already uses `base: '/'`.
3. For a **project site** (e.g. `username.github.io/portfolio/`), set `base: '/portfolio/'` in `vite.config.ts` (use your repo name).
4. In the repo: **Settings → Pages → Source** → **GitHub Actions**. The first push to `main` will build and deploy.

## License

[MIT](LICENSE)
