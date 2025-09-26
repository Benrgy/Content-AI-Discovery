"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Heart, MessageSquare, Share2, Eye, BarChart } from "lucide-react";
import { ContentItem } from "@/types/content";
import { formatNumber, getPerformanceColor } from "@/constants/content-constants";

interface ContentPerformanceMetricsProps {
  content: ContentItem;
}

const ContentPerformanceMetrics = ({ content }: ContentPerformanceMetricsProps) => {
  console.log("ContentPerformanceMetrics: Component rendering");
  
  const { engagement, performanceScore } = content;
  
  // Calculate engagement distribution
  const totalEngagement = engagement.likes + engagement.comments + engagement.shares;
  const likesPercentage = Math.round((engagement.likes / totalEngagement) * 100);
  const commentsPercentage = Math.round((engagement.comments / totalEngagement) * 100);
  const sharesPercentage = Math.round((engagement.shares / totalEngagement) * 100);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Performance Metrics</CardTitle>
          {performanceScore && (
            <Badge className={getPerformanceColor(performanceScore)}>
              Score: {performanceScore}
            </Badge>
          )}
        </div>
        <CardDescription>
          Engagement metrics and performance analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-center p-2 rounded-md bg-muted/50">
                <Heart className="h-5 w-5 mb-1 text-rose-500" />
                <span className="text-sm font-medium">{formatNumber(engagement.likes)}</span>
                <span className="text-xs text-muted-foreground">Likes</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{likesPercentage}% of total engagement</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-center p-2 rounded-md bg-muted/50">
                <MessageSquare className="h-5 w-5 mb-1 text-blue-500" />
                <span className="text-sm font-medium">{formatNumber(engagement.comments)}</span>
                <span className="text-xs text-muted-foreground">Comments</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{commentsPercentage}% of total engagement</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-center p-2 rounded-md bg-muted/50">
                <Share2 className="h-5 w-5 mb-1 text-green-500" />
                <span className="text-sm font-medium">{formatNumber(engagement.shares)}</span>
                <span className="text-xs text-muted-foreground">Shares</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{sharesPercentage}% of total engagement</p>
            </TooltipContent>
          </Tooltip>
          
          {engagement.views ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center p-2 rounded-md bg-muted/50">
                  <Eye className="h-5 w-5 mb-1 text-purple-500" />
                  <span className="text-sm font-medium">{formatNumber(engagement.views)}</span>
                  <span className="text-xs text-muted-foreground">Views</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Total view count</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center p-2 rounded-md bg-muted/50">
                  <BarChart className="h-5 w-5 mb-1 text-amber-500" />
                  <span className="text-sm font-medium">{engagement.engagementRate?.toFixed(1)}%</span>
                  <span className="text-xs text-muted-foreground">Engagement Rate</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Percentage of audience that engaged</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Likes</span>
              <span>{likesPercentage}%</span>
            </div>
            <Progress value={likesPercentage} className="h-2" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Comments</span>
              <span>{commentsPercentage}%</span>
            </div>
            <Progress value={commentsPercentage} className="h-2" />
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Shares</span>
              <span>{sharesPercentage}%</span>
            </div>
            <Progress value={sharesPercentage} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentPerformanceMetrics;