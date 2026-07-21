export type ExperienceStage =
  | "software-engineering"
  | "design"
  | "product"
  | "teaching";

export type WorkExperience = {
  id: string;
  company: string;
  title: string;
  role: string;
  period: string;
  duration?: string;
  logo?: string;
  logoClass: string;
  stage: ExperienceStage;
  bullets: string[];
  technologies?: string[];
};

export const experienceTimeline: WorkExperience[] = [
  {
    id: "software-engineer",
    logoClass: "bg-slate-100 text-blue-900",
    title: "軟體工程師",
    company: "中程資訊顧問有限公司（電腦軟體服務業）",
    role: "ERP 系統開發 / 維護 / 重構",
    period: "2022/8 至今",
    stage: "software-engineering",
    bullets: [
      "主導 Delphi ERP 系統現代化，逐步轉換為 Vue 3 + Go 的 Web 架構。",
      "建立 RESTful API 並整合前後端資料流程，降低模組耦合度。",
      "針對高風險流程補上防錯設計、例外處理與資料驗證機制。",
      "支援第一線客服與使用者回報，從舊系統原始碼中反推業務邏輯。",
      "參與客戶導入、教育訓練與跨部門流程對齊。",
      "重新設計查詢流程，將關鍵頁面查詢由 26 秒優化至 1 秒內。",
    ],
    technologies: ["Delphi", "Vue 3", "Go", "RESTful API", "SQL Server"],
  },
  {
    id: "website-designer",
    logoClass: "bg-green-500 text-white",
    title: "網站設計師",
    company: "台灣久林股份有限公司",
    role: "平面設計 / 美編",
    period: "2018/7 至 2022/2",
    duration: "3 年 8 個月",
    stage: "design",
    bullets: [
      "設計製作平面文宣、DM、海報、型錄等視覺素材。",
      "規劃商品包裝設計製作與發印流程。",
      "處理圖稿、文案排版與印刷輸出協作。",
      "協助維護與更新公司網站內容。",
    ],
  },
  {
    id: "web-visual-designer",
    logoClass: "bg-green-500 text-white",
    title: "網頁美工",
    company: "鵬薦數位股份有限公司",
    role: "網頁設計 / 美術支援",
    period: "2017/2 至 2018/7",
    duration: "1 年 6 個月",
    stage: "design",
    bullets: [
      "製作網頁視覺素材與印前稿件。",
      "協助網站內容設計與前端視覺調整。",
      "支援網站工程師完成頁面製作與維護。",
    ],
  },
  {
    id: "marketing-graphic-designer",
    logoClass: "bg-blue-600 text-white",
    title: "美編行銷",
    company: "富勝印刷股份有限公司",
    role: "平面設計 / 美編",
    period: "2016/1 至 2017/2",
    duration: "1 年 2 個月",
    stage: "design",
    bullets: [
      "負責印前美工稿件、校稿與輸出。",
      "使用 Illustrator、Photoshop 製作視覺圖稿。",
      "協助數位印刷機台作業與設計交付。",
    ],
    technologies: ["Adobe Illustrator", "Adobe Photoshop"],
  },
  {
    id: "teaching-assistant",
    logoClass: "bg-cyan-600 text-white",
    title: "教學助理",
    company: "國立中興大學",
    role: "助教",
    period: "2015/1 至 2015/8",
    duration: "8 個月",
    stage: "teaching",
    bullets: [
      "協助課程教學、現場支援與問題說明。",
      "引導學生理解課程操作與系統流程。",
      "培養技術溝通與教學拆解能力。",
    ],
  },
  {
    id: "product-design-engineer",
    logo: "製",
    logoClass: "bg-orange-500 text-white",
    title: "產品設計工程師",
    company: "晨州塑膠工業股份有限公司",
    role: "機械 / 產品設計工程師",
    period: "2012/3 至 2014/3",
    duration: "2 年 1 個月",
    stage: "product",
    bullets: [
      "參與產品設計與製造流程規劃。",
      "理解第一線作業限制與現場需求。",
      "奠定後續從使用情境思考系統設計的基礎。",
    ],
  },
];

export const featuredResumeExperience = {
  role: experienceTimeline[0],
  bullets: [
    experienceTimeline[0].bullets[0],
    experienceTimeline[0].bullets[1],
    experienceTimeline[0].bullets[3],
    experienceTimeline[0].bullets[5],
  ],
};

export const experienceProgression = [
  "產品與視覺設計背景",
  "網頁設計與跨部門協作",
  "ERP 系統開發與重構",
  "Legacy 系統理解與 AI 技術延伸",
];

export const earlierExperienceSummary =
  "早期工作歷程橫跨產品設計、平面設計、網頁設計與教學助理，這些經驗讓我在系統開發之外，也能從使用者理解、視覺傳達、流程拆解與現場溝通的角度思考問題。";
