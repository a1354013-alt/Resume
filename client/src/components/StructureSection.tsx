import { useEffect, useRef, useState } from "react";
import OrbitalLines from "./OrbitalLines";

interface CapabilityCard {
  title: string;
  description: string;
  icon: string;
}

const capabilities: CapabilityCard[] = [
  {
    title: "系統盤點 → 可落地拆分",
    description:
      "把現況流程、角色與資料關係梳理清楚，將 Legacy/ERP 的複雜度拆成可維護的模組邊界與交付節點。",
    icon: "🧭",
  },
  {
    title: "前後端整合與 API 設計",
    description:
      "以 TypeScript + React/Vue 落地 UI，搭配 Go/Node API 與資料庫，處理權限、錯誤、資料一致性與可觀測性。",
    icon: "🧱",
  },
  {
    title: "工程化交付",
    description:
      "建立一致的腳本、CI、環境變數與最小測試；確保 build/typecheck/lint 可持續通過，方便維運與擴充。",
    icon: "✅",
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
      <OrbitalLines count={4} speed={30} color1="#00d9ff" color2="#b300ff" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 glow-text"
            style={{ fontFamily: "'Orbitron', monospace", color: "#00d9ff" }}
          >
            交付方法
          </h2>
          <p className="font-mono text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            我偏好把問題拆成「可驗證、可交付」的步驟：先盤點流程與資料，再做可維護的拆分，最後用工程化工具把品質固定住。
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
                <div className="relative h-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 shadow-lg border border-cyan-300/40 hover:border-cyan-300/80 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
                  <div className="text-5xl mb-6">{capability.icon}</div>
                  <h3 className="font-bold text-slate-900 text-lg mb-4 leading-tight">
                    {capability.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-mono">
                    {capability.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
