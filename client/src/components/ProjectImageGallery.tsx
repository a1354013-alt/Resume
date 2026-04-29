import { useMemo, useState } from "react";
import type { ProjectImage } from "@/data/projects";
import Lightbox from "@/components/Lightbox";

function resolveAssetUrl(src: string) {
  const baseUrl = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
  if (src.startsWith("/")) return `${baseUrl}${src}`;
  return src;
}

interface ProjectImageGalleryProps {
  images?: ProjectImage[];
  className?: string;
  heightClassName?: string;
}

export default function ProjectImageGallery({
  images,
  className,
  heightClassName = "h-[180px]",
}: ProjectImageGalleryProps) {
  const safeImages = useMemo(() => {
    const list = (images ?? []).filter(image => image?.src && image?.alt);
    return list.slice(0, 4);
  }, [images]);

  const [isOpen, setIsOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  if (safeImages.length === 0) return null;

  const count = safeImages.length;

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
      <div className={className}>
        <div className={`grid gap-2 ${gridClass} ${heightClassName}`}>
          {safeImages.map((image, index) => {
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
                className={`relative overflow-hidden rounded-lg cursor-pointer group ${itemClass}`}
                aria-label={`Open image: ${image.alt}`}
              >
                <img
                  src={resolveAssetUrl(image.src)}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] group-hover:brightness-110"
                  loading="lazy"
                  draggable={false}
                />
              </button>
            );
          })}
        </div>
      </div>

      <Lightbox
        images={safeImages}
        initialIndex={initialIndex}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
