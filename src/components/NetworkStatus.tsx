"use client";

import { useState, useEffect } from "react";
import { Wifi, WifiOff } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { showWarning, showSuccess } from "@/utils/toast";

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showSuccess("Connection restored");
    };

    const handleOffline = () => {
      setIsOnline(false);
      showWarning("You're offline. Some features may not work.");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="fixed top-4 right-4 z-50 bg-destructive text-destructive-foreground px-3 py-2 rounded-md shadow-lg flex items-center gap-2">
          <WifiOff className="h-4 w-4" />
          <span className="text-sm font-medium">Offline</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>You're currently offline. Some features may not work properly.</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default NetworkStatus;