"use client";

import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col">
        <div className="container mx-auto py-8 px-4 flex-grow flex flex-col"> {/* Centralized container and flex-grow */}
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;