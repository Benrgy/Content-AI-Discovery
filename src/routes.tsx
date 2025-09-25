"use client";

import React from "react";
import Index from "./pages/Index";
import ContentDiscovery from "./pages/ContentDiscovery";
import ContentGeneration from "./pages/ContentGeneration";
import NotFound from "./pages/NotFound";

interface AppRoute {
  path: string;
  name: string;
  element: React.ReactNode;
}

export const appRoutes: AppRoute[] = [
  {
    path: "/",
    name: "Home",
    element: <Index />,
  },
  {
    path: "/discover",
    name: "Discover Content",
    element: <ContentDiscovery />,
  },
  {
    path: "/generate",
    name: "Generate Content",
    element: <ContentGeneration />,
  },
  // Add all custom routes above the catch-all "*" route
  {
    path: "*",
    name: "Not Found",
    element: <NotFound />,
  },
];