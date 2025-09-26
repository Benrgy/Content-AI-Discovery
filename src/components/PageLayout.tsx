"use client";

import React from "react";
import { cn } from "@/lib/utils"; // Import cn for conditional class merging

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn("container mx-auto py-8 px-4 flex flex-col flex-grow", className)}>
      {children}
    </div>
  );
};

export default PageLayout;