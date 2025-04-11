
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface StatCardProps {
  number: number;
  label: string;
  suffix?: string;
  delay?: number;
  resetAnimation?: boolean;
}

const StatCard = ({ 
  number, 
  label, 
  suffix = "", 
  delay = 0,
  resetAnimation = false 
}: StatCardProps) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });
  
  const animationRef = useRef<number | null>(null);
  const startTimestampRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset the animation when resetAnimation changes or becomes true
    if (resetAnimation) {
      startTimestampRef.current = null;
      setCount(0);
    }
  }, [resetAnimation]);

  useEffect(() => {
    let start = 0;
    const end = number;
    const duration = 2000;
    
    const step = (timestamp: number) => {
      if (!startTimestampRef.current) startTimestampRef.current = timestamp;
      const progress = Math.min((timestamp - startTimestampRef.current) / duration, 1);
      
      setCount(Math.floor(progress * (end - start) + start));

      if (progress < 1) {
        animationRef.current = window.requestAnimationFrame(step);
      }
    };

    if (inView) {
      // Cancel any existing animation
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
      
      setTimeout(() => {
        animationRef.current = window.requestAnimationFrame(step);
      }, delay);
    }

    return () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, [inView, number, delay, resetAnimation]);

  return (
    <div
      ref={ref}
      className="bg-white/40 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:scale-105 h-full flex flex-col justify-center"
    >
      <div className="text-4xl font-bold text-terracotta-500 mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

export default StatCard;
