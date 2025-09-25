"use client";

import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { MadeWithDyad } from "./made-with-dyad";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col container mx-auto py-8 px-4"> {/* Added consistent padding and max-width */}
        <Outlet />
      </main>
      <footer className="py-4">
        <MadeWithDyad />
      </footer>
    </div>
  );
};

export default Layout;