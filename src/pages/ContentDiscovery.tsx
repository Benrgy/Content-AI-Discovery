"use client";

import { useState, useEffect, useMemo } from "react";
import { useContentDiscoveryData } from "@/hooks/use-content-discovery-data";
import PageLayout from "@/components/PageLayout";
import ContentSearchControls from "@/components/ContentSearchControls";
import AppliedFilters from "@/components/AppliedFilters";
import FilterSidebar from "@/components/FilterSidebar";
import ContentGrid from "@/components/ContentGrid";
import { ContentItem } from "@/types/content";

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
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter sidebar state
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  
  // Filter states (for sidebar)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [performanceScoreRange, setPerformanceScoreRange] = useState<[number, number]>([0, 100]);
  
  // Applied filter states (active filters)
  const [appliedPlatforms, setAppliedPlatforms] = useState<string[]>([]);
  const [appliedCategories, setAppliedCategories] = useState<string[]>([]);
  const [appliedPerformanceRange, setAppliedPerformanceRange] = useState<[number, number]>([0, 100]);
  
  // Sorting state
  const [currentSort, setCurrentSort] = useState<SortOption>(sortOptions[0]);

  // Data fetching
  const { data: contentData, isLoading, isError, refetch, isFetching } = useContentDiscoveryData();

  // Search function
  const searchInContent = (content: ContentItem, query: string): boolean => {
    if (!query || query.trim() === "") return true;
    
    const searchTerm = query.toLowerCase().trim();
    
    // Search in title
    if (content.title.toLowerCase().includes(searchTerm)) return true;
    
    // Search in description
    if (content.description.toLowerCase().includes(searchTerm)) return true;
    
    // Search in tags
    if (content.tags && content.tags.some(tag => tag.toLowerCase().includes(searchTerm))) return true;
    
    // Search in platform
    if (content.platform.toLowerCase().includes(searchTerm)) return true;
    
    // Search in category
    if (content.category && content.category.toLowerCase().includes(searchTerm)) return true;
    
    // Search in author name
    if (content.author && content.author.name.toLowerCase().includes(searchTerm)) return true;
    
    return false;
  };

  // Filter and sort content
  const processedContent = useMemo(() => {
    if (!contentData) return [];

    let filtered = contentData;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(content => searchInContent(content, searchQuery));
    }

    // Apply platform filter
    if (appliedPlatforms.length > 0) {
      filtered = filtered.filter(content => appliedPlatforms.includes(content.platform));
    }

    // Apply category filter
    if (appliedCategories.length > 0) {
      filtered = filtered.filter(content => content.category && appliedCategories.includes(content.category));
    }

    // Apply performance score filter
    if (appliedPerformanceRange[0] > 0 || appliedPerformanceRange[1] < 100) {
      filtered = filtered.filter(content => {
        if (!content.performanceScore) return true;
        return content.performanceScore >= appliedPerformanceRange[0] && 
               content.performanceScore <= appliedPerformanceRange[1];
      });
    }

    // Sort the filtered content
    const sorted = [...filtered].sort((a, b) => {
      const { value, direction } = currentSort;
      
      let aValue: number = 0;
      let bValue: number = 0;
      
      switch (value) {
        case "performanceScore":
          aValue = a.performanceScore || 0;
          bValue = b.performanceScore || 0;
          break;
        case "engagementRate":
          aValue = a.engagement.engagementRate || 0;
          bValue = b.engagement.engagementRate || 0;
          break;
        case "publishedAt":
          aValue = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
          bValue = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
          break;
        case "likes":
          aValue = a.engagement.likes;
          bValue = b.engagement.likes;
          break;
        case "comments":
          aValue = a.engagement.comments;
          bValue = b.engagement.comments;
          break;
        case "shares":
          aValue = a.engagement.shares;
          bValue = b.engagement.shares;
          break;
      }
      
      return direction === "asc" ? aValue - bValue : bValue - aValue;
    });

    return sorted;
  }, [contentData, searchQuery, appliedPlatforms, appliedCategories, appliedPerformanceRange, currentSort]);

  // Event handlers
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    setSelectedPlatforms(prev =>
      checked ? [...prev, platform] : prev.filter(p => p !== platform)
    );
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(prev =>
      checked ? [...prev, category] : prev.filter(c => c !== category)
    );
  };

  const handleApplyFilters = () => {
    setAppliedPlatforms(selectedPlatforms);
    setAppliedCategories(selectedCategories);
    setAppliedPerformanceRange(performanceScoreRange);
    setIsFilterSidebarOpen(false);
  };

  const handleClearFilters = () => {
    setSelectedPlatforms([]);
    setSelectedCategories([]);
    setPerformanceScoreRange([0, 100]);
    setAppliedPlatforms([]);
    setAppliedCategories([]);
    setAppliedPerformanceRange([0, 100]);
    setSearchQuery("");
    setIsFilterSidebarOpen(false);
  };

  const handleRemovePlatform = (platform: string) => {
    setAppliedPlatforms(prev => prev.filter(p => p !== platform));
    setSelectedPlatforms(prev => prev.filter(p => p !== platform));
  };

  const handleRemoveCategory = (category: string) => {
    setAppliedCategories(prev => prev.filter(c => c !== category));
    setSelectedCategories(prev => prev.filter(c => c !== category));
  };

  const handleResetPerformanceRange = () => {
    setAppliedPerformanceRange([0, 100]);
    setPerformanceScoreRange([0, 100]);
  };

  // Calculate total applied filters
  const totalAppliedFilters = 
    appliedPlatforms.length + 
    appliedCategories.length + 
    (appliedPerformanceRange[0] > 0 || appliedPerformanceRange[1] < 100 ? 1 : 0);

  // Sync filter selections when sidebar opens
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

      {/* Results count */}
      {!isLoading && !isError && (
        <div className="max-w-5xl mx-auto mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-sm text-muted-foreground">
            Showing {processedContent.length} {processedContent.length === 1 ? 'result' : 'results'}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
          <p className="text-sm text-muted-foreground">
            Sorted by: {currentSort.label}
          </p>
        </div>
      )}

      {/* Content Grid */}
      <ContentGrid
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        content={processedContent}
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