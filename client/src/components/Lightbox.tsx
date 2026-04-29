import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { ProjectImage } from "@/data/projects";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useRestoreFocus } from "@/hooks/useRestoreFocus";

function resolveAssetUrl(src: string) {
  const baseUrl = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
  if (src.startsWith("/")) return `${baseUrl}${src}`;
  return src;
}

interface LightboxProps {
  images: ProjectImage[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({
  images,
  initialIndex,
  isOpen,
  onClose,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const captionId = useId();

  const safeImages = useMemo(
    () => images.filter(image => image?.src && image?.alt),
    [images]
  );

  const [index, setIndex] = useState(() => {
    if (safeImages.length === 0) return 0;
    const clamped = Math.max(0, Math.min(initialIndex, safeImages.length - 1));
    return clamped;
  });

  const isVisible = isOpen && safeImages.length > 0;

  useBodyScrollLock(isVisible);
  useRestoreFocus(isVisible);
  useFocusTrap(dialogRef, isVisible);
  useEscapeKey(onClose, isVisible);

  useEffect(() => {
    if (!isVisible) return;
    setIndex(() => {
      const clamped = Math.max(0, Math.min(initialIndex, safeImages.length - 1));
      return clamped;
    });
  }, [initialIndex, isVisible, safeImages.length]);

  useEffect(() => {
    if (!isVisible) return;
    closeButtonRef.current?.focus({ preventScroll: true });
  }, [isVisible]);

  const current = safeImages[index];
  const canNavigate = safeImages.length > 1;

  const goPrev = () => {
    if (!canNavigate) return;
    setIndex(currentIndex =>
      currentIndex === 0 ? safeImages.length - 1 : currentIndex - 1
    );
  };

  const goNext = () => {
    if (!canNavigate) return;
    setIndex(currentIndex =>
      currentIndex === safeImages.length - 1 ? 0 : currentIndex + 1
    );
  };

  useEffect(() => {
    if (!isVisible) return;
    if (typeof document === "undefined") return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (!canNavigate) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [canNavigate, isVisible, safeImages.length]);

  if (!isVisible || !current) return null;

  const caption = current.caption ?? current.alt;

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Lightbox"
          aria-describedby={captionId}
          tabIndex={-1}
          className="relative w-full max-w-5xl max-h-[90vh] outline-none"
          onClick={event => event.stopPropagation()}
        >
          <div className="relative bg-slate-950/70 border border-slate-700/60 rounded-lg overflow-hidden shadow-2xl">
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
              {canNavigate && (
                <div className="text-xs text-slate-200/80 bg-black/40 px-2 py-1 rounded">
                  {index + 1} / {safeImages.length}
                </div>
              )}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg bg-black/40 hover:bg-black/60 text-slate-200 transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {canNavigate && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-lg bg-black/40 hover:bg-black/60 text-slate-200 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-lg bg-black/40 hover:bg-black/60 text-slate-200 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="flex items-center justify-center bg-black/30">
              <img
                src={resolveAssetUrl(current.src)}
                alt={current.alt}
                className="max-h-[80vh] w-auto max-w-full object-contain select-none"
                draggable={false}
              />
            </div>

            <div className="border-t border-slate-700/50 bg-slate-950/60 px-4 py-3">
              <p
                id={captionId}
                className="text-sm text-slate-200 text-center"
              >
                {caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
