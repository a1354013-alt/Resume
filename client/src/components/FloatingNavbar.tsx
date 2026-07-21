import { Link } from "wouter";
import { useState } from "react";

export default function FloatingNavbar() {
  const [open, setOpen] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
  };

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <div className="flex flex-col gap-3 p-4">
      <Link
        href="/"
        onClick={() => onClick?.()}
        className="font-mono text-base text-cyan-400 transition-colors hover:text-cyan-300"
      >
        首頁
      </Link>
      <Link
        href="/resume"
        onClick={() => onClick?.()}
        className="font-mono text-base text-slate-200 transition-colors hover:text-cyan-400"
      >
        履歷
      </Link>
      <Link
        href="/experience"
        onClick={() => onClick?.()}
        className="font-mono text-base text-slate-200 transition-colors hover:text-cyan-400"
      >
        工作經驗
      </Link>
      <Link
        href="/projects"
        onClick={() => onClick?.()}
        className="font-mono text-base text-slate-200 transition-colors hover:text-cyan-400"
      >
        專案
      </Link>
      <Link
        href="/biography"
        onClick={() => onClick?.()}
        className="font-mono text-base text-slate-200 transition-colors hover:text-cyan-400"
      >
        自傳
      </Link>
      <button
        type="button"
        onClick={() => {
          scrollToTop();
          onClick?.();
        }}
        className="font-mono text-base text-cyan-200 text-left"
      >
        回到頂部
      </button>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-cyan-500/10 bg-slate-950/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-cyan-400 transition-colors hover:text-cyan-300"
        >
          首頁
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/resume"
            className="font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400"
          >
            履歷
          </Link>

          <span className="text-slate-600">|</span>

          <Link
            href="/experience"
            className="font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400"
          >
            工作經驗
          </Link>

          <span className="text-slate-600">|</span>

          <Link
            href="/projects"
            className="font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400"
          >
            專案
          </Link>

          <span className="text-slate-600">|</span>

          <Link
            href="/biography"
            className="font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400"
          >
            自傳
          </Link>

          <span className="text-slate-600">|</span>

          <button
            type="button"
            onClick={scrollToTop}
            className="font-mono text-xs text-cyan-400 transition-colors hover:text-cyan-300"
          >
            回到頂部
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            aria-label={open ? "關閉選單" : "開啟選單"}
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
            className="rounded-md p-2 text-slate-200 hover:bg-slate-800/40"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
              <path
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="md:hidden border-t border-slate-800/40 bg-slate-950/95">
          <NavLinks onClick={() => setOpen(false)} />
        </div>
      )}
    </nav>
  );
}
