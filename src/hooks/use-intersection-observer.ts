"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  {
    threshold = 0,
    rootMargin = "0%",
    root = null,
    freezeOnceVisible = false,
  }: UseIntersectionObserverOptions = {}
): IntersectionObserverEntry | undefined {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef?.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, rootMargin, root };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, rootMargin, root, frozen]);

  return entry;
}