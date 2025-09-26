"use client";

import { type ReactNode } from "react"; // Import ReactNode type directly
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";

const queryClient = new QueryClient();

interface ProvidersProps {
  children: ReactNode; // Use ReactNode directly
}

const Providers = ({ children }: ProvidersProps) => { // Remove React.FC
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