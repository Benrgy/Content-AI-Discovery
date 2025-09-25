"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { appRoutes } from "@/routes";
import { ThemeToggle } from "./ThemeToggle";
import MobileNav from "./MobileNav";

const Header = () => {
  const location = useLocation();
  const publicRoutes = appRoutes.filter(route => route.inNav);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <MobileNav />
          <Link to="/" className="text-2xl font-bold text-primary" aria-label="ContentAI Home">
            ContentAI
            <span className="sr-only">Home</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4" aria-label="Main navigation"> {/* Added aria-label */}
            {publicRoutes.map((route) => (
              <Button
                key={route.path}
                variant="ghost"
                asChild
                aria-current={location.pathname === route.path ? "page" : undefined}
              >
                <Link to={route.path}>{route.name}</Link>
              </Button>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;