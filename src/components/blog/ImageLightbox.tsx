import { useState, useEffect, useCallback } from "react";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useRegion } from "@/contexts/RegionContext";

interface ImageLightboxProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageLightbox = ({ src, alt, className = "" }: ImageLightboxProps) => {
  const { isCentralAsia } = useRegion();
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);

  const openLightbox = () => {
    setIsOpen(true);
    setScale(1);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    setScale(1);
    document.body.style.overflow = "";
  }, []);

  const zoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "+" || e.key === "=") zoomIn();
      if (e.key === "-") zoomOut();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeLightbox]);

  return (
    <>
      {/* Clickable Image */}
      <div
        className={`relative cursor-zoom-in group ${className}`}
        onClick={openLightbox}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-auto"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={(e) => { e.stopPropagation(); zoomOut(); }}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              aria-label={isCentralAsia ? "Уменьшить" : "Zoom out"}
            >
              <ZoomOut className="h-5 w-5" />
            </button>
            <span className="text-white text-sm px-2">{Math.round(scale * 100)}%</span>
            <button
              onClick={(e) => { e.stopPropagation(); zoomIn(); }}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
              aria-label={isCentralAsia ? "Увеличить" : "Zoom in"}
            >
              <ZoomIn className="h-5 w-5" />
            </button>
            <button
              onClick={closeLightbox}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors ml-4"
              aria-label={isCentralAsia ? "Закрыть" : "Close"}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Image */}
          <div
            className="overflow-auto max-w-full max-h-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
              className="max-w-none transition-transform duration-200"
            />
          </div>

          {/* Caption */}
          {alt && (
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-white/80 text-sm bg-black/50 inline-block px-4 py-2 rounded-lg">
                {alt}
              </p>
            </div>
          )}

          {/* Keyboard hints */}
          <div className="absolute bottom-4 right-4 text-white/50 text-xs hidden md:block">
            {isCentralAsia ? "ESC — закрыть | +/- — масштаб" : "Press ESC to close | +/- to zoom"}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageLightbox;
