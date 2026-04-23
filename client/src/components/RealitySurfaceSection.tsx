import { useRef, useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Reality Surface Section - 地表｜現實世界的驗證
 * 
 * Design Philosophy: Engineering Site & Real-World Validation
 * - Deep blue-gray background with engineering elements
 * - Grid patterns, blueprint lines, topographic contours
 * - Light source from top-left
 * - Three case study cards with consistent structure
 * - Grounded, practical, verification-focused atmosphere
 * - Sequential reveal animation with expandable details
 */

interface CaseStudy {
  category: string;
  title: string;
  challenge: string;
  decision: string;
  result: string;
  icon: string;
}

const caseStudies: CaseStudy[] = [
  {
    category: '後端系統｜企業系統｜高併發',
    title: '企業系統架構重構（從單體到可維護架構）',
    challenge: '系統已長期上線，無法停機重寫，效能與維護成本逐年上升',
    decision: '在不中斷服務的前提下，逐步拆解系統責任與資料邊界',
    result: '系統吞吐量提升 5 倍，維護風險與成本顯著降低',
    icon: '🏗️',
  },
  {
    category: '資料工程｜流程自動化',
    title: '資料管道現代化（從人工 ETL 到自動流程）',
    challenge: '原有流程高度依賴人工操作，資料品質與時效不穩定',
    decision: '將資料處理流程拆解為可監控、可回溯的自動化管道',
    result: '資料處理延遲從小時級降至分鐘級，錯誤率明顯下降',
    icon: '📊',
  },
  {
    category: '前端系統｜使用者體驗',
    title: '前端效能與體驗重構',
    challenge: '首屏載入時間過長，影響使用者體驗與轉換率',
    decision: '重構載入策略與元件拆分，優先優化關鍵路徑',
    result: '首屏載入時間由 8 秒降至 1.2 秒，轉換率提升 30%',
    icon: '⚡',
  },
];

interface ExpandedCard {
  [key: number]: boolean;
}

export default function RealitySurfaceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false]);
  const [expandedCards, setExpandedCards] = useState<ExpandedCard>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Sequential reveal animation
            setTimeout(() => setVisibleCards([true, false, false]), 100);
            setTimeout(() => setVisibleCards([true, true, false]), 300);
            setTimeout(() => setVisibleCards([true, true, true]), 500);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section
      id="reality"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-slate-900 py-24 px-4 overflow-hidden"
    >
      {/* Engineering surface background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663272154445/TvOwIIxjGTLPjYbA.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/50 to-slate-950/70" />
        
        {/* Top-left light source effect */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background:
              'radial-gradient(ellipse at 15% 20%, rgba(148, 163, 184, 0.2) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header - Chapter-like styling */}
        <div className="mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Orbitron', monospace" }}>
            <span className="text-slate-300">地表｜</span>
            <span className="text-slate-200">現實世界的驗證</span>
          </h2>
          <p className="font-mono text-slate-400 text-lg max-w-3xl">
            在限制、壓力與真實條件下，讓系統真的運作
          </p>
        </div>

        {/* Case study cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className={`transition-all duration-700 transform ${
                visibleCards[index]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 200}ms`,
              }}
            >
              <div className="relative h-full rounded-lg border border-slate-600/40 bg-slate-800/30 backdrop-blur-sm hover:border-slate-500/60 transition-all duration-300 overflow-hidden group">
                {/* Card background accent */}
                <div className="absolute top-0 left-0 w-1 h-12 bg-gradient-to-b from-cyan-400/50 to-transparent" />

                {/* Card content */}
                <div className="p-8 flex flex-col h-full">
                  {/* Category tag */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-slate-700/50 text-slate-300 text-xs font-mono rounded border border-slate-600/50">
                      {study.category}
                    </span>
                  </div>

                  {/* Icon and title */}
                  <div className="mb-6">
                    <div className="text-4xl mb-3">{study.icon}</div>
                    <h3
                      className="text-xl font-bold text-slate-100 leading-tight"
                      style={{ fontFamily: "'Orbitron', monospace" }}
                    >
                      {study.title}
                    </h3>
                  </div>

                  {/* Challenge - always visible */}
                  <div className="mb-6 pb-6 border-b border-slate-600/30">
                    <p className="font-mono text-xs text-slate-400 uppercase tracking-wide mb-2">
                      現實限制
                    </p>
                    <p className="font-mono text-sm text-slate-300 leading-relaxed">
                      {study.challenge}
                    </p>
                  </div>

                  {/* Expandable section - Decision & Result */}
                  <div className="flex-1 flex flex-col">
                    {/* Decision */}
                    <div
                      className={`mb-6 pb-6 border-b border-slate-600/30 transition-all duration-300 ${
                        expandedCards[index] ? 'opacity-100' : 'opacity-0 max-h-0 overflow-hidden'
                      }`}
                    >
                      <p className="font-mono text-xs text-slate-400 uppercase tracking-wide mb-2">
                        關鍵決策
                      </p>
                      <p className="font-mono text-sm text-slate-300 leading-relaxed">
                        {study.decision}
                      </p>
                    </div>

                    {/* Result */}
                    <div
                      className={`transition-all duration-300 ${
                        expandedCards[index] ? 'opacity-100' : 'opacity-0 max-h-0 overflow-hidden'
                      }`}
                    >
                      <p className="font-mono text-xs text-slate-400 uppercase tracking-wide mb-2">
                        可量化結果
                      </p>
                      <p className="font-mono text-sm text-cyan-300 font-semibold leading-relaxed">
                        {study.result}
                      </p>
                    </div>
                  </div>

                  {/* Expand button */}
                  <button
                    onClick={() => toggleExpand(index)}
                    className="mt-6 pt-6 border-t border-slate-600/30 flex items-center justify-between w-full text-slate-400 hover:text-slate-200 transition-colors duration-200 group"
                  >
                    <span className="font-mono text-xs uppercase tracking-wide">
                      {expandedCards[index] ? '收起' : '了解詳情'}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${
                        expandedCards[index] ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
