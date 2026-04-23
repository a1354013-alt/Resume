import { useEffect, useRef, useState } from 'react';

/**
 * Atmosphere Section - Entry | Transition
 * 
 * Design Philosophy: Deep Space Techno
 * - Visual transition from space to atmosphere
 * - Gradient layers representing atmospheric entry
 * - Subtle animation as user scrolls through
 * - Sets stage for project showcase
 */

export default function AtmosphereSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate progress: 0 when element enters, 1 when it leaves
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight))
      );

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="atmosphere"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Atmosphere transition background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663272154445/GXVzxcvZvByocWFl.png)',
          backgroundAttachment: 'fixed',
          transform: `translateY(${scrollProgress * 50}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {/* Layered gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-cyan-900/30 to-purple-900/40" />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
          style={{
            opacity: scrollProgress * 0.8,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <div
          className="text-center max-w-3xl transition-all duration-500"
          style={{
            opacity: 1 - scrollProgress * 0.5,
            transform: `translateY(${scrollProgress * 30}px)`,
          }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 glow-text" style={{ fontFamily: "'Orbitron', monospace" }}>
            大氣層 | 進入
          </h2>
          <p className="font-mono text-lg md:text-xl text-cyan-300 mb-4">
            真正的挑戰，發生在落地之後
          </p>
          <p className="font-mono text-base md:text-lg text-cyan-200 font-semibold tracking-wide">
            從理論到實踋 · 從設計到實現 · 從概念到產品
          </p>
        </div>

        {/* Animated descent indicator */}
        <div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 2),
          }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-transparent rounded-full animate-pulse" />
            <span className="font-mono text-xs text-cyan-400">繼續下滾</span>
          </div>
        </div>
      </div>

      {/* Particle effect overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(0, 217, 255, ${
            scrollProgress * 0.1
          }) 0%, transparent 70%)`,
        }}
      />
    </section>
  );
}
