import { useEffect, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";
import { profile } from "@/data/profile";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import StarFieldBackground from "@/components/StarFieldBackground";

export default function Biography() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = `${profile.name}${profile.nameEn ? ` · ${profile.nameEn}` : ""}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let index = 0;
    let lastTime = 0;
    const speed = 60;
    let rafId: number | null = null;
    let cancelled = false;

    const animate = (currentTime: number) => {
      if (cancelled) return;
      if (lastTime === 0) lastTime = currentTime;

      if (currentTime - lastTime >= speed) {
        if (index < fullText.length) {
          setDisplayedText(fullText.substring(0, index + 1));
          index++;
          lastTime = currentTime;
        }
      }

      if (index < fullText.length) rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => {
      cancelled = true;
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [fullText]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <SEOHead
        title={`Biography | ${profile.name}`}
        description={profile.background}
        canonicalPath="/biography"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 page-fade-in">
        <StarFieldBackground />

        <div className="relative z-10">
          <nav className="sticky top-0 z-50 bg-slate-950/60 backdrop-blur-md border-b border-cyan-500/10">
            <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
              <Link href="/">
                <a className="font-mono text-cyan-400 hover:text-cyan-300 transition-colors">
                  Home
                </a>
              </Link>
              <h1 className="font-mono text-sm text-slate-400">Biography</h1>
              <div className="flex gap-4 items-center">
                <Link href="/resume">
                  <a className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors">
                    Resume
                  </a>
                </Link>
                <span className="text-slate-600">|</span>
                <Link href="/projects">
                  <a className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors">
                    Projects
                  </a>
                </Link>
                <span className="text-slate-600">|</span>
                <button
                  onClick={scrollToTop}
                  className="font-mono text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Back to top
                </button>
              </div>
            </div>
          </nav>

          <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
            <section className="space-y-6">
              <h2
                className="text-4xl md:text-5xl font-bold text-cyan-400"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                {displayedText}
              </h2>

              <p className="text-slate-300 leading-relaxed">{profile.tagline}</p>
              <p className="text-slate-300 leading-relaxed">
                我將自己的核心定位為{" "}
                <span className="text-slate-100 font-medium">
                  「遺留系統邏輯翻譯機 × 高風險需求技術顧問」
                </span>
                ：面對缺乏文件、流程複雜且具有歷史包袱的企業系統，能從程式碼與資料層反向釐清業務邏輯，完成根因分析、風險控管與可落地的重構與優化，並在導入階段讓系統真正被使用者接受。
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="bg-slate-900/40 border border-slate-700/40 rounded-lg p-4">
                  <p className="text-xs text-slate-500 mb-2">教育背景</p>
                  <p className="text-slate-200 font-medium">
                    建國科技大學｜自動化工程
                  </p>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                    彰化師範大學資工所碩士班（AI 影像領域）
                  </p>
                </div>

                <div className="bg-slate-900/40 border border-slate-700/40 rounded-lg p-4">
                  <p className="text-xs text-slate-500 mb-2">現職</p>
                  <p className="text-slate-200 font-medium">ERP 系統開發工程師</p>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                    功能開發 / 維護 / 重構 / Web 化 / 效能優化
                  </p>
                </div>

                <div className="bg-slate-900/40 border border-slate-700/40 rounded-lg p-4">
                  <p className="text-xs text-slate-500 mb-2">關鍵亮點</p>
                  <p className="text-slate-200 font-medium">
                    N+1 Query：26s → &lt; 1s
                  </p>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                    主導多套系統 Web 化、根因分析與防錯設計
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-cyan-300">
                背景與定位：從第一線經驗走向系統開發
              </h3>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  我畢業於建國科技大學自動化工程系，具備紮實的邏輯訓練基礎。畢業後曾在傳統工廠第一線歷練，讓我能站在作業人員視角理解系統操作中的摩擦點，也養成從使用情境出發梳理需求與風險的習慣。
                </p>
                <p>
                  在工作過程中明確發現自己對軟體開發的熱忱，因此投入職訓局接受為期半年的「網頁設計與網路應用」訓練，並以第一名成績結業。這段跨領域學習建立了程式開發基礎，也讓我在設計系統時能同時兼顧工程邏輯與使用者體驗。
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-cyan-300">
                舊系統除錯與重構：先穩定、再理解、最後重構
              </h3>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  目前我擔任 ERP 系統開發工程師，負責系統功能開發、維護與重構；日常也需要直接處理第一線客服回報的系統問題。面對缺乏完整文件的舊系統，我會從原始碼與資料庫結構反向推敲，釐清業務邏輯與資料流程，並以「穩定、可維護、可落地」作為決策優先順序。
                </p>

                <div className="bg-slate-900/30 border border-slate-700/40 rounded-lg p-5 space-y-3">
                  <p className="text-slate-200 font-medium">
                    代表性除錯與防錯成果
                  </p>
                  <ul className="space-y-3">
                    <li>
                      <span className="text-cyan-300 font-medium">
                        記憶體洩漏修正（Memory Leak）
                      </span>
                      ：簽核模組長時間運作後容易當機；透過追蹤物件生命週期與動態元件排查，定位未正確釋放的程式段落並修正，使伺服器恢復穩定、當機頻率與相關客訴明顯降低。
                    </li>
                    <li>
                      <span className="text-cyan-300 font-medium">
                        Delphi 遺留系統防重複點擊與防錯設計
                      </span>
                      ：因使用者快速重複點擊導致隱蔽資料異常；逐行梳理 Delphi 程式碼後重整事件流程，導入執行狀態鎖定以避免重複觸發，並補齊例外回復機制，從流程層面降低誤操作帶來的資料風險。
                    </li>
                    <li>
                      <span className="text-cyan-300 font-medium">
                        工程變更拋轉採發異常的根因分析（EB_SPECI / CRLF）
                      </span>
                      ：工程變更轉入採發時出現數量未正確轉入、影響後續採購與金額計算；在排除程式邏輯後，改由資料層追查，以字串長度與逐字 ASCII 解析找出 EB_SPECI 尾端夾帶隱藏 CR/LF，並完成歷史資料清洗與統一字串淨化（Trim + Replace CR/LF），從源頭根絕資料污染與跨系統拋轉風險。
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-cyan-300">
                系統 Web 化與效能優化：讓系統不只是能用，而是好用
              </h3>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  隨著公司推動系統 Web 化，我主導並完成「預算採發估驗」、「變更追加減」、「高階簽核」與「人事出勤」共四套核心系統的架構轉移。過程中並非單純照搬既有程式碼，而是重新檢視業務流程、釐清必要步驟並進行結構簡化，降低後續維護成本。
                </p>
                <p>
                  在前端，我以元件化方式重整結構複雜且易誤用的預算扣抵流程，使操作更直覺；在後端則切割商業邏輯與畫面事件，降低耦合、提高可維護性。
                </p>
                <div className="bg-slate-900/30 border border-slate-700/40 rounded-lg p-5 space-y-3">
                  <p className="text-slate-200 font-medium">效能優化案例</p>
                  <p>
                    近期簽核網站面臨明顯效能瓶頸；隨資料量增加，頁面載入嚴重遲緩。分析後確認存在典型{" "}
                    <span className="text-slate-100 font-medium">
                      N+1 Query
                    </span>{" "}
                    問題，將逐筆查詢重構為集中式批次查詢後，頁面回應時間由{" "}
                    <span className="text-slate-100 font-medium">26 秒</span>{" "}
                    大幅縮短至{" "}
                    <span className="text-slate-100 font-medium">1 秒內</span>
                    ，同時降低資料庫負載並提升使用者體感。
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-cyan-300">
                系統導入與跨部門溝通：讓系統真正落地
              </h3>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  我曾參與皇昌營造、德昌營造等上市櫃企業的 ERP 系統導入。這類專案最具挑戰性的往往是歷史資料轉換：需要在格式與品質參差不齊的前提下完成清理、比對與驗證，確保新舊系統順利銜接，並避免導入後的帳務與流程風險。
                </p>
                <p>
                  另曾前往格瑞、富旺、精銳與惠宇建設等現場，面對管理層與第一線使用者進行教育訓練與專案簡報。這些跨部門溝通經驗，結合早期傳統工廠第一線歷練，使我能在需求訪談與開發階段更精準掌握角色差異、預先佈署防錯設計，讓系統在真實環境中穩定運作。
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-cyan-300">
                AI 研究與未來方向
              </h3>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  為了將系統開發與前瞻技術結合，目前就讀於彰化師範大學資訊工程研究所碩士班，專注於 AI 物件偵測與影像辨識。實作上已能熟練運用 Python 與深度學習框架，完成「暴力行為偵測」與「醫療影像分析」等專案，並持續優化模型效能與系統整合能力。
                </p>
                <p>
                  長期目標是把 AI 技術實質整合進企業應用：在系統維持穩定可用的前提下，逐步引入智慧化能力，讓流程不只自動化，更能提升風險偵測與決策效率。
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 hover:bg-cyan-500/30 transition-colors"
                  href={`mailto:${profile.contact.email}`}
                >
                  Email
                </a>
                <a
                  className="px-4 py-2 rounded-lg bg-slate-800/40 border border-slate-700/40 text-slate-200 hover:bg-slate-800/60 transition-colors"
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className="px-4 py-2 rounded-lg bg-slate-800/40 border border-slate-700/40 text-slate-200 hover:bg-slate-800/60 transition-colors"
                  href={profile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </section>

            <div className="h-12" />
          </div>

          <ScrollToTopButton onClick={scrollToTop} />
        </div>
      </div>
    </>
  );
}
