"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { appRoutes } from "@/routes"; // Import appRoutes
import { ThemeToggle } from "./ThemeToggle"; // Import ThemeToggle

const Header = () => {
  // Filter routes for public navigation based on the new 'inNav' property
  const publicRoutes = appRoutes.filter(route => route.inNav);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold text-primary">
            ContentAI
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            {publicRoutes.map((route) => (
              <Button key={route.path} variant="ghost" asChild>
                <Link to={route.path}>{route.name}</Link>
              </Button>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle /> {/* Add the ThemeToggle here */}
          {/* Future user authentication/profile buttons can go here */}
        </div>
      </div>
    </header>
  );
};

export default Header;