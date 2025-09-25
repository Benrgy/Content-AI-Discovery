"use client";

import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet
import Header from "./Header";
import { MadeWithDyad } from "./made-with-dyad";

const Layout: React.FC = () => { // Removed LayoutProps interface and children prop
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center py-8">
        <Outlet /> {/* Render nested route content here */}
      </main>
      <footer className="py-4">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Layout;