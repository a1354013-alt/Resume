import { useEffect, type ReactNode } from "react";
import { Link } from "wouter";
import { ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { profile } from "@/data/profile";
import StarFieldBackground from "@/components/StarFieldBackground";
import ScrollToTopButton from "@/components/ScrollToTopButton";

function ResumeLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/40 border border-slate-700/40 text-slate-200 hover:bg-slate-900/60 hover:border-slate-600/50 transition-colors"
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
      {!href.startsWith("mailto:") && (
        <ExternalLink className="w-4 h-4 text-slate-400" />
      )}
    </a>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-5 rounded-2xl bg-slate-950/45 border border-cyan-500/10 p-6 shadow-lg shadow-cyan-950/10">
      <h3 className="text-2xl font-bold text-cyan-300">{title}</h3>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-slate-300 leading-relaxed">
      {items.map(item => (
        <li key={item} className="flex gap-3">
          <span className="text-cyan-400 mt-0.5">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Resume() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const skills = [
    "Delphi",
    "Legacy System Refactor",
    "Vue 3",
    "React",
    "TypeScript",
    "Go",
    "Node.js",
    "RESTful API",
    "SQL Server",
    "ERP 系統導入",
    "效能優化",
    "Root Cause Analysis",
    "Python",
    "Computer Vision",
  ];

  return (
    <>
      <SEOHead
        title={`履歷｜${profile.name}`}
        description="羅揚文，ERP 軟體工程師，專注 Delphi 遺留系統現代化、Vue3 + Go Web 架構轉換、RESTful API 整合與企業內部系統重構。"
        canonicalPath="/resume"
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
                首頁
              </Link>

              <h1 className="font-mono text-sm text-slate-400">履歷</h1>

              <div className="flex gap-4 items-center">
                <Link
                  href="/projects"
                  className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  專案
                </Link>
                <span className="text-slate-600">|</span>
                <Link
                  href="/biography"
                  className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  自傳
                </Link>
              </div>
            </div>
          </nav>

          <div className="max-w-4xl mx-auto px-6 py-16 space-y-10">
            <header className="space-y-5">
              <div className="space-y-3">
                <p className="font-mono text-sm text-cyan-300">
                  ERP Modernization / Legacy Refactor / Full-Stack Development
                </p>

                <h2
                  className="text-5xl font-bold text-cyan-400"
                  style={{ fontFamily: "'Orbitron', monospace" }}
                >
                  {profile.name}
                </h2>

                <p className="text-xl text-slate-200">
                  全端工程師｜ERP 現代化｜Legacy System Refactor
                </p>

                <p className="text-slate-300 leading-relaxed">
                  具備 9~10 年跨領域工作經驗，目前擔任 ERP 軟體工程師，
                  專注於 Delphi 遺留系統現代化、Vue3 + Go Web 架構轉換、
                  RESTful API 整合與企業內部系統重構。
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <ResumeLink
                  href={`mailto:${profile.contact.email}`}
                  label={profile.contact.email}
                  icon={<Mail className="w-4 h-4 text-cyan-300" />}
                />
                <ResumeLink
                  href={profile.contact.linkedin}
                  label="LinkedIn"
                  icon={<Linkedin className="w-4 h-4 text-cyan-300" />}
                />
                <ResumeLink
                  href={profile.contact.github}
                  label="GitHub"
                  icon={<Github className="w-4 h-4 text-cyan-300" />}
                />
              </div>
            </header>

            <Section title="個人摘要">
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  畢業於建國科技大學自動化工程系，目前就讀國立彰化師範大學
                  人工智慧科技應用碩士學位學程。過去曾歷經產品設計、
                  平面設計、網頁設計與教學助理等跨領域工作，後續投入企業系統開發，
                  因此在系統設計時能同時理解工程邏輯、使用情境與第一線操作痛點。
                </p>

                <p>
                  目前工作重心為 ERP 系統功能開發、維護、重構與 Web 化。
                  面對缺乏完整文件的舊系統，能從 Delphi 原始碼與資料庫結構反向推敲流程，
                  釐清商業邏輯、資料流與異常根因，再以穩定、可維護、可落地的方式完成改善。
                </p>
              </div>
            </Section>

            <Section title="核心能力">
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-slate-900/50 border border-slate-700/40 text-slate-200 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Section>

            <Section title="工作經驗">
              <div className="space-y-8">
                <div>
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
                    <div>
                      <h4 className="text-xl font-semibold text-slate-100">
                        中程資訊顧問有限公司｜軟體工程師
                      </h4>
                      <p className="text-slate-400">2022/8 — 至今</p>
                    </div>
                    <span className="text-cyan-300 text-sm font-mono">
                      ERP / Delphi / Vue3 / Go / SQL Server
                    </span>
                  </div>

                  <div className="mt-4">
                    <BulletList
                      items={[
                        "主導 Delphi ERP 系統現代化，轉換為 Vue3 + Go Web 架構。",
                        "建立 RESTful API 並整合前後端系統，將既有商業邏輯整理為更清楚的系統邊界。",
                        "重構複雜商業邏輯，降低耦合度並提升系統可維護性。",
                        "支援客戶需求訪談、問題排查、系統導入與使用者教育訓練。",
                        "參與皇昌營造、德昌營造等企業 ERP 導入與歷史資料轉換。",
                        "曾至格瑞、富旺、精銳、惠宇建設等現場進行專案簡報與教育訓練。",
                      ]}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "網站設計師 / 平面設計 / 美編行銷：累積網站視覺、版面設計、印前製稿與跨部門溝通經驗。",
                    "教學助理：協助課程與教學現場支援，培養說明複雜概念與引導使用者的能力。",
                    "產品設計工程師：具備傳統製造業與現場流程理解，能從實務操作角度思考系統設計。",
                  ].map(item => (
                    <div
                      key={item}
                      className="rounded-xl bg-slate-900/35 border border-slate-700/30 p-4 text-slate-300 leading-relaxed"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Section title="代表性技術成果">
              <div className="grid gap-5">
                <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/25 p-5">
                  <p className="text-sm text-cyan-300 font-mono mb-2">
                    Performance Optimization
                  </p>
                  <h4 className="text-xl font-bold text-slate-100 mb-3">
                    N+1 Query 效能優化
                  </h4>
                  <p className="text-3xl font-bold text-cyan-300 mb-4">
                    26 秒 → 1 秒內
                  </p>
                  <BulletList
                    items={[
                      "分析簽核網站效能瓶頸，發現查詢流程存在典型 N+1 Query 問題。",
                      "重新設計資料存取方式，將逐筆查詢改為集中式批次查詢。",
                      "大幅改善頁面回應速度，同時降低資料庫負載。",
                    ]}
                  />
                </div>

                <div className="rounded-xl bg-slate-900/35 border border-slate-700/30 p-5">
                  <p className="text-sm text-cyan-300 font-mono mb-2">
                    Stability
                  </p>
                  <h4 className="text-xl font-bold text-slate-100 mb-3">
                    Memory Leak 排查與修復
                  </h4>
                  <BulletList
                    items={[
                      "處理簽核模組長時間運作後發生當機的問題。",
                      "追蹤物件生命週期與動態建立元件，定位未正確釋放的程式段落。",
                      "修正後系統穩定度提升，降低當機頻率與相關客訴。",
                    ]}
                  />
                </div>

                <div className="rounded-xl bg-slate-900/35 border border-slate-700/30 p-5">
                  <p className="text-sm text-cyan-300 font-mono mb-2">
                    Defensive Design
                  </p>
                  <h4 className="text-xl font-bold text-slate-100 mb-3">
                    Delphi 防重複觸發與流程防錯
                  </h4>
                  <BulletList
                    items={[
                      "處理使用者快速重複點擊造成的隱蔽資料異常。",
                      "逐行梳理缺乏文件的 Delphi 程式碼，重新設計事件流程。",
                      "導入執行狀態鎖定與例外回復機制，降低誤操作造成的資料錯誤風險。",
                    ]}
                  />
                </div>

                <div className="rounded-xl bg-slate-900/35 border border-slate-700/30 p-5">
                  <p className="text-sm text-cyan-300 font-mono mb-2">
                    Root Cause Analysis
                  </p>
                  <h4 className="text-xl font-bold text-slate-100 mb-3">
                    跨系統資料異常根因分析
                  </h4>
                  <BulletList
                    items={[
                      "處理工程變更轉入採發系統時，部分數量未正確轉入的問題。",
                      "透過字串長度與 ASCII 逐字分析，發現 EB_SPECI 欄位尾端含隱藏 CR/LF 字元。",
                      "完成歷史資料清洗，並實作 Trim + Replace CR/LF 字串淨化機制，避免資料污染再次發生。",
                    ]}
                  />
                </div>
              </div>
            </Section>

            <Section title="系統 Web 化經驗">
              <p className="text-slate-300 leading-relaxed">
                曾參與並推動多套核心 ERP 系統從 Delphi / Legacy 架構轉移到 Web 架構。
                過程中不只是照搬舊功能，而是重新整理流程、切割商業邏輯與畫面事件，
                讓系統更容易維護、擴充與導入。
              </p>

              <div className="grid md:grid-cols-2 gap-3">
                {["預算採發估驗", "變更追加減", "高階簽核", "人事出勤"].map(
                  system => (
                    <div
                      key={system}
                      className="rounded-xl bg-slate-900/40 border border-slate-700/30 px-4 py-3 text-slate-200"
                    >
                      {system}
                    </div>
                  ),
                )}
              </div>
            </Section>

            <Section title="教育背景">
              <div className="space-y-4 text-slate-300">
                <div>
                  <h4 className="font-semibold text-slate-100">
                    國立彰化師範大學｜人工智慧科技應用碩士學位學程
                  </h4>
                  <p className="text-slate-400">2024/9 — 2026/6｜碩士夜間就讀中</p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-100">
                    建國科技大學｜自動化工程系
                  </h4>
                  <p className="text-slate-400">2009/9 — 2013/6｜學士</p>
                </div>
              </div>
            </Section>

            <Section title="AI 進修與研究方向">
              <BulletList
                items={[
                  "目前進修 AI 物件偵測與影像辨識相關技術。",
                  "熟悉 Python 與深度學習框架，具備模型訓練、評估與系統整合經驗。",
                  "實作過暴力行為偵測與醫療影像分析等專案。",
                  "未來希望將 AI 技術整合進企業系統，讓內部系統不只穩定，也具備智慧化能力。",
                ]}
              />
            </Section>

            <Section title="專案作品">
              <p className="text-slate-300 leading-relaxed">
                我把可公開的作品與案例整理在專案頁；公司內部 ERP 系統會以非公開案例方式呈現，
                主要展示我在系統重構、資料流整理、效能優化與產品落地上的能力。
              </p>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 hover:bg-cyan-500/30 transition-colors"
              >
                前往專案頁 <ExternalLink className="w-4 h-4" />
              </Link>
            </Section>

            <div className="h-12" />
          </div>

          <ScrollToTopButton onClick={scrollToTop} />
        </div>
      </div>
    </>
  );
}