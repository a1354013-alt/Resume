import { useState, useEffect } from 'react';
import SEOHead from '@/components/SEOHead';
import { Link } from 'wouter';
import { ChevronUp } from 'lucide-react';
import AiProjectGallery from '@/components/AiProjectGallery';
import AiDemoConsole from '@/components/AiDemoConsole';

/**
 * Biography Page - 自傳頁面
 * 
 * Design Philosophy: Deep Space Techno
 * - Professional, narrative-driven layout
 * - Career highlights for quick scanning
 * - Detailed personal statement
 * - Clean typography and spacing
 */

export default function Biography() {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = '羅揚文 Luo Yang-Wen';
  // Memoize fullText to prevent unnecessary re-renders
  const memoizedText = fullText;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let index = 0;
    let lastTime = 0;
    const speed = 80; // ms per character

    const animate = (currentTime: number) => {
      if (lastTime === 0) lastTime = currentTime;
      
      if (currentTime - lastTime >= speed) {
        if (index < fullText.length) {
          setDisplayedText(fullText.substring(0, index + 1));
          index++;
          lastTime = currentTime;
        }
      }
      
      if (index < fullText.length) {
        requestAnimationFrame(animate);
      }
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [fullText]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const highlights = [
    {
      title: '新舊架構橋樑',
      description: '擅長在無文件的舊系統（Legacy Code）中梳理邏輯，並成功平移至現代 Web 架構（Go / Vue 3）。'
    },
    {
      title: '硬核除錯實力',
      description: '具備底層除錯能力，曾主動解決 Delphi 核心簽核模組長年存在的記憶體洩漏問題，將系統崩潰率降至趨近於零。'
    },
    {
      title: '第一線需求轉譯',
      description: '透過「程式客服」直接面對客戶收斂需求，將模糊的「許願」轉化為精準的技術規格。'
    },
    {
      title: '全端與 AI 持續進階',
      description: '熟練 Go (Echo) 與 SQL 複雜關聯設計，目前於彰師大資工所專研 AI 影像處理。'
    }
  ];

  return (
    <>
      <SEOHead
        title="我的自傳 - 羅揚文 | 系統工程師"
        description="羅揚文的個人自傳，分享從硬體自動化轉向全端開發的職涯歷程，以及在 Legacy 系統重構中的實務經驗。"
        ogTitle="我的自傳 - 羅揚文"
        ogDescription="從混亂到秩序，從表象到核心。企業級系統重構的專家自傳。"
        canonical="https://animated-resume-portfolio.manus.space/biography"
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
            <h1 className="font-mono text-sm text-slate-400">自傳</h1>
            <div className="flex gap-4 items-center">
              <Link href="/resume">
                <a className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors">
                  我的履歷
                </a>
              </Link>
              <span className="text-slate-600">|</span>
              <Link href="/projects">
                <a className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors">
                  我的作品
                </a>
              </Link>
              <span className="text-slate-600">|</span>
              <button
                onClick={scrollToTop}
                className="font-mono text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                回到頂部 ↑
              </button>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
          {/* Header Section */}
          <section className="space-y-8">
            <div className="border-l-2 border-cyan-500/50 pl-8 py-4">
              <h1 className="text-4xl font-bold text-cyan-400 mb-2" style={{ fontFamily: "'Orbitron', monospace" }}>
                {displayedText}
                {displayedText.length < fullText.length && <span className="animate-pulse">|</span>}
              </h1>
              <p className="text-xl text-slate-300 font-mono">
                求職自傳
              </p>
              <p className="text-sm text-slate-500 mt-4 font-mono">
                ERP 系統開發工程師｜全端開發｜系統架構
              </p>
            </div>
          </section>

          {/* Career Highlights */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-8" style={{ fontFamily: "'Orbitron', monospace" }}>
              ▸ 職涯亮點（主管快速掃描）
            </h2>

            <div className="space-y-6">
              {highlights.map((highlight, index) => (
                <div key={index} className="border-l-4 border-cyan-500 pl-6 py-4 bg-slate-900/30 rounded-r-lg">
                  <h3 className="text-cyan-400 font-bold mb-2">{highlight.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* About Me */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-8" style={{ fontFamily: "'Orbitron', monospace" }}>
              ▸ 關於我：從硬體自動化轉向全端開發
            </h2>

            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>
                我目前擔任 ERP 系統開發工程師。我的背景來自自動化工程，這讓我在面對問題時，習慣先拆解流程、確認狀態與例外條件，對邏輯判斷與流程控制特別敏感。轉職進入軟體領域後，我發現這樣的思維方式，與系統開發中對穩定性與正確性的要求高度契合。
              </p>

              <p>
                目前我以 Go 與 Vue 3 作為主要開發技術，負責 Web ERP 模組的設計、開發與重構。同時，因公司正處於系統轉型階段，我也需深入維護既有的 Delphi 系統與 SQL Server 資料庫。這樣的工作型態，使我能同時理解舊系統的歷史脈絡，也能以現代架構重新整理既有邏輯，確保系統在穩定性與可維護性之間取得平衡。
              </p>
            </div>
          </section>

          {/* Dual Track Experience */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-8" style={{ fontFamily: "'Orbitron', monospace" }}>
              ▸ 在雙軌制度下的實戰：舊系統的考古與修復
            </h2>

            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>
                公司目前同時運行舊有的 Delphi 系統與新建置的 Web 系統。我的日常工作除了開發 Web ERP 功能外，也經常需要處理第一線程式客服回報的系統問題。
              </p>

              <p>
                由於許多舊功能缺乏文件，我必須從原始碼與資料庫結構中反向推敲實際的業務邏輯，逐步釐清系統真正的運作方式。其中讓我印象最深刻的案例，是成功解決簽核模組長期存在的記憶體洩漏問題。過去使用者常反映系統長時間運作後會當機，甚至無法正常關閉。我透過追蹤物件的生命週期，逐一找出動態建立卻未正確釋放的元件並加以修正，大幅提升系統穩定度，也明顯減少客服端的抱怨案件。
              </p>

              <p>
                這段經驗讓我建立起一套面對舊系統問題的處理原則：先讓系統穩定，再理解邏輯，最後才進行重構，而不是在尚未掌握全貌前貿然重寫。
              </p>
            </div>
          </section>

          {/* Web Refactoring */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-8" style={{ fontFamily: "'Orbitron', monospace" }}>
              ▸ Web 化重構：不只是搬移，而是重新梳理
            </h2>

            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>
                在參與並主導核心模組轉移至 Web 架構的過程中，我刻意避免單純照搬舊系統的實作方式，而是重新檢視既有流程，分辨哪些是過去環境限制下的產物，哪些才是真正不可取代的業務核心，再決定如何在新架構中實作。
              </p>

              <p>
                在前端設計上，我以元件化思維重新整理原本操作複雜、容易誤用的資料列表與預算扣抵流程，讓使用者在不需額外思考的情況下，也能依照正確順序完成操作。後端則透過清楚的結構與責任切分，將原本混雜於畫面事件中的商業邏輯拆解出來，提升程式可讀性與後續維護效率。
              </p>

              <p>
                此外，我主動導入資料庫版本管理機制，讓資料結構的調整能被清楚追蹤與回溯，降低多人協作與頻繁改版時產生資料不一致的風險，確保系統演進過程是可控且穩定的。
              </p>
            </div>
          </section>

          {/* Communication & Design Philosophy */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-8" style={{ fontFamily: "'Orbitron', monospace" }}>
              ▸ 第一線的溝通與防呆哲學
            </h2>

            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>
                我具備直接面對客戶與使用者的溝通經驗，並不將工程師角色視為單純被動接收需求。我認為客戶在提出需求時，往往只看到眼前的操作情境，未必能全面評估其對系統整體結構與長期維護的影響。
              </p>

              <p>
                因此，在需求討論階段，我會先協助釐清真正的使用目的，並主動指出可能產生的邏輯衝突與風險，再提出可行的替代方案。我的目標不是否定需求，而是在系統可維護、可長期運作的前提下，協助客戶找到最合適的解法。
              </p>

              <p>
                同時，受到自動化工程背景的影響，我對防呆設計有高度重視，會從操作流程與畫面設計層面降低人為誤填的可能性，確保系統在第一線實際操作時，能維持直覺、穩定且不易出錯的狀態。
              </p>
            </div>
          </section>

          {/* Future Vision */}
          <section className="space-y-8">
            <h2 className="text-2xl font-bold text-cyan-400 mb-8" style={{ fontFamily: "'Orbitron', monospace" }}>
              ▸ 自我提升與展望
            </h2>

            <div className="space-y-6 text-slate-300 leading-relaxed">
              <p>
                目前我持續進修資訊工程相關研究，專注於物件偵測與影像辨識領域，並思考如何將相關技術實際應用於企業系統中，例如自動檢核、異常偵測或流程優化等情境。
              </p>

              <p>
                我認為自己是一名能深入處理底層問題、理解系統結構，同時也能規劃前端操作流程，並直接與使用者與客戶溝通的全端工程師。我擅長面對複雜且缺乏文件的系統，並在既有條件限制下，找出最務實且可長期維護的解法。
              </p>

              <p>
                未來我期望能加入一個重視程式碼品質、系統穩定性與架構思維的團隊，持續打造真正能長久運作的系統。
              </p>
            </div>
          </section>

          {/* AI Projects Gallery */}
          <AiProjectGallery />

          {/* AI Demo Console */}
          <AiDemoConsole />

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
