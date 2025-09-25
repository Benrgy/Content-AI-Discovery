"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { appRoutes } from "@/routes"; // Import appRoutes

const MobileNav = () => {
  const [isOpen, setIsOpen] = React.useState(false);

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