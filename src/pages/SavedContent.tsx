"use client";

import { useSavedContent } from "@/hooks/use-saved-content";
import ContentCard from "@/components/ContentCard";
import EmptyState from "@/components/EmptyState";
import { Info, Bookmark } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const SavedContent = () => {
  console.log("SavedContent: Component rendering");
  
  const { savedItems } = useSavedContent();
  const [activeTab, setActiveTab] = useState("all");
  
  // Group saved items by platform
  const groupedByPlatform = savedItems.reduce((acc, item) => {
    const platform = item.platform;
    if (!acc[platform]) {
      acc[platform] = [];
    }
    acc[platform].push(item);
    return acc;
  }, {} as Record<string, typeof savedItems>);
  
  // Get unique platforms
  const platforms = Object.keys(groupedByPlatform);
  
  // Filter items based on active tab
  const filteredItems = activeTab === "all" 
    ? savedItems 
    : savedItems.filter(item => item.platform === activeTab);

  return (
    <PageLayout
      title="Your Saved Content"
      description="Revisit the content you've bookmarked for later inspiration."
    >
      {savedItems.length === 0 ? (
        <EmptyState
          title="No Saved Content"
          description="You haven't saved any content yet. Discover content and click the save icon to add items here!"
          icon={Bookmark}
          actionButton={{
            text: "Discover Content",
            to: "/discover",
            tooltip: "Explore new content to save",
          }}
        />
      ) : (
        <>
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="max-w-5xl mx-auto w-full mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">
                {savedItems.length} {savedItems.length === 1 ? 'Item' : 'Items'} Saved
              </h2>
              <TabsList>
                <TabsTrigger value="all" className="flex items-center gap-1">
                  All
                  <Badge variant="secondary" className="ml-1">
                    {savedItems.length}
                  </Badge>
                </TabsTrigger>
                {platforms.map(platform => (
                  <TabsTrigger 
                    key={platform} 
                    value={platform} 
                    className="flex items-center gap-1 capitalize"
                  >
                    {platform}
                    <Badge variant="secondary" className="ml-1">
                      {groupedByPlatform[platform].length}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
                {filteredItems.map((content) => (
                  <ContentCard key={content.id} {...content} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {filteredItems.length === 0 && (
            <EmptyState
              title={`No ${activeTab} Content Saved`}
              description={`You haven't saved any ${activeTab} content yet.`}
              icon={Info}
              actionButton={{
                text: "View All Saved Content",
                onClick: () => setActiveTab("all"),
                tooltip: "Show all saved content",
              }}
            />
          )}
        </>
      )}
    </PageLayout>
  );
};

export default SavedContent;