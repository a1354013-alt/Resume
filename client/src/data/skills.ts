/**
 * Skills Graph Data
 * 技能圖譜數據
 * 
 * 用於 StarSkillTreeSection 元件
 * nodes: 技能節點
 * edges: 技能關聯
 * level: 1-5，決定節點亮度
 */

export type SkillNode = {
  id: string;
  name: string;
  group: 'backend' | 'frontend' | 'database' | 'devops' | 'ai' | 'soft';
  level: number; // 1-5，越高越亮
  desc?: string;
};

export type SkillEdge = {
  from: string;
  to: string;
};

export const skillNodes: SkillNode[] = [
  // Backend
  {
    id: 'go',
    name: 'Go (Echo)',
    group: 'backend',
    level: 5,
    desc: '主要後端語言，RESTful API 設計與實現'
  },
  {
    id: 'delphi',
    name: 'Delphi',
    group: 'backend',
    level: 4,
    desc: 'Legacy 系統維護與現代化改造'
  },
  {
    id: 'vbnet',
    name: 'VB.NET',
    group: 'backend',
    level: 3,
    desc: '企業系統開發經驗'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    group: 'backend',
    level: 3,
    desc: 'JavaScript 後端開發'
  },

  // Frontend
  {
    id: 'vue3',
    name: 'Vue 3',
    group: 'frontend',
    level: 5,
    desc: '主要前端框架，組件設計與狀態管理'
  },
  {
    id: 'react',
    name: 'React 19',
    group: 'frontend',
    level: 4,
    desc: '函數式元件與 Hooks 實戰'
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    group: 'frontend',
    level: 5,
    desc: '現代 CSS 框架，快速原型開發'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    group: 'frontend',
    level: 4,
    desc: '類型安全的 JavaScript 開發'
  },

  // Database
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    group: 'database',
    level: 5,
    desc: '主要關聯式資料庫，複雜查詢優化'
  },
  {
    id: 'sqlserver',
    name: 'SQL Server',
    group: 'database',
    level: 4,
    desc: 'Enterprise 資料庫，Legacy 系統遷移'
  },
  {
    id: 'redis',
    name: 'Redis',
    group: 'database',
    level: 4,
    desc: '快取層設計與性能優化'
  },

  // DevOps
  {
    id: 'docker',
    name: 'Docker',
    group: 'devops',
    level: 4,
    desc: '容器化部署與微服務架構'
  },
  {
    id: 'git',
    name: 'Git',
    group: 'devops',
    level: 5,
    desc: '版本控制與協作開發'
  },

  // AI
  {
    id: 'ml',
    name: 'Machine Learning',
    group: 'ai',
    level: 3,
    desc: '機器學習基礎與應用'
  },
  {
    id: 'cv',
    name: 'Computer Vision',
    group: 'ai',
    level: 3,
    desc: '影像辨識與物件偵測'
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    group: 'ai',
    level: 3,
    desc: '深度學習框架'
  },

  // Soft Skills
  {
    id: 'architecture',
    name: '系統架構設計',
    group: 'soft',
    level: 5,
    desc: 'Legacy 系統重構與現代化'
  },
  {
    id: 'communication',
    name: '需求溝通',
    group: 'soft',
    level: 4,
    desc: '直接面對客戶與業務部門'
  },
  {
    id: 'debugging',
    name: '底層除錯',
    group: 'soft',
    level: 5,
    desc: '複雜問題診斷與解決'
  }
];

export const skillEdges: SkillEdge[] = [
  // Backend ecosystem
  { from: 'go', to: 'postgresql' },
  { from: 'go', to: 'redis' },
  { from: 'go', to: 'docker' },
  { from: 'delphi', to: 'sqlserver' },
  { from: 'vbnet', to: 'sqlserver' },
  { from: 'nodejs', to: 'postgresql' },

  // Frontend ecosystem
  { from: 'vue3', to: 'tailwind' },
  { from: 'vue3', to: 'typescript' },
  { from: 'react', to: 'tailwind' },
  { from: 'react', to: 'typescript' },

  // Full-stack connections
  { from: 'go', to: 'vue3' },
  { from: 'go', to: 'react' },
  { from: 'nodejs', to: 'react' },

  // Architecture & DevOps
  { from: 'architecture', to: 'docker' },
  { from: 'architecture', to: 'git' },
  { from: 'architecture', to: 'go' },

  // AI connections
  { from: 'ml', to: 'pytorch' },
  { from: 'cv', to: 'pytorch' },
  { from: 'ml', to: 'cv' },

  // Soft skills connections
  { from: 'communication', to: 'architecture' },
  { from: 'debugging', to: 'architecture' },
  { from: 'debugging', to: 'go' },
  { from: 'debugging', to: 'delphi' }
];

/**
 * 按 group 分組技能
 */
export function getSkillsByGroup(group: SkillNode['group']): SkillNode[] {
  return skillNodes.filter(node => node.group === group);
}

/**
 * 獲取相鄰節點（直接連接的技能）
 */
export function getAdjacentSkills(skillId: string): SkillNode[] {
  const connectedIds = new Set<string>();

  skillEdges.forEach(edge => {
    if (edge.from === skillId) connectedIds.add(edge.to);
    if (edge.to === skillId) connectedIds.add(edge.from);
  });

  return skillNodes.filter(node => connectedIds.has(node.id));
}

/**
 * 搜尋技能
 */
export function searchSkills(query: string): SkillNode[] {
  const lowerQuery = query.toLowerCase();
  return skillNodes.filter(
    node =>
      node.name.toLowerCase().includes(lowerQuery) ||
      node.desc?.toLowerCase().includes(lowerQuery)
  );
}

/**
 * 獲取所有 group
 */
export const skillGroups = Array.from(
  new Set(skillNodes.map(node => node.group))
);

/**
 * Group 的顯示名稱
 */
export const groupLabels: Record<SkillNode['group'], string> = {
  backend: '後端',
  frontend: '前端',
  database: '資料庫',
  devops: 'DevOps',
  ai: 'AI/ML',
  soft: '軟技能'
};
