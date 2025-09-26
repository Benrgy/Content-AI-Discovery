"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  message?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const LoadingScreen = ({ message = "Loading...", className, size = "md" }: LoadingScreenProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16"
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center min-h-[400px] w-full",
      className
    )}>
      <Loader2 className={cn("animate-spin text-primary mb-4", sizeClasses[size])} />
      <p className="text-lg text-muted-foreground">{message}</p>
    </div>
  );
};

export default LoadingScreen;