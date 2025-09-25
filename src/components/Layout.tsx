"use client";

import React from "react";
import Header from "./Header"; // Import the Header component
import { MadeWithDyad } from "./made-with-dyad"; // Import MadeWithDyad

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* Include the Header here */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="py-4">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Layout;