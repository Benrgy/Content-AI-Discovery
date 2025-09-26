"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  TrendingUp, 
  Clock, 
  Users, 
  Award,
  BarChart3,
  Target
} from "lucide-react";
import { useContentDiscoveryData } from "@/hooks/use-content-discovery-data";
import { formatNumber } from "@/constants/content-constants";

const ContentStats = () => {
  const { data: contentData } = useContentDiscoveryData();

  if (!contentData) return null;

  // Calculate statistics
  const totalContent = contentData.length;
  const totalEngagement = contentData.reduce((sum, item) => 
    sum + item.engagement.likes + item.engagement.comments + item.engagement.shares, 0
  );
  const averagePerformance = contentData.reduce((sum, item) => 
    sum + (item.performanceScore || 0), 0
  ) / totalContent;
  const topPlatform = Object.entries(
    contentData.reduce((acc, item) => {
      acc[item.platform] = (acc[item.platform] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1])[0][0];

  const stats = [
    {
      label: "Total Content",
      value: formatNumber(totalContent),
      icon: BarChart3,
      description: "Pieces of content analyzed",
      color: "text-blue-500"
    },
    {
      label: "Total Engagement",
      value: formatNumber(totalEngagement),
      icon: Users,
      description: "Likes, comments, and shares combined",
      color: "text-green-500"
    },
    {
      label: "Avg Performance",
      value: averagePerformance.toFixed(1),
      icon: Target,
      description: "Average performance score",
      color: "text-purple-500"
    },
    {
      label: "Top Platform",
      value: topPlatform,
      icon: Award,
      description: "Most represented platform",
      color: "text-amber-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Icon className={`h-5 w-5 ${stat.color}`} />
                <Badge variant="outline" className="text-xs">
                  {stat.label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-sm text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ContentStats;