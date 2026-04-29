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
}

export default function ProjectImageGallery({
  images,
  className,
}: ProjectImageGalleryProps) {
  const safeImages = useMemo(() => {
    const list = (images ?? []).filter(image => image?.src && image?.alt);
    return list.slice(0, 4);
  }, [images]);

  const [isOpen, setIsOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  if (safeImages.length < 2) {
    return null;
  }

  const count = safeImages.length;

  const gridClass = (() => {
    if (count === 2) return "grid-cols-1 sm:grid-cols-2";
    if (count === 3) return "grid-cols-1 sm:grid-cols-2 sm:grid-rows-2";
    return "grid-cols-1 sm:grid-cols-2 sm:grid-rows-2";
  })();

  const openAt = (index: number) => {
    setInitialIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <div className={className}>
        <div className={`grid gap-2 ${gridClass}`}>
          {safeImages.map((image, index) => {
            const isThreePrimary = count === 3 && index === 0;
            const itemClass =
              count === 3
                ? isThreePrimary
                  ? "sm:row-span-2"
                  : ""
                : "";

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
                  className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] group-hover:brightness-110"
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

