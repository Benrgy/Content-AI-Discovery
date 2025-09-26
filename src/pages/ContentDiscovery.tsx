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

  // Debug: Log when data changes
  useEffect(() => {
    console.log("Content data loaded:", contentData?.length, "items");
    if (contentData) {
      console.log("Sample content:", contentData[0]);
    }
  }, [contentData]);

  // Debug: Log when search changes
  useEffect(() => {
    console.log("Search query updated:", searchQuery);
  }, [searchQuery]);

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
    console.log("Clearing search");
    setSearchQuery("");
  };

  // Handle search change
  const handleSearchChange = (query: string) => {
    console.log("Search query changed to:", query);
    setSearchQuery(query);
  };

  // Calculate total applied filters
  const totalAppliedFilters = 
    appliedPlatforms.length + 
    appliedCategories.length + 
    (appliedPerformanceRange[0] > 0 || appliedPerformanceRange[1] < 100 ? 1 : 0);

  // Filter and sort content using useMemo for performance
  const filteredAndSortedContent = useMemo(() => {
    console.log("=== FILTERING CONTENT ===");
    console.log("Search query:", `"${searchQuery}"`);
    console.log("Content data available:", !!contentData);
    console.log("Total content items:", contentData?.length || 0);
    
    if (!contentData || contentData.length === 0) {
      console.log("No content data available");
      return [];
    }

    // Filter content based on all criteria
    const filtered = contentData.filter((content, index) => {
      console.log(`\n--- Checking item ${index + 1}: "${content.title}" ---`);
      
      // Search query filter - make it more comprehensive
      const searchLower = searchQuery.toLowerCase().trim();
      console.log("Search term:", `"${searchLower}"`);
      
      let matchesSearch = true;
      if (searchQuery !== "") {
        const titleMatch = content.title.toLowerCase().includes(searchLower);
        const descMatch = content.description.toLowerCase().includes(searchLower);
        const tagsMatch = content.tags && content.tags.some(tag => tag.toLowerCase().includes(searchLower));
        const platformMatch = content.platform.toLowerCase().includes(searchLower);
        const categoryMatch = content.category && content.category.toLowerCase().includes(searchLower);
        const authorMatch = content.author && content.author.name.toLowerCase().includes(searchLower);
        
        matchesSearch = titleMatch || descMatch || tagsMatch || platformMatch || categoryMatch || authorMatch;
        
        console.log("Title match:", titleMatch, `"${content.title.toLowerCase()}" includes "${searchLower}"`);
        console.log("Description match:", descMatch);
        console.log("Tags match:", tagsMatch, content.tags);
        console.log("Platform match:", platformMatch, content.platform);
        console.log("Category match:", categoryMatch, content.category);
        console.log("Author match:", authorMatch, content.author?.name);
        console.log("Overall search match:", matchesSearch);
      }
      
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
      
      const finalResult = matchesSearch && matchesPlatform && matchesCategory && matchesPerformance;
      console.log("Final result for this item:", finalResult);
      
      return finalResult;
    });

    console.log("=== FILTERING COMPLETE ===");
    console.log("Filtered results:", filtered.length, "items");
    console.log("Filtered items:", filtered.map(item => item.title));

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

      {/* Debug info - always show in development */}
      <div className="max-w-5xl mx-auto mb-4 p-2 bg-muted rounded text-xs">
        <p>Debug: Search="{searchQuery}", Total={contentData?.length}, Filtered={filteredAndSortedContent.length}</p>
        <p>Loading: {isLoading.toString()}, Error: {isError.toString()}</p>
      </div>

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