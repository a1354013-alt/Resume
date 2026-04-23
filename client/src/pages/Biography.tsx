import { useEffect, useMemo, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";
import { profile } from "@/data/profile";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import StarFieldBackground from "@/components/StarFieldBackground";

type BiographySection = {
  title: string;
  subtitle?: string;
  paragraphs: string[];
  bullets?: { label: string; items: string[] }[];
  callout?: { title: string; body: string };
};

export default function Biography() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = `${profile.name}${profile.nameEn ? `  ${profile.nameEn}` : ""}`;

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

  const sections = useMemo<BiographySection[]>(
    () => [
      {
        title: "背景與定位",
        subtitle: "從第一線經驗走向系統開發",
        paragraphs: [
          "畢業於建國科技大學自動化工程系，具備紮實的邏輯訓練基礎。隨後曾於傳統工廠體系歷練，這段基層經驗帶來了深刻體會，使我更能理解實際作業人員在操作系統時所面臨的困難與需求，也培養出從使用情境出發思考問題的習慣。",
          "工作過程中明確發現對軟體開發的熱忱，因此投入職訓局接受為期半年的網頁設計與網路應用訓練，並以第一名成績結業。這段跨領域學習不僅建立起程式開發的基礎，也養成了同時兼顧工程邏輯與使用者體驗的系統設計觀。",
          "目前擔任 ERP 系統開發工程師，負責系統功能開發、維護與重構。在長時間接觸企業系統的過程中，淬鍊出一套以「穩定、可維護、可落地」為優先的開發思維，並持續在實務中驗證解決問題的能力。",
        ],
        callout: {
          title: "核心價值定位",
          body: "「遺留系統邏輯翻譯機 × 高風險需求技術顧問」——面對複雜且具有歷史包袱的系統，我會透過理解底層架構與業務邏輯，找出務實且可落地的解決方案。",
        },
      },
      {
        title: "舊系統除錯與重構",
        subtitle: "從理解系統開始解決問題",
        paragraphs: [
          "日常工作中經常需要直接處理第一線客服回報的系統問題。面對缺乏完整文件的舊系統，必須從原始碼與資料庫結構中反向推敲，釐清實際業務邏輯與資料流程。長時間的實戰環境，培養了對系統異常與潛在風險的高度敏銳度，並累積了以下關鍵除錯經驗：",
          "藉由這些經驗，確立了一項務實的工作原則：先確保系統穩定，再完整理解邏輯，最後才進行重構，絕不在未掌握全貌前急於改寫程式。",
        ],
        bullets: [
          {
            label: "關鍵除錯經驗（保留完整技術細節）",
            items: [
              "精準定位記憶體洩漏（Memory Leak）：簽核模組在長時間運作後經常發生當機；透過追蹤物件生命週期，逐一排查動態建立的元件，最終精準定位並修正未正確釋放的程式段落。修正後，伺服器運作恢復穩定，當機頻率與相關客訴量皆大幅降低。",
              "梳理 Delphi 遺留系統與防錯設計（Delphi 防重複點擊）：曾處理因使用者快速重複點擊所導致的隱蔽資料異常；逐行梳理既有 Delphi 程式碼後，重新設計事件流程，並導入執行狀態鎖定（避免重複觸發）與完善的例外回復機制。修正後，相關流程異常完全消失，有效降低誤操作帶來的資料錯誤風險。",
              "採發合約異常之根因分析（EB_SPECI / CRLF 問題）：工程變更轉入採發系統時，發生部分數量未正確轉入、影響後續採購與金額計算；在排除 Delphi 程式邏輯錯誤後，轉向資料層追查。透過字串長度與逐字 ASCII 解析，揪出 EB_SPECI 欄位尾端夾帶隱藏 CR/LF 字元；完成歷史資料清洗，並實作統一字串淨化機制（Trim + Replace CR/LF），從源頭根絕資料污染，確保跨系統拋轉與採購帳務的絕對準確。",
            ],
          },
        ],
      },
      {
        title: "系統 Web 化與效能優化",
        subtitle: "讓系統不只是能用，而是好用",
        paragraphs: [
          "隨著公司推動系統 Web 化，主導並完成了「預算採發估驗」、「變更追加減」、「高階簽核」以及「人事出勤」共四套核心系統的架構轉移工作。過程中並非單純照搬既有程式碼，而是重新檢視業務流程，釐清必要步驟並進行結構簡化。",
          "在前端，透過元件化方式將結構複雜且易誤用的預算扣抵流程重新整理，使操作更加直覺；後端則適當切割商業邏輯與畫面事件，降低程式耦合度，提升後續維護性。",
          "在近期簽核網站的優化過程中，系統面臨明顯效能瓶頸。隨著資料量增加，部分頁面載入速度嚴重遲緩。經分析確認查詢流程中存在典型的 N+1 Query 問題後，重新設計資料存取方式，將逐筆查詢改為集中式批次查詢。",
        ],
        bullets: [
          {
            label: "效能優化成果",
            items: [
              "N+1 Query 26 秒 → 1 秒內：頁面回應時間由 26 秒縮短至 1 秒內，帶來更順暢的使用者體驗。",
              "資料庫負載下降：集中式批次查詢減少 round-trip，降低 DB 壓力並提升整體穩定度。",
            ],
          },
        ],
      },
      {
        title: "系統導入與跨部門溝通",
        subtitle: "讓系統真正落地",
        paragraphs: [
          "實務專案中，曾參與皇昌營造、德昌營造等上市櫃企業的 ERP 系統導入。這類專案最具挑戰性的往往是歷史資料轉換。面對格式與品質參差不齊的舊資料，需配合實際作業流程進行清理、比對與驗證，確保新舊系統能順利銜接。",
          "此外，亦曾前往格瑞、富旺、精銳與惠宇建設等現場，面對管理層與第一線使用者進行教育訓練與專案簡報。這些第一線溝通經驗，結合過去在傳統工廠的歷練，使在專案中能精準掌握不同角色的需求差異，並在開發階段預先佈署防錯設計，確保系統在真實環境中能穩定運作。",
        ],
        bullets: [
          {
            label: "導入與協作重點",
            items: [
              "ERP 導入與教育訓練：到場簡報、操作教學、流程對齊與回饋收斂。",
              "資料轉換：清理、比對、驗證，確保新舊系統無縫銜接。",
            ],
          },
        ],
      },
      {
        title: "AI 技術進修與未來方向",
        paragraphs: [
          "為了將系統開發與前瞻技術結合，目前就讀於彰化師範大學資訊工程研究所碩士班，專注於 AI 物件偵測與影像辨識領域。",
          "在實作方面，已能熟練運用 Python 與深度學習框架，完成「暴力行為偵測」與「醫療影像分析」等專案，並持續優化模型效能與系統整合能力。",
          "整體而言，未來也期望將 AI 技術實質整合進企業應用中，打造不僅穩定運作，更具備智慧化能力的高效系統。",
        ],
        bullets: [
          {
            label: "AI 專案（保留關鍵技術方向）",
            items: ["AI 暴力行為偵測與醫療影像分析。"],
          },
        ],
      },
    ],
    [],
  );

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <SEOHead
        title={`Biography | ${profile.name}`}
        description="ERP 系統開發工程師｜遺留系統除錯與重構、Web 化與效能優化、ERP 導入與教育訓練、AI 物件偵測與影像辨識"
        canonicalPath="/biography"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 page-fade-in">
        <StarFieldBackground />

        <div className="relative z-10">
          <nav className="sticky top-0 z-50 bg-slate-950/60 backdrop-blur-md border-b border-cyan-500/10">
            <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
              <Link
                href="/"
                className="font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Home
              </Link>
              <h1 className="font-mono text-sm text-slate-400">Biography</h1>
              <div className="flex gap-4 items-center">
                <Link
                  href="/resume"
                  className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Resume
                </Link>
                <span className="text-slate-600">|</span>
                <Link
                  href="/projects"
                  className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  Projects
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

          <div className="max-w-4xl mx-auto px-6 py-12 sm:py-16 space-y-12 sm:space-y-16">
            <header className="space-y-6">
              <h2
                className="text-4xl md:text-5xl font-bold text-cyan-400"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                {displayedText}
              </h2>

              <p className="text-slate-300 leading-relaxed">
                我是一名以「穩定、可維護、可落地」為優先的 ERP 系統開發工程師，擅長從第一線使用情境出發，將遺留系統的業務邏輯清楚翻譯為可維護、可擴充的解法。
              </p>

             
            </header>

            <div className="space-y-10 sm:space-y-12">
              {sections.map((section) => (
                <section
                  key={section.title}
                  className="bg-slate-900/20 border border-slate-700/40 rounded-2xl p-6 sm:p-8 space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-cyan-300">
                      {section.title}
                    </h3>
                    {section.subtitle ? (
                      <p className="text-slate-400 text-sm">{section.subtitle}</p>
                    ) : null}
                  </div>

                  <div className="space-y-4 text-slate-300 leading-relaxed">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {section.bullets?.map((group) => (
                    <div
                      key={group.label}
                      className="bg-slate-950/40 border border-slate-700/40 rounded-xl p-5 space-y-3"
                    >
                      <p className="text-slate-200 font-medium">{group.label}</p>
                      <ul className="list-disc pl-5 space-y-2 text-slate-300">
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {section.callout ? (
                    <div className="bg-cyan-500/10 border border-cyan-500/25 rounded-xl p-5 space-y-2">
                      <p className="text-cyan-200 font-medium">
                        {section.callout.title}
                      </p>
                      <p className="text-slate-200 leading-relaxed">
                        {section.callout.body}
                      </p>
                    </div>
                  ) : null}
                </section>
              ))}
            </div>

            <section className="space-y-4">
              <h3 className="text-2xl font-bold text-cyan-300">Contact</h3>
              <p className="text-slate-300 leading-relaxed">
                如果你正在處理遺留系統、需要高風險需求評估，或想討論 Web 化與效能優化、AI
                導入方向，歡迎聯絡我。
              </p>

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

            <div className="h-8" />
          </div>

          <ScrollToTopButton onClick={scrollToTop} />
        </div>
      </div>
    </>
  );
}

