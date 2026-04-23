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

## Screenshots / Demo

- Demo：部署後可直接貼上網址（建議同時設定 `VITE_SITE_URL`）
- Screenshots：建議截取首頁、專案頁、履歷頁，自行放到 `README.md` 中（或新增到 `client/public/` 後引用）

## Scripts

- `pnpm dev`：開發模式
- `pnpm build`：建置前端 + server bundle
- `pnpm preview`：僅預覽前端靜態輸出
- `pnpm start`：production 啟動 Express 靜態服務
- `pnpm lint`：Prettier 格式檢查
- `pnpm typecheck`：TypeScript typecheck
- `pnpm test`：Vitest smoke tests
