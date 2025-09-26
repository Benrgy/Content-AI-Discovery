"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  message?: string;
  className?: string;
}

const LoadingScreen = ({ message = "Loading...", className }: LoadingScreenProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center min-h-[400px] w-full",
      className
    )}>
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-lg text-muted-foreground">{message}</p>
    </div>
  );
};

export default LoadingScreen;