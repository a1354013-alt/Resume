# 羅揚文｜作品集（Portfolio）

本專案是可直接上線展示的作品集站：首頁敘事 + 專案頁 + 履歷頁 + 自傳頁，並具備基本工程化配置（build/typecheck/lint/test + CI）。

## 技術棧

- React 19 + TypeScript
- Vite（SPA）
- Tailwind CSS v4（透過 `client/src/index.css` 進行樣式配置）
- Express + Helmet（production 靜態檔案服務）
- Vitest（smoke tests）
- Prettier（格式檢查與 CI lint）

## 安裝

```bash
pnpm install
```

建議環境：Node.js 20+（CI 使用 Node 20），並使用 `package.json` 內宣告的 `pnpm` 版本。

## 本機啟動

```bash
pnpm dev
```

啟動後預設在 `http://localhost:3000`（Vite dev server）。

## 建置 / 預覽 / 上線

### Build

```bash
pnpm build
```

輸出：

- 前端：`dist/public/`
- 伺服器：`dist/index.js`

### Preview（僅前端）

```bash
pnpm preview
```

### Start（production：Express 服務靜態檔案）

```bash
pnpm start
```

## 專案結構

```
.
├─ client/
│  ├─ index.html
│  └─ src/
│     ├─ components/        # 站內區塊元件（Hero/Structure/SEOHead...）
│     ├─ hooks/             # 可重用 hook（focus trap / scroll lock 等）
│     ├─ contexts/          # ThemeContext（dark mode class）
│     ├─ data/              # 個資、專案資料（profile/projects）
│     ├─ pages/             # Home / Projects / Resume / Biography / 404
│     ├─ index.css          # Tailwind v4 入口與主題變數
│     └─ main.tsx
├─ server/
│  └─ index.ts              # Express + Helmet，production 靜態檔案服務
├─ .github/workflows/ci.yml # GitHub Actions：lint/typecheck/test/build
├─ .env.example             # 環境變數範例
├─ vite.config.ts
└─ package.json
```

## 頁面介紹

- `/`：首頁敘事（方法論與能力層次，含 CTA 到專案/履歷/聯絡）
- `/projects`：專案列表 + 詳細對話框（只有真的有 URL 才會顯示 Demo/Repo 按鈕）
- `/resume`：履歷摘要（含聯絡方式與技能重點）
- `/biography`：自傳（工作取向與下一步）
- `/404`：找不到頁面

## 如何替換/調整個人資料

### 個資與聯絡方式

集中在：

- `client/src/data/profile.ts`

### SEO canonical / og:url

`SEOHead` 會依序使用：

1. `VITE_SITE_URL`（建議在部署環境設定）
2. `window.location.origin`（瀏覽器端 fallback）

可在部署平台設定 `VITE_SITE_URL`，例如：

- `https://<你的網域>`

範例可參考：

- `.env.example`

## 環境變數

- `VITE_SITE_URL`：用於 `SEOHead` 產生 canonical / og:url（建議部署時設定）
- `VITE_ANALYTICS_ENDPOINT` / `VITE_ANALYTICS_WEBSITE_ID`：Umami analytics（兩個都有值才會載入）
- `PORT`：production server 監聽埠（預設 `3000`）

## Screenshots / Demo

- Demo：部署後可直接貼上網址（建議同時設定 `VITE_SITE_URL`）
- Screenshots：建議截取首頁、專案頁、履歷頁，自行放到 `README.md` 中（可直接用外部圖床連結；若要走 Vite public，可自行建立 `client/public/` 並放檔案）

## 部署注意事項（快取/靜態檔案）

production 的 Express 靜態檔案快取策略：

- `dist/public/assets/*`：長快取（1 年）+ `immutable`（適合 Vite hashed assets）
- `dist/public/*`（非 assets）：短快取（1 小時）
- `index.html`：`no-cache` + `must-revalidate`（避免 SPA shell 部署後被卡住）

## Scripts

- `pnpm dev`：開發模式
- `pnpm build`：建置前端 + server bundle
- `pnpm preview`：僅預覽前端靜態輸出
- `pnpm start`：production 啟動 Express 靜態服務
- `pnpm format`：Prettier 自動格式化
- `pnpm format:check`：Prettier 格式檢查（CI 使用）
- `pnpm lint`：同 `format:check`（保留 alias）
- `pnpm typecheck`：TypeScript typecheck
- `pnpm test`：Vitest smoke tests
- `pnpm check`：format:check + typecheck + test + build
- `pnpm ci`：同 `check`（CI 方便使用）
