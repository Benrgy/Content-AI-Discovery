import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ContentDiscovery from "./pages/ContentDiscovery";
import ContentGeneration from "./pages/ContentGeneration";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Layout from "./components/Layout"; // Import the Layout component

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen"> {/* Added flex container for overall layout */}
          <Header />
          <Routes>
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/discover" element={<Layout><ContentDiscovery /></Layout>} />
            <Route path="/generate" element={<Layout><ContentGeneration /></Layout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;