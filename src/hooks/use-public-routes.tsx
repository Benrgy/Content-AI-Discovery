"use client";

import { useMemo } from "react";
import { appRoutes } from "@/constants/routes"; // Import from new constants file

export function usePublicRoutes() {
  const publicRoutes = useMemo(() => {
    return appRoutes.filter(route => route.inNav);
  }, []);

  return publicRoutes;
}