"use client";

import React, { StrictMode } from "react"; // Import StrictMode here
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <StrictMode> {/* Wrap children with StrictMode */}
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <TooltipProvider>
            {children}
            <Sonner />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default Providers;