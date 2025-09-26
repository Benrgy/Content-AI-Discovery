"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LazyLoadProps {
  children: ReactNode;
  placeholder?: ReactNode;
  threshold?: number;
  className?: string;
  height?: number;
}

const LazyLoad = ({ 
  children, 
  placeholder, 
  threshold = 0.1, 
  className,
  height = 200 
}: LazyLoadProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: `${height}px`
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer && observer.disconnect) {
        observer.disconnect();
      }
    };
  }, [threshold, height]);

  return (
    <div 
      ref={elementRef} 
      className={cn("w-full", className)}
      style={{ minHeight: isVisible ? 'auto' : height }}
    >
      {isVisible ? children : (placeholder || (
        <div className="flex items-center justify-center h-full bg-muted rounded-md animate-pulse">
          <div className="text-sm text-muted-foreground">Loading...</div>
        </div>
      ))}
    </div>
  );
};

export default LazyLoad;