# Portfolio

Personal portfolio site. Built with React, TypeScript, Vite, and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Deploy

Deployment is via **GitHub Actions** to **GitHub Pages**. On push to `main`, the workflow builds the app (with `GITHUB_PAGES=true` so the base path is correct) and deploys the `dist` artifact to Pages.

After creating the repo, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**.

## Repo setup (one-time)

1. Create a new GitHub repo (e.g. `portfolio` or `diegofleitas.github.io` for a user site).
2. If the repo is **not** `username.github.io`, the site will be at `https://<username>.github.io/<repo-name>/`. The workflow already uses base path `/${repoName}/` (see `vite.config.ts`; set `repoName` to your repo name).
3. For a user/org site (`username.github.io`), change `base` in `vite.config.ts` to `base: '/'` and set `repoName` or remove the env check.
4. Push the contents of `portfolio/` to the new repo (e.g. clone the new repo, copy contents of `portfolio/` into it, commit and push to `main`).
5. In the repo: **Settings → Pages → Source** → **GitHub Actions**. The first push to `main` will build and deploy.
