"use client";

import React from "react";
import { useSavedContent } from "@/hooks/use-saved-content";
import ContentCard from "@/components/ContentCard";
import EmptyState from "@/components/EmptyState"; // Import the new EmptyState component
import { Link } from "react-router-dom"; // Link is still needed for the action button's 'to' prop
import { Info } from "lucide-react"; // Info icon is still needed if passed explicitly

const SavedContent = () => {
  const { savedItems } = useSavedContent();

  return (
    <div className="flex flex-col flex-grow">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Your Saved Content</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
        Revisit the content you've bookmarked for later inspiration.
      </p>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {savedItems.map((content) => (
            <ContentCard key={content.id} {...content} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedContent;