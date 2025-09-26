"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import MobileNav from "./MobileNav";
import { usePublicRoutes } from "@/hooks/use-public-routes";
import { cn } from "@/lib/utils"; // Import cn for conditional class merging

const Header = () => {
  const location = useLocation();
  const publicRoutes = usePublicRoutes();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <MobileNav />
          <Link to="/" className="text-2xl font-bold text-primary" aria-label="ContentAI Home">
            ContentAI
            <span className="sr-only">Home</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4" aria-label="Main navigation">
            {publicRoutes.map((route) => (
              <Button
                key={route.path}
                variant="ghost"
                asChild
                className={cn(
                  "text-base", // Ensure consistent text size
                  location.pathname === route.path && "border-b-2 border-primary text-primary" // Active state styling
                )}
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