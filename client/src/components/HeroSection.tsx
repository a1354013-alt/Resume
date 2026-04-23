import { useEffect, useState } from 'react';
import ParticleBackground from './ParticleBackground';

/**
 * Hero Section - Universe | Chaos
 * 
 * Design Philosophy: Deep Space Techno
 * - Deep purple/blue background representing chaotic universe
 * - Floating particles creating sense of vastness
 * - Title fades in with subtle scale animation
 * - Scroll indicator guides user downward
 */

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663272154445/BhrxJbgZcqLBiqOI.png)',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Particle animation */}
      <ParticleBackground
        particleCount={30}
        speed={0.3}
        color="#00d9ff"
        opacity={0.4}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Main heading */}
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 glow-text" style={{ fontFamily: "'Orbitron', monospace" }}>
            複雜的系統
          </h1>
          <p className="text-2xl md:text-4xl font-light text-blue-200 mb-8" style={{ fontFamily: "'Orbitron', monospace" }}>
            看起來像一個宇宙
          </p>
        </div>

        {/* Subtitle */}
        <div
          className={`text-center max-w-2xl transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="font-mono text-lg md:text-xl text-indigo-300">
            我的工作，是找到它的秩序
          </p>
          <p className="font-mono text-sm md:text-base text-cyan-400 mt-4 opacity-70">
            從混亂的表象 → 穿越層層結構 → 抵達穩定的核心
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-cyan-400 text-sm font-mono">向下滾動</span>
          <svg
            className="w-6 h-6 text-cyan-400"
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
