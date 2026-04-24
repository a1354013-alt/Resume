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

    <nav className="sticky top-0 z-50 bg-slate-950/60 backdrop-blur-md border-b border-cyan-500/10">
  <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
    <Link
      href="/"
      className="font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
    >
      首頁
    </Link>

    <div className="flex gap-4 items-center">
      <Link
        href="/biography"
        className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors"
      >
        自傳
      </Link>

      <span className="text-slate-600">|</span>

      <Link
        href="/resume"
        className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors"
      >
        履歷
      </Link>

      <span className="text-slate-600">|</span>

      <Link
        href="/projects"
        className="font-mono text-xs text-slate-400 hover:text-cyan-400 transition-colors"
      >
        專案
      </Link>

      <span className="text-slate-600">|</span>

      <button
        type="button"
        onClick={scrollToTop}
        className="font-mono text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
      >
        回到頂部
      </button>
    </div>
  </div>
</nav>
    </>
  );
}
