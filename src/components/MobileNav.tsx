"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { usePublicRoutes } from "@/hooks/use-public-routes"; // Import the new hook

const MobileNav = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const publicRoutes = usePublicRoutes(); // Use the new hook

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
        <nav className="flex flex-col gap-4 py-4" aria-label="Mobile navigation">
          {publicRoutes.map((route) => (
            <Button
              key={route.path}
              variant="ghost"
              className="justify-start text-lg"
              asChild
              onClick={() => setIsOpen(false)}
              aria-current={location.pathname === route.path ? "page" : undefined}
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