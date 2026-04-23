import { useEffect, useState, useRef } from 'react';
import { Link } from 'wouter';
import { ChevronUp } from 'lucide-react';

/**
 * Floating Navbar - 浮動導航欄
 * 
 * Design Philosophy: Minimal, Non-intrusive Navigation
 * - Appears when user scrolls past hero section
 * - Semi-transparent backdrop blur effect
 * - Deep space techno aesthetic (matches site design)
 * - Smooth fade-in/out animation
 * - Sticky positioning, doesn't interfere with content
 */

export default function FloatingNavbar() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        // Show navbar when hero section is out of view
        setIsVisible(heroBottom < 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Invisible reference element at hero section */}
      <div ref={heroRef} className="absolute top-0 left-0 w-full h-screen pointer-events-none" />

      {/* Floating Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isVisible ? 'opacity-100 backdrop-blur-md' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo / Home button */}
          <Link href="/">
            <a
              onClick={scrollToTop}
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200 font-mono text-sm font-semibold"
              style={{ fontFamily: "'Orbitron', monospace" }}
            >
              <ChevronUp size={18} />
              <span>回到頂部</span>
            </a>
          </Link>

          {/* Navigation links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/">
              <a className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors duration-200 uppercase tracking-wide">
                首頁
              </a>
            </Link>
            <Link href="/resume">
              <a className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors duration-200 uppercase tracking-wide">
                我的履歷
              </a>
            </Link>
            <Link href="/biography">
              <a className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors duration-200 uppercase tracking-wide">
                我的自傳
              </a>
            </Link>
            <Link href="/projects">
              <a className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors duration-200 uppercase tracking-wide">
                我的作品
              </a>
            </Link>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center gap-4">
            <Link href="/resume">
              <a className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors duration-200">
                履歷
              </a>
            </Link>
            <Link href="/biography">
              <a className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors duration-200">
                自傳
              </a>
            </Link>
            <Link href="/projects">
              <a className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors duration-200">
                作品
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
