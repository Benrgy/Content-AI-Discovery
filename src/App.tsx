"use client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";
import AppInitializer from "./components/AppInitializer";

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
      <BrowserRouter>
        <AppInitializer>
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
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;