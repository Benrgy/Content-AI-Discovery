"use client";

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import AppInitializer from "./components/AppInitializer";
import ScrollToTop from "./components/ScrollToTop";
import { SEOWrapper } from "./components/SEOWrapper";
import PerformanceOptimizer from "./components/PerformanceOptimizer";
import KeyboardShortcuts from "./components/KeyboardShortcuts";

// Import all pages
import Index from "./pages/Index";
import ContentDiscovery from "./pages/ContentDiscovery";
import ContentGeneration from "./pages/ContentGeneration";
import SavedContent from "./pages/SavedContent";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import ContentDetail from "./pages/ContentDetail";
import Diagnostics from "./pages/Diagnostics";
import Settings from "./pages/Settings";
import GitHubIntegration from "./pages/GitHubIntegration";
import DeploymentStatus from "./pages/DeploymentStatus";
import NotFound from "./pages/NotFound";

const App = () => {
  console.log("App component rendering");
  
  return (
    <ErrorBoundary>
      <AppInitializer>
        <KeyboardShortcuts>
          <ScrollToTop />
          <PerformanceOptimizer />
          <SEOWrapper>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="discover" element={<ContentDiscovery />} />
                <Route path="content/:id" element={<ContentDetail />} />
                <Route path="generate" element={<ContentGeneration />} />
                <Route path="analytics" element={<AnalyticsDashboard />} />
                <Route path="saved" element={<SavedContent />} />
                <Route path="settings" element={<Settings />} />
                <Route path="diagnostics" element={<Diagnostics />} />
                <Route path="github" element={<GitHubIntegration />} />
                <Route path="deployment" element={<DeploymentStatus />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </SEOWrapper>
        </KeyboardShortcuts>
      </AppInitializer>
    </ErrorBoundary>
  );
};

export default App;