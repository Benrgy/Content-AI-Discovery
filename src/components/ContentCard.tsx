"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Heart, Share2, Eye, Bookmark, BookmarkCheck, Link2, ExternalLink } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSavedContent } from "@/hooks/use-saved-content";
import { ContentItem } from "@/types/content";
import { showInfo } from "@/utils/toast";
import PlatformIcon from "./PlatformIcon";
import { Badge } from "@/components/ui/badge";
import { formatNumber, getPerformanceColor } from "@/constants/content-constants";
import { Link } from "react-router-dom";

interface ContentCardProps extends ContentItem {
  onViewDetails?: (content: ContentItem) => void;
}

const ContentCard = (props: ContentCardProps) => {
  const { id, title, description, platform, category, engagement, imageUrl, link, performanceScore, onViewDetails } = props;
  const { isSaved, toggleSaved } = useSavedContent();
  const saved = isSaved(id);

  const handleToggleSave = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    toggleSaved(props);
  };

  const handleCopyLink = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    // Copy the internal app link instead of external link
    const appLink = `${window.location.origin}/content/${id}`;
    navigator.clipboard.writeText(appLink);
    showInfo("Content link copied to clipboard!");
  };
  
  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(props);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  };

  return (
    <Card 
      className={`flex flex-col h-full overflow-hidden transition-all duration-200 hover:shadow-md ${onViewDetails ? 'cursor-pointer' : ''}`}
      onClick={onViewDetails ? handleCardClick : undefined}
    >
      {imageUrl && (
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={handleImageError}
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <PlatformIcon platform={platform} className="bg-background/80 text-foreground" />
            {performanceScore && (
              <Badge variant="outline" className={`bg-background/80 ${getPerformanceColor(performanceScore)}`}>
                {performanceScore}
              </Badge>
            )}
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-background/80 hover:bg-background/90"
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
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
        </div>
        {category && (
          <Badge variant="secondary" className="mt-1 mb-2 capitalize">
            {category}
          </Badge>
        )}
        <CardDescription className="text-sm line-clamp-3">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <div className="flex items-center justify-around text-muted-foreground text-sm mt-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" /> {formatNumber(engagement.likes)}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Likes</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" /> {formatNumber(engagement.comments)}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Comments</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-1">
                <Share2 className="h-4 w-4" /> {formatNumber(engagement.shares)}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Shares</p>
            </TooltipContent>
          </Tooltip>
          {engagement.views && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" /> {formatNumber(engagement.views)}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Views</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        {engagement.engagementRate && (
          <div className="mt-3 text-center">
            <Badge variant="outline" className="text-xs">
              Engagement Rate: {engagement.engagementRate.toFixed(1)}%
            </Badge>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild variant="default" className="flex-grow gap-1">
              <Link to={`/content/${id}`}>
                Read More
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Read full article</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild variant="outline" className="flex-grow gap-1">
              <Link to={`/generate?contentId=${id}`}>
                Generate
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create content based on this</p>
          </TooltipContent>
        </Tooltip>
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