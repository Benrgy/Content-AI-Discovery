"use client";

import { useState } from "react"; // Explicitly import useState
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { usePublicRoutes } from "@/hooks/use-public-routes";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false); // Use useState directly
  const location = useLocation();
  const publicRoutes = usePublicRoutes();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Open navigation menu</p>
        </TooltipContent>
      </Tooltip>
      <SheetContent side="left" className="w-[250px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle>ContentAI</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 py-4" aria-label="Mobile navigation">
          {publicRoutes.map((route) => (
            <Tooltip key={route.path}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="justify-start text-lg"
                  asChild
                  onClick={() => setIsOpen(false)}
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;