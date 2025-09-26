"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import MobileNav from "./MobileNav";
import NotificationCenter from "./NotificationCenter";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Settings } from "lucide-react";

const navigationRoutes = [
  { path: "/discover", name: "Discover", inNav: true },
  { path: "/generate", name: "Generate", inNav: true },
  { path: "/analytics", name: "Analytics", inNav: true },
  { path: "/saved", name: "Saved", inNav: true },
];

const Header = () => {
  console.log("Header component rendering");
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    console.log("Header: Setting up scroll listener");
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      console.log("Header: Cleaning up scroll listener");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm transition-shadow duration-300",
        scrolled && "shadow-sm"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <MobileNav />
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/" className="text-2xl font-bold text-primary">
                ContentAI
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Go to homepage</p>
            </TooltipContent>
          </Tooltip>
          <nav className="hidden md:flex items-center space-x-4">
            {navigationRoutes.map((route) => (
              <Tooltip key={route.path}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    asChild
                    className={cn(
                      "text-base",
                      location.pathname === route.path && "border-b-2 border-primary text-primary"
                    )}
                  >
                    <Link to={route.path}>{route.name}</Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Go to {route.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
            {/* Diagnostics link for development */}
            {process.env.NODE_ENV === 'development' && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    asChild
                    className={cn(
                      "text-base",
                      location.pathname === '/diagnostics' && "border-b-2 border-primary text-primary"
                    )}
                  >
                    <Link to="/diagnostics">Diagnostics</Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Application diagnostics</p>
                </TooltipContent>
              </Tooltip>
            )}
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/settings">
                  <Settings className="h-5 w-5" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
          <NotificationCenter />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;