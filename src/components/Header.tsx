"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-2xl font-bold text-primary">
            ContentAI
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/discover">Discover Content</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/generate">Generate Content</Link>
            </Button>
            {/* Add more navigation links here as needed */}
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          {/* Future user authentication/profile buttons can go here */}
        </div>
      </div>
    </header>
  );
};

export default Header;