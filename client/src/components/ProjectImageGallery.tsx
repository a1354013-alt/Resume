import { useMemo, useState } from "react";
import type { Project, ProjectImage } from "@/data/projects";
import Lightbox from "@/components/Lightbox";

function resolveAssetUrl(src: string) {
  const baseUrl = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
  if (src.startsWith("/")) return `${baseUrl}${src}`;
  return src;
}

interface ProjectImageGalleryProps {
  images?: ProjectImage[];
  projectName?: string;
  tier?: Project["tier"];
  className?: string;
  heightClassName?: string;
}

export default function ProjectImageGallery({
  images,
  projectName,
  tier,
  className,
  heightClassName = "h-[140px]",
}: ProjectImageGalleryProps) {
  const safeImages = useMemo(() => {
    const list = (images ?? []).filter(image => image?.src && image?.alt);
    return list.slice(0, 4);
  }, [images]);

  const [isOpen, setIsOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const [failedSources, setFailedSources] = useState<Set<string>>(
    () => new Set()
  );

  const availableImages = useMemo(() => {
    if (failedSources.size === 0) return safeImages;
    return safeImages.filter(image => !failedSources.has(image.src));
  }, [failedSources, safeImages]);

  const fallbackGradient = (() => {
    if (tier === "production") {
      return "from-emerald-500/25 via-cyan-500/15 to-slate-950/60";
    }
    if (tier === "gold") {
      return "from-amber-500/20 via-orange-500/10 to-slate-950/60";
    }
    if (tier === "silver") {
      return "from-slate-400/20 via-slate-500/10 to-slate-950/60";
    }
    return "from-slate-900/30 via-slate-900/10 to-slate-950/40";
  })();

  if (availableImages.length === 0) {
    return (
      <div
        className={`relative w-full ${heightClassName} overflow-hidden rounded-lg border border-slate-700/30 bg-gradient-to-br ${fallbackGradient} ${
          className ?? ""
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,211,238,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(16,185,129,0.10),transparent_55%)]" />
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-3 text-center">
          {projectName && (
            <div className="text-sm font-semibold text-slate-100 line-clamp-1">
              {projectName}
            </div>
          )}
          <div className="mt-1 text-xs text-slate-200/80">系統畫面準備中</div>
        </div>
      </div>
    );
  }

  const count = availableImages.length;

  const gridClass = (() => {
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    if (count === 3) return "grid-cols-2 grid-rows-2";
    return "grid-cols-2 grid-rows-2";
  })();

  const openAt = (index: number) => {
    setInitialIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <div className={`w-full ${heightClassName} ${className ?? ""}`}>
        <div className={`grid h-full gap-2 ${gridClass}`}>
          {availableImages.map((image, index) => {
            const isThreePrimary = count === 3 && index === 0;
            const itemClass =
              count === 3 ? (isThreePrimary ? "row-span-2" : "") : "";

            return (
              <button
                key={`${image.src}-${index}`}
                type="button"
                onClick={event => {
                  event.stopPropagation();
                  openAt(index);
                }}
                className={`relative overflow-hidden rounded-lg cursor-pointer group h-full min-h-0 ${itemClass}`}
                aria-label={`Open image: ${image.alt}`}
              >
                <img
                  src={resolveAssetUrl(image.src)}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] group-hover:brightness-110"
                  loading="lazy"
                  draggable={false}
                  onError={event => {
                    event.currentTarget.src =
                      "data:image/gif;base64,R0lGODlhAQABAAAAACw=";
                    setFailedSources(prev => {
                      if (prev.has(image.src)) return prev;
                      const next = new Set(prev);
                      next.add(image.src);
                      return next;
                    });
                  }}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <div className="rounded-md bg-slate-950/70 border border-slate-700/40 px-2 py-1 text-[11px] text-slate-200 line-clamp-1">
                    {image.alt}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Lightbox
        images={availableImages}
        initialIndex={initialIndex}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
