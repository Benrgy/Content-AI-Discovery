"use client";

import React from "react"; // Import React to use React.FC and React.ReactNode
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode; // Use React.ReactNode directly
}

const Providers: React.FC<ProvidersProps> = ({ children }) => { // Use React.FC directly
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <TooltipProvider>
          {children}
          <Sonner />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;