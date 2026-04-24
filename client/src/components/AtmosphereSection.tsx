import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import NightSkyBackground from "@/components/NightSkyBackground";

export default function AtmosphereSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      const progress = Math.max(
        0,
        Math.min(
          1,
          (windowHeight - elementTop) / (windowHeight + elementHeight)
        )
      );

      setScrollProgress(prev => (prev === progress ? prev : progress));
    };

    const handleScroll = () => {
      if (rafId != null) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        update();
      });
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="atmosphere"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black"
    >
      {/* 原本的動態漸層背景 */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(0,217,255,0.12),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.10),transparent_55%)]" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/20 via-slate-950/60 to-black/90"
          style={{ opacity: 0.6 + scrollProgress * 0.4 }}
        />
      </div>

      {/* 夜空效果（星星 / 雲 / 流星） */}
      <NightSkyBackground />

      {/* 主內容 */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <div
          className="text-center max-w-3xl transition-all duration-500"
          style={{
            opacity: 1 - scrollProgress * 0.4,
            transform: `translateY(${scrollProgress * 24}px)`,
          }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 glow-text"
            style={{ fontFamily: "'Orbitron', monospace" }}
          >
            從流程到交付
          </h2>

          <p className="font-mono text-lg md:text-xl text-cyan-200 mb-4">
            把需求、資料與權限拆清楚，再用可維護的工程實作落地。
          </p>

          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/projects"
              className="px-5 py-3 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-200 hover:bg-cyan-500/30 transition-colors font-medium"
            >
              前往專案
            </Link>

            <Link
              href="/resume"
              className="px-5 py-3 rounded-lg bg-slate-900/40 border border-slate-700/40 text-slate-200 hover:bg-slate-900/60 transition-colors font-medium"
            >
              前往履歷
            </Link>
          </div>
        </div>

        {/* 向下指示 */}
        <div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-transparent rounded-full animate-pulse" />
            <span className="font-mono text-xs text-cyan-300">繼續往下</span>
          </div>
        </div>
      </div>
    </section>
  );
}
