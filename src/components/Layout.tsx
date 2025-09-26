"use client";

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Layout;