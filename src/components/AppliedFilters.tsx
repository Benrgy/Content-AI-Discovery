"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

interface AppliedFiltersProps {
  appliedPlatforms: string[];
  appliedCategories: string[];
  appliedPerformanceRange: [number, number];
  onRemovePlatform: (platform: string) => void;
  onRemoveCategory: (category: string) => void;
  onResetPerformanceRange: () => void;
  onClearAllFilters: () => void;
  totalAppliedFilters: number;
}

const AppliedFilters = ({
  appliedPlatforms,
  appliedCategories,
  appliedPerformanceRange,
  onRemovePlatform,
  onRemoveCategory,
  onResetPerformanceRange,
  onClearAllFilters,
  totalAppliedFilters
}: AppliedFiltersProps) => {
  console.log("AppliedFilters: Rendering with props:", { 
    appliedPlatforms, 
    appliedCategories, 
    appliedPerformanceRange, 
    totalAppliedFilters 
  });
  
  if (totalAppliedFilters === 0) {
    console.log("AppliedFilters: No filters applied, returning null");
    return null;
  }
  
  return (
    <div className="max-w-5xl mx-auto mb-6 flex flex-wrap gap-2 items-center">
      <span className="text-sm text-muted-foreground">Active filters:</span>
      
      {appliedPlatforms.map(platform => (
        <Badge key={platform} variant="secondary" className="flex items-center gap-1">
          {platform}
          <XCircle 
            className="h-3 w-3 ml-1 cursor-pointer" 
            onClick={() => onRemovePlatform(platform)}
          />
        </Badge>
      ))}
      
      {appliedCategories.map(category => (
        <Badge key={category} variant="secondary" className="flex items-center gap-1">
          {category}
          <XCircle 
            className="h-3 w-3 ml-1 cursor-pointer" 
            onClick={() => onRemoveCategory(category)}
          />
        </Badge>
      ))}
      
      {(appliedPerformanceRange[0] > 0 || appliedPerformanceRange[1] < 100) && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Score: {appliedPerformanceRange[0]}-{appliedPerformanceRange[1]}
          <XCircle 
            className="h-3 w-3 ml-1 cursor-pointer" 
            onClick={onResetPerformanceRange}
          />
        </Badge>
      )}
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-xs h-7 px-2" 
        onClick={onClearAllFilters}
      >
        Clear all
      </Button>
    </div>
  );
};

export default AppliedFilters;