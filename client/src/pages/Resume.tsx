import { useEffect, useMemo } from "react";
import { Link } from "wouter";
import { ChevronUp, ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { profile } from "@/data/profile";

type Star = {
  widthPx: number;
  heightPx: number;
  leftPct: number;
  topPct: number;
  opacity: number;
};

function ResumeLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
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

export default function Resume() {
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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <SEOHead
        title={`履歷｜${profile.name}`}
        description={`${profile.title}。${profile.background}`}
        canonicalPath="/resume"
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
              <h1 className="font-mono text-sm text-slate-400">履歷</h1>
              <div className="flex gap-4 items-center">
                <Link href="/projects">
                  <a className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors">
                    專案
                  </a>
                </Link>
                <span className="text-slate-600">|</span>
                <Link href="/biography">
                  <a className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors">
                    自傳
                  </a>
                </Link>
              </div>
            </div>
          </nav>

          {/* Content */}
          <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
            <header className="space-y-4">
              <h2
                className="text-5xl font-bold text-cyan-400"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                {profile.name}
              </h2>
              <p className="text-xl text-slate-200">{profile.title}</p>
              <p className="text-slate-300 leading-relaxed">
                {profile.tagline}
              </p>
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

            <section className="space-y-4">
              <h3 className="text-2xl font-bold text-cyan-300">摘要</h3>
              <p className="text-slate-300 leading-relaxed">
                {profile.background}
              </p>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-bold text-cyan-300">技能重點</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "TypeScript",
                  "React",
                  "Vite",
                  "Vue 3",
                  "Go",
                  "Node.js",
                  "REST API",
                  "PostgreSQL / SQL Server",
                  "Docker",
                  "Git",
                ].map(s => (
                  <span
                    key={s}
                    className="px-3 py-1 rounded-full bg-slate-900/40 border border-slate-700/40 text-slate-200 text-sm"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-bold text-cyan-300">能負責的工作</h3>
              <ul className="space-y-3 text-slate-300 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-cyan-400">•</span>
                  <span>
                    Legacy/ERP
                    系統盤點與現代化拆分：把流程與資料整理成可維護的前後端邊界。
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400">•</span>
                  <span>
                    API
                    設計與整合：權限、錯誤處理、資料一致性與可觀測性納入交付標準。
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400">•</span>
                  <span>
                    前端介面落地：可讀、可維護、可擴充的 UI/狀態管理與互動細節。
                  </span>
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h3 className="text-2xl font-bold text-cyan-300">專案</h3>
              <p className="text-slate-300 leading-relaxed">
                我把可公開的作品與案例整理在專案頁（公司內部系統會標示為非公開）。
              </p>
              <Link href="/projects">
                <a className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 hover:bg-cyan-500/30 transition-colors">
                  前往專案頁 <ExternalLink className="w-4 h-4" />
                </a>
              </Link>
            </section>

            <div className="h-12" />
          </div>

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
