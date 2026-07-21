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
      className="relative min-h-[100svh] w-full scroll-mt-24 overflow-hidden bg-black"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,217,255,0.08),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(179,0,255,0.08),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />

      <ParticleBackground
        particleCount={30}
        speed={0.3}
        color="#00d9ff"
        opacity={0.28}
      />

      <div className="relative z-10 flex items-center px-4 py-20">
        <div
          className={`mx-auto w-full max-w-5xl transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.2fr,0.8fr] md:items-center">
            <div>
              <h1
                className="glow-text text-3xl font-bold leading-tight text-cyan-200 sm:text-4xl md:text-6xl"
                style={{ fontFamily: "'Orbitron', monospace" }}
              >
                {profile.name}{" "}
                {profile.nameEn ? (
                  <span className="text-2xl font-semibold text-slate-200 md:text-4xl">
                    {profile.nameEn}
                  </span>
                ) : null}
              </h1>

              <p className="mt-5 text-lg text-slate-100 md:text-2xl">
                {profile.title}
              </p>

              <div className="mt-6 space-y-2 text-slate-300">
                <p className="font-mono leading-relaxed">{profile.tagline}</p>
                <p className="font-mono leading-relaxed">
                  3+ 撟?ERP ?蝬???+ 撟渲楊??撌乩?蝬?
                </p>
                <p className="font-mono leading-relaxed">
                  隞?”??嚗????亥岷??26 蝘? 1 蝘
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/resume"
                  className="rounded-lg border border-cyan-400/40 bg-cyan-500/20 px-5 py-3 font-medium text-cyan-100 transition-colors hover:bg-cyan-500/30"
                >
                  ?亦?撅交風
                </Link>
                <Link
                  href="/experience"
                  className="rounded-lg border border-slate-700/40 bg-slate-900/40 px-5 py-3 font-medium text-slate-200 transition-colors hover:bg-slate-900/60"
                >
                  View Experience
                </Link>
                <Link
                  href="/projects"
                  className="rounded-lg border border-slate-700/40 bg-slate-900/40 px-5 py-3 font-medium text-slate-200 transition-colors hover:bg-slate-900/60"
                >
                  ?亦?撠?
                </Link>
                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="rounded-lg border border-slate-700/30 bg-slate-900/20 px-5 py-3 font-medium text-slate-300 transition-colors hover:bg-slate-900/40"
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
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  <span className="font-mono leading-relaxed">
                    ERP 蝟餌絞?曆誨??/ Legacy System Refactor嚗elphi ??Web嚗?
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  <span className="font-mono leading-relaxed">
                    Vue 3 / React ?垢?游???UI ??
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  <span className="font-mono leading-relaxed">
                    Go / Node.js 敺垢 API ????蝔??
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div className="flex animate-bounce flex-col items-center gap-2">
          <span className="text-xs font-mono tracking-wide text-cyan-300">
            Scroll
          </span>
          <svg
            className="h-6 w-6 text-cyan-300"
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
