import { useEffect, useRef, useState } from "react";
import OrbitalLines from "./OrbitalLines";

interface CapabilityCard {
  title: string;
  description: string;
  icon: string;
}

const capabilities: CapabilityCard[] = [
  {
    title: "Legacy System Analysis",
    description: "Delphi / ERP / 資料流程 / 商業邏輯梳理",
    icon: "/Resume/icons/icon-radar.png",
  },
  {
    title: "Full-Stack Implementation",
    description: "Vue 3 / React / TypeScript / Go / Node.js / REST API",
    icon: "/Resume/icons/icon-server-api.png",
  },
  {
    title: "Production Reliability",
    description: "效能優化 / CI / 測試 / 錯誤追蹤 / 可維護性",
    icon: "/Resume/icons/icon-shield-check.png",
  },
];

export default function StructureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  useEffect(() => {
    let hasAnimated = false;
    const timeoutIds: number[] = [];

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          if (hasAnimated) return;
          hasAnimated = true;

          timeoutIds.push(
            window.setTimeout(() => setVisibleCards([true, false, false]), 100)
          );
          timeoutIds.push(
            window.setTimeout(() => setVisibleCards([true, true, false]), 220)
          );
          timeoutIds.push(
            window.setTimeout(() => setVisibleCards([true, true, true]), 340)
          );
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      for (const id of timeoutIds) window.clearTimeout(id);
    };
  }, []);

  return (
    <section
      id="structure"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-black via-slate-950 to-black py-20 px-4 overflow-hidden"
    >
      <OrbitalLines count={4} speed={32} color1="#00d9ff" color2="#b300ff" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 glow-text"
            style={{ fontFamily: "'Orbitron', monospace", color: "#00d9ff" }}
          >
            我能帶進團隊的工程能力
          </h2>

          <p className="font-mono text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            以 ERP 與企業系統為核心，從 Legacy
            分析、前後端落地到上線穩定性，協助團隊在可維護性與交付速度之間取得平衡。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <div
              key={capability.title}
              className={`transition-all duration-700 transform ${
                visibleCards[index]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div className="group relative h-full">
                <div className="relative h-full overflow-hidden rounded-2xl border border-cyan-300/25 bg-slate-950/80 p-8 shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/60 hover:shadow-xl hover:shadow-cyan-500/15">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,217,255,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(179,0,255,0.10),transparent_35%)] opacity-80" />

                  <div className="relative z-10">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-black/60 shadow-lg shadow-cyan-500/15 ring-1 ring-cyan-300/35 transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={capability.icon}
                        alt={capability.title}
                        className="h-16 w-16 object-contain"
                      />
                    </div>

                    <h3 className="mb-3 text-lg font-bold leading-tight text-slate-100">
                      {capability.title}
                    </h3>

                    <p className="font-mono text-sm leading-relaxed text-slate-300">
                      {capability.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
