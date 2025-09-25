"use client";

import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="flex-grow container mx-auto px-4 py-8 min-h-[calc(100vh-4rem)]">
      {children}
    </main>
  );
};

export default Layout;