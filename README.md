# Portfolio (Vite + React + TypeScript + Tailwind CSS)

A personal portfolio website built as a single-page application (SPA), including a home narrative, project list, resume page, biography page, and 404 page.  
The goal of this project is to be deployment-ready with a consistent engineering workflow: style check, typecheck, test, build, and CI.

## Live Demo

[View Portfolio](https://a1354013-alt.github.io/Resume/)

## Screenshots and Project Images

Project images are stored under `client/public/images/projects/` and are referenced from `client/src/data/projects.ts`.
Some screenshots are still placeholders and should be replaced before final public promotion.

Recommended documentation screenshot location: `docs/screenshots/`.
Use the following filenames to keep future documentation easy to maintain:

- Home (`docs/screenshots/home.png`)
- Projects (`docs/screenshots/projects.png`)
- Project dialog (`docs/screenshots/project-dialog.png`)
- Resume (`docs/screenshots/resume.png`)
- 404 (`docs/screenshots/404.png`)

## Tech Stack

- React 19 + TypeScript
- Vite (SPA)
- Tailwind CSS v4
- Express + Helmet (production static file server + security headers)
- Vitest + Testing Library (unit and interaction tests)
- Prettier (code style checking)

## Requirements

- Node.js: `^20.19.0` or `>=22.12.0`
- pnpm: `10.4.1` (see `package.json#packageManager` and `package.json#engines`)

> CI uses Node `20.19.0` and pnpm `10.4.1`. For the most consistent local results, use the same versions.
>
> This project pins `node-linker=hoisted` in `.npmrc` to avoid React 19 "Invalid hook call" issues in Node-based tests under pnpm's symlink layout.
>
> pnpm v10 blocks dependency install scripts by default. This repository allows `esbuild` and `@tailwindcss/oxide` through `package.json#pnpm.onlyBuiltDependencies`. If you still see an "Ignored build scripts" warning, run `pnpm rebuild` once.

## Getting Started

```bash
pnpm install
pnpm dev
```

- Dev server: `http://localhost:3000`

## GitHub Pages Deployment (Static Only)

GitHub Pages cannot run `server/index.ts` (Express). For Pages, this repository builds a pure static SPA output.
The Node/Express build is still kept for regular production deployments.

### Build Outputs (Two Targets)

- Node/Express (default): `pnpm build`
  - Client build output: `dist/public/`
  - Server bundle output: `dist/index.js`
- GitHub Pages (static): `pnpm build:pages`
  - Client build output: `dist/`
  - No server bundle is built or required

### Base Path (Project Site vs User Site / Custom Domain)

This project uses `VITE_BASE` to set Vite's `base` path.

- Project site: the base path should be `/<repo-name>/` (default in `deploy-pages.yml`)
- User site / custom domain: the base path should be `/` (set the repository variable `PAGES_BASE_PATH` to `/`)

### SPA Deep Link / Refresh 404 Fix for GitHub Pages

GitHub Pages does not support SPA fallback routing. This repository includes a complete 404 redirect solution:

- `client/public/404.html` redirects unknown paths to `/?p=/original/path`
- `client/index.html` restores the original path on first load before React renders

### One-Time GitHub Pages Settings

Go to GitHub repository → Settings → Pages → Build and deployment → Source, then select **GitHub Actions**.
After that, push to `main` to trigger deployment.

## Scripts (Local = CI)

CI uses a single entry point: `pnpm ci`. Run the same command locally to keep local verification aligned with CI.

- `pnpm style:check`: runs Prettier check without modifying files
- `pnpm style:fix`: runs Prettier write and updates files
- `pnpm typecheck`: runs `tsc --noEmit`
- `pnpm test`: runs Vitest with jsdom
- `pnpm build`: builds the Vite client and server bundle
- `pnpm ci`: runs `style:check`, `typecheck`, `test`, and `build`
- `pnpm check`: alias for `pnpm ci`

## Project Structure

```text
.
├─ client/
│  ├─ index.html
│  └─ src/
│     ├─ components/        # UI components
│     ├─ data/              # static profile and project data
│     ├─ hooks/             # focus trap, scroll lock, escape key handling, etc.
│     ├─ lib/               # reusable modules such as analytics
│     ├─ pages/             # Home / Projects / Resume / Biography / NotFound
│     ├─ __tests__/         # Vitest tests using jsdom + Testing Library
│     ├─ index.css
│     └─ main.tsx
├─ server/
│  └─ index.ts              # Express production server: static files, SPA fallback, and caching headers
├─ .github/workflows/ci.yml
├─ .env.example
├─ vite.config.ts
├─ vitest.config.ts
└─ package.json
```

## Routes

- `/`: Home
- `/projects`: project list, filters, and project dialog
- `/resume`: Resume page
- `/biography`: Biography page
- `/404`: NotFound page
- Fallback: unknown paths render the NotFound page

## Configuration Notes

### SPA Fallback + Caching (Production Server)

`server/index.ts` uses the following strategy:

- `/assets/*`: long-term cache + `immutable` for Vite hashed assets
- Other static files: short-term cache (1 hour)
- `index.html`: `no-cache` to prevent the SPA shell from being stale after deployment
- Client-side routes: extensionless paths return `index.html`

### SEO Canonical / og:url

`SEOHead` uses `VITE_SITE_URL` first when generating canonical and `og:url` values.
If `VITE_SITE_URL` is not provided, it falls back to the browser's `window.location.origin`.

### Optional Umami Analytics

Umami is loaded only when both of the following environment variables are provided:

- `VITE_ANALYTICS_ENDPOINT`
- `VITE_ANALYTICS_WEBSITE_ID`

The implementation is in `client/src/lib/analytics.ts` and is initialized from `client/src/main.tsx`.
It also includes protection against inserting the script multiple times, such as during HMR or repeated imports.

## Environment Variables

See `.env.example`:

- `VITE_SITE_URL` (optional)
- `VITE_ANALYTICS_ENDPOINT` / `VITE_ANALYTICS_WEBSITE_ID` (optional)
- `PORT` (production server port; default: `3000`)

## Known Limitations

- The project currently includes unit and interaction tests only. It does not include E2E tests with Playwright or Cypress.
- Some project screenshots are still placeholders and should be replaced before final public promotion.
- The project does not use SSR or SSG. It is a pure SPA, so social preview crawlers may only read the default metadata from `client/index.html`.

## Roadmap (Optional)

- Add E2E tests covering key routes and the Project dialog open/close flow
- Replace remaining placeholder screenshots with real project images or architecture diagrams
- Add an asset integrity check after the final screenshots are committed
- Add a minimal ESLint setup if the project later grows into more team-based collaboration
