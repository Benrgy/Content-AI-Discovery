import React from "react";
import Index from "@/pages/Index";
import ContentDiscovery from "@/pages/ContentDiscovery";
import ContentGeneration from "@/pages/ContentGeneration";
import SavedContent from "@/pages/SavedContent";
import NotFound from "@/pages/NotFound";

export interface AppRoute {
  path: string;
  name: string;
  element: React.ReactNode;
  inNav?: boolean;
}

export const appRoutes: AppRoute[] = [
  {
    path: "/",
    name: "Home",
    element: <Index />,
    inNav: false,
  },
  {
    path: "/discover",
    name: "Discover Content",
    element: <ContentDiscovery />,
    inNav: true,
  },
  {
    path: "/generate",
    name: "Generate Content",
    element: <ContentGeneration />,
    inNav: true,
  },
  {
    path: "/saved",
    name: "Saved Content",
    element: <SavedContent />,
    inNav: true,
  },
  {
    path: "*",
    name: "Not Found",
    element: <NotFound />,
    inNav: false,
  },
];