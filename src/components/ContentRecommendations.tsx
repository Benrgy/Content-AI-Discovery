"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  Hash, 
  Sparkles,
  ArrowRight
} from "lucide-react";
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
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        {title && (
          <Button variant="ghost" size="sm" asChild>
            <Link to="/discover" className="flex items-center gap-1">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {recommendations.slice(0, 3).map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => onViewDetails && onViewDetails(item)}
                >
                  <Hash className="h-3 w-3 mr-1" />
                  {item.title.substring(0, 30)}...
                  <span className="ml-1 text-xs opacity-60">
                    ({formatNumber(item.engagement.likes)})
                  </span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.title}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        {recommendations.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No recommendations available
          </p>
        )}
        {!title && recommendations.length > 3 && (
          <div className="text-center mt-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/discover">View More</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContentRecommendations;