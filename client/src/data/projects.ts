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
    id: "erp-modernization",
    name: "企業 ERP／內部系統現代化（非公開）",
    tagline:
      "將既有 Legacy/桌面流程逐步拆分為 Web + API，讓交付可迭代、維護可控。",
    role: "全端工程師（需求拆解／前端／API／資料整合）",
    category: "enterprise",
    tier: "gold",
    technologies: ["Vue 3", "Go (Echo)", "PostgreSQL", "Redis", "Docker"],
    metrics: "提升流程一致性與維護性；把交付從一次性改成可迭代",
    featured: true,
    details: {
      problem:
        "既有流程分散在多個模組與手動步驟中，資料來源與權限規則不一致，維護與擴充成本逐年上升，且交付風險高度依賴少數熟悉舊系統的人。",
      solution:
        "先盤點流程與資料流，定義可落地的 API 邊界；用 Web 介面承接主要操作流程，後端以 Go 提供一致的資料存取、權限與錯誤處理，並逐步替換高風險/高成本的舊流程。",
      contribution:
        "負責從需求訪談與流程拆解到前後端實作；建立可重用的 API 設計規範與錯誤格式，並在前端落地一致的互動與表單驗證策略。",
      highlights: [
        "把核心流程拆成可驗證的交付節點，降低一次性大改的風險",
        "統一權限與錯誤處理，使前端與使用者的回饋更一致",
        "針對資料一致性與效能痛點，調整 schema 與查詢策略",
        "加入快取與背景處理思維，避免操作高峰時的尖峰負載",
      ],
      result:
        "流程與資料規則更一致，後續功能擴充可以在既定邊界內迭代，不再依賴「只有某人懂」的隱性知識。",
      challenges:
        "在不中斷既有作業的前提下逐步替換；同時處理舊資料結構、使用者習慣與跨模組依賴。",
      nextSteps:
        "持續把高維護成本流程抽離到服務層，補齊更多自動化驗證與可觀測性，讓變更更可預期。",
    },
  },
  {
    id: "change-tracking",
    name: "異動追蹤與稽核流程（非公開）",
    tagline: "針對多人協作與多階段審核流程，建立可追蹤、可稽核的異動紀錄。",
    role: "全端工程師（流程設計／實作／整合）",
    category: "enterprise",
    tier: "gold",
    technologies: ["Vue 3", "Go", "PostgreSQL", "Message Queue"],
    metrics: "讓異動可追溯、責任可界定、流程可自動化",
    featured: true,
    details: {
      problem:
        "異動分散在多處操作點，缺乏一致的稽核紀錄格式；一旦出現問題，回溯成本高，且難以快速界定影響範圍與責任歸屬。",
      solution:
        "建立統一的異動事件模型，將操作行為轉成可追溯事件；以資料庫與佇列串接跨模組流程，並在 UI 上呈現清楚的狀態與差異。",
      contribution:
        "定義事件與稽核資料結構，完成前後端串接與 UI 呈現；將跨模組的流程狀態抽象成一致的狀態機，降低後續擴充成本。",
      highlights: [
        "統一事件格式與差異呈現，降低回溯與溝通成本",
        "把跨模組流程串成可觀測的狀態流",
        "針對邊界狀況補齊錯誤處理與重試策略",
      ],
      result:
        "異動紀錄可追溯且格式一致，跨模組流程更透明，降低稽核與查核的時間成本。",
      challenges:
        "需要兼顧既有流程與資料格式，同時確保新增機制不影響日常作業效率。",
      nextSteps:
        "持續把更多流程納入事件化與可觀測化，並補齊自動化檢核以降低人工依賴。",
    },
  },
  {
    id: "budget-procurement",
    name: "預算／採購流程整合（非公開）",
    tagline: "將跨部門的預算與採購流程整合成一致的操作與資料規則。",
    role: "全端工程師（需求整合／資料規則／UI）",
    category: "enterprise",
    tier: "silver",
    technologies: ["Vue 3", "Go", "PostgreSQL"],
    metrics: "降低流程斷點；讓資料規則一致並可擴充",
    featured: false,
    details: {
      problem:
        "預算與採購涉及多角色、多階段，資料規則與欄位定義分散，容易出現重工與對帳成本；流程在交接時容易斷點。",
      solution:
        "整理流程節點與角色權限，建立統一的資料規則與欄位驗證；將 UI 操作與 API 邏輯對齊，確保每個節點的輸入輸出一致。",
      contribution:
        "協助需求釐清與欄位定義，實作前端表單與驗證、後端 API 與資料處理，並整理可交付的操作說明與規則。",
      highlights: [
        "表單與驗證一致化，減少錯誤輸入",
        "流程節點清楚可見，降低交接成本",
      ],
      result:
        "流程規則更一致，跨部門協作成本降低，後續擴充能在既有規則下迭代。",
      challenges:
        "需求來自多方，必須在不增加使用者負擔的前提下把規則收斂到一致。",
      nextSteps: "補齊更多自動化驗證與報表輸出，讓流程監控更即時。",
    },
  },
  {
    id: "yolo-cv",
    name: "YOLO 物件偵測實作",
    tagline: "以電腦視覺模型完成基本偵測流程，包含資料準備、推論與結果評估。",
    role: "個人專案（研究／實作）",
    category: "ai",
    tier: "bronze",
    technologies: ["Python", "YOLO", "OpenCV"],
    metrics: "完成端到端流程與可重現的實驗紀錄",
    featured: false,
    details: {
      problem: "需要建立可重現的偵測流程來理解資料、模型與部署限制之間的取捨。",
      solution:
        "整理資料、完成訓練/推論流程、建立基本評估方式，並把前處理與後處理流程標準化。",
      contribution:
        "獨立完成資料處理、訓練與推論腳本整理，並整理實驗紀錄以便重現與比較。",
      highlights: [
        "資料與標註流程整理",
        "推論流程與可視化",
        "基本評估與誤差分析",
      ],
      result: "建立可重現的 CV 研究/實作基礎，能快速迭代資料與模型的改動。",
      challenges:
        "資料品質差異會直接影響結果，需要把資料處理流程做成可重現且可調整。",
      nextSteps: "補齊更完整的評估指標與部署環境測試，並整理成可公開的 Repo。",
    },
  },
  {
    id: "tourism-api",
    name: "REST API 練習：旅遊資訊聚合",
    tagline: "以 Node.js/Express 練習 API 設計、資料存取與基本效能思維。",
    role: "個人專案（練習）",
    category: "learning",
    tier: "bronze",
    technologies: ["Node.js", "Express", "REST API"],
    metrics: "把 API 設計與錯誤處理做成一致規格",
    featured: false,
    details: {
      problem:
        "想建立一個可擴充的 API 介面練習專案，練習路由設計、錯誤處理與資料整理。",
      solution:
        "用 Express 建立 REST API，定義一致的回應格式與錯誤處理策略，並整理常見查詢需求。",
      contribution:
        "獨立完成 API 設計、路由與錯誤處理，並將介面文件化以便使用者測試。",
      highlights: ["一致的回應/錯誤格式", "基本分層結構", "簡單文件與使用方式"],
      result: "建立可延伸的 API 練習基礎，後續可加上認證、快取或資料庫。",
      challenges: "需要在簡潔與可擴充間取捨，避免一開始就過度設計。",
      nextSteps: "補齊測試與資料儲存層，並整理成可公開的 Repo。",
    },
  },
];
