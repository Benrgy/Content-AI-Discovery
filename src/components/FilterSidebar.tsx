"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { contentPlatforms, contentCategories } from "@/constants/content-constants";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface FilterSidebarProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlatforms: string[];
  selectedCategories: string[];
  performanceScoreRange: [number, number];
  onPlatformChange: (platform: string, checked: boolean) => void;
  onCategoryChange: (category: string, checked: boolean) => void;
  onPerformanceScoreChange: (range: [number, number]) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

const FilterSidebar = ({
  isOpen,
  onOpenChange,
  selectedPlatforms,
  selectedCategories,
  performanceScoreRange,
  onPlatformChange,
  onCategoryChange,
  onPerformanceScoreChange,
  onApplyFilters,
  onClearFilters,
}: FilterSidebarProps) => {
  console.log("FilterSidebar: Rendering with props:", { 
    isOpen, 
    selectedPlatforms, 
    selectedCategories, 
    performanceScoreRange 
  });
  
  const totalFiltersApplied = 
    selectedPlatforms.length + 
    selectedCategories.length + 
    (performanceScoreRange[0] > 0 || performanceScoreRange[1] < 100 ? 1 : 0);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Filter Content</SheetTitle>
          <SheetDescription>
            Refine your content search by selecting platforms, categories, and performance criteria.
          </SheetDescription>
        </SheetHeader>
        
        <div className="grid gap-6 pb-20">
          {/* Platforms Filter */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-semibold">Platforms</h3>
              {selectedPlatforms.length > 0 && (
                <Badge variant="outline" className="ml-2">
                  {selectedPlatforms.length}
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
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
          </div>
          
          <Separator />
          
          {/* Categories Filter */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-semibold">Categories</h3>
              {selectedCategories.length > 0 && (
                <Badge variant="outline" className="ml-2">
                  {selectedCategories.length}
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-1 gap-2">
              {contentCategories.map((category) => (
                <div key={category.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.value}`}
                    checked={selectedCategories.includes(category.value)}
                    onCheckedChange={(checked) => onCategoryChange(category.value, checked as boolean)}
                  />
                  <Label htmlFor={`category-${category.value}`} className="capitalize">
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          {/* Performance Score Filter */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-semibold">Performance Score</h3>
              {(performanceScoreRange[0] > 0 || performanceScoreRange[1] < 100) && (
                <Badge variant="outline" className="ml-2">
                  {performanceScoreRange[0]}-{performanceScoreRange[1]}
                </Badge>
              )}
            </div>
            <div className="px-2">
              <Slider
                defaultValue={[0, 100]}
                value={performanceScoreRange}
                onValueChange={onPerformanceScoreChange as (value: number[]) => void}
                min={0}
                max={100}
                step={1}
                className="my-6"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{performanceScoreRange[0]}</span>
                <span>{performanceScoreRange[1]}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 bg-background pt-2 border-t">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" onClick={onClearFilters} className="flex-grow">
                Clear Filters
                {totalFiltersApplied > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {totalFiltersApplied}
                  </Badge>
                )}
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