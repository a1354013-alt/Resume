/**
 * Career Timeline Data
 * 職涯時間軸數據
 * 
 * 用於 CareerTimelineSection 元件
 * 支援展開 highlights、篩選 tags、顯示 Present
 */

export type TimelineItem = {
  id: string;
  start: string; // YYYY-MM
  end?: string; // YYYY-MM or undefined (Present)
  title: string;
  org: string;
  tags: string[];
  highlights: string[];
};

export const timeline: TimelineItem[] = [
  {
    id: 'current-role',
    start: '2021-01',
    end: undefined, // Present
    title: '資深系統工程師',
    org: '某製造業集團',
    tags: ['Go', 'Vue 3', 'PostgreSQL', 'ERP', 'Legacy 系統'],
    highlights: [
      '主導 Delphi ERP 系統現代化轉型，從 Legacy Code 梳理到 Web 架構遷移',
      '設計並實現工務整合系統，支援複雜工程變更流程，系統吞吐量提升 500%',
      '解決 Delphi 核心簽核模組長年存在的記憶體洩漏問題，系統崩潰率降至趨近於零',
      '建立完整的監控與日誌系統，確保系統穩定性與可維護性',
      '推動前後端分離架構，提升開發效率與系統可擴充性'
    ]
  },
  {
    id: 'mid-level-engineer',
    start: '2019-06',
    end: '2020-12',
    title: '系統工程師',
    org: '某製造業集團',
    tags: ['Delphi', 'SQL Server', 'VB.NET', 'Web 化'],
    highlights: [
      '負責既有 Delphi ERP 系統的維護與優化',
      '主導多個模組的 Web 化改造，降低使用者操作門檻',
      '導入防呆機制與流程優化，減少人為錯誤',
      '直接面對客戶收斂需求，將模糊的「許願」轉化為精準的技術規格'
    ]
  },
  {
    id: 'junior-engineer',
    start: '2018-03',
    end: '2019-05',
    title: '初級工程師',
    org: '某製造業集團',
    tags: ['VB.NET', 'SQL Server', 'Web', '學習'],
    highlights: [
      '學習企業級系統開發的基礎知識',
      '參與 ERP 系統的日常維護與小型功能開發',
      '熟悉製造業的業務流程與系統架構',
      '建立對系統穩定性與正確性的深刻理解'
    ]
  },
  {
    id: 'automation-background',
    start: '2016-09',
    end: '2018-02',
    title: '自動化工程師',
    org: '某自動化公司',
    tags: ['自動化', 'PLC', '硬體', '邏輯設計'],
    highlights: [
      '設計與實現工業自動化系統',
      '培養系統思維與邏輯設計能力',
      '學習流程拆解與狀態管理',
      '為轉向軟體開發奠定堅實基礎'
    ]
  }
];

/**
 * 提取所有唯一的 tags 用於篩選
 */
export const timelineTags = Array.from(
  new Set(timeline.flatMap(item => item.tags))
).sort();

/**
 * 根據 tags 篩選時間軸項目
 */
export function filterTimelineByTags(selectedTags: string[]): TimelineItem[] {
  if (selectedTags.length === 0) return timeline;
  return timeline.filter(item =>
    selectedTags.some(tag => item.tags.includes(tag))
  );
}

/**
 * 格式化日期範圍
 */
export function formatDateRange(start: string, end?: string): string {
  const startDate = new Date(start + '-01');
  const startStr = startDate.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'short'
  });

  if (!end) {
    return `${startStr} - Present`;
  }

  const endDate = new Date(end + '-01');
  const endStr = endDate.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'short'
  });

  return `${startStr} - ${endStr}`;
}
