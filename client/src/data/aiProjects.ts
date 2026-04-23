/**
 * AI Projects Data
 * AI 專案展示數據
 * 
 * 用於 AiProjectGallery 與 AiDemoConsole 元件
 */

export type AiProject = {
  id: string;
  title: string;
  role: string;
  period: string;
  stack: string[];
  problem: string;
  approach: string[];
  results: {
    label: string;
    value: string;
  }[];
  demoPrompts?: string[];
  demoResponses?: string[];
};

export const aiProjects: AiProject[] = [
  {
    id: 'defect-detection',
    title: '製造業缺陷檢測系統',
    role: '研究與實現',
    period: '2024-進行中',
    stack: ['PyTorch', 'YOLO', 'OpenCV', 'Python', 'Go'],
    problem:
      '製造業產品檢測目前仍依賴人工目檢，效率低下、容易出錯。每天需要大量檢驗人員，成本高且品質不穩定。',
    approach: [
      '使用 YOLO v8 進行實時物件偵測，識別產品缺陷',
      '訓練自訂模型以適應特定產品特徵',
      '整合 OpenCV 進行影像前處理與後處理',
      '建立 Go 後端 API 支援實時推理',
      '設計 Web UI 展示檢測結果與統計數據'
    ],
    results: [
      { label: '檢測準確率', value: '96.5%' },
      { label: '處理速度', value: '30 FPS' },
      { label: '人力成本降低', value: '60%' },
      { label: '檢測時間', value: '從 2 小時降至 15 分鐘' }
    ],
    demoPrompts: [
      '分析這個產品影像中的缺陷',
      '檢測產品表面是否有裂紋',
      '識別不合格產品'
    ],
    demoResponses: [
      '檢測到 3 個缺陷：\n1. 表面刮傷（信心度 98%）\n2. 邊角毛刺（信心度 94%）\n3. 色差（信心度 87%）',
      '未檢測到明顯裂紋。表面完整度評分：9.2/10',
      '該產品被判定為不合格。主要缺陷：內部空洞（信心度 95%）'
    ]
  },
  {
    id: 'invoice-ocr',
    title: '發票 OCR 與自動分類',
    role: '研究與實現',
    period: '2023-2024',
    stack: ['EasyOCR', 'Tesseract', 'Python', 'NLP', 'Go'],
    problem:
      '企業每月需要處理數千張發票，手動輸入資訊耗時且容易出錯。財務部門需要花費大量時間進行資料錄入與驗證。',
    approach: [
      '使用 EasyOCR 進行多語言文字識別',
      '設計 NLP 管道自動提取關鍵資訊（發票號、金額、日期等）',
      '訓練分類模型自動分類發票類型',
      '建立驗證流程確保資料準確性',
      '整合至企業 ERP 系統'
    ],
    results: [
      { label: '文字識別準確率', value: '94.3%' },
      { label: '資訊提取準確率', value: '92.1%' },
      { label: '處理時間', value: '從 5 分鐘降至 30 秒' },
      { label: '人力成本節省', value: '75%' }
    ],
    demoPrompts: [
      '識別這張發票的金額和日期',
      '提取供應商名稱和稅號',
      '分類這份文件的類型'
    ],
    demoResponses: [
      '金額：$12,500 | 日期：2024-03-04 | 準確度：98%',
      '供應商：ABC 科技有限公司 | 稅號：12345678',
      '文件類型：進項發票 | 分類信心度：96%'
    ]
  },
  {
    id: 'predictive-maintenance',
    title: '設備預測性維護系統',
    role: '架構設計與實現',
    period: '2023-進行中',
    stack: ['TensorFlow', 'Time Series', 'Python', 'Go', 'PostgreSQL'],
    problem:
      '製造設備故障導致生產中斷，造成巨大經濟損失。目前採用被動維護，無法提前預警。',
    approach: [
      '收集設備感測器數據（溫度、振動、電流等）',
      '使用時間序列模型預測設備故障',
      '訓練 LSTM 網路識別異常模式',
      '建立告警機制提醒維護人員',
      '分析維護成本與停機時間的權衡'
    ],
    results: [
      { label: '故障預測準確率', value: '89.7%' },
      { label: '提前預警時間', value: '平均 7 天' },
      { label: '維護成本降低', value: '45%' },
      { label: '設備可用率提升', value: '12%' }
    ],
    demoPrompts: [
      '分析設備 #A01 的健康狀態',
      '預測未來 30 天的故障風險',
      '推薦維護計畫'
    ],
    demoResponses: [
      '設備健康度：72% | 風險等級：中 | 建議檢查軸承',
      '預測故障概率：23% | 建議在 15 天內進行預防性維護',
      '最佳維護窗口：2024-03-15 至 2024-03-17 | 預計停機時間：4 小時'
    ]
  },
  {
    id: 'nlp-chatbot',
    title: '企業知識庫 AI 助手',
    role: '系統設計與實現',
    period: '2024-進行中',
    stack: ['LLM', 'RAG', 'Embedding', 'Python', 'Go', 'Vector DB'],
    problem:
      '員工需要查詢企業知識庫、政策、流程等資訊，目前依賴搜尋引擎或人工詢問，效率低下。',
    approach: [
      '建立企業知識庫的向量化索引',
      '使用 RAG（檢索增強生成）技術',
      '整合 LLM 進行自然語言理解與回答',
      '設計對話流程確保回答準確性',
      '提供反饋機制持續改進模型'
    ],
    results: [
      { label: '查詢準確率', value: '91.2%' },
      { label: '平均回應時間', value: '2.3 秒' },
      { label: '員工滿意度', value: '4.6/5' },
      { label: '查詢量', value: '每天 500+ 次' }
    ],
    demoPrompts: [
      '如何申請年假？',
      '公司的採購流程是什麼？',
      '技術文件中關於 API 設計的最佳實踐'
    ],
    demoResponses: [
      '根據公司政策，年假申請流程如下：\n1. 登入 HR 系統\n2. 填寫年假申請表\n3. 主管審核\n4. HR 確認\n詳見《員工手冊》第 5 章',
      '採購流程分為 5 個步驟：\n1. 需求提交\n2. 供應商評估\n3. 報價比較\n4. 採購單簽核\n5. 收貨驗收\n平均週期：10 個工作天',
      'API 設計最佳實踐包括：\n- RESTful 設計原則\n- 版本管理\n- 錯誤處理\n- 速率限制\n詳見《技術指南》第 3.2 節'
    ]
  }
];

/**
 * 獲取所有技術棧
 */
export function getAllTechStacks(): string[] {
  const stacks = new Set<string>();
  aiProjects.forEach(project => {
    project.stack.forEach(tech => stacks.add(tech));
  });
  return Array.from(stacks).sort();
}

/**
 * 按技術棧篩選專案
 */
export function filterProjectsByTech(tech: string): AiProject[] {
  return aiProjects.filter(project => project.stack.includes(tech));
}

/**
 * 獲取專案詳情
 */
export function getProjectById(id: string): AiProject | undefined {
  return aiProjects.find(project => project.id === id);
}
