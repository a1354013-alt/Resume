import { useState } from "react";
import { Link } from "wouter";
import { pageLinks } from "@/data/navigation";
import { scrollPageToTop } from "@/lib/scroll";

export default function FloatingNavbar() {
  const [open, setOpen] = useState(false);

  const scrollToTop = () => {
    scrollPageToTop();
    setOpen(false);
  };

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <div className="flex flex-col gap-3 p-4">
      {pageLinks.map((page, index) => (
        <Link
          key={page.key}
          href={page.href}
          onClick={() => onClick?.()}
          className={`font-mono text-base transition-colors ${
            index === 0
              ? "text-cyan-400 hover:text-cyan-300"
              : "text-slate-200 hover:text-cyan-400"
          }`}
        >
          {page.label}
        </Link>
      ))}
      <button
        type="button"
        onClick={() => {
          scrollToTop();
          onClick?.();
        }}
        className="font-mono text-base text-cyan-200 text-left"
      >
        回到頂端
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

        <div className="hidden items-center gap-4 md:flex">
          {pageLinks.slice(1).map(page => (
            <div key={page.key} className="contents">
              <Link
                href={page.href}
                className="font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400"
              >
                {page.label}
              </Link>
              {page.key !== "biography" && (
                <span className="text-slate-600">|</span>
              )}
            </div>
          ))}

          <span className="text-slate-600">|</span>

          <button
            type="button"
            onClick={scrollToTop}
            className="font-mono text-xs text-cyan-400 transition-colors hover:text-cyan-300"
          >
            回到頂端
          </button>
        </div>

        <div className="md:hidden">
          <button
            aria-label={open ? "關閉選單" : "開啟選單"}
            aria-expanded={open}
            onClick={() => setOpen(value => !value)}
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

      {open && (
        <div className="border-t border-slate-800/40 bg-slate-950/95 md:hidden">
          <NavLinks onClick={() => setOpen(false)} />
        </div>
      )}
    </nav>
  );
}
