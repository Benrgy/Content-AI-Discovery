"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  ExternalLink, 
  Bookmark, 
  BookmarkCheck, 
  Link2, 
  Sparkles,
  User
} from "lucide-react";
import { ContentItem } from "@/types/content";
import { useSavedContent } from "@/hooks/use-saved-content";
import { showInfo } from "@/utils/toast";
import { Link } from "react-router-dom";
import PlatformIcon from "./PlatformIcon";
import ContentPerformanceMetrics from "./ContentPerformanceMetrics";

interface ContentDetailViewProps {
  content: ContentItem;
  onClose: () => void;
}

const ContentDetailView = ({ content, onClose }: ContentDetailViewProps) => {
  const { isSaved, toggleSaved } = useSavedContent();
  const saved = isSaved(content.id);
  
  const handleToggleSave = () => {
    toggleSaved(content);
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(content.link);
    showInfo("Content link copied to clipboard!");
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 mb-2">
              <PlatformIcon platform={content.platform} />
              {content.category && (
                <Badge variant="outline" className="capitalize">
                  {content.category}
                </Badge>
              )}
              <div className="flex items-center ml-auto">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={handleToggleSave}
                      aria-label={saved ? "Unsave content" : "Save content"}
                    >
                      {saved ? (
                        <BookmarkCheck className="h-5 w-5 text-primary" />
                      ) : (
                        <Bookmark className="h-5 w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{saved ? "Unsave content" : "Save content"}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
            <CardTitle className="text-2xl">{content.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 mt-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(content.publishedAt)}</span>
            </CardDescription>
          </CardHeader>
          
          {content.imageUrl && (
            <div className="px-6">
              <img 
                src={content.imageUrl} 
                alt={content.title} 
                className="w-full h-auto rounded-md object-cover max-h-[400px]"
              />
            </div>
          )}
          
          <CardContent className="pt-4">
            <p className="text-base leading-relaxed">{content.description}</p>
            
            {content.tags && content.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {content.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-wrap gap-3 pt-2">
            <Button asChild variant="default" className="gap-1">
              <a href={content.link} target="_blank" rel="noopener noreferrer">
                View Original <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
            <Button asChild variant="outline" className="gap-1">
              <Link to={`/generate?contentId=${content.id}`}>
                <Sparkles className="h-4 w-4 mr-1" />
                Generate Similar
              </Link>
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
        
        <ContentPerformanceMetrics content={content} />
      </div>
      
      <div className="lg:col-span-1">
        {content.author && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Content Creator</CardTitle>
              <CardDescription>
                Author information and stats
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 mb-4">
                {content.author.avatar ? (
                  <AvatarImage src={content.author.avatar} alt={content.author.name} />
                ) : (
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                )}
              </Avatar>
              <h3 className="text-xl font-medium">{content.author.name}</h3>
              {content.author.followers && (
                <p className="text-sm text-muted-foreground mt-1">
                  {formatNumber(content.author.followers)} followers
                </p>
              )}
              <div className="mt-4 w-full">
                <Button variant="outline" className="w-full" asChild>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    View Profile
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Related Content</CardTitle>
            <CardDescription>
              Similar high-performing content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground text-center py-4">
              Related content recommendations would appear here in a real application.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/discover">
                Discover More Content
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <div className="mt-6">
          <Button variant="outline" className="w-full" onClick={onClose}>
            Back to Discovery
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentDetailView;