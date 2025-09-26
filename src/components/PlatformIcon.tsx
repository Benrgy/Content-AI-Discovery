"use client";

import React from "react";
import {
  Linkedin,
  TikTok,
  Twitter,
  Instagram,
  Youtube,
  Rss, // Using Rss for blog posts
  LucideIcon,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface PlatformIconProps {
  platform: string;
  className?: string;
  iconClassName?: string;
}

const platformIconMap: { [key: string]: LucideIcon } = {
  linkedin: Linkedin,
  tiktok: TikTok,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  blog: Rss,
};

const PlatformIcon: React.FC<PlatformIconProps> = ({ platform, className, iconClassName }) => {
  const IconComponent = platformIconMap[platform.toLowerCase()];

  if (!IconComponent) {
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