"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  XCircle, 
  ArrowUpDown,
  BarChart
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

type SortOption = {
  label: string;
  value: string;
  direction: "asc" | "desc";
};

interface ContentSearchControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  onOpenFilters: () => void;
  totalAppliedFilters: number;
  sortOptions: SortOption[];
  currentSort: SortOption;
  onSortChange: (option: SortOption) => void;
}

const ContentSearchControls = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
  onOpenFilters,
  totalAppliedFilters,
  sortOptions,
  currentSort,
  onSortChange
}: ContentSearchControlsProps) => {
  console.log("ContentSearchControls: Rendering with props:", { 
    searchQuery, 
    totalAppliedFilters, 
    currentSort 
  });
  
  return (
    <div className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row gap-4 w-full">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="Search content... (try: productivity, AI, TikTok, marketing)"
          className="w-full pl-10 pr-10"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search for content"
        />
        {searchQuery && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={onClearSearch}
                aria-label="Clear search"
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear search</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      
      <div className="flex gap-2 sm:gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center gap-2" 
              onClick={onOpenFilters}
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
              {totalAppliedFilters > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {totalAppliedFilters}
                </Badge>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Filter content</p>
          </TooltipContent>
        </Tooltip>
        
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  <span className="hidden sm:inline">Sort</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sort content</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={`${option.value}-${option.direction}`}
                className={currentSort.label === option.label ? "bg-accent" : ""}
                onClick={() => onSortChange(option)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" asChild>
              <Link to="/analytics" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View analytics</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default ContentSearchControls;