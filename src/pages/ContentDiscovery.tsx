"use client";

import { useState, useEffect, useMemo } from "react";
import { useContentDiscoveryData } from "@/hooks/use-content-discovery-data";
import PageLayout from "@/components/PageLayout";
import ContentSearchControls from "@/components/ContentSearchControls";
import AppliedFilters from "@/components/AppliedFilters";
import FilterSidebar from "@/components/FilterSidebar";
import ContentGrid from "@/components/ContentGrid";

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
    setSearchQuery(""); // Also clear search
    setIsFilterSidebarOpen(false);
  };

  // Remove a single platform filter
  const handleRemovePlatform = (platform: string) => {
    setAppliedPlatforms(prev => prev.filter(p => p !== platform));
    setSelectedPlatforms(prev => prev.filter(p => p !== platform));
  };

  // Remove a single category filter
  const handleRemoveCategory = (category: string) => {
    setAppliedCategories(prev => prev.filter(c => c !== category));
    setSelectedCategories(prev => prev.filter(c => c !== category));
  };

  // Reset performance range filter
  const handleResetPerformanceRange = () => {
    setAppliedPerformanceRange([0, 100]);
    setPerformanceScoreRange([0, 100]);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Handle search change
  const handleSearchChange = (query: string) => {
    console.log("Search query changed:", query); // Debug log
    setSearchQuery(query);
  };

  // Calculate total applied filters
  const totalAppliedFilters = 
    appliedPlatforms.length + 
    appliedCategories.length + 
    (appliedPerformanceRange[0] > 0 || appliedPerformanceRange[1] < 100 ? 1 : 0);

  // Filter and sort content using useMemo for performance
  const filteredAndSortedContent = useMemo(() => {
    console.log("Filtering content with query:", searchQuery); // Debug log
    console.log("Content data:", contentData?.length, "items"); // Debug log
    
    if (!contentData) return [];

    // Filter content based on all criteria
    const filtered = contentData.filter((content) => {
      // Search query filter - make it more comprehensive
      const searchLower = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        searchQuery === "" ||
        content.title.toLowerCase().includes(searchLower) ||
        content.description.toLowerCase().includes(searchLower) ||
        (content.tags && content.tags.some(tag => tag.toLowerCase().includes(searchLower))) ||
        content.platform.toLowerCase().includes(searchLower) ||
        (content.category && content.category.toLowerCase().includes(searchLower)) ||
        (content.author && content.author.name.toLowerCase().includes(searchLower));
      
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
      
      const result = matchesSearch && matchesPlatform && matchesCategory && matchesPerformance;
      
      // Debug log for search
      if (searchQuery && !matchesSearch) {
        console.log("Content filtered out by search:", content.title, "Query:", searchQuery);
      }
      
      return result;
    });

    console.log("Filtered results:", filtered.length, "items"); // Debug log

    // Sort the filtered content
    const sorted = [...filtered].sort((a, b) => {
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

    return sorted;
  }, [contentData, searchQuery, appliedPlatforms, appliedCategories, appliedPerformanceRange, currentSort]);

  // Reset filter selections when sidebar is opened
  useEffect(() => {
    if (isFilterSidebarOpen) {
      setSelectedPlatforms(appliedPlatforms);
      setSelectedCategories(appliedCategories);
      setPerformanceScoreRange(appliedPerformanceRange);
    }
  }, [isFilterSidebarOpen, appliedPlatforms, appliedCategories, appliedPerformanceRange]);

  return (
    <PageLayout
      title="Content Discovery Engine"
      description="Find high-performing social media content and identify viral patterns."
    >
      {/* Search and Filter Controls */}
      <ContentSearchControls
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
        onOpenFilters={() => setIsFilterSidebarOpen(true)}
        totalAppliedFilters={totalAppliedFilters}
        sortOptions={sortOptions}
        currentSort={currentSort}
        onSortChange={setCurrentSort}
      />

      {/* Applied Filters Display */}
      <AppliedFilters
        appliedPlatforms={appliedPlatforms}
        appliedCategories={appliedCategories}
        appliedPerformanceRange={appliedPerformanceRange}
        onRemovePlatform={handleRemovePlatform}
        onRemoveCategory={handleRemoveCategory}
        onResetPerformanceRange={handleResetPerformanceRange}
        onClearAllFilters={handleClearFilters}
        totalAppliedFilters={totalAppliedFilters}
      />

      {/* Results count and sort info */}
      {!isLoading && !isError && (
        <div className="max-w-5xl mx-auto mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAndSortedContent.length} {filteredAndSortedContent.length === 1 ? 'result' : 'results'}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
          <p className="text-sm text-muted-foreground">
            Sorted by: {currentSort.label}
          </p>
        </div>
      )}

      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="max-w-5xl mx-auto mb-4 p-2 bg-muted rounded text-xs">
          <p>Debug: Search="{searchQuery}", Total={contentData?.length}, Filtered={filteredAndSortedContent.length}</p>
        </div>
      )}

      {/* Content Grid */}
      <ContentGrid
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        content={filteredAndSortedContent}
        onRetry={refetch}
        onClearFilters={handleClearFilters}
      />

      {/* Filter Sidebar */}
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