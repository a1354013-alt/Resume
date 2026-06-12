import { useEffect, useState } from "react";

export interface PageAnchor {
  id: string;
  label: string;
}

interface PageAnchorNavProps {
  anchors: PageAnchor[];
  className?: string;
}

function getInitialActiveId(anchors: PageAnchor[]) {
  if (typeof window === "undefined") return anchors[0]?.id ?? "";

  const hashId = decodeURIComponent(window.location.hash.replace("#", ""));
  return anchors.some(anchor => anchor.id === hashId)
    ? hashId
    : (anchors[0]?.id ?? "");
}

export default function PageAnchorNav({
  anchors,
  className = "",
}: PageAnchorNavProps) {
  const [activeId, setActiveId] = useState(() => getInitialActiveId(anchors));

  useEffect(() => {
    setActiveId(getInitialActiveId(anchors));
  }, [anchors]);

  useEffect(() => {
    const updateFromHash = () => {
      const hashId = decodeURIComponent(window.location.hash.replace("#", ""));

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

  return (
    <>
      <nav
        aria-label="頁面段落"
        className={`pointer-events-none fixed left-4 top-28 z-40 hidden 2xl:block ${className}`}
      >
        <div className="pointer-events-auto w-40 rounded-2xl border border-slate-700/35 bg-slate-950/75 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="space-y-1">
            {anchors.map(anchor => {
              const isActive = anchor.id === activeId;

              return (
                <a
                  key={anchor.id}
                  href={`#${anchor.id}`}
                  aria-current={isActive ? "location" : undefined}
                  onClick={() => setActiveId(anchor.id)}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                    isActive
                      ? "bg-white text-slate-950 shadow-lg shadow-cyan-950/10"
                      : "text-slate-300 hover:bg-slate-900/80 hover:text-cyan-200"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 shrink-0 rounded-full transition-colors ${
                      isActive
                        ? "bg-cyan-500"
                        : "bg-slate-600 group-hover:bg-cyan-400"
                    }`}
                  />
                  <span className="truncate">{anchor.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      <nav
        aria-label="頁面段落"
        className="sticky top-[57px] z-40 overflow-x-auto border-y border-cyan-500/10 bg-slate-950/75 px-4 py-2 backdrop-blur-xl 2xl:hidden"
      >
        <div className="flex w-max gap-2">
          {anchors.map(anchor => {
            const isActive = anchor.id === activeId;

            return (
              <a
                key={anchor.id}
                href={`#${anchor.id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={() => setActiveId(anchor.id)}
                className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
                  isActive
                    ? "border-white bg-white text-slate-950"
                    : "border-slate-700/45 bg-slate-900/45 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-200"
                }`}
              >
                {anchor.label}
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
