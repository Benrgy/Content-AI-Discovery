"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { contentPlatforms } from "@/constants/content-constants"; // Import from the centralized constants
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"; // Import Tooltip components

interface FilterSidebarProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlatforms: string[];
  onPlatformChange: (platform: string, checked: boolean) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onOpenChange,
  selectedPlatforms,
  onPlatformChange,
  onApplyFilters,
  onClearFilters,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Filter Content</SheetTitle>
          <SheetDescription>
            Refine your content search by selecting platforms and other criteria.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <h3 className="text-md font-semibold">Platforms</h3>
            {contentPlatforms.map((platform) => (
              <div key={platform.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`platform-${platform.value}`}
                  checked={selectedPlatforms.includes(platform.value)}
                  onCheckedChange={(checked) => onPlatformChange(platform.value, checked as boolean)}
                />
                <Label htmlFor={`platform-${platform.value}`} className="capitalize">
                  {platform.label}
                </Label>
              </div>
            ))}
          </div>
          <Separator />
          {/* Future filter options can go here */}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={onClearFilters} className="flex-grow">
                Clear Filters
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset all selected filters</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={onApplyFilters} className="flex-grow">
                Apply Filters
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Apply selected filters to content</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSidebar;