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
    role: "軟體工程師",
    period: "2022/8~仍在職",
    stage: "software-engineering",
    bullets: [
      "主導 Delphi ERP 系統現代化，轉換為 Vue3 + Go Web 架構。",
      "建立 RESTful API 並整合前後端系統。",
      "重構複雜商業邏輯，提升系統可維護性。",
      "支援客戶需求訪談與問題排查。",
      "協助系統導入與使用者教育訓練。",
      "重新設計查詢流程，將關鍵頁面由 26 秒優化至 1 秒內。",
    ],
    technologies: ["Delphi", "Vue 3", "Go", "RESTful API", "SQL Server"],
  },
  {
    id: "website-designer",
    logoClass: "bg-green-500 text-white",
    title: "網站設計師",
    company: "台灣久林股份有限公司（鞋類製造業 30~100人）",
    role: "平面設計 / 美編｜台中市大雅區",
    period: "2018/7~2022/2",
    duration: "3年8個月",
    stage: "design",
    bullets: [
      "設計製作平面文宣、海報、DM、廣告、型錄等視覺素材。",
      "規劃商品包裝設計製作及發印。",
      "進行圖稿、文案的排版設計。",
      "與印刷廠聯絡，處理估價、打樣與輸出流程。",
      "協助維護與修改公司網站內容。",
    ],
  },
  {
    id: "web-visual-designer",
    logoClass: "bg-green-500 text-white",
    title: "網頁美工",
    company: "鵬薦數位股份有限公司（其他出版業 1~30人）",
    role: "網頁設計師｜台中市北屯區",
    period: "2017/2~2018/7",
    duration: "1年6個月",
    stage: "design",
    bullets: [
      "負責印前美工稿件製作。",
      "設計製作平面文宣、海報、DM、廣告、型錄等素材。",
      "協助網站工程師製作與維護網站。",
    ],
  },
  {
    id: "marketing-graphic-designer",
    logoClass: "bg-blue-600 text-white",
    title: "美編行銷",
    company: "富勝印刷股份有限公司",
    role: "平面設計 / 美編｜台中市神岡區",
    period: "2016/1~2017/2",
    duration: "1年2個月",
    stage: "design",
    bullets: [
      "負責印前美工稿件製作。",
      "修改與編繪美工圖稿。",
      "操作數位印刷機台，處理印前製稿、校稿與改稿。",
      "熟悉 Adobe Illustrator、Adobe Photoshop 等設計工具。",
      "協助處理主管交辦事項。",
    ],
    technologies: ["Adobe Illustrator", "Adobe Photoshop"],
  },
  {
    id: "teaching-assistant",
    logoClass: "bg-cyan-600 text-white",
    title: "教學助理",
    company: "國立中興大學（大專校院教育事業）",
    role: "助教｜台中市南區",
    period: "2015/1~2015/8",
    duration: "8個月",
    stage: "teaching",
    bullets: [
      "協助課程教學與現場支援。",
      "協助學生理解課程操作流程。",
      "培養技術說明、問題引導與現場支援能力。",
    ],
  },
  {
    id: "product-design-engineer",
    logo: "製",
    logoClass: "bg-orange-500 text-white",
    title: "產品設計工程師",
    company: "晨州塑膠工業股份有限公司",
    role: "機械設計工程師｜台中市大雅區",
    period: "2012/3~2014/3",
    duration: "2年1個月",
    stage: "product",
    bullets: [
      "參與產品設計與製造流程規劃。",
      "理解傳統製造業現場流程與作業限制。",
      "培養從實務操作角度思考系統設計的能力。",
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
  "產品設計與製造流程",
  "平面與網頁設計",
  "ERP 系統開發與重構",
  "Legacy 現代化與 AI 技術延伸",
];

export const earlierExperienceSummary =
  "過去曾歷經產品設計、平面設計、網頁設計與教學助理等跨領域工作，因此在系統設計時能同時理解工程邏輯、使用情境與第一線操作痛點。";
