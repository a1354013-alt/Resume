export interface Project {
  id: string;
  name: string;
  tagline: string;
  role: string;
  category: "enterprise" | "ai" | "learning";
  tier: "gold" | "silver" | "bronze";
  technologies: string[];
  metrics: string;
  featured: boolean;
  details: {
    problem: string;
    solution: string;
    contribution: string;
    highlights: string[];
    result: string;
    challenges: string;
    nextSteps: string;
    demoUrl?: string;
    githubUrl?: string;
  };
}

export const projects: Project[] = [
  {
    id: "pdf-annotation-engine",
    name: "PDF 註記與渲染引擎",
    tagline: "可重用的高解析 PDF 渲染與註記系統，支援多工具標註並封裝為 npm 套件。",
    role: "全端工程師",
    category: "enterprise",
    tier: "gold",
    technologies: ["TypeScript", "PDF.js", "Canvas", "Vite", "Vitest", "GitHub Actions"],
    metrics: "完成可重用 npm library，支援 ESM/CJS，並建立 CI Smoke Test 驗證交付品質",
    featured: true,
    details: {
      problem: "現代 Web 系統需要可客製化的 PDF 顯示與註記能力，但現有工具難以擴充與整合。",
      solution: "使用 PDF.js 與 Canvas 建立模組化 PDF 渲染核心，實作多種註記工具並封裝為可重用 npm 套件。",
      contribution: "負責 PDF 載入、頁面渲染、註記工具、套件封裝與 CI 驗證流程設計。",
      highlights: [
        "高解析 PDF 渲染（pdf.js + Web Worker）",
        "實作 Draw / Text / Eraser 註記工具",
        "採用 Loader / Renderer / Tools 模組化架構",
        "支援 npm 套件封裝（ESM / CJS）",
        "建立 npm pack dry-run、verify-delivery 與 smoke test 流程",
      ],
      result: "成功建立具備商業級整合潛力的 PDF 引擎，可應用於企業文件系統。",
      challenges: "需處理高解析 Canvas 效能、PDF 頁面縮放與工具座標同步問題。",
      nextSteps: "規劃新增 Highlight 工具、頁面縮圖與大型文件效能優化。",
      githubUrl: "https://github.com/a1354013-alt/pdf-annotation-engine",
    },
  },
  {
    id: "smart-organizer",
    name: "智慧檔案整理系統",
    tagline: "以 Python 建立的智慧檔案整理工具，支援分類、重複偵測與長期未使用檔案分析。",
    role: "後端工程師",
    category: "enterprise",
    tier: "gold",
    technologies: ["Python", "SQLite", "Pytest", "MyPy", "Ruff", "GitHub Actions"],
    metrics: "支援自動分類、重複檔案偵測與閒置檔案分析，並具備完整測試與 CI 流程",
    featured: true,
    details: {
      problem: "長期累積的檔案缺乏分類與整理機制，導致儲存空間浪費與資料管理困難。",
      solution: "建立模組化檔案整理系統，自動掃描資料夾、分類檔案、偵測重複資料並提供清理建議。",
      contribution: "負責核心掃描流程、分類邏輯、儲存層設計、測試流程與 CI/CD 設定。",
      highlights: [
        "依副檔名與規則自動分類檔案",
        "透過 Hash（MD5 / SHA）偵測重複檔案",
        "分析長期未使用檔案並提供安全整理建議",
        "採用 core / processor / storage / classification 分層架構",
        "導入 Pytest、MyPy、Ruff 與 GitHub Actions",
      ],
      result: "有效提升檔案管理效率，降低手動整理成本。",
      challenges: "需設計安全檢查機制，避免誤刪重要檔案。",
      nextSteps: "規劃加入排程系統、GUI 介面與更多智慧分析模組。",
      githubUrl: "https://github.com/a1354013-alt/smart_organizer",
    },
  },
  {
    id: "finance-dashboard",
    name: "AI 財務分析儀表板",
    tagline: "整合 AI 分析與股票資料的全端財務管理平台。",
    role: "全端工程師",
    category: "enterprise",
    tier: "gold",
    technologies: ["FastAPI", "Vue 3", "SQLite", "JWT", "Pytest", "Vitest", "GitHub Actions"],
    metrics: "完成全端財務平台，整合 JWT、股票資料、AI Insights、Provider abstraction 與 CI 測試流程",
    featured: true,
    details: {
      problem: "使用者需要整合式平台管理收支、預算與投資資訊，並取得智慧化分析建議。",
      solution: "建立全端財務儀表板，整合股票資料 API、AI 分析模組與可切換 Provider 架構。",
      contribution: "負責系統架構設計、後端 API、前端儀表板、AI insights、股票資料整合與測試流程。",
      highlights: [
        "JWT 身份驗證與帳號管理",
        "支出、預算與月度財務統計",
        "股票觀察清單與外部市場資料整合",
        "設計 Provider abstraction，支援 AI / Mock / Fallback provider",
        "建立 pytest、vitest 與 GitHub Actions CI 流程",
      ],
      result: "完成可擴充財務分析平台，具備整合多資料來源與 AI 建議能力。",
      challenges: "需確保外部 API 不穩定時仍能維持系統可靠性。",
      nextSteps: "規劃加入投資風險分析、預測模型與更完整的資產配置建議。",
      githubUrl: "https://github.com/a1354013-alt/personal-finance-dashboard",
    },
  },
  {
    id: "covid-cough-detection",
    name: "COVID-19 咳嗽聲音偵測系統",
    tagline: "基於 AI 的聲音分析平台，支援音訊上傳、驗證與模型推論。",
    role: "全端工程師",
    category: "ai",
    tier: "silver",
    technologies: ["React", "TypeScript", "Node.js", "Python", "GitHub Actions"],
    metrics: "完成端到端 AI 音訊分析流程，包含上傳驗證、推論處理、結果回傳與 CI 測試",
    featured: false,
    details: {
      problem: "需要建立穩定的音訊驗證與推論流程，以確保模型輸入品質與結果可靠性。",
      solution: "設計完整音訊處理平台，支援上傳、格式驗證、大小檢查、推論流程與結果顯示。",
      contribution: "負責前後端流程、音訊驗證 middleware、推論串接、API 測試與 CI 驗證。",
      highlights: [
        "安全音訊上傳 API",
        "音訊格式、大小與長度檢查",
        "模型推論流程整合",
        "Rate limit 與安全驗證",
        "建立 contract-based API 測試與 smoke test",
      ],
      result: "建立可擴充的 AI 音訊推論平台。",
      challenges: "需確保音訊前處理與模型推論流程一致，避免無效輸入影響結果。",
      nextSteps: "規劃加入更多資料集、模型優化與推論效能改善。",
      githubUrl: "https://github.com/a1354013-alt/covid_cough_detection_complete_with_dataset",
    },
  },
];