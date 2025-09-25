"use client";

import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer"; // Import the new Footer component

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col container mx-auto py-8 px-4">
        <Outlet />
      </main>
      <Footer /> {/* Use the new Footer component */}
    </div>
  );
};

export default Layout;