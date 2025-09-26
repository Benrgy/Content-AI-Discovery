import { type ReactNode } from "react";
import Index from "@/pages/Index";
import ContentDiscovery from "@/pages/ContentDiscovery";
import ContentGeneration from "@/pages/ContentGeneration";
import SavedContent from "@/pages/SavedContent";
import AnalyticsDashboard from "@/pages/AnalyticsDashboard";
import ContentDetail from "@/pages/ContentDetail";
import NotFound from "@/pages/NotFound";

export interface AppRoute {
  path: string;
  name: string;
  element: ReactNode;
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
    path: "/content/:id",
    name: "Content Detail",
    element: <ContentDetail />,
    inNav: false,
  },
  {
    path: "/generate",
    name: "Generate Content",
    element: <ContentGeneration />,
    inNav: true,
  },
  {
    path: "/analytics",
    name: "Analytics",
    element: <AnalyticsDashboard />,
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