"use client";

import React from "react";
import Header from "./Header"; // Import the Header component
import { MadeWithDyad } from "./made-with-dyad"; // Import MadeWithDyad
import { Toaster as Sonner } from "@/components/ui/sonner"; // Import Toaster

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* Include the Header here */}
      <main className="flex-grow flex flex-col items-center py-8"> {/* Adjusted styling for flexibility */}
        {children}
      </main>
      <footer className="py-4">
        <MadeWithDyad />
      </footer>
      <Sonner /> {/* Include the Toaster here */}
    </div>
  );
};

export default Layout;