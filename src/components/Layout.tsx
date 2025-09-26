"use client";

import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton"; // Import the new component

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col">
        <div className="flex-grow flex flex-col"> {/* Removed container mx-auto py-8 px-4 */}
          <Outlet />
        </div>
      </main>
      <Footer />
      <ScrollToTopButton /> {/* Add the scroll to top button */}
    </div>
  );
};

export default Layout;