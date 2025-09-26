"use client";

import { useMemo } from "react";

const navigationRoutes = [
  { path: "/discover", name: "Discover", inNav: true },
  { path: "/generate", name: "Generate", inNav: true },
  { path: "/analytics", name: "Analytics", inNav: true },
  { path: "/saved", name: "Saved", inNav: true },
];

export function usePublicRoutes() {
  const publicRoutes = useMemo(() => {
    return navigationRoutes.filter(route => route.inNav);
  }, []);

  return publicRoutes;
}