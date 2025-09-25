"use client";

import React from "react";
import Index from "./pages/Index";
import ContentDiscovery from "./pages/ContentDiscovery";
import ContentGeneration from "./pages/ContentGeneration";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

interface AppRoute {
  path: string;
  name: string;
  element: React.ReactNode;
  isPublic: boolean; // Indicates if the route should be shown in public navigation
}

export const appRoutes: AppRoute[] = [
  {
    path: "/",
    name: "Home",
    element: <Layout><Index /></Layout>,
    isPublic: true,
  },
  {
    path: "/discover",
    name: "Discover Content",
    element: <Layout><ContentDiscovery /></Layout>,
    isPublic: true,
  },
  {
    path: "/generate",
    name: "Generate Content",
    element: <Layout><ContentGeneration /></Layout>,
    isPublic: true,
  },
  // Add all custom routes above the catch-all "*" route
  {
    path: "*",
    name: "Not Found",
    element: <Layout><NotFound /></Layout>,
    isPublic: false, // Not a public navigation item
  },
];