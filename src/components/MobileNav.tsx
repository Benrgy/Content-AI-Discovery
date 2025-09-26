"use client";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const navigationRoutes = [
  { path: "/discover", name: "Discover" },
  { path: "/generate", name: "Generate" },
  { path: "/analytics", name: "Analytics" },
  { path: "/saved", name: "Saved" },
];

const MobileNav = () => {
  console.log("MobileNav: Component rendering");
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
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
        <nav className="flex flex-col gap-4 py-4">
          {navigationRoutes.map((route) => (
            <Button
              key={route.path}
              variant="ghost"
              className="justify-start text-lg"
              asChild
              onClick={() => setIsOpen(false)}
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