'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpStatProps {
  value: string;
  label: string;
  duration?: number;
}

export default function CountUpStat({ value, label, duration = 2000 }: CountUpStatProps) {
  const [displayValue, setDisplayValue] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateValue();
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasAnimated, value, duration]);

  const animateValue = () => {
    const numericMatch = value.match(/(\d+)/);

    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseInt(numericMatch[1]);
    const prefix = value.substring(0, value.indexOf(numericMatch[1]));
    const suffix = value.substring(value.indexOf(numericMatch[1]) + numericMatch[1].length);

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (targetNumber - startValue) * easeOut);

      setDisplayValue(`${prefix}${currentValue}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-serif text-[#B8960C] mb-3">
        {displayValue}
      </div>
      <div className="text-[#6B6B6B] text-sm uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
