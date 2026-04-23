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
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,217,255,0.10),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(179,0,255,0.10),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />

      {/* Particle animation */}
      <ParticleBackground
        particleCount={35}
        speed={0.35}
        color="#00d9ff"
        opacity={0.35}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <h1
            className="text-5xl md:text-7xl font-bold mb-4 glow-text text-cyan-300"
            style={{ fontFamily: "'Orbitron', monospace" }}
          >
            {profile.name}
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 mb-6">
            {profile.title}
          </p>
          <p className="max-w-2xl mx-auto text-slate-300 leading-relaxed">
            {profile.tagline}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/projects"
              className="px-5 py-3 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 hover:bg-cyan-500/30 transition-colors font-medium"
            >
              看專案
            </Link>
            <Link
              href="/resume"
              className="px-5 py-3 rounded-lg bg-slate-900/40 border border-slate-700/40 text-slate-200 hover:bg-slate-900/60 transition-colors font-medium"
            >
              看履歷
            </Link>
            <a
              href="#contact"
              className="px-5 py-3 rounded-lg bg-slate-900/20 border border-slate-700/30 text-slate-300 hover:bg-slate-900/40 transition-colors font-medium"
            >
              聯絡我
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-cyan-300 text-sm font-mono">往下滑</span>
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
