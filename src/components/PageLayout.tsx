"use client";

import { cn } from "@/lib/utils"; // Import cn for conditional class merging

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string; // New prop for page title
  description?: string; // New prop for page description
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, className, title, description }) => {
  return (
    <div className={cn("container mx-auto py-8 px-4 flex flex-col flex-grow", className)}>
      {title && (
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {title}
        </h1>
      )}
      {description && (
        <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
          {description}
        </p>
      )}
      {children}
    </div>
  );
};

export default PageLayout;