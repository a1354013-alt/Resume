export const projects = [

  {
    id: "pdf-annotation-engine",
    name: "PDF 註記與渲染引擎",
    tagline:
      "可重用的高解析 PDF 渲染與註記系統，支援多工具標註並封裝為 npm 套件。",
    role: "全端工程師",
    tier: "gold",
    featured: true,

    githubUrl:
      "https://github.com/a1354013-alt/pdf-annotation-engine",

    technologies: [
      "TypeScript",
      "PDF.js",
      "Canvas",
      "Vite",
      "Vitest",
      "GitHub Actions"
    ],

    details: {

      problem:
        "現代 Web 系統需要可客製化的 PDF 顯示與註記能力，但現有工具難以擴充與整合。",

      solution:
        "使用 PDF.js 與 Canvas 建立模組化 PDF 渲染核心，實作多種註記工具並封裝為可重用 npm 套件。",

      coreFeatures: [

        "高解析 PDF 渲染（pdf.js + Web Worker）",
        "自由繪圖工具（Draw Tool）",
        "文字標註工具（Text Tool）",
        "橡皮擦工具（Eraser Tool）",
        "縮放與頁面導航功能",
        "npm 套件封裝（支援 ESM / CJS）",
        "CI Smoke Test 驗證交付品質"

      ],

      technicalHighlights: [

        "採用模組化架構設計（Loader / Renderer / Tools）",
        "建立工具插件式註記系統",
        "導入 npm pack dry-run 驗證流程",
        "建立 verify-delivery 與 smoke test 流程",
        "確保 install → build → test → publish 可重現"

      ],

      architecture: [

        "PdfLoader → PageRenderer → ViewportManager",
        "Annotation Layer（Draw / Text / Eraser）",
        "Canvas-based rendering pipeline"

      ],

      result:
        "成功建立可重用 PDF 引擎，具備商業級整合潛力，可應用於企業級文件系統。",

      challenges:
        "需處理高解析 Canvas 效能與工具座標同步問題。",

      nextSteps:
        "規劃新增 Highlight 工具、頁面縮圖與大型文件效能優化。"
    }
  },



  {
    id: "smart-organizer",
    name: "智慧檔案整理系統",
    tagline:
      "以 Python 建立的智慧檔案整理工具，支援分類、重複偵測與長期未使用檔案分析。",
    role: "後端工程師",
    tier: "gold",
    featured: true,

    githubUrl:
      "https://github.com/a1354013-alt/smart_organizer",

    technologies: [
      "Python",
      "SQLite",
      "Pytest",
      "MyPy",
      "Ruff",
      "GitHub Actions"
    ],

    details: {

      problem:
        "長期累積的檔案缺乏分類與整理機制，導致儲存空間浪費與資料管理困難。",

      solution:
        "建立模組化檔案整理系統，自動掃描資料夾並分類檔案，偵測重複與閒置資料。",

      coreFeatures: [

        "依副檔名自動分類檔案",
        "透過 Hash（MD5 / SHA）偵測重複檔案",
        "分析長期未使用檔案",
        "批次整理資料夾",
        "產生整理報告與統計資訊",
        "支援自訂分類規則"

      ],

      technicalHighlights: [

        "採用分層模組化架構（core / processor / storage / classification）",
        "導入 MyPy 靜態型別檢查",
        "使用 Ruff 進行程式碼品質控管",
        "建立 Pytest 自動化測試",
        "導入 GitHub Actions CI/CD Pipeline"

      ],

      architecture: [

        "Scanner → Processor → Classification → Storage",
        "SQLite Metadata 儲存層",
        "Structured Logging 管理流程"

      ],

      result:
        "有效提升檔案管理效率，降低手動整理成本。",

      challenges:
        "需設計安全檢查機制，避免誤刪重要檔案。",

      nextSteps:
        "規劃加入排程系統與 GUI 使用者介面。"
    }
  },



  {
    id: "finance-dashboard",
    name: "AI 財務分析儀表板",
    tagline:
      "整合 AI 分析與股票資料的全端財務管理平台。",
    role: "全端工程師",
    tier: "gold",
    featured: true,

    githubUrl:
      "https://github.com/a1354013-alt/personal-finance-dashboard",

    technologies: [
      "FastAPI",
      "Vue 3",
      "SQLite",
      "JWT",
      "Pytest",
      "Vitest",
      "GitHub Actions"
    ],

    details: {

      problem:
        "使用者需要整合式平台管理收支、預算與投資資訊，並取得智慧化分析建議。",

      solution:
        "建立全端財務儀表板，整合股票資料 API 與 AI 分析模組。",

      coreFeatures: [

        "JWT 身份驗證與帳號管理",
        "支出與預算分類管理",
        "月度財務統計儀表板",
        "股票觀察清單整合",
        "AI 財務分析建議",
        "Provider-based 資料抽象架構"

      ],

      technicalHighlights: [

        "建立 routers / services / providers 分層架構",
        "設計 Provider abstraction 系統",
        "整合外部股票 API 並加入 retry 機制",
        "使用 Alembic 管理資料庫 migration",
        "建立完整自動化測試流程"

      ],

      architecture: [

        "Vue Frontend → FastAPI Backend",
        "Service Layer → Provider Layer",
        "SQLite + Migration System"

      ],

      result:
        "完成可擴充財務分析平台，具備整合多資料來源能力。",

      challenges:
        "需確保外部 API 不穩定時仍能維持系統可靠性。",

      nextSteps:
        "規劃加入投資風險分析與預測模型。"
    }
  },



  {
    id: "covid-cough-detection",
    name: "COVID-19 咳嗽聲音偵測系統",
    tagline:
      "基於 AI 的聲音分析平台，支援音訊上傳與模型推論。",
    role: "全端工程師",
    tier: "silver",

    githubUrl:
      "https://github.com/a1354013-alt/covid_cough_detection_complete_with_dataset",

    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "GitHub Actions"
    ],

    details: {

      problem:
        "需要建立穩定的音訊驗證與推論流程，以確保模型輸入品質。",

      solution:
        "設計完整音訊處理流程，支援上傳、驗證與模型推論。",

      coreFeatures: [

        "安全音訊上傳 API",
        "音訊格式驗證",
        "檔案大小與長度檢查",
        "模型推論流程",
        "結果回傳與前端顯示",
        "Rate limit middleware"

      ],

      technicalHighlights: [

        "建立 contract-based API 驗證流程",
        "採用 middleware-based 架構",
        "導入 CI pipeline 自動測試",
        "建立 smoke test 驗證流程"

      ],

      result:
        "建立可擴充的 AI 音訊推論平台。",

      challenges:
        "需確保音訊前處理與模型推論一致性。",

      nextSteps:
        "規劃加入更多資料集與模型優化。"
    }
  }

];