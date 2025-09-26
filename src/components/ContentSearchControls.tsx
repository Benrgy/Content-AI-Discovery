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
  return (
    <div className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row gap-4 w-full">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for trending content by topic or keyword..."
          className="w-full pl-10 pr-10 py-2 rounded-md border border-input focus:ring-2 focus:ring-primary focus:border-transparent"
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
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={onClearSearch}
                aria-label="Clear search query"
              >
                <XCircle className="h-5 w-5" />
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
              aria-label="Open filters"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
              {totalAppliedFilters > 0 && (
                <Badge className="ml-1 bg-primary text-primary-foreground">
                  {totalAppliedFilters}
                </Badge>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Filter content by platform, category, and performance</p>
          </TooltipContent>
        </Tooltip>
        
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2" aria-label="Sort content">
                  <ArrowUpDown className="h-4 w-4" />
                  <span className="hidden sm:inline">Sort</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sort content by different metrics</p>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={`${option.value}-${option.direction}`}
                className={currentSort.label === option.label ? "bg-accent text-accent-foreground" : ""}
                onClick={() => onSortChange(option)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              asChild
              aria-label="View analytics dashboard"
            >
              <Link to="/analytics">
                <BarChart className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View performance analytics dashboard</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default ContentSearchControls;