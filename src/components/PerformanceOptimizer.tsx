"use client";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { debounce, throttle } from "@/utils/performance";

const PerformanceOptimizer = () => {
  const location = useLocation();

  useEffect(() => {
    // Optimize scroll performance
    const handleScroll = throttle(() => {
      // Scroll optimization logic
      const scrollTop = window.scrollY;
      // Could add lazy loading or other optimizations here
    }, 100);

    // Optimize resize performance
    const handleResize = debounce(() => {
      // Responsive layout adjustments
      const width = window.innerWidth;
      // Could optimize layout for different screen sizes
    }, 250);

    // Optimize click events
    const handleClick = (e: MouseEvent) => {
      // Prevent rapid consecutive clicks
      const target = e.target as HTMLElement;
      if (target.classList.contains('prevent-rapid-click')) {
        e.preventDefault();
        setTimeout(() => {
          target.click();
        }, 300);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Preload resources for the next likely route
  useEffect(() => {
    const preloadResources = () => {
      // Preload images for current route
      const images = document.querySelectorAll('img[data-src]');
      images.forEach(img => {
        const src = img.getAttribute('data-src');
        if (src) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = src;
          document.head.appendChild(link);
        }
      });

      // Preload API data for likely next routes
      if (location.pathname === '/') {
        // Preload discover page data
        fetch('/api/content-discovery', { priority: 'low' });
      }
    };

    preloadResources();
  }, [location]);

  return null;
};

export default PerformanceOptimizer;