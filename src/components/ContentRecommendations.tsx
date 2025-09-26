"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { ContentItem } from "@/types/content";
import PlatformIcon from "./PlatformIcon";
import { formatNumber } from "@/constants/content-constants";

interface ContentRecommendationsProps {
  title?: string;
  description?: string;
  recommendations: ContentItem[];
  onViewDetails?: (content: ContentItem) => void;
}

const ContentRecommendations = ({
  title = "Recommended Content",
  description = "Content you might be interested in",
  recommendations,
  onViewDetails
}: ContentRecommendationsProps) => {
  if (recommendations.length === 0) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.slice(0, 3).map((item) => (
          <div 
            key={item.id} 
            className="flex items-start gap-3 p-3 rounded-md border hover:bg-muted/50 transition-colors cursor-pointer"
            onClick={() => onViewDetails && onViewDetails(item)}
          >
            {item.imageUrl ? (
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-16 h-16 object-cover rounded-md"
              />
            ) : (
              <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                <PlatformIcon platform={item.platform} />
              </div>
            )}
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2">
                <PlatformIcon platform={item.platform} />
                <Badge variant="outline" className="text-xs">
                  {formatNumber(item.engagement.likes)} likes
                </Badge>
              </div>
              <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
            </div>
          </div>
        ))}
        
        <div className="flex justify-between pt-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" asChild>
                <Link to="/discover" className="flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
                  Discover More
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Find more trending content</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" asChild>
                <Link to="/generate" className="flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 mr-1" />
                  Generate Content
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create AI-powered content</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentRecommendations;