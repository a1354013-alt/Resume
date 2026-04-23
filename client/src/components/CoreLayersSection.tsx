import { useEffect, useRef, useState } from "react";

interface LayerCard {
  title: string;
  subtitle: string;
  icon: string;
  items: string[];
  depth: "crust" | "mantle" | "core";
}

const layers: LayerCard[] = [
  {
    title: "Frontend",
    subtitle: "可維護的 UI 與互動",
    icon: "🛰️",
    depth: "crust",
    items: [
      "React / Vue 3：元件化、狀態管理、路由與互動細節",
      "TypeScript：型別約束、可重構與長期維護",
      "Tailwind CSS：一致的設計語彙與速度",
    ],
  },
  {
    title: "Backend",
    subtitle: "API 與資料一致性",
    icon: "🧩",
    depth: "mantle",
    items: [
      "Go / Node.js：REST API、資料驗證、錯誤處理與權限",
      "資料庫：PostgreSQL / SQL Server（schema 與效能思維）",
      "整合：既有系統/流程盤點後，逐步拆分與落地",
    ],
  },
  {
    title: "Engineering",
    subtitle: "讓交付能被信任",
    icon: "⚙️",
    depth: "core",
    items: [
      "可觀測：可追蹤的錯誤與行為（避免黑盒）",
      "可部署：Docker / 環境變數 / 靜態資源策略",
      "可交付：文件、腳本與最小可行測試，CI 能跑得起來",
    ],
  },
];

export default function CoreLayersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          window.setTimeout(() => setVisibleCards([true, false, false]), 100);
          window.setTimeout(() => setVisibleCards([true, true, false]), 350);
          window.setTimeout(() => setVisibleCards([true, true, true]), 600);
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="core"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black py-24 px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(0,217,255,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(179,0,255,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-black to-black" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Orbitron', monospace" }}
          >
            <span className="text-slate-200">能力層次</span>
            <span className="text-cyan-300">（從表層到核心）</span>
          </h2>
          <p className="font-mono text-slate-400 text-lg max-w-2xl">
            我把自己擅長的工作拆成三層：介面落地、API
            與資料一致性、以及能被信任的交付工程。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {layers.map((layer, index) => {
            const depthClasses = {
              crust:
                "bg-slate-900/30 border-slate-700/40 hover:border-slate-600/60",
              mantle:
                "bg-slate-900/40 border-slate-700/50 hover:border-slate-600/70",
              core: "bg-slate-900/60 border-cyan-500/30 hover:border-cyan-400/60",
            } as const;

            return (
              <div
                key={layer.depth}
                className={`transition-all duration-1000 transform ${
                  visibleCards[index]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 180}ms` }}
              >
                <div
                  className={`relative h-full rounded-lg border backdrop-blur-sm ${depthClasses[layer.depth]} transition-all duration-300`}
                >
                  <div className="p-8 pb-6 border-b border-slate-700/30">
                    <div className="text-4xl mb-3">{layer.icon}</div>
                    <h3
                      className="text-2xl font-bold mb-1 text-slate-100"
                      style={{ fontFamily: "'Orbitron', monospace" }}
                    >
                      {layer.title}
                    </h3>
                    <p className="font-mono text-sm text-slate-400">
                      {layer.subtitle}
                    </p>
                  </div>

                  <div className="p-8">
                    <ul className="space-y-3">
                      {layer.items.map(item => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-slate-300 text-sm"
                        >
                          <span className="text-cyan-400 font-bold mt-1 flex-shrink-0">
                            •
                          </span>
                          <span className="font-mono leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {layer.depth === "core" && (
                    <div
                      className="absolute inset-0 rounded-lg pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at center, rgba(0, 217, 255, 0.10) 0%, transparent 70%)",
                        animation: "pulse-subtle 3s ease-in-out infinite",
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
