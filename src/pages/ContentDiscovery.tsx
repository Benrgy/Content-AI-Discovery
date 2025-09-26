"use client";

import { useState, useEffect } from "react";
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

  // Simple search function
  const searchContent = (content: any, query: string) => {
    if (!query || query.trim() === "") return true;
    
    const searchTerm = query.toLowerCase().trim();
    console.log(`Searching for "${searchTerm}" in:`, content.title);
    
    // Check title
    if (content.title && content.title.toLowerCase().includes(searchTerm)) {
      console.log("✅ Found in title");
      return true;
    }
    
    // Check description
    if (content.description && content.description.toLowerCase().includes(searchTerm)) {
      console.log("✅ Found in description");
      return true;
    }
    
    // Check tags
    if (content.tags && Array.isArray(content.tags)) {
      for (const tag of content.tags) {
        if (tag.toLowerCase().includes(searchTerm)) {
          console.log("✅ Found in tag:", tag);
          return true;
        }
      }
    }
    
    // Check platform
    if (content.platform && content.platform.toLowerCase().includes(searchTerm)) {
      console.log("✅ Found in platform");
      return true;
    }
    
    // Check category
    if (content.category && content.category.toLowerCase().includes(searchTerm)) {
      console.log("✅ Found in category");
      return true;
    }
    
    // Check author
    if (content.author && content.author.name && content.author.name.toLowerCase().includes(searchTerm)) {
      console.log("✅ Found in author");
      return true;
    }
    
    console.log("❌ Not found");
    return false;
  };

  // Filter content
  const getFilteredContent = () => {
    console.log("=== FILTERING CONTENT ===");
    console.log("Raw content data:", contentData);
    console.log("Search query:", searchQuery);
    
    if (!contentData) {
      console.log("No content data available");
      return [];
    }

    let filtered = contentData;

    // Apply search filter
    if (searchQuery && searchQuery.trim() !== "") {
      console.log("Applying search filter...");
      filtered = filtered.filter(content => searchContent(content, searchQuery));
      console.log("After search filter:", filtered.length, "items");
    }

    // Apply platform filter
    if (appliedPlatforms.length > 0) {
      filtered = filtered.filter(content => appliedPlatforms.includes(content.platform));
      console.log("After platform filter:", filtered.length, "items");
    }

    // Apply category filter
    if (appliedCategories.length > 0) {
      filtered = filtered.filter(content => content.category && appliedCategories.includes(content.category));
      console.log("After category filter:", filtered.length, "items");
    }

    // Apply performance score filter
    if (appliedPerformanceRange[0] > 0 || appliedPerformanceRange[1] < 100) {
      filtered = filtered.filter(content => {
        if (!content.performanceScore) return true;
        return content.performanceScore >= appliedPerformanceRange[0] && 
               content.performanceScore <= appliedPerformanceRange[1];
      });
      console.log("After performance filter:", filtered.length, "items");
    }

    console.log("Final filtered results:", filtered.map(item => item.title));
    return filtered;
  };

  // Sort content
  const getSortedContent = (content: any[]) => {
    const sorted = [...content].sort((a, b) => {
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
  };

  const filteredContent = getFilteredContent();
  const sortedContent = getSortedContent(filteredContent);

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
            Showing {sortedContent.length} {sortedContent.length === 1 ? 'result' : 'results'}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
          <p className="text-sm text-muted-foreground">
            Sorted by: {currentSort.label}
          </p>
        </div>
      )}

      {/* Debug info */}
      <div className="max-w-5xl mx-auto mb-4 p-2 bg-muted rounded text-xs">
        <p>Debug: Search="{searchQuery}", Total={contentData?.length}, Filtered={sortedContent.length}</p>
        <p>Loading: {isLoading.toString()}, Error: {isError.toString()}</p>
        <p>Content loaded: {contentData ? "✅" : "❌"}</p>
      </div>

      {/* Content Grid */}
      <ContentGrid
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        content={sortedContent}
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