import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Projects Section - Layered Project Presentation
 * 
 * Design Philosophy: System Detection & Engineering
 * - Layer 1: Core Detection Missions (Maximum visual weight)
 * - Layer 2: Capability Extensions (Secondary, collapsible)
 * - Layer 3: Exploration Records (Collapsed by default)
 * 
 * Focus: Complex systems that cannot fail, real-world constraints
 */

interface CoreProject {
  id: string;
  name: string;
  background: string;
  constraints: string[];
  approach: string[];
  results: string[];
}

interface ExtensionProject {
  id: string;
  name: string;
  problem: string;
  description: string;
}

const coreProjects: CoreProject[] = [
  {
    id: 'engineering-integration',
    name: '工務整合系統',
    background: '企業工程管理的核心系統，涵蓋工程變更、預算、採購、估驗等流程',
    constraints: [
      '系統已長期上線，無法停機重寫',
      '資料關聯複雜，一個小修改可能牽動整個流程',
      '多部門依賴，流程規則隱藏在程式與資料結構中',
      '需要在不中斷服務的前提下逐步現代化',
    ],
    approach: [
      '逐步拆解系統責任與資料邊界',
      '從 Delphi 單體系統重構為 Vue 3 + Go 架構',
      '在保持既有流程的前提下，讓系統變得更清楚、更可維護',
      '建立清晰的 API 與資料模型，對齊現實流程',
    ],
    results: [
      '系統吞吐量提升 5 倍',
      '維護風險與成本顯著降低',
      '新功能開發週期縮短 60%',
      '系統穩定性達到 99.9% 以上',
    ],
  },
  {
    id: 'change-tracking',
    name: '變更追加減系統',
    background: '工程變更管理的專門系統，涉及複雜的預算追蹤、審核流程、報表生成',
    constraints: [
      '涉及財務資料，精度要求極高，不容許任何計算錯誤',
      '多層級審核流程，規則繁複且經常變動',
      '需要與工務系統、採購系統、財務系統聯動',
      '歷史資料龐大，遷移風險高',
    ],
    approach: [
      '設計清楚的流程狀態機制，確保每個環節可追蹤',
      '建立驗證規則引擎，把隱性規則轉成可驗證的邏輯',
      '實現完整的審計日誌，所有變更都可回溯',
      '逐步遷移資料，並行運行新舊系統以驗證正確性',
    ],
    results: [
      '資料處理延遲從小時級降至分鐘級',
      '錯誤率從 2% 降至 0.1% 以下',
      '審核效率提升 3 倍',
      '所有財務變更都有完整追蹤記錄',
    ],
  },
  {
    id: 'approval-system',
    name: '簽核系統',
    background: '企業工作流簽核平台，涉及多角色、多層級的審核流程，是企業決策的關鍵節點',
    constraints: [
      '簽核流程多樣且頻繁變動，需要高度靈活性',
      '涉及多部門協作，流程規則難以統一',
      '簽核延遲直接影響企業決策速度',
      '需要完整的權限控制與審計追蹤',
    ],
    approach: [
      '設計通用的流程引擎，支援動態流程定義',
      '實現角色與權限的細粒度控制',
      '建立流程模板系統，讓業務人員可自行配置',
      '提供即時通知與進度追蹤，加速簽核流程',
    ],
    results: [
      '簽核平均時間從 3 天降至 4 小時',
      '支援 15+ 種不同的簽核流程',
      '簽核準確率達到 99.8%',
      '業務人員可自行配置新流程，無需技術支援',
    ],
  },
];

const extensionProjects: ExtensionProject[] = [
  {
    id: 'yolo-detection',
    name: 'YOLO 安全帽偵測',
    problem: '工地安全監測',
    description: '使用 YOLO 物件偵測技術，實時識別工地人員是否佩戴安全帽，提升工地安全管理效率',
  },
  {
    id: 'document-ai',
    name: '智慧文件與照片分類助理',
    problem: '文件自動化處理',
    description: '使用 OCR 與 AI 分類技術，自動識別與分類企業文件與照片，減少人工操作，提升流程效率',
  },
  {
    id: 'covid-detection',
    name: 'COVID-19 肺炎檢測',
    problem: '醫療影像診斷輔助',
    description: '使用深度學習模型分析 X 光影像，輔助醫療人員進行肺炎診斷，加速診療流程',
  },
];

export default function ProjectsSection() {
  const [expandedExtension, setExpandedExtension] = useState(false);
  const [expandedExploration, setExpandedExploration] = useState(false);

  return (
    <section
      id="projects"
      className="relative w-full bg-black py-24 px-4 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Orbitron', monospace", color: '#00d9ff' }}>
            作品 | 系統探測
          </h2>
          <p className="font-mono text-slate-400 text-lg max-w-3xl">
            在真實環境下，處理複雜、不能出錯的系統。每個專案都代表一次在限制與壓力下的系統重構與優化。
          </p>
        </div>

        {/* Layer 1: Core Detection Missions */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold mb-12" style={{ fontFamily: "'Orbitron', monospace", color: '#00d9ff' }}>
            ▸ 第一層 | 核心探測任務
          </h3>

          <div className="space-y-8">
            {coreProjects.map((project, idx) => (
              <CoreProjectNode key={project.id} project={project} index={idx} />
            ))}
          </div>
        </div>

        {/* Layer 2: Capability Extensions */}
        <div className="mb-16 border-t border-slate-700/30 pt-16">
          <h3 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Orbitron', monospace", color: '#fbbf24' }}>
            ▸ 第二層 | 能力延伸任務
          </h3>

          {!expandedExtension ? (
            <button
              onClick={() => setExpandedExtension(true)}
              className="w-full py-3 px-4 bg-slate-800/30 hover:bg-slate-800/50 border border-slate-600/30 rounded-lg font-mono text-slate-300 transition-all duration-300 flex items-center justify-between"
            >
              <span>展開能力延伸任務（3 個專案）</span>
              <ChevronDown size={20} />
            </button>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {extensionProjects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 bg-slate-900/40 border border-amber-500/20 rounded-lg hover:border-amber-400/50 transition-all"
                  >
                    <p className="font-mono font-bold text-amber-300 text-sm mb-2">{project.name}</p>
                    <p className="font-mono text-xs text-amber-600 mb-2">問題：{project.problem}</p>
                    <p className="font-mono text-xs text-slate-400">{project.description}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setExpandedExtension(false)}
                className="w-full py-2 px-4 bg-slate-800/20 hover:bg-slate-800/40 border border-slate-600/20 rounded-lg font-mono text-slate-400 text-sm transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>收合</span>
                <ChevronUp size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Layer 3: Exploration Records */}
        <div className="border-t border-slate-700/30 pt-16">
          <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "'Orbitron', monospace", color: '#64748b' }}>
            ▸ 第三層 | 探索紀錄
          </h3>

          {!expandedExploration ? (
            <button
              onClick={() => setExpandedExploration(true)}
              className="py-2 px-4 bg-slate-800/20 hover:bg-slate-800/40 border border-slate-600/20 rounded-lg font-mono text-slate-500 text-sm transition-all duration-300 flex items-center gap-2"
            >
              <span>其他學習與實驗專案</span>
              <ChevronDown size={16} />
            </button>
          ) : (
            <div className="space-y-3">
              <p className="font-mono text-xs text-slate-500 leading-relaxed">
                回話小助手、英文練習題、麵包店網站、介紹豐原、照片風格轉換系統等學習與實驗專案，
                用於探索不同技術領域，但不作為核心能力定位。
              </p>
              <button
                onClick={() => setExpandedExploration(false)}
                className="py-2 px-4 bg-slate-800/20 hover:bg-slate-800/40 border border-slate-600/20 rounded-lg font-mono text-slate-500 text-sm transition-all duration-300 flex items-center gap-2"
              >
                <span>收合</span>
                <ChevronUp size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Core Project Node Component
interface CoreProjectNodeProps {
  project: CoreProject;
  index: number;
}

function CoreProjectNode({ project, index }: CoreProjectNodeProps) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <div
      className="group relative"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Node indicator */}
      <div className="absolute -left-6 top-4 w-3 h-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />

      {/* Main card */}
      <div className="relative p-6 bg-gradient-to-br from-slate-900/60 to-slate-950/60 border border-cyan-500/30 rounded-lg hover:border-cyan-400/60 transition-all duration-300 cursor-pointer">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h4 className="text-2xl font-bold text-cyan-300 mb-2" style={{ fontFamily: "'Orbitron', monospace" }}>
              {project.name}
            </h4>
            <p className="font-mono text-sm text-slate-400">{project.background}</p>
          </div>
          <div className="text-cyan-400 text-xl flex-shrink-0 ml-4">
            {expanded ? '▼' : '▶'}
          </div>
        </div>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-6 space-y-4 border-t border-slate-700/50 pt-4">
            {/* Constraints */}
            <div>
              <p className="font-mono text-xs font-bold text-amber-400 mb-2">現實限制</p>
              <ul className="space-y-1">
                {project.constraints.map((constraint, idx) => (
                  <li key={idx} className="font-mono text-xs text-slate-400">
                    • {constraint}
                  </li>
                ))}
              </ul>
            </div>

            {/* Approach */}
            <div>
              <p className="font-mono text-xs font-bold text-blue-400 mb-2">關鍵處理方式</p>
              <ul className="space-y-1">
                {project.approach.map((item, idx) => (
                  <li key={idx} className="font-mono text-xs text-slate-400">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Results */}
            <div>
              <p className="font-mono text-xs font-bold text-green-400 mb-2">最終結果</p>
              <ul className="space-y-1">
                {project.results.map((result, idx) => (
                  <li key={idx} className="font-mono text-xs text-slate-400">
                    ✓ {result}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
