import { useEffect, useRef, useState } from "react";
import NightSkyBackground from "@/components/NightSkyBackground";

type Highlight = {
  title: string;
  detail: string;
};

const highlights: Highlight[] = [
  {
    title: "ERP 系統 Web 化",
    detail:
      "將 Delphi Legacy 系統逐步轉換為 Vue 3 + Go 架構，降低後續功能迭代與維運成本。",
  },
  {
    title: "效能優化",
    detail:
      "將關鍵頁面查詢由 26 秒優化至 1 秒內（查詢路徑、資料結構與前端呈現同步調整）。",
  },
  {
    title: "根因分析",
    detail:
      "處理 Memory Leak、重複點擊資料異常、CR/LF 隱藏字元污染等問題，建立可追蹤與可回歸的修復流程。",
  },
];

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
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black py-24 px-4"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(0,217,255,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(99,102,241,0.08),transparent_55%)]" />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/10 via-slate-950/55 to-black/90"
          style={{ opacity: 0.65 + scrollProgress * 0.35 }}
        />
      </div>

      <NightSkyBackground />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div
          className="text-center transition-all duration-500"
          style={{
            opacity: 1 - scrollProgress * 0.25,
            transform: `translateY(${scrollProgress * 14}px)`,
          }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 glow-text"
            style={{ fontFamily: "'Orbitron', monospace" }}
          >
            工作經驗亮點
          </h2>
          <p className="font-mono text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            以企業系統與 ERP
            為主軸，聚焦可維護性、效能與可靠性，讓系統能穩定演進。
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map(item => (
            <div
              key={item.title}
              className="rounded-2xl border border-cyan-300/20 bg-slate-950/70 p-7 backdrop-blur shadow-lg shadow-cyan-500/5"
            >
              <h3 className="text-lg font-semibold text-slate-100 mb-3">
                {item.title}
              </h3>
              <p className="font-mono text-sm text-slate-300 leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-14 flex items-center justify-center gap-3 text-xs font-mono text-cyan-300/90"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 1.8) }}
        >
          <span className="inline-block h-1 w-12 rounded-full bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
          <span>Scroll to continue</span>
          <span className="inline-block h-1 w-12 rounded-full bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}
