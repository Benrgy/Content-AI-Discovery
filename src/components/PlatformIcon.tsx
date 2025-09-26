"use client";

import {
  Tooltip, TooltipContent, TooltipTrigger
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { platformIconMap } from "@/constants/content-constants"; // Import from centralized constants

interface PlatformIconProps {
  platform: string;
  className?: string;
  iconClassName?: string;
}

const PlatformIcon = ({ platform, className, iconClassName }: PlatformIconProps) => {
  console.log("PlatformIcon: Rendering for platform:", platform);
  
  const IconComponent = platformIconMap[platform.toLowerCase()];

  if (!IconComponent) {
    console.warn("PlatformIcon: No icon found for platform:", platform);
    return null; // Or a default icon if preferred
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={cn("flex items-center justify-center rounded-full p-1", className)}>
          <IconComponent className={cn("h-4 w-4", iconClassName)} />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="capitalize">{platform}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default PlatformIcon;