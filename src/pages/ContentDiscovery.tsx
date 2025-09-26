"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  Info, 
  AlertCircle, 
  XCircle, 
  Loader2, 
  SlidersHorizontal,
  ArrowUpDown,
  BarChart
} from "lucide-react";
import ContentCard from "@/components/ContentCard";
import ContentCardSkeleton from "@/components/ContentCardSkeleton";
import FilterSidebar from "@/components/FilterSidebar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useContentDiscoveryData } from "@/hooks/use-content-discovery-data";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import EmptyState from "@/components/EmptyState";
import PageLayout from "@/components/PageLayout";
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

const sortOptions: SortOption[] = [
  { label: "Performance Score (High to Low)", value: "performanceScore", direction: "desc" },
  { label: "Performance Score (Low to High)", value: "performanceScore", direction: "asc" },
  { label: "Engagement Rate (High to Low)", value: "engagementRate", direction: "desc" },
  { label: "Engagement Rate (Low to High)", value: "engagementRate", direction: "asc" },
  { label: "Most Recent", value: "publishedAt", direction: "desc" },
  { label: "Oldest First", value: "publishedAt", direction: "asc" },
  { label: "Most Likes", value: "likes", direction: "desc" },
  { label: "Most Comments", value: "comments", direction: "desc" },
  { label: "Most Shares", value: "shares", direction: "desc" },
];

const ContentDiscovery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  
  // Filter states
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [performanceScoreRange, setPerformanceScoreRange] = useState<[number, number]>([0, 100]);
  
  // Applied filter states
  const [appliedPlatforms, setAppliedPlatforms] = useState<string[]>([]);
  const [appliedCategories, setAppliedCategories] = useState<string[]>([]);
  const [appliedPerformanceRange, setAppliedPerformanceRange] = useState<[number, number]>([0, 100]);
  
  // Sorting state
  const [currentSort, setCurrentSort] = useState<SortOption>(sortOptions[0]);

  const { data: contentData, isLoading, isError, refetch, isFetching } = useContentDiscoveryData();

  // Handle platform filter change
  const handlePlatformChange = (platform: string, checked: boolean) => {
    setSelectedPlatforms((prev) =>
      checked ? [...prev, platform] : prev.filter((p) => p !== platform)
    );
  };

  // Handle category filter change
  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category] : prev.filter((c) => c !== category)
    );
  };

  // Apply all filters
  const handleApplyFilters = () => {
    setAppliedPlatforms(selectedPlatforms);
    setAppliedCategories(selectedCategories);
    setAppliedPerformanceRange(performanceScoreRange);
    setIsFilterSidebarOpen(false);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedPlatforms([]);
    setSelectedCategories([]);
    setPerformanceScoreRange([0, 100]);
    setAppliedPlatforms([]);
    setAppliedCategories([]);
    setAppliedPerformanceRange([0, 100]);
    setIsFilterSidebarOpen(false);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Calculate total applied filters
  const totalAppliedFilters = 
    appliedPlatforms.length + 
    appliedCategories.length + 
    (appliedPerformanceRange[0] > 0 || appliedPerformanceRange[1] < 100 ? 1 : 0);

  // Filter content based on all criteria
  const filteredContent = (contentData || []).filter((content) => {
    // Search query filter
    const matchesSearch = 
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Platform filter
    const matchesPlatform = 
      appliedPlatforms.length === 0 || 
      appliedPlatforms.includes(content.platform);
    
    // Category filter
    const matchesCategory = 
      appliedCategories.length === 0 || 
      (content.category && appliedCategories.includes(content.category));
    
    // Performance score filter
    const matchesPerformance = 
      (content.performanceScore === undefined) || 
      (content.performanceScore >= appliedPerformanceRange[0] && 
       content.performanceScore <= appliedPerformanceRange[1]);
    
    return matchesSearch && matchesPlatform && matchesCategory && matchesPerformance;
  });

  // Sort the filtered content
  const sortedContent = [...filteredContent].sort((a, b) => {
    const { value, direction } = currentSort;
    
    if (value === "performanceScore") {
      const scoreA = a.performanceScore || 0;
      const scoreB = b.performanceScore || 0;
      return direction === "asc" ? scoreA - scoreB : scoreB - scoreA;
    }
    
    if (value === "engagementRate") {
      const rateA = a.engagement.engagementRate || 0;
      const rateB = b.engagement.engagementRate || 0;
      return direction === "asc" ? rateA - rateB : rateB - rateA;
    }
    
    if (value === "publishedAt") {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return direction === "asc" ? dateA - dateB : dateB - dateA;
    }
    
    if (value === "likes") {
      return direction === "asc" 
        ? a.engagement.likes - b.engagement.likes 
        : b.engagement.likes - a.engagement.likes;
    }
    
    if (value === "comments") {
      return direction === "asc" 
        ? a.engagement.comments - b.engagement.comments 
        : b.engagement.comments - a.engagement.comments;
    }
    
    if (value === "shares") {
      return direction === "asc" 
        ? a.engagement.shares - b.engagement.shares 
        : b.engagement.shares - a.engagement.shares;
    }
    
    return 0;
  });

  // Reset filter selections when sidebar is opened
  useEffect(() => {
    if (isFilterSidebarOpen) {
      setSelectedPlatforms(appliedPlatforms);
      setSelectedCategories(appliedCategories);
      setPerformanceScoreRange(appliedPerformanceRange);
    }
  }, [isFilterSidebarOpen]);

  return (
    <PageLayout
      title="Content Discovery Engine"
      description="Find high-performing social media content and identify viral patterns."
    >
      <div className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row gap-4 w-full">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for trending content by topic or keyword..."
            className="w-full pl-10 pr-10 py-2 rounded-md border border-input focus:ring-2 focus:ring-primary focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search for content"
          />
          {searchQuery && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={handleClearSearch}
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
                onClick={() => setIsFilterSidebarOpen(true)}
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
                  onClick={() => setCurrentSort(option)}
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

      {/* Applied filters display */}
      {totalAppliedFilters > 0 && (
        <div className="max-w-5xl mx-auto mb-6 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {appliedPlatforms.map(platform => (
            <Badge key={platform} variant="secondary" className="flex items-center gap-1">
              {platform}
              <XCircle 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => {
                  setAppliedPlatforms(prev => prev.filter(p => p !== platform));
                  setSelectedPlatforms(prev => prev.filter(p => p !== platform));
                }}
              />
            </Badge>
          ))}
          
          {appliedCategories.map(category => (
            <Badge key={category} variant="secondary" className="flex items-center gap-1">
              {category}
              <XCircle 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => {
                  setAppliedCategories(prev => prev.filter(c => c !== category));
                  setSelectedCategories(prev => prev.filter(c => c !== category));
                }}
              />
            </Badge>
          ))}
          
          {(appliedPerformanceRange[0] > 0 || appliedPerformanceRange[1] < 100) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Score: {appliedPerformanceRange[0]}-{appliedPerformanceRange[1]}
              <XCircle 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => {
                  setAppliedPerformanceRange([0, 100]);
                  setPerformanceScoreRange([0, 100]);
                }}
              />
            </Badge>
          )}
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs h-7 px-2" 
            onClick={handleClearFilters}
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Results count and sort info */}
      {!isLoading && !isError && (
        <div className="max-w-5xl mx-auto mb-4 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing {sortedContent.length} {sortedContent.length === 1 ? 'result' : 'results'}
          </p>
          <p className="text-sm text-muted-foreground">
            Sorted by: {currentSort.label}
          </p>
        </div>
      )}

      {/* Content grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => <ContentCardSkeleton key={index} />)
        ) : isError ? (
          <div className="col-span-full">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription className="flex items-center gap-4">
                Failed to load content. Please try refreshing the page.
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={() => refetch()} disabled={isFetching}>
                      {isFetching ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Retrying...
                        </>
                      ) : (
                        "Retry"
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Attempt to refetch content</p>
                  </TooltipContent>
                </Tooltip>
              </AlertDescription>
            </Alert>
          </div>
        ) : sortedContent.length > 0 ? (
          sortedContent.map((content) => (
            <ContentCard key={content.id} {...content} />
          ))
        ) : (
          <div className="col-span-full">
            <EmptyState
              title="No Content Found"
              description="No content matches your current search and filter criteria. Try adjusting them."
              icon={Info}
              actionButton={{
                text: "Clear Filters",
                onClick: handleClearFilters,
                tooltip: "Reset all filters to see more content"
              }}
            />
          </div>
        )}
      </div>

      {/* Filter sidebar */}
      <FilterSidebar
        isOpen={isFilterSidebarOpen}
        onOpenChange={setIsFilterSidebarOpen}
        selectedPlatforms={selectedPlatforms}
        selectedCategories={selectedCategories}
        performanceScoreRange={performanceScoreRange}
        onPlatformChange={handlePlatformChange}
        onCategoryChange={handleCategoryChange}
        onPerformanceScoreChange={setPerformanceScoreRange}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />
    </PageLayout>
  );
};

export default ContentDiscovery;