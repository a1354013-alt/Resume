import { Link } from "wouter";

export default function FloatingNavbar() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-cyan-500/10 bg-slate-950/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-cyan-400 transition-colors hover:text-cyan-300"
        >
          首頁
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/biography"
            className="font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400"
          >
            自傳
          </Link>

          <span className="text-slate-600">|</span>

          <Link
            href="/resume"
            className="font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400"
          >
            履歷
          </Link>

          <span className="text-slate-600">|</span>

          <Link
            href="/projects"
            className="font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400"
          >
            專案
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
      </div>
    </nav>
  );
}
