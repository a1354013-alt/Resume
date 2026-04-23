import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ChevronUp } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import CareerTimelineSection from '@/components/CareerTimelineSection';
import StarSkillTreeSection from '@/components/StarSkillTreeSection';

/**
 * Resume Page - 宇宙風格履歷
 * 
 * Design Philosophy: Deep Space Techno
 * - Clean, professional layout with ample whitespace
 * - Star field background with subtle animations
 * - Orbital structure for experience timeline
 * - Quick-scan format for HR professionals
 */

export default function Resume() {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const fullTitle = '系統工程師';
  // Memoize fullTitle to prevent unnecessary re-renders
  const memoizedTitle = fullTitle;

  useEffect(() => {
    let index = 0;
    let lastTime = 0;
    const speed = 100; // ms per character

    const animate = (currentTime: number) => {
      if (lastTime === 0) lastTime = currentTime;
      
      if (currentTime - lastTime >= speed) {
        if (index < fullTitle.length) {
          setDisplayedTitle(fullTitle.slice(0, index + 1));
          index++;
          lastTime = currentTime;
        }
      }
      
      if (index < fullTitle.length) {
        requestAnimationFrame(animate);
      }
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [fullTitle]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEOHead
        title="我的履歷 - 羅揚文 | 系統工程師"
        description="系統工程師履歷，展示 ERP 系統開發、Legacy 系統重構、Go/Vue 3 全端開發的工作經驗。"
        ogTitle="我的履歷 - 羅揚文"
        ogDescription="企業級系統重構與現代化架構設計的實務經驗。"
        canonical="https://animated-resume-portfolio.manus.space/resume"
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 page-fade-in">
        {/* Star field background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-cyan-400"
                style={{
                  width: Math.random() * 2 + 1 + 'px',
                  height: Math.random() * 2 + 1 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  opacity: Math.random() * 0.5 + 0.3,
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Navigation */}
          <nav className="sticky top-0 z-50 bg-slate-950/60 backdrop-blur-md border-b border-cyan-500/10">
            <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
              <Link href="/">
                <a className="font-mono text-cyan-400 hover:text-cyan-300 transition-colors">
                  ← 回到首頁
                </a>
              </Link>
              <h1 className="font-mono text-sm text-slate-400">我的履歷</h1>
              <div className="flex gap-4 items-center">
                <Link href="/projects">
                  <a className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors">
                    我的作品
                  </a>
                </Link>
                <span className="text-slate-600">|</span>
                <Link href="/biography">
                  <a className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors">
                    我的自傳
                  </a>
                </Link>
              </div>
            </div>
          </nav>

          {/* Main content */}
          <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
            {/* Header Section */}
            <section className="space-y-8">
              <div className="border-l-2 border-cyan-500/50 pl-8 py-4">
                <h1 className="text-5xl font-bold text-cyan-400 mb-2" style={{ fontFamily: "'Orbitron', monospace" }}>
                  {displayedTitle}
                  {displayedTitle.length < fullTitle.length && <span className="animate-pulse">▌</span>}
                </h1>
                <p className="text-xl text-slate-300 font-mono">
                  專注於企業級 Legacy 系統重構與現代化架構設計，擅長在不中斷營運的前提下，提升系統穩定性與可維護性
                </p>
                <p className="text-sm text-slate-500 mt-4 font-mono">
                  自動化工程背景｜企業系統開發實務經驗
                </p>
              </div>
            </section>

            {/* Work Experience Timeline */}
            <section className="space-y-8">
              <h2 className="text-2xl font-bold text-cyan-400 mb-8" style={{ fontFamily: "'Orbitron', monospace" }}>
                ▸ 工作經歷
              </h2>
              <div className="space-y-8">
                <div className="border-l-2 border-purple-500/50 pl-8 py-4">
                  <h3 className="text-lg font-semibold text-purple-300 mb-1">資深系統工程師</h3>
                  <p className="text-sm text-slate-400 mb-3">2021 - 現在 | ERP 系統開發</p>
                  <ul className="space-y-2 text-slate-300 font-mono text-sm">
                    <li>• 主導 Delphi ERP 系統重構，梳理多年累積的 Legacy Code</li>
                    <li>• 開發 Web 化模組（Go Echo + Vue 3），提升系統易用性</li>
                    <li>• 解決 Delphi 核心簽核模組的記憶體洩漏問題</li>
                    <li>• 設計複雜 SQL 關聯邏輯，優化資料庫效能</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Core Skills */}
            <section className="space-y-8">
              <h2 className="text-2xl font-bold text-cyan-400 mb-8" style={{ fontFamily: "'Orbitron', monospace" }}>
                ▸ 核心技能
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/50 border border-cyan-500/20 rounded-lg p-6">
                  <h3 className="text-cyan-400 font-mono mb-4">後端開發</h3>
                  <div className="space-y-2 font-mono text-sm text-slate-300">
                    <p>Go (Echo Framework)</p>
                    <p>SQL Server / MySQL</p>
                    <p>Delphi (Legacy)</p>
                    <p>系統架構設計</p>
                  </div>
                </div>
                <div className="bg-slate-900/50 border border-purple-500/20 rounded-lg p-6">
                  <h3 className="text-purple-400 font-mono mb-4">前端開發</h3>
                  <div className="space-y-2 font-mono text-sm text-slate-300">
                    <p>Vue 3 / React</p>
                    <p>TypeScript</p>
                    <p>Tailwind CSS</p>
                    <p>UI/UX 優化</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="space-y-8">
              <h2 className="text-2xl font-bold text-cyan-400 mb-8" style={{ fontFamily: "'Orbitron', monospace" }}>
                ▸ 教育背景
              </h2>
              <div className="space-y-6">
                <div className="border-l-2 border-cyan-500/50 pl-8 py-4">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-1">建國科技大學</h3>
                  <p className="text-sm text-slate-400 mb-2">自動化工程系</p>
                  <p className="text-slate-300 font-mono text-sm">
                    系統思維、邏輯設計、控制系統、工程規劃的完整訓練
                  </p>
                </div>
                <div className="border-l-2 border-purple-500/50 pl-8 py-4">
                  <h3 className="text-lg font-semibold text-purple-300 mb-1">國立彰化師範大學</h3>
                  <p className="text-sm text-slate-400 mb-2">人工智慧科技應用（在職／進修）</p>
                  <p className="text-slate-300 font-mono text-sm">
                    機器學習、深度學習應用、影像辨識與 AI 系統實務研究
                  </p>
                </div>
              </div>
            </section>

            {/* Key Achievements */}
            <section className="space-y-8">
              <h2 className="text-2xl font-bold text-cyan-400 mb-8" style={{ fontFamily: "'Orbitron', monospace" }}>
                ▸ 關鍵成果
              </h2>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border-l-2 border-cyan-500/50 pl-8 py-4">
                  <h3 className="text-cyan-300 font-semibold mb-2">系統重構與穩定性提升</h3>
                  <p className="text-slate-300 font-mono text-sm">
                    主導既有 Delphi ERP 系統的重構與現代化，逐步梳理多年累積的 Legacy Code 與資料流程，在不影響既有營運與使用者作業的前提下，改善系統效能瓶頸並提升整體穩定性。
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-500/10 to-transparent border-l-2 border-purple-500/50 pl-8 py-4">
                  <h3 className="text-purple-300 font-semibold mb-2">維運負擔與風險降低</h3>
                  <p className="text-slate-300 font-mono text-sm">
                    透過模組拆分與邏輯整理，降低系統耦合度，使問題排查與後續維護更加單純，明顯減少緊急修補與人工介入的情況。
                  </p>
                </div>
                <div className="bg-gradient-to-r from-indigo-500/10 to-transparent border-l-2 border-indigo-500/50 pl-8 py-4">
                  <h3 className="text-indigo-300 font-semibold mb-2">操作流程優化與防呆設計</h3>
                  <p className="text-slate-300 font-mono text-sm">
                    將高度仰賴人工經驗的操作流程進行 Web 化，並導入防呆機制，降低使用者操作門檻，減少錯誤發生，提升實際使用效率與整體體驗。
                  </p>
                </div>
                <div className="bg-gradient-to-r from-pink-500/10 to-transparent border-l-2 border-pink-500/50 pl-8 py-4">
                  <h3 className="text-pink-300 font-semibold mb-2">舊系統現代化轉型實務經驗</h3>
                  <p className="text-slate-300 font-mono text-sm">
                    在保留既有商業邏輯與資料正確性的前提下，成功推動 Delphi 舊系統向現代 Web 架構轉型，確保系統平滑過渡並持續穩定運作。
                  </p>
                </div>
              </div>
            </section>

            {/* Career Timeline Section */}
            <CareerTimelineSection />

            {/* Star Skill Tree Section */}
            <StarSkillTreeSection />

            {/* Footer spacing */}
            <div className="h-12" />
          </div>

          {/* Scroll to top button */}
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-full transition-all duration-300 z-40"
          >
            <ChevronUp className="w-5 h-5 text-cyan-400" />
          </button>
        </div>
      </div>
    </>
  );
}
