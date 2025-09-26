"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import MobileNav from "./MobileNav";
import NotificationCenter from "./NotificationCenter";
import { usePublicRoutes } from "@/hooks/use-public-routes";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Header = () => {
  const location = useLocation();
  const publicRoutes = usePublicRoutes();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
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
              <Link to="/" className="text-2xl font-bold text-primary" aria-label="ContentAI Home">
                ContentAI
                <span className="sr-only">Home</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Go to homepage</p>
            </TooltipContent>
          </Tooltip>
          <nav className="hidden md:flex items-center space-x-4" aria-label="Main navigation">
            {publicRoutes.map((route) => (
              <Tooltip key={route.path}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    asChild
                    className={cn(
                      "text-base",
                      location.pathname === route.path && "border-b-2 border-primary text-primary"
                    )}
                    aria-current={location.pathname === route.path ? "page" : undefined}
                  >
                    <Link to={route.path}>{route.name}</Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Go to {route.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <NotificationCenter />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;