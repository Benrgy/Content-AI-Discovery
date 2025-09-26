"use client";

import { useSavedContent } from "@/hooks/use-saved-content";
import ContentCard from "@/components/ContentCard";
import EmptyState from "@/components/EmptyState";
import { Info } from "lucide-react";
import PageLayout from "@/components/PageLayout"; // Import PageLayout

const SavedContent = () => {
  const { savedItems } = useSavedContent();

  return (
    <PageLayout
      title="Your Saved Content"
      description="Revisit the content you've bookmarked for later inspiration."
    >
      {savedItems.length === 0 ? (
        <EmptyState
          title="No Saved Content"
          description="You haven't saved any content yet. Discover content and click the save icon to add items here!"
          icon={Info}
          actionButton={{
            text: "Discover Content",
            to: "/discover",
            tooltip: "Explore new content to save",
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
          {savedItems.map((content) => (
            <ContentCard key={content.id} {...content} />
          ))}
        </div>
      )}
    </PageLayout>
  );
};

export default SavedContent;