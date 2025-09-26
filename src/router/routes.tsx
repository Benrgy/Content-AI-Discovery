import { type ReactNode } from "react";
import Index from "@/pages/Index";
import ContentDiscovery from "@/pages/ContentDiscovery";
import ContentGeneration from "@/pages/ContentGeneration";
import SavedContent from "@/pages/SavedContent";
import AnalyticsDashboard from "@/pages/AnalyticsDashboard";
import ContentDetail from "@/pages/ContentDetail";
import Diagnostics from "@/pages/Diagnostics";
import Settings from "@/pages/Settings";
import GitHubIntegration from "@/pages/GitHubIntegration";
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
    name: "Discover",
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
    name: "Generate",
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
    name: "Saved",
    element: <SavedContent />,
    inNav: true,
  },
  {
    path: "/settings",
    name: "Settings",
    element: <Settings />,
    inNav: false,
  },
  {
    path: "/diagnostics",
    name: "Diagnostics",
    element: <Diagnostics />,
    inNav: false,
  },
  {
    path: "/github",
    name: "GitHub",
    element: <GitHubIntegration />,
    inNav: false,
  },
  {
    path: "*",
    name: "Not Found",
    element: <NotFound />,
    inNav: false,
  },
];