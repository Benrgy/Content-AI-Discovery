"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Added missing import
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  Hash, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useContentDiscoveryData } from "@/hooks/use-content-discovery-data";

const TrendingTopics = () => {
  const { data: contentData } = useContentDiscoveryData();

  if (!contentData) return null;

  // Extract and count trending topics from tags
  const topicCounts = contentData.reduce((acc, item) => {
    if (item.tags) {
      item.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
    }
    return acc;
  }, {} as Record<string, number>);

  const trendingTopics = Object.entries(topicCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([topic, count]) => ({ topic, count }));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Trending Topics
        </CardTitle>
        <Button variant="ghost" size="sm" asChild>
          <Link to="/discover" className="flex items-center gap-1">
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((item, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                {/* Removed asChild prop which doesn't exist on Badge */}
                <Link to={`/discover?search=${encodeURIComponent(item.topic)}`}>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary/10 transition-colors"
                  >
                    <Hash className="h-3 w-3 mr-1" />
                    {item.topic}
                    <span className="ml-1 text-xs opacity-60">({item.count})</span>
                  </Badge>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.count} posts tagged with {item.topic}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        {trendingTopics.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No trending topics available
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default TrendingTopics;