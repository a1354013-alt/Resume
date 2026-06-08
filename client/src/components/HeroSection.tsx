import { useEffect, useState } from "react";
import { Link } from "wouter";
import ParticleBackground from "./ParticleBackground";
import { profile } from "@/data/profile";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100svh] overflow-hidden bg-black"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,217,255,0.08),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(179,0,255,0.08),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />

      <ParticleBackground
        particleCount={30}
        speed={0.3}
        color="#00d9ff"
        opacity={0.28}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center px-4 py-20">
        <div
          className={`mx-auto w-full max-w-5xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr,0.8fr] md:items-center">
            <div>
              <h1
                className="text-3xl sm:text-4xl md:text-6xl font-bold glow-text text-cyan-200 leading-tight"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                {profile.name}{" "}
                {profile.nameEn ? (
                  <span className="text-slate-200 text-2xl md:text-4xl font-semibold">
                    {profile.nameEn}
                  </span>
                ) : null}
              </h1>

              <p className="mt-5 text-lg md:text-2xl text-slate-100">
                {profile.title}
              </p>

              <div className="mt-6 space-y-2 text-slate-300">
                <p className="font-mono leading-relaxed">{profile.tagline}</p>
                <p className="font-mono leading-relaxed">
                  3+ 年 ERP 開發經驗、9+ 年跨領域工作經驗
                </p>
                <p className="font-mono leading-relaxed">
                  代表成果：將關鍵頁面查詢由 26 秒優化至 1 秒內
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/resume"
                  className="px-5 py-3 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-100 hover:bg-cyan-500/30 transition-colors font-medium"
                >
                  查看履歷
                </Link>
                <Link
                  href="/projects"
                  className="px-5 py-3 rounded-lg bg-slate-900/40 border border-slate-700/40 text-slate-200 hover:bg-slate-900/60 transition-colors font-medium"
                >
                  查看專案
                </Link>
                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="px-5 py-3 rounded-lg bg-slate-900/20 border border-slate-700/30 text-slate-300 hover:bg-slate-900/40 transition-colors font-medium"
                >
                  GitHub
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-cyan-300/15 bg-slate-950/70 p-6 backdrop-blur">
              <div className="font-mono text-xs text-slate-400">
                Focus Areas
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-200">
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span className="font-mono leading-relaxed">
                    ERP 系統現代化 / Legacy System Refactor（Delphi → Web）
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span className="font-mono leading-relaxed">
                    Vue 3 / React 前端整合與 UI 重構
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span className="font-mono leading-relaxed">
                    Go / Node.js 後端 API 與資料流程優化
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-cyan-300 text-xs font-mono tracking-wide">
            Scroll
          </span>
          <svg
            className="w-6 h-6 text-cyan-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
