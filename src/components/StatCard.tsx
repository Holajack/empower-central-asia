import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface StatCardProps {
  number: number;
  label: string;
  suffix?: string;
  delay?: number;
}

const StatCard = ({ number, label, suffix = "", delay = 0 }: StatCardProps) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    let start = 0;
    const end = number;
    const duration = 2000;
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setCount(Math.floor(progress * (end - start) + start));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    if (inView) {
      setTimeout(() => {
        window.requestAnimationFrame(step);
      }, delay);
    }
  }, [inView, number, delay]);

  return (
    <div
      ref={ref}
      className="bg-white/40 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:scale-105"
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