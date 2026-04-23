import { useEffect, useMemo, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";
import { ChevronUp } from "lucide-react";
import { profile } from "@/data/profile";

type Star = {
  widthPx: number;
  heightPx: number;
  leftPct: number;
  topPct: number;
  opacity: number;
};

export default function Biography() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = `${profile.name}${profile.nameEn ? ` · ${profile.nameEn}` : ""}`;

  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 50 }, () => ({
        widthPx: Math.random() * 2 + 1,
        heightPx: Math.random() * 2 + 1,
        leftPct: Math.random() * 100,
        topPct: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.3,
      })),
    []
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let index = 0;
    let lastTime = 0;
    const speed = 60;

    const animate = (currentTime: number) => {
      if (lastTime === 0) lastTime = currentTime;

      if (currentTime - lastTime >= speed) {
        if (index < fullText.length) {
          setDisplayedText(fullText.substring(0, index + 1));
          index++;
          lastTime = currentTime;
        }
      }

      if (index < fullText.length) requestAnimationFrame(animate);
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [fullText]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <SEOHead
        title={`自傳｜${profile.name}`}
        description={profile.background}
        canonicalPath="/biography"
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-black to-slate-950 page-fade-in">
        {/* Star field background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {stars.map((s, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-cyan-400"
                style={{
                  width: `${s.widthPx}px`,
                  height: `${s.heightPx}px`,
                  left: `${s.leftPct}%`,
                  top: `${s.topPct}%`,
                  opacity: s.opacity,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10">
          {/* Navigation */}
          <nav className="sticky top-0 z-50 bg-slate-950/60 backdrop-blur-md border-b border-cyan-500/10">
            <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
              <Link href="/">
                <a className="font-mono text-cyan-400 hover:text-cyan-300 transition-colors">
                  首頁
                </a>
              </Link>
              <h1 className="font-mono text-sm text-slate-400">自傳</h1>
              <div className="flex gap-4 items-center">
                <Link href="/resume">
                  <a className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors">
                    履歷
                  </a>
                </Link>
                <span className="text-slate-600">|</span>
                <Link href="/projects">
                  <a className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors">
                    專案
                  </a>
                </Link>
                <span className="text-slate-600">|</span>
                <button
                  onClick={scrollToTop}
                  className="font-mono text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  回頂端
                </button>
              </div>
            </div>
          </nav>

          {/* Content */}
          <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
            <section className="space-y-6">
              <h2
                className="text-4xl md:text-5xl font-bold text-cyan-400"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                {displayedText}
              </h2>
              <p className="text-slate-300 leading-relaxed">
                {profile.tagline}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="bg-slate-900/40 border border-slate-700/40 rounded-lg p-4">
                  <p className="text-xs text-slate-500 mb-2">擅長領域</p>
                  <p className="text-slate-200 font-medium">
                    企業系統整合與現代化
                  </p>
                </div>
                <div className="bg-slate-900/40 border border-slate-700/40 rounded-lg p-4">
                  <p className="text-xs text-slate-500 mb-2">常用技術</p>
                  <p className="text-slate-200 font-medium">
                    Vue / React / Go / Node / SQL
                  </p>
                </div>
                <div className="bg-slate-900/40 border border-slate-700/40 rounded-lg p-4">
                  <p className="text-xs text-slate-500 mb-2">工作取向</p>
                  <p className="text-slate-200 font-medium">
                    可維護、可交付、可觀測
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-cyan-300">我在意的事情</h3>
              <ul className="space-y-3 text-slate-300 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-cyan-400">•</span>
                  <span>
                    先把問題定義清楚：流程、資料、角色與風險，避免「做了很多卻不解決痛點」。
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400">•</span>
                  <span>
                    能落地的設計：把架構、權限、錯誤處理與部署考量一起納入，不把維運丟給未來。
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400">•</span>
                  <span>
                    讓團隊好接手：清楚的命名、可讀的抽象層、必要的文件與一致的工具鏈。
                  </span>
                </li>
              </ul>
            </section>

            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-cyan-300">下一步</h3>
              <p className="text-slate-300 leading-relaxed">
                我希望持續投入在企業系統現代化、資料與流程整合、以及可維護的全端落地。若你的團隊需要能
                兼顧交付速度與工程品質的人，歡迎和我聯絡。
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

            <div className="h-12" />
          </div>

          {/* Scroll to top button */}
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-full transition-all duration-300 z-40"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5 text-cyan-400" />
          </button>
        </div>
      </div>
    </>
  );
}
