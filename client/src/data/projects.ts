export interface Project {
  id: string;
  name: string;
  tagline: string;
  role: string;
  category: "enterprise" | "ai" | "learning";
  tier: "production" | "gold" | "silver";
  tierLabel: string;
  technologies: string[];
  metrics: string;
  featured: boolean;
  images?: ProjectImage[];
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

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export const projects: Project[] = [
  {
    id: "erp-change-management",
    name: "工程變更追加減管理系統",
    tagline:
      "工程變更與預算追加減管理系統，支援變更資料管理、預算調整、流程控管與狀態追蹤。",
    role: "全端工程師",
    category: "enterprise",
    tier: "production",
    tierLabel: "已上線專案",
    technologies: ["Go", "Vue", "MySQL", "JWT", "RESTful API"],
    metrics: "完成工程變更流程 Web 化，使工程資料流程可視化並提升維護效率。",
    featured: true,
    details: {
      problem:
        "工程變更與追加減資料量大且流程複雜，若以人工或分散工具管理，容易造成狀態不一致、追蹤困難與維護成本升高。",
      solution:
        "建置 Web 化工程變更管理系統，整合資料管理、預算調整與流程狀態追蹤，並以角色權限與資料驗證確保流程一致性。",
      contribution:
        "負責前後端整合與核心流程設計，包含 RESTful API、JWT 驗證、角色權限、資料驗證與流程狀態控制。",
      highlights: [
        "建立工程變更與追加減流程管理",
        "實作多階段流程狀態控制",
        "支援角色權限管理",
        "建立預算資料調整與資料驗證機制",
        "支援大量工程資料操作與流程控管",
        "強化資料一致性與版本控制",
      ],
      result:
        "完成工程變更流程 Web 化，使複雜工程資料流程可視化並提升維護效率。",
      challenges:
        "需在高資料量情境下維持流程狀態一致性，並避免併發更新造成版本衝突與資料不一致。",
      nextSteps:
        "導入更完整的歷程稽核與報表模組，提升跨部門查詢效率與追蹤能力。",
    },
  },
  {
    id: "erp-procurement-system",
    name: "企業採購管理系統",
    tagline:
      "企業採購流程管理系統，支援採購申請、流程控管、權限角色與狀態管理。",
    role: "全端工程師",
    category: "enterprise",
    tier: "production",
    tierLabel: "已上線專案",
    technologies: ["Go", "Vue", "MySQL", "JWT", "Swagger", "RESTful API"],
    metrics: "提升採購流程透明度與系統維護效率，使資料與流程更容易追蹤。",
    featured: true,
    details: {
      problem:
        "採購流程涉及多角色、多階段狀態與大量表單資料，若缺乏一致的流程控管與權限管理，易造成追蹤困難與操作風險。",
      solution:
        "建置採購流程管理系統，提供 Web 化操作介面與模組化資料模型，並以 JWT 驗證、角色權限與流程狀態機制確保流程可控。",
      contribution:
        "負責前後端功能開發與 API 設計，整合 Swagger 文件，強化表單驗證與錯誤處理，提升可維護性與交付品質。",
      highlights: [
        "建立採購流程 Web 化操作介面",
        "設計 RESTful API 與模組化資料模型",
        "實作 JWT 登入驗證與角色權限控管",
        "建立流程狀態控制機制",
        "整合 Swagger API 文件",
        "強化表單驗證與錯誤處理",
      ],
      result: "提升採購流程透明度與系統維護效率，使資料與流程更容易追蹤。",
      challenges:
        "流程狀態與權限交錯複雜，需避免越權操作與錯誤流轉，並維持前後端規則一致。",
      nextSteps:
        "擴充採購分析報表與通知機制，並將常用流程抽象為可配置的流程模板。",
    },
  },
  {
    id: "erp-approval-system",
    name: "企業簽核管理系統",
    tagline: "多層簽核流程系統，支援角色權限、流程狀態與簽核追蹤管理。",
    role: "全端工程師",
    category: "enterprise",
    tier: "production",
    tierLabel: "已上線專案",
    technologies: ["Go", "Vue", "MySQL", "JWT", "RESTful API"],
    metrics: "提升企業簽核流程透明度，使簽核進度與操作權限更容易控管。",
    featured: true,
    details: {
      problem:
        "企業簽核流程常見多層級與多角色參與，若無清晰的狀態流轉與歷程追蹤，容易發生重複簽核、越權操作或進度不透明。",
      solution:
        "建置多層簽核系統，透過角色權限、簽核狀態流轉與歷程追蹤，讓流程可視化並降低錯誤操作風險。",
      contribution:
        "設計簽核狀態機制與權限控管（admin/manager/user），並落實重複簽核防護與流程查詢/追蹤功能。",
      highlights: [
        "實作多層簽核流程",
        "支援 admin / manager / user 權限控管",
        "建立簽核狀態流轉機制",
        "防止重複簽核與錯誤流程操作",
        "提供流程查詢與歷程追蹤功能",
      ],
      result: "提升企業簽核流程透明度，使簽核進度與操作權限更容易控管。",
      challenges:
        "簽核流程需嚴格限制狀態轉移，並處理併發操作與例外狀況，避免流程卡死或資料不一致。",
      nextSteps:
        "加入簽核規則配置與通知（Email/IM），並擴充跨系統整合的簽核入口。",
    },
  },
  {
    id: "erp-leave-system",
    name: "企業請假管理系統",
    tagline: "企業請假管理系統，支援請假申請、簽核流程與假別管理。",
    role: "全端工程師",
    category: "enterprise",
    tier: "production",
    tierLabel: "已上線專案",
    technologies: ["Go", "Vue", "MySQL", "JWT", "RESTful API"],
    metrics: "成功建立完整請假流程管理系統，使請假流程透明化並提升管理效率。",
    featured: true,
    details: {
      problem:
        "請假申請涉及假別規則、簽核層級與狀態追蹤，若缺乏一致流程與權限控管，容易造成管理負擔與資料難以追溯。",
      solution:
        "建置請假管理系統，整合請假申請、假別管理與多層簽核流程，並以角色權限與狀態機制確保流程一致與可追蹤。",
      contribution:
        "負責前後端功能開發、流程狀態設計與權限控管，並建立假別管理與歷程查詢機制。",
      highlights: [
        "建立請假申請與簽核流程",
        "支援多層簽核流程",
        "實作角色權限管理",
        "建立請假狀態流轉機制",
        "支援假別管理與歷程查詢",
      ],
      result: "成功建立完整請假流程管理系統，使請假流程透明化並提升管理效率。",
      challenges:
        "需兼顧不同角色的操作權限、簽核路徑與假別規則，並避免狀態錯誤導致流程無法完成。",
      nextSteps:
        "擴充行事曆整合與報表匯出，並加入更細緻的假別規則與自動化審核條件。",
    },
  },
  {
    id: "pdf-annotation-engine",
    name: "PDF 註記與渲染引擎",
    tagline:
      "可重用的高解析 PDF 渲染與註記系統，支援多工具標註並封裝為 npm 套件。",
    role: "全端工程師",
    category: "enterprise",
    tier: "gold",
    tierLabel: "金牌作品",
    technologies: [
      "TypeScript",
      "PDF.js",
      "Canvas",
      "Vite",
      "Vitest",
      "GitHub Actions",
    ],
    metrics:
      "完成可重用 npm library，支援 ESM/CJS，並建立 CI Smoke Test 驗證交付品質",
    featured: true,
    images: [
      {
        src: "/images/projects/pdf-engine/cover.png",
        alt: "PDF 註記與渲染引擎首頁畫面",
      },
      {
        src: "/images/projects/pdf-engine/annotation.png",
        alt: "PDF 標註工具列與註記畫面",
      },
      {
        src: "/images/projects/pdf-engine/export.png",
        alt: "PDF 匯出與下載畫面",
      },
    ],
    details: {
      problem:
        "現代 Web 系統需要可客製化的 PDF 顯示與註記能力，但現有工具難以擴充與整合。",
      solution:
        "使用 PDF.js 與 Canvas 建立模組化 PDF 渲染核心，實作多種註記工具並封裝為可重用 npm 套件。",
      contribution:
        "負責 PDF 載入、頁面渲染、註記工具、套件封裝與 CI 驗證流程設計。",
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
    tagline:
      "以 Python 建立的智慧檔案整理工具，支援分類、重複偵測與長期未使用檔案分析。",
    role: "後端工程師",
    category: "enterprise",
    tier: "gold",
    tierLabel: "金牌作品",
    technologies: [
      "Python",
      "SQLite",
      "Pytest",
      "MyPy",
      "Ruff",
      "GitHub Actions",
    ],
    metrics:
      "支援自動分類、重複檔案偵測與閒置檔案分析，並具備完整測試與 CI 流程",
    featured: true,
    images: [
      {
        src: "/images/projects/smart-organizer/dashboard.png",
        alt: "智慧檔案整理系統控制面板",
      },
      {
        src: "/images/projects/smart-organizer/rules.png",
        alt: "智慧檔案整理系統規則設定畫面",
      },
    ],
    details: {
      problem:
        "長期累積的檔案缺乏分類與整理機制，導致儲存空間浪費與資料管理困難。",
      solution:
        "建立模組化檔案整理系統，自動掃描資料夾並分類檔案，偵測重複與閒置資料。",
      contribution:
        "負責核心掃描流程、分類邏輯、儲存層設計、測試流程與 CI/CD 設定。",
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
    id: "knowledge-workspace",
    name: "Knowledge Workspace — 智慧文件與知識整理平台",
    tagline:
      "整合文件管理、知識庫、操作紀錄與 AI 協助功能的全端 Workspace 系統。",
    role: "全端工程師",
    category: "enterprise",
    tier: "silver",
    tierLabel: "銀牌作品",
    technologies: [
      "FastAPI",
      "Vue 3",
      "TypeScript",
      "SQLite",
      "JWT",
      "ChromaDB",
      "Pytest",
      "Vitest",
      "GitHub Actions",
    ],
    metrics:
      "建立完整文件與知識管理流程，整合 AI Prompt、Vector Database、CI 與發佈驗證",
    featured: false,
    images: [
      {
        src: "/images/projects/knowledge-workspace/overview.png",
        alt: "Knowledge Workspace 工作區總覽",
      },
      {
        src: "/images/projects/knowledge-workspace/search.png",
        alt: "Knowledge Workspace 向量搜尋結果頁",
      },
      {
        src: "/images/projects/knowledge-workspace/prompt.png",
        alt: "Knowledge Workspace AI Prompt 工作流設定",
      },
      {
        src: "/images/projects/knowledge-workspace/notes.png",
        alt: "Knowledge Workspace 文件筆記與標註",
      },
    ],
    details: {
      problem:
        "文件、圖片、操作紀錄與知識常分散於不同位置，造成資料難以追蹤、分類與重複利用。",
      solution:
        "設計統一 Workspace 架構，整合文件管理、知識庫整理、Logbook 操作紀錄與 AI Prompt 工作流程。",
      contribution:
        "負責系統架構設計、API 資料模型、文件與圖片管理、AI Prompt 流程、前後端整合與 CI 建置流程。",
      highlights: [
        "建立 Knowledge / Logbook / Prompt 多模組系統",
        "整合文件與圖片上傳管理流程",
        "導入 JWT Authentication 與角色存取控制",
        "整合 ChromaDB Vector Database 與 LLM Prompt 流程",
        "建立 build / lint / test / smoke test / release packaging 驗證流程",
      ],
      result:
        "完成接近實務系統的智慧文件與知識整理平台，可作為團隊知識管理工具原型。",
      challenges:
        "需整合文件管理、知識沉澱、操作紀錄與 AI 工作流程，並維持前後端資料契約一致。",
      nextSteps:
        "規劃加入全文搜尋、多使用者協作、權限細分與更完整的知識檢索流程。",
      githubUrl: "https://github.com/a1354013-alt/Knowledge_Workspace",
    },
  },
  {
    id: "finance-dashboard",
    name: "AI 財務分析儀表板",
    tagline: "整合 AI 分析與股票資料的全端財務管理平台。",
    role: "全端工程師",
    category: "enterprise",
    tier: "silver",
    tierLabel: "銀牌作品",
    technologies: [
      "FastAPI",
      "Vue 3",
      "SQLite",
      "JWT",
      "Pytest",
      "Vitest",
      "GitHub Actions",
    ],
    metrics:
      "建立完整財務管理與 AI 分析流程，整合 Provider abstraction 與 CI 測試",
    featured: false,
    details: {
      problem:
        "使用者需要整合式平台管理收支、預算與投資資訊，並取得智慧化分析建議。",
      solution:
        "建立全端財務儀表板，整合股票資料 API、AI 分析模組與可切換 Provider 架構。",
      contribution:
        "負責系統架構設計、後端 API、前端儀表板、AI Insights、股票資料整合與測試流程。",
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
    id: "language-learning-coach",
    name: "English-Japanese Learning Coach",
    tagline:
      "AI 個人化英日文學習平台，支援 SRS、錯題追蹤、教材匯入與 RAG 問答。",
    role: "全端工程師",
    category: "learning",
    tier: "silver",
    tierLabel: "銀牌作品",
    technologies: [
      "FastAPI",
      "Vue 3",
      "TypeScript",
      "SQLite",
      "Pytest",
      "Vitest",
      "Playwright",
      "GitHub Actions",
    ],
    metrics: "建立從課程、作答、錯題、複習到學習分析的完整學習閉環",
    featured: false,
    details: {
      problem:
        "語言學習流程常分散在不同工具中，錯題、複習與學習進度難以持續追蹤。",
      solution:
        "建立完整學習資料流，支援每日課程、錯題本、SRS 複習、學習分析、教材匯入與 AI 輔助問答。",
      contribution:
        "負責課程、複習、錯題、教材與學習分析 API 設計，並完成前後端整合與測試流程。",
      highlights: [
        "設計 SRS 間隔重複複習機制",
        "實作 wrong answers 錯題本與重新挑戰流程",
        "整合 RAG 素材問答流程",
        "設計 lesson / review / progress / analytics API 契約",
        "建立 pytest、Vitest、Playwright 與 GitHub Actions CI 驗證流程",
      ],
      result: "完成前後端分離的 AI 語言學習平台 MVP，可作為教育科技產品原型。",
      challenges:
        "需設計可持續累積的學習閉環，讓課程、錯題、複習與分析資料能互相串接。",
      nextSteps:
        "規劃加入 AI Chat Tutor、語音互動、個人化學習推薦與更多教材格式支援。",
      githubUrl:
        "https://github.com/a1354013-alt/English-Japanese-Learning-Coach-Project-Requirements",
    },
  },
  {
    id: "covid-cough-detection",
    name: "COVID-19 咳嗽聲音偵測系統",
    tagline: "基於 AI 的聲音分析平台，支援音訊上傳、驗證與模型推論。",
    role: "全端工程師",
    category: "ai",
    tier: "silver",
    tierLabel: "銀牌作品",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "GitHub Actions",
    ],
    metrics:
      "完成端到端 AI 音訊分析流程，包含上傳驗證、推論處理、結果回傳與 CI 測試",
    featured: false,
    details: {
      problem:
        "需要建立穩定的音訊驗證與推論流程，以確保模型輸入品質與結果可靠性。",
      solution:
        "設計完整音訊處理平台，支援上傳、格式驗證、大小檢查、推論流程與結果顯示。",
      contribution:
        "負責前後端流程、音訊驗證 middleware、推論串接、API 測試與 CI 驗證。",
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
      githubUrl:
        "https://github.com/a1354013-alt/covid_cough_detection_complete_with_dataset",
    },
  },
  {
    id: "ai-video-subtitle-generator",
    name: "AI 影片字幕生成系統",
    tagline:
      "以 Python 建立的智慧字幕生成工具，支援語音辨識、字幕時間軸生成、多語翻譯與 AI 模型切換。",
    role: "AI 系統開發 / 後端工程師",
    category: "ai",
    tier: "silver",
    tierLabel: "銀牌作品",
    technologies: [
      "Python",
      "FastAPI",
      "OpenAI API",
      "Whisper",
      "FFmpeg",
      "Pytest",
      "GitHub Actions",
    ],
    metrics:
      "完成從影片音訊擷取、語音辨識、字幕時間同步到 SRT 輸出的自動化字幕生成流程",
    featured: false,
    details: {
      problem:
        "影片字幕製作通常需要人工逐段聆聽、輸入文字與調整時間軸，長影片、多語翻譯與批次處理時成本高且容易出錯。",
      solution:
        "建立自動化 AI 字幕生成系統，整合 FFmpeg 音訊擷取、語音轉文字、字幕時間軸生成、多語翻譯與 SRT 輸出流程，並支援雲端與本地 AI 模型切換。",
      contribution:
        "負責整體字幕處理流程設計、AI 語音辨識 API 整合、字幕時間軸生成邏輯、翻譯模組、SRT 輸出模組與測試 / CI 流程建置。",
      highlights: [
        "支援 AI 語音辨識自動生成字幕",
        "建立字幕時間同步 Timestamp Alignment 機制",
        "支援多語翻譯與字幕生成",
        "可切換 OpenAI API / 本地 AI 模型",
        "支援批次影片字幕處理流程",
        "建立 Pytest 與 GitHub Actions CI 驗證流程",
      ],
      result:
        "成功建立完整字幕生成流程，可自動產生影片字幕並降低人工整理時間，適合用於教學影片、作品展示與多語內容製作。",
      challenges:
        "需處理語音辨識結果切段、字幕時間軸對齊、多語翻譯品質與長影片批次處理穩定性。",
      nextSteps:
        "規劃加入字幕預覽介面、長影片分段處理、模型效能比較與更多字幕格式輸出。",
      githubUrl: "https://github.com/a1354013-alt/ai_subtitle_tool",
    },
  },
];
