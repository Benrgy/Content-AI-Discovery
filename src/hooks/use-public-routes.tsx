"use client";

import { useMemo } from "react";
import { appRoutes } from "@/router/routes"; // Updated import path

export function usePublicRoutes() {
  const publicRoutes = useMemo(() => {
    return appRoutes.filter(route => route.inNav);
  }, []);

  return publicRoutes;
}