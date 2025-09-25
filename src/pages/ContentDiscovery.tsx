"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Info, AlertCircle } from "lucide-react";
import ContentCard from "@/components/ContentCard";
import ContentCardSkeleton from "@/components/ContentCardSkeleton"; // Import the new skeleton component
import FilterSidebar from "@/components/FilterSidebar";
import { mockContent, ContentItem } from "@/data/mockContent";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Import Alert components

const ContentDiscovery = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = React.useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = React.useState<string[]>([]);
  const [appliedPlatforms, setAppliedPlatforms] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [contentData, setContentData] = React.useState<ContentItem[]>([]);

  React.useEffect(() => {
    const fetchContent = () => {
      setIsLoading(true);
      setIsError(false);
      // Simulate API call
      setTimeout(() => {
        try {
          // Simulate a random error for demonstration
          if (Math.random() < 0.1) { // 10% chance of error
            throw new Error("Failed to fetch content.");
          }
          setContentData(mockContent);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching content:", error);
          setIsError(true);
          setIsLoading(false);
        }
      }, 1000); // Simulate 1 second loading time
    };

    fetchContent();
  }, []);

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

  const filteredContent = contentData.filter((content) => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          content.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = appliedPlatforms.length === 0 || appliedPlatforms.includes(content.platform);
    return matchesSearch && matchesPlatform;
  });

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Content Discovery Engine</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center">
        Find high-performing social media content and identify viral patterns.
      </p>

      <div className="max-w-3xl mx-auto mb-8 flex flex-col sm:flex-row gap-4">
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
        </div>
        <Button variant="outline" className="flex items-center gap-2" onClick={() => setIsFilterSidebarOpen(true)}>
          <Filter className="h-4 w-4" />
          Filters
          {appliedPlatforms.length > 0 && (
            <span className="ml-1 px-2 py-0.5 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
              {appliedPlatforms.length}
            </span>
          )}
        </Button>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          // Display multiple skeleton cards during loading
          Array.from({ length: 6 }).map((_, index) => <ContentCardSkeleton key={index} />)
        ) : isError ? (
          <div className="col-span-full">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Failed to load content. Please try refreshing the page.
              </AlertDescription>
            </Alert>
          </div>
        ) : filteredContent.length > 0 ? (
          filteredContent.map((content) => (
            <ContentCard key={content.id} {...content} />
          ))
        ) : (
          <div className="col-span-full">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>No Content Found</AlertTitle>
              <AlertDescription>
                No content matches your current search and filter criteria. Try adjusting them.
              </AlertDescription>
            </Alert>
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
    </div>
  );
};

export default ContentDiscovery;