import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import StarFieldBackground from "@/components/StarFieldBackground";
import PageAnchorNav, { type PageAnchor } from "@/components/PageAnchorNav";
import { profile } from "@/data/profile";

type BiographySection = {
  id: string;
  title: string;
  subtitle?: string;
  paragraphs: string[];
};

const biographyAnchors: PageAnchor[] = [
  { id: "biography-intro", label: "自我定位" },
  { id: "background", label: "背景定位" },
  { id: "legacy-debugging", label: "除錯重構" },
  { id: "ai-direction", label: "AI 方向" },
  { id: "biography-contact", label: "聯絡方式" },
];

export default function Biography() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = `${profile.name}${profile.nameEn ? `  ${profile.nameEn}` : ""}`;

  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setDisplayedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        window.clearInterval(timer);
      }
    }, 60);

    return () => window.clearInterval(timer);
  }, [fullText]);

  const sections = useMemo<BiographySection[]>(
    () => [
      {
        id: "background",
        title: "背景與定位",
        subtitle: "從現場理解走向系統開發",
        paragraphs: [
          "我從產品與視覺設計一路走到 ERP 系統開發，這段跨領域經歷讓我不只關注程式是否能跑，也會在意它是否真的能被使用者理解、維護與持續演進。",
          "現階段的核心定位，是把複雜的舊系統邏輯翻譯成穩定、可交付的 Web 化方案，並在實作中兼顧資料流、流程風險與真實操作情境。",
        ],
      },
      {
        id: "legacy-debugging",
        title: "舊系統除錯與重構",
        subtitle: "在不完整文件下找出根因",
        paragraphs: [
          "實務工作中經常需要直接面對缺乏文件的 Delphi / ERP 系統，從原始碼、資料庫與使用者回報中反推實際業務流程。",
          "我會先確保系統穩定，再逐步理解流程與資料邊界，最後才進行重構。這樣的節奏幫助我處理過記憶體洩漏、重複觸發、資料轉入異常與查詢效能瓶頸等高風險問題。",
        ],
      },
      {
        id: "ai-direction",
        title: "AI 進修方向",
        subtitle: "把研究延伸回企業系統",
        paragraphs: [
          "目前持續進修 AI 物件偵測與影像辨識相關能力，希望把這些技術逐步帶回企業應用場景中。",
          "我關注的不是為了展示而加上 AI，而是讓 AI 真正補足舊系統難以自動化、難以擴充或難以分析的部分。",
        ],
      },
    ],
    []
  );

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <SEOHead
        title={`Biography | ${profile.name}`}
        description="背景與定位、舊系統除錯與重構、AI 進修方向。"
        canonicalPath="/biography"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 page-fade-in">
        <StarFieldBackground />

        <div className="relative z-10">
          <nav className="sticky top-0 z-50 border-b border-cyan-500/10 bg-slate-950/60 backdrop-blur-md">
            <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
              <Link
                href="/"
                className="font-mono text-cyan-400 transition-colors hover:text-cyan-300"
              >
                首頁
              </Link>

              <p className="font-mono text-sm text-slate-400">自傳</p>

              <div className="flex items-center gap-4">
                <Link
                  href="/resume"
                  className="font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400"
                >
                  履歷
                </Link>
                <span className="text-slate-600">|</span>
                <Link
                  href="/experience"
                  className="font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400"
                >
                  工作經驗
                </Link>
                <span className="text-slate-600">|</span>
                <Link
                  href="/projects"
                  className="font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400"
                >
                  專案
                </Link>
              </div>
            </div>
          </nav>

          <div className="mx-auto max-w-4xl px-6 pb-10 pt-12 sm:pt-16">
            <header id="biography-intro" className="scroll-mt-24 space-y-6">
              <h1
                className="text-4xl font-bold text-cyan-400 md:text-5xl"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                {displayedText}
              </h1>
              <p className="leading-relaxed text-slate-300">
                我把跨領域經歷帶進工程工作裡，將「理解現場、整理邏輯、穩定交付」作為自己的核心方法。
              </p>
            </header>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-6 pb-16 xl:grid-cols-[180px_minmax(0,1fr)]">
            <PageAnchorNav anchors={biographyAnchors} />

            <main className="min-w-0 space-y-10 xl:max-w-4xl">
              {sections.map(section => (
                <section
                  id={section.id}
                  key={section.id}
                  className="scroll-mt-24 space-y-6 rounded-2xl border border-slate-700/40 bg-slate-900/20 p-6 sm:p-8"
                >
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-cyan-300">
                      {section.title}
                    </h2>
                    {section.subtitle ? (
                      <p className="text-sm text-slate-400">
                        {section.subtitle}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-4 leading-relaxed text-slate-300">
                    {section.paragraphs.map(paragraph => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}

              <section id="biography-contact" className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-bold text-cyan-300">Contact</h2>
                <div className="flex flex-wrap gap-3">
                  <a
                    className="rounded-lg border border-cyan-500/40 bg-cyan-500/20 px-4 py-2 text-cyan-200 transition-colors hover:bg-cyan-500/30"
                    href={`mailto:${profile.contact.email}`}
                  >
                    Email
                  </a>
                  <a
                    className="rounded-lg border border-slate-700/40 bg-slate-800/40 px-4 py-2 text-slate-200 transition-colors hover:bg-slate-800/60"
                    href={profile.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a
                    className="rounded-lg border border-slate-700/40 bg-slate-800/40 px-4 py-2 text-slate-200 transition-colors hover:bg-slate-800/60"
                    href={profile.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </section>
            </main>
          </div>

          <ScrollToTopButton onClick={scrollToTop} />
        </div>
      </div>
    </>
  );
}
