"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Heart, Share2, Eye, Bookmark, BookmarkCheck, Link2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSavedContent } from "@/hooks/use-saved-content";
import { ContentItem } from "@/data/mockContent";
import { showInfo } from "@/utils/toast";
import { Badge } from "@/components/ui/badge"; // Import Badge component

interface ContentCardProps extends ContentItem {}

const ContentCard: React.FC<ContentCardProps> = (props) => {
  const { id, title, description, platform, engagement, imageUrl, link } = props;
  const { isSaved, toggleSaved } = useSavedContent();
  const saved = isSaved(id);

  const handleToggleSave = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleSaved(props);
  };

  const handleCopyLink = (event: React.MouseEvent) => {
    event.preventDefault();
    navigator.clipboard.writeText(link);
    showInfo("Content link copied to clipboard!");
  };

  return (
    <Card className="flex flex-col h-full">
      {imageUrl && (
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-2 left-2 capitalize"> {/* Using Badge here */}
            {platform}
          </Badge>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-background/50 hover:bg-background/70"
                onClick={handleToggleSave}
                aria-label={saved ? "Unsave content" : "Save content"}
              >
                {saved ? (
                  <BookmarkCheck className="h-5 w-5 text-primary" />
                ) : (
                  <Bookmark className="h-5 w-5 text-muted-foreground" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{saved ? "Unsave content" : "Save content"}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
        <CardDescription className="text-sm line-clamp-3">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center justify-around text-muted-foreground text-sm mt-2">
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4" /> {engagement.likes}
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" /> {engagement.comments}
          </div>
          <div className="flex items-center gap-1">
            <Share2 className="h-4 w-4" /> {engagement.shares}
          </div>
          {engagement.views && (
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" /> {engagement.views}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild className="flex-grow">
          <a href={link} target="_blank" rel="noopener noreferrer">
            View Content
          </a>
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={handleCopyLink} aria-label="Copy content link">
              <Link2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy link</p>
          </TooltipContent>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};

export default ContentCard;