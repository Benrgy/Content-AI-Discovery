"use client";

import ContentCard from "@/components/ContentCard";
import ContentCardSkeleton from "@/components/ContentCardSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import EmptyState from "@/components/EmptyState";
import { ContentItem } from "@/types/content";
import { AlertCircle, Info, Loader2 } from "lucide-react";

interface ContentGridProps {
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  content: ContentItem[];
  onRetry: () => void;
  onClearFilters: () => void;
}

const ContentGrid = ({
  isLoading,
  isError,
  isFetching,
  content,
  onRetry,
  onClearFilters
}: ContentGridProps) => {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {isLoading ? (
        Array.from({ length: 6 }).map((_, index) => <ContentCardSkeleton key={index} />)
      ) : isError ? (
        <div className="col-span-full">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="flex items-center gap-4">
              Failed to load content. Please try refreshing the page.
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={onRetry} disabled={isFetching}>
                    {isFetching ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Retrying...
                      </>
                    ) : (
                      "Retry"
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Attempt to refetch content</p>
                </TooltipContent>
              </Tooltip>
            </AlertDescription>
          </Alert>
        </div>
      ) : content.length > 0 ? (
        content.map((item) => (
          <ContentCard 
            key={item.id} 
            {...item}
          />
        ))
      ) : (
        <div className="col-span-full">
          <EmptyState
            title="No Content Found"
            description="No content matches your current search and filter criteria. Try adjusting them."
            icon={Info}
            actionButton={{
              text: "Clear Filters",
              onClick: onClearFilters,
              tooltip: "Reset all filters to see more content"
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ContentGrid;