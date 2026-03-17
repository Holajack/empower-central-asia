import { useState, useEffect } from "react";

interface ReadingProgressProps {
  targetId?: string; // ID of the element to track (defaults to whole document)
  color?: string;
  height?: number;
  showPercentage?: boolean;
}

const ReadingProgress = ({
  targetId,
  color = "#8B5CF6", // Purple-500
  height = 4,
  showPercentage = false
}: ReadingProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const calculateProgress = () => {
      let scrollHeight: number;
      let scrollTop: number;
      let clientHeight: number;

      if (targetId) {
        const element = document.getElementById(targetId);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + element.offsetHeight;

        scrollTop = window.scrollY - elementTop;
        scrollHeight = element.offsetHeight - window.innerHeight;
        clientHeight = window.innerHeight;

        // Check if element is in view
        setIsVisible(window.scrollY >= elementTop - 100);
      } else {
        scrollTop = window.scrollY || document.documentElement.scrollTop;
        scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        clientHeight = document.documentElement.clientHeight;

        // Show after scrolling past hero (200px)
        setIsVisible(scrollTop > 200);
      }

      if (scrollHeight <= 0) {
        setProgress(0);
        return;
      }

      const percentage = Math.min(Math.max((scrollTop / scrollHeight) * 100, 0), 100);
      setProgress(percentage);
    };

    // Calculate on mount
    calculateProgress();

    // Add scroll listener with passive option for better performance
    window.addEventListener("scroll", calculateProgress, { passive: true });
    window.addEventListener("resize", calculateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", calculateProgress);
      window.removeEventListener("resize", calculateProgress);
    };
  }, [targetId]);

  if (!isVisible) return null;

  return (
    <>
      {/* Fixed progress bar at top */}
      <div
        className="fixed top-0 left-0 right-0 z-50 transition-opacity duration-300"
        style={{
          height: `${height}px`,
          opacity: isVisible ? 1 : 0
        }}
      >
        <div
          className="h-full bg-gray-200/50 backdrop-blur-sm"
        >
          <div
            className="h-full transition-all duration-150 ease-out"
            style={{
              width: `${progress}%`,
              backgroundColor: color,
              boxShadow: `0 0 10px ${color}40`
            }}
          />
        </div>
      </div>

      {/* Optional percentage indicator */}
      {showPercentage && progress > 0 && (
        <div
          className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg text-sm font-medium transition-opacity duration-300"
          style={{
            color,
            opacity: isVisible ? 1 : 0
          }}
        >
          {Math.round(progress)}%
        </div>
      )}
    </>
  );
};

export default ReadingProgress;
