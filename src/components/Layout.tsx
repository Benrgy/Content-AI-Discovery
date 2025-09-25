"use client";

import React from "react";
import Header from "./Header";
import { MadeWithDyad } from "./made-with-dyad";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center py-8">
        {children}
      </main>
      <footer className="py-4">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Layout;