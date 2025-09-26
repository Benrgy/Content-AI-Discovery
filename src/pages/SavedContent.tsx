"use client";

import React from "react";
import { useSavedContent } from "@/hooks/use-saved-content";
import ContentCard from "@/components/ContentCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"; // Import Button
import { Info } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"; // Import Tooltip components

const SavedContent = () => {
  const { savedItems } = useSavedContent();

  return (
    <div className="flex flex-col flex-grow">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Your Saved Content</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
        Revisit the content you've bookmarked for later inspiration.
      </p>

      {savedItems.length === 0 ? (
        <div className="max-w-xl mx-auto flex items-center justify-center flex-grow">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>No Saved Content</AlertTitle>
            <AlertDescription className="flex flex-col items-center gap-4 pt-2"> {/* Added flex-col and gap for button */}
              You haven't saved any content yet. Discover content and click the save icon to add items here!
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild>
                    <Link to="/discover">Discover Content</Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Explore new content to save</p>
                </TooltipContent>
              </Tooltip>
            </AlertDescription>
          </Alert>
        </div>
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