import { useEffect, useRef, useState } from 'react';
import OrbitalLines from './OrbitalLines';

/**
 * Structure Section - Orbits | Structure
 * 
 * Design Philosophy: Deep Space Techno
 * - Orbital lines forming geometric structure
 * - Main capability cards with satellite projects
 * - Cards appear in staggered sequence
 * - Neon glow effects on hover
 */

interface CapabilityCard {
  title: string;
  description: string;
  icon: string;
}

const capabilities: CapabilityCard[] = [
  {
    title: '資料一致性與報表可靠性',
    description: '重構報表與統計邏輯，對齊系統計算規則。降低前後端資料不一致與人工比對成本。',
    icon: '📊',
  },
  {
    title: '複雜模組重構與流程管理',
    description: '將高耦合、難維護的舊模組拆解為清楚責任單位。支援申請／預算／採發等多階段流程。',
    icon: '⚡',
  },
  {
    title: '使用者體驗與工作效率提升',
    description: '將原本低頻 Excel 或人工操作的流程 Web 化。減少重複輸入、降低操作錯誤、節省人工業時間。',
    icon: '👥',
  },
];

export default function StructureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger card visibility
            setTimeout(() => setVisibleCards([true, false, false]), 100);
            setTimeout(() => setVisibleCards([true, true, false]), 200);
            setTimeout(() => setVisibleCards([true, true, true]), 300);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="structure"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-to-b from-black via-slate-950 to-black py-20 px-4 overflow-hidden"
    >
      {/* Orbital background */}
      <OrbitalLines count={4} speed={30} color1="#00d9ff" color2="#b300ff" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-6 glow-text" 
            style={{ fontFamily: "'Orbitron', monospace", color: '#00d9ff' }}
          >
            我能帶來的成果
          </h2>
          <p className="font-mono text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
            透過系統重構與現代化，我幫助企業解決費隱的業務問題
          </p>
        </div>

        {/* Capability cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className={`transition-all duration-700 transform ${
                visibleCards[index]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="group relative h-full">
                {/* Card container */}
                <div className="relative h-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 shadow-lg border border-cyan-300/40 hover:border-cyan-300/80 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
                  {/* Icon */}
                  <div className="text-5xl mb-6">{capability.icon}</div>

                  {/* Title */}
                  <h3 className="font-bold text-slate-900 text-lg mb-4 leading-tight">
                    {capability.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed font-mono">
                    {capability.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add animation for fadeIn */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}
