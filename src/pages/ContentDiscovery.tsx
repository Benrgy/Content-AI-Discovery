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
  { label: "Most Recent", value: "publishedAt", direction: "desc" },
  { label: "Most Likes", value: "likes", direction: "desc" },
  { label: "Most Comments", value: "comments", direction: "desc" },
  { label: "Most Shares", value: "shares", direction: "desc" },
];

const ContentDiscovery = () => {
  console.log("ContentDiscovery: Component rendering");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [performanceScoreRange, setPerformanceScoreRange] = useState<[number, number]>([0, 100]);
  const [appliedPlatforms, setAppliedPlatforms] = useState<string[]>([]);
  const [appliedCategories, setAppliedCategories] = useState<string[]>([]);
  const [appliedPerformanceRange, setAppliedPerformanceRange] = useState<[number, number]>([0, 100]);
  const [currentSort, setCurrentSort] = useState<SortOption>(sortOptions[0]);

  const { data: contentData, isLoading, isError, refetch, isFetching } = useContentDiscoveryData();

  const searchInContent = (content: ContentItem, query: string): boolean => {
    if (!query || query.trim() === "") return true;
    
    const searchTerm = query.toLowerCase().trim();
    
    if (content.title.toLowerCase().includes(searchTerm)) return true;
    if (content.description.toLowerCase().includes(searchTerm)) return true;
    if (content.tags && content.tags.some(tag => tag.toLowerCase().includes(searchTerm))) return true;
    if (content.platform.toLowerCase().includes(searchTerm)) return true;
    if (content.category && content.category.toLowerCase().includes(searchTerm)) return true;
    if (content.author && content.author.name.toLowerCase().includes(searchTerm)) return true;
    
    return false;
  };

  const processedContent = useMemo(() => {
    console.log("ContentDiscovery: Processing content with filters");
    
    if (!contentData) return [];

    let filtered = contentData;

    if (searchQuery.trim()) {
      filtered = filtered.filter(content => searchInContent(content, searchQuery));
    }

    if (appliedPlatforms.length > 0) {
      filtered = filtered.filter(content => appliedPlatforms.includes(content.platform));
    }

    if (appliedCategories.length > 0) {
      filtered = filtered.filter(content => content.category && appliedCategories.includes(content.category));
    }

    if (appliedPerformanceRange[0] > 0 || appliedPerformanceRange[1] < 100) {
      filtered = filtered.filter(content => {
        if (!content.performanceScore) return true;
        return content.performanceScore >= appliedPerformanceRange[0] && 
               content.performanceScore <= appliedPerformanceRange[1];
      });
    }

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

  const handleSearchChange = (query: string) => {
    console.log("ContentDiscovery: Search query changed to:", query);
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    console.log("ContentDiscovery: Clearing search");
    setSearchQuery("");
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    console.log("ContentDiscovery: Platform change:", platform, checked);
    setSelectedPlatforms(prev =>
      checked ? [...prev, platform] : prev.filter(p => p !== platform)
    );
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    console.log("ContentDiscovery: Category change:", category, checked);
    setSelectedCategories(prev =>
      checked ? [...prev, category] : prev.filter(c => c !== category)
    );
  };

  const handleApplyFilters = () => {
    console.log("ContentDiscovery: Applying filters");
    setAppliedPlatforms(selectedPlatforms);
    setAppliedCategories(selectedCategories);
    setAppliedPerformanceRange(performanceScoreRange);
    setIsFilterSidebarOpen(false);
  };

  const handleClearFilters = () => {
    console.log("ContentDiscovery: Clearing all filters");
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
    console.log("ContentDiscovery: Removing platform filter:", platform);
    setAppliedPlatforms(prev => prev.filter(p => p !== platform));
    setSelectedPlatforms(prev => prev.filter(p => p !== platform));
  };

  const handleRemoveCategory = (category: string) => {
    console.log("ContentDiscovery: Removing category filter:", category);
    setAppliedCategories(prev => prev.filter(c => c !== category));
    setSelectedCategories(prev => prev.filter(c => c !== category));
  };

  const handleResetPerformanceRange = () => {
    console.log("ContentDiscovery: Resetting performance range filter");
    setAppliedPerformanceRange([0, 100]);
    setPerformanceScoreRange([0, 100]);
  };

  const totalAppliedFilters = 
    appliedPlatforms.length + 
    appliedCategories.length + 
    (appliedPerformanceRange[0] > 0 || appliedPerformanceRange[1] < 100 ? 1 : 0);

  useEffect(() => {
    console.log("ContentDiscovery: Filter sidebar state changed:", isFilterSidebarOpen);
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

      <ContentGrid
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        content={processedContent}
        onRetry={refetch}
        onClearFilters={handleClearFilters}
      />

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