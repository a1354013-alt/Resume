export interface Project {
  id: string;
  name: string;
  tagline: string;
  role: string;
  category: 'enterprise' | 'ai' | 'learning';
  tier: 'gold' | 'silver' | 'bronze';
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
    id: 'work-integration',
    name: '工務整合系統',
    tagline: '統一工程變更、預算、採購全流程的企業系統',
    role: 'Full-stack 開發 & 系統架構',
    category: 'enterprise',
    tier: 'gold',
    technologies: ['Vue 3', 'Go (Echo)', 'PostgreSQL', 'Redis', 'Docker'],
    metrics: '系統吞吐量 +500% | 維護成本 -70%',
    featured: true,
    details: {
      problem: '原有 Delphi 系統已運作 15+ 年，資料結構混亂、流程隱藏在程式中、無法應對業務變化。每次修改都可能影響整個系統。',
      solution: '從前端到後端完全重構。前端採用 Vue 3 + PrimeVue 提供清晰的流程視覺化；後端用 Go (Echo) 重新設計資料模型與 API，確保資料一致性與可擴充性。',
      contribution: '主導整個架構設計、資料模型重構、API 設計與核心模組開發。負責與業務部門溝通，確保新系統符合實際需求。',
      highlights: [
        '設計清晰的資料模型，將隱性規則顯性化，支援複雜流程管理',
        '實現分階段遷移策略，在不中斷服務的前提下逐步轉換舊系統',
        '建立完整的監控與日誌系統，確保系統穩定性與可維護性',
        '優化資料庫查詢性能，使用 Redis 快取關鍵資料'
      ],
      result: '系統上線後，工程變更流程處理時間從 2 小時降至 15 分鐘。資料一致性提升至 99.9%。系統已穩定運作 2+ 年，支援業務擴展。',
      challenges: '最大挑戰是舊系統的資料遷移與驗證。解決方案是建立詳細的資料對應規則，並進行多輪測試確保準確性。',
      nextSteps: '計畫引入 AI 輔助審核，進一步提升流程效率。探索實時協作功能，支援多部門同步工作。',
      demoUrl: '',
      githubUrl: ''
    }
  },
  {
    id: 'change-management',
    name: '變更追加減系統',
    tagline: '管理工程變更、追加減項、預算調整的核心系統',
    role: 'Full-stack 開發 & 業務流程設計',
    category: 'enterprise',
    tier: 'gold',
    technologies: ['Vue 3', 'Go', 'PostgreSQL', 'Message Queue'],
    metrics: '變更審核效率 +400% | 錯誤率 -95%',
    featured: true,
    details: {
      problem: '變更流程涉及多個部門（工程、財務、採購），原有系統無法清楚追蹤變更狀態。導致預算混亂、重複審核、資訊不同步。',
      solution: '設計完整的變更管理流程，包含提案、審核、批准、執行、結案各階段。每個階段有清晰的責任人與審核規則。',
      contribution: '與業務部門深入溝通，梳理變更流程的所有規則與例外情況。設計資料模型支援複雜的審核邏輯。實現工作流引擎，支援動態流程配置。',
      highlights: [
        '建立工作流引擎，支援複雜的多階段審核流程',
        '實現預算追蹤與影響分析，自動計算變更對總預算的影響',
        '設計通知系統，確保所有相關人員及時獲得更新',
        '提供完整的審計日誌，記錄每個變更決策的原因與時間'
      ],
      result: '變更審核時間從平均 3 天降至 2 小時。預算準確性提升至 99.5%。系統已成為公司變更管理的標準工具。',
      challenges: '最大挑戰是業務規則的複雜性與不斷變化。解決方案是建立靈活的流程配置系統，允許業務部門自行調整規則。',
      nextSteps: '計畫集成 AI 預測模型，提前識別可能的風險變更。探索移動應用，支援現場審核。',
      demoUrl: '',
      githubUrl: ''
    }
  },
  {
    id: 'budget-procurement',
    name: '預算採發估驗系統',
    tagline: '統一預算編制、採購發包、工程估驗的全流程系統',
    role: 'Full-stack 開發 & 系統整合',
    category: 'enterprise',
    tier: 'gold',
    technologies: ['Vue 3', 'Go', 'PostgreSQL', 'Excel Export'],
    metrics: '預算編制時間 -60% | 採購效率 +300%',
    featured: true,
    details: {
      problem: '預算、採購、估驗三個系統分離，資訊無法同步。導致預算超支、採購延誤、估驗錯誤。每個月月底都要手動對帳。',
      solution: '統一三個系統為一個完整的流程。從預算編制開始，自動生成採購清單，然後進行發包與估驗，全程資訊同步。',
      contribution: '主導系統整合設計，確保三個流程的無縫銜接。實現自動化的預算-採購-估驗對應邏輯。',
      highlights: [
        '設計統一的資料模型，支援預算、採購、估驗的完整追蹤',
        '實現自動化的預算執行追蹤，實時顯示預算執行進度',
        '提供靈活的報表系統，支援多維度的預算分析',
        '集成 Excel 匯入匯出，降低使用者學習成本'
      ],
      result: '預算編制時間從 1 週降至 2 天。採購效率提升 300%。系統已支援公司 50+ 個專案的預算管理。',
      challenges: '最大挑戰是不同部門對資料的理解差異。解決方案是建立清晰的資料字典與培訓文件。',
      nextSteps: '計畫引入預測模型，幫助預算編制。探索與外部系統的整合。',
      demoUrl: '',
      githubUrl: ''
    }
  },
  {
    id: 'approval-system',
    name: '簽核系統',
    tagline: '統一各類文件與流程的簽核管理平台',
    role: 'Full-stack 開發 & 流程設計',
    category: 'enterprise',
    tier: 'silver',
    technologies: ['Vue 3', 'Go', 'PostgreSQL', 'PDF'],
    metrics: '簽核時間 -80% | 簽核準確率 +99%',
    featured: false,
    details: {
      problem: '各類文件簽核流程分散，沒有統一的簽核平台。導致簽核延誤、文件遺失、責任不清。',
      solution: '建立統一的簽核平台，支援各類文件的簽核流程。提供清晰的簽核狀態追蹤與提醒。',
      contribution: '設計簽核流程模型，實現通用的簽核引擎。',
      highlights: [
        '支援複雜的多層級簽核流程',
        '提供簽核狀態實時追蹤',
        '自動提醒未簽核人員',
        '完整的審計日誌'
      ],
      result: '簽核時間平均從 2 天降至 4 小時。簽核準確率提升至 99%。',
      challenges: '不同部門的簽核規則差異大。',
      nextSteps: '探索行動應用支援。',
      demoUrl: '',
      githubUrl: ''
    }
  },
  {
    id: 'leave-system',
    name: '請假系統',
    tagline: '員工請假申請、審核、統計的一體化系統',
    role: 'Full-stack 開發',
    category: 'enterprise',
    tier: 'silver',
    technologies: ['Vue 3', 'Go', 'PostgreSQL'],
    metrics: '請假審核時間 -90% | 請假衝突 -100%',
    featured: false,
    details: {
      problem: '請假流程混亂，紙本簽核容易遺失，無法實時查看請假狀態。',
      solution: '建立數位化請假系統，支援線上申請、審核、統計。',
      contribution: '從需求分析到系統上線的全程參與。',
      highlights: [
        '支援多種假別（年假、病假、特休等）',
        '自動計算假期餘額',
        '實時請假狀態查詢',
        '完整的請假統計報表'
      ],
      result: '請假審核時間從 1 天降至 30 分鐘。請假衝突完全消除。',
      challenges: '假別規則複雜，需要與 HR 深入溝通。',
      nextSteps: '計畫與薪資系統整合。',
      demoUrl: '',
      githubUrl: ''
    }
  },
  {
    id: 'document-classifier',
    name: '智慧文件與照片分類助理',
    tagline: '使用 AI 自動分類與標籤企業文件與照片',
    role: 'Full-stack 開發 & AI 模型整合',
    category: 'ai',
    tier: 'silver',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'Vue 3'],
    metrics: '分類準確率 92% | 處理速度 +500%',
    featured: false,
    details: {
      problem: '企業有大量未分類的文件與照片，手動分類耗時耗力。',
      solution: '使用 AI 模型自動分類文件與照片，提供人工審核界面進行微調。',
      contribution: '設計 AI 管道，訓練分類模型，實現後端 API 與前端界面。',
      highlights: [
        '使用遷移學習快速訓練分類模型',
        '提供人工審核界面進行模型優化',
        '支援批量上傳與處理',
        '實時分類結果展示'
      ],
      result: '分類準確率達 92%。處理速度提升 500%。已分類 50,000+ 份文件。',
      challenges: '訓練數據不足，需要人工標註。',
      nextSteps: '計畫改進模型準確率至 95%+。',
      demoUrl: '',
      githubUrl: ''
    }
  },
  {
    id: 'yolo-detection',
    name: 'YOLO 安全帽偵測',
    tagline: '使用 YOLO 模型進行工地安全帽偵測',
    role: 'AI 模型開發 & 部署',
    category: 'ai',
    tier: 'bronze',
    technologies: ['Python', 'YOLO v5', 'OpenCV', 'Jetson Nano'],
    metrics: '偵測準確率 95% | 實時推論速度 30 FPS',
    featured: false,
    details: {
      problem: '工地安全管理困難，無法實時監控員工是否佩戴安全帽。',
      solution: '使用 YOLO 模型進行實時安全帽偵測，在 Jetson Nano 上部署。',
      contribution: '收集訓練數據，訓練 YOLO 模型，優化推論性能。',
      highlights: [
        '使用 YOLO v5 模型進行高效偵測',
        '在 Jetson Nano 上實現實時推論',
        '支援多攝像頭同時監控',
        '提供告警機制'
      ],
      result: '偵測準確率達 95%。實時推論速度 30 FPS。已在 3 個工地部署。',
      challenges: '訓練數據有限，模型泛化能力不足。',
      nextSteps: '計畫收集更多訓練數據，改進模型。',
      demoUrl: '',
      githubUrl: ''
    }
  },
  {
    id: 'covid-detection',
    name: 'COVID-19 肺炎檢測與資料集搜尋',
    tagline: '使用深度學習進行 COVID-19 肺炎 X 光影像檢測',
    role: 'AI 模型開發 & 數據處理',
    category: 'ai',
    tier: 'bronze',
    technologies: ['Python', 'TensorFlow', 'Keras', 'OpenCV'],
    metrics: '檢測準確率 91% | 資料集規模 5,000+ 影像',
    featured: false,
    details: {
      problem: '需要快速準確地檢測 COVID-19 肺炎影像，輔助醫療診斷。',
      solution: '使用深度學習模型進行 X 光影像分類，區分正常、肺炎、COVID-19。',
      contribution: '收集與預處理資料集，訓練分類模型，評估模型性能。',
      highlights: [
        '使用 CNN 架構進行影像分類',
        '實現資料增強提升模型泛化能力',
        '提供模型可解釋性分析',
        '建立完整的資料集文檔'
      ],
      result: '檢測準確率達 91%。資料集包含 5,000+ 影像。',
      challenges: '醫療影像數據隱私敏感，數據獲取困難。',
      nextSteps: '計畫改進模型架構，提升準確率至 95%+。',
      demoUrl: '',
      githubUrl: ''
    }
  },
  {
    id: 'taiwan-tourism',
    name: '台灣旅遊景點 API',
    tagline: '整合台灣旅遊景點資訊的 RESTful API',
    role: 'Full-stack 開發',
    category: 'learning',
    tier: 'bronze',
    technologies: ['Node.js', 'Express', 'MongoDB', 'REST API'],
    metrics: '支援 1,000+ 景點 | API 響應時間 <100ms',
    featured: false,
    details: {
      problem: '旅遊應用需要統一的景點資訊 API，但現有資源分散。',
      solution: '爬取並整理台灣旅遊景點資訊，提供 RESTful API 供應用使用。',
      contribution: '設計 API 架構，實現數據爬取與清洗，部署 API 服務。',
      highlights: [
        '支援景點搜尋、篩選、排序',
        '提供景點詳細信息與圖片',
        '實現 API 速率限制與認證',
        '完整的 API 文檔'
      ],
      result: 'API 支援 1,000+ 景點查詢。響應時間 <100ms。',
      challenges: '數據來源多樣，需要統一格式。',
      nextSteps: '計畫添加實時天氣與交通信息。',
      demoUrl: '',
      githubUrl: ''
    }
  }
];
