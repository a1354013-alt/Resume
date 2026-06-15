import { useEffect, useRef, useState } from "react";

export interface PageAnchor {
  id: string;
  label: string;
}

interface PageAnchorNavProps {
  anchors: PageAnchor[];
  className?: string;
}

function getHashId() {
  if (typeof window === "undefined") return "";

  try {
    return decodeURIComponent(window.location.hash.replace(/^#/, ""));
  } catch {
    return "";
  }
}

function getInitialActiveId(anchors: PageAnchor[]) {
  const hashId = getHashId();
  return anchors.some(anchor => anchor.id === hashId)
    ? hashId
    : (anchors[0]?.id ?? "");
}

export default function PageAnchorNav({
  anchors,
  className = "",
}: PageAnchorNavProps) {
  const [activeId, setActiveId] = useState(() => getInitialActiveId(anchors));
  const sideNavSlotRef = useRef<HTMLElement>(null);
  const [sideNavLeft, setSideNavLeft] = useState(24);

  useEffect(() => {
    const updateSideNavLeft = () => {
      const rect = sideNavSlotRef.current?.getBoundingClientRect();
      if (!rect) return;

      setSideNavLeft(Math.max(24, Math.round(rect.left)));
    };

    updateSideNavLeft();
    window.addEventListener("resize", updateSideNavLeft);
    window.addEventListener("orientationchange", updateSideNavLeft);

    return () => {
      window.removeEventListener("resize", updateSideNavLeft);
      window.removeEventListener("orientationchange", updateSideNavLeft);
    };
  }, []);

  useEffect(() => {
    setActiveId(getInitialActiveId(anchors));
  }, [anchors]);

  useEffect(() => {
    const updateFromHash = () => {
      const hashId = getHashId();

      if (anchors.some(anchor => anchor.id === hashId)) {
        setActiveId(hashId);
      }
    };

    window.addEventListener("hashchange", updateFromHash);
    updateFromHash();

    return () => window.removeEventListener("hashchange", updateFromHash);
  }, [anchors]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const sections = anchors
      .map(anchor => document.getElementById(anchor.id))
      .filter((section): section is HTMLElement => section != null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        const visibleEntry = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [anchors]);

  if (anchors.length === 0) return null;

  const scrollToAnchor = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    const nextUrl = `${window.location.pathname}${window.location.search}#${encodeURIComponent(id)}`;

    window.history.replaceState(null, "", nextUrl);
    setActiveId(id);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderButton = (anchor: PageAnchor, variant: "side" | "top") => {
    const isActive = anchor.id === activeId;

    if (variant === "side") {
      return (
        <button
          key={anchor.id}
          type="button"
          aria-current={isActive ? "location" : undefined}
          onClick={() => scrollToAnchor(anchor.id)}
          className={`group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
            isActive
              ? "border-cyan-400/25 bg-cyan-400/10 text-cyan-100 shadow-[inset_3px_0_0_rgba(34,211,238,0.9)]"
              : "border-transparent text-slate-400 hover:bg-slate-900/70 hover:text-cyan-200"
          }`}
        >
          <span
            aria-hidden="true"
            className={`h-2 w-2 shrink-0 rounded-full transition-colors ${
              isActive
                ? "bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.65)]"
                : "bg-slate-600 group-hover:bg-cyan-400"
            }`}
          />
          <span className="truncate">{anchor.label}</span>
        </button>
      );
    }

    return (
      <button
        key={anchor.id}
        type="button"
        aria-current={isActive ? "location" : undefined}
        onClick={() => scrollToAnchor(anchor.id)}
        className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
          isActive
            ? "border-cyan-400/40 bg-cyan-400/15 text-cyan-100"
            : "border-slate-700/45 bg-slate-900/45 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-200"
        }`}
      >
        {anchor.label}
      </button>
    );
  };

  return (
    <>
      <nav
        ref={sideNavSlotRef}
        aria-label="頁面段落"
        className={`hidden w-44 shrink-0 self-start xl:block ${className}`}
      >
        <div
          className="fixed top-24 z-30 max-h-[calc(100vh-7rem)] w-44 overflow-y-auto rounded-2xl border border-cyan-500/10 bg-slate-950/55 p-2 shadow-xl shadow-black/20 backdrop-blur-xl"
          style={{ left: sideNavLeft }}
        >
          <div className="space-y-1">
            {anchors.map(anchor => renderButton(anchor, "side"))}
          </div>
        </div>
      </nav>

      <nav
        aria-label="頁面段落"
        className="sticky top-[57px] z-40 overflow-x-auto rounded-2xl border border-cyan-500/10 bg-slate-950/80 px-3 py-2 backdrop-blur-xl xl:hidden"
      >
        <div className="flex w-max gap-2">
          {anchors.map(anchor => renderButton(anchor, "top"))}
        </div>
      </nav>
    </>
  );
}
