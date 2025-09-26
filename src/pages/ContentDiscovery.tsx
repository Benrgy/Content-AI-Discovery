"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Info, AlertCircle, XCircle, Loader2 } from "lucide-react";
import ContentCard from "@/components/ContentCard";
import ContentCardSkeleton from "@/components/ContentCardSkeleton";
import FilterSidebar from "@/components/FilterSidebar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useContentDiscoveryData } from "@/hooks/use-content-discovery-data";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import EmptyState from "@/components/EmptyState";
import PageLayout from "@/components/PageLayout"; // Import PageLayout

const ContentDiscovery = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = React.useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = React.useState<string[]>([]);
  const [appliedPlatforms, setAppliedPlatforms] = React.useState<string[]>([]);

  const { data: contentData, isLoading, isError, refetch, isFetching } = useContentDiscoveryData();

  const handlePlatformChange = (platform: string, checked: boolean) => {
    setSelectedPlatforms((prev) =>
      checked ? [...prev, platform] : prev.filter((p) => p !== platform)
    );
  };

  const handleApplyFilters = () => {
    setAppliedPlatforms(selectedPlatforms);
    setIsFilterSidebarOpen(false);
  };

  const handleClearFilters = () => {
    setSelectedPlatforms([]);
    setAppliedPlatforms([]);
    setIsFilterSidebarOpen(false);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const filteredContent = (contentData || []).filter((content) => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          content.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = appliedPlatforms.length === 0 || appliedPlatforms.includes(content.platform);
    return matchesSearch && matchesPlatform;
  });

  return (
    <PageLayout
      title="Content Discovery Engine"
      description="Find high-performing social media content and identify viral patterns."
    >
      <div className="max-w-3xl mx-auto mb-8 flex flex-col sm:flex-row gap-4 w-full">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for trending content by topic or keyword..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-input focus:ring-2 focus:ring-primary focus:border-transparent"
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
        <div className="flex gap-4">
          {appliedPlatforms.length > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={handleClearFilters} className="flex items-center gap-2">
                  <XCircle className="h-4 w-4" />
                  Clear Filters
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear all applied filters</p>
              </TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2" onClick={() => setIsFilterSidebarOpen(true)}>
                <Filter className="h-4 w-4" />
                Filters
                {appliedPlatforms.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                    {appliedPlatforms.length}
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open filter sidebar</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

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
        ) : filteredContent.length > 0 ? (
          filteredContent.map((content) => (
            <ContentCard key={content.id} {...content} />
          ))
        ) : (
          <div className="col-span-full">
            <EmptyState
              title="No Content Found"
              description="No content matches your current search and filter criteria. Try adjusting them."
              icon={Info}
            />
          </div>
        )}
      </div>

      <FilterSidebar
        isOpen={isFilterSidebarOpen}
        onOpenChange={setIsFilterSidebarOpen}
        selectedPlatforms={selectedPlatforms}
        onPlatformChange={handlePlatformChange}
        onApplyFilters={handleApplyFilters}
        onClearFilters={handleClearFilters}
      />
    </PageLayout>
  );
};

export default ContentDiscovery;