"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import ContentCard from "@/components/ContentCard";
import FilterSidebar from "@/components/FilterSidebar"; // Import FilterSidebar

const mockContent = [
  {
    id: "1",
    title: "10 Productivity Hacks for Remote Workers in 2024",
    description: "Discover the top strategies to boost your efficiency and maintain work-life balance while working from home. Essential tips for every remote professional.",
    platform: "linkedin",
    engagement: { likes: 1200, comments: 85, shares: 210 },
    imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://example.com/content/1",
  },
  {
    id: "2",
    title: "The Ultimate Guide to Mastering TikTok Algorithms",
    description: "Unlock the secrets to going viral on TikTok! This guide breaks down how the algorithm works and provides actionable steps to increase your reach.",
    platform: "tiktok",
    engagement: { likes: 54000, comments: 1200, shares: 8900, views: 1200000 },
    imageUrl: "https://images.unsplash.com/photo-1611605698335-8b156eddfcd7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://example.com/content/2",
  },
  {
    id: "3",
    title: "5 AI Tools Revolutionizing Digital Marketing",
    description: "Stay ahead of the curve with these powerful AI tools that are transforming how marketers create, analyze, and optimize campaigns.",
    platform: "twitter",
    engagement: { likes: 890, comments: 45, shares: 180 },
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dce98d07?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://example.com/content/3",
  },
  {
    id: "4",
    title: "Healthy Meal Prep Ideas for Busy Professionals",
    description: "Quick and easy meal prep recipes that will save you time and keep you energized throughout your busy week. Perfect for health-conscious individuals.",
    platform: "instagram",
    engagement: { likes: 2300, comments: 150, shares: 300 },
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://example.com/content/4",
  },
  {
    id: "5",
    title: "Understanding Web3: The Future of the Internet",
    description: "A beginner-friendly explanation of Web3, blockchain, NFTs, and decentralized applications. Dive into the next generation of the internet.",
    platform: "youtube",
    engagement: { likes: 7500, comments: 500, shares: 1200, views: 350000 },
    imageUrl: "https://images.unsplash.com/photo-1639322537228-fefc227777c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://example.com/content/5",
  },
  {
    id: "6",
    title: "Top 7 SEO Trends You Can't Ignore in 2024",
    description: "Stay competitive in search rankings with these crucial SEO trends. Learn how to adapt your strategy for maximum visibility.",
    platform: "blog",
    engagement: { likes: 600, comments: 30, shares: 100 },
    imageUrl: "https://images.unsplash.com/photo-1557426272-0a6479ab1188?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://example.com/content/6",
  },
];

const ContentDiscovery = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = React.useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = React.useState<string[]>([]);
  const [appliedPlatforms, setAppliedPlatforms] = React.useState<string[]>([]);

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

  const filteredContent = mockContent.filter((content) => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          content.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = appliedPlatforms.length === 0 || appliedPlatforms.includes(content.platform);
    return matchesSearch && matchesPlatform;
  });

  return (
    <div className="bg-background text-foreground">
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
        {filteredContent.length > 0 ? (
          filteredContent.map((content) => (
            <ContentCard key={content.id} {...content} />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">No content found matching your criteria.</p>
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