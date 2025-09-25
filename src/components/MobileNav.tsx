"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { appRoutes } from "@/routes"; // Import appRoutes

const MobileNav = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation(); // Get current location

  // Filter routes for public navigation
  const publicRoutes = appRoutes.filter(route => route.inNav);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle>ContentAI</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 py-4">
          {publicRoutes.map((route) => (
            <Button
              key={route.path}
              variant="ghost"
              className="justify-start text-lg"
              asChild
              onClick={() => setIsOpen(false)} // Close sheet on navigation
              aria-current={location.pathname === route.path ? "page" : undefined} // Conditionally apply aria-current
            >
              <Link to={route.path}>{route.name}</Link>
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;