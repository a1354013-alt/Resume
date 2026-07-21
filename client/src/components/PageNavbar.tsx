import { useState } from "react";
import { Link } from "wouter";

type PageKey = "home" | "biography" | "resume" | "experience" | "projects";

interface PageNavbarProps {
  currentPage: PageKey;
}

const pageLinks: Array<{ key: PageKey; href: string; label: string }> = [
  { key: "home", href: "/", label: "首頁" },
  { key: "resume", href: "/resume", label: "履歷" },
  { key: "experience", href: "/experience", label: "工作經驗" },
  { key: "projects", href: "/projects", label: "專案" },
  { key: "biography", href: "/biography", label: "自傳" },
];

const pageTitles: Record<PageKey, string> = {
  home: "Portfolio",
  resume: "履歷",
  experience: "工作經驗",
  projects: "Projects",
  biography: "自傳",
};

function getLinkClass(isActive: boolean, size: "sm" | "base") {
  const textSize = size === "sm" ? "text-xs" : "text-base";

  return `font-mono ${textSize} transition-colors ${
    isActive ? "text-cyan-300" : "text-slate-400 hover:text-cyan-400"
  }`;
}

export default function PageNavbar({ currentPage }: PageNavbarProps) {
  const [open, setOpen] = useState(false);
  const currentTitle = pageTitles[currentPage];
  const desktopLinks = pageLinks.filter(
    page => page.key !== "home" && page.key !== currentPage
  );

  const closeMenu = () => setOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-cyan-500/10 bg-slate-950/65 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-4 sm:px-6">
        <div className="flex justify-start">
          <Link
            href="/"
            aria-current={currentPage === "home" ? "page" : undefined}
            className={`font-mono text-base transition-colors ${
              currentPage === "home"
                ? "text-cyan-300"
                : "text-cyan-400 hover:text-cyan-300"
            }`}
          >
            首頁
          </Link>
        </div>

        <h1 className="text-center font-mono text-sm text-slate-400">
          {currentTitle}
        </h1>

        <div className="hidden items-center justify-end gap-4 md:flex">
          {desktopLinks.map((page, index) => (
            <div key={page.key} className="flex items-center gap-4">
              {index > 0 && <span className="text-slate-600">|</span>}
              <Link
                href={page.href}
                aria-current={page.key === currentPage ? "page" : undefined}
                className={getLinkClass(page.key === currentPage, "sm")}
              >
                {page.label}
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-end md:hidden">
          <button
            type="button"
            aria-label={open ? "關閉選單" : "開啟選單"}
            aria-expanded={open}
            onClick={() => setOpen(value => !value)}
            className="rounded-md p-2 text-slate-200 transition-colors hover:bg-slate-800/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
            >
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
        <div className="border-t border-slate-800/60 bg-slate-950/95 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:px-6">
            {pageLinks.map(page => (
              <Link
                key={page.key}
                href={page.href}
                aria-current={page.key === currentPage ? "page" : undefined}
                onClick={closeMenu}
                className={getLinkClass(page.key === currentPage, "base")}
              >
                {page.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
