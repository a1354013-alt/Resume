import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ChevronUp } from "lucide-react";

export default function FloatingNavbar() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      if (!heroRef.current) return;
      const heroBottom = heroRef.current.getBoundingClientRect().bottom;
      const next = heroBottom < 100;
      setIsVisible(prev => (prev === next ? prev : next));
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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <div
        ref={heroRef}
        className="absolute top-0 left-0 w-full h-screen pointer-events-none"
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isVisible
            ? "opacity-100 backdrop-blur-md"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.6)",
          borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200 font-mono text-sm font-semibold"
            style={{ fontFamily: "'Orbitron', monospace" }}
          >
            <ChevronUp size={18} />
            <span>回到頂端</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="font-mono text-xs text-slate-300/80 hover:text-cyan-300 transition-colors duration-200 uppercase tracking-wide"
            >
              Home
            </Link>
            <Link
              href="/resume"
              className="font-mono text-xs text-slate-300/80 hover:text-cyan-300 transition-colors duration-200 uppercase tracking-wide"
            >
              Resume
            </Link>
            <Link
              href="/biography"
              className="font-mono text-xs text-slate-300/80 hover:text-cyan-300 transition-colors duration-200 uppercase tracking-wide"
            >
              Bio
            </Link>
            <Link
              href="/projects"
              className="font-mono text-xs text-slate-300/80 hover:text-cyan-300 transition-colors duration-200 uppercase tracking-wide"
            >
              Projects
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <Link
              href="/resume"
              className="font-mono text-xs text-slate-300/80 hover:text-cyan-300 transition-colors duration-200"
            >
              履歷
            </Link>
            <Link
              href="/biography"
              className="font-mono text-xs text-slate-300/80 hover:text-cyan-300 transition-colors duration-200"
            >
              自傳
            </Link>
            <Link
              href="/projects"
              className="font-mono text-xs text-slate-300/80 hover:text-cyan-300 transition-colors duration-200"
            >
              專案
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
