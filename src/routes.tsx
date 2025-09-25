"use client";

import React from "react";
import Index from "./pages/Index";
import ContentDiscovery from "./pages/ContentDiscovery";
import ContentGeneration from "./pages/ContentGeneration";
import SavedContent from "./pages/SavedContent"; // Import the new SavedContent page
import NotFound from "./pages/NotFound";

interface AppRoute {
  path: string;
  name: string;
  element: React.ReactNode;
  inNav?: boolean; // New property to indicate if the route should be in the navigation
}

export const appRoutes: AppRoute[] = [
  {
    path: "/",
    name: "Home",
    element: <Index />,
    inNav: false, // Home page typically not in main nav, accessed via logo
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
    path: "/saved", // New route for saved content
    name: "Saved Content",
    element: <SavedContent />,
    inNav: true,
  },
  // Add all custom routes above the catch-all "*" route
  {
    path: "*",
    name: "Not Found",
    element: <NotFound />,
    inNav: false, // 404 page should not be in navigation
  },
];