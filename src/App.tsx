"use client";

import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import AppInitializer from "./components/AppInitializer";
import ScrollToTop from "./components/ScrollToTop";

// Import all pages
import Index from "./pages/Index";
import ContentDiscovery from "./pages/ContentDiscovery";
import ContentGeneration from "./pages/ContentGeneration";
import SavedContent from "./pages/SavedContent";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import ContentDetail from "./pages/ContentDetail";
import NotFound from "./pages/NotFound";

const App = () => {
  console.log("App component rendering");
  
  return (
    <ErrorBoundary>
      <AppInitializer>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="discover" element={<ContentDiscovery />} />
            <Route path="content/:id" element={<ContentDetail />} />
            <Route path="generate" element={<ContentGeneration />} />
            <Route path="analytics" element={<AnalyticsDashboard />} />
            <Route path="saved" element={<SavedContent />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AppInitializer>
    </ErrorBoundary>
  );
};

export default App;