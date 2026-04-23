import { useRef, useEffect, useState } from 'react';

/**
 * Core Layers Section - 從能力層到系統的核心
 * 
 * Design Philosophy: Geological Stratification
 * - Deep blue to deep black gradient background
 * - Horizontal striations representing geological layers
 * - Light source concentrated on right side
 * - Three cards representing depth levels: Crust → Mantle → Core
 * - Stable, trustworthy, enterprise-grade atmosphere
 * - Sequential animation: left → center → right (descending)
 */

interface LayerCard {
  title: string;
  subtitle: string;
  icon: string;
  items: string[];
  depth: 'crust' | 'mantle' | 'core';
}

const layers: LayerCard[] = [
  {
    title: '地殼',
    subtitle: '能力層',
    icon: '🔧',
    depth: 'crust',
    items: [
      '全端系統開發（Vue / React / Node / Go / Python）',
      '企業系統與 ERP 架構重構經驗',
      '雲端與部署概念（AWS / GCP）',
      '資料結構、流程與效能思維',
      '舊系統（Delphi / Excel Automation）實務經驗',
    ],
  },
  {
    title: '地函',
    subtitle: '影響層',
    icon: '🌊',
    depth: 'mantle',
    items: [
      '技術決策與架構選型的溝通與取捨',
      '將複雜技術轉為團隊可理解的結構',
      '跨部門協作與流程對齊',
      '透過文件與結構，讓知識可以被傳承',
      '協助團隊理解系統，而不是只交付程式',
    ],
  },
  {
    title: '地心',
    subtitle: '核心價值',
    icon: '⭐',
    depth: 'core',
    items: [
      '系統長期穩定性優先於短期交付',
      '複雜問題必須被拆解成可理解的結構',
      '程式碼是給人維護的，而不只是給機器跑',
      '架構與流程，決定系統能活多久',
      '持續學習與調整，而不是一次性完美',
    ],
  },
];

export default function CoreLayersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Sequential animation: left → center → right
            setTimeout(() => setVisibleCards([true, false, false]), 100);
            setTimeout(() => setVisibleCards([true, true, false]), 400);
            setTimeout(() => setVisibleCards([true, true, true]), 700);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="core"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-black py-24 px-4 overflow-hidden"
    >
      {/* Geological layers background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663272154445/LKKyjHqileCdzTur.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Deep gradient overlay - dark blue to black */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-950/60 to-black/80" />
        
        {/* Right-side light source effect */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at 85% 50%, rgba(71, 184, 255, 0.15) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header - Chapter-like styling */}
        <div className="mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Orbitron', monospace" }}>
            <span className="text-slate-300">從能力層，</span>
            <br />
            <span className="text-cyan-300">到系統的核心</span>
          </h2>
          <p className="font-mono text-slate-400 text-lg max-w-2xl">
            多層次的能力，最終都必須收斂為穩定、可維護的核心價值
          </p>
        </div>

        {/* Three-layer cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {layers.map((layer, index) => {
            const depthClasses = {
              crust: 'bg-slate-800/30 border-slate-600/40 hover:border-slate-500/60',
              mantle: 'bg-slate-800/50 border-slate-600/60 hover:border-slate-500/80',
              core: 'bg-slate-900/70 border-cyan-500/40 hover:border-cyan-400/70',
            };

            const depthGlow = {
              crust: 'shadow-lg shadow-slate-500/10',
              mantle: 'shadow-lg shadow-slate-600/20',
              core: 'shadow-2xl shadow-cyan-500/30',
            };

            return (
              <div
                key={index}
                className={`transition-all duration-1000 transform ${
                  visibleCards[index]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${index * 300}ms`,
                }}
              >
                <div className={`relative h-full rounded-lg border backdrop-blur-sm ${depthClasses[layer.depth]} ${depthGlow[layer.depth]} transition-all duration-300`}>
                  {/* Card header */}
                  <div className="p-8 pb-6 border-b border-slate-600/30">
                    <div className="text-4xl mb-3">{layer.icon}</div>
                    <h3
                      className="text-2xl font-bold mb-1"
                      style={{ fontFamily: "'Orbitron', monospace" }}
                    >
                      <span className={layer.depth === 'core' ? 'text-cyan-300' : 'text-slate-200'}>
                        {layer.title}
                      </span>
                    </h3>
                    <p className="font-mono text-sm text-slate-400">
                      {layer.subtitle}
                    </p>
                  </div>

                  {/* Card content */}
                  <div className="p-8">
                    <ul className="space-y-3">
                      {layer.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start gap-3 text-slate-300 text-sm"
                        >
                          <span className="text-cyan-400 font-bold mt-1 flex-shrink-0">▸</span>
                          <span className="font-mono leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Core-specific pulsing effect */}
                  {layer.depth === 'core' && (
                    <div
                      className="absolute inset-0 rounded-lg pointer-events-none"
                      style={{
                        background:
                          'radial-gradient(circle at center, rgba(0, 217, 255, 0.1) 0%, transparent 70%)',
                        animation: 'pulse-subtle 3s ease-in-out infinite',
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
