# Portfolio (Vite + React + TypeScript + Tailwind CSS)

個人作品集網站（SPA）：首頁敘事 / 專案列表 / 履歷 / 自傳 / 404。  
目標是「可直接部署」且工程配置一致：style check / typecheck / test / build + CI。

## Demo

- Live demo: （尚未公開部署；完成部署後請填入實際連結）

## Screenshots

（目前 repo 未包含實際截圖；建議放在 `docs/screenshots/`，並使用下列檔名方便維護）

- Home (`docs/screenshots/home.png`)
- Projects (`docs/screenshots/projects.png`)
- Project dialog (`docs/screenshots/project-dialog.png`)
- Resume (`docs/screenshots/resume.png`)
- 404 (`docs/screenshots/404.png`)

## Tech Stack

- React 19 + TypeScript
- Vite (SPA)
- Tailwind CSS v4
- Express + Helmet（production 靜態檔服務 + security headers）
- Vitest + Testing Library（單元/互動測試）
- Prettier（程式風格檢查）

## Requirements

- Node.js: `^20.19.0`（或 `>=22.12.0`）
- pnpm: `10.4.1`（見 `package.json#packageManager` / `package.json#engines`）

> CI 使用 Node `20.19.0` 與 pnpm `10.4.1`，本機請盡量對齊避免行為差異。
>
> 本專案在 `.npmrc` 固定使用 `node-linker=hoisted`：避免 React 19 在 pnpm 的 symlink layout 下出現 Node 測試的「Invalid hook call」。
>
> pnpm v10 會預設阻擋 dependency install scripts；本 repo 透過 `package.json#pnpm.onlyBuiltDependencies` 允許 `esbuild` / `@tailwindcss/oxide`。若你仍看到 "Ignored build scripts" 警告，執行一次 `pnpm rebuild` 即可。

## Getting Started

```bash
pnpm install
pnpm dev
```

- Dev server: `http://localhost:3000`

## GitHub Pages Deployment (Static Only)

GitHub Pages cannot run `server/index.ts` (Express). For Pages, this repo builds a pure static SPA output.
The Node/Express build is still kept for normal deployments.

### Build outputs (two targets)

- Node/Express (default): `pnpm build`
  - Client build output: `dist/public/`
  - Server bundle output: `dist/index.js`
- GitHub Pages (static): `pnpm build:pages`
  - Client build output: `dist/`
  - No server bundle is built/required

### Base path (project site vs user site/custom domain)

This project uses `VITE_BASE` to set Vite's `base` path.

- Project site: base should be `/<repo-name>/` (default in `deploy-pages.yml`)
- User site / custom domain: base should be `/` (set repo variable `PAGES_BASE_PATH` to `/`)

### SPA deep link / refresh 404 fix (Pages)

GitHub Pages does not support SPA fallback routing. This repo includes a complete 404 redirect solution:

- `client/public/404.html` redirects unknown paths to `/?p=/original/path`
- `client/index.html` restores the original path on first load (before React renders)

### One-time GitHub Pages settings

GitHub repo → Settings → Pages → Build and deployment → Source: select **GitHub Actions**.
Then push to `main` to trigger deployment.

## Scripts (Local = CI)

CI 僅跑單一入口：`pnpm ci`，本機請用同一條命令確保一致。

- `pnpm style:check`: Prettier check（不改檔）
- `pnpm style:fix`: Prettier write（會改檔）
- `pnpm typecheck`: `tsc --noEmit`
- `pnpm test`: Vitest（jsdom）
- `pnpm build`: Vite build + server bundle
- `pnpm ci`: `style:check` + `typecheck` + `test` + `build`
- `pnpm check`: alias to `pnpm ci`

## Project Structure

```
.
├─ client/
│  ├─ index.html
│  └─ src/
│     ├─ components/        # UI components
│     ├─ data/              # profile/projects 靜態資料
│     ├─ hooks/             # focus trap / scroll lock / escape key 等
│     ├─ lib/               # analytics 等可重用模組
│     ├─ pages/             # Home / Projects / Resume / Biography / NotFound
│     ├─ __tests__/         # Vitest tests（jsdom + Testing Library）
│     ├─ index.css
│     └─ main.tsx
├─ server/
│  └─ index.ts              # Express production server（static + SPA fallback + caching headers）
├─ .github/workflows/ci.yml
├─ .env.example
├─ vite.config.ts
├─ vitest.config.ts
└─ package.json
```

## Routes

- `/`: Home
- `/projects`: Projects list + filters + dialog
- `/resume`: Resume page
- `/biography`: Biography page
- `/404`: NotFound page
- (fallback): unknown paths render NotFound

## Configuration Notes

### SPA fallback + caching（production server）

`server/index.ts` 的策略：

- `/assets/*`：長快取 + `immutable`（Vite hashed assets）
- 其他靜態檔：短快取（1 小時）
- `index.html`：`no-cache`（避免部署後 SPA shell 被快取）
- client-side routes：無副檔名的路徑會回傳 `index.html`

### SEO canonical / og:url

`SEOHead` 會優先使用 `VITE_SITE_URL` 產生 canonical / og:url；未提供時 fallback 到瀏覽器的 `window.location.origin`。

### Optional Umami analytics

當且僅當以下兩個 env 都存在時才會載入 Umami：

- `VITE_ANALYTICS_ENDPOINT`
- `VITE_ANALYTICS_WEBSITE_ID`

實作在 `client/src/lib/analytics.ts`，由 `client/src/main.tsx` 啟動，並包含「避免重複插入 script」的保護（例如 HMR / 重複 import）。

## Environment Variables

見 `.env.example`：

- `VITE_SITE_URL`（可選）
- `VITE_ANALYTICS_ENDPOINT` / `VITE_ANALYTICS_WEBSITE_ID`（可選）
- `PORT`（production server port；預設 3000）

## Known Limitations

- 目前僅提供單元/互動測試，未包含 E2E（Playwright/Cypress）。
- `Projects` 頁的「精選專案」區塊目前不會跟著搜尋/篩選一起變動（功能上可接受，但可能與直覺不同）。
- 無 SSR / SSG（純 SPA）。

## Roadmap (Optional)

- 加入 E2E 測試（覆蓋關鍵路由與 Project dialog 開關流程）
- 補齊實際 Demo link + screenshots
- 視需求加入最小 ESLint（若未來團隊協作增多）
